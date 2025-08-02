{% include profile-note.md %}

### Zorginformatiebouwsteen

* [ZIB Bloeddruk](https://zibs.nl/wiki/)
* [ZIB Gewicht](https://zibs.nl/wiki/)
* [ZIB Lengte](https://zibs.nl/wiki/)
* [ZIB Temperatuur](https://zibs.nl/wiki/)
* [ZIB O2Saturatie](https://zibs.nl/wiki/)
* Huisarts zelfmetingen

### View Definition

[ViewDefinition voor Alerts](ViewDefinition-Vitalegegevens.json)

{% include ViewDefinition-Vitalegegevens-ui.md %}

{% include ViewDefinition-Vitalegegevens.md %}

### Request

1. Opvragen (search) vitale gegevens

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=vital-signs`

{% include bronsysteem-herkennen.md %}