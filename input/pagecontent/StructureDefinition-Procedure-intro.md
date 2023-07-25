{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Verrichting](https://zibs.nl/wiki/Verrichting-v4.1(2017NL))

### User-Interface guidance

Dit figuur is opgebouwd uit grofweg 2 onderdelen:
1. een schets van het scherm met labels en sortering informatie

{% include img.html img="UI-Schets-Verrichtingen.png" width="100%" %}

2. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels

{% include img.html img="tabel-UI-Schets-Verrichtingen.png" width="100%" %}

### Zoeken naar codes

* [DHD Verrichtingenthesaurus, CBV en Zorgactiviteiten](https://trex.dhd.nl/)
* [NHG Ingrepenviewer tabel 49](https://viewers.nhg.org/ingrepenviewer/)

### Request

1. Opvragen (search) verrichtingen

    `GET <ontsluiten-bronsysteem-base>/Procedure?patient=<fhir_patient_id>`

    *N.B. Deze request is breder dan de BgZ request, waar alleen de chirugische verrichtingen worden opgevraagd.*

{% include bronsysteem-herkennen.md %}