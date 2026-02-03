{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Voedingsadvies](https://zibs.nl/wiki/Voedingsadvies-v3.1(2017NL))

### View Definition

* [ViewDefinition voor Voedingsadvies](ViewDefinition-NutritionAdvice.json)

{% include ViewDefinition-NutritionAdvice-ui.md %}

{% include ViewDefinition-NutritionAdvice.md %}

### Codesystemen


### Request

1. Opvragen (search) voedingsadviezen

    `GET <ontsluiten-bronsysteem-base>/NutritionOrder?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}