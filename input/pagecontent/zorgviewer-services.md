De volgende bouwblokken hebben allen een FHIR API. Hierdoor kunnen ze allemaal worden gerealiseerd door een generieke FHIR-Store in te richten. Deze verzameling noemen we de Zorgviewer Services. Later kunnen die worden vervangen door nationale alternatieven.

### Terminology

* Doel: Nederlandse Terminology Service (NTS) Nictiz
* Inhoud: Vertalingen (ValueSet, Codesystem, ConceptMap)
* Tijdelijk: CodeSystem en ValueSets in deze IG in de Zorgviewer Services opslaan.

### Toestemming & PatientIndex

* Doel: landelijke MITZ
* Inhoud: Toestemmingen van een patient (Consents)
* Tijdelijk: Vullen [Toestemming Consent](StructureDefinition-ToestemmingConsent) dmv afvangen HL7 v2 toestemming berichten.

### Zorgverlener Directory

* Doel: landelijke ZORG-AB of AGB Registry
* Inhoud
    * Zorgverlener en metadata zoals specialisme (kwalificaties) ([Practitioner](StructureDefinition-Practitioner.html))
    * Zorgverlener Rol en metadata zoals specialisme (kwalificaties) adhv AGB code ([PractitionerRole](StructureDefinition-PractitionerRole.html))
* Tijdelijk: Verkrijgen AGB codes met bijbehorende Specialismen en deze als PractitionerRole in de Zorgviewer Services opslaan.

### Adressering

* Doel: landelijke [ZORG-AB](https://www.vzvz.nl/diensten/gemeenschappelijke-diensten/zorg-ab/releases)
* Inhoud
    * Bronsystemen endpoints ([Endpoints](StructureDefinition-Endpoint.html))
    * Organisatie metadata ([Organization](StructureDefinition-Organization.html))
* Tijdelijk: Maken Endpoints en Organizations adhv Zorgviewer aangesloten organisaties.

### [Logging](CapabilityStatement-Logging.html)

* Opstart Zorgviewer ([AuditEvent](StructureDefinition-AuditEvent.html))

### [Behandelplan](CapabilityStatement-Behandelplan.html)

* Behandelplan details, workflow, beginnent met filters ([PlanDefinition](StructureDefinition-PlanDefinition.html), DataRequirements)