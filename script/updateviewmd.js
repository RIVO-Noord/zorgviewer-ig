const fs = require('fs');
const path = require('path');
const fhirpath = require('fhirpath');
const fhirpath_stu3_model = require('fhirpath/fhir-context/stu3');
const { dosageToNLString } = require('./dosage');
const dosageToString = require('./dosage').dosageToString;
const dosageToStringGemini = require('./dosage').dosageToStringGemini;

const viewDefPath = "../input/images/";
const mdPath = "../input/includes/";

// Need stu3_model as param to work
// eg fhirpath.evaluate(example, `${column.path}`, null, fhirpath_stu3_model, { userInvocationTable }); }
const examplesCache = {};
function resolveFn(inputs) {
    if (!inputs || inputs.length === 0) {
        // console.error("resolve() called on undefined path");
        return null;
    }
    const reference = inputs[0].reference;
    const id = reference.split('/').pop();
    var resolved = examplesCache[id];
    if (!resolved) {
        console.log(`Resolving reference ${reference}`);
        // try to find an example with a matching id 
        const examplesPath = "../input/examples";
        var resolved;
        fs.readdirSync(examplesPath).forEach(file => {
            if (!file.endsWith(".json")) return;
            const example_filePath = path.join(examplesPath, file);
            const raw_example = JSON.parse(fs.readFileSync(example_filePath, 'utf8'));

            const examples = [];
            // If this is a Bundle split into individual resources
            if (raw_example.resourceType == "Bundle") {
                raw_example.entry.forEach(entry => examples.push(entry.resource));
            }
            else {
                examples.push(raw_example);
            }
            var match = examples.find(example => example.id === id);
            if (match) {
                resolved = match;
            }
        });
        if (resolved) {
            examplesCache[id] = resolved;
        }
    }
    if (!resolved) {
        console.log(`No example found for reference: ${reference}`);
    }
    return resolved;
}
// translate a Coding using a ConceptMap; results in an array of ConceptMap.group.element
const conceptMapCache = {};
function translateFn(inputs, conceptMapId) {
    if (!inputs || inputs.length === 0) {
        // console.error("translate() called on undefined path");
        return null;
    }
    const code = inputs[0].code; // expect Coding as first input

    var conceptMap = conceptMapCache[conceptMapId];
    if (!conceptMap) {
        console.log(`Loading ConceptMap ${conceptMapId} from file`);
        const vocabularyPath = "../input/vocabulary";
        const vocabulary_filePath = path.join(vocabularyPath, `ConceptMap-${conceptMapId}.json`);
        conceptMap = JSON.parse(fs.readFileSync(vocabulary_filePath, 'utf8'));
        conceptMapCache[conceptMapId] = conceptMap;
    }

    try { result = fhirpath.evaluate(conceptMap, `group.element.where(code='${code}')`); }
    catch { }
    console.log(`Translated code ${code} using ConceptMap ${conceptMapId} to ${result.length} target codes`);
    return result; // array of ConceptMap.group.element
}
// lookup a code in a ValueSet; results in an array of ValueSet.compose.include.concept
const valueSetCache = {};
function lookupFn(inputs, valueSetId) {
    if (!inputs || inputs.length === 0) {
        // console.error("translate() called on undefined path");
        return null;
    }
    const code = inputs[0]; // expect system as first input

    var valueSet = valueSetCache[valueSetId];
    if (!valueSet) {
        console.log(`Loading ValueSet ${valueSetId} from file`);
        const vocabularyPath = "../input/vocabulary";
        const vocabulary_filePath = path.join(vocabularyPath, `ValueSet-${valueSetId}.json`);
        valueSet = JSON.parse(fs.readFileSync(vocabulary_filePath, 'utf8'));
        valueSetCache[valueSetId] = valueSet;
    }

    try { result = fhirpath.evaluate(valueSet, `compose.include.concept.where(code='${code}')`); }
    catch { }
    console.log(`Lookup concept ${code} using ValueSet ${valueSetId} to ${result.length} concepts`);
    return result; // array of ConceptMap.group.element
}
const userInvocationTable = {
    resolve: { fn: resolveFn },
    translate: { fn: translateFn, arity: { 1: ['String']}},
    lookup: { fn: lookupFn, arity: { 1: ['String']}}
};

