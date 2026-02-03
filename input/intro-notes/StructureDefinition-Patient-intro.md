{% include profile-note.md %}

### Zorginformatiebouwstenen

* [ZIB Patient](https://zibs.nl/wiki/Patient-v3.1(2017NL))
* [ZIB Contactpersoon](https://zibs.nl/wiki/Contactpersoon-v3.1(2017NL))

### View Definition

<div class="dragon" markdown="1">
N.B. Er is alleen voor het onderdeel contactpersonen van Patient een view gedefinieerd** 
</div>

* [ViewDefinition voor Contactpersonen](ViewDefinition-Contactpersonen.json)

{% include ViewDefinition-Contactpersonen-ui.md %}

{% include ViewDefinition-Contactpersonen.md %}

### Patient.name algoritme

Bovenop constraint **zv-pat-1**:
1. als ``name[].use`` gebruik dan de ``name[use="official"]``, anders de 1ste ``name[0]``
1. als ``name[].text`` gebruik die, anders concatenate de 1ste ``name[].given[0]`` met de ``name[].family``

### Requests

1. Opvragen (search) naar patient op basis van de BSN

    `GET <bronsysteem-ontsluiting-base/Patient?identifier=<BSN>`

1. Of opvragen (search) middels POST, zie: [FHIR STU3 http search](https://hl7.org/fhir/STU3/http.html#search)

    `POST <bronsysteem-ontsluiting-base/Patient/_search`

    `Content-Type: application/x-www-form-urlencoded`

    `identifier=<BSN>`

1. Of (Sanday) opvragen (match) middels POST, zie: [FHIR STU3 operation-patient-match](https://hl7.org/fhir/STU3/operation-patient-match.html)

    `POST <bronsysteem-ontsluiting-base/Patient/$match`

    ```json
    {
      "resourceType": "Patient",
      "identifier": [ {
        "use": "official",
        "system": "http://fhir.nl/fhir/NamingSystem/bsn",
        "value": "123456789"
      } ]
    }
    ```

1. Opvragen (read) patient op basis van de fhir_patient_id

    `GET <ontsluiten-bronsysteem-base>/Patient/<fhir_patient_id>`

### Response

1. Bundle met 1 Patient

    Dit is de gewenste situatie.

1. Bundle met meer dan 1 Patient

    Dit kan gebeuren na een SEH opname als de patient nog niet samengevoegd is.

1. Bundle zonder patienten of een HTTP Response 401/404

    Dit gebeurt als de patient GEEN toestemming heeft gegeven of de patient simpelweg niet bestaat bij de bevraagde organisatie.

{% include bronsysteem-herkennen.md %}