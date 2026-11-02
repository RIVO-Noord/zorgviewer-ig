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
- **ZIB-links**: Controleer per gelinkte ZIB of de pagina bestaat, de in het FO genoemde ZIB en versie overeenkomen met de link, én of het concept en de gegevenselementen van de ZIB inhoudelijk passen bij het onderwerp en de gegevens die het FO beschrijft. Een geldige link of juiste versienaam is op zichzelf geen bewijs dat de ZIB inhoudelijk passend is. Benoem ZIBs die slechts een deel van het FO-deelonderwerp dekken en relevante ZIBs die voor beschreven onderdelen ontbreken. Negeer nieuwere major versies van de ZIB: adviseer geen versie-upgrade en markeer de gebruikte versie niet als verouderd uitsluitend omdat er een nieuwere major versie bestaat. Beoordeel de link en versie zoals het FO ze zelf presenteert.
- **FHIR-profiel / IG-links**: Verwijzen de links naar geldige FHIR-profielpagina's op `https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/`?
- **UI Wireframe- / Ankerlinks**: Klopt het anker (bijv. `#ui-wireframe` of `#kolomdefinities`) en is de profielnaam in de URL correct?
- **Kolomnamen**: Komen alle kolomnamen die het FO voor het gegevensscherm gebruikt overeen met kolomkoppen in de bijbehorende IG-wireframe, met dezelfde naam? Vermeld ontbrekende, afwijkende of niet verifieerbare kolomnamen.
- **Iconen- & Asset-links**: Verwijzen Google Fonts- links en SharePoint-links naar de juiste locaties?
- **Azure DevOps work items en wiki-pagina's**: Controleer voor iedere genoemde feature/user story en voor iedere verwijzing naar een Azure DevOps wiki-pagina of -pagina-URL of `pagePath` of `wiki-id` of `page-id` of het script om de koppeling inhoudelijk te beoordelen:
  1. Haal elk numeriek work item-ID op uit de metadata (bijv. `#123456`).
  2. Haal ook alle Azure DevOps wiki-links op uit het FO (bijv. `https://dev.azure.com/.../_wiki/...`, `.../wiki/.../12345/...`, of een pagina-pad zoals `/Functionele-Ontwerpen-(FO's)/Intoxicaties`).
  3. Gebruik het repositoryscript `skills/check-devops.js` voor beide checks, bijvoorbeeld:
     ```bash
     node skills/check-devops.js 123456
     node skills/check-devops.js 123456 https://dev.azure.com/UMCG-MIT/Zorgviewer/_wiki/wikis/Zorgviewer.wiki/11026/Intoxicaties
     ```
     of, wanneer er geen volledige wiki-URL aanwezig is, een page-path zoals:
     ```bash
   node skills/check-devops.js 123456 "/Functionele-Ontwerpen-(FO's)/Intoxicaties"
     ```
  4. Het script leest de PAT automatisch uit het werkruimtebestand `.env` en gebruikt die voor de Azure DevOps API-aanroepen; zet de token nooit handmatig in het commando, de uitvoer of het rapport.
  5. Gebruik de door de Azure DevOps API opgehaalde titel, type, status, area, omschrijving, acceptatiecriteria en eventuele parent-ID van het work item om de relatie met het FO te beoordelen. Vergelijk het onderwerp en de beschreven functionaliteit concreet met de scope van het FO; alleen een bereikbare ID of parentrelatie bewijst geen inhoudelijke koppeling.
  6. Controleer daarnaast met hetzelfde script of de wiki-pagina toegankelijk is en of de pagina-URL / page-path overeenkomt met de bedoelde pagina in Azure DevOps. Rapporteer of de pagina bestaat, bereikbaar is en inhoudelijk relevant is voor het FO.
  7. Meld per work item en per wiki-pagina of deze inhoudelijk passend, niet passend of niet verifieerbaar is. Onderbouw dit met relevante details. Als een item niet kan worden opgehaald, rapporteer de fout/status en trek geen conclusie over de inhoudelijke relatie.

### 3. Gewenste Uitvoer
Lever een overzichtelijk analyserapport op in het Nederlands met:
- **Samenvatting**: Korte conclusie van de staat van het document.
- **Conformiteitstabel**: Een overzicht van de eisen uit het template bestand met status (✅ / ⚠️ / ❌) en bevinding per onderdeel.
- Neem in de conformiteitstabel een afzonderlijke rij op voor de vergelijking van FO-kolomnamen met de bijbehorende IG-wireframe.
- **Linkcontrole-tabel**: Alle gecontroleerde links met url, status en eventuele correctie.
- **DevOps-workitemcontrole**: Een afzonderlijk overzicht per genoemd work item met ID, API-status, relevante details en conclusie of het inhoudelijk bij dit FO hoort.
- **Concrete Verbeterpunten**: Een genummerde actielijst met precies wat er gewijzigd of aangevuld moet worden.