{% include profile-note.md %}

|class (higher level grouping)|type (http://loinc.org)|descriptions|
|--|--|--|
|Correspondentie|56444-3 Healthcare communication Document|Correspondentie, Patiëntenbrief, Verwijsbrief, Poliklinische brief, Artsenbrief|
|Imaging result|28570-0 Procedure note|Radiologie verslag|
|Notitie|?|?|

Zie het Excelbestand tab "classCode+decusion tree" voor LOINC codes:
[Nationale XDS metadataset](https://nictiz.nl/standaarden/overzicht-van-standaarden/xds-metadata/)

Request:
``<ontsluiten-bronsysteem-base>/DocumentReference?patient=<fhir_patient_id>``