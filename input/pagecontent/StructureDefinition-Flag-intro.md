{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Alert](https://zibs.nl/wiki/Alert-v3.2(2017NL))

### View Definition

* [ViewDefinition voor Alerts](ViewDefinition-Flag.json)

### User-Interface guidance

|Kolomnaam|zib|FHIR-path|Informatie|
|--|--|--|--|
|Bron|nvt|.meta.extension[system="http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source"].valueUri|  |
|Datum|BeginDatumTijd|.period.start|  |
|Voor|AlertNaam of Conditie::Probleem|Flag.code.text of Condition.code.text|  |
|Categorie|AlertType|Flag.category.text of Condition.category[0].text|  |
|Status|nvt|.status|Mapping: ‘active’ naar ‘actueel’; ‘in-active’ naar ‘niet actueel’ Uitgefilterd: ‘entered-in-error’ wordt niet getoond in de Zorgviewer, omdat het om foutief ingevoerde data gaat.|
### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/Flag?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}