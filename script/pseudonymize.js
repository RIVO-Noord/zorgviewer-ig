const fs = require('fs');
const path = require('path');
const fhirpath = require('fhirpath');
const fhirpath_stu3_model = require('fhirpath/fhir-context/stu3');

const pathsFile = path.join(__dirname, 'pseudonymize-paths.json');
const translateFile = path.join(__dirname, 'pseudonymize-translate.json');

// --- Command line ---

const exampleFile = process.argv[2];
if (!exampleFile) {
    console.error('Usage: node pseudonymize.js <example-file>');
    process.exit(1);
}

const filePath = path.resolve(exampleFile);
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

// --- Load configuration ---

const fhirPaths = JSON.parse(fs.readFileSync(pathsFile, 'utf8'));

let translations = {};
if (fs.existsSync(translateFile)) {
    translations = JSON.parse(fs.readFileSync(translateFile, 'utf8'));
} else {
    console.error(`ERROR: Translate file not found: ${translateFile}`);
    console.error('Download it from the secure location and place it in the script/ directory.');
    console.error('If it changes during processing, update it in the secure location.');
    process.exit(1);
}

const resource = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// --- FHIRPath-based navigation and replacement ---

/**
 * Split a FHIRPath into a parent path and leaf property name.
 * Uses fhirpath.js to navigate to parent objects (by reference),
 * then replaces the leaf property value in-place.
 *
 * E.g. "Patient.name.family" → parent="Patient.name", leaf="family"
 *      "Patient.identifier.where(system='http://x').value" → parent="Patient.identifier.where(system='http://x')", leaf="value"
 */
function splitParentAndLeaf(fp) {
    let parenDepth = 0;
    let lastDot = -1;
    for (let i = 0; i < fp.length; i++) {
        if (fp[i] === '(') parenDepth++;
        else if (fp[i] === ')') parenDepth--;
        else if (fp[i] === '.' && parenDepth === 0) lastDot = i;
    }
    if (lastDot === -1) return null;
    return { parentPath: fp.substring(0, lastDot), leaf: fp.substring(lastDot + 1) };
}

/**
 * Replace values at locations identified by a FHIRPath expression.
 * Uses fhirpath.evaluate on the parent path to get object references,
 * then replaces the leaf property value using the valueMap.
 */
function replaceAtPath(resource, fhirPathExpr, valueMap) {
    const parts = splitParentAndLeaf(fhirPathExpr);
    if (!parts) return;

    const parents = fhirpath.evaluate(resource, parts.parentPath, null, fhirpath_stu3_model);

    for (const parent of parents) {
        if (!parent || typeof parent !== 'object') continue;
        const current = parent[parts.leaf];
        if (current === undefined) continue;

        if (Array.isArray(current)) {
            parent[parts.leaf] = current.map(v =>
                typeof v === 'string' && valueMap[v] !== undefined ? valueMap[v] : v
            );
        } else if (typeof current === 'string' && valueMap[current] !== undefined) {
            parent[parts.leaf] = valueMap[current];
        }
    }
}

/**
 * Replace old values with new values in the resource's text.div narrative.
 * Sorts replacements longest-first to avoid partial matches.
 */
function replaceInNarrative(resource, replacements) {
    if (!resource.text || !resource.text.div) return;

    const sorted = [...replacements]
        .filter(r => r.oldValue.length >= 2 && r.newValue !== r.oldValue)
        .sort((a, b) => b.oldValue.length - a.oldValue.length);

    for (const { oldValue, newValue } of sorted) {
        const escaped = oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        resource.text.div = resource.text.div.replace(new RegExp(escaped, 'g'), newValue);
    }
}

// --- Main processing ---

let hasErrors = false;

function processResource(res) {
    const narrativeReplacements = [];

    for (const fp of fhirPaths) {
        const resourceType = fp.split('.')[0];
        if (res.resourceType !== resourceType) continue;

        const values = fhirpath.evaluate(res, fp, null, fhirpath_stu3_model);
        if (values.length === 0) continue;

        if (!translations[fp]) translations[fp] = {};

        const valueMap = {};
        for (const value of values) {
            const strValue = String(value);
            if (translations[fp][strValue] === undefined) {
                translations[fp][strValue] = '*';
                console.error(`ERROR: No pseudonym for "${strValue}" at ${fp}`);
                hasErrors = true;
            }
            valueMap[strValue] = translations[fp][strValue];
            narrativeReplacements.push({
                oldValue: strValue,
                newValue: translations[fp][strValue]
            });
        }

        replaceAtPath(res, fp, valueMap);
    }

    replaceInNarrative(res, narrativeReplacements);
}

if (resource.resourceType === 'Bundle') {
    for (const entry of (resource.entry || [])) {
        if (entry.resource) processResource(entry.resource);
    }
} else {
    processResource(resource);
}

// --- Save results ---

fs.writeFileSync(translateFile, JSON.stringify(translations, null, 4), 'utf8');
fs.writeFileSync(filePath, JSON.stringify(resource, null, 4), 'utf8');

if (hasErrors) {
    console.error(`\nTranslate file updated: ${path.relative(process.cwd(), translateFile)}`);
    console.error('Fill in pseudonyms (replace * values) and re-run.');
    process.exit(1);
} else {
    console.log(`Pseudonymized: ${path.basename(filePath)}`);
}
