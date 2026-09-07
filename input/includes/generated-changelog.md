#### 🚀 Nieuw

* **CapabilityStatements**:
  * `CapabilityStatement-OntsluitenBronsysteem Epic.json`, `Nexus.json`, `Zorgplatform.json`, `NedapONS.json`: Nieuwe CapabilityStatements toegevoegd voor het specificeren van de FHIR-bevragingen op de bronsystemen Epic, Nexus, Zorgplatform en NedapONS.
* **FHIR-voorbeelden & Datasets**:
  * `input/examples/`: Nieuwe Nedap-voorbeelden toegevoegd (`AllergyIntolerance-Nedap.json`, `Flag-Nedap.json`, `LivingSituation-Nedap.json`, `Patient-Nedap.json`).
  * `input/examples/`: Nieuwe voorbeeldbundels voor Medische Hulpmiddelen toegevoegd voor Chipsoft, Epic en Nexus (`MedischHulpmiddel-*.json`).
* **ConceptMaps**:
  * `ConceptMap-intoxicaties-groups.json`: Nieuwe ConceptMap toegevoegd voor het mappen van SNOMED CT- en NHG-tabel 45-codes naar LOINC-intoxicatiegroepen.
* **Scripts & Tooling**:
  * `script/convert_view_to_sd.js`: Nieuw script toegevoegd dat ViewDefinitions omzet naar minimale StructureDefinitions en deze valideert op `mustSupport`-dekking in profielen.
  * `script/replaceHostnames.js`: Nieuw script toegevoegd om hostnames in FHIR-voorbeelden te uniformeren naar `example.org`.

#### 🛠️ Gewijzigd

* **Hernamingen & Thema Intoxicaties**:
  * Het thema *Middelengebruik* is hernoemd naar *Intoxicaties*. Dit is doorgevoerd in profielen (`StructureDefinition-Intoxicaties.json`), ViewDefinitions (`ViewDefinition-Intoxicaties.json`), voorbeelden en documentatie.
  * `StructureDefinition-Intoxicaties.json`: `DiagnosticResult`-slice toegevoegd ter ondersteuning van intoxicaties-registraties uit huisartssystemen.
  * `ValueSet-SubstanceUseTypeCodelist.json`: Verwijderd ter gunste van de nieuwe `ConceptMap-intoxicaties-groups.json`.
* **CapabilityStatements Bronsystemen**:
  * `CapabilityStatement-OntsluitenBronsysteem-CGM.json`, `Sanday.json`, `Medicom.json`, `OntsluitenBronsysteem.json`: Expliciete profiellijsten vervangen door `implementationGuide`-verwijzingen; `Procedure` vervangen door `EpisodeOfCare`; verfijningen aangebracht op `EncounterReport`, `VitalSign` en `Intoxicaties`.
* **ViewDefinitions & Dataweergave**:
  * `ViewDefinition-Appointment.json`, `ContactenAfspraken.json`, `MedischHulpmiddel.json`: `start`- en `end`-velden gecombineerd naar één `Datum` (`Period`) expressie.
  * `ViewDefinition-Condition.json`, `Probleemlijst.json`: Filter `code.coding.display.exists()` verwijderd uit de `forEach` om ook condities zonder display-string te tonen. Zorgepisode-velden (`+Episode-naam`, `+Episode-status`, `+Episode-datum`) toegevoegd aan de Probleemlijst.
  * `ViewDefinition-EpisodeOfCare.json`: Kolommen en mappen bijgewerkt (`Eind` -> `Laatste`, `Concern` -> `Naam`, toevoeging van `Status`).
  * `ViewDefinition-LaboratoryTestResult.json`: Logica voor weergave van eenheden en referentiewaardegrenzen geoptimaliseerd.
  * `ViewDefinition-Medicatiegegevens.json`: Titel aangepast naar *"Medicatiegebruik, afspraken en toedieningen"*.
  * `ViewDefinition-Mobiliteit.json`: Componenten herzien conform de ZIB Mobiliteit (o.a. Traplopen, Houding veranderen/handhaven en Transfer).
* **StructureDefinitions & Profielen**:
  * `StructureDefinition-ContactenAfspraken.json`, `ContactenEpisodes.json`, `Correspondentie.json`, `Medicatiegegevens.json`, `Probleemlijst.json`: Verplichte minimum-cardinaliteit (`min: 1`) op entry-slices verwijderd.
  * `StructureDefinition-Medicatiegegevens.json`: `MedicationDispense`-slice toegevoegd voor toedieningsafspraken.
  * `StructureDefinition-DocumentReference.json`: `mustSupport: true` toegevoegd op `content`.
  * `StructureDefinition-EncounterReport.json`: Status verhoogd van `draft` naar `active`.
  * `StructureDefinition-VitalSign.json`: Extensie `compliesWithProfile` toegevoegd voor `gp-DiagnosticResult`.
* **Documentatie & Ontwerp**:
  * `design-usercontext.md`: Contexttabel uitgebreid met veldmappings voor Sanday, CGM en NedapONS.
  * `testcases.md`: Testcase voor ademhalingsmetingen toegevoegd; 'Middelengebruik' hernoemd naar 'Intoxicaties'.
  * `ValueSet-ProbleemStatus.json`: Weergavenaam van status `finished` aangepast naar *"Afgesloten"*.
* **Build, Scripts & IG-configuratie**:
  * `publication-request.json`, `zorgviewer-ig.json`: Versie verhoogd naar `1.25.0`, release-label ingesteld op `master` en Nedap-patient gekoppeld.
  * `script/updateviewmd.js`: Formattering voor `Period`-datatypes en conversie naar CET-tijdzone toegevoegd.
  * `script/changelog.js`: Ondersteuning toegevoegd voor het inlezen van wiki FO-diffs (`temp/fo-diff.log`).

#### 🧹 Onderhoud

* **Schoonmaak Voorbeelden & URL-correcties**:
  * Verwijdering van overbodige CGM-voorbeeldbestanden (`DocumentReference-CGM.json`, `Flag-CGM.json`).
  * Invalide URL-prefixes met drievoudige schuine streep (`https:///`) gecorrigeerd naar `https://` in diverse Epic-voorbeelden (`AdvanceDirective2-Epic.json`, `DocumentReference-Epic.json`, `Flag-Epic.json`, `Patient-Epic.json`, `Procedure-Epic.json`, `TreatmentDirective-Epic.json`).
  * Getalnotaties opgeschoond (bijv. `1.0` gewijzigd naar `1` in `LaboratoryTestResult-Sanday.json`, `VitalSign-Sanday.json` en `MedicationRequest-Nexus.json`).
  * Code-inspringing en JSON-formattering uniform gemaakt over alle voorbeeldresourcedocumenten.
* **Vocabulaire & Notities**:
  * Niet-gebruikte `version`- en `jurisdiction`-metadata verwijderd uit ConceptMaps (`ConceptMap-behandelaanwijzing-2017-2020.json`, `epic-rolcode.json`, `sanday-rolcode.json`, `vital-signs-groups.json`, `rolcodenl.json`).
  * `input/ignoreWarnings.txt`: Uitzonderingsregels toegevoegd voor specifieke IG-publisher validatiewaarschuwingen.
  * `README.md`: Handmatige wiki-instructies voor changelog-generatie opgeruimd.