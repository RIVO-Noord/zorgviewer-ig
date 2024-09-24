{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Allergie Intolerantie](https://zibs.nl/wiki/AllergieIntolerantie-v3.2(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags en de UI guidance is gebruikt: [Fit-gap analyse allergie-intolerantie](https://amigo.nictiz.nl/uploads/a158231f-a872-4828-b5c5-0a24e7b4e4bd/Fit_gap_analyse_Allergie-intolerantie.pdf)

### View Definition

* [ViewDefinition voor Allergieën en Intoleranties](ViewDefinition-AllergyIntolerance.json)

### User-Interface guidance


|Kolomnaam|FHIR Path  |FHIR Type|Zib element  |Toelichting of regels  |
|--|--|--|--|--|
|Bron  |  |  |  | |
|Datum  |.onsetPeriod.start  |dateTime  |BeginDatumTijd  ||
|Stof  |.code.text  |code  |VeroorzakendeStof  | |
|Toelichting  |.note.extension('http://nictiz.nl/fhir/StructureDefinition/note')  |string  |Toelichting  | |
|Ernst  |._criticality.extension[system="http://nictiz.nl/fhir/StructureDefinition/code-specification"].Text Of indien geen extensie aanwezig: .criticality |code  |MateVanKritiek  ||
|Reactie  |.reaction.manifestation.text  |  |Reactie Symptoom  ||
|Categorie|._category.extension[system=” http://nictiz.nl/fhir/StructureDefinition/code-specification"].Text of indien geen extensie aanwezig: .category |code[]  |AllergieCategorie  |Hebt meerdere opties die tegelijk getoond kunnen worden|
|Klinische status|._clinicalStatus.extension[system=" http://nictiz.nl/fhir/StructureDefinition/code-specification "].Text of indien geen extensie aanwezig: .clinicalStatus|code  |AllergieStatus  |‘Actief’, ‘Niet meer aanwezig’, ‘Achterhaald’. ‘Foutief’ status wordt niet getoond in de Zorgviewer (wordt uitgefilterd). Indien geen extensie aanwezig, dan worden de waarden als volgt gemapped: Active -> Actief; InActive -> Achterhaald; Resolved -> Niet meer aanwezig|

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/AllergyIntolerance/?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}