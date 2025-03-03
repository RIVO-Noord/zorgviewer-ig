const fs = require('fs');
const path = require('path');
const fhirpath = require('fhirpath');
const fhirpath_stu3_model = require('fhirpath/fhir-context/stu3');

const viewDefPath = "../input/images/";
const pumlPath = "../input/images-source/";
const mdPath = "../input/includes/";

fs.readdirSync(viewDefPath).forEach(file => {
    const match = file.match("ViewDefinition-.+\.json");
    if (match) {
        const viewDef_filePath = path.join(viewDefPath, file);
        const viewDef = JSON.parse(fs.readFileSync(viewDef_filePath, 'utf8'));

        const md = [
            "Kolom definities:",
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
        const puml = [
            `@startuml ${viewDef.id}`,
            ":",
            `== ${viewDef.title}`,
        ];

        // add column names for select
        const columnPaths = [];
        if (viewDef.select[0].column) {
            doColumns(viewDef.select[0].column, puml, md);
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
                                    value = result[0].replace(/\r?\n/g, "\\n ");
                                    if (value.length > 80) value = `${value.substring(0,80)}...`;
                                }
                                return value;
                            });
                            // overwrite bron 1ste kolom met filename
                            values[0] = file.substring(file.indexOf('-')+1, file.length-5);
                            puml.push(`| ${values.join(' | ')} |`);
                        }
                    }
                });
            }
            puml.push("| |");
        }
        if (viewDef.select[0].unionAll) {
            // assume first columns is the final list of columns
            viewDef.select[0].unionAll.forEach(union => {
                const match = union.forEach.match("resourceType='(.+)'");
                if (match) {
                    const resourceType = match[1];
                    md.push(`<tr><td colspan=5><i>${resourceType}</i></td></tr>`);
                }
                doColumns(union.column, puml, md);
                union.column.forEach(column => columnPaths.push(column.path));
                puml.push("| |");
            });
        }
        puml.push("",
            "//Legenda//",
            "//+Kolom - in de uitklap//",
            "//(Kolom) - gebruikt voor formatting of verbergen//",
            ";",
            "@enduml");

        md.push("</tbody>",
            "</table>");

        const puml_filePath = path.join(pumlPath, `${viewDef.id}.plantuml`);
        fs.writeFileSync(puml_filePath, puml.join('\n'));

        const md_filePath = path.join(mdPath, `${viewDef.id}.md`);
        fs.writeFileSync(md_filePath, md.join('\n'));
    }
});

function doColumns(columns, puml, md) {
    const columnNames = columns.map(column => ` ${column.name} `);
    puml.push(`|=${columnNames.join('|=')}|`);

    columns.forEach(column => { 
        if (column.name.charAt(0) != '+' && column.name.charAt(0) != '(') {
            md.push("<tr>");
            doColumn(column, md);
            md.push("</tr>");
        }
    });
    if (columns.find(column => column.name.charAt(0) == '+')) {
        md.push('<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>');
        columns.forEach(column => { 
            if (column.name.charAt(0) == '+') {
                md.push("<tr style=\"background-color:#b4c7e7\">");
                doColumn(column, md);
                md.push("</tr>");
            }
        });
    }
    if (columns.find(column => column.name.charAt(0) == '(')) {
        md.push('<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>');
        columns.forEach(column => { 
            if (column.name.charAt(0) == '(') {
                md.push("<tr style=\"background-color:#b4c7e7\">");
                doColumn(column, md);
                md.push("</tr>");
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
