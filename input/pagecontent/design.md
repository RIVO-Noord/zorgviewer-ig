Deze pagina beschrijft de interacties tussen de systemen. 
Dit is de startpagina van het bouwteam.

### Use Cases

### Actors

Scope is Epic (UMCG, MCL), Chipsoft (Antonius Sneek, Tjongerschans, Wilhelmina, Martini, Nij Smellinge, en Topicus

### System Actors

Note: (?) Probeer definities te hergebruiken uit [IHE Actors](https://gazelle.ihe.net/GMM/tf/actor/listActors.seam), b.v. de [IHE Mobile Profiles IHE_PCC_Suppl_QEDm](https://www.ihe.net/uploadedFiles/Documents/PCC/IHE_PCC_Suppl_QEDm.pdf)

* Clinical Data Consumer "Raadpleger" - Zorgviewer bouwblok
* Clinical Data Source "Beschikbaar steller" - Ontsluiten Bronsysteem bouwblok
* Authorization Client, Result Aggregator - Zorgviewer bouwblok
* Authorization Server - Authenticatie bouwblok
* Provider Information Directory - Zorgverlener Registry bouwblok


### Sequence Diagrams

#### Opstarten zorgviewer

Eerst opstarten Zorgviewer Host, inloggen en patient selectie en vervolgens opstarten van de Zorgviewer.

**Van toepassing zijnde standaarden en documentatie**:
* [SMART-on-FHIR 1.0.0](http://hl7.org/fhir/smart-app-launch/1.0.0/)
* [EHR Launch](http://hl7.org/fhir/smart-app-launch/1.0.0/#ehr-launch-sequence)
* [Epic SSO Launching](https://appmarket.epic.com/Article/Index?docid=launching)
* [Chipsoft Web Browser Single-Sign-On](https://developer.zorgplatform.online/digital-care/authenticatie)

<div>
{% include Zorgviewer-seq-1-fhir.svg %}
</div>

#### Bepalen zorgaanbieders

Bepalen zorgaanbieders waarvoor toestemming is gegeven mogelijk nog extra stap om van zorgaanbieder naar endpoint(s) te komen.
<div>
{% include Zorgviewer-seq-2.svg %}
</div>

#### Bevragen bronsystemen zorgaanbieders

Bevragen bronsystemen ontvangkelijke zorgaanbieders

**Van toepassing zijnde standaarden en documentatie**:
* [MedMij BgZ 2017 FHIR](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
* [Epic Backend Authentication](https://appmarket.epic.com/Article/Index?docid=oauth2&section=BackendOAuth2Guide)
* [Epic Galaxy: Backend System Integrations](https://galaxy.epic.com/Redirect.aspx?DocumentID=100001068&PrefDocID=97042)
* [Epic FHIR](https://appmarket.epic.com/Sandbox/)
* [Chipsoft BgZ API](https://developer.zorgplatform.online/digital-care/api/bgz)
* [Chipsoft Service Authenticatie](https://developer.zorgplatform.online/digital-care/authenticatie)

<div>
{% include Zorgviewer-seq-3.svg %}
</div>

#### Bevragen bronsystemen zorgaanbieders / documenten

**Van toepassing zijnde standaarden en documentatie**:
* [MedMij PDF/a](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA)
* [Chipsoft Documenten API](https://developer.zorgplatform.online/digital-care/api/document)

<div>
{% include Zorgviewer-seq-4.svg %}
</div>

Op direct de PDF (application.pdf) te krijgen moet je in de request Accept Headers NIET om application/fhir+xml of "application/fhir+json" vragen. Zie http://hl7.org/fhir/STU3/binary.html#rest anders moet je zelf de PDF (of HTML) decoden obv de Binary.content BASE64.
Zie ook MedMij 4.3.2.2 Response Message https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_PDFA#Find_and_retrieve_existing_PDF.2FA_document.28s.29.
    