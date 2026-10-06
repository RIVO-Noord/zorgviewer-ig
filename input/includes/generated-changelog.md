#### 🚀 Nieuw

* **FHIR Profilering & CapabilityStatements:**
  * `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-MediKIT.json`: CapabilityStatement toegevoegd voor de integratie met Nedap MediKIT.
  * `input/profiles/StructureDefinition-GeplandeZorgactiviteiten.json`: Aangemaakt FHIR-profiel voor Geplande Zorgactiviteiten (`ProcedureRequest`).
  * `input/images/ViewDefinition-GeplandeZorgactiviteiten.json` & `input/includes/ViewDefinition-GeplandeZorgactiviteiten*`: ViewDefinition en UI-wireframe definities toegevoegd voor Geplande Zorgactiviteiten.
  * `input/vocabulary/ValueSet-ProcedureStatus.json`: ValueSet aangemaakt voor status-labels van verrichtingen en zorgactiviteiten.
  * `input/intro-notes/CapabilityStatement-OntsluitenBronsysteem-MediKIT-intro.md` & `StructureDefinition-GeplandeZorgactiviteiten-intro.md`: Documentatie-interacties en API-instructies toegevoegd.
* **Voorbeeldbestanden & Tooling:**
  * `input/examples/`: FHIR-voorbeeld-bundles toegevoegd (`EpisodeOfCare-Sanday.json`, `GeplandeZorgactiviteit-Chipsoft.json`, `GeplandeZorgactiviteit-Epic.json`, `GeplandeZorgactiviteit-Epic2.json`, `GeplandeZorgactiviteit-UMCG.json`).
  * `skills/check-fo.md`: Skill-definitie voor automatische FO-template- en linkvalidatie.
  * `skills/mockup-forge/scripts/generate-mockup.py`: Python/Puppeteer-script toegevoegd om HTML-mockups automatisch naar PNG-afbeeldingen te renderen.

#### 🛠️ Gewijzigd

* **ViewDefinitions & UI Includes:**
  * `ViewDefinition-Behandelaanwijzingen.json` / `.md`: Veld `(Groep)` toegevoegd op basis van de ACP Treatment Codelist om behandelingen te kunnen groeperen.
  * `ViewDefinition-ContactenAfspraken.json` / `.md`: Toelichting toegevoegd over rolweergave bij zorgverleners.
  * `ViewDefinition-Intoxicaties.json` / `.md`: Datumaanduiding gewijzigd naar `Period:date` en statusweergave voor NHG-tabel 45 gefilterd.
  * `ViewDefinition-Probleemlijst.json` / `.md`: Datumweergave aangepast naar `date`, veldindeling voor Zorgepisode/Concern gecorrigeerd en statusafhandeling verbeterd.
  * `ViewDefinition-VitalSign.json` / `.md`: Paden verruimd voor context-weergave van meetwaarden.
  * Multi-file UI Markdown includes (`input/includes/*-ui.md`): Header-indicatoren aangepast van `+` naar `&#9660;` ter aanduiding van uitklapbare rijen.
* **CapabilityStatements & Vocabulaire:**
  * `CapabilityStatement-OntsluitenBronsysteem-CGM.json`: FHIR-versie gecorrigeerd naar 3.0.2, toelichting toegevoegd over ontbreken van `MedicationStatement` en het uitsluiten van alerts en correspondentie.
  * `CapabilityStatement-OntsluitenBronsysteem-Medicom.json` / `Sanday.json` / `Zorgplatform.json`: Softwarenamen en documentatie verfijnd.
  * `ConceptMap-intoxicaties-groups.json`: Status naar `active` gezet en groepslabels vertaald naar Nederlandse termen (*Roken*, *Alcohol*, *Drugs*).
  * `ValueSet-ACPTreatmentCodelist.json`: SNOMED-codes toegevoegd voor IC-opname, reanimatie, beademing en toediening van bloedproducten.
* **Implementatiegids & Build:**
  * `input/pagecontent/changes.md` & `testcases.md`: Releasedatums bijgewerkt en testcases uitgebreid (o.a. Mobiliteit).
  * `input/pagecontent/design-usercontext.md`: Context-tabel verfijnd met verplichte veldaanduidingen.
  * `script/updateviewmd.js`: Generator uitbreid met ondersteuning voor `Period:date` en filtering van interne groeperingskolommen.
  * `zorgviewer-ig.json` & `publication-request.json`: IG-versie verhoogd van `1.25.0` naar `1.26.0`.

#### 🧹 Onderhoud

* **Documentatie & Scripts:**
  * `README.md`: Instructies bijgewerkt voor het releaseproces, `GEMINI_API_KEY` instellingen en het synchroniseren van de Wiki in `_local/`.
  * `script/changelog.js`: Diff-bereik van het changelog-script ingesteld op tag `1.25.0`.