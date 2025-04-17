const fs = require('fs');
const path = require('path');
const fhirpath = require('fhirpath');
const fhirpath_stu3_model = require('fhirpath/fhir-context/stu3');
const { dosageToNLString } = require('./dosage');
const dosageToString = require('./dosage').dosageToString;
const dosageToStringGemini = require('./dosage').dosageToStringGemini;

const viewDefPath = "../input/images/";
const mdPath = "../input/includes/";

fs.readdirSync(viewDefPath).forEach(file => {
    const match = file.match("ViewDefinition-.+\.json");
    if (match) {
        const viewDef_filePath = path.join(viewDefPath, file);
        const viewDef = JSON.parse(fs.readFileSync(viewDef_filePath, 'utf8'));

        const md_def = [
            "### Kolom Definities",
            "<table class=\"grid\">",
            "<thead>",
            "<th>Kolom label</th>",
            "<th width=\"25%\">FHIR Path</th>",
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
        const columnPaths = [];
        if (viewDef.select[0].column) {
            doColumns(viewDef.select[0].column, md_ui, md_def);
            viewDef.select[0].column.forEach(column => columnPaths.push(column.path));

            // Add column examples based on examples
            const match2 = viewDef.select[0].forEach.match("resourceType='(.+)'");
            if (match2) {
                const resourceType = match2[1];
                const examplesPath = "../input/examples";
                fs.readdirSync(examplesPath).forEach(file => {
                    if (!file.endsWith(".json")) return;
                    const example_filePath = path.join(examplesPath, file);
                    const example = JSON.parse(fs.readFileSync(example_filePath, 'utf8'));

                    // generate if no text
                    if (example.dosageInstruction) {
                        // var text = dosageToString(example.dosageInstruction[0]);
                        var text = dosageToStringGemini(example.dosageInstruction[0]);
                        if (text.includes("undefined")) {
                            console.error("Some expected dosage parts undefined?", JSON.stringify(example.dosageInstruction));
                        }
                        example.dosageInstruction[0].text = text;
                    }

                    // only include in table when where clause applies
                    const match3 = viewDef.select[0].forEach.match(".where\((.+)\)");
                    if (match3) {
                        var result;
                        try { result = fhirpath.evaluate(example, match3[1]); }
                        catch { }
                        if (result[0]) {
                            const values = viewDef.select[0].column.map(column => {
                                var result;
                                try { result = fhirpath.evaluate(example, `${column.path}`); }
                                catch { }
                                var value = "";
                                if (result && result.length > 0) {
                                    if (column.type == "dateTime") {
                                        const date = new Date(result[0]);
                                        value = date.toLocaleDateString('nl-NL'); // + ' ' + date.toLocaleTimeString('nl-NL';
                                    }
                                    else {
                                        if (value.length > 80) value = `${value.substring(0,80)}...`;    
                                        value = result[0].replace(/\r?\n/g, "<br/>");
                                    }
                                }
                                return value;
                            });
                            // haal bron uit filename
                            values[0] = file.substring(file.indexOf('-')+1, file.length-5);
                            md_ui.push("<tr><td>+</td>");
                            viewDef.select[0].column.forEach((column,idx) => {
                                if (column.name.charAt(0) != '+') {
                                    md_ui.push(`<td>${values[idx]}</td>`);
                                }
                            });
                            const colcount = viewDef.select[0].column.filter(column => column.name.charAt(0) != '+').length;
                            md_ui.push(`</tr><tr><td></td><td colspan=${colcount}>`);
                            viewDef.select[0].column.forEach((column,idx) => {
                                if (column.name.charAt(0) == '+' && values[idx] != "") {
                                    md_ui.push(`<b>${column.name.slice(1)}</b><br/>${values[idx]}<br/>`);
                                }
                            });
                            md_ui.push("</td></tr>");
                        }
                    }
                });
            }
        }
        if (viewDef.select[0].unionAll) {
            // assume first columns is the final list of columns
            viewDef.select[0].unionAll.forEach(union => {
                const match = union.forEach.match("resourceType='(.+)'");
                if (match) {
                    const resourceType = match[1];
                    md_def.push(`<tr><td colspan=5><i>${resourceType}</i></td></tr>`);
                }
                doColumns(union.column, md_ui, md_def);
                union.column.forEach(column => columnPaths.push(column.path));
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
    md_ui.push("<tr><th>&gt;&lt;</th>");
    columns.forEach(column => { 
        if (column.name.charAt(0) != '+') {
            md_ui.push(`<th>${column.name}</th>`);
        }
    });
    md_ui.push("</tr>");

    columns.forEach(column => { 
        if (column.name.charAt(0) != '+' && column.name.charAt(0) != '(') {
            md_def.push("<tr>");
            doColumn(column, md_def);
            md_def.push("</tr>");
        }
    });
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
