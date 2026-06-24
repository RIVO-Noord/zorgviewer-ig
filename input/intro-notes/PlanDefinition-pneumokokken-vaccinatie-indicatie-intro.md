Dit zorgpad beschrijft een ECA-regel (Event-Condition-Action) voor pneumokokkenvaccinatie conform de RIVM-richtlijn.
Zie de [zorgpad narratief pagina](zorgpad-pneumokokken-vaccinatie.html) voor een volledige beschrijving.

### FHIR Resources

| Resource | Beschrijving |
|---|---|
| [PlanDefinition](PlanDefinition-pneumokokken-vaccinatie-indicatie.html) | ECA-regel met stappen en eligibility-condities |
| [Library](Library-pneumokokken-vaccinatie-eligibility.html) | CQL-logica voor het bepalen van de vaccinatie-indicatie |
| [ActivityDefinition vaccineren](ActivityDefinition-pneumokokken-vaccineren.html) | Toediening van het vaccin |
| [ActivityDefinition informed consent](ActivityDefinition-pneumokokken-informed-consent.html) | Communicatie met de patiënt |

### Eligibility

De eligibility-logica is gedefinieerd in [CQL](Library-pneumokokken-vaccinatie-eligibility.html) en evalueert twee groepen:

* **Groep 1**: leeftijd ≥ 60 jaar
* **Groep 2**: actieve medische risicoconditie (zie [ValueSet pneumokokken-risicoconditie](ValueSet-pneumokokken-risicoconditie.html)) of cochleair implantaat
