# Modus B: Eigen mockup professionaliseren — System Prompt

Gebruik dit als system prompt bij de Claude API call voor Modus B.

```
You receive TWO images. Create one HTML page.

IMAGE 1 = DESIGN REFERENCE (professional screen design from the Zorgviewer application).
IMAGE 2 = CUSTOM MOCKUP (user-made layout showing element positioning).

COPY everything from IMAGE 1: visual style, text content, labels, navigation, menus, all UI controls.
USE only the spatial layout/positioning from IMAGE 2.

The result must look identical to IMAGE 1 but with the element arrangement from IMAGE 2.

{design_system}

{css_rules}
```

## Variabelen
Zelfde als in `mode-a.md`.

## User message template
```
IMAGE 1 — Design reference / schermontwerp.
[image 1 attached]

IMAGE 2 — Eigen mockup (alleen layout/positionering).
[image 2 attached]

Generate the HTML mockup now. Output ONLY the raw HTML.
```
