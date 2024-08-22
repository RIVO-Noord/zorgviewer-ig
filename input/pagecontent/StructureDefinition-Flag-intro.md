{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Alert](https://zibs.nl/wiki/Alert-v3.2(2017NL))

### View Definition

* [ViewDefinition voor Alerts](ViewDefinition-Flag.json)

### User-Interface guidance

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-Alerts.png" class="figure-img img-responsive img-rounded center-block"></div>

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/Flag?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}