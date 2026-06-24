### Zorgpad Pneumokokkenvaccinatie

Dit zorgpad ondersteunt de huisarts bij het identificeren van patiënten die in aanmerking komen voor pneumokokkenvaccinatie en het begeleiden van het vaccinatieproces, conform de [RIVM-richtlijn pneumokokkenvaccinatie](https://lci.rivm.nl/pneumokokkenvaccinatie).

### Doelgroepen

Het RIVM onderscheidt twee risicogroepen:

| Groep | Criterium |
|---|---|
| **Groep 1** | Leeftijd ≥ 60 jaar |
| **Groep 2** | Actieve medische risicoconditie (asplenie, cochleair implantaat, immuundeficiëntie e.a.) |

### Beslislogica

De eligibility wordt bepaald via CQL-logica in de [Library pneumokokken-vaccinatie-eligibility](Library-pneumokokken-vaccinatie-eligibility.html).
Vaccinatie wordt aanbevolen als de patiënt in aanmerking komt én:

* nooit gevaccineerd is, **of**
* het hervaccinatie-interval van 5 jaar verstreken is.

Voor patiënten met (functionele) asplenie gelden aanvullende regels (`Speciale Instructies Vereist`).

### Processtappen

De stappen zijn gemodelleerd als acties in de [PlanDefinition](PlanDefinition-pneumokokken-vaccinatie-indicatie.html):

| Stap | Titel | Actie |
|---|---|---|
| 1 | Identificeer Vaccinatie-indicatie | Evalueer groep 1 (leeftijd) en groep 2 (medische conditie) |
| 1a | Groep 1: Leeftijd ≥ 60 | Leeftijdscheck via CQL expressie `Groep 1 Eligible` |
| 1b | Groep 2: Medische risicoconditie | Conditie- en Device-check via `Groep 2 Eligible` |
| 1c | Speciale groep: Asplenie | Aanvullend vaccinatieschema via `Speciale Instructies Vereist` |
| 2 | Aanbeveling Vaccinatie | Bepaal of (her)vaccinatie aanbevolen is |
| 3 | Informed Consent | Informeer patiënt ([ActivityDefinition](ActivityDefinition-pneumokokken-informed-consent.html)) |
| 4 | Uitnodigen voor Vaccinatie | Plan afspraak |
| 5 | Toediening Vaccin | Registreer als Immunization ([ActivityDefinition](ActivityDefinition-pneumokokken-vaccineren.html)) |

### FHIR Artifact Overzicht

Conform het patroon van de [HL7 FHIR Clinical Practice Guidelines IG](http://hl7.org/fhir/uv/cpg/) zijn de volgende resources gedefinieerd:

| Type | Resource | Beschrijving |
|---|---|---|
| PlanDefinition | [pneumokokken-vaccinatie-indicatie](PlanDefinition-pneumokokken-vaccinatie-indicatie.html) | ECA-regel met alle stappen |
| Library | [pneumokokken-vaccinatie-eligibility](Library-pneumokokken-vaccinatie-eligibility.html) | CQL eligibility-logica |
| ActivityDefinition | [pneumokokken-vaccineren](ActivityDefinition-pneumokokken-vaccineren.html) | Vaccinatie toediening (ProcedureRequest) |
| ActivityDefinition | [pneumokokken-informed-consent](ActivityDefinition-pneumokokken-informed-consent.html) | Patiëntcommunicatie (CommunicationRequest) |
| ValueSet | [pneumokokken-risicoconditie](ValueSet-pneumokokken-risicoconditie.html) | Medische risicogroepen |
| ValueSet | [pneumokokken-vaccins](ValueSet-pneumokokken-vaccins.html) | Toegestane vaccins |
| ValueSet | [pneumokokken-implantaat](ValueSet-pneumokokken-implantaat.html) | Cochleaire implantaten |
