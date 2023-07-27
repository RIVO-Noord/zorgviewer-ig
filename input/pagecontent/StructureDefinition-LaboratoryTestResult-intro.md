{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Laboratorium uitslag](https://zibs.nl/wiki/LaboratoriumUitslag-v4.1(2017NL))

### User-Interface guidance

Dit figuur is opgebouwd uit grofweg 2 onderdelen:
1. Een schets van het scherm met labels en sortering informatie
    <div style="clear:both;"><img src="UI-Schets-LaboratoriumUitslag.png" class="figure-img img-responsive img-rounded center-block"></div>
1. Tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels
    N.B. in de paths zit een `specimen.resolve()` functie aanroep, omdat het daar een Reference naar een andere resource instance betreft
    <div style="clear:both;"><img src="tabel-UI-Schets-LaboratoriumUitslag.png" class="figure-img img-responsive img-rounded center-block"></div>

### Zoeken naar codes

* [LOINC lab-uitslagen](https://terminologie.nictiz.nl/art-decor/loinc) - `system=http://loinc.org`

### Request

1. Opvragen (search) laatst bekende labuitslag per type (inclusief materiaalsoort) voor een patient

    `GET <ontsluiten-bronsysteem-base>/Observation/$lastn?patient=<fhir_patient_id>&category=http://snomed.info/sct|275711006&_include=Observation:specimen`

    <blockquote class="stu-note" markdown="1">
    N.B. Alleen klinische chemie resultaten zijn op dit moment beschikbaar.
    </blockquote>

{% include bronsysteem-herkennen.md %}