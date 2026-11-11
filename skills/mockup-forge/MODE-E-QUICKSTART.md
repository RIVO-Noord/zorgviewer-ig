# MockupForge Skill — Modus E: ViewDefinition Wireframes

## 🚀 Nieuwe Functionaliteit

De mockup-forge skill is uitgebreid met **Modus E** voor automatische conversie van `ViewDefinition-*-ui.md` wireframes naar professionele Zorgviewer mockups.

### Wat kan je ermee?

1. **Single file**: Genereer mockup uit één ViewDefinition bestand
2. **Batch**: Verwerk alle 32 ViewDefinition bestanden tegelijk
3. **PNG export**: Render HTML naar high-res PNG (1280px, 2x DPI)
4. **Auto-index**: Genereer overzichtspagina van alle mockups

## 📋 Voorbeelden

### Voorbeelden 1: Één bestand verwerken

```bash
python3 skills/mockup-forge/scripts/viewdefinition-to-html.py \
    --input /app/input/includes/ViewDefinition-Correspondentie-ui.md \
    --output /tmp/mockup.html
```

**Output**: `/tmp/mockup.html` — Professionele Zorgviewer mockup

### Voorbeeld 2: Render naar PNG

```bash
python3 skills/mockup-forge/scripts/generate-mockup.py \
    --html /tmp/mockup.html \
    --output /tmp/mockup.png \
    --width 1280 \
    --scale 2
```

**Output**: `/tmp/mockup.png` — High-res PNG mockup

### Voorbeeld 3: Batch verwerking (alle 32 bestanden + PNGs)

```bash
python3 skills/mockup-forge/scripts/batch-viewdefinition-mockups.py \
    --input-dir /app/input/includes \
    --output-dir /app/output/mockups \
    --render-png
```

**Output**: 
- `/app/output/mockups/ViewDefinition-*.html` — 32× HTML mockups
- `/app/output/mockups/ViewDefinition-*.png` — 32× PNG mockups (optioneel)
- `/app/output/mockups/index.html` — Overzicht met links naar alle mockups

## 🎯 Hoe werkt het?

### Stap 1: ViewDefinition bestand inlezen
Script leest MD bestand met wireframe-tabel:
```html
<table>
  <tr><th>Bron</th><th>Datum</th><th>Beschrijving</th>...</tr>
  <tr><td>NedapONS</td><td>26-8-2026</td><td>...</td>...</tr>
  ...
</table>
```

### Stap 2: HTML extraheren
- Alle `<table>` elementen worden geparst
- Kolomkoppen geidentificeerd
- Data-rijen verzameld
- Expandable rijen (verslagen) gedetecteerd

### Stap 3: Zorgviewer mockup genereren
```html
<!DOCTYPE html>
<html>
  <topbar> Patiënt info + gebruiker </topbar>
  <sidebar> Navigatiemenu </sidebar>
  <content>
    <panel>
      <table> Wireframe data </table>
    </panel>
  </content>
</html>
```

### Stap 4: PNG renderen (optioneel)
Playwright rendert HTML naar 1280×900px PNG in 2× DPI (retina)

## 🎨 Design System

Het script past automatisch toe:
- **Logo & topbar** — Zorgviewer styling
- **Sidebar** — Volledige navigatie
- **Patiënt-pills** — Naam, geboortedatum, BSN
- **Gebruiker-pill** — Ingelogde gebruiker
- **Panel header** — Titel + icoon + buttons
- **Tabel** — Wireframe data
- **Bron-monogrammen** — Gekleurde cirkels per bron
- **Kleurenpalet** — Teal #00838F, grijstinten
- **Typografie** — Open Sans

## 📁 Bestanden

```
skills/mockup-forge/
├── scripts/
│   ├── viewdefinition-to-html.py       ← Wireframe-converter
│   ├── batch-viewdefinition-mockups.py ← Batch processor
│   ├── generate-mockup.py              ← PNG renderer
│   └── excel-to-mockup.py              ← Excel converter
├── references/
│   ├── mode-e.md                       ← Modus E documentatie
│   ├── zorgviewer-design-system.md     ← Design system
│   └── mode-*.md                       ← Andere modi docs
└── SKILL.md                             ← Dit bestand
```

## 🔧 Technische Details

