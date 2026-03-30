const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '../input/vocabulary');
const roleCodelistPath = path.join(vocabDir, 'ValueSet-RoleCodelist.json');
const roleCodeNLlistPath = path.join(vocabDir, 'ValueSet-RoleCodeNLlist.json');

const epicConceptMapPath = path.join(vocabDir, 'ConceptMap-epic-rolcode.json');
const nlConceptMapPath = path.join(vocabDir, 'ConceptMap-rolcodenl.json');

function loadJSON(filePath) {
    if (!fs.existsSync(filePath)) return null;
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.error(`Failed to load ${filePath}: ${e.message}`);
        return null;
    }
}

const roleVS = loadJSON(roleCodelistPath);
const roleNLVS = loadJSON(roleCodeNLlistPath);
const epicCM = loadJSON(epicConceptMapPath);
const nlCM = loadJSON(nlConceptMapPath);

if (!roleVS) {
    console.error("Master RoleCodelist not found!");
    process.exit(1);
}

const errors = [];
const warnings = [];

// 1. Index ValueSet concepts
function indexValueSet(vs) {
    const concepts = {};
    if (vs.compose && vs.compose.include) {
        vs.compose.include.forEach(inc => {
            if (inc.concept) {
                inc.concept.forEach(c => {
                    concepts[c.code] = {
                        code: c.code,
                        display: c.display,
                        designations: (c.designation || []).map(d => d.value)
                    };
                });
            }
        });
    }
    return concepts;
}

const roleConcepts = indexValueSet(roleVS);
const roleNLConcepts = roleNLVS ? indexValueSet(roleNLVS) : {};

function checkConceptMap(cm, sourceName, sourceConcepts, targetVS, targetConcepts) {
    if (!cm) return;
    console.log(`\nChecking ${path.basename(cm.id || 'ConceptMap')}...`);
    
    const mappedSourceCodes = new Set();
    const mappedTargetCodes = new Set();

    cm.group.forEach((group, gIdx) => {
        const groupName = group.sourceVersion || `Group ${gIdx}`;
        
        if (group.target !== targetVS.url) {
            errors.push(`[${groupName}] Target ValueSet URL mismatch: expected ${targetVS.url}, found ${group.target}`);
        }

        group.element.forEach((elem, eIdx) => {
            mappedSourceCodes.add(elem.code);
            
            if (sourceConcepts && Object.keys(sourceConcepts).length > 0) {
                // For NL ConceptMap, source is a ValueSet
                if (elem.code.includes('*')) {
                    // Wildcard handling (e.g. 01.*)
                    const prefix = elem.code.replace('*', '');
                    const matches = Object.keys(sourceConcepts).filter(c => c.startsWith(prefix));
                    if (matches.length === 0) {
                        warnings.push(`[${groupName}] Wildcard "${elem.code}" matches no codes in source ValueSet.`);
                    }
                } else if (!sourceConcepts[elem.code] && elem.code !== '00.000') { // 00.000 is special 'no role'
                    warnings.push(`[${groupName}] Source code "${elem.code}" not found in source ValueSet.`);
                }
            }

            if (!elem.target || elem.target.length === 0) {
                errors.push(`[${groupName}] Element "${elem.code}" has no target.`);
                return;
            }

            elem.target.forEach((t, tIdx) => {
                if (t.equivalence === 'unmatched') return;
                
                mappedTargetCodes.add(t.code);
                const vsConcept = targetConcepts[t.code];
                if (!vsConcept) {
                    errors.push(`[${groupName}] Target code "${t.code}" (from source "${elem.code}") not found in ${targetVS.id}`);
                } else {
                    // Check display (case-insensitive)
                    const possibleDisplays = [vsConcept.display, ...vsConcept.designations].map(d => d.toLowerCase());
                    if (!possibleDisplays.includes(t.display.toLowerCase())) {
                        warnings.push(`[${groupName}] Display mismatch for "${t.code}": ConceptMap says "${t.display}", ValueSet has "${vsConcept.display}" (synonyms: ${vsConcept.designations.join(', ')})`);
                    }
                }
            });
        });
    });

    if (sourceConcepts && Object.keys(sourceConcepts).length > 0) {
        const missingFromSource = Object.keys(sourceConcepts).filter(code => {
            // Check if code matches any mapped code (including wildcards)
            return ![...mappedSourceCodes].some(m => {
                if (m.includes('*')) {
                    return code.startsWith(m.replace('*', ''));
                }
                return m === code;
            });
        });
        if (missingFromSource.length > 0) {
            errors.push(`The following codes in source ValueSet are not mapped: ${missingFromSource.join(', ')}`);
        }
    }

    return mappedTargetCodes;
}

const epicMappedTargets = checkConceptMap(epicCM, "Epic", null, roleVS, roleConcepts);
const nlMappedTargets = checkConceptMap(nlCM, "RoleCodeNL", roleNLConcepts, roleVS, roleConcepts);

// Global completeness check for RoleCodelist
console.log(`\nChecking overall completeness for ${roleVS.id}...`);
const allMappedTargets = new Set([...(epicMappedTargets || []), ...(nlMappedTargets || [])]);
const missingInAll = Object.keys(roleConcepts).filter(code => !allMappedTargets.has(code));

if (missingInAll.length > 0) {
    errors.push(`The following codes in ${roleVS.id} are NOT mapped by ANY ConceptMap: ${missingInAll.join(', ')} (${missingInAll.map(c => roleConcepts[c].display).join(', ')})`);
}

// 5. Output results
if (errors.length === 0 && warnings.length === 0) {
    console.log("\n✅ Everything is consistent and complete!");
} else {
    if (errors.length > 0) {
        console.error("\n❌ Errors found:");
        errors.forEach(e => console.error(`  - ${e}`));
    }
    if (warnings.length > 0) {
        console.warn("\n⚠️ Warnings/Completeness notes:");
        warnings.forEach(w => console.warn(`  - ${w}`));
    }
}

if (errors.length > 0) {
    process.exit(1);
}
