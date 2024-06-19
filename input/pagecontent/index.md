
### Introduction

Welkom op de implementatiegids van de Zorgviewer. In deze implementatiegids wordt ingegaan op de use-cases en de functionele en technische invulling hiervan. Op de [website van het Regionaal InformatieVoorzieningsOverleg Noord Nederland](http://rivo-noord.nl) kun je meer informatie vinden over de organisatie rondom de Zorgviewer. Op deze website kun je ook meer achtergrond informatie vinden over de [Zorgviewer](https://www.rivo-noord.nl/ontwikkelingen/zorgviewer/).

[Deze video](https://www.youtube.com/watch?v=3C2ol2i4w9s) vertelt je in een notendop wat de Zorgviewer is!

#### Leeswijzer implementatiegids

De implementatiegids bestaat uit een aantal tabbladen. Elk tabblad geeft tekst en uitleg over het bepaalde onderdeel.

##### Tabblad: Requirements

- [Uitgangspunten en Requirements](conformance.html) = uitleg over de uitgangspunten, principes en de uiteindelijke requirements (eisen en wensen) van architectuur en onze gebruikers
- [NEN Conformiteit](nen-normen.html) = de NEN normen van toepassing bij de ontwikkeling van de Zorgviewer
- [Datasets](datasets.html) = content van praktijkvoorbeelden (use-cases) voor het inzetten van de Zorgviewer
- [Must Support](must-support.html) = bevat de specifieke interpretatie van "Must Support" in deze FHIR implementatie gids, zie ook [Must Support in de FHIR standaard](https://hl7.org/fhir/STU3/profiling.html#mustsupport)

##### Tabblad: RAO

Dit tabblad is voor de aanvullingen vanuit het Regionaal Architecten Overleg vanuit RIVO
- [Inzage Zorgnetwerk](zorgnetwerk.html) = overzicht hoe de verschillende systemen acteren rondom de patiënt met als perspectief 'de Zorgviewer'

##### Tabblad: Design

- [Design](design.html) = startpagina bouwteam met het ontwerp van de Zorgviewer
- [Design 2024](design2.html) = startpagina bouwteam met het ontwerp van de Zorgviewer in de 2e fase (2024)
- [Design Achtergrond](design-background.html) = deze pagina beschrijft de verschillende manieren van inzet Zorgviewer

##### Tabblad: Artifact Index

- [Artifact index](artifacts.html) = beschrijving van onder andere de FHIR resources. Deze pagina kan gebruikt worden om de details van de FHIR resources in te zien met een aantal voorbeelden vanuit de verschillende organisaties

##### Tabblad: Checklist & Aansluiten

- [Checklists](checklists.html) = startpagina voor aansluiten van nieuwe zorgaanbieders
- [Thermometer](thermometer.html) = dit wordt gebruikt in gesprekken met nieuwe leveranciers en bevat een aantal vragen die elke keer aan bod komen bij een nieuwe aansluiting

### Historie Zorgviewer

| | |
| --- | --- |
| tbd | *Connectathon Behandelplan (met HL7 NL?)* |
| 2025-feb | Zorgviewer - uitbreiding met Nexus en NEDAP |
| 2024-mrt | Zorgviewer - eerste beperkte live gang met Chipsoft, Epic en VIPlive |
| 2023 tot 2024-apr | [RIVO-Noord Zorgviewer MVP2 Project](https://www.rivo-noord.nl/ontwikkelingen/zorgviewer/) |
| 2022 | [Supernova Zorgviewer MVP1](https://www.salesforce.com/nl/blog/2022/05/supernova.html) |
| 2021-nov | Zorgviewer Prototype middels [dHealthLab](https://dhealth.nl/) Clinical Connectathon Netwerkzorg |
| 2020 | [Netwerkzorg Architectuur 1.0](https://jimdo-storage.global.ssl.fastly.net/file/a647b7db-1537-4f74-a4c0-b56066ae9d07/Netwerkzorgarchitectuur%201.0.pdf) vastgesteld

### Milestones

1. **(dec-2023) MVP2 Zorgviewer opstarten vanuit Epic (MCL, UMCG), Chipsoft (Martini ziekenhuis, Tjongerschans) en Topicus (Dokter Drenthe) en ontsluiten van de BgZ en PDF/a (voor zover ingericht in de bronnen adhv VIPP5 module 1 en 2 en VIPP OPEN)**
    1. Focus ligt eerst op BIG of AGB-Z geregistreerde gebruikers
    1. Parallel: Uitbreiden vulling BgZ en PDF/a. Hiervoor zijn de EPD teams nodig
1. **(mrt-2024) Uitbreiden bronnen en "opstarten vanuit" en daarmee gebruikersgroepen**
    1. Nexus
    1. Nedap
1. Uitbreiding zibs buiten BgZ - gegevenssets breder ondersteunen (Acute Zorg, HartNet, Oncologie, Palliatieve Zorg)
1. Behandelplan functionaliteit uitbreiden, keuze behandelplan en later workflow
1. Patiënt als gebruiker

#### Prioritering content

1. Correspondentie
1. (Radiologie) verslagen
1. Problemen
1. Verrichtingen
1. Behandelaanwijzingingen
1. Laboratorium uitslagen
1. Alert / waarschuwingen
1. Allergieën en intoleranties
1. Medicatie overzicht
1. Vaccinaties
1. Overzicht geplande afspraken


### Bouwblokken

{% include img.html img="bouwblokken.png" caption="Bouwblokken" width="70%" %}

| | |
| --- | --- |
| **[Toestemming](CapabilityStatement-Toestemming.html)** | Inwoners van onze zorgregio geven op één keer, op één plek zorgverleners toestemming, dat zij  hun zorggegevens mogen inzien van andere behandelaren en vanuit andere zorgorganisaties. |
| **[Authenticatie](CapabilityStatement-ZorgviewerHost.html)** | Klopt het dat jij als zorgverlener bent, wie je zegt dat je bent? Werk jij echt bij die zorgorganisatie? Door middel van twee factor authenticatie binnen je eigen informatieomgeving wordt jouw identiteit op twee manieren gecheckt. Met deze authenticatie heb je ook toegang tot de Zorgviewer. |
| **Autorisatie** | Welke informatie van patiënten en cliënten is voor mij als zorgverlener beschikbaar? Mag je als apotheker bijvoorbeeld de volledige zorginformatie zien of heb je enkel inzag in labuitslagen en medicatie?<br/>**N.B. MVP2 heeft 1 autorisatie profiel, namelijk alle Zorgverleners die via de Authenticatie bouwblok toegang hebben tot de Zorgviewer hebben toegang tot de BgZ en Correspondentie van de patient.** |
| **[Patiëntindex](CapabilityStatement-Toestemming.html)** | De patiëntindex maakt inzichtelijk bij welke zorgorganisaties de patiënt of cliënt bekend is. De zorgviewer bevraagt bij het inloggen door een zorgverlener enkel de informatiesystemen van deze zorgorganisaties. |
| **[Logging](CapabilityStatement-Logging.html)** | Wie logt wanneer en waar in? Het geautomatiseerde logboek houdt exact bij welke zorgverlener toegang heeft gevraagd en gekregen tot de zorginformatie van een patiënt of cliënt. |
| **[Behandelplan](CapabilityStatement-Behandelplan.html)** | De stappen die je als patiënt of cliënt doorloopt in het zorgpad. In de zorgviewer zie je een digitale weergave van het -regionaal overeengekomen- zorgpad. Aan de gestructureerde stappen ‘hangen’ informatiecomponenten vast. |
| **[Ontsluiting bronsysteem](CapabilityStatement-OntsluitenBronsysteem.html)** | Elk informatiesysteem communiceert in een eigen taal. Dit technische bouwblok is een koppeling, die ervoor zorgt, dat alle zorginformatie uit de verschillende bronsystemen in de zorgviewer in dezelfde taal beschikbaar is. |
| **Overname** *TOEKOMST* | Is de zorginformatie -beschikbaar in de zorgviewer, afkomstig van een ander bronsysteem- voor jou als zorgverlener relevant, dan kan je deze selecteren en overnemen in de informatieomgeving van jouw zorgorganisatie. |
| **Zorgviewer** | Alle bouwblokken samen vormen de zorgviewer. De zorgviewer combineert, ontdubbelt en filtert de informatie op basis van jouw behoefte als zorgverlener. De zorgviewer biedt zorgverleners een 360° beeld van de patiënt of cliënt. Opgebouwd uit alle beschikbare zorginformatie, waarvoor de patiënt of cliënt toestemming heeft gegeven. |

**Multi-inzetbaar**: *De bouwblokken zijn niet alleen bruikbaar voor de regionale zorgviewer, maar zijn ook bruikbaar en essentieel voor het delen van diagnostiek, multidisciplinair overleg, monitoring en e-Health en de Persoonlijke Gezondheidsomgeving (PGO).* |

**[Zorgviewer Services](zorgviewer-services.html)**

### Bouwblokken samenwerking

In onderstaande schema zie je de groepering en interacties (in globale volgorde) tussen de verschillende bouwblokken.

<div>
{% include Zorgviewer-comp-1.svg width="60%" %}
</div>

### Functionaliteiten

Hierna volgt een schema met functionaliteiten per bouwblok.

<div>
{% include Functionaliteiten.svg width="60%" %}
</div>

#### Bijbehorende Zibs zoeken van een FHIR resource 

* In onderstaande voorbeeld staat "This structure is derived from Zib Problem", deze link gaat naar de volledige zib op Simplifier.net. Op deze site staat onder het tabblad ‘Mappings’ bovenaan in de tabel de directe link naar de zib op zibs.nl.
* Ook in de link onder het kopje ‘Type’, in dit geval ‘Zib Problem’ gaat de link naar Simplifier.net. Het ‘Overview’ tabblad is de FHIR-representatie van de Zib. Daarin zitten de Mappings terug naar de Zib. 
*  In de kolom "Description" staat de naam van het element in de Zib. Via bovenstaande links naar Simplifier.net staat in de kolom ‘Mappings’ de uitgebreide beschrijving.
<div>
{% include img.html img="leeswijzer-fhir-resources-en-zibs.png" width="70%" %}
</div>

### Dependencies

{% include dependency-table.xhtml %}

### Globals

{% include globals-table.xhtml %}