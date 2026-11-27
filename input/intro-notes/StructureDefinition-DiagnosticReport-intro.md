{% include profile-note.md %}

### Zorginformatiebouwsteen

Dit is geen zib en alleen voor Epic beschikbaar.

### View Definition

[ViewDefinition voor DiagnosticReport](ViewDefinition-DiagnosticReport.json)

{% include ViewDefinition-DiagnosticReport-ui.md %}

{% include ViewDefinition-DiagnosticReport.md %}

### Request

1. Opvragen (search) Pathologie en cytologie, Lab en Microbiologie verslagen

    `GET <ontsluiten-bronsysteem-base>/DiagnosticReport?patient=<fhir_patient_id>&&_include=DiagnosticReport:result:Observation`

{% include bronsysteem-herkennen.md %}