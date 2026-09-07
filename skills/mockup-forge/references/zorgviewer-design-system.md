# Zorgviewer Design System

Dit document beschrijft het exacte visuele ontwerpsysteem van de Zorgviewer applicatie.
Elke mockup moet dit systeem pixel-exact volgen.

## Technologie stack
- **Framework**: Vue 3
- **Component library**: PrimeVue (DataTable, Column, Button, etc.)
- **Icon library**: PrimeIcons (pi-arrow-up, pi-arrow-down, pi-filter, pi-refresh, pi-plus, etc.)
- **Font**: Google Fonts "Open Sans"
- **Layout**: CSS Grid + Flexbox

## Kleurenpalet

### Primaire kleuren (teal-spectrum)
- **Teal primair** (logo, paneel-icoon, kolomheader-tekst, accenticonen): `#00838F`
- **Teal donker** (sectielabels in zijbalk zoals "Overzicht", "Gegevens"): `#006B73`
- **Mint zacht / actief item achtergrond** (actief menu-item): `#ECF6F7`
- **Mint achtergrond** (content-area en paneelheader-achtergrond): `#EFF6F7`
- **Mint rand** (rand om pills in topbar): `#D6E5E7`

### Neutrale kleuren
- **Achtergrond pagina/sidebar/paneel/tabel**: `#FFFFFF`
- **Tekst primair** (data in rijen, paneeltitel, menu-items): `#2D3748`
- **Tekst muted** (alleen voor uitgeschakelde/grijze status): `#A0AEC0`
- **Tekst disabled** (uitgeschakelde menu-items): `#B0B7C3`
- **Rijscheiding / kader**: `#E2E8F0` (1px subtiele lijn)
- **Sub-rij achtergrond** (Lateraliteit, extra info onder hoofdrij): `#FFFFFF` (wit — net als de hoofdrijen)
- **Kolomheaders-rij achtergrond** (de strip met "Bron", "Datum" etc.): `#F1F5F9` (lichtgrijs — duidelijk onderscheidbaar van de witte hoofdrijen)

### Alert-iconen (zijbalk)
- **Alerts / Waarschuwingen** (waarschuwingsdriehoek): `#E69500` (oranje)
- **Allergieën / intoleranties** (hart met streep door): `#E53E3E` (rood)

### Bron-kolom — monogram-cirkels
Bron wordt **niet als badge of tekst** weergegeven, maar als gekleurde cirkel met afkorting van de bronnaam (28×28px, border-radius 50%, witte tekst, font-weight 700, font-size 11px).

| Bron      | Cirkelkleur | Tekst        |
|-----------|-------------|--------------|
| EPS       | `#4A5568`   | `EPS`        |
| Nictiz    | `#0E7490`   | `N`          |
| Epic      | `#C2410C`   | `E`          |
| Chipsoft  | `#1565C0`   | `CS`         |
| Nexus     | `#6D28D9`   | `N`          |
| CGM       | `#1565C0`   | `CGM`        |
| LSP       | `#0F766E`   | `LSP`        |

Voor onbekende bronnen: kies een passende kleurvariant uit dit palet.

### Status-pills (Actueel/Niet actueel)
- **Actueel**: achtergrond `#E0F7E9`, tekst `#1F7A3A`, border `#A6E0B8`, border-radius 14px
- **Niet actueel**: achtergrond `#F1F5F9`, tekst `#64748B`, border `#CBD5E1`, border-radius 14px

## Typografie
- **Familie**: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Body**: 14px / line-height 1.4 / color `#2D3748`
- **Componenttitel** (paneel-h2): 17px, font-weight 600, color `#2D3748`
- **Kolomheaders**: 13px, font-weight 600, color `#00838F`
- **Tabeldata**: 14px, font-weight 400, color `#2D3748`
- **Sectielabel zijbalk**: 14px, font-weight 700, color `#006B73`
- **Sub-rij label** ("Lateraliteit"): 13px, font-weight 700, color `#2D3748`
- **Pill-label** ("BSN"): 13px, font-weight 600, color `#00838F`

