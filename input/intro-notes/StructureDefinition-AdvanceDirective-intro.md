{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Wilsverklaring](https://zibs.nl/wiki/Wilsverklaring-v3.1(2017NL))

### View Definition

[ViewDefinition voor Wilsbeschikkingen](ViewDefinition-Wilsbeschikkingen.json)

{% include ViewDefinition-Wilsbeschikkingen-ui.md %}

{% include ViewDefinition-Wilsbeschikkingen.md %}

### Request

1. Opvragen (search) wilsbeschikkingen

    `GET <ontsluiten-bronsysteem-base>/Consent?patient=<fhir_patient_id>&category=http://snomed.info/sct|11341000146107`

{% include bronsysteem-herkennen.md %}