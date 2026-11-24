#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const organization = 'UMCG-MIT';
const project = 'Zorgviewer';
const apiVersion = '7.1';
const pageSize = 100;
const concurrency = 8;
const workItemFields = [
  'System.Id',
  'System.Title',
  'System.WorkItemType',
  'System.State',
  'System.AreaPath',
  'System.ChangedDate',
  'System.ChangedBy',
  'System.AssignedTo',
];

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

function parseDate(value, label, endOfDay = false) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} moet de notatie YYYY-MM-DD gebruiken.`);
  }

  const date = new Date(`${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is geen geldige datum: ${value}`);
  }
  return date;
}

function parseArguments(args) {
  const now = new Date();
  const november20 = new Date(Date.UTC(now.getUTCFullYear(), 10, 20));
  if (now < november20) november20.setUTCFullYear(november20.getUTCFullYear() - 1);

  const options = {
    from: november20,
    to: now,
    json: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--help' || argument === '-h') {
      options.help = true;
    } else if (argument === '--json') {
      options.json = true;
    } else if (argument === '--from' || argument === '--to') {
      const value = args[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error(`Geef een datum op na ${argument}.`);
      }
      index += 1;
      options[argument.slice(2)] = parseDate(value, argument, argument === '--to');
    } else {
      throw new Error(`Onbekende optie: ${argument}`);
    }
  }

  if (options.from > options.to) {
    throw new Error('--from mag niet na --to liggen.');
  }
  return options;
}

function printHelp() {
  console.log([
    'Gebruik: node skills/get-devops-changes.js [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--json]',
    '',
    'Vraagt bijgewerkte Azure DevOps work items en wiki-revisies op.',
    'Standaard loopt de periode vanaf 20 november van dit jaar (of het vorige jaar)',
    'tot nu. De einddatum van --to is inclusief.',
    'Leest PAT uit de omgevingsvariabele PAT of uit .env in de repository-root.',
  ].join('\n'));
}

function getIdentityName(identity) {
  if (typeof identity === 'string') return identity;
  return identity?.displayName || identity?.uniqueName || '';
}

function getApiUrl(route, params = {}) {
  const url = new URL(`https://dev.azure.com/${organization}/${encodeURIComponent(project)}/_apis/${route}`);
  for (const [key, value] of Object.entries({ ...params, 'api-version': apiVersion })) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

async function createApiClient(pat) {
  const authorization = `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;

  return async function apiRequest(url, { method = 'GET', body } = {}) {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      redirect: 'manual',
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const message = response.status === 302 || response.status === 401
        ? 'Aanmelding vereist of PAT ongeldig'
        : response.status === 403
          ? 'PAT mist leesrechten of projecttoegang'
          : response.status === 404
            ? 'Niet gevonden of niet toegankelijk'
            : `HTTP ${response.status}`;
      throw new Error(`${message} (${response.status}) voor ${new URL(url).pathname}`);
    }
    return response.json();
  };
}

async function mapWithConcurrency(items, limit, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function getWorkItemIds(apiRequest, from) {
  const query = [
    'SELECT [System.Id]',
    'FROM WorkItems',
    `WHERE [System.TeamProject] = '${project}'`,
    `AND [System.ChangedDate] >= '${from.toISOString()}'`,
    'ORDER BY [System.ChangedDate] DESC',
  ].join(' ');
  const result = await apiRequest(getApiUrl('wit/wiql'), {
    method: 'POST',
    body: { query },
  });
  return [...new Set((result.workItems ?? []).map((item) => item.id))];
}

async function getWorkItemUpdates(apiRequest, id, from, to) {
  const updates = [];
  let skip = 0;

  while (true) {
    const page = await apiRequest(getApiUrl(`wit/workitems/${id}/updates`, {
      '$top': String(pageSize),
      '$skip': String(skip),
    }));
    const values = page.value ?? [];
    updates.push(...values);
    if (values.length < pageSize) break;
    skip += values.length;
  }

  return updates.filter((update) => {
    const revisedDate = new Date(update.revisedDate);
    return !Number.isNaN(revisedDate.getTime())
      && revisedDate >= from
      && revisedDate <= to;
  });
}

async function getWorkItems(apiRequest, ids) {
  if (ids.length === 0) return [];

  const batches = [];
  for (let index = 0; index < ids.length; index += 200) {
    batches.push(ids.slice(index, index + 200));
  }
  const results = await mapWithConcurrency(batches, concurrency, (batch) => (
    apiRequest(getApiUrl('wit/workitemsbatch'), {
      method: 'POST',
      body: { ids: batch, fields: workItemFields },
    })
  ));
  return results.flatMap((result) => result.value ?? []);
}

function flattenWikiPages(page, wiki) {
  const pages = [];
  const visit = (item) => {
    if (!item || item.id == null) return;
    pages.push({
      id: item.id,
      wikiId: wiki.id,
      wikiName: wiki.name,
      path: item.path || '/',
      title: item.title || item.path || '(geen titel)',
      url: item.remoteUrl || item.url || '',
    });
    for (const child of item.subPages ?? []) visit(child);
  };
  visit(page.page ?? page);
  return pages;
}

async function getWikiPages(apiRequest, wiki) {
  const root = await apiRequest(getApiUrl(`wiki/wikis/${encodeURIComponent(wiki.id)}/pages`, {
    path: '/',
    recursionLevel: 'full',
    includeContent: 'false',
  }));
  return flattenWikiPages(root, wiki);
}

async function getWikiRevisions(apiRequest, page, from, to) {
  const revisions = [];
  let skip = 0;

  while (true) {
    const result = await apiRequest(getApiUrl(
      `wiki/wikis/${encodeURIComponent(page.wikiId)}/pages/${page.id}/revisions`,
      { '$top': String(pageSize), '$skip': String(skip) },
    ));
    const values = result.value ?? [];
    revisions.push(...values);
    if (values.length < pageSize) break;
    skip += values.length;
  }

  return revisions
    .filter((revision) => {
      const revisedDate = new Date(revision.createdDate || revision.modifiedDate);
      return !Number.isNaN(revisedDate.getTime())
        && revisedDate >= from
        && revisedDate <= to;
    })
    .map((revision) => ({
      wiki: page.wikiName,
      path: page.path,
      title: page.title,
      pageId: page.id,
      revision: revision.id ?? revision.version,
      date: revision.createdDate || revision.modifiedDate,
      author: getIdentityName(revision.author || revision.modifiedBy || revision.createdBy),
      comment: revision.comment || '',
      url: page.url,
    }));
}

function fieldChanges(update) {
  return Object.entries(update.fields ?? {}).map(([name, value]) => ({
    field: name,
    from: value.oldValue ?? null,
    to: value.newValue ?? null,
  }));
}

function buildReport({ workItems, updatesById, wikiRevisions, from, to }) {
  return {
    project,
    organization,
    from: from.toISOString(),
    to: to.toISOString(),
    workItems: workItems
      .map((item) => {
        const fields = item.fields ?? {};
        const updates = (updatesById.get(item.id) ?? []).map((update) => ({
          revision: update.rev,
          date: update.revisedDate,
          author: getIdentityName(update.revisedBy),
          changes: fieldChanges(update),
        }));
        return {
          id: item.id,
          title: fields['System.Title'] || '(geen titel)',
          type: fields['System.WorkItemType'] || '(onbekend)',
          state: fields['System.State'] || '(onbekend)',
          area: fields['System.AreaPath'] || '(niet ingevuld)',
          changedDate: fields['System.ChangedDate'] || '',
          changedBy: getIdentityName(fields['System.ChangedBy']),
          assignedTo: getIdentityName(fields['System.AssignedTo']),
          url: `https://dev.azure.com/${organization}/${encodeURIComponent(project)}/_workitems/edit/${item.id}`,
          updates,
        };
      })
      .filter((item) => item.updates.length > 0)
      .sort((a, b) => new Date(b.changedDate) - new Date(a.changedDate)),
    wikiRevisions: wikiRevisions.sort((a, b) => new Date(b.date) - new Date(a.date)),
  };
}

