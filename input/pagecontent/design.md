### Use Cases

### Actors

Scope is Epic (UMCG, MCL), Chipsoft (Antonius Sneek, Tjongerschans, Wilhelmina, Martini, Nij Smellinge, en Topicus

### System Actors

Note: (?) Probeer definities te hergebruiken uit [IHE Actors](https://gazelle.ihe.net/GMM/tf/actor/listActors.seam), b.v. de [IHE Mobile Profiles IHE_PCC_Suppl_QEDm](https://www.ihe.net/uploadedFiles/Documents/PCC/IHE_PCC_Suppl_QEDm.pdf)

#### Clinical Data Consumer "Raadpleger" - Zorgviewer bouwblok

#### Clinical Data Source "Beschikbaar steller" - Ontsluiten Bronsysteem bouwblok

#### ...

### Sequence Diagrams

#### Opstarten zorgviewer

Initiatie Zorgviewer, opstarten vanuit EPD.

**Van toepassing zijnde standaarden en documentatie**:
* [SMART-on-FHIR 1.0.0](http://hl7.org/fhir/smart-app-launch/1.0.0/)
* [EHR Launch](http://hl7.org/fhir/smart-app-launch/1.0.0/#ehr-launch-sequence)
* [Epic SSO Launching](https://appmarket.epic.com/Article/Index?docid=launching)
* [Chipsoft Web Browser Single-Sign-On](https://developer.zorgplatform.online/digital-care/authenticatie)

<div>
{%include Zorgviewer-seq-1-fhir.svg%}
</div>

#### Bepalen zorgaanbieders

Bepalen zorgaanbieders waarvoor toestemming is gegeven mogelijk nog extra stap om van zorgaanbieder naar endpoint(s) te komen.
<div>
{%include Zorgviewer-seq-2.svg%}
</div>

#### Bevragen bronsystemen zorgaanbieders

Bevragen bronsystemen ontvangkelijke zorgaanbieders

**Van toepassing zijnde standaarden**:
* [Epic Backend Authentication](https://appmarket.epic.com/Article/Index?docid=oauth2&section=BackendOAuth2Guide)
* [Epic Galaxy: Backend System Integrations](https://galaxy.epic.com/Redirect.aspx?DocumentID=100001068&PrefDocID=97042)
* [Chipsoft BgZ API](https://developer.zorgplatform.online/digital-care/api/bgz)

<div>
{%include Zorgviewer-seq-3b.svg%}
</div>

<div>
{%include Zorgviewer-seq-3.svg%}
</div>

#### Zorgviewer Host 

Initiatie Zorgviewer Host, inloggen en patient selectie.
Daarna start sequence "Opstarten".

### Datasets

N.B. Datasets zijn relevante selectie van data elementen met eventueel filters voor een bepaald zorgpad.

#### BgZ+PDF/a

[BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)

Dit is de basis gegevensset zorg, ook wel patient summary genoemd. We behandelen de BgZ als sub-set van zibs. In de BgZ worden de secties beperkt. Bijvoorbeeld de lab uitslagen worden beperkt op klinisch chemisch lab. Deze filters op de zibs beschouwen we als voorbeelden. Je mag ze weglaten, zodat je alle beschikbare lab uitslagen kan krijgen. 

#### Acute Zorg - e-Spoed (#1)

https://nictiz.nl/standaarden/informatiestandaarden/acute-zorg/
https://informatiestandaarden.nictiz.nl/wiki/Landingspagina_Acute_Zorg
https://amigo.nictiz.nl/acute-zorg/opvragingen-bij-huisarts/dataset

#### HartNet - TAVI Proces

#### Oncology

#### Terminology