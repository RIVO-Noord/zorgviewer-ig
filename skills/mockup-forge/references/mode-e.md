# Modus E: ViewDefinition-ui.md → Mockup — Workflow

Gebruik deze modus om `ViewDefinition-*.ui.md` wireframe-bestanden automatisch om te zetten in professionele Zorgviewer mockups.

## Input
- **Bestandstype**: `ViewDefinition-*-ui.md` (bijv. `ViewDefinition-Correspondentie-ui.md`)
- **Locatie**: Standaard in `/app/input/includes/` of elke andere folder
- **Inhoud**: HTML tabel met wireframe-gegevens, inclusief:
  - Kolomkoppen
  - Data-rijen
  - Optioneel: expandable rijen met details (bijv. verslagen)

## Output
- **HTML mockup**: Volledig Zorgviewer scherm met:
  - Topbar (patiëntgegevens, gebruiker)
  - Sidebar (navigatiemenu)
  - Content panel met tabel uit wireframe
  - Output naar `/app/output/mockups/ViewDefinition-*.html`
- **PNG mockup** (optioneel): Gerenderde high-res afbeelding (1280px breed, 2x DPI)
  - Output naar `/app/output/mockups/ViewDefinition-*.png`
  - Vereist: Node.js, Puppeteer
  - Renderingsnelheid: ~5-8 seconden per mockup

## Workflow

### Stap 1: Kies de ViewDefinition bestand
```bash
# Single file mode
python3 scripts/viewdefinition-to-html.py \
    --input /app/input/includes/ViewDefinition-Correspondentie-ui.md \
    --output /tmp/mockup-correspondentie.html
```

### Stap 2: (Optioneel) Render naar PNG
```bash
python3 scripts/generate-mockup.py \
    --html /tmp/mockup-correspondentie.html \
    --output ./mockup-correspondentie.png \
    --width 1280 \
    --scale 2
```

### Stap 3: (Bulk mode) Verwerk alle ViewDefinition bestanden
```bash
python3 scripts/batch-viewdefinition-mockups.py \
    --input-dir /app/input/includes \
    --output-dir /app/output/mockups \
    --render-png  # Ook PNG's genereren
```

Dit genereert:
- HTML mockup voor elke `ViewDefinition-*-ui.md`
- Optionele PNG's voor elk HTML
- `index.html` met overzicht van alle mockups

## Hoe het script werkt

### HTML-tabel parsing
Het script:
1. Leest de MD bestand
2. Extraheert alle `<table>` elementen
3. Parsed kolomkoppen (eerste `<th>` rij)
4. Verzamelt alle data-rijen

### Data-transformatie
- **Bron-kolom**: Omgezet naar monogram-cirkels (bijv. "NedapONS" → "NO" cirkel met #1565C0)
- **Expandable rijen**: Alleen hoofdrijen met inhoudelijke details tonen een
  uitklapicoon. Als geen enkele rij details heeft, wordt de icoonkolom weggelaten.
- **Detail-rows**: Verslagen/extra info onder expandable rijen ingebed met grijze achtergrond.
  Alleen voor `ViewDefinition-Correspondentie-ui.md` staan de details rechts naast de
  tabel en ontbreekt de expandkolom. De paneeltitel bevat de bron, datum en beschrijving
  van de geselecteerde rij; lege waarden worden weggelaten. De eerste rij is
  geselecteerd; selecteer een andere rij met de muis of met Enter/spatie om de
  bijbehorende details te zien. Een rij zonder details
  toont een melding. Het detailpaneel en de tabel scrollen afzonderlijk.

### HTML generatie
Genereert een volledige `<html>` met:
- Zorgviewer design system CSS (kleuren, fonts, layout)
- Topbar met patiënt + gebruiker pills
- Sidebar met navigatiemenu
- Content panel met tabel uit wireframe
- Responsive styling

## Design system compliance

Het script past automatisch toe:
- **Kleuren**: Teal (#00838F), grijstinten, bron-kleuren
- **Typografie**: Open Sans, juiste font-sizes
- **Components**: 
  - Bron-monogrammen (28×28px cirkels)
  - Pills (patiënt, gebruiker)
  - Panel headers met icoon
- **Spacing**: 16-24px padding/margins
- **Borders**: 1px #E2E8F0
- **Shadows**: 0 1px 3px rgba(0,0,0,0.04)

## Ondersteunde ViewDefinition-bestanden

Alle `ViewDefinition-*-ui.md` bestanden in `/app/input/includes/`:
- `ViewDefinition-Correspondentie-ui.md` — Correspondentie en verslagen
- `ViewDefinition-Behandelaanwijzingen-ui.md` — Behandelaanwijzingen
- `ViewDefinition-AllergyIntolerance-ui.md` — Allergieën en intoleranties
- `ViewDefinition-Appointment-ui.md` — Afspraken
- `ViewDefinition-Contactpersonen-ui.md` — Contactpersonen
- ... en alle andere beschikbare wireframes

## Troubleshooting

### Geen tabellen gevonden?
- Controleer of de MD inderdaad een `<table>` bevat
- Kijk naar het begin van het bestand voor de wireframe-tabel

### Fout bij PNG-rendering?
- Zorg dat `node` en `puppeteer` geïnstalleerd zijn
- Probeer HTML eerst apart te openen in browser
- Controleer de console output voor meer details

### Bron-kleuren kloppen niet?
- Het script herkent bron op basis van de naam
- Voeg meer bron-mappings toe in de `get_bron_color()` functie

## Extensies

Het script kan makkelijk uitgebreid worden met:
- Aangepaste CSS per ViewDefinition
- Filter/sort buttons in tabel headers
- Interactieve elementen (expand/collapse)
- Inline detail-viewers
- Link-targets naar PDF's/documenten

## Files

- **`viewdefinition-to-html.py`** — Converter ViewDefinition-ui.md → HTML
- **`batch-viewdefinition-mockups.py`** — Batch-processor voor meerdere bestanden
- **`generate-mockup.py`** — HTML → PNG renderer (Playwright)
