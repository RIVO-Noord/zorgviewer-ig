De volgende bouwblokken hebben allen een FHIR API. Hierdoor kunnen ze allemaal worden gerealiseerd door een generieke FHIR-Store in te richten. Deze verzameling noemen we de Zorgviewer Services. Later kunnen die worden vervangen door nationale alternatieven.

### Terminology

* Doel: Nederlandse Terminology Service (NTS) Nictiz
* Inhoud: Vertalingen (ValueSet, Codesystem, ConceptMap)

### Toestemming & PatientIndex

* Doel: landelijke MITZ
* Inhoud: Toestemmingen van een patient (Consents)

### Zorgverlener Directory

* Doel: landelijke ZORG-AB of AGB Registry
* Inhoud
    * Zorgverlener en metadata zoals specialisme (kwalificaties) ([Practitioner](StructureDefinition-Practitioner.html))
    * Zorgverlener Rol en metadata zoals specialisme (kwalificaties) adhv AGB code ([PractitionerRole](StructureDefinition-PractitionerRole.html))
 
### Adressering

* Doel: landelijke ZORG-AB
* Inhoud
    * Bronsystemen endpoints ([Endpoints](StructureDefinition-Endpoint.html))
    * Organisatie metadata ([Organization](StructureDefinition-Organization.html))

### [Logging](CapabilityStatement-Logging.html)

* Opstart Zorgviewer ([AuditEvent](StructureDefinition-AuditEvent.html))

### [Behandelplan](CapabilityStatement-Behandelplan.html)

* Behandelplan details, workflow, beginnent met filters ([PlanDefinition](StructureDefinition-PlanDefinition.html), DataRequirements)