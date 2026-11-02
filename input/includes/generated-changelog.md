#### 🚀 Nieuw

* `.vscode/launch.json`: VS Code debugconfiguratie toegevoegd voor het uitvoeren van Node.js scripts vanuit submappen.
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-VIPlive.json`: Nieuw CapabilityStatement toegevoegd voor VIPlive (ondersteuning voor Consent / TreatmentDirective).
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-VersneldVerbinden.json`: Nieuw CapabilityStatement toegevoegd voor het Versneld Verbinden bronsysteem.
* `input/intro-notes/CapabilityStatement-OntsluitenBronsysteem-*-intro.md`: Introductiedocumenten en specificaties voor de bronsystemen Epic, Nexus, VIPlive, Versneld Verbinden en Zorgplatform toegevoegd.
* `skills/check-devops.js` & `skills/check-devops.ps1`: Nieuw Node.js- en PowerShell-script toegevoegd voor het geautomatiseerd valideren van Azure DevOps work items en wiki-pagina's via de REST API.

#### 🛠️ Gewijzigd

* `fhir.hl7.nl/package-list.json`, `input/zorgviewer-ig.json` & `publication-request.json`: IG-versie opgehoogd naar `1.27.0` (releasedatum 2 november 2026).
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem Epic.json`:
  * Titel gewijzigd naar "Bronsysteem: Epic" en softwarenaam naar "Epic Interconnect".
  * `searchParam` (`category`) en `search-type` interacties toegevoegd voor diverse profielen (o.a. VitalSign, LivingSituation, Intoxicaties, MedicationRequest, MedicationStatement, MedicationDispensation, Appointment, Procedure).
  * Ondersteuning toegevoegd voor `NutritionOrder` (NutritionAdvice) en `DeviceUseStatement` (MedischHulpmiddel).
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem Nexus.json`:
  * Titel gewijzigd naar "Bronsysteem: Nexus".
  * `search-type` interactie toegevoegd aan observationele profielen en documentatienotities ("HTTP 403 Forbidden") toegevoegd voor Appointment en Encounter.
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem Zorgplatform.json`: Titel gewijzigd naar "Bronsysteem: Zorgplatform" en `search-type` interacties toegevoegd aan vitale en intoxicaties observations.
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-CGM.json`: Titel bijgewerkt naar "Bronsysteem: CGM".
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-MediKIT.json` & `-Medicom.json`: Titels gestandaardiseerd en status aangepast naar `draft`.
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-NedapONS.json`: Titel gestandaardiseerd en beschrijving opgeschoond.
* `input/capabilities/CapabilityStatement-OntsluitenBronsysteem-Sanday.json`: Ondersteuning voor `Encounter` resource toegevoegd (via `read`).
* `input/profiles/StructureDefinition-Correspondentie.json` & `input/images/ViewDefinition-Correspondentie.json`: Titel gewijzigd in "Correspondentie en Verslagen" en functionaliteit uitgebreid met verpleegkundige rapportages (`Observation` / `nl-core-nursingreport`).
* `input/images/ViewDefinition-*.json` & `input/includes/ViewDefinition-*.md`:
  * Tabellen en UI wireframes hergegenereerd met vernieuwde kolomtitels (`Gegevensherkomst` i.p.v. `Kolomdefinities`, `DETAILS` i.p.v. `UITKLAPVELD`, `CONTROL` i.p.v. `MARKERING`).
  * Voorbeelden uitgebreid met onder andere IPS-Epic en NedapONS data.
  * Zib element mapping voor `Appointment` status bijgewerkt naar `GeplandeZorgActiviteit::OrderStatus`.
* `input/intro-notes/CapabilityStatement-OntsluitenBronsysteem-Sanday-intro.md`: `Patient/$match` payload specificatie en BSN identifier system URL verduidelijkt.
* `input/intro-notes/StructureDefinition-Correspondentie-intro.md`: Documentatie aangevuld voor PDF/A en NUTS verpleegkundige rapportages.
* `input/intro-notes/StructureDefinition-Encounter-intro.md`: Query-handleiding aangevuld voor Sanday encounters.
* `input/vocabulary/ConceptMap-epic-rolcode.json`: Rolcodes toegevoegd voor Co-assistent (130), Ergotherapeut (100), Diëtist (104) en Fysiotherapeut (106).
* `input/vocabulary/ValueSet-ACPTreatmentCodelist.json`: Sortering van behandelingsconcepten expliciet vastgelegd via `valueset-conceptOrder` extensies.
* `skills/check-fo.md`: FO-controlescriptie uitgebreid met checks op overeenkomende kolomnamen tegen IG-wireframes en Azure DevOps koppelingen.

#### 🧹 Onderhoud

* `.gitignore`: `.env` bestand toegevoegd aan de gitignore.
* `README.md`: Indentatie van codeblokken opgeschoond.
* `input/examples/*`: Endpoints in voorbeeldbronnen geanonimiseerd naar `example.org` en te lange resource ID's (>64 tekens) ingekort.
* `input/ignoreWarnings.txt`: Uitzonderingsregel toegevoegd voor OID-toewijzingswaarschuwingen.
* `input/images/package-feed.xml`: Feed bijgewerkt voor release 1.27.0.
* `input/pagecontent/changes.md`: Historiebijwerkingen voor versie 1.27.0 toegevoegd.
* `input/pagecontent/design.md`: Koptekst "Bepalen zorgaanbieders" verduidelijkt naar "(Localisatie)".
* `input/pagecontent/downloads.md`: TTL-downloadlinks verwijderd uit de documentatie.
* `input/pagecontent/testing.md`: Documentatie bijgewerkt met een overzicht van alle beschikbare ViewDefinition testbestanden.
* `script/changelog.js`: Git diff logica aangepast om automatisch te vergelijken met de meest recente git tag.
* `script/replaceHostnames.js`: Hostname replacement-script uitgebreid met automatische truncatie van resource ID's boven 64 tekens.
* `script/updateviewmd.js`: Generator script voor ViewDefinition markdown aangepast met verbeterde datum/tijd-formattering en verwerking van FHIR R4 CodeableConcepts.