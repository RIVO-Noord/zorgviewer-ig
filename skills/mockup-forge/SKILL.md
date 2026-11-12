---
name: mockup-forge
description: Genereer professionele UI mockups als PNG-afbeeldingen op basis van wireframes, schermontwerpen, of Excel-tabellen. Gebruik deze skill wanneer de gebruiker vraagt om een mockup, schermontwerp, UI-voorbeeld, of screen design te maken, combineren, professionaliseren of upgraden. Ook triggeren bij vermeldingen van wireframe-naar-mockup conversie, het toepassen van een visuele stijl op een wireframe, het upgraden van een samengestelde afbeelding, of het genereren van een mockup uit een xlsx-tabel. Werkt met het Zorgviewer design system (PrimeVue + Google Fonts).
---

# MockupForge — UI Mockup Generator

Genereer pixel-perfecte UI mockups als PNG door wireframes, schermontwerpen of Excel-tabellen te combineren via de Claude API, gerenderd met Playwright/Weasyprint voor exacte browser-kwaliteit.

Gebruik voor alle modi tekstgroottes op 90% van de eerdere grootte; pas de
tekstgroottes uit het design system toe zonder ze opnieuw te schalen. Schaal
bij deze typografische aanpassing iconen en layoutafmetingen niet mee.

## Vijf modi

### Modus A: Wireframe → Mockup
- **Input 1**: Schermontwerp (stijl + navigatie/menu/chrome)
- **Input 2**: UI Wireframe (pagina-content, secties, labels)
- **Output**: Professionele mockup met content uit wireframe, stijl+navigatie uit schermontwerp

### Modus B: Eigen mockup professionaliseren
- **Input 1**: Schermontwerp (stijl + content + navigatie — alles)
- **Input 2**: Eigen mockup (alleen layout/elementposities)
- **Output**: Professionele mockup met layout uit eigen mockup, al het overige uit schermontwerp

### Modus C: Samengestelde mockup upgraden
- **Input 1**: Origineel schermontwerp (stijlreferentie)
- **Input 2**: Samengestelde afbeelding (schermontwerp + ingeplakt wireframe-knipsel)
- **Output**: Uniforme professionele mockup waarin wireframe-delen visueel zijn geüpgraded

### Modus D: Excel-tabel → Mockup
- **Input**: Een `.xlsx`-bestand met een tabel (sheet-naam = paneeltitel, eerste rij = headers, rest = data)
- **Output**: Volledige Zorgviewer-mockup gegenereerd uit de tabeldata, met alle design-systeemregels automatisch toegepast
- **Bijzonder**: geen API-call nodig, alles wordt door `scripts/excel-to-mockup.py` afgehandeld

### Modus E: ViewDefinition-ui.md → Mockup (NIEUW)
- **Input**: Een `ViewDefinition-*.ui.md` bestand met wireframe-tabel (bijv. `ViewDefinition-Correspondentie-ui.md`)
- **Output**: Volledig Zorgviewer-mockup gegenereerd uit de wireframe-gegevens, met automatisch:
  - Juiste kolommen en data uit de wireframe
  - Bron-monogrammen met juiste kleuren
  - Expandable rijen voor verslagen/details
  - Volledige Zorgviewer interface (topbar, sidebar, panel)
- **Bijzonder**: automatische data-extractie en layout, geen extra bestanden nodig

## Workflow

### Stap 1: Bepaal de modus
Vraag de gebruiker welke modus, of leid dit af uit de beschrijving en bestandstype:
- `.xlsx` bestand geüpload → Modus D
- `ViewDefinition-*-ui.md` bestand geüpload → Modus E
- "wireframe omzetten" → Modus A
- "mockup professionaliseren" / "mockup upgraden" → Modus B
- "samengestelde mockup" / "knipsel" / "hover toevoegen" / "uitbreiding" → Modus C

### Stap 2: Verzamel de bestanden
Identificeer de input-bestanden. Ze staan typisch in de opgegeven werkmap of in de uploads-folder.

### Stap 3: Lees het design system
Lees `references/zorgviewer-design-system.md` voor de exacte kleuren, fonts, iconen en componentstijlen. Dit document bevat alle regels die elke mockup moet volgen.

### Stap 4a: Voor Modi A/B/C — genereer HTML via Claude API
Gebruik de Claude API met het juiste prompt-template:
- Lees `references/mode-a.md`, `references/mode-b.md`, of `references/mode-c.md` afhankelijk van de modus.
- Stuur beide afbeeldingen mee (schermontwerp altijd als IMAGE 1).
- Gebruik extended thinking voor grondige analyse.
- De API-response bevat complete HTML.

### Stap 4b: Voor Modus D — gebruik Python-script
Lees `references/mode-d.md` voor de workflow. Draai het script:
```bash
python3 scripts/excel-to-mockup.py \
    --input <xlsx-pad> \
    --output <html-pad> \
    --render-png
```

### Stap 4c: Voor Modus E — gebruik ViewDefinition-extractor script (NIEUW)
Lees ViewDefinition-ui.md bestanden en genereer HTML:
```bash
python3 scripts/viewdefinition-to-html.py \
    --input <ViewDefinition-*-ui.md pad> \
    --output <html-pad>
```

Dit script:
1. Leest de `ViewDefinition-*.ui.md` wireframe-tabel
2. Extraheert alle kolommen en rijen met echte gegevens
3. Genereert HTML mockup met volledige Zorgviewer interface
4. Past bron-kleuren en -monogrammen automatisch toe
5. Handelt expandable rijen af (bijv. verslagen)

### Stap 5: Render naar PNG (Modi A/B/C/E)
Voor modi A/B/C/E, gebruik het script `scripts/generate-mockup.py` dat:
1. De HTML opslaat als tijdelijk bestand
2. Playwright opstart met een 1280px viewport
3. De pagina rendert met 2x device scale factor (retina)
4. Een PNG-screenshot maakt
5. Het resultaat opslaat in de werkmap

```bash
python scripts/generate-mockup.py --html /tmp/mockup.html --output ./mockup-resultaat.png --width 1280 --scale 2
```

Modus D doet de rendering automatisch via weasyprint + pdftoppm als `--render-png` is meegegeven.

### Stap 6: Review
Toon het resultaat aan de gebruiker. Vraag of er aanpassingen nodig zijn. Zo ja, pas de HTML aan en render opnieuw.

## Belangrijk
- Schermontwerp is ALTIJD IMAGE 1 in de API-call (modi A/B/C)
- Lees ALTIJD het design system reference document vóór het genereren
- Gebruik ALTIJD Playwright (A/B/C/E) of Weasyprint (D) voor PNG-rendering, nooit html2canvas of vergelijkbare client-side libraries
- Extra instructies van de gebruiker worden toegevoegd aan het prompt
- Modus D vereist `openpyxl` (en `weasyprint` + `pdftoppm` voor PNG)
- Modus E vereist geen externe afhankelijkheden, alleen ingebouwde Python libraries (html.parser, re)

## Toekomstige uitbreidingen (placeholder)

Volgende geplande modi worden hier toegevoegd zodra ze beschikbaar zijn:
- **Modus F** — Prompt-based modificatie van bestaande mockup (bv. "voeg een uitklap toe aan rij 3 in de bestaande mockup met dit label en deze waarde"). Vereist een bestaande mockup-HTML + prompt → aangepaste HTML met behoud van alle styling.
- **Modus G** — Hybride: xlsx-tabel + wireframe-screenshot voor schermen met mix van tabular en non-tabular content.