fs.readdirSync(viewDefPath).forEach(file => {
    const match = file.match(/^ViewDefinition-.+\.json$/);
    if (match) {
        const viewDef_filePath = path.join(viewDefPath, file);
        const viewDef = JSON.parse(fs.readFileSync(viewDef_filePath, 'utf8'));

        const md_def = [
            "### Kolom Definities",
            "<table class=\"grid\">",
            "<thead>",
            "<th>Kolom label</th>",
            "<th>FHIR Path Expression</th>",
            "<th>FHIR Type</th>",
            "<th>Zib element</th>",
            "<th>Toelichting of regels</th>",
            "</thead>",
            "<tbody>"
        ];
        const md_ui = [
            "### UI Wireframe",
            `<b>${viewDef.title}</b>`,
            "<table class=\"grid\">",
            "<tbody>"
         ];

        // add column names for select
        if (viewDef.select[0].column) {
            doColumns(viewDef.select[0].column, md_ui, md_def);
            doExampleRows(viewDef.select[0], md_ui);
        }
        if (viewDef.select[0].unionAll) {
            // assume first unions columns is the final list of columns
            viewDef.select[0].unionAll.forEach(union => {
                const match = union.forEach.match("resourceType='(.+)'");
                if (match) {
                    const resourceType = match[1];
                    md_def.push(`<tr><td colspan=5><i>${resourceType}</i></td></tr>`);
                }
                doColumns(union.column, md_ui, md_def);
                doExampleRows(union, md_ui);
            });
        }
        md_def.push("</tbody>",
            "</table>");

        md_ui.push("</tbody>",
            "</table>");
    
        const md_def_filePath = path.join(mdPath, `${viewDef.id}.md`);
        fs.writeFileSync(md_def_filePath, md_def.join('\n'));

        const md_ui_filePath = path.join(mdPath, `${viewDef.id}-ui.md`);
        fs.writeFileSync(md_ui_filePath, md_ui.join('\n'));
    }
});

function doColumns(columns, md_ui, md_def) {
    // Add column names for UI wireframe
    md_ui.push("<tr><th>&gt;&lt;</th>");
    columns.forEach(column => { 
        if (column.name.charAt(0) != '+') {
            md_ui.push(`<th>${column.name}</th>`);
        }
    });
    md_ui.push("</tr>");

    // Add column definitions
    columns.forEach(column => { 
        if (column.name.charAt(0) != '+' && column.name.charAt(0) != '(') {
            md_def.push("<tr>");
            doColumn(column, md_def);
            md_def.push("</tr>");
        }
    });
    // Add uitklap columns
    if (columns.find(column => column.name.charAt(0) == '+')) {
        md_def.push('<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>');
        columns.forEach(column => { 
            if (column.name.charAt(0) == '+') {
                md_def.push("<tr style=\"background-color:#b4c7e7\">");
                doColumn(column, md_def);
                md_def.push("</tr>");
            }
        });
    }
    // Add markering columns
    if (columns.find(column => column.name.charAt(0) == '(')) {
        md_def.push('<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>');
        columns.forEach(column => { 
            if (column.name.charAt(0) == '(') {
                md_def.push("<tr style=\"background-color:#d6dce5\">");
                doColumn(column, md_def);
                md_def.push("</tr>");
            }
        });    
    }
}

function doColumn(column, md) {
    md.push(`<td>${column.name}</td>`)
    md.push(`<td><samp>${column.path}</samp></td>`)            
    md.push(`<td><code>${column.type && column.type.split('/').join("</code> of <code>")}</code></td>`)
    md.push(`<td>${column.tag?column.tag[0].value:"<i>nvt</i>"}</td>`)
    md.push(`<td>${column.description||""}</td>`);
}

