{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Laboratorium uitslag](https://zibs.nl/wiki/LaboratoriumUitslag-v4.1(2017NL))

### View Definition

[ViewDefinition voor labuitslagen](ViewDefinition-Labuitslagen.json)

{% include ViewDefinition-Labuitslagen-ui.md %}

{% include ViewDefinition-Labuitslagen.md %}

### Zoeken naar codes

* [LOINC lab-uitslagen](https://terminologie.nictiz.nl/art-decor/loinc) - `system=http://loinc.org`
* [NHG Tabel 45 Diagnostische Bepalingen Labcodes](https://bepalingen.nhg.org/labcodes/determinations?q%5Bapplication_kind_cont%5D=L) `system=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen`

### Request

1. Opvragen (search) laatst bekende labuitslag per type (inclusief materiaalsoort) voor een patient

    `GET <ontsluiten-bronsysteem-base>/Observation/$lastn?patient=<fhir_patient_id>&category=http://snomed.info/sct|275711006&_include=Observation:specimen`

1. **Sanday:** Opvragen (search) labuitslagen per type voor een patient

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=http://hl7.org/fhir/observation-category|laboratory`

    <blockquote class="stu-note" markdown="1">
    N.B. Alleen klinische chemie resultaten zijn op dit moment beschikbaar.
    </blockquote>

{% include bronsysteem-herkennen.md %}