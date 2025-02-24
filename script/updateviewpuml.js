const fs = require('fs');
const path = require('path');

const viewDefPath = "../input/images/";
const pumlPath = "../input/images-source/";

fs.readdirSync(viewDefPath).forEach(file => {
    const match = file.match("ViewDefinition-(.+)\.json");
    if (match) {
        console.log(file);

        const title = match[1];
        const puml = [
            `@startuml ViewDefinition-${title}`,
            ":",
            `== ${title}`,
        ];

        const viewDef_filePath = path.join(viewDefPath, file);
        const viewDef = JSON.parse(fs.readFileSync(viewDef_filePath, 'utf8'));

        // add column names for select
        if (viewDef.select[0].column) {
            doColumns(viewDef.select[0].column, puml);
        }
        if (viewDef.select[0].unionAll) {
            // assume first columns is the final list of columns
            doColumns(viewDef.select[0].unionAll[0].column, puml);
        }

        puml.push(";",
            "@enduml");

        const puml_filePath = path.join(pumlPath, `ViewDefinition-${title}.plantuml`);
        fs.writeFileSync(puml_filePath, puml.join('\n'));
    }
});

function doColumns(columns, puml) {
    const columnNames = columns.map(column => ` ${column.name} `);
    puml.push(`|=${columnNames.join('|=')}|`);
    // TODO: add column examples based on examples
    // TODO: figure out why full path breaks PlantUML
    const columnPaths = columns.map(column => ` ${column.path.split('.')[0] || ""}...`);
    puml.push(`|${columnPaths.join('|')}|`);
    const columnTypes = columns.map(column => ` ${column.type || ""} `);
    puml.push(`|${columnTypes.join('|')}|`);
    const columnZib = columns.map(column => column.tag ? ` ${column.tag[0].value.split('/').join('\\n /')} ` : "");
    puml.push(`|${columnZib.join('|')}|`);
}

/*
@startsalt medicatie
skinparam Backgroundcolor white
{+
    {}
    == <&eyedropper> Medicatie gebruik
    {}
    {T#
    **Bron** | **Datum** | **Medicatie** | **Toedieningsweg** | **Instructies** | **Categorie**
    <&medical-cross> UMCG | 15-feb-2022 | nitroprusside 1mg/ml spuit voor pomp | Intraveneus | continu 1 microg/min intraveneus toedienen | Community 
    . | . | generate rows from examples
    }
    {}
}
@endsalt
*/