function doExampleRows(select, md_ui) {
    // Add column examples based on examples
    const match2 = select.forEach.match("resourceType='(.+)'");
    if (match2) {
        const resourceType = match2[1];
        const examplesPath = "../input/examples";
        fs.readdirSync(examplesPath).forEach(file => {
            if (!file.endsWith(".json")) return;
            const example_filePath = path.join(examplesPath, file);
            const raw_example = JSON.parse(fs.readFileSync(example_filePath, 'utf8'));

            const examples = [];
            // If this is a Bundle split into individual resources
            if (raw_example.resourceType == "Bundle") {
                // only keep if resourceType is queried resourceType
                // this prevents including resources referenced inside a Bundle as a separate example
                // e.g. _included EpisodeOfCare.diagnosis.condition or Flag.condition
                // also make sure to ignore the operation part, like Observation/$lastn
                if (raw_example.link) {
                    var q = raw_example.link[0].url.indexOf('?');
                    if (q == -1) q = raw_example.link[0].url.length;
                    var urlNoQ = raw_example.link[0].url.substring(0, q);
                    var o = urlNoQ.indexOf('$');
                    if (o != -1) urlNoQ = urlNoQ.substring(0, o-1); // remove $ operation and last '/'
                    const queriedType = urlNoQ.substring(urlNoQ.lastIndexOf('/') + 1);
                    raw_example.entry.filter(entry => entry.resource.resourceType == queriedType).forEach(entry => examples.push(entry.resource));
                }
                else {
                    // cannot determine queriedType, so keep all
                    raw_example.entry.forEach(entry => examples.push(entry.resource));
                }
            }
            else {
                examples.push(raw_example);
            }

            examples.forEach(example => {
                // generate if dosageInstruction but no text; only for MedicationRequest/Statements
                if (example.dosageInstruction && !example.dosageInstruction[0].text) {
                    // var text = dosageToString(example.dosageInstruction[0]);
                    var text = dosageToStringGemini(example.dosageInstruction[0]);
                    if (text.includes("undefined")) {
                        console.error("ERROR: Some expected dosage parts undefined?", JSON.stringify(example.dosageInstruction));
                    }
                    example.dosageInstruction[0].text = text + ' &#9432;';
                }

                // only include in table when where clause applies
                const match3 = select.forEach.match(".where\((.+)\)");
                if (match3) {
                    var result;
                    try { result = fhirpath.evaluate(example, match3[1]); }
                    catch (err) { console.error ("ERROR: Error evaluating where clause", match3[1], err.message); }
                    if (result[0]) {
                        const values = select.column.map(column => {
                            var result;
                            try { result = fhirpath.evaluate(example, `${column.path}`, null, fhirpath_stu3_model, { userInvocationTable }); }
                            catch (err) { console.error("ERROR:", column.name, err.message, column.path); }
                            var value = "";
                            if (result && result.length > 0) {
                                if (column.type == "date" || column.type == "dateTime") {
                                    const date = new Date(result[0]);
                                    value = date.toLocaleDateString('nl-NL'); // + ' ' + date.toLocaleTimeString('nl-NL';
                                }
                                else if (column.type == "code") {
                                    value = result[0];
                                    // check if this is a CodeableConcept; sometimes w/ STU3 vs R4
                                    if (typeof(result[0]) == "object") {
                                        value = result[0].coding[0].display;
                                    }
                                }
                                else {
                                    value = result[0];
                                    if (value.length > 80) value = `${value.substring(0,80)}...`;
                                    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                                    value = value.replace(/\r?\n/g, "<br/>");
                                }
                            }
                            return value;
                        });
                        // column 0 is altijd bron en set bron obv filename
                        values[0] = file.substring(file.indexOf('-')+1, file.length-5);
                        md_ui.push("<tr><td>+</td>");
                        // add column values
                        select.column.forEach((column,idx) => {
                            if (column.name.charAt(0) != '+') {
                                md_ui.push(`<td>${values[idx]}</td>`);
                            }
                        });
                        // add uitklap values; only show if there is a value
                        const colcount = select.column.filter(column => column.name.charAt(0) != '+').length;
                        md_ui.push(`</tr><tr><td></td><td colspan=${colcount}>`);
                        select.column.forEach((column,idx) => {
                            if (column.name.charAt(0) == '+' && values[idx] != "") {
                                md_ui.push(`<b>${column.name.slice(1)}</b><br/>${values[idx]}<br/>`);
                            }
                        });
                        md_ui.push("</td></tr>");
                    }
                }
            });
        });
    }
}