### Bevragen bronsysteem: Client Registratie 

De volgende APIs moeten geselecteerd zijn bij Zorgviewer client registratie.

| Epic API | Nodig voor |
|---|---|
| AllergyIntolerance.Search (STU3) | Overgevoeligheden |
| Appointment.Search (Appointments) (STU3), Encounter.Search (Patient Chart) (STU3) | Contacten en Afspraken |
| DocumentReference.Search (Correspondences) (STU3), DocumentReference.Search (Radiology Results) (STU3), Binary.Read (Correspondences) (STU3), Binary.Read (Radiology Results) (STU3) | Correspondentie |
| Condition.Search (Encounter Diagnosis, Problems) (STU3) | Probleemlijst |
| Consent.Search (Code Status) (STU3) | Behandelaanwijzing |
| Consent.Search (Document) (STU3) | Wilsverklaring |
| DeviceUseStatement.Search (Implants and External Devices) (STU3) | Medische hulpmiddelen |
| Flag.Search (Health Concern) (STU3), Flag.Search (Infection) (STU3), Flag.Search (Patient FYI) (STU3) | Alerts |
| Immunization.Search (STU3) | Vaccinaties |
| MedicationRequest.Search (Signed Medication Orders) (STU3), MedicationStatement.Search (STU3) | Medicatiegegevens |
| NutritionOrder.Search (STU3) | Voedingsadvies |
| Observation.$lastn (Labs) (STU3), Observation.Search (Labs) (STU3), Specimen.Read (Labs) (STU3) | Laboratorium uitslagen |
| Observation.$lastn (Social History) (STU3) | Intoxicaties |
| Observation.Search (Vitals) (STU3) | Vitale gegevens |
| Patient.Search (STU3) | Contactpersonen & Burgelijkse Staat |
| Procedure.Search (Orders, Surgeries) (STU3) | Verrichtingen |
| ProcedureRequest.Search (Orders) (STU3) | Geplande Zorgactiviteiten |

### Bevragen bronsysteem: Autorisatie

_TODO_

### Bevragen bronsysteem: Patient identificatie

_TODO_

### Bevragen bronsysteem: Requests

_TODO_