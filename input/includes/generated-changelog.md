#### 🚀 Nieuw

* **Functionele Ontwerpen (FO's)**:
  * `Behandelaanwijzingen-&-Wilsverklaringen.md`: Nieuw FO waarin behandelaanwijzingen en wilsverklaringen zijn samengevoegd op één gecombineerd scherm.
  * `Intoxicaties.md`: Nieuw FO opgesteld ter vervanging van Middelengebruik; combineert ZIB's Alcohol-, Drugs- en Tabakgebruik met NHG-metingen uit huisartsgegevens.
  * `Medicatiegegevens.md`: Nieuw FO voor het gecombineerde overzicht van voorschriften, gebruik en toedieningen, inclusief LSP-medgeg integratie en een 12-maanden ophaalbeperking.
* **Testdata & FHIR Voorbeelden**:
  * `input/examples/`: Nieuwe Nedap voorbeeld-resources toegevoegd voor `AllergyIntolerance`, `Flag`, `LivingSituation` en `Patient`.

#### 🛠️ Gewijzigd

* **Functionele Ontwerpen (FO's)**:
  * `Contacten-en-Afspraken.md`: Datum- en tijdweergave samengevoegd (Start en Eind gecombineerd), screenshots bijgewerkt en testcase-terminologie aangepast naar 'entries'.
  * `Gezondheidstoestand.md`: Geïntegreerd met voeding en vocht naast mobiliteit, ontwerpbeslissingen toegevoegd en tijdlijnkaart voorlopig verwijderd.
  * `Medische-hulpmiddelen.md`: Herwerkt naar het nieuwste FO-template; sorteerregels voor vage datums en kaartontwerp voor de tijdlijn toegevoegd.
  * `Patiëntcontext.md`: Toelichtingen aangescherpt en nieuw basisschermvoorbeeld toegevoegd.
  * `Vitale-gegevens.md`: Work items bijgewerkt, ademhalingstestcase toegevoegd en testcasestabel vervangen door een directe link naar de IG.
* **FHIR Profiles & ViewDefinitions**:
  * `ViewDefinition-Appointment.json`: Kolommen 'Begin' en 'Eind' samengevoegd tot één kolom 'Datum' (`Period`).
  * `ViewDefinition-Condition.json` & `ViewDefinition-Probleemlijst.json`: Filterversoepeling door verwijdering van de `code.coding.display.exists()` eis, zodat ook condities zonder display-tekst worden meegenomen.
  * `ViewDefinition-Mobiliteit.json`: Mappings en SNOMED-codes geactualiseerd voor Traplopen, Houding veranderen, Houding handhaven en Transfers.
  * `StructureDefinition-EncounterReport.json`: Status gewijzigd van `draft` naar `active`.
* **Scripts & Generatie**:
  * `script/updateviewmd.js`: Ondersteuning toegevoegd voor `Period`-datatypes en formattering/sortering op basis van CET-tijdzone.
  * `script/changelog.js`: Logica bijgewerkt om ook diffs uit een tijdelijk FO-logbestand mee te nemen.

#### 🧹 Onderhoud

* **Herstructurering FO-documentatie**:
  * Oude/vervallen FO's (`Behandelaanwijzing.md`, `Wilsverklaringen.md`, `Voeding-en-vocht.md`, `Medicatie.md`) verplaatst naar respectievelijke `Notities/` submappen.
  * Het oude bestand `Middelengebruik.md` verwijderd ten gunste van `Intoxicaties.md`.
  * Losse achtergrondbestanden (`*-Background.md`) hernoemd naar `Notities.md` over diverse FO-mappen (`Contacten-en-Afspraken`, `PZP-ACP`, `Vaccinaties`, `Verrichtingen`, `Patiëntcontext`, `Vitale-gegevens`).
  * Lege of overbodige `.order`- en achtergrondbestanden opgeruimd (`Alerts-of-waarschuwingen`, `Correspondentie`, `Problemen`).
* **Templates & Tooling**:
  * `Template-Functioneel-Ontwerp.md`: Hernoemd (sterretje verwijderd) en uitgebreid met de sectie 'Ontwerpbeslissingen'.
  * `skills/fo-generator/references/template.md`: Referentietemplate synchroon gebracht met de nieuwe sectie 'Ontwerpbeslissingen'.
  * `README.md`: Handmatige stappen voor de Gemini FO-changelog verwijderd.
  * Automatisch hergegenereerde Markdown-bestanden (`input/includes/ViewDefinition-*.md`) bijgewerkt op basis van de nieuwste voorbeelddata.