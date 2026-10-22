const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const fhirpath = require('fhirpath');
const fhirpath_stu3_model = require('fhirpath/fhir-context/stu3');

const pathsFile = path.join(__dirname, 'pseudonymize-paths.json');
const examplesDir = path.join(__dirname, '..', 'input', 'examples');
const peopleFile = process.env.PSEUDONYMIZE_FAKES
    ? path.resolve(process.env.PSEUDONYMIZE_FAKES)
    : path.join(__dirname, 'pseudonymize-fakes.json');
const peopleFileLabel = path.relative(path.join(__dirname, '..'), peopleFile).replace(/\\/g, '/');

const USED_IN_SYSTEM = 'https://zorgviewer.nl/fhir/pseudonymize/used-in';
const BSN_SYSTEM = 'http://fhir.nl/fhir/NamingSystem/bsn';
const INITIALS = /^([A-Za-z]\.)+$/;
const DUTCH_MONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

// Keys that never contain PII: kept as-is while overlaying
const KEEP_KEYS = new Set(['id', 'system', 'use', 'url', 'valueCode', 'code', 'type', 'period', 'rank', 'assigner', 'contentType', 'language', 'coding', 'country']);
// Extension value[x] types that are string leaves and replaced (other value[x] types are kept)
const PII_VALUE_KEYS = new Set(['valueString', 'valueDate', 'valueDateTime', 'valueInstant', 'valueMarkdown']);
// Extensions (matched on part of the url) that never contain PII
const KEEP_EXTENSION_URLS = ['humanname-assembly-order', 'iso21090-EN-qualifier', 'code-specification', 'ext-CodeSpecification', 'AddressType', 'AddressInformation.AddressType', 'TelecomType', 'nl-core-address-official'];
// Keys that keep the original value when the fake has no value at that position
const OPTIONAL_KEYS = new Set(['prefix', 'suffix']);
// Object arrays that are matched by index; the last fake element is reused when the original has more
const CLAMPED_ARRAYS = new Set(['name', 'address']);

// --- Command line ---

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const files = args.filter(a => !a.startsWith('--'));
if (files.length === 0) {
    console.error('Usage: node pseudonymize.js [--dry-run] <example-file> [<example-file> ...]');
    process.exit(1);
}

// --- Generic helpers ---

function isObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Build a case-insensitive regex matching any of the values, only at word boundaries (not inside a word/number). */
function wordRegex(values, flags) {
    return new RegExp('(?<![\\p{L}\\p{N}])(?:' + values.map(escapeRegExp).join('|') + ')(?![\\p{L}\\p{N}])', flags);
}

function containsWord(text, word) {
    if (typeof text !== 'string' || typeof word !== 'string' || word.length === 0) {
        return false;
    }
    return wordRegex([word], 'iu').test(text);
}

function equalsIgnoreCase(a, b) {
    return typeof a === 'string' && typeof b === 'string' && a.toLowerCase() === b.toLowerCase();
}

function shortUrl(url) {
    return typeof url === 'string' ? url.substring(url.lastIndexOf('/') + 1) : String(url);
}

