{% include profile-note.md %}

### Patient.name algoritme

Bovenop constraint **zv-pat-1**:
1. als ``name[].use`` gebruik dan de ``name[use="official"]``, anders de 1ste ``name[0]``
1. als ``name[].text`` gebruik die, anders concatenate de 1ste ``name[].given[0]`` met de ``name[].family``

### Requests

1. Opvragen (search) naar patient op basis van de BSN

    `GET <bronsysteem-ontsluiting-base/Patient?identifier=<BSN>`

1. Opvragen (read) patient op basis van de fhir_patient_id

    `GET <ontsluiten-bronsysteem-base>/Patient/<fhir_patient_id>`
