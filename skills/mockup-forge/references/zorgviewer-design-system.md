# Zorgviewer Design System

Dit document beschrijft de ontwerpuitgangspunten voor Zorgviewer-mockups. De
ViewDefinition-converter (modus E) heeft op onderdelen een eigen implementatie;
die is hieronder expliciet aangegeven en niet overal pixel-exact.

## Technologie stack
- **Framework**: Vue 3
- **Component library**: PrimeVue (DataTable, Column, Button, etc.)
- **Icon library in modus E**: Google Material Icons Outlined, geladen via Google Fonts.
  De oudere beschrijvingen voor andere modi gebruiken nog PrimeIcons of SVG.
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
- **Detailrij-achtergrond in modus E**: `#F5F8FA`
- **Kolomheaders-rij achtergrond in modus E**: `#EFF6F7`

### Alert-iconen (zijbalk)
- **Alerts / Waarschuwingen** (waarschuwingsdriehoek): `#E69500` (oranje)
- **Allergieën / intoleranties** (hart met streep door): `#E53E3E` (rood)

### Bron-kolom — monogram-cirkels
Bron wordt **niet als badge of tekst** weergegeven, maar als gekleurde cirkel met afkorting van de bronnaam. In modus E is deze 32×32px, met border-radius 50%, witte tekst, font-weight 700 en font-size 10.8px. De afkorting bestaat uit maximaal twee hoofdletters uit de bronnaam, of de eerste twee tekens als er geen hoofdletters zijn.

| Bron      | Cirkelkleur | Tekst        |
|-----------|-------------|--------------|
| EPS       | `#4A5568`   | `EP`         |
| Nictiz    | `#0E7490`   | `N`          |
| Epic      | `#C2410C`   | `E`          |
| Chipsoft  | `#1565C0`   | `CS`         |
| Nexus     | `#6D28D9`   | `N`          |
| CGM       | `#1565C0`   | `CG`         |
| LSP       | `#0F766E`   | `LS`         |
| NedapONS  | `#1565C0`   | `NO`         |

Voor onbekende bronnen gebruikt modus E `#4A5568`.

### Status-pills (Actueel/Niet actueel)
- **Actueel**: achtergrond `#E0F7E9`, tekst `#1F7A3A`, border `#A6E0B8`, border-radius 14px
- **Niet actueel**: achtergrond `#F1F5F9`, tekst `#64748B`, border `#CBD5E1`, border-radius 14px

## Typografie
- Alle tekstgroottes zijn 90% van de eerdere waarden. Schaal iconen en
  layoutafmetingen niet mee; de hieronder genoemde tekstgroottes zijn al aangepast.
- **Familie**: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Body**: modus D 12.6px; modus E 90% van de standaardbrowsergrootte.
- **Componenttitel**: 15.3px, font-weight 600, color `#2D3748`
- **Kolomheaders**: 11.7px, font-weight 600, color `#00838F`
- **Tabeldata**: 12.6px, font-weight 400, color `#2D3748`
- **Sectielabel zijbalk**: modus D 12.6px; modus E 11.7px, font-weight 700, color `#006B73`
- **Sub-rij label** ("Lateraliteit"): 11.7px, font-weight 700, color `#2D3748`
- **Pill-label** ("BSN"): 11.7px, font-weight 600, color `#00838F`
- **Titel correspondentie-detailpaneel**: 13.5px; inhoud: 12.6px.

## Layout

### Globale structuur
- **Topbar** (hoofdbalk met logo + patiënt-pills + gebruiker, in modus E 56px hoog met 16px horizontale padding; witte achtergrond, onderrand 1px `#E2E8F0`). In modus D is de padding 8px 16px.
- **Sidebar** (260px breed, wit, rechter rand 1px `#E2E8F0`)
- **Content-area** (rest van breedte, achtergrond `#EFF6F7`; padding in modus E 16px, in modus D 24px)

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
- In modus E vullen het paneel en het tabelscrollgebied de beschikbare
  viewporthoogte tussen de topbar en de onderste contentmarge. De paneeltitel
  blijft buiten het scrollgebied staan en de kolomheaders zijn sticky.

### Paneelheader
- Achtergrond: **uniform `#EFF6F7`** (géén gradient naar wit)
- Padding: 12px 16px; ruimte tussen icoon en titel: 8px in modus E, 10px in modus D.
- Onderrand: 1px solid `#E2E8F0`
- Links: paneel-icoon (40×40px, border-radius 10px, border 2px solid `#00838F`, witte achtergrond, icoon in teal `#00838F`, grootte 22px) + paneeltitel-h2
- Rechts: alleen het refresh-icoon (circulaire pijl), outline-style, kleur `#00838F`, 20px.

## Componenten

### Kolomheaders
- Achtergrond: `#EFF6F7` (mintgroen — consistent met paneelheader)
- Tekst: teal `#00838F`, 11.7px, font-weight 600
- Padding: 14px 16px
- Bovenrand: 1px solid `#D6E5E7`
- Onderrand: 2px solid `#D6E5E7`
- In modus E staat bij iedere zichtbare datakolom:
  1. Kolomnaam
  2. **Sort-pair**: Material Icons `arrow_upward` en `arrow_downward`, grijs
     `#999`, 14px.
  3. **Filtericoon**: Material Icons `filter_alt` (trechter), grijs `#999`,
     16px, met `margin-left: 4px`.

De optionele icoonkolom krijgt geen sorteer- of filteraanduiding. De eerste
datakolom krijgt deze wel, ook wanneer de icoonkolom ontbreekt. Kolommen waarvan
de volledige naam tussen haakjes staat, worden niet getoond.

