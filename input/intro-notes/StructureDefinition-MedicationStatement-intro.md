{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Medicatie Gebruik2](https://zibs.nl/wiki/MedicatieGebruik2-v1.0.1(2017NL))

### View Definition

[ViewDefinition voor MedicationStatement](ViewDefinition-MedicationStatement.json)

{% include ViewDefinition-MedicationStatement-ui.md %}

{% include ViewDefinition-MedicationStatement.md %}

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/MedicationStatement?category=urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3|6&_include=MedicationStatement:medication&patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}