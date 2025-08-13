{% include profile-note.md %}

### Zorginformatiebouwsteen

* [ZIB Bloeddruk](https://zibs.nl/wiki/Bloeddruk-v3.1(2017NL))
* [ZIB Gewicht](https://zibs.nl/wiki/Lichaamsgewicht-v3.1(2017NL)) - GewichtWaarde
* [ZIB Lengte](https://zibs.nl/wiki/Lichaamslengte-v3.1(2017NL)) - LengteWaarde 
* [ZIB Temperatuur](https://zibs.nl/wiki/Lichaamstemperatuur-v3.1(2017NL)) - TemperatuurWaarde
* [ZIB Ademhaling](https://zibs.nl/wiki/Ademhaling-v3.1(2017NL)) - Ademfrequentie
* [ZIB O2Saturatie](https://zibs.nl/wiki/O2Saturatie-v3.1(2017NL)) - SpO2Waarde
* [ZIB Polsfrequentie](https://zibs.nl/wiki/Polsfrequentie-v3.1(2017NL)) - PolsfrequentieWaarde
* [ZIB Hartfrequentie](https://zibs.nl/wiki/Hartfrequentie-v3.1(2017NL)) - HartfrequentieWaarde
* Huisarts zelfmetingen [ZIB AlgemeneMeting](https://zibs.nl/wiki/AlgemeneMeting-v3.0(2017NL)) - Uitslag/UitslagWaarde

### View Definition

[ViewDefinition voor Vitale Gegevens](ViewDefinition-Vitalegegevens.json)

{% include ViewDefinition-Vitalegegevens-ui.md %}

{% include ViewDefinition-Vitalegegevens.md %}

### Request

1. Opvragen (search) vitale gegevens

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&category=vital-signs`

{% include bronsysteem-herkennen.md %}