## Layout

### Globale structuur
- **Topbar** (hoofdbalk met logo + patiënt-pills + gebruiker, hoogte ~64px, witte achtergrond, onderrand 1px `#E2E8F0`)
- **Sidebar** (260px breed, wit, rechter rand 1px `#E2E8F0`)
- **Content-area** (rest van breedte, achtergrond `#EFF6F7`, padding 24px)

### Sidebar-structuur
De zijbalk heeft twee delen:
1. **`.sidebar-nav`** (scrollbaar deel met menu-items)
   - Sectie **"Overzicht"** met daaronder: Tijdlijn
   - Sectie **"Gegevens"** met daaronder alle data-items (Correspondentie, Problemen, Verrichtingen, Behandelaanwijzingen, Wilsverklaringen, Laboratoriumuitslagen, Alerts, Allergieën, Medicatie, Medische hulpmiddelen, Vaccinaties, Vitale gegevens, Patiëntcontext, Voeding en vocht)
2. **`.sidebar-footer`** (onderaan, gescheiden door 1px topborder)
   - "Help & Info" met (i)-icoon
   - Rechts: collapse-knop met dubbele chevron `«`

### Topbar pills
Patiënt-info wordt getoond als drie pills (wit, border 1px `#D6E5E7`, border-radius 8px, padding 8px 14px):
1. Patiëntnaam met persoon-icoon
2. Geboortedatum + leeftijd met kalender-icoon
3. BSN (label "BSN" in teal `#00838F`, daarna nummer in donkergrijs)
Gebruikerschip rechtsboven heeft dezelfde stijl met badge-icoon.

### Paneel
- Background: `#FFFFFF`
- Border: 1px solid `#E2E8F0`
- Border-radius: 8px
- Box-shadow: 0 1px 3px rgba(0,0,0,0.04)
- `overflow: hidden`

### Paneelheader
- Achtergrond: **uniform `#EFF6F7`** (géén gradient naar wit)
- Padding: 16px 20px
- Onderrand: 1px solid `#E2E8F0`
- Links: paneel-icoon (40×40px, border-radius 10px, border 2px solid `#00838F`, witte achtergrond, icoon in teal `#00838F`, grootte 22px) + paneeltitel-h2
- Rechts: filter (trechter) + refresh (circulaire pijl), beide outline-style, kleur `#00838F`, 20px

## Componenten

### Kolomheaders (PrimeVue DataTable)
- Achtergrond: `#F1F5F9` (lichtgrijs — niet wit, niet mint)
- Tekst: teal `#00838F`, 13px, font-weight 600
- Padding: 12px 16px
- Onderrand: 1px solid `#E2E8F0`
- Structuur per header (inline-flex, `gap: 8px`):
  1. Kolomnaam
  2. **Sort-pair** (inline-flex, `gap: 1px`):
     - `pi-arrow-up` (omhoog-pijl, 11×13px, stroke `currentColor`, opacity 0.55)
     - `pi-arrow-down` (omlaag-pijl, 11×13px, opacity 0.55)
  3. `pi-filter` (trechter, 12×12px, opacity 0.55, `margin-left: 4px` extra ruimte)

```svg
<!-- pi-arrow-up -->
<svg width="11" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2V12M3 6L7 2L11 6"/></svg>

<!-- pi-arrow-down -->
<svg width="11" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12V2M3 8L7 12L11 8"/></svg>

<!-- pi-filter -->
<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 2H12.5L8 7.5V11L6 12V7.5Z"/></svg>
```

Belangrijk: de up en down arrows staan vrijwel tegen elkaar (1px gap), dan komt een grotere ruimte, dan de funnel.

### Expand/collapse chevron (linkerkolom rijen)
- Ingeklapt: chevron-right `<polyline points="9 6 15 12 9 18"/>` (>)
- Uitgeklapt: chevron-down `<polyline points="6 9 12 15 18 9"/>` (∨)
- Kleur: `#00838F`
- Grootte: 18px, stroke-width 2.4

