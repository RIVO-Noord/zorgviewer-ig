---
name: zorgpad-generator
description: Generates the FHIR resources (PlanDefinition, Library, CQL, ValueSets) and the IG documentation that define the data scope of a zorgpad, from a document describing that zorgpad. Use this when asked to create or update a zorgpad, zorgplan or care pathway in the Zorgviewer IG, or to define which data and decision support fall within the scope of one.
---

# Zorgpad Generator

This skill turns a prose description of a zorgpad into the artifacts the Zorgviewer needs to decide which patients fall within that zorgpad and which data is in scope for each of its steps: a PlanDefinition holding the selection and step actions, a Library holding the data requirements and the CQL logic, the waardelijsten those filters need, and the IG documentation around them. It works from a zorgpad document of any kind; whatever the document leaves open is reported as a gap instead of guessed at.

## Constraints
- Use FHIR STU3 only
- In documentation, be as concise as possible while still being complete and clear. Include only information that is relevant to the zorgpad, decision support and its data scope. 
- If any of the generated resources matches or nearly matches an existing one, ask to reuse an existing one instead of generating a new one

## Workflow

### 1. Research phase
- **Read zorgpad document**: Read the document that was provided as input
- **Determine completeness**: Does the document contain:
  - A description of the zorgpad
  - Any number of selection criteria for the patients the zorgpad applies to
  - A clear description of the data needed to determine whether a patient meets the selection criteria
  - A clear description of the data needed for decision support in any of the steps included in the zorgpad

### 2. Strategy phase
- For all the data that is needed, determine the required FHIR resources and the codes that are required to do a more granular filtering of the data
- If the aforementioned codes are not provided in the document, attempt to find the codes in the relevant FHIR profiles already included in the IG and/or in zibs
- If the codes are not found in the IG or zibs, attempt to find them in the relevant code systems (e.g., SNOMED CT, LOINC, etc.) using web searches

### 3. Execution phase (Generation)

Author the resources as hand-written STU3 JSON in the IG source tree. `input/resources/PlanDefinition-BgZ2017.json` is the reference implementation for a data-scope definition; the generated PlanDefinition must satisfy `input/profiles/StructureDefinition-PlanDefinition.json` (`relatedArtifact` 1..*, `action.output` 1..*). Skeletons for every file are in [references/templates.md](references/templates.md).

1. **Determine the artifact name**: derive one PascalCase `<Zorgpad>` name from the title in the document (e.g. `PneumokokkenVaccinatie`) and use it in every file name, `id`, `name` and canonical URL. Canonicals are `http://fhir.hl7.nl/zorgviewer/<ResourceType>/<Zorgpad>`, except ValueSets which are named `<Zorgpad><Concept>Codelist` (see step 5).

2. **Library** — `input/resources/Library-<Zorgpad>.json`:
    - `type` = `logic-library`, `status` = `draft`, `experimental` = `true`, `publisher` = `RIVO-Noord`.
    - One `dataRequirement` per data element found in the strategy phase: `type` (FHIR resource type), `profile` (Zorgviewer profile canonical first, then the Nictiz zib profile) and `codeFilter` with the codes found (`valueCode`, `valueCodeableConcept` or `valueSetReference`).
    - `parameter` for the inputs the logic needs (at minimum `Patient`, plus a period when the criteria are time-bound).
    - `relatedArtifact` of type `documentation` pointing at the source zorgpad document, the underlying richtlijn and the zibs used.
    - `content` with `contentType` `text/cql` pointing at the CQL file from step 3 — only when the criteria are actually expressed as logic; omit `content` when the zorgpad is a pure data-scope definition.

3. **CQL** (only when the document contains decidable criteria) — `input/cql/<Zorgpad>.cql`:
    - A `define` per selection criterion and a `define` per decision-support question, named exactly as referenced from `PlanDefinition.action.condition.expression`.
    - Keep the retrieves aligned with the `dataRequirement`s in the Library; every retrieve must have a matching `dataRequirement`.
    - The IG publisher does not render `.cql` for a STU3 IG, so reference the file from `Library.content.url` by its raw URL in the source repository (`https://github.com/RIVO-Noord/zorgviewer-ig/blob/master/input/cql/<Zorgpad>.cql`), or embed it base64 in `Library.content.data` when the Library must be self-contained.

4. **PlanDefinition** — `input/resources/PlanDefinition-<Zorgpad>.json`:
    - Metadata mirroring BgZ2017: `url`, `version`, `name`, `title`, `status` `draft`, `publisher` `RIVO-Noord`, `usage` (Dutch, one sentence on what the zorgpad scopes), `jurisdiction` `NL`.
    - `relatedArtifact` type `documentation` → the source zorgpad document (mandatory per the profile).
    - `library` → a `Reference` to the generated Library (`Library/<Zorgpad>`); STU3 uses a Reference here, not a canonical.
    - One `action` per step of the zorgpad, plus a first action for the patient selection:
        - `label` (and optionally `title`) plus `description`, taken from the document.
        - `triggerDefinition` `named-event` with the `eventName` used by the Zorgviewer to request this step.
        - `condition` with `kind` `applicability`, `language` `text/cql` and `expression` = the `define` name, when a criterion applies.
        - `output` — one DataRequirement per resource in scope for that step, with `type`, `profile` and `codeFilter` so the Zorgviewer can build the filtered query.
    - Do not repeat data in every action: put the criteria data in the selection action and only the step-specific data in the step actions.

