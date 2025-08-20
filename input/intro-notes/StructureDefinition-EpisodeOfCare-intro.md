{% include profile-note.md %}

### Zorginformatiebouwsteen

N.B. ZorgEpisode komt uit de [Huisartsgegevensset](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data) en is een zib2020 en FHIR R4. Voor het deel dat wij gebruiken is deze volledig compatibel met zib2017 en STU3.

[ZIB ZorgEpisode](https://zibs.nl/wiki/ZorgEpisode-v1.0(2020NL))

### Request

1. Opvragen (search) zorgepisodes inclusief problemen

    `GET <ontsluiten-bronsysteem-base>/EpisodeOfCare?patient=<fhir_patient_id>&_include=Condition:diagnosis`

{% include bronsysteem-herkennen.md %}