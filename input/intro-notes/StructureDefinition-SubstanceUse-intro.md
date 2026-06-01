{% include profile-note.md %}

### Zorginformatiebouwstenen

De volgende zibs vallen min of meer onder het thema vitale gegevens.

| Gegevensset | zib | Zib element met de hoofd waarde |
| ----------- | --- | ------------------------------- |
| BgZ, eOverdracht | [ZIB Alcoholgebruik](https://zibs.nl/wiki/AlcoholGebruik-v3.1(2017NL)) | |
| BgZ, eOverdracht | [ZIB Drugsgebruik](https://zibs.nl/wiki/DrugsGebruik-v3.2(2017NL))) | |
| BgZ, eOverdracht | [ZIB Tabakgebruik](https://zibs.nl/wiki/TabakGebruik-v3.1(2017NL)) | |

### View Definition

[ViewDefinition voor middelengebruik](ViewDefinition-Middelengebruik.json)

{% include ViewDefinition-Middelengebruik-ui.md %}

{% include ViewDefinition-Middelengebruik.md %}

### Request

N.B. Eerste request is optimaal en wordt ondersteund door Epic en Sanday. De andere requests zijn de "officiele" BgZ requests en zijn nodig voor uitvragen van Zorgplatform.

1. Opvragen (search) vitale gegevens

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=social-history`

1. Opvragen (search) alcoholgebruik (BgZ) -> opzoeken op zibs.nl bij bgz-2017

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://loinc.org|85354-9`

1. Opvragen (search) drugsgebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://loinc.org|29463-7`

1. Opvragen (search) tabakgebruik (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://loinc.org|8302-2,http://loinc.org|8306-3,http://loinc.org|8308-9`

{% include bronsysteem-herkennen.md %}