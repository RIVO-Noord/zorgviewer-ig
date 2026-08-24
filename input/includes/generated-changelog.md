#### 🚀 Nieuw

* **Functionele Ontwerpen (FO's)**:
  * `Behandelaanwijzingen-&-Wilsverklaringen.md`: Nieuw gecombineerd FO waarin behandelaanwijzingen en wilsverklaringen zijn samenvoeg op één gecombineerd scherm.
  * `Intoxicaties.md`: Nieuw FO opgesteld ter vervanging van Middelengebruik; combineert ZIB's Alcohol-, Drugs- en Tabakgebruik met NHG-metingen uit de huisartsgegevensset.
  * `Medicatiegegevens.md`: Nieuw FO voor het gecombineerde overzicht van voorschriften, gebruik en toedieningen (inclusief integratie van LSP medgeg).
* **FHIR Voorbeelden & Tooling**:
  * `input/examples/`: Nieuwe Nedap voorbeeld-resources toegevoegd (`AllergyIntolerance`, `Flag`, `LivingSituation`, `Patient`) evenals MedischHulpmiddel-voorbeelden voor Chipsoft, Epic en Nexus.
  * `script/replaceHostnames.js`: Nieuw script toegevoegd voor het uniformiseren van hostnames in FHIR-voorbeelden naar `example.org`.

#### 🛠️ Gewijzigd

* **Functionele Ontwerpen (FO's)**:
  * `Contacten-en-Afspraken.md`: Datum- en tijdweergave gecombineerd tot één veld 'Datum', schermmock-up bijgewerkt en testcase-terminologie verfijnd naar 'entries'.
  * `Gezondheidstoestand.md`: Status bijgewerkt naar 'Gereviewed'; Voeding en Vocht geïntegreerd naast Mobiliteit, ontwerpbeslissingen toegevoegd en tijdlijnkaart verwijderd.
  * `Medische-hulpmiddelen.md`: Geherstructureerd volgens het nieuwste FO-template; sorteerregels voor vage datums en details voor de tijdlijnkaart toegevoegd.
  * `Patiëntcontext.md` & `Vitale-gegevens.md`: Screenshots en workitems bijgewerkt; ademhalingstestcase toegevoegd en testcasestabel vervangen door directe link naar de IG.
  * `Template-Functioneel-Ontwerp.md`: Bestandsnaam hernoemd (sterretje verwijderd), sectie `# Ontwerpbeslissingen` toegevoegd en de sectie `# Testcases` verwijderd.
* **ViewDefinitions & Data Weergave**:
  * `ViewDefinition-Appointment.json` & `ViewDefinition-MedischHulpmiddel.json`: Losse start/eind-kolommen vervangen door een gecombineerde `Datum` (`Period`) expressie.
  * `ViewDefinition-Condition.json` & `ViewDefinition-Probleemlijst.json`: Filterversoepeling door verwijdering van de `code.coding.display.exists()` eis, zodat alle condities getoond worden.
  * `ViewDefinition-Mobiliteit.json`: Velden herzien conform de ZIB Mobiliteit (Traplopen, Houding veranderen, Houding handhaven, Uitvoeren transfer).
* **FHIR Profiles & IG Configuratie**:
  * `StructureDefinition-EncounterReport.json`: Status gewijzigd van `draft` naar `active`.
  * `input/zorgviewer-ig.json`: Release label ingesteld op `master` en Nedap Patient voorbeeld gekoppeld.
* **Scripts & Generatie**:
  * `script/updateviewmd.js`: Ondersteuning voor `Period`-datatypes toegevoegd en datum/tijd-formattering naar CET-tijdzone aangepast.
  * `script/changelog.js`: Diff-bereik en ondersteuning voor `fo-diff.log` bijgewerkt.

#### 🧹 Onderhoud

* **Herstructurering Wiki & FO-documentatie**:
  * Oude/vervallen FO-pagina's (`Behandelaanwijzing.md`, `Wilsverklaringen.md`, `Voeding-en-vocht.md`, oude Medicatie FO's) verplaatst naar `Notities/` submappen als referentie.
  * Vervallen bestanden `Middelengebruik.md` en `Medicatie-Q3-2026.md` verwijderd.
  * Achtergrondbestanden (`*-Background.md`) over diverse FO-mappen hernoemd naar `Notities.md`.
  * Lege en ongebruikte `.order`- en achtergrondbestanden opgeruimd (`Alerts-of-waarschuwingen`, `Correspondentie`, `Problemen`).
* **Code & Data Opschoning**:
  * JSON-voorbeelden geherformatteerd (indeling gecorrigeerd), getalnotaties opgeschoond (bijv. `1.0` naar `1`) en ongeldige URL-prefixes (`https:///`) hersteld.
  * Automatisch hergegenereerde Markdown-tabellen (`input/includes/ViewDefinition-*.md`) geactualiseerd.
  * `README.md`: Handmatige wiki-diff stappen voor changelog-generatie opgeruimd.