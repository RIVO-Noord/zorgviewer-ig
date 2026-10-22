These scripts need version (>=14) of node. See https://www.linode.com/docs/guides/install-nodejs-on-ubuntu-22-04/

Setup:
```
@> apt update
@> apt install curl
@> curl -sL https://deb.nodesource.com/setup_23.x | bash -
@> apt install nodejs
@> npm install
```

## Available Scripts

- `changelog.js`: Generates a changelog using the Gemini API based on git history from the last 3 weeks.
- `check-rolcode.js`: Validates role codes and concept maps within the vocabulary directory.
- `dosage.js`: Library to convert FHIR Dosage resources into human-readable strings (supports Dutch and English).
- `updateigex.js`: Synchronizes the Implementation Guide (`zorgviewer-ig.json`) with example resources from the examples directory.
- `updateviewmd.js`: Generates Markdown documentation for views based on FHIR examples and ViewDefinitions.

## Usage

### updateviewmd.js

```
@> cd script
@> node updateviewmd.js
```

### changelog.js

```
@> cd script
@> export GEMINI_API_KEY=...
@> node changelog.js
```

### Other Scripts

You can run the other scripts using `npm run <script-name>`:
- `npm run check-rolcode`
- `npm run updateigex`
- `npm run dosage`

## Pseudonymizing examples

`pseudonymize.js` replaces real persons in example files by fake persons, so the examples can be committed safely.

```
@> cd script
@> node pseudonymize.js [--dry-run] ../input/examples/Patient-Epic.json ../input/examples/Bundle-EPS.json
@> npm run pseudonymize -- --dry-run ../input/examples/Condition-Epic.json
```

- Every file is processed on its own. Files are only written when there are no errors; `--dry-run` prints the planned replacements (original → new) and writes nothing.
- Running it again on a pseudonymized file changes nothing ("Already pseudonymized"). A person is recognised as already replaced by name only (family name + first given name, or full name).
- Fake persons come from the pool `pseudonymize-fakes.json` (a STU3 Bundle of fake Patient, Practitioner, RelatedPerson and Organization resources; Person is supported as well). Every fake is linked to the places it replaced with a `meta.tag` with system `https://zorgviewer.nl/fhir/pseudonymize/used-in` and as code the example file plus the place in it: a resource (`Bundle-EPS.json#Patient/4e6b...`, a contained one as `Condition/1.contained(p1)`), a contact (`Patient/123.contact[0]`), a mention of a person or organization that is not in the file (`Appointment-Epic.json#Appointment/eu...participant.actor[1]`: path plus the number of the mention at that path in the resource) or a known organization from `replaceNames` (`#organizations.replaceNames[0]`, its position in the config). A place without a locator (a resource without id) gets the file name only. The links hold only file names, resource ids and paths, never original names or identifiers. When a place is pseudonymized again (e.g. after the example was refreshed with real data), it gets the fake it is linked to; other places get the first fake of the pool (Bundle order, per type) that is not yet used in the file, preferring fakes not linked to another place in it. Fakes are reused across files, so the pool only needs as many people per type as the busiest single file. After every successful run (not with `--dry-run`, also when the file was already pseudonymized) the links of the file are replaced by the current ones, for the fakes that occur in the file, and the pool file is saved. Do not remove fakes or tags from the pool, and do not reorder `replaceNames`, as that changes the examples when they are pseudonymized again.
- The same real person gets the same fake within one file. There is no mapping between files, so the same real person in two files may become two different fake persons, and two different real persons in two files may get the same fake.
- `pseudonymize-paths.json` configures what is replaced: `persons` (elements to replace per resource type), `contacts` (e.g. `Patient.contact`, replaced by a fake RelatedPerson) and `mentions` (names/identifiers in references, e.g. `Condition.subject.display`). Besides the configured mentions, every Reference-like object anywhere in a resource (a string `display` plus `reference`, `type` or `identifier`) is handled: its person type is taken from the `reference` value (or a `type` field); organisations and other non-person types are skipped. The configured mentions with a fixed type are the fallback when nothing can be derived, and cover non-Reference fields (AuditEvent). If the type cannot be determined at all a WARNING is printed and the object is left alone, so review it manually. Only files in `input/examples` are accepted; organizations in `input/resources` and `input/vocabulary` (e.g. `bronsysteem-zorgaanbieder`) are public data (OIDs from the HL7 OID register, AGB-Z codes) and stay as they are. Organizations in examples are pseudonymized too, from fake Organization resources in the same pool (each with an abbreviation as `alias[0]`). The `organizations` section of `pseudonymize-paths.json` has `keep` (regexes for names that stay: software vendors and vendor test organizations, already fictional organizations and generic department names; everything else of type Organization is replaced), `replaceNames` (known real implementations that are replaced wherever they occur in a file, e.g. in a Location or a note) and `elements`. Abbreviations (UMCG) become the fake abbreviation, other names the fake name; Locations only follow the replacements of their organization. `keepDisplays` lists displays that are left alone even when typed as a person (e.g. an insurer modelled as Practitioner). Canonical URLs, system URIs and host names are not changed. A display that is replaced keeps its role and style: `Schroder, CP, Arts` becomes `<FakeFamily>, <FakeInitials>, Arts`, `E. Sieders, Chirurg` becomes `<Initials> <FakeFamily>, Chirurg`, and the original family name is also replaced inside the role part (`Huisartsenpraktijk Pulver & Partners`). PractitionerRole displays that only hold role text (`Huisartsen, niet apotheekhoudend`) are left alone. Narratives (`text.div`) are updated with all replacements made in the file (HTML entities such as `&#x27;` are matched too). When a multi-file run runs out of fake people, the end of the output gives the largest shortfall per type over the failed files.
- Only strings are replaced; the structure (extensions, `use`, `system`, periods, ...) is kept. Identifiers for which the fake has no value of the same system get a format-preserving scramble (INFO). Photos are removed and `deceasedDateTime` is kept (WARNING).
- Fake persons must have `id`, `name[0].text`, `name[0].family` and `name[0].given[0]` (and Patients also `birthDate` and a BSN identifier). Every `name[0].text` must be unique.

### When it asks for more fake people

```
ERROR: Bundle-EPS.json: Not enough fake people in script/pseudonymize-fakes.json: add 2 Patient, 1 Practitioner.
```

Nothing is written for that file. Add the requested number of fake resources of those types to `pseudonymize-fakes.json` (copy an existing one, give it a new `id` and a new, clearly fictional and unique name, and for Patients a new BSN that passes the 11-check) and run again.

If it reports `Fake Patient <id> has no value for <path>`, the example has an element (e.g. a name or address extension) that the fakes do not have yet. Add that element to the fakes in `pseudonymize-fakes.json` and run again.

Set the environment variable `PSEUDONYMIZE_FAKES` to use another pool file (e.g. for testing).
