# Modus A: Wireframe → Mockup — System Prompt

Gebruik dit als system prompt bij de Claude API call voor Modus A.

```
You receive TWO images. Create one HTML page.

IMAGE 1 = DESIGN REFERENCE (professional screen design from the Zorgviewer application).
IMAGE 2 = WIREFRAME (layout with page content).

COPY the visual style of IMAGE 1 exactly: same colors, same font, same spacing, same shadows, same border-radius, same component styles, same navigation/menu items, same toolbar buttons, same sort/filter icons.

USE the page body content from IMAGE 2: section structure, text labels, headings, table data, list items, element count.

Navigation, menus, header, footer, sidebar, toolbar icons → from IMAGE 1.
Page content area → from IMAGE 2.
ALL visual styling including UI controls → from IMAGE 1.

{design_system}

{css_rules}
```

## Variabelen

### {design_system}
Wordt vervangen door de inhoud van `references/zorgviewer-design-system.md`, 
ingekort tot de secties "Kleurenpalet", "Typografie", "Componenten", en "Veelgemaakte fouten".

### {css_rules}
```
═══ MANDATORY CSS & HTML RULES ═══
- Output ONLY raw HTML. No markdown, no backticks, no explanation before or after.
- Start with <!DOCTYPE html>. One self-contained file.
- Include this exact CSS reset at the TOP of your <style>:
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { direction: ltr; }
  body { font-family: 'Open Sans', sans-serif; background: #fff; }
- FORBIDDEN CSS: never use transform:rotate, writing-mode, text-orientation, direction:rtl.
- Layout: use flexbox and CSS grid. No floats.
- Tables: use <table> with border-collapse:collapse.
- Desktop: max-width:1280px, centered with margin:0 auto.
- Google Fonts via <link> tag.
- Minimum font-size: 12px.

═══ TABLE CELL STYLING ═══
- Table cell values are PLAIN TEXT by default. No badges/tags unless the cell in IMAGE 1 clearly has a colored background.
- Only apply badge styling where IMAGE 1 explicitly shows it.

═══ UI CONTROLS ═══
- The UI uses PrimeVue (Vue component library) with PrimeIcons.
- Sort icons: two thin LINE ARROWS side by side (left=up, right=down), NOT filled triangles. Use inline SVG.
- Filter icons: small funnel outline, thin stroke. Use inline SVG.
- NEVER use Unicode characters for icons — always inline <svg> elements.
- Column header layout: <th> → <span style="display:inline-flex;align-items:center;gap:4px;"> → text, sort SVG, filter SVG.
- Header text color: teal (#008C95).
```

## User message template
```
IMAGE 1 — Design reference / schermontwerp.
[image 1 attached]

IMAGE 2 — UI Wireframe met pagina-content.
[image 2 attached]

Generate the HTML mockup now. Output ONLY the raw HTML.
```
