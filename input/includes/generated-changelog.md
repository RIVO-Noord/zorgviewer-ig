#### 🚀 Nieuw

* **Functionele Ontwerpen & Analyses**:
  * `Functionele-Ontwerpen-(FO's)/Analyse-Bricks-Huisarts-(Tetra).md`: Nieuwe analyse voor het aansluiten van het bronsysteem Bricks Huisarts (Tetra HIS).
  * `Functionele-Ontwerpen-(FO's)/Analyse-NedapONS.md`: Nieuw analysedocument voor het aansluiten van Nedap ONS (VVT).
* **CapabilityStatements & Introductienotities**:
  * `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-VIPlive.json`: Nieuw CapabilityStatement voor VIPlive (ondersteuning voor `Consent` / `TreatmentDirective`).
  * `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-VersneldVerbinden.json`: Nieuw CapabilityStatement voor het bronsysteem Versneld Verbinden.
  * `input/intro-notes/CapabilityStatement-OntsluitenBronsysteem-*-intro.md`: Introductienotities en specificaties toegevoegd voor Epic, Nexus, VIPlive, Versneld Verbinden en Zorgplatform.
* **DevOps Integratie & Tooling**:
  * `skills/check-devops.js` & `skills/check-devops.ps1`: Scripts toegevoegd voor geautomatiseerde validatie van Azure DevOps work items en wiki-pagina's via de REST API.
  * `.vscode/launch.json`: VS Code launch-configuratie toegevoegd voor het debuggen van Node.js scripts vanuit submappen.

#### 🛠️ Gewijzigd

* **Functionele Ontwerpen (FO's)**:
  * `Behandelvoorkeuren-(werktitel,-misschien-behandelgrenzen).md`: Hernoemd en Behandelaanwijzingen geïntegreerd met Wilsverklaringen; tabbladstructuur, sorteerregels en iconen verfijnd.
  * `Contacten-en-Afspraken-(pilot).md`: Hernoemd (aangeduid als pilot), ZIB-mappings geüpdatet en weergave van periode/datums verfijnd.
  * `Correspondentie-en-verslagen.md`: Hernoemd vanuit Correspondentie, uitgebreid met verpleegkundige rapportages (`NursingReport` uit VVT/NUTS) en SOEP-verslagen.
  * `Gezondheidstoestand/Zelfzorg-(pilot).md`: Verplaatst naar de map `Gezondheidstoestand/` en aangeduid als pilot.
  * `Vitale-gegevens.md`: Gegevensbronnen uitgebreid (o.a. `O2Saturatie`, `AlgemeneMeting`, `Polsfrequentie`) en indeling/conceptmaps verfijnd.
  * `Laboratoriumuitslagen.md`, `Medische-hulpmiddelen.md`, `Zorgactiviteiten.md`, `PZP-ACP.md`: Reviewdata bijgewerkt, sorteer-/filtergedrag gestandaardiseerd en werkitems gekoppeld.
* **CapabilityStatements & Profielen**:
  * `CapabilityStatement-OntsluitenBronsysteem Epic.json`: Zoekparameter `category` toegevoegd aan Observation-profielen en ondersteuning toegevoegd voor `NutritionOrder` (Voedingsadvies) en `DeviceUseStatement` (Medisch hulpmiddel).
  * `CapabilityStatement-OntsluitenBronsysteem Nexus.json`: `search-type` interacties toegevoegd en documentatienotities (HTTP 403 Forbidden) toegevoegd bij Appointment en Encounter.
  * `CapabilityStatement-OntsluitenBronsysteem Sanday.json`: Leesondersteuning (`read`) voor `Encounter` toegevoegd.
  * `CapabilityStatement-OntsluitenBronsysteem MediKIT.json` & `Medicom.json`: Status ingesteld op `draft` en titels gestandaardiseerd.
  * `StructureDefinition-Correspondentie.json` & `ViewDefinition-Correspondentie.json`: Titel gewijzigd naar "Correspondentie en Verslagen" en uitgebreid met verpleegkundige rapportages (`Observation` / `nl-core-nursingreport`).
* **ViewDefinitions & Documentatie-generatie**:
  * `ViewDefinition-*.md` / `*-ui.md`: Kolomkoppen gestandaardiseerd (`Gegevensherkomst` i.p.v. `Kolomdefinities`, `DETAILS` i.p.v. `UITKLAPVELD`, `CONTROL` i.p.v. `MARKERING`) en UI-voorbeelden aangevuld met IPS-Epic en NedapONS data.
  * `ValueSet-ACPTreatmentCodelist.json`: Sortering van behandelgrenzen expliciet vastgelegd via `valueset-conceptOrder` extensies.
  * `ConceptMap-epic-rolcode.json`: Rolcodes toegevoegd voor Co-assistent (130), Ergotherapeut (100), Diëtist (104) en Fysiotherapeut (106).
  * `script/updateviewmd.js`: Datum-/tijd-formattering geoptimaliseerd en afhandeling van CodeableConcepts verbeterd.
  * `skills/check-fo.md`: Checklist uitgebreid met validatie van kolomnamen tegen IG-wireframes en DevOps-workitemcontroles.

#### 🧹 Onderhoud

* `fhir.hl7.nl/package-list.json`, `input/zorgviewer-ig.json` & `publication-request.json`: IG-versie opgehoogd naar `1.27.0` (releasedatum 2 november 2026).
* `input/examples/*`: Endpoints in voorbeeldbronnen geanonimiseerd naar `example.org` en te lange resource ID's (>64 tekens) automatisch ingekort.
* `README.md`: Codeblok-indentatie opgeschoond en instructies voor het opschonen van `temp/fo-diff.log` toegevoegd.
* `.gitignore`: `.env` bestand toegevoegd om lokaal aanwezige geheimen/tokens niet mee te plegen.
* `script/replaceHostnames.js`: Truncatie van resource ID's boven de 64 tekens toegevoegd.
* `input/pagecontent/testing.md` & `changes.md`: Documentatie en overzicht van beschikbare ViewDefinition testbestanden bijgewerkt.