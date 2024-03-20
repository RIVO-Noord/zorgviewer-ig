<style>table, td, th { border: 1px solid black; padding:5px; }</style>

{% include future-note.md %}

Deze pagina beschrijft de interacties tussen de bouwblokken voor het opstarten van de zorgviewer en het ontsluiten van de bronsystemen.
Dit is de startpagina voor het bouwteam.

### Actors

Scope MVP2024 (MVP3) is Nexus (Treant, OZG), Nedap.

### Sequence Diagrams

### Opstarten zorgviewer: Nexus

**Van toepassing zijnde standaarden en documentatie**:
* SAML
* *toekomst* SMART-on-FHIR en/of FHIRcast

### Bevragen bronsysteem: Nexus

**Van toepassing zijnde standaarden en documentatie**:
* Nexus Cloud-connect
* *binnenkort* [TA Notified Pull]( https://twiin-afsprakenstelsel.scrollhelp.site/ta12/10-2-5-tta-fhir-authentication-authorization)

### Opstarten zorgviewer: Nedap


### Bevragen bronsysteem: Nedap

**Van toepassing zijnde standaarden en documentatie**:
* [Ons-API zibs & FHIR](https://ons-api.nl/techniek/FHIR-ZIBS/FHIR-ZIBS-GettingStartedWithFhir.html)

### Nuts Toepassing Zorginzage Bolt (generiek)

**Van toepassing zijnde standaarden en documentatie**:
* [Zorginzage 2022 Bolt](https://nuts-foundation.gitbook.io/bolts/zorginzage/zorginzage-2022)

<div>
{% include NutsXzorgviewer.svg %}
</div>