function seededRandom(seed) {
    const hash = crypto.createHash('sha256').update(seed).digest();
    let a = hash.readUInt32LE(0);
    return function () {
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Format-preserving scramble: digits become digits, letters become letters (case kept), other characters are kept.
 * Deterministic and seeded by the fake person and the identifier system, so NOT derivable from the original value.
 */
function scramble(value, fake, system) {
    const random = seededRandom(`${fake.resourceType}/${fake.id}|${system || ''}`);
    const urn = /^urn:[a-z]+:/i.exec(value);
    const prefix = urn ? urn[0] : '';
    const chars = value.substring(prefix.length).split('').map(c => {
        if (/[0-9]/.test(c)) {
            return String(Math.floor(random() * 10));
        }
        if (/[A-Z]/.test(c)) {
            return String.fromCharCode(65 + Math.floor(random() * 26));
        }
        if (/[a-z]/.test(c)) {
            return String.fromCharCode(97 + Math.floor(random() * 26));
        }
        return c;
    });
    if (prefix + chars.join('') === value) {
        const i = chars.findIndex(c => /[0-9A-Za-z]/.test(c));
        if (i >= 0) {
            chars[i] = /[0-9]/.test(chars[i]) ? String((Number(chars[i]) + 1) % 10) : (chars[i] === 'z' ? 'a' : chars[i] === 'Z' ? 'A' : String.fromCharCode(chars[i].charCodeAt(0) + 1));
        }
    }
    return prefix + chars.join('');
}

// --- Load configuration and pool ---

const config = JSON.parse(fs.readFileSync(pathsFile, 'utf8'));
const personTypes = Object.keys(config.persons);
const ORG = 'Organization';
const orgConfig = config.organizations || { elements: [], keep: [] };
const orgKeep = (orgConfig.keep || []).map(r => new RegExp(r, 'i'));
const keepDisplays = (config.keepDisplays || []).map(r => new RegExp(r, 'i'));
// Words that are no distinctive part of an organisation name
const GENERIC_ORG_WORD = /ziekenhuis|centrum|medisch|huisarts|praktijk|apotheek|gezondheid|stichting|zorg|groep|algemeen|academisch|regionaal|kliniek|^(de|het|van|voor|en)$/i;

let poolBundle = null;
let poolChanged = false;

function loadPool() {
    if (!fs.existsSync(peopleFile)) {
        console.error(`ERROR: People file not found: ${peopleFile}`);
        process.exit(1);
    }
    const bundle = JSON.parse(fs.readFileSync(peopleFile, 'utf8'));
    poolBundle = bundle;
    const byType = {};
    for (const type of personTypes) {
        byType[type] = [];
    }
    byType[ORG] = [];
    const problems = [];
    const seenTexts = new Set();

    for (const entry of (bundle.entry || [])) {
        const fake = entry.resource;
        if (!fake || !byType[fake.resourceType]) {
            problems.push(`Entry ${fake ? fake.resourceType + '/' + fake.id : '(no resource)'} is not a person or organization type (${personTypes.concat(ORG).join(', ')})`);
            continue;
        }
        const label = `${fake.resourceType}/${fake.id}`;
        if (fake.resourceType === ORG) {
            const orgMissing = [];
            if (!fake.id) {
                orgMissing.push('id');
            }
            if (typeof fake.name !== 'string' || !fake.name) {
                orgMissing.push('name');
            }
            if (!fake.alias || typeof fake.alias[0] !== 'string') {
                orgMissing.push('alias[0] (abbreviation)');
            }
            if (orgMissing.length > 0) {
                problems.push(`${label} is missing: ${orgMissing.join(', ')}`);
            } else if (seenTexts.has(fake.name)) {
                problems.push(`${label} has a duplicate name "${fake.name}"`);
            } else {
                seenTexts.add(fake.name);
                byType[ORG].push(fake);
            }
            continue;
        }
        const name = fake.name && fake.name[0];
        const missing = [];
        if (!fake.id) {
            missing.push('id');
        }
        if (!name || !name.text) {
            missing.push('name[0].text');
        }
        if (!name || !name.family) {
            missing.push('name[0].family');
        }
        if (!name || !name.given || !name.given[0]) {
            missing.push('name[0].given[0]');
        }
        if (fake.resourceType === 'Patient') {
            if (!fake.birthDate) {
                missing.push('birthDate');
            }
            if (!(fake.identifier || []).some(i => i.system === BSN_SYSTEM && i.value)) {
                missing.push(`identifier with system ${BSN_SYSTEM}`);
            }
        }
        if (missing.length > 0) {
            problems.push(`${label} is missing: ${missing.join(', ')}`);
            continue;
        }
        if (seenTexts.has(name.text)) {
            problems.push(`${label} has a duplicate name.text "${name.text}"`);
            continue;
        }
        seenTexts.add(name.text);
        byType[fake.resourceType].push(fake);
    }

    if (problems.length > 0) {
        console.error(`ERROR: Invalid entries in ${peopleFileLabel}:`);
        for (const p of problems) {
            console.error(`  - ${p}`);
        }
        process.exit(1);
    }
    return byType;
}

const pool = loadPool();

// --- Links from fakes to the places they replaced (file and resource path only, never the original data) ---

/** Tag code of a link: "Condition-CGM.json#Practitioner/123", or just the file name when the place has no locator. */
function linkCode(file, locator) {
    return locator !== undefined ? `${file}#${locator}` : file;
}

function usedInTags(fake) {
    return fake.meta && Array.isArray(fake.meta.tag) ? fake.meta.tag.filter(t => t.system === USED_IN_SYSTEM) : [];
}

function hasLink(fake, code) {
    return usedInTags(fake).some(t => t.code === code);
}

/** Is the fake linked to a place in this file (by an earlier run)? */
function isLinkedInFile(fake, file) {
    return usedInTags(fake).some(t => t.code.startsWith(file + '#'));
}

/** Replace the links of all fakes to this file by the links of this run. */
function updateLinks(file, links) {
    for (const fake of Object.values(pool).flat()) {
        const tags = fake.meta && Array.isArray(fake.meta.tag) ? fake.meta.tag : [];
        const others = tags.filter(t => t.system !== USED_IN_SYSTEM);
        const codes = new Set(usedInTags(fake).map(t => t.code).filter(c => c !== file && !c.startsWith(file + '#')));
        for (const l of links) {
            if (l.fake === fake) {
                codes.add(linkCode(file, l.locator));
            }
        }
        const updated = others.concat([...codes].sort().map(code => ({ system: USED_IN_SYSTEM, code })));
        if (JSON.stringify(updated) === JSON.stringify(tags)) {
            continue;
        }
        poolChanged = true;
        if (updated.length > 0) {
            fake.meta = fake.meta || {};
            fake.meta.tag = updated;
        } else {
            delete fake.meta.tag;
            if (Object.keys(fake.meta).length === 0) {
                delete fake.meta;
            }
        }
    }
}

function linkFake(ctx, fake, locator) {
    if (fake && !fake.missing && !fake.keep) {
        ctx.links.push({ fake, locator });
    }
}

/** Link a fake that is already in a mention to the first place it is mentioned (once per mentioned string). */
function linkMentionFake(ctx, key, fake) {
    if (!ctx.mentionFakes.has(key)) {
        ctx.mentionFakes.set(key, fake);
        linkFake(ctx, fake, ctx.locator);
    }
}

const maxShortage = {};

// --- Already-fake detection (by name only) ---

/** Find the pool person of the given type that matches one of the names (family + first given, or full text). */
function findFakeByName(names, type) {
    for (const n of names) {
        if (!isObject(n)) {
            continue;
        }
        const given0 = n.given && n.given[0];
        for (const f of pool[type] || []) {
            const fn = f.name[0];
            if (equalsIgnoreCase(n.text, fn.text)) {
                return f;
            }
            if (equalsIgnoreCase(n.family, fn.family) && (typeof given0 !== 'string' || equalsIgnoreCase(given0, fn.given[0]))) {
                return f;
            }
        }
    }
    return undefined;
}

/** A display/mention string is fake when it contains the family name of a pool person of that type. */
function isFakeString(text, type) {
    return typeof text === 'string' && (pool[type] || []).some(f => containsWord(text, f.name[0].family));
}

function isFakeStringOfAnyType(text) {
    return personTypes.some(t => isFakeString(text, t));
}

// --- Organizations ---

function isAbbreviation(text) {
    return /^[A-Z][A-Z.]{1,9}$/.test(text);
}

/** The first distinctive word of a fake organization name (e.g. Proefstad). */
function orgDistinctWord(fake) {
    return fake.name.split(/\s+/).find(w => !GENERIC_ORG_WORD.test(w)) || fake.name;
}

function isKeptOrgName(text) {
    return orgKeep.some(r => r.test(text)) || keepDisplays.some(r => r.test(text));
}

function findFakeOrgByName(name) {
    return typeof name === 'string' ? pool[ORG].find(f => equalsIgnoreCase(name, f.name) || equalsIgnoreCase(name, f.alias[0])) : undefined;
}

/** A display is a fake organization when it contains the name, the distinctive word or the abbreviation of a fake. */
function findFakeOrgInString(text) {
    return typeof text === 'string' ? pool[ORG].find(f => containsWord(text, f.name) || containsWord(text, orgDistinctWord(f)) || containsWord(text, f.alias[0])) : undefined;
}

function isFakeOrgString(text) {
    return findFakeOrgInString(text) !== undefined;
}

/** Does the fake (person or organization) occur in the text? */
function occursIn(text, fake) {
    if (fake.resourceType === ORG) {
        return containsWord(text, fake.name) || containsWord(text, orgDistinctWord(fake)) || containsWord(text, fake.alias[0]);
    }
    return containsWord(text, fake.name[0].family);
}

/** Display of the fake in the style of the original: abbreviations stay abbreviations, an "(organization)" prefix is kept. */
function renderOrgName(name, fake) {
    const segments = name.split(', ');
    let n = 0;
    while (n < segments.length - 1 && /\(organi[sz]ation\)$/i.test(segments[n])) {
        n++;
    }
    const core = segments.slice(n).join(', ');
    return [...segments.slice(0, n), isAbbreviation(core) ? fake.alias[0] : fake.name].join(', ');
}

// --- Per-file processing context ---

function createContext(file, root) {
    return {
        file,
        root,
        fileAssigned: new Set(),
        presentFakes: new Set(),
        links: [],
        locator: undefined,
        mentionOrdinals: new Map(),
        shortage: {},
        errors: new Set(),
        warnings: [],
        infos: new Set(),
        changes: [],
        pairs: new Map(),
        pairRegex: null,
        pairRegexSize: -1,
        local: new Map(),
        fake: null,
        label: '',
        fakeOf: new Map(),
        mentionFakes: new Map(),
        orgFakes: [],
        deferred: [],
        persons: 0,
        orgs: 0,
        mentions: 0
    };
}

/** Decode numeric (decimal and hex) and the basic named HTML entities. */
function decodeEntities(text) {
    return text
        .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#([0-9]+);/g, (m, d) => String.fromCodePoint(parseInt(d, 10)))
        .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

/** Regex source for a value in which the characters ' " & < > also match their HTML entity forms. */
function entityTolerantSource(value) {
    const forms = {
        "'": "(?:'|&apos;|&#0*39;|&#x0*27;)",
        '"': '(?:"|&quot;|&#0*34;|&#x0*22;)',
        '&': '(?:&amp;|&#0*38;|&#x0*26;|&)',
        '<': '(?:<|&lt;|&#0*60;|&#x0*3c;)',
        '>': '(?:>|&gt;|&#0*62;|&#x0*3e;)'
    };
    return value.split('').map(c => forms[c] || escapeRegExp(c)).join('');
}

function addPair(ctx, orig, replacement) {
    if (typeof orig !== 'string' || typeof replacement !== 'string') {
        return;
    }
    // Pairs are stored decoded; matching is entity-tolerant (JSON strings and narratives encode e.g. ' differently)
    const decodedOrig = decodeEntities(orig);
    const decodedReplacement = decodeEntities(replacement);
    if (decodedOrig.length < 3 || decodedOrig === decodedReplacement) {
        return;
    }
    const key = decodedOrig.toLowerCase();
    if (!ctx.pairs.has(key)) {
        ctx.pairs.set(key, { orig: decodedOrig, replacement: decodedReplacement });
    }
    // Short numbers (e.g. a URA) also occur zero-padded to 8 digits
    if (/^[0-9]{3,7}$/.test(decodedOrig) && /^[0-9]+$/.test(decodedReplacement)) {
        addPair(ctx, decodedOrig.padStart(8, '0'), decodedReplacement.padStart(8, '0'));
    }
}

/** Apply all replacement pairs (longest first, case-insensitive, whole words/numbers only) in a single pass. */
function applyPairs(ctx, text) {
    if (typeof text !== 'string' || ctx.pairs.size === 0) {
        return text;
    }
    if (ctx.pairRegexSize !== ctx.pairs.size) {
        const origs = [...ctx.pairs.values()].map(p => p.orig).sort((a, b) => b.length - a.length);
        ctx.pairRegex = new RegExp('(?<![\\p{L}\\p{N}])(?:' + origs.map(entityTolerantSource).join('|') + ')(?![\\p{L}\\p{N}])', 'giu');
        ctx.pairRegexSize = ctx.pairs.size;
    }
    return text.replace(ctx.pairRegex, m => {
        const pair = ctx.pairs.get(decodeEntities(m).toLowerCase());
        return pair ? pair.replacement : m;
    });
}

function recordChange(ctx, where, orig, replacement) {
    ctx.changes.push({ where: ctx.label ? `${ctx.label} ${where}` : where, orig, replacement });
}

/**
 * Give a fake to the person or organization at the locator. The fake linked to that place by an earlier run comes first;
 * otherwise the first fake of the pool not used in this file, preferring fakes that are not linked to another place in it.
 */
function allocate(ctx, type, locator) {
    const fakes = pool[type] || [];
    const code = locator !== undefined ? linkCode(ctx.file, locator) : undefined;
    const free = f => !ctx.fileAssigned.has(f) && !ctx.presentFakes.has(f);
    const fake = (code !== undefined ? fakes.find(f => hasLink(f, code) && !ctx.fileAssigned.has(f)) : undefined)
        || fakes.find(f => free(f) && !isLinkedInFile(f, ctx.file))
        || fakes.find(free);
    if (!fake) {
        ctx.shortage[type] = (ctx.shortage[type] || 0) + 1;
        return { missing: true, type };
    }
    ctx.fileAssigned.add(fake);
    linkFake(ctx, fake, locator);
    return fake;
}

// --- Overlay: replace only PII strings, keep the original structure ---

function addError(ctx, fakePath) {
    ctx.errors.add(`Fake ${ctx.fake.resourceType} ${ctx.fake.id} has no value for ${fakePath} — add it to ${peopleFileLabel}`);
}

/** Replace owner[key] (a string) by the fake's value at the same position, with fallbacks when there is none. */
function overlayString(ctx, owner, key, fakeValue, fieldName, fakePath, kind) {
    const orig = owner[key];
    let replacement;
    if (typeof fakeValue === 'string') {
        replacement = fakeValue;
    } else if (kind === 'identifier' && fieldName === 'value') {
        replacement = scramble(orig, ctx.fake, owner.system);
        ctx.infos.add(`Scrambled identifier value for system ${owner.system || '(none)'} (${ctx.label}) using fake ${ctx.fake.resourceType} ${ctx.fake.id}`);
    } else if (ctx.local.has(orig)) {
        replacement = ctx.local.get(orig);
    } else if (OPTIONAL_KEYS.has(fieldName)) {
        return;
    } else {
        addError(ctx, fakePath);
        return;
    }
    ctx.local.set(orig, replacement);
    if (replacement !== orig) {
        owner[key] = replacement;
        addPair(ctx, orig, replacement);
        recordChange(ctx, fakePath, orig, replacement);
    }
}

/** Fake value for a given name: initials are built from the fake's given names, other names by position. */
function givenReplacement(origGiven, index, fakeGiven) {
    const fakes = Array.isArray(fakeGiven) ? fakeGiven.filter(g => typeof g === 'string' && g.length > 0) : [];
    if (fakes.length === 0) {
        return undefined;
    }
    const orig = origGiven[index];
    if (INITIALS.test(orig)) {
        const count = (orig.match(/[A-Za-z]\./g) || []).length;
        const letters = fakes.filter(g => !INITIALS.test(g)).map(g => g[0].toUpperCase());
        if (letters.length === 0) {
            return fakes[0];
        }
        return letters.slice(0, Math.max(1, count)).map(l => l + '.').join('');
    }
    const candidate = fakes[index];
    return candidate && !INITIALS.test(candidate) ? candidate : fakes[0];
}

function overlayExtensions(ctx, extensions, fakeExtensions, fakePath) {
    for (const ext of extensions) {
        if (!isObject(ext)) {
            continue;
        }
        if (typeof ext.url === 'string' && KEEP_EXTENSION_URLS.some(u => ext.url.includes(u))) {
            continue;
        }
        const fakeExt = Array.isArray(fakeExtensions) ? fakeExtensions.find(e => e && e.url === ext.url) : undefined;
        overlayObject(ctx, ext, fakeExt, `${fakePath}[${shortUrl(ext.url)}]`, undefined);
    }
}

function findFakeBySystem(fakeArray, item, key) {
    if (!Array.isArray(fakeArray) || typeof item.system !== 'string') {
        return undefined;
    }
    if (key === 'telecom') {
        return fakeArray.find(f => f && f.system === item.system && f.use === item.use) || fakeArray.find(f => f && f.system === item.system);
    }
    return fakeArray.find(f => f && f.system === item.system);
}

/** Overlay owner[key] (any kind of value) with the fake's value at the same position. */
function overlayKey(ctx, owner, key, fakeOwner, fakePath, kind) {
    const value = owner[key];
    const fakeValue = isObject(fakeOwner) ? fakeOwner[key] : undefined;

    if (typeof value === 'string') {
        overlayString(ctx, owner, key, fakeValue, key, fakePath, kind);
    } else if (Array.isArray(value)) {
        if (key === 'extension') {
            overlayExtensions(ctx, value, fakeValue, fakePath);
        } else if (key === 'identifier' || key === 'telecom') {
            value.forEach(item => {
                if (isObject(item)) {
                    const label = `${fakePath}[system=${item.system}${key === 'telecom' && item.use ? ',use=' + item.use : ''}]`;
                    overlayObject(ctx, item, findFakeBySystem(fakeValue, item, key), label, key === 'identifier' ? 'identifier' : undefined);
                }
            });
        } else {
            value.forEach((item, i) => {
                if (typeof item === 'string') {
                    let fv = Array.isArray(fakeValue) ? fakeValue[i] : undefined;
                    if (key === 'given') {
                        fv = givenReplacement(value, i, fakeValue);
                    } else if (key === 'alias' && Array.isArray(fakeValue) && fakeValue.length > 0) {
                        fv = fakeValue[Math.min(i, fakeValue.length - 1)];
                    }
                    overlayString(ctx, value, i, fv, key, `${fakePath}[${i}]`, kind);
                } else if (isObject(item)) {
                    let fi = i;
                    if (CLAMPED_ARRAYS.has(key) && Array.isArray(fakeValue) && fakeValue.length > 0) {
                        fi = Math.min(i, fakeValue.length - 1);
                    }
                    overlayObject(ctx, item, Array.isArray(fakeValue) ? fakeValue[fi] : undefined, `${fakePath}[${fi}]`, undefined);
                }
            });
        }
    } else if (isObject(value)) {
        overlayObject(ctx, value, fakeValue, fakePath, kind);
    }
}

function overlayObject(ctx, orig, fake, fakePath, kind) {
    const keys = Object.keys(orig);
    // Extensions last, so they can reuse values replaced earlier in the same element
    const ordered = keys.filter(k => k !== 'extension').concat(keys.filter(k => k === 'extension'));
    for (const key of ordered) {
        if (KEEP_KEYS.has(key)) {
            continue;
        }
        if (/^value[A-Z]/.test(key) && !PII_VALUE_KEYS.has(key)) {
            continue;
        }
        overlayKey(ctx, orig, key, fake, fakePath ? `${fakePath}.${key}` : key, kind);
    }
}

function addBirthDatePairs(ctx, orig, replacement) {
    const o = /^(\d{4})-(\d{2})-(\d{2})$/.exec(orig);
    const n = /^(\d{4})-(\d{2})-(\d{2})$/.exec(replacement);
    if (!o || !n) {
        return;
    }
    const formats = [
        (m) => `${m[3]}-${m[2]}-${m[1]}`,
        (m) => `${Number(m[3])}-${Number(m[2])}-${m[1]}`,
        (m) => `${Number(m[3])} ${DUTCH_MONTHS[Number(m[2]) - 1]} ${m[1]}`
    ];
    for (const format of formats) {
        addPair(ctx, format(o), format(n));
    }
}

/**
 * Overlay the configured elements of target (a person resource or a contact) with the fake's values.
 * fakeView maps element names to the fake's values; fakePaths gives the path to report for them.
 */
function overlayElements(ctx, target, elements, fakeView, fakePaths) {
    for (const element of elements) {
        if (element === 'photo') {
            if (target.photo !== undefined || target._photo !== undefined) {
                delete target.photo;
                delete target._photo;
                ctx.warnings.push(`${ctx.label}: photo removed (cannot be pseudonymized)`);
                recordChange(ctx, 'photo', '(photo)', '(removed)');
            }
            continue;
        }
        if (element === 'deceasedDateTime') {
            if (target.deceasedDateTime !== undefined) {
                ctx.warnings.push(`${ctx.label}: deceasedDateTime ${target.deceasedDateTime} kept as-is (cannot be pseudonymized)`);
            }
            continue;
        }
        for (const key of [element, '_' + element]) {
            if (target[key] === undefined) {
                continue;
            }
            ctx.local = new Map();
            const orig = target[key];
            overlayKey(ctx, target, key, fakeView, (fakePaths && fakePaths[key]) || key, undefined);
            if (key === 'birthDate' && typeof orig === 'string' && typeof target[key] === 'string') {
                addBirthDatePairs(ctx, orig, target[key]);
            }
        }
    }
}

function resourceLabel(res) {
    return `${res.resourceType}${res.id ? '/' + res.id : ''}`;
}

/** Place of a resource in its file, for links: Type/id, or Container/id.contained(id) for a contained resource. */
function resourceLocator(item) {
    if (!item.res.id) {
        return undefined;
    }
    return item.contained ? `${resourceLabel(item.container)}.contained(${item.res.id})` : resourceLabel(item.res);
}

function pseudonymizePerson(ctx, res, fake) {
    ctx.fake = fake;
    ctx.label = resourceLabel(res);
    overlayElements(ctx, res, config.persons[res.resourceType], fake, null);
}

function pseudonymizeContact(ctx, res, contact, contactConfig, fake) {
    ctx.fake = fake;
    ctx.label = `${resourceLabel(res)} contact`;
    const view = {
        name: fake.name && fake.name[0],
        telecom: fake.telecom,
        address: fake.address && fake.address[0],
        birthDate: fake.birthDate
    };
    overlayElements(ctx, contact, contactConfig.elements, view, { name: 'name[0]', _name: '_name[0]', address: 'address[0]', _address: '_address[0]' });
}

// --- Resources and references in a file ---

/** Collect the resource itself, its contained resources and (for Bundles) all entry resources, recursively. */
function collectResources(root) {
    const items = [];
    const byTypeId = new Map();
    const byFullUrl = new Map();

    function add(res, container, fullUrl) {
        if (!isObject(res) || typeof res.resourceType !== 'string') {
            return;
        }
        const item = { res, container: container || res, contained: !!container };
        items.push(item);
        if (!container) {
            if (res.id) {
                byTypeId.set(`${res.resourceType}/${res.id}`, res);
            }
            if (fullUrl) {
                byFullUrl.set(fullUrl, res);
            }
        }
        for (const c of (res.contained || [])) {
            add(c, container || res, undefined);
        }
        if (res.resourceType === 'Bundle') {
            for (const entry of (res.entry || [])) {
                add(entry.resource, undefined, entry.fullUrl);
            }
        }
    }

    add(root, undefined, undefined);
    return { items, byTypeId, byFullUrl };
}

/** Derive the type (and the resource, if it is in this file) from a Reference.reference value. */
function resolveReference(index, item, reference) {
    if (reference.startsWith('#')) {
        const c = (item.container.contained || []).find(r => r.id === reference.substring(1));
        return { type: c ? c.resourceType : undefined, res: c };
    }
    const byUrl = index.byFullUrl.get(reference);
    if (byUrl) {
        return { type: byUrl.resourceType, res: byUrl };
    }
    const m = /(?:^|\/)([A-Z][A-Za-z]+)\/([^/]+?)(?:\/_history\/[^/]+)?$/.exec(reference);
    if (m && !reference.startsWith('urn:')) {
        return { type: m[1], res: index.byTypeId.get(`${m[1]}/${m[2]}`) };
    }
    return { type: undefined, res: undefined };
}

// --- Mentions (display names and identifiers in references etc.) ---

function fakeIdentifierValue(ctx, fake, identifier) {
    const same = (fake.identifier || []).find(i => i.system === identifier.system && i.value);
    if (same) {
        return same.value;
    }
    ctx.infos.add(`Scrambled identifier value for system ${identifier.system || '(none)'} (${ctx.label}) using fake ${fake.resourceType} ${fake.id}`);
    return scramble(identifier.value, fake, identifier.system);
}

const INITIALS_SEGMENT = /^((?:[A-Z]\.)+|[A-Z]{1,5}\.?)(?:\s+(?:van der|van den|van 't|van|de|den|der|ter|ten|te))?(\s+\([^)]*\))?$/;
const GIVEN_SEGMENT = /^\p{Lu}[\p{L}'-]+$/u;
const PREFIX_SEGMENT = /^(?:van der|van den|van 't|van|de|den|der|ter|ten|te)$/;
const ROLE_WORD = /arts|chirurg|loog|internist|verpleegkundig|huisarts|specialist|apotheker|assistent|physician|^md$/i;

/** Does a (PractitionerRole) display contain a person name, or only role text? */
function looksLikePersonDisplay(name) {
    if (/\(role\)/i.test(name)) {
        return true;
    }
    const segments = name.split(', ');
    return (segments.length > 1 && INITIALS_SEGMENT.test(segments[1])) || INITIALS_FIRST.test(segments[0]);
}
const INITIALS_FIRST = /^((?:[A-Za-z]\.)+|[A-Za-z]{1,5}\.)\s+(.+)$/;
const TITLES = /^(dr|drs|mr|ir|prof|mevr|mw|dhr)\.$/i;

/** Initials of the fake in the dot style of the original token (CP, CP., G.Z.M.). */
function fakeInitials(token, fake) {
    const letters = fake.name[0].given.filter(g => typeof g === 'string' && g.length > 0 && !INITIALS.test(g)).map(g => g[0].toUpperCase());
    const count = Math.max(1, (token.match(/[A-Za-z]/g) || []).length);
    const taken = letters.slice(0, count);
    if (/^([A-Za-z]\.)+$/.test(token)) {
        return taken.map(l => l + '.').join('');
    }
    return taken.join('') + (token.endsWith('.') ? '.' : '');
}

/**
 * Render the fake in the style of a display, keeping the role: "Schroder, CP, Arts" becomes "Testmans, JP, Arts",
 * "E. Sieders, Chirurg" becomes "J. Testmans, Chirurg" and "Healthcare professional (role), Peter van Pulver, Huisartsen"
 * keeps its prefix and role. The original family name is replaced in the role part as well.
 * The pairs for the narratives are added too.
 */
function renderMentionName(ctx, name, fake) {
    const fakeText = fake.name[0].text;
    const fakeFamily = fake.name[0].family;
    if (name.includes(':')) {
        return fakeText;
    }
    const segments = name.split(', ');
    let n = 0;
    while (n < segments.length - 1 && /\(role\)$/i.test(segments[n])) {
        n++;
    }
    const prefix = segments.slice(0, n);
    let rest = segments.slice(n);
    // "Patient, B. van Kester": a label first, then the name with dotted initials
    const nameAt = rest.findIndex((seg, i) => i > 0 && /^(?:[A-Z]\.)+\s+\S/.test(seg) && !INITIALS_SEGMENT.test(seg));
    if (nameAt > 0) {
        prefix.push(...rest.slice(0, nameAt));
        rest = rest.slice(nameAt);
    }
    const first = rest[0];
    const inverted = rest.length > 1 ? INITIALS_SEGMENT.exec(rest[1]) : null;
    const initialsFirst = INITIALS_FIRST.exec(first);
    let family;
    let rendered;
    let roleParts;
    let origNamePart;
    if (inverted) {
        family = first;
        rendered = `${fakeFamily}, ${fakeInitials(inverted[1], fake)}${inverted[2] || ''}`;
        origNamePart = `${first}, ${rest[1]}`;
        roleParts = rest.slice(2);
    } else if (rest.length > 1 && !/\s/.test(first) && GIVEN_SEGMENT.test(rest[1]) && !ROLE_WORD.test(rest[1])) {
        // "Family, Given[, prefix]"
        family = first;
        const hasPrefix = rest.length > 2 && PREFIX_SEGMENT.test(rest[2]);
        rendered = `${fakeFamily}, ${fake.name[0].given[0]}`;
        origNamePart = rest.slice(0, hasPrefix ? 3 : 2).join(', ');
        roleParts = rest.slice(hasPrefix ? 3 : 2);
    } else if (initialsFirst && TITLES.test(initialsFirst[1])) {
        family = initialsFirst[2].split(/\s+/).slice(1).join(' ') || initialsFirst[2];
        rendered = `${initialsFirst[1]} ${fakeText}`;
        origNamePart = first;
        roleParts = rest.slice(1);
    } else if (initialsFirst) {
        family = initialsFirst[2];
        rendered = `${fakeInitials(initialsFirst[1], fake)} ${fakeFamily}`;
        origNamePart = first;
        roleParts = rest.slice(1);
    } else {
        const words = first.split(/\s+/);
        family = words.length > 1 ? words.slice(1).join(' ') : first;
        rendered = fakeText;
        origNamePart = first;
        roleParts = rest.slice(1);
    }
    const candidates = [family];
    const lastWord = family.split(/\s+/).pop();
    if (lastWord !== family) {
        candidates.push(lastWord);
    }
    const usable = candidates.filter(c => c.length >= 4);
    for (const c of usable) {
        addPair(ctx, c, fakeFamily);
    }
    addPair(ctx, origNamePart, rendered);
    let role = roleParts.join(', ');
    if (usable.length > 0 && role.length > 0) {
        role = role.replace(wordRegex(usable, 'giu'), fakeFamily);
    }
    return [...prefix, rendered, ...(role.length > 0 ? [role] : [])].join(', ');
}

function setMentionName(ctx, obj, field, replacement, where) {
    if (obj[field] !== replacement) {
        recordChange(ctx, where, obj[field], replacement);
        obj[field] = replacement;
        return true;
    }
    return false;
}

function setMentionIdentifier(ctx, obj, field, replacement, where) {
    const identifier = obj[field];
    if (replacement !== undefined && identifier.value !== replacement) {
        recordChange(ctx, where, identifier.value, replacement);
        addPair(ctx, identifier.value, replacement);
        identifier.value = replacement;
        return true;
    }
    return false;
}

/** Narrative/display pairs for the distinctive words of a real organization name (e.g. Wilhelmina, Tjongerschans). */
function addOrgTokens(ctx, realName, fake) {
    const words = realName.split(/\s+/);
    if (words.length < 2) {
        return;
    }
    for (const w of words) {
        const word = w.replace(/[^\p{L}\p{N}]/gu, '');
        if (word.length >= 4 && !/^[0-9]+$/.test(word) && !GENERIC_ORG_WORD.test(word)) {
            addPair(ctx, word, word.toUpperCase() === word ? fake.alias[0] : orgDistinctWord(fake));
        }
    }
}

function pseudonymizeOrganization(ctx, res, fake) {
    ctx.fake = fake;
    ctx.label = resourceLabel(res);
    const origName = res.name;
    const origIdentifiers = (res.identifier || []).map(i => i.value).filter(v => typeof v === 'string');
    const origEmails = (res.telecom || []).filter(t => t.system === 'email' && typeof t.value === 'string').map(t => t.value);
    // An abbreviation (UMCG) becomes the fake's abbreviation, a full name its full name
    const abbreviation = isAbbreviation(origName);
    const view = Object.assign({}, fake, {
        name: abbreviation ? fake.alias[0] : fake.name,
        alias: abbreviation ? [fake.name] : fake.alias
    });
    overlayElements(ctx, res, orgConfig.elements, view, null);
    addOrgTokens(ctx, origName, fake);
    for (const email of origEmails) {
        const domain = email.substring(email.indexOf('@') + 1);
        if (domain.length >= 5 && !/^(gmail|hotmail|outlook|live|ziggo|kpn|example)/i.test(domain)) {
            addPair(ctx, domain, 'example.nl');
            const label = domain.split('.')[0];
            if (label.length >= 5) {
                addPair(ctx, label, orgDistinctWord(fake));
            }
        }
    }
    ctx.orgFakes.push({ origName, origIdentifiers: new Set(origIdentifiers), fake });
}

/** Apply the replacement pairs to every PII-capable string of a resource (used for Locations). */
function applyPairsDeep(ctx, node) {
    if (Array.isArray(node)) {
        node.forEach((n, i) => {
            if (typeof n === 'string') {
                node[i] = applyPairs(ctx, n);
            } else {
                applyPairsDeep(ctx, n);
            }
        });
    } else if (isObject(node)) {
        for (const key of Object.keys(node)) {
            if (KEEP_KEYS.has(key) || key === 'resourceType' || key === 'meta' || key === 'text') {
                continue;
            }
            if (typeof node[key] === 'string') {
                const result = applyPairs(ctx, node[key]);
                if (result !== node[key]) {
                    recordChange(ctx, key, node[key], result);
                    node[key] = result;
                }
            } else {
                applyPairsDeep(ctx, node[key]);
            }
        }
    }
}

/** A Location only follows the organization replacements of the file; the address of a replaced organization's location is replaced too. */
function processLocation(ctx, res) {
    ctx.label = resourceLabel(res);
    const match = ctx.orgFakes.find(o => equalsIgnoreCase(res.name, o.origName) || (res.identifier || []).some(i => o.origIdentifiers.has(i.value)));
    applyPairsDeep(ctx, res);
    if (match) {
        ctx.fake = match.fake;
        const view = { address: match.fake.address && match.fake.address[0], telecom: match.fake.telecom };
        overlayElements(ctx, res, ['address', 'telecom'], view, { address: 'address[0]', _address: '_address[0]' });
    }
}

function processOrgMention(ctx, obj, nameField, identifierField, name, identifier, target, where, identWhere) {
    if (name === undefined || isKeptOrgName(name)) {
        return false;
    }
    let changed = false;
    const targetFake = target ? ctx.fakeOf.get(target) : undefined;
    if (targetFake) {
        if (targetFake.keep || targetFake.missing) {
            return false;
        }
        let result = applyPairs(ctx, name);
        if (!isFakeOrgString(result)) {
            result = renderOrgName(name, targetFake);
        }
        changed = setMentionName(ctx, obj, nameField, result, where);
        if (identifier !== undefined) {
            changed = setMentionIdentifier(ctx, obj, identifierField, fakeIdentifierValue(ctx, targetFake, identifier), identWhere) || changed;
        }
        return changed;
    }
    const key = `${ORG}|${name}`;
    const result = applyPairs(ctx, name);
    if (isFakeOrgString(result)) {
        // Link the fake (also when already fake), so a run on the original data gives it the same fake again
        linkMentionFake(ctx, key, findFakeOrgInString(result));
        return setMentionName(ctx, obj, nameField, result, where);
    }
    let fake = ctx.mentionFakes.get(key);
    if (!fake) {
        fake = allocate(ctx, ORG, ctx.locator);
        ctx.mentionFakes.set(key, fake);
    }
    if (fake.missing) {
        return false;
    }
    ctx.fake = fake;
    const rendered = renderOrgName(name, fake);
    changed = setMentionName(ctx, obj, nameField, rendered, where);
    addPair(ctx, name, rendered);
    addOrgTokens(ctx, name, fake);
    if (identifier !== undefined) {
        changed = setMentionIdentifier(ctx, obj, identifierField, fakeIdentifierValue(ctx, fake, identifier), identWhere) || changed;
    }
    return changed;
}

function processMention(ctx, index, item, mention, obj) {
    const nameField = mention.name || 'display';
    const identifierField = mention.identifier || 'identifier';
    const where = `${mention.path}.${nameField}`;
    const identWhere = `${mention.path}.${identifierField}.value`;
    // Place of this mention for links: resource, path and the number of the mention at that path
    const resLocator = resourceLocator(item);
    const mentionPath = `${resLocator}${mention.path.substring(item.res.resourceType.length)}`;
    const ordinal = ctx.mentionOrdinals.get(mentionPath) || 0;
    ctx.mentionOrdinals.set(mentionPath, ordinal + 1);
    ctx.locator = resLocator !== undefined ? `${mentionPath}[${ordinal}]` : undefined;
    const name = typeof obj[nameField] === 'string' && obj[nameField].length > 0 ? obj[nameField] : undefined;
    const identifier = isObject(obj[identifierField]) && typeof obj[identifierField].value === 'string' ? obj[identifierField] : undefined;
    if (name === undefined && identifier === undefined) {
        return false;
    }
    ctx.label = resourceLabel(item.res);

    // Determine the type of the mentioned person
    let derived;
    let target;
    if (typeof obj.reference === 'string') {
        const r = resolveReference(index, item, obj.reference);
        derived = r.type;
        target = r.res;
    }
    if (derived === undefined && typeof obj.type === 'string' && /^[A-Z][A-Za-z]+$/.test(obj.type)) {
        derived = obj.type;
    }
    // A PractitionerRole display embeds the practitioner's name: handle it as a Practitioner mention
    if (derived === 'PractitionerRole') {
        derived = 'Practitioner';
        const practitionerRef = target && isObject(target.practitioner) ? target.practitioner.reference : undefined;
        target = typeof practitionerRef === 'string' ? resolveReference(index, item, practitionerRef).res : undefined;
        // A role-only display ("Huisartsen, niet apotheekhoudend") has no name in it: leave it alone
        if (!target && name !== undefined && !looksLikePersonDisplay(name)) {
            return false;
        }
        // The display of a role may be the organization name (ADRZ): follow the organization replacements
        if (name !== undefined) {
            if (isFakeOrgString(name) && !isFakeStringOfAnyType(name)) {
                return false;
            }
            const viaPairs = applyPairs(ctx, name);
            if (viaPairs !== name && isFakeOrgString(viaPairs) && !isFakeStringOfAnyType(viaPairs)) {
                return setMentionName(ctx, obj, nameField, viaPairs, where);
            }
        }
    }
    const type = derived || (mention.type !== 'reference' ? mention.type : undefined);
    if (type === undefined) {
        if (name !== undefined && !isFakeStringOfAnyType(name)) {
            ctx.warnings.push(`${ctx.file}: cannot determine the type of ${mention.path} (${ctx.label}), display "${name}" — review manually`);
        }
        return false;
    }
    if (type === ORG) {
        return processOrgMention(ctx, obj, nameField, identifierField, name, identifier, target, where, identWhere);
    }
    if (type === 'Location') {
        if (name !== undefined) {
            ctx.deferred.push({ obj, nameField, where, label: ctx.label });
        }
        return false;
    }
    if (!config.persons[type]) {
        return false;
    }
    // Displays that are not a person although typed as one (e.g. an insurer modelled as Practitioner)
    if (name !== undefined && keepDisplays.some(r => r.test(name))) {
        return false;
    }

    let changed = false;

    // a) the person is in this file: use its fake
    const targetFake = target ? ctx.fakeOf.get(target) : undefined;
    if (targetFake) {
        if (targetFake.missing) {
            return false;
        }
        if (name !== undefined) {
            let result = applyPairs(ctx, name);
            if (!containsWord(result, targetFake.name[0].family)) {
                result = renderMentionName(ctx, name, targetFake);
            }
            changed = setMentionName(ctx, obj, nameField, result, where) || changed;
        }
        if (identifier !== undefined) {
            changed = setMentionIdentifier(ctx, obj, identifierField, fakeIdentifierValue(ctx, targetFake, identifier), identWhere) || changed;
        }
        return changed;
    }

    // b) apply the replacements of this file; done when that makes it fake
    const key = `${type}|${name !== undefined ? name : identifier.value}`;
    const identifierIsFake = identifier !== undefined && (pool[type] || []).some(f => (f.identifier || []).some(i => i.system === identifier.system && i.value === identifier.value));
    if (name !== undefined) {
        const result = applyPairs(ctx, name);
        if (isFakeString(result, type)) {
            // Link the fake (also when already fake), so a run on the original data gives it the same fake again
            linkMentionFake(ctx, key, pool[type].find(f => containsWord(result, f.name[0].family)));
            changed = setMentionName(ctx, obj, nameField, result, where) || changed;
            if (identifier !== undefined) {
                const identResult = applyPairs(ctx, identifier.value);
                changed = setMentionIdentifier(ctx, obj, identifierField, identResult, identWhere) || changed;
            }
            return changed;
        }
        // c) already fake: leave it
        if (isFakeString(name, type)) {
            return false;
        }
    } else if (identifierIsFake) {
        linkMentionFake(ctx, key, pool[type].find(f => (f.identifier || []).some(i => i.system === identifier.system && i.value === identifier.value)));
        return false;
    }

    // d) a person that is not in this file: reuse the fake of the same string, or allocate a new one
    let fake = ctx.mentionFakes.get(key);
    if (!fake) {
        fake = allocate(ctx, type, ctx.locator);
        ctx.mentionFakes.set(key, fake);
    }
    if (fake.missing) {
        return false;
    }
    ctx.fake = fake;
    if (name !== undefined) {
        const rendered = renderMentionName(ctx, name, fake);
        changed = setMentionName(ctx, obj, nameField, rendered, where) || changed;
        addPair(ctx, name, rendered);
        // Displays are often wrapped ("Patient name: 'Jan Jansen'."); narratives may only contain the inner name
        const inner = /^[^:]{0,60}:\s*['"]?(.*?)['"]?\.?$/.exec(decodeEntities(name));
        if (inner && inner[1].length >= 3) {
            addPair(ctx, inner[1], fake.name[0].text);
            const words = inner[1].split(/\s+/);
            if (words.length >= 3 || (words.length === 2 && words[1].length >= 5)) {
                addPair(ctx, words.slice(1).join(' '), fake.name[0].family);
            }
        }
    }
    if (identifier !== undefined) {
        changed = setMentionIdentifier(ctx, obj, identifierField, fakeIdentifierValue(ctx, fake, identifier), identWhere) || changed;
    }
    return changed;
}

/**
 * Walk every object of a resource (not into contained or bundled resources, which are items of their own) and
 * call visit(obj, path) for each object that looks like a Reference: a string display plus a reference, type or identifier.
 */
function walkReferences(node, pathName, visit) {
    if (Array.isArray(node)) {
        node.forEach(n => walkReferences(n, pathName, visit));
    } else if (isObject(node)) {
        if (typeof node.display === 'string' && (typeof node.reference === 'string' || typeof node.type === 'string' || isObject(node.identifier))) {
            visit(node, pathName);
        }
        for (const [key, value] of Object.entries(node)) {
            if (value !== null && typeof value === 'object' && !(pathName.indexOf('.') < 0 && (key === 'contained' || key === 'entry'))) {
                walkReferences(value, `${pathName}.${key}`, visit);
            }
        }
    }
}

/** Apply the replacement pairs to identifier[].type.text and note[].text (not into contained or bundled resources). */
function replaceInFreeText(ctx, node, isRoot) {
    if (Array.isArray(node)) {
        node.forEach(n => replaceInFreeText(ctx, n, false));
    } else if (isObject(node)) {
        for (const [key, value] of Object.entries(node)) {
            if (isRoot && (key === 'contained' || key === 'entry')) {
                continue;
            }
            if (key === 'identifier' && Array.isArray(value)) {
                for (const i of value) {
                    if (isObject(i) && isObject(i.type) && typeof i.type.text === 'string') {
                        const result = applyPairs(ctx, i.type.text);
                        if (result !== i.type.text) {
                            recordChange(ctx, 'identifier.type.text', i.type.text, result);
                            i.type.text = result;
                        }
                    }
                }
            } else if (key === 'note' && Array.isArray(value)) {
                for (const a of value) {
                    if (isObject(a) && typeof a.text === 'string') {
                        const result = applyPairs(ctx, a.text);
                        if (result !== a.text) {
                            recordChange(ctx, 'note.text', a.text, result);
                            a.text = result;
                        }
                    }
                }
            } else if (value !== null && typeof value === 'object') {
                replaceInFreeText(ctx, value, false);
            }
        }
    }
}

// --- Narratives ---

function replaceInNarrative(ctx, textObj) {
    if (isObject(textObj) && typeof textObj.div === 'string') {
        const result = applyPairs(ctx, textObj.div);
        if (result !== textObj.div) {
            textObj.div = result;
            ctx.changes.push({ where: `${ctx.label} text.div`, orig: '(narrative)', replacement: '(narrative updated)' });
        }
    }
}

function replaceInSections(ctx, sections) {
    for (const s of (Array.isArray(sections) ? sections : [])) {
        if (isObject(s)) {
            replaceInNarrative(ctx, s.text);
            replaceInSections(ctx, s.section);
        }
    }
}

// --- Main processing of one file ---

function processFile(file) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
        console.error(`ERROR: File not found: ${filePath}`);
        return false;
    }
    // Only examples are pseudonymized; organizations elsewhere (input/resources, input/vocabulary) are public data
    const relativeToExamples = path.relative(examplesDir, filePath);
    if (relativeToExamples.startsWith('..') || path.isAbsolute(relativeToExamples)) {
        console.error(`ERROR: Not an example file (only input/examples is pseudonymized): ${filePath}`);
        return false;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const original = JSON.parse(raw);
    const root = JSON.parse(raw);
    const ctx = createContext(path.basename(filePath), root);
    // Fakes that already occur in this file must not be handed out to another person in it
    for (const fake of Object.values(pool).flat()) {
        if (occursIn(raw, fake)) {
            ctx.presentFakes.add(fake);
        }
    }
    const index = collectResources(root);

    // Persons, contacts and organizations
    for (const item of index.items) {
        const res = item.res;
        const locator = resourceLocator(item);
        if (res.resourceType === ORG && typeof res.name === 'string') {
            if (isKeptOrgName(res.name)) {
                ctx.fakeOf.set(res, { keep: true });
            } else {
                const existing = findFakeOrgByName(res.name);
                if (existing) {
                    ctx.fakeOf.set(res, existing);
                    linkFake(ctx, existing, locator);
                } else {
                    const fake = allocate(ctx, ORG, locator);
                    ctx.fakeOf.set(res, fake);
                    if (!fake.missing) {
                        pseudonymizeOrganization(ctx, res, fake);
                        ctx.orgs++;
                    }
                }
            }
        }
        if (config.persons[res.resourceType]) {
            const existing = findFakeByName(res.name || [], res.resourceType);
            if (existing) {
                ctx.fakeOf.set(res, existing);
                linkFake(ctx, existing, locator);
            } else {
                const fake = allocate(ctx, res.resourceType, locator);
                ctx.fakeOf.set(res, fake);
                if (!fake.missing) {
                    pseudonymizePerson(ctx, res, fake);
                    ctx.persons++;
                }
            }
        }
        for (const [contactPath, contactConfig] of Object.entries(config.contacts || {})) {
            if (contactPath.split('.')[0] !== res.resourceType) {
                continue;
            }
            fhirpath.evaluate(res, contactPath, null, fhirpath_stu3_model).forEach((contact, i) => {
                if (!isObject(contact) || !isObject(contact.name)) {
                    return;
                }
                const contactLocator = locator !== undefined ? `${locator}${contactPath.substring(res.resourceType.length)}[${i}]` : undefined;
                const existing = findFakeByName([contact.name], contactConfig.type);
                if (existing) {
                    linkFake(ctx, existing, contactLocator);
                    return;
                }
                const fake = allocate(ctx, contactConfig.type, contactLocator);
                if (!fake.missing) {
                    pseudonymizeContact(ctx, res, contact, contactConfig, fake);
                    ctx.persons++;
                }
            });
        }
    }

    // Known real organizations (e.g. UMCG) that occur anywhere in the file get a fake as well.
    // Longest names first; a name that is the first word of another one (UMCG / Umcg Groningen) shares its fake.
    const handledNames = [];
    for (const realName of [...(orgConfig.replaceNames || [])].sort((x, y) => y.length - x.length)) {
        // Linked by its position in the config, so the tag does not hold the name
        const locator = `organizations.replaceNames[${orgConfig.replaceNames.indexOf(realName)}]`;
        if (!containsWord(raw, realName)) {
            // Already replaced by an earlier run: keep the link while its fake is in the file
            linkFake(ctx, pool[ORG].find(f => ctx.presentFakes.has(f) && hasLink(f, linkCode(ctx.file, locator))), locator);
            continue;
        }
        if (ctx.pairs.has(realName.toLowerCase()) || isKeptOrgName(realName)) {
            continue;
        }
        const related = handledNames.find(h => h.name.toLowerCase().split(' ')[0] === realName.toLowerCase() || realName.toLowerCase().split(' ')[0] === h.name.toLowerCase());
        const fake = related ? related.fake : allocate(ctx, ORG, locator);
        handledNames.push({ name: realName, fake });
        if (!fake.missing) {
            ctx.label = '';
            addPair(ctx, realName, renderOrgName(realName, fake));
            addOrgTokens(ctx, realName, fake);
            if (!related) {
                ctx.orgs++;
            }
        }
    }

    // Locations follow the organization replacements of the file
    for (const item of index.items) {
        if (item.res.resourceType === 'Location') {
            processLocation(ctx, item.res);
        }
    }

    // Mentions: configured paths first, then every other Reference-like object
    const handled = new Set();
    for (const item of index.items) {
        for (const mention of config.mentions) {
            if (mention.path.split('.')[0] !== item.res.resourceType) {
                continue;
            }
            for (const obj of fhirpath.evaluate(item.res, mention.path, null, fhirpath_stu3_model)) {
                if (isObject(obj) && !handled.has(obj)) {
                    handled.add(obj);
                    if (processMention(ctx, index, item, mention, obj)) {
                        ctx.mentions++;
                    }
                }
            }
        }
        walkReferences(item.res, item.res.resourceType, (obj, objPath) => {
            if (!handled.has(obj)) {
                handled.add(obj);
                if (processMention(ctx, index, item, { path: objPath, type: 'reference' }, obj)) {
                    ctx.mentions++;
                }
            }
        });
    }

    // Location displays follow the organization replacements, wherever the organization was found
    for (const d of ctx.deferred) {
        const result = applyPairs(ctx, d.obj[d.nameField]);
        if (result !== d.obj[d.nameField]) {
            ctx.label = d.label;
            recordChange(ctx, d.where, d.obj[d.nameField], result);
            d.obj[d.nameField] = result;
            ctx.mentions++;
        }
    }

    // Labels and free text that name an organization: identifier type texts and notes
    for (const item of index.items) {
        ctx.label = resourceLabel(item.res);
        replaceInFreeText(ctx, item.res, true);
    }

    // Narratives
    for (const item of index.items) {
        ctx.label = resourceLabel(item.res);
        replaceInNarrative(ctx, item.res.text);
        replaceInSections(ctx, item.res.section);
    }

    // Report
    for (const w of ctx.warnings) {
        console.error(`WARNING: ${w}`);
    }
    for (const i of ctx.infos) {
        console.log(`INFO: ${i}`);
    }
    let ok = true;
    for (const e of ctx.errors) {
        console.error(`ERROR: ${ctx.file}: ${e}`);
        ok = false;
    }
    const shortage = Object.entries(ctx.shortage);
    if (shortage.length > 0) {
        console.error(`ERROR: ${ctx.file}: Not enough fake people in ${peopleFileLabel}: add ${shortage.map(([t, n]) => `${n} ${t}`).join(', ')}.`);
        for (const [t, n] of shortage) {
            maxShortage[t] = Math.max(maxShortage[t] || 0, n);
        }
        ok = false;
    }
    if (!ok) {
        console.error(`Not written: ${file}`);
        return false;
    }

    const changed = JSON.stringify(root) !== JSON.stringify(original);
    if (dryRun) {
        for (const c of ctx.changes) {
            console.log(`  ${c.where}: ${c.orig} → ${c.replacement}`);
        }
        console.log(changed
            ? `Would pseudonymize: ${file} (${ctx.persons} persons, ${ctx.orgs} organizations, ${ctx.mentions} mentions)`
            : `Already pseudonymized: ${file}`);
    } else if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(root, null, 4), 'utf8');
        console.log(`Pseudonymized: ${file} (${ctx.persons} persons, ${ctx.orgs} organizations, ${ctx.mentions} mentions)`);
    } else {
        console.log(`Already pseudonymized: ${file}`);
    }
    // Also for an already pseudonymized file, so its fakes get linked to their places. Only fakes that ended up
    // in the file: a known organization name that only occurred in a replaced element got a fake that is not used.
    if (!dryRun) {
        const output = JSON.stringify(root);
        updateLinks(ctx.file, ctx.links.filter(l => occursIn(output, l.fake)));
    }
    return true;
}

let hasErrors = false;
for (const file of files) {
    if (!processFile(file)) {
        hasErrors = true;
    }
}
const totals = Object.entries(maxShortage);
if (totals.length > 0 && files.length > 1) {
    console.error(`In total, add ${totals.map(([t, n]) => `${n} ${t}`).join(', ')} to ${peopleFileLabel}`);
}
if (poolChanged && !dryRun) {
    fs.writeFileSync(peopleFile, JSON.stringify(poolBundle, null, 4) + '\n', 'utf8');
}
process.exit(hasErrors ? 1 : 0);
