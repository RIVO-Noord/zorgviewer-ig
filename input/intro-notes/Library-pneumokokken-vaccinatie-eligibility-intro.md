CQL-bibliotheek die de eligibility-logica bevat voor het [pneumokokkenvaccinatie zorgpad](zorgpad-pneumokokken-vaccinatie.html).

### Gebruikte ValueSets

| ValueSet | Gebruik |
|---|---|
| [pneumokokken-risicoconditie](ValueSet-pneumokokken-risicoconditie.html) | Medische risicogroepen (groep 2) |
| [pneumokokken-vaccins](ValueSet-pneumokokken-vaccins.html) | Geregistreerde pneumokokkenvaccins |
| [pneumokokken-implantaat](ValueSet-pneumokokken-implantaat.html) | Cochleaire implantaten |

### Gedefinieerde expressies

| Expressie | Beschrijving |
|---|---|
| `Eligible` | Patiënt komt in aanmerking (groep 1 of 2, niet overleden) |
| `Groep 1 Eligible` | Leeftijd ≥ 60 jaar |
| `Groep 2 Eligible` | Actieve risicoconditie of cochleair implantaat |
| `Vaccinatie Aanbevolen` | Eligible én nooit gevaccineerd of interval verstreken |
| `Speciale Instructies Vereist` | Functionele asplenie — extra vaccinatieschema |
