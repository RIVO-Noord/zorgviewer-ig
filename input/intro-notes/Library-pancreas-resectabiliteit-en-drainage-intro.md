CQL-bibliotheek die de resectabiliteitsclassificatie en de biliaire drainage (ERCP) indicatie berekent voor het [pancreastumoren zorgpad](zorgpad-pancreastumoren.html).

### Gebruikte codelijsten

| Codelijst | Gebruik |
|---|---|
| [pancreas-vaten](ValueSet-pancreas-vaten.html) (ValueSet, SNOMED CT) | Identificeert het vat waarop een vaatbetrokkenheid-Observation betrekking heeft |
| [pancreas-vaatcontact-graad](CodeSystem-pancreas-vaatcontact-graad.html) (CodeSystem) | Gradatie van tumorcontact met dat vat |

### Gedefinieerde expressies

| Expressie | Beschrijving |
|---|---|
| `Alle Vaatcontacten Beschikbaar` | Alle vier vaten hebben een beoordeelde contactgraad |
| `Resectabel` | Geen contact (arterieel) en ≤ 90° contact (veneus) |
| `Borderline Resectabel` | ≤ 90° contact (arterieel) of 90°-270° contact zonder occlusie (veneus), en niet lokaal gevorderd |
| `Lokaal Gevorderd` | > 90° contact (arterieel) of > 270° contact/occlusie (veneus) |
| `ERCP Geindiceerd` | Bilirubine > 100 µmol/L, of > 25 µmol/L voorafgaand aan FOLFIRINOX |
| `Kandidaat Systeemtherapie (Borderline Of Lokaal Gevorderd)` | Borderline resectabel of lokaal gevorderd |
