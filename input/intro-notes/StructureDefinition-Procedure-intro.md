{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Verrichting](https://zibs.nl/wiki/Verrichting-v4.1(2017NL))

### View Definition

* [ViewDefinition voor Verrichtingen](ViewDefinition-Procedure.json)

{% include ViewDefinition-Procedure-ui.md %}

{% include ViewDefinition-Procedure.md %}

### Codesystemen

* [DHD Verrichtingenthesaurus, CBV en Zorgactiviteiten](https://trex.dhd.nl/)
  * SNOMED CT - http://snomed.info/sct
  * DHD VT - urn:oid:2.16.840.1.113883.2.4.3.120.5.2
  * CBV - urn:oid:2.16.840.1.113883.2.4.3.120.5.3
  * NZa - urn:oid:2.16.840.1.113883.2.4.3.27.15.5
* [NHG Ingrepenviewer tabel 49](https://viewers.nhg.org/ingrepenviewer/)

### Request

1. Opvragen (search) verrichtingen

    `GET <ontsluiten-bronsysteem-base>/Procedure?patient=<fhir_patient_id>`

    *N.B. Deze request is breder dan de BgZ request, waar alleen de chirugische verrichtingen worden opgevraagd.*

{% include bronsysteem-herkennen.md %}