{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Woonsituatie](https://zibs.nl/wiki/Woonsituatie-v3.1(2017NL))

### View Definition

* [ViewDefinition voor Woonsituatie](ViewDefinition-LivingSituation.json)

{% include ViewDefinition-LivingSituation-ui.md %}

{% include ViewDefinition-LivingSituation.md %}

### Codesystemen


### Request

1. Opvragen (search) woonsituatie

    `GET <ontsluiten-bronsysteem-base>/Observation/$lastn?code=http://snomed.info/sct|365508006?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}