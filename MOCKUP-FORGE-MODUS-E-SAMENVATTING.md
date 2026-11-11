# 🎨 Mockup-Forge Skill — Modus E Implementatie

## ✅ Wat is nu klaar?

De **mockup-forge skill** is uitgebreid met **Modus E** voor automatische conversie van ViewDefinition wireframes naar professionele Zorgviewer UI mockups.

### 🆕 Nieuwe Functionaliteiten

| Feature | Beschrijving |
|---------|-----------|
| **viewdefinition-to-html.py** | Converter: ViewDefinition-*-ui.md → HTML mockup |
| **batch-viewdefinition-mockups.py** | Batch processor: 32 bestanden tegelijk verwerken |
| **generate-mockup.py** | PNG renderer: HTML → high-res PNG (1280px, 2x DPI) |
| **mode-e.md** | Volledige API reference |
| **MODE-E-QUICKSTART.md** | Gebruikshandleiding met voorbeelden |
| **32 HTML mockups** | Gegenereerd in `/app/output/mockups/` |
| **index.html** | Overzichtspagina alle mockups |

## 🚀 Snel starten

### 1. Één ViewDefinition verwerken
```bash
python3 skills/mockup-forge/scripts/viewdefinition-to-html.py \
    --input /app/input/includes/ViewDefinition-Correspondentie-ui.md \
    --output /tmp/mockup.html
```

### 2. PNG renderen
```bash
python3 skills/mockup-forge/scripts/generate-mockup.py \
    --html /tmp/mockup.html \
    --output /tmp/mockup.png \
    --width 1280 --scale 2
```

### 3. Alle 32 bestanden verwerken
```bash
python3 skills/mockup-forge/scripts/batch-viewdefinition-mockups.py \
    --input-dir /app/input/includes \
    --output-dir /app/output/mockups \
    --render-png
```

## 📊 Voorbeelden

### Correspondentie & Verslagen
**Output**: `/app/mockup-correspondentie-wireframe.png`

Toont:
- ✅ Echte gegevens uit wireframe (NedapONS, datums, verslagteksten)
- ✅ Bron-monogrammen met juiste kleuren
- ✅ Expandable rijen voor verslagen
- ✅ Zorgviewer interface (topbar, sidebar, panel)

### Laboratoriumuitslagen
**Output**: `/app/mockup-laboratoriumuitslagen.png`

Toont:
- ✅ Laboratoriumwaarden uit wireframe
- ✅ Kolommen: Bron, Datum, Test, Testuitslag, Interpretatie, Order-/bovengrens, Materiaal, Status
- ✅ Bron-monogrammen (CG = CGM)
- ✅ Volledige Zorgviewer styling

## 📁 Bestanden

### Gegenereerde bestanden
```
skills/mockup-forge/
├── scripts/
│   ├── viewdefinition-to-html.py       [NIEUW]
│   ├── batch-viewdefinition-mockups.py [NIEUW]
│   └── generate-mockup.py              [BIJGEWERKT]
├── references/
│   └── mode-e.md                       [NIEUW]
├── MODE-E-QUICKSTART.md                [NIEUW]
└── SKILL.md                            [BIJGEWERKT]

output/mockups/
├── ViewDefinition-Correspondentie.html
├── ViewDefinition-LaboratoryTestResult.html
├── ViewDefinition-Behandelaanwijzingen.html
├── ViewDefinition-Medicatiegegevens.html
├── ... (32 totaal)
└── index.html

root/
├── mockup-correspondentie-wireframe.png [DEMO]
└── mockup-laboratoriumuitslagen.png     [DEMO]
```

## 🎯 Hoe werkt het?

### Input
Lees ViewDefinition wireframe tabel:
```html
<table>
  <tr><th>Bron</th><th>Datum</th><th>Beschrijving</th>...</tr>
  <tr><td>NedapONS</td><td>26-8-2026</td><td>Test voor...</td>...</tr>
</table>
```

### Processing
1. Parse HTML-tabel
2. Extract kolommen en rijen
3. Detecteer expandable rijen
4. Map bron-namen naar kleuren
5. Genereer volledige HTML mockup

### Output
Professionele mockup met:
- Zorgviewer topbar (logo, patiënt-pills)
- Navigatie sidebar
- Content panel met tabel
- Bron-monogrammen
- Expandable details

## 🎨 Design System

Automatisch toegepast:
- **Kleuren**: Teal (#00838F), grijstinten, bron-kleuren
- **Typografie**: Open Sans
- **Components**: Pills, monogrammen, panels
- **Spacing**: 16-24px
- **Borders**: 1px #E2E8F0
- **Shadows**: 0 1px 3px rgba(0,0,0,0.04)

## 📈 Statistieken

| Metric | Waarde |
|--------|--------|
| ViewDefinition bestanden | 32 |
| Gegenereerde HTML mockups | 32 |
| Gegenereerde PNG mockups | 2 (demo) |
| HTML per bestand | ~15-35 KB |
| PNG generatie | ~5-8s per mockup |
| Batch totaal | ~15s HTML + ~2-3m PNG |

## 🔗 Documenten

- **[MODE-E-QUICKSTART.md](./skills/mockup-forge/MODE-E-QUICKSTART.md)** — Gebruikshandleiding
- **[mode-e.md](./skills/mockup-forge/references/mode-e.md)** — API Reference
- **[SKILL.md](./skills/mockup-forge/SKILL.md)** — Skill overview

## 💡 Use Cases

1. **Wireframe-to-Mockup**: Designer → "Hoe ziet dit eruit in production styling?"
2. **Client presentatie**: PM → "Toon alle Zorgviewer schermen"
3. **UI testing**: QA → "Test responsiveness van alle views"
4. **Documentation**: Tech writer → "Documenteer alle schermen"
5. **Stakeholder review**: PM → "Sprint review mockups"

## 🚀 Volgende stappen

Optionele uitbreidingen:
- [ ] Interactieve expand/collapse
- [ ] Filter/sort buttons
- [ ] Inline detail viewers
- [ ] CSS animations
- [ ] Real-time preview
- [ ] API-based data fetching
- [ ] Custom theming per view
- [ ] Multi-language support

## 📞 Ondersteuning

Vragen? Zie:
- [MODE-E-QUICKSTART.md](./skills/mockup-forge/MODE-E-QUICKSTART.md) voor voorbeelden
- [mode-e.md](./skills/mockup-forge/references/mode-e.md) voor API docs
- [Troubleshooting](#troubleshooting) sectie in QUICKSTART
