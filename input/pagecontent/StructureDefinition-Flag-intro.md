{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Alert](https://zibs.nl/wiki/Alert-v3.2(2017NL))

### View Definition

* [ViewDefinition voor Alerts](ViewDefinition-Flag.json)

### User-Interface guidance

|Kolomnaam|FHIR Path  |FHIR Type|Zib element  |Toelichting of regels  |
|--|--|--|--|--|
|Bron|.meta.extension[system="http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source"].valueUri|string|nvt|  |
|Datum|.period.start|dateTime|BeginDatumTijd|  |
|Voor|Flag.code.text of resource.extension.where(url='http://hl7.org/fhir/StructureDefinition/flag-detail').valueReference.reference.resolve().code.text|string|AlertNaam of Conditie::Probleem| De resolve levert de bijbehorende Condition |
|Categorie|Flag.category.text|string|AlertType|  |
|Status|.status|code|nvt|Mapping: ‘active’ naar ‘actueel’; ‘in-active’ naar ‘niet actueel’ Uitgefilterd: ‘entered-in-error’ wordt niet getoond in de Zorgviewer, omdat het om foutief ingevoerde data gaat.|
### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/Flag?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}