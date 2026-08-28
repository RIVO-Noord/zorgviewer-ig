# Zorgpad resource templates

All templates are **FHIR STU3**. Replace `<Zorgpad>` with the PascalCase zorgpad name,
`<zorgpad>` with its lowercase file-name variant, `<Concept>` with the PascalCase name of the
concept a waardelijst or filter applies to, and remove any placeholder that does not apply.

## Library - `input/resources/Library-<Zorgpad>.json`

```json
{
    "resourceType": "Library",
    "id": "<Zorgpad>",
    "url": "http://fhir.hl7.nl/zorgviewer/Library/<Zorgpad>",
    "version": "1.0.0",
    "name": "<Zorgpad>",
    "title": "<Nederlandse titel van het zorgpad>",
    "status": "draft",
    "experimental": true,
    "type": {
        "coding": [
            {
                "system": "http://hl7.org/fhir/library-type",
                "code": "logic-library"
            }
        ]
    },
    "publisher": "RIVO-Noord",
    "description": "De data requirements en logica voor het <Zorgpad> zorgpad.",
    "jurisdiction": [
        {
            "coding": [
                {
                    "system": "urn:iso:std:iso:3166",
                    "code": "NL"
                }
            ]
        }
    ],
    "relatedArtifact": [
        {
            "type": "documentation",
            "display": "<Naam van het bron zorgpad document / richtlijn>",
            "url": "<url naar het bron document>"
        }
    ],
    "parameter": [
        {
            "name": "Patient",
            "use": "in",
            "min": 1,
            "max": "1",
            "type": "Patient"
        }
    ],
    "dataRequirement": [
        {
            "type": "Condition",
            "profile": [
                "http://fhir.hl7.nl/zorgviewer/StructureDefinition/Condition",
                "http://nictiz.nl/fhir/StructureDefinition/zib-Problem"
            ],
            "codeFilter": [
                {
                    "path": "code",
                    "valueSetReference": {
                        "reference": "http://fhir.hl7.nl/zorgviewer/ValueSet/<Zorgpad><Concept>Codelist"
                    }
                },
                {
                    "path": "clinicalStatus",
                    "valueCode": [ "active" ]
                }
            ]
        }
    ],
    "content": [
        {
            "contentType": "text/cql",
            "url": "https://github.com/RIVO-Noord/zorgviewer-ig/blob/master/input/cql/<Zorgpad>.cql",
            "title": "<Zorgpad> selectiecriteria in CQL"
        }
    ]
}
```

Notes:
- `type` is required in STU3 and bound to `library-type`; use `logic-library`.
- Omit `content` when the zorgpad only defines a data scope and no logic. The IG publisher does not
  render `.cql` for a STU3 IG, so `content.url` points at the file in the source repository; use
  base64 `content.data` instead when the Library must be self-contained.
- Keep every `dataRequirement` in sync with the retrieves in the CQL and with `PlanDefinition.action.output`.

## CQL - `input/cql/<Zorgpad>.cql`

```cql
library <Zorgpad> version '1.0.0'

using FHIR version '3.0.2'

include FHIRHelpers version '3.0.2' called FHIRHelpers

codesystem "SNOMED CT": 'http://snomed.info/sct'

valueset "<Concept>": 'http://fhir.hl7.nl/zorgviewer/ValueSet/<Zorgpad><Concept>Codelist'

parameter Patient Patient

context Patient

/* Selectiecriterium: <criterium uit het brondocument> */
define "In<Zorgpad>Populatie":
  exists (
    [Condition: "<Concept>"] C
      where C.clinicalStatus.value = 'active'
  )

/* Beslisondersteuning: <vraag uit het brondocument> */
define "<StapNaam>Nodig":
  "In<Zorgpad>Populatie"
    and not exists ( [Immunization] I where I.notGiven.value is not true )
```

## PlanDefinition - `input/resources/PlanDefinition-<Zorgpad>.json`

```json
{
    "resourceType": "PlanDefinition",
    "id": "<Zorgpad>",
    "url": "http://fhir.hl7.nl/zorgviewer/PlanDefinition/<Zorgpad>",
    "version": "1.0.0",
    "name": "<Zorgpad>",
    "title": "<Nederlandse titel van het zorgpad>",
    "status": "draft",
    "publisher": "RIVO-Noord",
    "usage": "Deze PlanDefinition bevat de (data) definitie van het <Zorgpad> zorgpad.",
    "jurisdiction": [
        {
            "coding": [
                {
                    "system": "urn:iso:std:iso:3166",
                    "code": "NL"
                }
            ]
        }
    ],
    "relatedArtifact": [
        {
            "type": "documentation",
            "display": "<Naam van het bron zorgpad document / richtlijn>",
            "url": "<url naar het bron document>"
        }
    ],
    "library": [
        {
            "reference": "Library/<Zorgpad>"
        }
    ],
    "action": [
        {
            "label": "Selectie <Zorgpad>",
            "description": "De gegevens die nodig zijn om te bepalen of een patient binnen het zorgpad valt.",
            "triggerDefinition": [
                {
                    "type": "named-event",
                    "eventName": "Raadplegen <Zorgpad> selectiecriteria"
                }
            ],
            "condition": [
                {
                    "kind": "applicability",
                    "description": "<criterium uit het brondocument>",
                    "language": "text/cql",
                    "expression": "In<Zorgpad>Populatie"
                }
            ],
            "output": [
                {
                    "type": "Patient",
                    "profile": [
                        "http://fhir.hl7.nl/zorgviewer/StructureDefinition/Patient",
                        "http://fhir.nl/fhir/StructureDefinition/nl-core-patient"
                    ]
                },
                {
                    "type": "Condition",
                    "profile": [
                        "http://fhir.hl7.nl/zorgviewer/StructureDefinition/Condition",
                        "http://nictiz.nl/fhir/StructureDefinition/zib-Problem"
                    ],
                    "codeFilter": [
                        {
                            "path": "code",
                            "valueSetReference": {
                                "reference": "http://fhir.hl7.nl/zorgviewer/ValueSet/<Zorgpad><Concept>Codelist"
                            }
                        },
                        {
                            "path": "clinicalStatus",
                            "valueCode": [ "active" ]
                        }
                    ]
                }
            ]
        },
        {
            "label": "<Stap uit het zorgpad>",
            "description": "<beschrijving van de stap uit het brondocument>",
            "triggerDefinition": [
                {
                    "type": "named-event",
                    "eventName": "Raadplegen <Zorgpad> <Stap>"
                }
            ],
            "condition": [
                {
                    "kind": "applicability",
                    "description": "<voorwaarde voor deze stap>",
                    "language": "text/cql",
                    "expression": "<StapNaam>Nodig"
                }
            ],
            "output": [
                {
                    "type": "Immunization",
                    "profile": [
                        "http://fhir.hl7.nl/zorgviewer/StructureDefinition/Immunization",
                        "http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination"
                    ]
                }
            ]
        }
    ]
}
```