### Tabelrijen
- Achtergrond: `#FFFFFF` (geen zebra-striping)
- Padding cell: 14px 16px
- Onderrand: 1px solid `#E2E8F0`
- Vertical-align: middle

### LEGE CELLEN — KRITISCH
- **GEEN liggend streepje (—) of placeholder bij ontbrekende waarden.**
- Lege cel = leeg `<td></td>` — niets weergeven.
- Géén `class="muted"` met dash, géén "N.v.t.", géén "-".

### Sub-rijen (Lateraliteit, extra info onder hoofdrij)
Bij een uitgeklapte hoofdrij komen één of meer sub-rijen `<tr class="sub">`:
- Achtergrond: `#FFFFFF` (wit — net als de hoofdrijen, GEEN aparte kleur)
- Eerste cel leeg (uitgelijnd onder de chevron)
- Tweede cel met `colspan="N"`: `<span class="sub-label">Label</span><span class="sub-value">Value</span>`
- Sub-label: font-weight 700, kleur `#2D3748`, 13px
- Sub-value: kleur `#2D3748`, 13px

**KRITISCH — sub-rijen vormen één visueel blok:**
- **GEEN border-bottom op interne sub-rijen** (anders krijg je hinderlijke lijntjes in het uitklapveld)
- Alleen de LAATSTE sub-rij van een opvolgende groep krijgt `border-bottom: 1px solid #E2E8F0`
- Markeer de eerste/laatste in het rendering met klassen `sub-first` / `sub-last` voor extra padding
- Padding intern: `6px 16px`. Eerste sub-rij: `padding-top: 12px`. Laatste: `padding-bottom: 12px`
- Gebruik specifieke selector `table.dt tbody tr.sub td` met `border-bottom: none !important` om de algemene tbody-td-border te overrulen

**Speciale geval — sub-rij met label "Bron":**
- Toon ALLEEN het monogram-cirkeltje, geen "Bron"-tekst-label ervoor
- Voorbeeld: `<tr class="sub sub-first"><td></td><td colspan="N"><span class="src-ic src-lsp">LSP</span></td></tr>`

### Bron-kolom rendering
- Géén tekst, géén badge — alleen de gekleurde monogram-cirkel (zie tabel hierboven)
- Padding-left van de td: 16px

### Menu-items in zijbalk
- Padding: 10px 20px
- Gap tussen icoon en label: 12px
- Icoon: 18px, kleur `#4A5568`
- Tekst: 14px, kleur `#2D3748`
- **Actief item** (`is-active`):
  - Achtergrond: `#ECF6F7`
  - Tekst: `#2D3748` (donkergrijs, niet teal)
  - Font-weight: 500
  - Icoon kleur: `#00838F`
  - **GEEN linker-balk/border**
- **Disabled item** (`is-disabled`): tekst en icoon in `#B0B7C3` (bijv. Vaccinaties en Vitale gegevens kunnen disabled zijn als de data leeg is)

### Sectielabels in zijbalk
- "Overzicht", "Gegevens" etc.
- Padding: 16px 20px 6px
- Font-size: 14px, font-weight: 700
- Kleur: `#006B73`

### Help & Info footer
- Boven gescheiden door 1px topborder `#E2E8F0`
- Padding: 10px 0
- Links: "Help & Info" als menu-item met (i)-cirkel-icoon
- Rechts: collapse-knop in teal `#00838F` met dubbele chevron-left `«` icoon

## Iconenset (zijbalk-iconen, allemaal line-art SVG, kleur `currentColor`, stroke-width 2)

