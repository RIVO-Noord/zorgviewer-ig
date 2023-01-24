### Use Cases

### Actors

### System Actors

#### "Raadpleger" - Zorgviewer bouwblok

#### "Beschikbaar steller" - Ontsluiten Bronsysteem bouwblok

### Toestemming

#### ...

### Sequence Diagrams

#### Opstarten/Inloggen

Initiatie Zorgviewer, opstarten vanuit EPD. 
<div>
{%include Zorgviewer-seq-1.svg%}
</div>

#### Bepalen zorgaanbieders

Bepalen zorgaanbieders waarvoor toestemming is gegeven\nmogelijk nog extra stap om van zorgaanbieder naar endpoint(s) te komen.
<div>
{%include Zorgviewer-seq-2.svg%}
</div>

#### Bevragen bronsystemen zorgaanbieders

Bevragen bronsystemen\nontvangkelijke zorgaanbieders
<div>
{%include Zorgviewer-seq-3.svg%}
</div>

#### Gegevensverzoek

Gegevensverzoek = FHIR request + filters adhv Behandelplan
<div>
{%include Zorgviewer-seq-4.svg%}
</div>

### Datasets

#### BgZ+PDF/a

#### HartNet TAVI

#### Oncology

#### SEH

#### Terminology