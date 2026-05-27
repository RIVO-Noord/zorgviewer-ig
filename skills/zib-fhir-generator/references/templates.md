# ZIB to FHIR Artifact Templates

These templates should be used when generating artifacts for a ZIB FHIR profile.

## 1. StructureDefinition Template

Path: `input/profiles/StructureDefinition-<ZibName>.json`

```json
{
    "resourceType": "StructureDefinition",
    "url": "http://fhir.hl7.nl/zorgviewer/StructureDefinition/<ZibName>",
    "name": "<ZibName>",
    "title": "<ZibName>",
    "status": "active",
    "description": "<ZibName> (<ResourceName>)",
    "kind": "resource",
    "abstract": false,
    "type": "<ResourceName>",
    "baseDefinition" : "http://nictiz.nl/fhir/StructureDefinition/zib-<ZibName>",
    "derivation": "constraint",
    "differential": {
        "element": [
            {
                "id": "<ResourceName>.<elementPath>",
                "path": "<ResourceName>.<elementPath>",
                "mustSupport": true
            }
        ]
    }
}
```

## 2. ViewDefinition Template

Path: `input/images/ViewDefinition-<ZibName>.json`

```json
{
  "resourceType": "http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition",
  "resource": "Bundle",
  "id": "ViewDefinition-<ZibName>",
  "title": "<ZibDisplayTitle>",
  "profile": "http://nictiz.nl/fhir/StructureDefinition/zib-<ZibName>",
  "select": [
    {
      "column": [
        {
          "path": "meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri",
          "name": "Bron",
          "description": "Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code>",
          "type": "string",
          "tag": [ { "name": "Zib element", "value": "nvt" } ]
        },
        {
          "path": "<fhirPath>",
          "name": "<ColumnName>",
          "type": "<DataType>",
          "tag": [ { "name": "Zib element", "value": "<ZibElement>" } ]
        }
      ],
      "forEach": "entry.resource.where(resourceType='<ResourceName>')"
    }
  ]
}
```

## 3. Intro Markdown Template

Path: `input/intro-notes/StructureDefinition-<ZibName>-intro.md`

```markdown
{% include profile-note.md %}
<div class="dragon" markdown="1">
**De specificatie op deze pagina is gegenereerd en work-in-progress.**
</div>

### Zorginformatiebouwsteen

[ZIB <ZibName>](https://zibs.nl/wiki/<ZibName>-v3.2(2017NL))

### View Definition

[ViewDefinition voor <ZibDisplayTitlePlural>](ViewDefinition-<ZibName>.json)

{% include ViewDefinition-<ZibName>-ui.md %}

{% include ViewDefinition-<ZibName>.md %}

### Request

1. Opvragen (search) <resourceNameLowerPlural>

    `GET <ontsluiten-bronsysteem-base>/<ResourceName>?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}
```