### Detailicoon en detailrijen in modus E
- Een hoofdrij toont alleen een icoon als de direct volgende detailrij zichtbare
  inhoud bevat. Lege detailrijen worden niet weergegeven.
- De gegenereerde mockup toont inhoudelijke details standaard open met het
  Material Icons-icoon `expand_more` (gecentreerd, kleur `#00838F`). Rijen zonder details hebben een lege
  icooncel; de generator biedt momenteel geen interactieve in- of uitklapfunctie.
- De icoonkolom ontbreekt helemaal als geen enkele rij inhoudelijke details heeft.
- Hoofd- en detailrij blijven bij elkaar. De detailrij heeft een lege cel onder
  de icoonkolom en de inhoud begint op dezelfde horizontale positie als de eerste
  datakolom. De inhoud beslaat de overige zichtbare kolommen, heeft achtergrond
  `#F5F8FA` en behoudt `<b>`-opmaak en `<br/>`-regels uit het wireframe.
- Correspondentie heeft altijd een andere weergave: geen icoonkolom of inline
  detailrij, maar een detailpaneel rechts.

### Tabelrijen
- Achtergrond: `#FFFFFF` (geen zebra-striping)
- Padding cell: 14px 16px
- Onderrand: 1px solid `#E8ECF0` (subtiel, iets lichter)
- Vertical-align: middle
- **Detailrijen in modus E**: achtergrond `#F5F8FA`; binnenruimte 16px verticaal;
  horizontaal dezelfde celpadding als de datakolom;
  vetgedrukte tekst en `<br/>`-regelafbrekingen uit de wireframe blijven behouden.

### Correspondentie: detailpaneel rechts (modus E)
- Alleen `ViewDefinition-Correspondentie-ui.md` gebruikt dit paneel naast de tabel.
  Het paneel is minimaal 200px breed en neemt anders 30% van de beschikbare breedte.
- Alleen de details van de geselecteerde rij worden getoond; de eerste rij is
  standaard geselecteerd. Selectie met de muis of Enter/spatie werkt de inhoud
  en de titel bij. De geselecteerde rij heeft achtergrond `#ECF6F7`.
- De titel bestaat uit **bron · datum · beschrijving** van de geselecteerde rij.
  Lege velden worden weggelaten; als alle velden leeg zijn, is de titel `Details`.
  Als de geselecteerde rij geen details heeft, toont het paneel een melding.
- Tabel en detailpaneel scrollen afzonderlijk; de paneeltitel en kolomheaders
  blijven tijdens het scrollen van de tabel zichtbaar.

### LEGE CELLEN — KRITISCH
- **GEEN liggend streepje (—) of placeholder bij ontbrekende waarden.**
- Lege cel = leeg `<td></td>` — niets weergeven.
- Géén `class="muted"` met dash, géén "N.v.t.", géén "-".

### Sub-rijen in andere mockupmodi (Lateraliteit, extra info onder hoofdrij)
Deze richtlijnen beschrijven niet de detailrijen die de ViewDefinition-converter
in modus E genereert; zie hiervoor **Detailicoon en detailrijen in modus E**.

Bij een uitgeklapte hoofdrij komen één of meer sub-rijen `<tr class="sub">`:
- Achtergrond: `#FFFFFF` (wit — net als de hoofdrijen, GEEN aparte kleur)
- Eerste cel leeg (uitgelijnd onder de chevron)
- Tweede cel met `colspan="N"`: `<span class="sub-label">Label</span><span class="sub-value">Value</span>`
- Sub-label: font-weight 700, kleur `#2D3748`, 11.7px
- Sub-value: kleur `#2D3748`, 11.7px

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
- Tekst: 12.6px, kleur `#2D3748`
- **Actief item** (`is-active`):
  - Achtergrond: `#ECF6F7`
  - Tekst: `#2D3748` (donkergrijs, niet teal)
  - Font-weight: 500
  - Icoon kleur: `#00838F`
  - **GEEN linker-balk/border**
- **Disabled item** (`is-disabled`): tekst en icoon in `#B0B7C3` (bijv. Vaccinaties en Vitale gegevens kunnen disabled zijn als de data leeg is)

### Sectielabels in zijbalk
- "Overzicht", "Gegevens" etc.
- Padding: 12px 20px 4px in modus D; in modus E 0 16px met 6px ondermarge.
- Font-size: 12.6px (modus D) of 11.7px (modus E), font-weight: 700
- Kleur: `#006B73`

### Help & Info footer
- Boven gescheiden door 1px topborder `#E2E8F0`
- Padding: 10px 0
- Links: "Help & Info" als menu-item met (i)-cirkel-icoon
- Rechts: collapse-knop in teal `#00838F` met dubbele chevron-left `«` icoon

## Iconenset

In modus E worden Google Material Icons Outlined gebruikt voor de topbar,
zijbalk, paneelheader en tabel. Voorbeelden: `timeline`, `description`,
`refresh`, `expand_more` en `filter_alt`. De iconen zijn visueel en de
sorteer-, filter- en refreshiconen zijn in de mockup niet interactief.
Het laden van de iconen vereist toegang tot Google Fonts.

De onderstaande SVG-concepten beschrijven de oudere mockupmodi.

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
1. ❌ Verkeerde Unicode-symbolen als filtericoon → ✅ In modus E Material Icons `filter_alt` gebruiken.
2. ❌ Sorteren en filteren in de icoonkolom tonen → ✅ Alleen in headers van zichtbare datakolommen.
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
15. ❌ In modus E lege details als inhoudelijke detailrij tonen → ✅ Lege details en, indien geen enkele rij details heeft, de icoonkolom weglaten.
16. ❌ In modus E correspondentie-details onder iedere rij plaatsen → ✅ Alleen details van de geselecteerde rij in het rechterpaneel tonen.
