{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Vaccinaties](https://zibs.nl/wiki/Vaccinatie-v3.1(2017NL))

### View Definition

* [ViewDefinition voor Vaccinaties](ViewDefinition-Immunization.json)

<div>
{% include ViewDefinition-Immunization.svg %}
</div>

{% include ViewDefinition-Immunization.md %}

### Request

1. Opvragen (search) vaccinaties

    `GET <ontsluiten-bronsysteem-base>/Immunization?patient=<fhir_patient_id>&status=completed`

{% include bronsysteem-herkennen.md %}