### Bron-detectie
Script herkent bronnen op naam en geeft juiste kleur:
- **NedapONS** → #1565C0 (blauw)
- **EPS** → #4A5568 (grijs)
- **Epic** → #C2410C (rood)
- **Nictiz** → #0E7490 (donkergroen)
- **LSP** → #0F766E (teal)

Configureerbaar in `get_bron_color()` functie.

### Expandable rijen
Script herkent verslagen/details:
```html
<!-- Data rij -->
<tr><td>▼</td><td>NedapONS</td><td>26-8-2026</td>...</tr>

<!-- Detail rij (automatisch gedetecteerd) -->
<tr><td colspan="8">
  <b>Verslag</b> Via ANW-zorg: ...
</td></tr>
```

### Column mapping
Alle kolommen uit wireframe:
- Bron → Monogram cirkel
- Datum → Tekst
- Beschrijving → Tekst
- Auteur → Tekst
- Specialisme → Tekst
- (MimeType) → Tekst
- (Type) → Tekst
- +Verslagen → Expandable detail

## 💡 Use cases

### 1. Wireframe review
Designer: "Hoe ziet dit scherm eruit in productie-styling?"
```
→ Draai viewdefinition-to-html.py
→ Open HTML in browser
→ Feedback op styling & layout
```

### 2. Client presentatie
PM: "Toon de mockups aan stakeholders"
```
→ Draai batch processor met --render-png
→ Exporteer PNG's
→ Inclusief in presentatie/wiki
```

### 3. UI/UX testing
Tester: "Test alle schermen op responsiveness"
```
→ Draai batch processor
→ Open index.html
→ Test elke mockup in browser
```

### 4. Documentatie
Tech writer: "Documenteer alle Zorgviewer schermen"
```
→ Draai batch processor met PNG export
→ Inclusief PNG's in docs
→ Link index.html
```

## 🐛 Troubleshooting

### Geen tabellen gevonden
**Probleem**: "Waarschuwing: Geen tabellen gevonden"

**Oorzaak**: MD bestand bevat geen `<table>` element

**Oplossing**:
1. Controleer of ViewDefinition-ui.md inderdaad een tabel bevat
2. Controleer bestandsnaam (moet `*-ui.md` zijn)
3. Bekijk het bestand in teksteditor

### PNG rendering faalt
**Probleem**: "PNG render failed"

**Oorzaak**: Node/Puppeteer niet beschikbaar

**Oplossing**:
```bash
# Test HTML eerst
python3 scripts/viewdefinition-to-html.py --input ... --output /tmp/test.html
open /tmp/test.html  # Controleer in browser
```

### Bron-kleur klopt niet
**Probleem**: Bron heeft verkeerde kleur

**Oorzaak**: Bronnaam niet in mapping

**Oplossing**: Voeg mapping toe in `viewdefinition-to-html.py`:
```python
def get_bron_color(bron_naam):
    colors = {
        'YourBron': '#YOURCOLOR',  # ← Toevoegen
        'NedapONS': '#1565C0',
        ...
    }
```

## 📈 Performance

| Operatie | Tijd | Notes |
|----------|------|-------|
| 1 HTML genereren | ~0.5s | Afhankelijk van tabel-grootte |
| 1 PNG renderen | ~5-8s | Afhankelijk van hardware |
| Alle 32 HTML | ~15s | Batch processor |
| Alle 32 PNG | ~2-3m | Kan parallel |

## 🚀 Toekomstige uitbreidingen

- [ ] Interactieve expand/collapse in HTML
- [ ] Filter/sort buttons in tabel
- [ ] Inline details viewer
- [ ] CSS animations
- [ ] Custom sidebars per viewdef
- [ ] Data-driven content (JSON input)
- [ ] API-based data fetching
- [ ] Real-time preview in VS Code

## 📚 Documentatie

- [Modus E Reference](./references/mode-e.md) — Volledige API docs
- [Design System](./references/zorgviewer-design-system.md) — Kleuren, fonts, components
- [Mode A-D Docs](./references/) — Andere modi

## 🔗 Verwante bestanden

- **ViewDefinition-*.md** — FHIR SQL-on-FHIR definities
- **ViewDefinition-*-ui.md** — Wireframe tabellen (INPUT voor Modus E)
- **output/mockups/** — Gegenereerde mockups (OUTPUT)

---

**Skill versie**: 2.0  
**Modus E toegevoegd**: November 2024  
**Status**: ✅ Production ready
