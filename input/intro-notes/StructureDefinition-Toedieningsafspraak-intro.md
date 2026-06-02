{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Toedieningsafspraak](https://zibs.nl/wiki/Toedieningsafspraak-v1.0.1(2017NL))

### View Definition

[ViewDefinition voor MedicationDispense](ViewDefinition-Toedieningsafspraak.json)

{% include ViewDefinition-Toedieningsafspraak-ui.md %}

{% include ViewDefinition-Toedieningsafspraak.md %}

### Request

1. Opvragen (search) medicatie gebruik

    `GET <ontsluiten-bronsysteem-base>/MedicationDispense?category=http://snomed.info/sct|422037009&_include=MedicationDispense:medication&patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}