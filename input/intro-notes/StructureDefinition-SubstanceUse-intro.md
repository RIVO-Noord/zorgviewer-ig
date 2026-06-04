{% include profile-note.md %}

### Zorginformatiebouwstenen

De volgende zibs vallen min of meer onder het thema middelengebruik.

[ZIB Alcoholgebruik](https://zibs.nl/wiki/AlcoholGebruik-v3.1(2017NL))
[ZIB Drugsgebruik](https://zibs.nl/wiki/DrugsGebruik-v3.2(2017NL))
[ZIB Tabakgebruik](https://zibs.nl/wiki/TabakGebruik-v3.1(2017NL))

### View Definition

[ViewDefinition voor middelengebruik](ViewDefinition-Middelengebruik.json)

{% include ViewDefinition-Middelengebruik-ui.md %}

{% include ViewDefinition-Middelengebruik.md %}

### Request

N.B. Bij een request met 'category=social-history' komen er ook andere obervaties mee dan alleen het middelengebruik. Daarom is het algemene request simpelweg de optelling van de afzonderlijke requests. 

1. Opvragen (search) middelengebruik

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|228273003,http://snomed.info/sct|228366006,http://snomed.info/sct|365980008`

1. Opvragen (search) alcoholgebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|228273003`

1. Opvragen (search) drugsgebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|228366006`

1. Opvragen (search) tabakgebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|365980008`

{% include bronsysteem-herkennen.md %}