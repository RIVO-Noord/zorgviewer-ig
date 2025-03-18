{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Medicatieafspraak](https://zibs.nl/wiki/MedicationAgreement-v1.0(2017EN))

### View Definition

[ViewDefinition voor MedicationRequest](ViewDefinition-MedicationRequest.json)

<div>
{% include ViewDefinition-MedicationRequest.svg %}
</div>

{% include ViewDefinition-MedicationRequest.md %}

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/MedicationRequest?category=http://snomed.info/sct|16076005&_include=MedicationRequest:medication&patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}