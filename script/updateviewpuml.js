const fs = require('fs');
const path = require('path');
const fhirpath = require('fhirpath');
const fhirpath_stu3_model = require('fhirpath/fhir-context/stu3');

const viewDefPath = "../input/images/";
const pumlPath = "../input/images-source/";

fs.readdirSync(viewDefPath).forEach(file => {
    const match = file.match("ViewDefinition-.+\.json");
    if (match) {
        const viewDef_filePath = path.join(viewDefPath, file);
        const viewDef = JSON.parse(fs.readFileSync(viewDef_filePath, 'utf8'));

        const puml = [
            `@startuml ${viewDef.id}`,
            ":",
            `== ${viewDef.title}`,
        ];

        // add column names for select
        if (viewDef.select[0].column) {
            doColumns(viewDef.select[0].column, puml);

            // Add column examples based on examples
            const match2 = viewDef.select[0].forEach.match("resourceType='(.+)'");
            if (match2) {
                puml.push("| |");
                const resourceType = match2[1];
                const examplesPath = "../input/examples";
                fs.readdirSync(examplesPath).forEach(file => {
                    if (!file.endsWith(".json")) return;
                    const example_filePath = path.join(examplesPath, file);
                    const example = JSON.parse(fs.readFileSync(example_filePath, 'utf8'));
                    if (example.resourceType == resourceType) {
                        const values = viewDef.select[0].column.map(column => {
                            var result;
                            try { result = fhirpath.evaluate(example, `${resourceType}.${column.path}`); }
                            catch { }
                            var value = "";
                            if (result && result.length > 0) {
                                value = result[0].replace(/\r?\n/g, "\\n ");
                                if (value.length > 80) value = `${value.substring(0,80)}...`;
                            }
                            return value;
                        });
                        // overwrite bron 1ste kolom met filename
                        values[0] = file.substring(resourceType.length+1, file.length-5);
                        puml.push(`| ${values.join(' | ')} |`);
                    }
                });
            }
        }
        if (viewDef.select[0].unionAll) {
            // assume first columns is the final list of columns
            viewDef.select[0].unionAll.forEach(union => {
                doColumns(union.column, puml);
            });
        }

        puml.push(";",
            "@enduml");

        const puml_filePath = path.join(pumlPath, `${viewDef.id}.plantuml`);
        fs.writeFileSync(puml_filePath, puml.join('\n'));
    }
});

function doColumns(columns, puml) {
    const columnNames = columns.map(column => ` ${column.name} `);
    puml.push(`|=${columnNames.join('|=')}|`);
    // TODO: figure out why full path breaks PlantUML; for now split
    const columnPaths = columns.map(column => column.path.split('.')[0] || "");
    puml.push(`| ${columnPaths.join('... | ')} |`);
    const columnTypes = columns.map(column => column.type || "");
    puml.push(`| ${columnTypes.join(' | ')} |`);
    const columnZib = columns.map(column => column.tag ? column.tag[0].value.split('/').join('\\n /') : "");
    puml.push(`| ${columnZib.join(' | ')} |`);
}
