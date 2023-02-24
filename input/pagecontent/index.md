
{% include new-content-note.md %}

### Introduction

Zie [RIVO NN](http://rivo-noord.nl) en met name [RIVO-Noord Zorgviewer MVP2 Project](https://www.rivo-noord.nl/ontwikkelingen/zorgviewer/).

### Events

| | |
| --- | --- |
| 2020​ | Netwerkzorg Architectuur​ vastgesteld. *TODO: Linkje naar Netwerkzorg Architectuur document.* |
| 2021-nov​ | Zorgviewer Prototype​ middels [Clinical Connectathon Netwerkzorg](https://wiki-dhealth.web.rug.nl/index.php/Clinical_Connectathon_Netwerkzorg_Track) |
| 2022 | [Supernova Zorgviewer MVP1](https://www.salesforce.com/nl/blog/2022/05/supernova.html) |
| 2023 | [RIVO-Noord Zorgviewer MVP2 Project](https://www.rivo-noord.nl/ontwikkelingen/zorgviewer/) |
| 2023-apr | ? *Connectathon Behandelplan (HL7 NL en dHealthLab)*​ |

### Milestones

1. **(dec-2023) MVP2 Zorgviewer opstarten vanuit Epic (MCL, UMCG), Chipsoft (Martini ziekenhuis, Tjongerschans) en Topicus (Dokter Drenthe) en ontsluiten van de BgZ en PDF/a (voor zover ingericht in de bronnen adhv VIPP5 module 1 en 2 en VIPP OPEN)**
    1. Focus ligt eerst op BIG of AGB-Z geregistreerde gebruikers.
1. ? *Uitbreiden vulling BgZ en PDF/a. Hiervoor zijn doorgaans de EPD teams nodig.*
1. ? *Uitbreiden bronnen, uitbreiden opstarters en daarmee gebruikersgroepen.*
1. ? *Uitbreiding zibs buiten BgZ - gegevenssets breder ondersteunen (Acute Zorg, HartNet, Oncologie, PalZorg)*
1. ? *Behandelplan (initieel als relevantie filter) functionaliteit uitbreiden*
1. ? *Patient als gebruiker*

### Bouwblokken

{% include img.html img="bouwblokken.png" caption="Figure 1: Bouwblokken" width="70%" %}

| | |
| --- | --- |
| **Toestemming** | Inwoners van onze zorgregio geven op één keer, op één plek zorgverleners toestemming, dat zij  hun zorggegevens mogen inzien van andere behandelaren en vanuit andere zorgorganisaties. |
| **Authenticatie** | Klopt het dat jij als zorgverlener bent, wie je zegt dat je bent? Werk jij echt bij die zorgorganisatie? Door middel van twee factor authenticatie binnen je eigen informatieomgeving wordt jouw identiteit op twee manieren gecheckt. Met deze authenticatie heb je ook toegang tot de Zorgviewer. |
| **Autorisatie** | Welke informatie van patiënten en cliënten is voor mij  als zorgverlener beschikbaar? Mag je als apotheker bijvoorbeeld de volledige zorginformatie zien of heb je enkel inzag in labuitslagen en medicatie? |
| **Patiëntindex** | De patiëntindex maakt inzichtelijk bij welke zorgorganisaties de patiënt of cliënt bekend is. De zorgviewer bevraagt bij het inloggen door een zorgverlener enkel de informatiesystemen van deze zorgorganisaties. |
| **Logging** | Wie logt wanneer en waar in? Het geautomatiseerde logboek houdt exact bij welke zorgverlener toegang heeft gevraagd en gekregen tot de zorginformatie van een patiënt of cliënt. |
| **Behandelplan** | De stappen die je als patiënt of cliënt doorloopt in het zorgpad. In de zorgviewer zie je een digitale weergave van het -regionaal overeengekomen- zorgpad. Aan de gestructureerde stappen ‘hangen’ informatiecomponenten vast. |
| **Ontsluiting bronsysteem** | Elk informatiesysteem communiceert in een eigen taal. Dit technische bouwblok is een koppeling, die ervoor zorgt, dat alle zorginformatie uit de verschillende bronsystemen in de zorgviewer in dezelfde taal beschikbaar is. |
| **Overname** *TOEKOMST* | Is de zorginformatie -beschikbaar in de zorgviewer, afkomstig van een ander bronsysteem- voor jou als zorgverlener relevant, dan kan je deze selecteren en overnemen in de informatieomgeving van jouw zorgorganisatie. |
| **Zorgviewer** | Alle bouwblokken samen vormen de zorgviewer. De zorgviewer combineert, ontdubbelt en filtert de informatie op basis van jouw behoefte als zorgverlener. De zorgviewer biedt zorgverleners een 360° beeld van de patiënt of cliënt. Opgebouwd uit alle beschikbare zorginformatie, waarvoor de patiënt of cliënt toestemming heeft gegeven. |

**Multi-inzetbaar**: *De bouwblokken zijn niet alleen bruikbaar voor de regionale zorgviewer, maar zijn ook bruikbaar en essentieel voor het delen van diagnostiek, multidisciplinair overleg, monitoring en E-health en de Persoonlijke Gezondheidsomgeving (PGO).* |


### Bouwblokken samenwerking

In onderstaande schema zie je de groepering en interacties (in globale volgorde) tussen de verschillende bouwblokken.

<div>
{% include Zorgviewer-comp-1.svg %}
</div>

### Functionaliteiten

Hierna volgt een schema met functionaliteiten per bouwblok.

<div>
{% include Functionaliteiten.svg %}
</div>

### Acknowledgements

* ...
