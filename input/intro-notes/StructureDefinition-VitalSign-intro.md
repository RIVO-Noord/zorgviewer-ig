{% include profile-note.md %}

### Zorginformatiebouwstenen

De volgende zibs vallen min of meer onder het thema vitale gegevens.

| Gegevensset | zib | Zib element met de hoofd waarde |
| ----------- | --- | ------------------------------- |
| BgZ, eOverdracht | [ZIB Bloeddruk](https://zibs.nl/wiki/Bloeddruk-v3.1(2017NL)) | |
| BgZ, eOverdracht | [ZIB Gewicht](https://zibs.nl/wiki/Lichaamsgewicht-v3.1(2017NL)) | GewichtWaarde |
| BgZ, eOverdracht | [ZIB Lengte](https://zibs.nl/wiki/Lichaamslengte-v3.1(2017NL)) | LengteWaarde |
| eOverdracht | [ZIB Temperatuur](https://zibs.nl/wiki/Lichaamstemperatuur-v3.1(2017NL)) | TemperatuurWaarde |
| eOverdracht | [ZIB Ademhaling](https://zibs.nl/wiki/Ademhaling-v3.1(2017NL)) | Ademfrequentie |
| eOverdracht | [ZIB Polsfrequentie](https://zibs.nl/wiki/Polsfrequentie-v3.1(2017NL)) | PolsfrequentieWaarde |
| Huisarts zelfmetingen | [ZIB AlgemeneMeting](https://zibs.nl/wiki/AlgemeneMeting-v3.0(2017NL)) | Uitslag/UitslagWaarde |
| nvt | [ZIB O2Saturatie](https://zibs.nl/wiki/O2Saturatie-v3.1(2017NL)) | SpO2Waarde |
| nvt | [ZIB Hartfrequentie](https://zibs.nl/wiki/Hartfrequentie-v3.1(2017NL)) | HartfrequentieWaarde |

### View Definition

[ViewDefinition voor Vitale Gegevens](ViewDefinition-Vitalegegevens.json)

{% include ViewDefinition-Vitalegegevens-ui.md %}

{% include ViewDefinition-Vitalegegevens.md %}

### Zoeken naar codes

* [LOINC](https://terminologie.nictiz.nl/art-decor/loinc) - `system=http://loinc.org`
* [NHG Tabel 45 Diagnostische Bepalingen Diagnostisch](https://bepalingen.nhg.org/labcodes/determinations?q%5Bapplication_kind_cont%5D=D) `system=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen`

### Request

N.B. Eerste request is optimaal en wordt ondersteund door Epic en Sanday. De andere requests zijn de "officiele" BgZ requests en zijn nodig voor uitvragen van Zorgplatform.

1. Opvragen (search) vitale gegevens

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=vital-signs`

1. Opvragen (search) bloeddruk (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://loinc.org|85354-9`

1. Opvragen (search) gewicht (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://loinc.org|29463-7`

1. Opvragen (search) lengte (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&code=http://loinc.org|8302-2,http://loinc.org|8306-3,http://loinc.org|8308-9`

{% include bronsysteem-herkennen.md %}