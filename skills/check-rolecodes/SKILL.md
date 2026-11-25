---
name: check-rolecodes
description: Checks role codes in a ZIB FHIR profile. Use this when asked to validate or verify role codes based on technical FHIR specifications for the Zorgviewer project.
---

The result of this skill is a validation report (table) about the non-conforming rol codes in the project, by file and location within each file (provide link)

Run the project's automated role-code and ConceptMap checks with `cd script && npm run check-rolcode` from the repository root. The npm script is defined in `script/package.json` and runs `script/check-rolcode.js`. Include its output in the report, but do not treat it as a substitute for checking code validity and official descriptions against their code systems.

Sources for searching codes in a particular code system:
- SNOMED CT: Use the official SNOMED CT browser (https://snomedbrowser.org) or API.
- RoleCodeNL: terminologieserver.nl (ask for Nictiz account credentials if necessary)
- Other code systems: can you find a searchable online registry or official documentation for the code system based on the name of the system?

Check every role code, whether used on it's own or within a ConceptMap.

A conforming role code meets the following criteria:
- The code is valid within its respective code system
- If the code is from SNOMED CT, it must be a valid SNOMED CT occupation code (semantic tag: "occupation"). Check this using the official SNOMED CT browser or API.
- The description of the code must be equal to the official description in its respective code system. Dutch if available, otherwise English. If the description is English and there is a Dutch name, give the latter as an option.

When the criteria above are met, we can also check the ConceptMap consistency.

If role codes are used in a ConceptMap, check the following:
- If the definition of any one of the concepts can be found (e.g. because it it a SNOMED CT code), all of it's descriptions should be used to verify the mapping. Otherwise, rely on the descriptions provided in the ConceptMap.
- For a mapping, concepts on both sides must be either equal (in select cases, 'inexact' can be ok too but it's not preferred) or one of the concepts must be a subset of the other concept. 
- The equivalence of the mapping must be correctly specified when the relationship between the mapped concepts is considered.