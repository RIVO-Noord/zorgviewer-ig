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
- **Azure DevOps work items**: Controleer voor iedere genoemde feature/user story of het work item inhoudelijk bij het FO hoort:
  1. Haal elk numeriek work item-ID op uit de metadata (bijv. `#123456`).
  2. Laad eerst de PAT uit het werkruimtebestand `.env` in de shell, zodat `PAT` beschikbaar is voor de scripts, bijvoorbeeld:
     ```bash
     cd /app
     set -a && . ./.env && set +a
     ```
     Gebruik daarna per ID het repositoryscript `script/check-devops.js`, bijvoorbeeld `node script/check-devops.js 123456`.
  3. Het script verwacht de PAT uitsluitend in de omgevingsvariabele `PAT`; zet de token nooit handmatig in het commando, de uitvoer of het rapport.
  4. Gebruik de door de Azure DevOps API opgehaalde titel, type, status, area, omschrijving, acceptatiecriteria en eventuele parent-ID om de relatie met het FO te beoordelen. Vergelijk het onderwerp en de beschreven functionaliteit concreet met de scope van het FO; alleen een bereikbare ID of parentrelatie bewijst geen inhoudelijke koppeling.
  5. Meld per ID of deze inhoudelijk passend, niet passend of niet verifieerbaar is. Onderbouw dit met relevante work item-details. Als het work item niet kan worden opgehaald, rapporteer de fout/status en trek geen conclusie over de inhoudelijke relatie.

### 3. Gewenste Uitvoer
Lever een overzichtelijk analyserapport op in het Nederlands met:
- **Samenvatting**: Korte conclusie van de staat van het document.
- **Conformiteitstabel**: Een overzicht van de eisen uit het template bestand met status (✅ / ⚠️ / ❌) en bevinding per onderdeel.
- Neem in de conformiteitstabel een afzonderlijke rij op voor de vergelijking van FO-kolomnamen met de bijbehorende IG-wireframe.
- **Linkcontrole-tabel**: Alle gecontroleerde links met url, status en eventuele correctie.
- **DevOps-workitemcontrole**: Een afzonderlijk overzicht per genoemd work item met ID, API-status, relevante details en conclusie of het inhoudelijk bij dit FO hoort.
- **Concrete Verbeterpunten**: Een genummerde actielijst met precies wat er gewijzigd of aangevuld moet worden.