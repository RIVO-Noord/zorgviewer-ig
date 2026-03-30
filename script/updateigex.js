const fs = require('fs');
const path = require('path');

const igPath = '../input/zorgviewer-ig.json';
const examplesDir = '../input/examples';
const profilesDir = '../input/profiles';

// Load IG
const ig = JSON.parse(fs.readFileSync(igPath, 'utf8'));
const existingRefs = new Set(ig.definition.resource.map(r => r.reference.reference));

// Load available profiles to match canonicals correctly
const profiles = fs.readdirSync(profilesDir)
    .filter(f => f.startsWith('StructureDefinition-') && f.endsWith('.json'))
    .map(f => f.replace('StructureDefinition-', '').replace('.json', ''));

const files = fs.readdirSync(examplesDir);

files.forEach(file => {
    if (!file.endsWith('.json')) return;
    if (file.toLowerCase().includes('bundle')) return;

    const filePath = path.join(examplesDir, file);
    let content;
    try {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.error(`Error parsing ${file}: ${e.message}`);
        return;
    }

    if (content.resourceType === 'Bundle') return;

    const resourceType = content.resourceType;
    const id = content.id;
    if (!resourceType || !id) return;

    const refStr = `${resourceType}/${id}`;
    if (existingRefs.has(refStr)) {
        // console.log(`Skipping existing reference: ${refStr}`);
        return;
    }

    // Determine Profile/Canonical
    // Pattern: ProfileName-Vendor-Something.json
    const nameParts = file.replace('.json', '').split('-');
    let profileName = nameParts[0];
    let vendor = nameParts[1] || 'Unknown';

    // Special mappings for filenames
    if (profileName === 'LaboratoryTestResult2') profileName = 'LaboratoryTestResult';
    if (profileName === 'AdvanceDirective2') profileName = 'AdvanceDirective';
    if (profileName === 'Specimen2') profileName = 'Specimen';
    if (profileName === 'Immunization2' || profileName === 'Immunization3') profileName = 'Immunization';

    // Check if profile exists in profiles dir
    let canonical = null;
    if (profiles.includes(profileName)) {
        canonical = `http://fhir.hl7.nl/zorgviewer/StructureDefinition/${profileName}`;
    } else {
        // Fallback for known resource types if profile name doesn't match directly
        if (profiles.includes(resourceType)) {
            canonical = `http://fhir.hl7.nl/zorgviewer/StructureDefinition/${resourceType}`;
        }
    }

    const newResource = {
        reference: {
            reference: refStr
        },
        name: `${vendor} ${profileName} Example`,
        description: `Dit is een ${profileName} voorbeeld van ${vendor}.`
    };

    if (canonical) {
        newResource.exampleCanonical = canonical;
    }

    ig.definition.resource.push(newResource);
    existingRefs.add(refStr);
    console.log(`Added: ${refStr} (${file})`);
});

// Sort resources for cleaner IG (optional, but good practice)
// We keep the first few (Parameters, Organizations, Endpoints) at top if they don't have exampleCanonical
// or just append at the end as we did.

fs.writeFileSync(igPath, JSON.stringify(ig, null, 2));
console.log('IG updated successfully.');
