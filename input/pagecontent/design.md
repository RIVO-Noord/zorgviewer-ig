### Use Cases

### Actors

### System Actors

Note: (?) Probeer definities te hergebruiken uit [IHE Actors](https://gazelle.ihe.net/GMM/tf/actor/listActors.seam), b.v. de IHE Mobile Profiles IHE_PCC_Suppl_QEDm](https://www.ihe.net/uploadedFiles/Documents/PCC/IHE_PCC_Suppl_QEDm.pdf)

#### Clinical Data Consumer "Raadpleger" - Zorgviewer bouwblok

#### Clinical Data Source "Beschikbaar steller" - Ontsluiten Bronsysteem bouwblok

#### ...

### Sequence Diagrams

#### Opstarten/Inloggen

Initiatie Zorgviewer, opstarten vanuit EPD. 
<div>
{%include Zorgviewer-seq-1.svg%}
</div>

#### Bepalen zorgaanbieders

Bepalen zorgaanbieders waarvoor toestemming is gegeven mogelijk nog extra stap om van zorgaanbieder naar endpoint(s) te komen.
<div>
{%include Zorgviewer-seq-2.svg%}
</div>

#### Bevragen bronsystemen zorgaanbieders

Bevragen bronsystemen ontvangkelijke zorgaanbieders
<div>
{%include Zorgviewer-seq-3.svg%}
</div>

### Datasets

#### BgZ+PDF/a

[BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)

Dit is de basis gegevensset zorg, ook wel patient summary genoemd. We behandelen de BgZ als sub-set van zibs. In de BgZ worden de secties beperkt. Bijvoorbeeld de lab uitslagen worden beperkt op klinisch chemisch lab. Deze filters op de zibs beschouwen we als voorbeelden. Je mag ze weglaten, zodat je alle beschikbare lab uitslagen kan krijgen. 

#### HartNet - TAVI Proces

#### Oncology

#### SEH

#### Terminology