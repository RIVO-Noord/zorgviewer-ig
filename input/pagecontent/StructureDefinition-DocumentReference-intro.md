{% include profile-note.md %}

### User-Interface guidance

Dit figuur is opgebouwd uit grofweg 2 onderdelen:
1. een schets van het scherm met labels en sortering informatie

{% include img.html img="ui-documentref.png" caption="User-Interface DocumentReference guidance" width="100%" %}

1. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels

{% include img.html img="tabel-ui-documentref.png" caption="User-Interface DocumentReference guidance" width="100%" %}

### Document soorten herkennen

<style>table, td, th { border: 1px solid black; padding:10px; }</style>
|class (higher level grouping)|type (http://loinc.org)|descriptions|
|--|--|--|
|correspondence/Correspondentie|56444-3 Healthcare communication Document|Correspondentie, Patiëntenbrief, Verwijsbrief, Poliklinische brief, Artsenbrief|
|imaging-result/Imaging result|28570-0 Procedure note|Radiologie verslag|
|clinical-note/Notitie|(*)||

(*) Epic clinical-note(s) types from https://vendorservices.epic.com/Sandbox/Index?api=865:
* Discharge Documentation (18842-5)
* Consultation (11488-4)
* History & Physical (34117-2)
* Progress Note (11506-3)
* Procedure Note (28570-0)
* Emergency Department Note (34111-5)
* Nurse Note (34746-8)
* Discharge Instructions (74213-0)
* Risk assessment and screening note (75492-9)
* OR Note (11504-8)
* Miscellaneous Notes (34109-9)

Zie het Excelbestand tab "classCode+decision tree" voor LOINC codes:
[Nationale XDS metadataset](https://nictiz.nl/standaarden/overzicht-van-standaarden/xds-metadata/)

### Request

1. Opvragen (search) alle documenten

    `GET <ontsluiten-bronsysteem-base>/DocumentReference?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}