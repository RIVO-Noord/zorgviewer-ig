Lees éérst het meest actuele sjabloon in `_local/Zorgviewer.wiki/Functionele-Ontwerpen-(FO's)/Template-Functioneel-Ontwerp.md` om de exacte structuur, koppen en verplichte velden te bepalen. Voer vervolgens op basis daarvan een grondige controle uit van het bestand `_local/Zorgviewer.wiki/Functionele-Ontwerpen-(FO's)/<BESTANDSNAAM>.md` en valideer alle daarin opgenomen links.

### 1. Template-controle (Structuur & Inhoud op basis van `Template-Functioneel-Ontwerp.md`)
Vergelijk `_local/Zorgviewer.wiki/Functionele-Ontwerpen-(FO's)/<BESTANDSNAAM>.md` rechtstreeks met de gelezen inhoud van `Template-Functioneel-Ontwerp.md` en controleer op:
1. **Header / Metadata-tabel**:
   - Controleer of álle rijen/velden uit de koptabel van het template aanwezig zijn (zoals `Versie`, `Documentatie`, `Features en/of user stories`, `**Review**`, `Reviewdatum`, `Review door`).
2. **Wijzigingenbeheer & Inhoudsopgave**:
   - Verifieer de tabelstructuur conform de kolommen in het template en de aanwezigheid van `[[_TOC_]]`.
3. **Hoofdstukkenstructuur**:
   - Controleer of álle hoofdkopen (`#`) uit het template aanwezig zijn en in dezelfde volgorde staan:
     - `# Aanleiding & context`
     - `# Gegevensbronnen` (met de verplichte 5 kolommen uit het template)
     - `# Ontwerpbeslissingen`
     - `# Disclaimer`
     - `# Schermontwerp`
     - `# Tijdlijn`
     - `# Testcases`
4. **Schermontwerp uitwerking**:
   - Controleer de koptabel (gesplitste rijen voor `Naam scherm` en `Naam menu item`, `Icoon` en `Gegevensherkomst schermontwerp`).
   - Verifieer de verplichte introductiezin en opsomming voor data-elementen conform het template.
   - Controleer de aanwezigheid van visuele mock-ups/schermvoorbeelden en de gedragstabel (`Zoeken`, `Filteren & sortering`, `Uitklapveld`).
   - **Kolomnamen en IG-wireframe**: identificeer de kolomnamen die het FO voor het gegevensscherm noemt of toont. Open de bijbehorende FHIR-profielpagina uit de gegevensherkomst en controleer de wireframe-sectie (`#ui-wireframe`); controleer of elke FO-kolom ook als kolomkop in dat wireframe voorkomt en dezelfde naam gebruikt. Rapporteer ontbrekende of afwijkend benoemde kolommen concreet, en vermeld ook wanneer geen geassocieerd profiel of wireframe beschikbaar is. Beoordeel tijdlijnkaartvelden niet als schermkolommen.
5. **Tijdlijn uitwerking**:
   - Controleer of de tijdlijnsectie de koptabel en substructuur uit het template volgt, óf expliciet toelicht dat de tijdlijn niet van toepassing is.

### 2. Linkcontrole
Controleer alle (interne en externe) hyperlinks in het te controleren FO:
- **ZIB-links**: Verwijzen ze naar de juiste ZIB-wikipagina en versie?
- **FHIR-profiel / IG-links**: Verwijzen de links naar geldige FHIR-profielpagina's op `https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/`?
- **UI Wireframe- / Ankerlinks**: Klopt het anker (bijv. `#ui-wireframe` of `#kolomdefinities`) en is de profielnaam in de URL correct?
- **Kolomnamen**: Komen alle kolomnamen die het FO voor het gegevensscherm gebruikt overeen met kolomkoppen in de bijbehorende IG-wireframe, met dezelfde naam? Vermeld ontbrekende, afwijkende of niet verifieerbare kolomnamen.
- **Iconen- & Asset-links**: Verwijzen Google Fonts- links en SharePoint-links naar de juiste locaties?

### 3. Gewenste Uitvoer
Lever een overzichtelijk analyserapport op in het Nederlands met:
- **Samenvatting**: Korte conclusie van de staat van het document.
- **Conformiteitstabel**: Een overzicht van de eisen uit het template bestand met status (✅ / ⚠️ / ❌) en bevinding per onderdeel.
- Neem in de conformiteitstabel een afzonderlijke rij op voor de vergelijking van FO-kolomnamen met de bijbehorende IG-wireframe.
- **Linkcontrole-tabel**: Alle gecontroleerde links met url, status en eventuele correctie.
- **Concrete Verbeterpunten**: Een genummerde actielijst met precies wat er gewijzigd of aangevuld moet worden.