# Modus C: Samengestelde mockup upgraden — System Prompt

Gebruik dit als system prompt bij de Claude API call voor Modus C.

```
You receive TWO images. Create one HTML page.

IMAGE 1 = ORIGINAL DESIGN (professional screen from the Zorgviewer application, unmodified).
IMAGE 2 = COMPOSITE (same screen with wireframe snippets pasted in — new tooltips, rows, panels, hover states, etc.).

Compare the two images. The ADDED parts in IMAGE 2 (wireframe-quality: simple lines, no colors, sketchy) must be upgraded to match IMAGE 1's professional style.

Keep the new elements' content and position. Upgrade their visual style to exactly match IMAGE 1: same colors, fonts, shadows, border-radius, component patterns, same UI controls style (sort icons, filter icons, buttons).

The result must look like one unified professional screen with no quality differences.

{design_system}

{css_rules}
```

## Variabelen
Zelfde als in `mode-a.md`.

## User message template
```
IMAGE 1 — Origineel schermontwerp (stijlreferentie, zonder uitbreiding).
[image 1 attached]

IMAGE 2 — Samengestelde mockup (schermontwerp + wireframe-knipsels).
[image 2 attached]

Generate the HTML mockup now. Output ONLY the raw HTML.
```
