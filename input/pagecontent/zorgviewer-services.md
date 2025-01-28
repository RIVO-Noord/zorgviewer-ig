De volgende bouwblokken hebben allen een FHIR API. Hierdoor kunnen ze allemaal worden gerealiseerd door een generieke FHIR-Store in te richten. Deze verzameling noemen we de Zorgviewer Services. Later kunnen die worden vervangen door nationale alternatieven. Bij onderstaande tijdelijke oplossingen worden de gegevens als FHIR resources opgeslagen in die Zorgviewer Services FHIR-Store.

### [Terminology](CapabilityStatement-Terminologie.html)

* Doel: Nederlandse Terminology Service ([NTS Nictiz](https://nictiz.nl/wat-we-doen/activiteiten/terminologie/de-nationale-terminologieserver/))
* Inhoud: Vertalingen (ValueSet, CodeSystem, ConceptMap)
* Tijdelijk: CodeSystem en ValueSets in deze IG.

#### Bevragen terminologie

*TODO sequence diagram uitwerken*
Opvragen CodeSystems en ValueSets voor gebruik in de Zorgviewer.

**Van toepassing zijnde standaarden en documentatie**:
* [FHIR Terminology Service](https://hl7.org/fhir/STU3/terminology-service.html)

### [Toestemming / PatientIndex](CapabilityStatement-Toestemming.html)

* Doel: landelijke MITZ open vraag
* Inhoud: Toestemmingen van een patient (Consents)
* Tijdelijk: Vullen [Toestemming Consent](StructureDefinition-ToestemmingConsent.html) dmv afvangen HL7 v2 toestemming berichten.

### [Zorgverlener Directory](CapabilityStatement-ZorgverlenerDirectory.html)

* Doel: landelijke [ZORG-AB](https://www.vzvz.nl/diensten/gemeenschappelijke-diensten/zorg-ab/releases) of AGB Register
* Inhoud
    * Zorgverlener en metadata zoals specialisme (kwalificaties) ([Practitioner](StructureDefinition-Practitioner.html))
    * Zorgverlener Rol en metadata zoals specialisme (kwalificaties) adhv AGB code ([PractitionerRole](StructureDefinition-PractitionerRole.html))
* Tijdelijk: Verkrijgen AGB codes met bijbehorende specialismen en deze als PractitionerRole.

### [Adressering](CapabilityStatement-Adressering.html)

* Doel: landelijke [ZORG-AB](https://www.vzvz.nl/diensten/gemeenschappelijke-diensten/zorg-ab/releases)
* Inhoud
    * Bronsystemen endpoints ([Endpoints](StructureDefinition-Endpoint.html))
    * Organisatie metadata ([Organization](StructureDefinition-Organization.html))
* Tijdelijk: Maken Endpoints en Organizations adhv Zorgviewer aangesloten organisaties.

### [Behandelplan](CapabilityStatement-Behandelplan.html)

* Behandelplan details, workflow, beginnent met filters ([PlanDefinition](StructureDefinition-PlanDefinition.html), DataRequirements)