Notes:
- STU3 uses `action.label` (not `action.prefix`) and `DataRequirement.codeFilter.valueSetReference` / `valueSetString`.
- `codeFilter.path` is mandatory; the value is one of `valueCode`, `valueCoding`, `valueCodeableConcept` or `valueSet[x]`.
- The Zorgviewer profile requires at least one `relatedArtifact` and at least one `action.output`.

## ValueSet - `input/vocabulary/ValueSet-<Zorgpad><Concept>Codelist.json`

```json
{
    "resourceType": "ValueSet",
    "id": "<Zorgpad><Concept>Codelist",
    "meta": {
        "profile": [
            "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
        ]
    },
    "url": "http://fhir.hl7.nl/zorgviewer/ValueSet/<Zorgpad><Concept>Codelist",
    "name": "<Zorgpad><Concept>Codelist",
    "title": "Zorgviewer <zorgpad> <concept> waardelijst",
    "status": "active",
    "experimental": false,
    "description": "De codes waarmee <concept> voor het <Zorgpad> zorgpad wordt geselecteerd.",
    "copyright": "This value set includes content from SNOMED CT, which is copyright © 2002+ International Health Terminology Standards Development Organisation (IHTSDO), and distributed by agreement between IHTSDO and HL7. Implementer use of SNOMED CT is not covered by this agreement",
    "compose": {
        "include": [
            {
                "system": "http://snomed.info/sct",
                "concept": [
                    {
                        "code": "<code>",
                        "display": "<display>"
                    }
                ]
            }
        ]
    }
}
```

Drop the `copyright` statement when no SNOMED CT content is included.

## Intro notes

`input/intro-notes/PlanDefinition-<Zorgpad>-intro.md`:

```markdown
In deze PlanDefinition is het <Zorgpad> zorgpad beschreven: de selectiecriteria en de gegevens
die per stap nodig zijn, als DataRequirements.
Deze kunnen worden gebruikt om requests met de juiste filters samen te stellen.

### Request

1. Opvragen (search) definitie

    `GET <behandelplan-base>/PlanDefinition?name=<Zorgpad>`
```

`input/intro-notes/Library-<Zorgpad>-intro.md`:

```markdown
Deze Library bevat de data requirements en de CQL logica voor de selectiecriteria van het
<Zorgpad> zorgpad. De PlanDefinition [<Zorgpad>](PlanDefinition-<Zorgpad>.html) verwijst hiernaar.
```

## Documentatie pagina - `input/pagecontent/zorgpad-<zorgpad>.md`

```markdown
### <Nederlandse titel van het zorgpad>

<Korte beschrijving van het zorgpad en de bron (richtlijn / document).>

#### Selectiecriteria

| Criterium | FHIR resource / element | Code / waardelijst |
|---|---|---|
| <criterium> | Condition.code | [<waardelijst>](ValueSet-<Zorgpad><Concept>Codelist.html) |

#### Stappen en benodigde gegevens

| Stap | Benodigde gegevens | Profiel |
|---|---|---|
| <stap> | <gegevens> | [<Profiel>](StructureDefinition-<Profiel>.html) |

#### Resources

* [PlanDefinition <Zorgpad>](PlanDefinition-<Zorgpad>.html)
* [Library <Zorgpad>](Library-<Zorgpad>.html)

#### Openstaande punten

* <ontbrekend criterium, code of profiel uit de research phase>
```

## IG registratie - `input/zorgviewer-ig.json`

Add to `definition.resource`:

```json
{
    "reference": {
        "reference": "PlanDefinition/<Zorgpad>"
    },
    "name": "PlanDefinition <Zorgpad>",
    "description": "Deze PlanDefinition bevat de (data) definitie van het <Zorgpad> zorgpad.",
    "exampleCanonical": "http://fhir.hl7.nl/zorgviewer/StructureDefinition/PlanDefinition"
},
{
    "reference": {
        "reference": "Library/<Zorgpad>"
    },
    "name": "Library <Zorgpad>",
    "description": "De data requirements en logica voor het <Zorgpad> zorgpad."
}
```

Add to `definition.page`, nested in the `0rao.html` page next to `zorgplan.html`:

```json
{
    "nameUrl": "zorgpad-<zorgpad>.html",
    "title": "<Nederlandse titel van het zorgpad>",
    "generation": "markdown"
}
```
