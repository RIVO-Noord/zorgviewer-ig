#### 🚀 Nieuw

* **Combiprofiel & View 'Contacten en Afspraken'**:
  * `input/profiles/StructureDefinition-ContactenAfspraken.json`: Nieuw combiprofiel toegevoegd waarin `Encounter` (contact) en `Appointment` (afspraak) worden gebundeld.
  * `input/images/ViewDefinition-ContactenAfspraken.json`, `input/includes/ViewDefinition-ContactenAfspraken*.md`: ViewDefinition, UI-wireframe en kolomdefinities toegevoegd voor het gecombineerd tonen van contacten en geplande afspraken.
  * `input/intro-notes/StructureDefinition-ContactenAfspraken-intro.md`: Introductiedocumentatie en FHIR-zoekinstructies toegevoegd.
* **Nieuwe FHIR-voorbeelden**:
  * `input/examples/Ademhaling-Nedap.json`: Voorbeeld-bundle toegevoegd met `zib-Respiration` observaties uit Nedap.
  * `input/examples/Appointment-WZA.json`: Voorbeeld-bundle toegevoegd voor eAfspraak vanuit het Wilhelmina Ziekenhuis Assen.
* **Documentatie & Testscenario's**:
  * `input/pagecontent/testcases.md`: Nieuwe testcases toegevoegd voor Voedingsadvies, Woonsituatie, Contactpersonen en uitgebreid Middelengebruik.
  * `input/pagecontent/datasets.md`: Documentatie uitgebreid met de Huisartsgegevensset en NUTS Zorgtoepassing (HA-VVT inzage dossier v1.1).
* **AI Tooling & Skills**:
  * `skills/fo-viewdef-generator/SKILL.md`: Nieuwe Claude/AI-skill toegevoegd voor het automatisch genereren van Functioneel Ontwerp (FO) documenten op basis van ViewDefinition JSON-bestanden.

#### 🛠️ Gewijzigd

* **ViewDefinitions & Schermontwerpen**:
  * `input/images/ViewDefinition-Appointment.json` (`.md`, `-ui.md`): Kolommen bijgewerkt; zorgverlener en rol gebundeld in de kolom 'Met', en kolom 'Reden' (`reason.text | indication.display`) toegevoegd.
  * `input/images/ViewDefinition-Encounter.json` (`.md`, `-ui.md`): Kolom 'Rol' samengevoegd in 'Met', type-weergave uitgebreid met `type.text`/`coding.display`, en kolom 'Reden' toegevoegd.
  * `input/images/ViewDefinition-Middelengebruik.json` (`.md`, `-ui.md`): Logica voor periode, status, middel en hoeveelheid/antwoord herzien (inclusief ondersteuning voor NHG Tabel 45 5-shot vragenlijst en pack-years).
  * `input/images/ViewDefinition-Vitalegegevens.json` (`.md`, `-ui.md`): `zib-Respiration` toegevoegd aan de selectie (`forEach`), extra componenten-kolom en context-kolom (`+Context`) toegevoegd, en SNOMED CT meegenomen in de groepsvertaling.
* **FHIR Profielen & Slicing**:
  * `input/profiles/StructureDefinition-AlcoholUse.json`, `DrugUse.json`, `TobaccoUse.json`: Slices toegevoegd voor specifieke componenten (hoeveelheid alcohol, soort drugs, soort tabaksproduct).
  * `input/profiles/StructureDefinition-Middelengebruik.json`: Slicing op `Bundle.entry` toegevoegd voor `TobaccoUse`, `AlcoholUse` en `DrugUse`.
  * `input/profiles/StructureDefinition-ContactenEpisodes.json`: Slicing op `Bundle.entry` toegevoegd voor `Encounter` en `EpisodeOfCare`.
  * `input/profiles/StructureDefinition-Encounter.json`: Extensie `compliesWithProfile` voor `gp-Encounter` toegevoegd en elementbeperkingen verfijnd.
* **ConceptMaps & Vocabulaire**:
  * `input/vocabulary/ConceptMap-*.json`: Target-systeem voor rolcodes (`epic`, `sanday`, `rolcodenl`) gewijzigd naar SNOMED CT (`http://snomed.info/sct`). SNOMED CT ademhalingscode (422834003) toegevoegd aan `vital-signs-groups.json`.
* **FHIR Voorbeelden**:
  * `input/examples/Middelengebruik-Epic.json`: Observaties bijgewerkt met toelichtingen, actuele datums (2026), gebruiksperiodes en gedetailleerde tabak-/alcohol-componenten.
* **Documentatie & Integratie**:
  * `input/intro-notes/StructureDefinition-VitalSign-intro.md` & `Middelengebruik-intro.md`: FHIR-search queries verfijnd en opgesplitst per gegevensset/bron (BgZ, Huisarts, NUTS HA-VVT).
  * `input/pagecontent/checklists.md`: Epic scope-checklist uitgebreid met `Observation.Read (Social History) (STU3)`.

#### 🧹 Onderhoud

* **Opschonen FHIR-voorbeelden & IG-structuur**:
  * `input/examples/LaboratoryTestResult-Nexus.json`: Nexus lab-voorbeeld verwijderd en ontkoppeld uit `zorgviewer-ig.json`.
  * `input/profiles/StructureDefinition-Correspondentie.json`, `Medicatiegegevens.json`, `EpisodeOfCare.json`, `MedischHulpmiddel.json`: Redundante differential-restricties en vaste waarden opgeruimd.
* **Build scripts & Validatie**:
  * `script/updateviewmd.js`: Foutmeldingen verrijkt met bestandsnamen bij FHIRPath-evaluatie en logica toegevoegd om vitale gegevens zonder toegewezen groep over te slaan.
  * `script/changelog.js`: Model-update naar `gemini-3.6-flash` en diff-bereik aanpassing.
  * `input/ignoreWarnings.txt`: Negeer-regels toegevoegd voor specifieke SNOMED CT validaties, OID-controles en R5 discriminator deprecation waarschuwingen.