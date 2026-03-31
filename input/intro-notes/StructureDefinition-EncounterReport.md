{% include profile-note.md %}

### Zorginformatiebouwsteen

N.B. SOEPVerslag komt uit de [Huisartsgegevensset](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data) en is een zib2020 en FHIR R4. Voor het deel dat wij gebruiken is deze volledig compatibel met zib2017 en STU3.

[ZIB SOEPVerslag](https://zibs.nl/wiki/SOEPVerslag-v1.0(2020NL))

### View Definition

[ViewDefinition voor EpisodeOfCare](ViewDefinition-EncounterReport.json)

{% include ViewDefinition-EncounterReport-ui.md %}

{% include ViewDefinition-EncounterReport.md %}

### Request

1. Opvragen (search) zorgepisodes inclusief problemen

    `GET <ontsluiten-bronsysteem-base>/Composition?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}