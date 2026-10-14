#!/usr/bin/env node

const organization = 'UMCG-MIT';
const project = 'Zorgviewer';
const apiVersion = '7.1';

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

async function main() {
  const workItemId = process.argv[2];
  if (!workItemId || process.argv.length !== 3 || !/^[1-9]\d*$/.test(workItemId)) {
    throw new Error('Gebruik: stel PAT in als omgevingsvariabele en voer node script/check-devops.js <workitem-id> uit.');
  }

  const pat = process.env.PAT;
  if (!pat) throw new Error('Er is geen PAT ingesteld in de omgevingsvariabele PAT.');

  const authorization = `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;
  delete process.env.PAT;

  const baseUrl = `https://dev.azure.com/${organization}/${project}`;
  const endpoints = [
    {
      label: 'Azure DevOps review checklist',
      url: `${baseUrl}/_apis/wiki/wikis/${project}.wiki/pages?path=%2FChecklist-reviews-analyseteam&api-version=${apiVersion}`,
    },
    {
      label: `Azure DevOps work item #${workItemId}`,
      url: `${baseUrl}/_apis/wit/workitems/${workItemId}?%24expand=relations&api-version=${apiVersion}`,
      workItem: true,
    },
  ];

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
          console.log(`  Omschrijving: ${description ? `${description.slice(0, 1200)}${description.length > 1200 ? '…' : ''}` : '(niet ingevuld)'}`);
          console.log(`  Acceptatiecriteria: ${acceptanceCriteria ? `${acceptanceCriteria.slice(0, 1200)}${acceptanceCriteria.length > 1200 ? '…' : ''}` : '(niet ingevuld)'}`);
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
