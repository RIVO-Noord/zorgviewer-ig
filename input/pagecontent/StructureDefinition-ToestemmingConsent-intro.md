{% include future-note.md %}

### Mappings

* [HL7 v2 ADT^A08 en ADT^A31 mapping van PID en CON segmenten](ConceptMap-patient-toestemming.html)

### Request

1. Opvragen (search) toestemmingen voor een patient

    `GET <toestemming-base>/Consent?patient:Patient.identifier=<BSN>`

    N.B. Bij geen resultaat heeft de patient expliciet geen toestemming gegeven of nog niet toestemming gegeven. 