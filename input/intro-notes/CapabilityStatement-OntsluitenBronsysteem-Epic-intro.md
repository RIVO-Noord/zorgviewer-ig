### Bevragen bronsysteem: Client Registratie 

De volgende APIs moeten geselecteerd zijn bij Zorgviewer client registratie.

| Epic API | Benodigd bij |
|---|---|
| AllergyIntolerance.Search (STU3) | Overgevoeligheden |
| Appointment.Search (Appointments) (STU3), Encounter.Search (Patient Chart) (STU3) | Samenstelling: Contacten en Afspraken |
| DocumentReference.Search (Correspondences) (STU3), DocumentReference.Search (Radiology Results) (STU3), Binary.Read (Correspondences) (STU3), Binary.Read (Radiology Results) (STU3) | Samenstelling: Correspondentie en Verslagen |
| Condition.Search (Encounter Diagnosis, Problems) (STU3) | Samenstelling: Probleemlijst |
| Consent.Search (Code Status) (STU3) | Profile: Behandelaanwijzing |
| Consent.Search (Document) (STU3) | Profile: Wilsverklaring |
| DeviceUseStatement.Search (Implants and External Devices) (STU3) | Profile: Medische hulpmiddelen |
| Flag.Search (Health Concern) (STU3), Flag.Search (Infection) (STU3), Flag.Search (Patient FYI) (STU3) | Profile: Alert |
| Immunization.Search (STU3) | Vaccinaties |
| MedicationRequest.Search (Signed Medication Orders) (STU3), MedicationStatement.Search (STU3) | Samenstelling: Medicatiegegevens |
| NutritionOrder.Search (STU3) | Profile: Voedingsadvies |
| Observation.$lastn (Labs) (STU3), Observation.Search (Labs) (STU3), Specimen.Read (Labs) (STU3) | Profile: Laboratorium Test Uitslag en Specimen |
| Observation.$lastn (Social History) (STU3) | Samenstelling: Intoxicaties |
| Observation.Search (Vitals) (STU3) | Profile: Vitale gegevens |
| Patient.Search (STU3) | Profile: Patient, Contactpersonen & Burgerlijke Staat |
| Procedure.Search (Orders, Surgeries) (STU3) | Profile: Verrichtingen |
| ProcedureRequest.Search (Orders) (STU3) | Profile: Geplande Zorgactiviteiten |

### Bevragen bronsysteem: Autorisatie

_TODO_

### Bevragen bronsysteem: Patient identificatie

_TODO_

### Bevragen bronsysteem: Requests

_TODO_