| Menu-item | SVG-concept |
|---|---|
| Tijdlijn | trending-up grafiek (polyline omhoog) |
| Correspondentie en SOEP-verslagen | document met gevouwen hoek |
| Problemen (incl. diagnoses) | klembord met hart binnenin |
| Verrichtingen | scalpel / penseel |
| Behandelaanwijzingen | hospitaal-bed |
| Wilsverklaringen | document met checkmark |
| Laboratoriumuitslagen | erlenmeyer flask |
| Alerts / Waarschuwingen | driehoek met `!` (kleur `#E69500`) |
| Allergieën en intoleranties | hart met diagonale streep (kleur `#E53E3E`) |
| Medicatie | horizontale capsule (rect met split-lijn) |
| **Medische hulpmiddelen** | **medisch koffertje met handvat BOVEN en kruis in midden** (zie SVG hieronder) |
| Vaccinaties | injectiespuit diagonaal |
| Vitale gegevens | hartslag/ECG-lijn (polyline) |
| Patiëntcontext | groepje mensen (twee cirkels + lichaam) |
| Voeding en vocht | vork + lepel naast elkaar |

### Specifiek: icoon Medische hulpmiddelen (medisch koffertje)
Handvat boven, kruis (+) in het midden. Gebruik exact deze SVG:
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6"/>
  <rect x="3" y="6" width="18" height="14" rx="2"/>
  <line x1="12" y1="10" x2="12" y2="17"/>
  <line x1="8.5" y1="13.5" x2="15.5" y2="13.5"/>
</svg>
```

## Naming-conventies
- Schermnamen in zijbalk en paneeltitel: **eerste woord met hoofdletter, rest lowercase, meervoud waar van toepassing**
  - ✅ "Medische hulpmiddelen", "Problemen (incl. diagnoses)", "Vitale gegevens"
  - ❌ "Medisch Hulpmiddel", "Medische Hulpmiddelen", "Medisch hulpmiddel"

## Viewport en font-loading
- Desktop-render: 1440px breed
- Sidebar: 260px vast
- Content: flexibel
- Open Sans laden via Google Fonts `<link>` tag (preconnect aanbevolen)

## Veelgemaakte fouten (vermijd deze!)
1. ❌ Gevulde driehoekjes of Unicode-pijlen (↑↓▽) → ✅ Inline SVG met pi-arrow-up + pi-arrow-down + pi-filter
2. ❌ `gap: 6px` of meer tussen sort-arrows → ✅ `gap: 1px` voor sort-pair, extra `margin-left: 4px` voor filter
3. ❌ Em-dash (—) in lege cellen → ✅ Volledig lege `<td></td>`
4. ❌ Teal `#008C95` (te groen) → ✅ Teal `#00838F` (juiste cyan-tint)
5. ❌ Gradient in paneelheader → ✅ Uniform `#EFF6F7`
6. ❌ Actief menu-item met linkerbalk + teal tekst → ✅ Géén balk, donkergrijze tekst, alleen icoon-kleur teal
7. ❌ Bron-kolom als tekst of badge → ✅ Gekleurde monogram-cirkel
8. ❌ Sectielabel in zelfde teal als rest → ✅ Donker petrol `#006B73`
9. ❌ Geen Overzicht-sectie of Help & Info-footer in zijbalk → ✅ Beide opnemen
10. ❌ CSS transform/rotate → ✅ Alle tekst horizontaal LTR
11. ❌ Content overnemen van schermontwerp in modus A → ✅ Content alleen uit wireframe
12. ❌ Schermnaam met onnodige hoofdletters ("Hulpmiddelen") → ✅ "hulpmiddelen" lowercase (alleen eerste woord met hoofdletter)
13. ❌ Border-bottom op elke sub-rij waardoor lijntjes in het uitklapveld verschijnen → ✅ Alleen op `sub-last` met `!important` om generieke td-border te overrulen
14. ❌ Sub-rij "Bron: X" tonen als "Bron <icoon>" → ✅ Alleen het monogram-cirkeltje (de cirkelkleur geeft al aan dat het bron is)
15. ❌ Kolomheaders-rij wit + sub-rijen mintkleurig → ✅ Andersom: kolomheaders lichtgrijs `#F1F5F9`, hoofdrijen + sub-rijen beide wit `#FFFFFF` (visuele scheiding via padding en `sub-last` border)
