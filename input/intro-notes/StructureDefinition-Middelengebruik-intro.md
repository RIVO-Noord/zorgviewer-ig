{% include profile-note.md %}

### Zorginformatiebouwstenen

De volgende zibs vallen onder het thema middelengebruik.

- [ZIB Alcoholgebruik](https://zibs.nl/wiki/AlcoholGebruik-v3.1(2017NL)) - BgZ[^1]
- [ZIB Drugsgebruik](https://zibs.nl/wiki/DrugsGebruik-v3.2(2017NL)) - BgZ[^1]
- [ZIB Tabakgebruik](https://zibs.nl/wiki/TabakGebruik-v3.1(2017NL)) - BgZ[^1]
- [ZIB AlgemeneMeting](https://www.zibs.nl/wiki/AlgemeneMeting-v3.0(2017NL)) - Huisartsgegevens[^2]

[^1]: [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
[^2]: [Huisartsgegevens](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data)

### View Definition

[ViewDefinition voor middelengebruik](ViewDefinition-Middelengebruik.json)

{% include ViewDefinition-Middelengebruik-ui.md %}

{% include ViewDefinition-Middelengebruik.md %}

### Zoeken naar codes

* [NHG Tabel 45 Diagnostische Bepalingen Diagnostisch](https://bepalingen.nhg.org/labcodes/determinations?q%5Bapplication_kind_cont%5D=D) `system=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen`

### Request

N.B. BgZ gebruikt de categorie 'social-history' en HIS'en gebruiken 'vital-signs' voor het middelengebruik. Bij deze algemene queries komen altijd teveel gegevens terug.

1. Opvragen (search) middelengebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=social-history`

1. Opvragen (search) middelengebruik (huisartsgegevens)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=vital-signs`

1. Opvragen (search) alcoholgebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|228273003`

1. Opvragen (search) alcoholgebruik (huisartsgegevens). HIS'en includeren ook de FiveShot vragenlijst antwoorden. Let op dat de komma-notatie van codes niet altijd wordt ondersteund.

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|1591,https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|2418,https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|2419,https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|2420,https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|2421,https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|2422`

1. **CGM:** Opvragen (search) alcoholgebruik. CGM slaat alcoholgebruik op zonder SNOMED-CT code; gebruik NHG Tabel 45 code 1591.

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|1591`

1. Opvragen (search) drugsgebruik (Epic/CGM)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|228366006`

1. Opvragen (search) drugsgebruik (Sanday/CGM)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|3022`

1. Opvragen (search) tabakgebruik (Epic/CGM)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|365980008`

1. Opvragen (search) tabakgebruik (Sanday/CGM)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|1739`

{% include bronsysteem-herkennen.md %}
