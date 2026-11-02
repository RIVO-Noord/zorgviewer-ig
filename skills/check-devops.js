#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const organization = 'UMCG-MIT';
const project = 'Zorgviewer';
const apiVersion = '7.1';

function loadDotEnv() {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const [, key, value] = match;
    const normalized = value.replace(/^['"]|['"]$/g, '');
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = normalized;
    }
  }
}

function plainText(value) {
  return String(value ?? '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseWikiPagePath(rawValue) {
  if (/^https?:\/\//i.test(rawValue)) {
    const url = new URL(rawValue);
    const segments = url.pathname.replace(/^\/+/, '').split('/');
    const wikiIndex = segments.indexOf('_wiki');

    if (wikiIndex !== -1 && segments[wikiIndex + 1] === 'wikis') {
      const wikiName = decodeURIComponent(segments[wikiIndex + 2] || `${project}.wiki`);
      const pageSegments = segments.slice(wikiIndex + 3);

      if (pageSegments.length && /^\d+$/.test(pageSegments[0])) {
        const pageId = pageSegments[0];
        return {
          wikiName,
          path: pageSegments.slice(1).join('/') || '/',
          apiUrl: `https://dev.azure.com/${organization}/${project}/_apis/wiki/wikis/${wikiName}/pages/${pageId}?api-version=${apiVersion}`,
          url: rawValue,
        };
      }

      const pagePath = '/' + pageSegments.join('/');
      return {
        wikiName,
        path: pagePath || '/',
        apiUrl: `https://dev.azure.com/${organization}/${project}/_apis/wiki/wikis/${wikiName}/pages?path=${encodeURIComponent(pagePath || '/')}&api-version=${apiVersion}`,
        url: rawValue,
      };
    }

    const wikiName = `${project}.wiki`;
    return {
      wikiName,
      path: url.pathname || '/',
      apiUrl: `https://dev.azure.com/${organization}/${project}/_apis/wiki/wikis/${wikiName}/pages?path=${encodeURIComponent(url.pathname || '/')}&api-version=${apiVersion}`,
      url: rawValue,
    };
  }

  const wikiName = `${project}.wiki`;
  const pagePath = rawValue.startsWith('/') ? rawValue : `/${rawValue}`;
  return {
    wikiName,
    path: pagePath,
    apiUrl: `https://dev.azure.com/${organization}/${project}/_apis/wiki/wikis/${wikiName}/pages?path=${encodeURIComponent(pagePath)}&api-version=${apiVersion}`,
    url: `https://dev.azure.com/${organization}/${project}/_wiki/wikis/${wikiName}${pagePath}`,
  };
}

async function main() {
  loadDotEnv();

  const args = process.argv.slice(2);
  const workItemId = args.find((arg) => /^\d+$/.test(arg));
  const wikiTargets = args.filter((arg) => !/^\d+$/.test(arg));

  if (!workItemId && wikiTargets.length === 0) {
    throw new Error('Gebruik: stel PAT in .env of als omgevingsvariabele en voer node skills/check-devops.js <workitem-id> [wiki-url|wiki-path] uit.');
  }

  const pat = process.env.PAT;
  if (!pat) throw new Error('Er is geen PAT ingesteld in de omgevingsvariabele PAT of in .env.');

  const authorization = `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;
  delete process.env.PAT;

  const baseUrl = `https://dev.azure.com/${organization}/${project}`;
  const endpoints = [];

  if (workItemId) {
    endpoints.push({
      label: `Azure DevOps work item #${workItemId}`,
      url: `${baseUrl}/_apis/wit/workitems/${workItemId}?%24expand=relations&api-version=${apiVersion}`,
      workItem: true,
    });
  }

  for (const rawTarget of wikiTargets) {
    const page = parseWikiPagePath(rawTarget);
    endpoints.push({
      label: `Azure DevOps wiki page ${page.path}`,
      url: page.apiUrl,
      wikiPage: true,
      rawTarget,
    });
  }

  let failed = false;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url, {
        headers: {
          Accept: 'application/json',
          Authorization: authorization,
        },
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
      });

      if (response.ok) {
        console.log(`OK (${response.status}): ${endpoint.label} is toegankelijk.`);

        if (endpoint.workItem) {
          const item = await response.json();
          const fields = item.fields ?? {};
          const description = plainText(fields['System.Description']);
          const acceptanceCriteria = plainText(fields['Microsoft.VSTS.Common.AcceptanceCriteria']);
          const parentIds = (item.relations ?? [])
            .filter((relation) => relation.rel === 'System.LinkTypes.Hierarchy-Reverse')
            .map((relation) => relation.url.split('/').pop());

          console.log('Work item details:');
          console.log(`  ID: ${item.id}`);
          console.log(`  Titel: ${plainText(fields['System.Title']) || '(niet ingevuld)'}`);
          console.log(`  Type: ${plainText(fields['System.WorkItemType']) || '(niet ingevuld)'}`);
          console.log(`  Status: ${plainText(fields['System.State']) || '(niet ingevuld)'}`);
          console.log(`  Area: ${plainText(fields['System.AreaPath']) || '(niet ingevuld)'}`);
          console.log(`  Iteration: ${plainText(fields['System.IterationPath']) || '(niet ingevuld)'}`);
          console.log(`  Tags: ${plainText(fields['System.Tags']) || '(geen)'}`);
          console.log(`  Parent work item(s): ${parentIds.join(', ') || '(geen)'}`);
          console.log(`  Omschrijving: ${description || '(niet ingevuld)'}`);
          console.log(`  Acceptatiecriteria: ${acceptanceCriteria ? `${acceptanceCriteria.slice(0, 1200)}${acceptanceCriteria.length > 1200 ? '…' : ''}` : '(niet ingevuld)'}`);
        }

        if (endpoint.wikiPage) {
          const data = await response.json();
          const page = data.page ?? data;
          const title = plainText(page.title || page.path || endpoint.rawTarget || '(onbekend)');
          const remoteUrl = page.remoteUrl || page.url || endpoint.rawTarget || '(geen URL beschikbaar)';
          const pagePath = page.path || page.gitItemPath || endpoint.rawTarget || '(niet ingevuld)';

          console.log('Wiki page details:');
          console.log(`  Bron: ${endpoint.rawTarget}`);
          console.log(`  Titel: ${title || '(niet ingevuld)'}`);
          console.log(`  Pad: ${plainText(pagePath)}`);
          console.log(`  Remote URL: ${plainText(remoteUrl)}`);
        }
      } else {
        failed = true;
        const message = response.status === 401
          ? 'PAT ongeldig of niet geautoriseerd'
          : response.status === 403
            ? 'PAT mist leesrechten of toegang'
            : response.status === 404
              ? 'Niet gevonden of niet toegankelijk'
              : `HTTP ${response.status}`;
        console.error(`NIET OK (${response.status}): ${endpoint.label} — ${message}.`);
      }
    } catch (error) {
      failed = true;
      console.error(`FOUT: ${endpoint.label} — ${error.message}`);
    }
  }

  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`FOUT: ${error.message}`);
  process.exitCode = 1;
});
