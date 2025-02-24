{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Medicatie Gebruik](https://zibs.nl/wiki/MedicatieGebruik2-v1.0.1(2017NL))

### View Definition

[ViewDefinition voor MedicationStatement](ViewDefinition-MedicationStatement.json)

<div>
{% include ViewDefinition-MedicationStatement.svg %}
</div>

'+' voor de kolom naam betekent in de uitklap<br/>
'()' om de kolom naam betekent gebruiken voor formatting of verbergen

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/MedicationStatement?category=urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3|6&_include=MedicationStatement:medication&patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}