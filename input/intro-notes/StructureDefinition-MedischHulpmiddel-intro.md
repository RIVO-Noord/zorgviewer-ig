{% include profile-note.md %}
<div class="dragon" markdown="1">
**De specificatie op deze pagina is gegenereerd en work-in-progress.**
</div>

### Zorginformatiebouwsteen

[ZIB MedischHulpmiddel](https://zibs.nl/wiki/MedischHulpmiddel-v3.1(2017NL))

### View Definition

[ViewDefinition voor Medische Hulpmiddelen](ViewDefinition-MedischHulpmiddel.json)

{% include ViewDefinition-MedischHulpmiddel-ui.md %}

{% include ViewDefinition-MedischHulpmiddel.md %}

### Request

1. Opvragen (search) deviceusestatements

    `GET <ontsluiten-bronsysteem-base>/DeviceUseStatement?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}
