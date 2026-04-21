{% include profile-note.md %}
<div class="dragon" markdown="1">
**De specificatie op deze pagina is gegenereerd en work-in-progress.**
</div>

### Zorginformatiebouwsteen

[ZIB Mobiliteit](https://zibs.nl/wiki/Mobiliteit-v3.1(2017NL))

### View Definition

[ViewDefinition voor Mobiliteit](ViewDefinition-Mobiliteit.json)

{% include ViewDefinition-Mobiliteit-ui.md %}

{% include ViewDefinition-Mobiliteit.md %}

### Request

1. Opvragen (search) Mobiliteit

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://snomed.info/sct|301438001`

{% include bronsysteem-herkennen.md %}