5. **ValueSets** — for any code filter that needs multiple codes, add `input/vocabulary/ValueSet-<Zorgpad><Concept>Codelist.json` following the convention of `ValueSet-ProbleemNaamCodelist.json` (`shareablevalueset` meta profile, `status` `active`, `experimental` `false`, SNOMED copyright statement when SNOMED CT is included) and reference it from `codeFilter.valueSetReference`.

6. **Missing profiles** — when the zorgpad needs data that has no profile in this IG yet, do not invent one here. Report the gap and generate that profile with the `zib-fhir-generator` skill first, then reference its canonical.

7. **Intro notes** — `input/intro-notes/PlanDefinition-<Zorgpad>-intro.md` and `input/intro-notes/Library-<Zorgpad>-intro.md`: a few Dutch sentences on what the resource contains and how it is retrieved (`GET <behandelplan-base>/PlanDefinition?name=<Zorgpad>`).

8. **Documentation page** — `input/pagecontent/zorgpad-<zorgpad>.md` containing: a concise description of the zorgpad, a table of selection criteria (criterium → FHIR resource/element → code/waardelijst), the steps with the data needed per step, and an explicit list of the gaps found in the research phase.

9. **Register in the IG** — add to `input/zorgviewer-ig.json`:
    - a `definition.resource` entry per new resource, with Dutch `name` and `description`; for the PlanDefinition set `exampleCanonical` to `http://fhir.hl7.nl/zorgviewer/StructureDefinition/PlanDefinition`, following the existing `PlanDefinition/BgZ2017` entry;
    - a `definition.page` entry for the new page, nested under `0rao.html` next to `zorgplan.html`.

10. **Report the gaps**: list every incompleteness found in the research phase and every code that could not be resolved. Never silently invent a selection criterion, a code or a profile — leave a marked TODO in the resource and name it in the response.

## Guidelines
- **FHIR version**: STU3 only — use the STU3 names and datatypes, never their R4 equivalents: `DataRequirement.codeFilter.valueSetReference` (R4: `valueSet`), `PlanDefinition.action.label` (R4: `prefix`), `PlanDefinition.library` as a Reference (R4: canonical), `triggerDefinition.eventName` (R4: `name`) and `action.condition.expression` as a plain string (R4: `Expression`).
- **Language**: Always write the narrative parts (`title`, `usage`, `description`, intro notes, page content) in **Dutch**, as per project conventions.
- **Consistency**: Ensure terminology matches the zorgpad document, the zibs and the IG. Before adding a profile, ValueSet or PlanDefinition, check what the IG already has and ask to reuse it, per the Constraints.
- **Traceability**: Every `dataRequirement` / `action.output` must be traceable to a statement in the source document; every criterion in the document must end up in the PlanDefinition or in the gap list.
- **Links**: Ensure all links to the IG, zibs and code systems are functional.

## File Naming Convention

Listed in the order the execution phase creates them:

| File | Contents |
|---|---|
| `input/resources/Library-<Zorgpad>.json` | The data requirements and the pointer to the CQL logic |
| `input/cql/<Zorgpad>.cql` | Selection criteria and decision support as CQL (only when the document is decidable) |
| `input/resources/PlanDefinition-<Zorgpad>.json` | The zorgpad itself: the selection action and one action per step, with their DataRequirements |
| `input/vocabulary/ValueSet-<Zorgpad><Concept>Codelist.json` | One waardelijst per filtered concept that needs multiple codes |
| `input/intro-notes/PlanDefinition-<Zorgpad>-intro.md` | Intro on the PlanDefinition page |
| `input/intro-notes/Library-<Zorgpad>-intro.md` | Intro on the Library page |
| `input/pagecontent/zorgpad-<zorgpad>.md` | Documentation page for the zorgpad |
| `input/zorgviewer-ig.json` | Existing file — extended with the resource and page registrations |

Where `<Zorgpad>` is the PascalCase name of the zorgpad (e.g. `PneumokokkenVaccinatie`), `<zorgpad>` its lowercase variant, and `<Concept>` the concept a waardelijst filters on.

## Example: Pneumokokken vaccinatie

**User Request**: "Genereer het zorgpad voor de pneumokokkenvaccinatie uit dit document"

**Output Files**:
* `input/resources/Library-PneumokokkenVaccinatie.json`
* `input/cql/PneumokokkenVaccinatie.cql`
* `input/resources/PlanDefinition-PneumokokkenVaccinatie.json`
* `input/vocabulary/ValueSet-PneumokokkenVaccinatieRisicogroepCodelist.json`
* `input/intro-notes/PlanDefinition-PneumokokkenVaccinatie-intro.md`
* `input/intro-notes/Library-PneumokokkenVaccinatie-intro.md`
* `input/pagecontent/zorgpad-pneumokokkenvaccinatie.md`
* `input/zorgviewer-ig.json` (extended, not created)

## References
- [Resource templates](references/templates.md) - Skeletons for the PlanDefinition, Library, CQL, ValueSet, intro notes, documentation page and IG registration entries.
- `input/resources/PlanDefinition-BgZ2017.json` - Existing data-scope definition in this IG, the model to follow.
- `input/profiles/StructureDefinition-PlanDefinition.json` - The Zorgviewer PlanDefinition profile the result must conform to.
- `input/capabilities/CapabilityStatement-Behandelplan.json` - The Behandelplan bouwblok that serves these PlanDefinitions.
- `input/pagecontent/zorgplan.md` - Project context for zorgplan support and CQL.
