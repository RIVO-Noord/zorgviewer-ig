{% include profile-note.md %}

### Zorginformatiebouwstenen

De volgende zibs vallen min of meer onder het thema middelengebruik.

- [ZIB Alcoholgebruik](https://zibs.nl/wiki/AlcoholGebruik-v3.1(2017NL))
- [ZIB Drugsgebruik](https://zibs.nl/wiki/DrugsGebruik-v3.2(2017NL))
- [ZIB Tabakgebruik](https://zibs.nl/wiki/TabakGebruik-v3.1(2017NL))

### View Definition

[ViewDefinition voor middelengebruik](ViewDefinition-Middelengebruik.json)

{% include ViewDefinition-Middelengebruik-ui.md %}

{% include ViewDefinition-Middelengebruik.md %}

### Request

N.B. Epic gebruikt de categorie 'social-history' en Sanday/CGM gebruikt 'vital-signs' voor het middelengebruik. Bij deze algemene queries komen altijd teveel gegevens terug.

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