function printReport(report) {
  console.log(`Azure DevOps wijzigingen: ${report.project}`);
  console.log(`Periode: ${report.from} t/m ${report.to}`);
  console.log(`Work items: ${report.workItems.length} | Wiki-revisies: ${report.wikiRevisions.length}`);

  console.log('\nWork items');
  if (report.workItems.length === 0) console.log('  Geen work-itemwijzigingen gevonden.');
  for (const item of report.workItems) {
    console.log(`\n#${item.id} [${item.type} / ${item.state}] ${item.title}`);
    console.log(`  Area: ${item.area}`);
    console.log(`  Laatst gewijzigd: ${item.changedDate} door ${item.changedBy || '(onbekend)'}`);
    console.log(`  URL: ${item.url}`);
    for (const update of item.updates) {
      console.log(`  Update r${update.revision}: ${update.date} door ${update.author || '(onbekend)'}`);
      for (const change of update.changes) {
        console.log(`    ${change.field}: ${JSON.stringify(change.from)} -> ${JSON.stringify(change.to)}`);
      }
    }
  }

  console.log('\nWiki-pagina-revisies');
  if (report.wikiRevisions.length === 0) console.log('  Geen wiki-revisies gevonden.');
  for (const revision of report.wikiRevisions) {
    console.log(`\n${revision.wiki} ${revision.path} — revisie ${revision.revision}`);
    console.log(`  ${revision.date} door ${revision.author || '(onbekend)'}`);
    if (revision.comment) console.log(`  Opmerking: ${revision.comment}`);
    if (revision.url) console.log(`  URL: ${revision.url}`);
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  loadDotEnv();
  const pat = process.env.PAT;
  if (!pat) throw new Error('Er is geen PAT ingesteld in de omgevingsvariabele PAT of in .env.');
  delete process.env.PAT;

  const apiRequest = await createApiClient(pat);
  const candidateIds = await getWorkItemIds(apiRequest, options.from);
  const updates = await mapWithConcurrency(candidateIds, concurrency, async (id) => [
    id,
    await getWorkItemUpdates(apiRequest, id, options.from, options.to),
  ]);
  const updatesById = new Map(updates.filter(([, value]) => value.length > 0));
  const [workItems, wikiList] = await Promise.all([
    getWorkItems(apiRequest, [...updatesById.keys()]),
    apiRequest(getApiUrl('wiki/wikis')),
  ]);
  const wikis = wikiList.value ?? [];
  const wikiPages = (await mapWithConcurrency(wikis, concurrency, (wiki) => (
    getWikiPages(apiRequest, wiki)
  ))).flat();
  const wikiRevisionSets = await mapWithConcurrency(wikiPages, concurrency, (page) => (
    getWikiRevisions(apiRequest, page, options.from, options.to)
  ));
  const report = buildReport({
    workItems,
    updatesById,
    wikiRevisions: wikiRevisionSets.flat(),
    from: options.from,
    to: options.to,
  });

  if (options.json) console.log(JSON.stringify(report, null, 2));
  else printReport(report);
}

main().catch((error) => {
  console.error(`FOUT: ${error.message}`);
  process.exitCode = 1;
});
