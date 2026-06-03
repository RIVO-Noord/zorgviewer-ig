# Modus D: Excel → Mockup — Workflow

Gebruik deze modus wanneer de gebruiker een `.xlsx`-bestand uploadt met een tabel en daar een mockup van wil. Anders dan modi A/B/C is hier **geen API-call nodig** — alles wordt door een Python-script gedaan dat de design-systeemregels volgt.

## Wanneer triggeren

- Gebruiker uploadt een `.xlsx`-bestand
- Gebruiker schrijft "mockup van deze tabel" / "maak een mockup van dit Excel-bestand"
- Slash-command `/mockup D <file.xlsx>`

## Verwachte xlsx-structuur

```
| Sheet-naam = paneeltitel (bv. "Medische hulpmiddelen")        |
|---------------------------------------------------------------|
| Eerste rij met ≥ 3 gevulde cellen = kolomheaders              |
| Daaropvolgende rijen = data                                   |
| Sub-rijen: rij waarbij alleen kolom A + B gevuld zijn         |
|   en kolom A een sub-label is (Lateraliteit, Details, etc.)   |
```

Sub-rij-labels die automatisch worden herkend: `Lateraliteit`, `Lateralisatie`, `Details`, `Toelichting`, `Extra` (case-insensitive). Andere labels kunnen worden toegevoegd in `excel-to-mockup.py` onder `SUB_ROW_LABELS`.

Symbool-kolommen aan het begin (zoals `>`, `<`, `+`) worden automatisch genegeerd.

## Stappen

### Stap 1: lokaliseer het bestand
Het xlsx-bestand staat typisch in de map die door de gebruiker is opgegeven of in de uploads-folder van de sessie.

### Stap 2: draai het script

```bash
python3 scripts/excel-to-mockup.py \
    --input <pad/naar/tabel.xlsx> \
    --output <pad/naar/output.html> \
    --render-png
```

Het script doet alles:
- Parse de xlsx (titel, kolommen, rijen, sub-rijen)
- Genereer volledig opgemaakte HTML conform `references/zorgviewer-design-system.md`
- Render naar PNG via weasyprint + pdftoppm

### Stap 3: review
Toon het resultaat aan de gebruiker. Verwijs naar zowel PNG als HTML met `computer://` links.

## Design-systeemregels automatisch toegepast

Het script `excel-to-mockup.py` heeft de volgende regels uit `zorgviewer-design-system.md` ingebakken:

- **Topbar** met logo + patiënt-pills + gebruikerschip
- **Sidebar** met `Overzicht`-sectie (Tijdlijn) + `Gegevens`-sectie (volledige menu) + `Help & Info`-footer met collapse-knop
- **Vaccinaties** en **Vitale gegevens** standaard `is-disabled`
- **Actief menu-item** = matched met de paneeltitel (case-insensitive)
- **Kleuren**: teal `#00838F`, mint-bg `#EFF6F7`, mint-actief `#ECF6F7`, sectielabel `#006B73`
- **Kolomheaders**: PrimeIcons `pi-arrow-up` + `pi-arrow-down` (tight 1px gap) + `pi-filter`
- **Bron-kolom**: monogram-cirkels per bron (EPS, Nictiz, Epic, Chipsoft, Nexus, CGM, met fallback voor onbekende bronnen)
- **Lege cellen**: blijven écht leeg (géén em-dash)
- **Chevron**: pijl-rechts `>` voor ingeklapte rijen, pijl-omlaag `∨` voor rijen die door een sub-rij worden gevolgd
- **Sub-rijen**: `<tr class="sub">` met `#F8FAFB` achtergrond, label + value styling
- **Paneel-icoon**: automatisch matched per scherm (medische hulpmiddelen → koffertje, problemen → klembord-hart, etc.) — voor onbekende schermen een generiek tabel-icoon
- **Naming**: titel zoals in de sheet-naam staat (gebruiker is verantwoordelijk voor consistentie met de naming-conventie)

## Dependencies

```bash
pip install openpyxl
pip install weasyprint    # alleen nodig voor --render-png
# pdftoppm via apt: apt-get install poppler-utils
```

## Veelvoorkomende issues

- **"Kon geen header-rij vinden"** → de xlsx mist een rij met 3+ gevulde cellen. Vul de tabel aan of voeg een header-rij toe.
- **Bron-monogram niet gerenderd** → controleer of de kolomnaam exact "Bron" is (case-insensitive). Andere namen worden als normale tekstkolom behandeld.
- **PNG-render mislukt** → controleer of weasyprint en pdftoppm beschikbaar zijn. HTML is in dat geval wel gegenereerd.

## Toekomstige uitbreidingen (placeholder)

- **Mode E**: prompt-based modificatie van bestaande mockup (bv. "voeg een uitklap toe aan rij 3 met dit label en deze waarde")
- **Mode F**: combinatie van xlsx + wireframe-screenshot voor hybride content
