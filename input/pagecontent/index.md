
### Introductie

Welkom op de implementatiegids van de Zorgviewer. Deze implementatiegids hoort bij de [Zorgviewer](https://www.rivo-noord.nl/ontwikkelingen/zorgviewer) en beschrijft de functies, technische achtergrond en implementatie van de Zorgviewer. De implementatiegids is voornamelijk bedoeld voor (regionale) architecten, ontwikkelaars, IT-specialisten, functionele ontwerpers en Projectleiders.

De Zorgviewer heeft als missie om zorgverleners snel, veilig en overzichtelijk toegang te geven tot actuele medische informatie van de patiënt – ongeacht waar deze informatie is opgeslagen.

Door gegevens uit verschillende zorgsystemen samen te brengen, helpt de Zorgviewer bij:
- Betere samenwerking tussen zorgverleners
- Minder fouten door ontbrekende informatie
- Snellere en beter onderbouwde besluitvorming
- Minder administratieve druk voor de zorgprofessional

De Zorgviewer ondersteunt netwerkzorg en ketenzorg, waarbij meerdere organisaties samen zorg verlenen aan één patiënt. Het doel is altijd: de juiste zorg op het juiste moment, met de juiste informatie. Op de website van het [Regionaal InformatieVoorzieningsOverleg Noord Nederland](http://rivo-noord.nl) kun je meer informatie vinden over de organisatie rondom de Zorgviewer.

### Achtergrond

Zorg wordt steeds vaker geleverd in netwerken. Ondersteund met kreten als 'Juiste Zorg op de Juiste Plaats door de Juiste Zorgverlener <strong>met de Juiste (Technische) Ondersteuning</strong>`. Samen met RIVO en regionale architecten (RAO) is in 2020 een [netwerkzorgarchitectuur](https://storage.e.jimdo.com/file/a647b7db-1537-4f74-a4c0-b56066ae9d07/Netwerkzorgarchitectuur%201.0.pdf) opgesteld. Het doel: een compleet beeld van de patiënt.

[Deze video](https://www.youtube.com/watch?v=3C2ol2i4w9s) laat in het kort zien wat de Zorgviewer is.

Eerdere programma’s zoals Registratie aan de Bron, VIPP en MedMij/PGO richtten zich op goede registratie aan de bron. Nu ligt de focus op goede technische ondersteuning voor zorgverleners. Hiervoor zijn MVP-trajecten gestart met leveranciers. Al snel bleek hoe complex het zorglandschap is. Hieruit ontstond het RIVO-Noord Zorgviewer MVP2-project. Dit project ontwikkelt de Zorgviewer intern bij het UMCG. Een team van ontwikkelaars en architecten werkt aan het ontwerp en de bouw. De context en uitleg vind je in deze gids. Gebruik de leeswijzer hieronder om te starten.

<strong>Historie Zorgviewer</strong>

| Jaar  | Ontwikkeling                                                                                                                                                                                                                                                                                                                                                                        |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Heden | Uitvoering van de opschaling: ontsluiten van meer gegevens, systemen en organisaties                                                                                                                                                                                                                                                                                                |
| 2024  | Zorgviewer mag door met opschaling en financiering bij vier noordelijke zorginstellingen: goedkeuring van het [Transformatieplan](https://www.dejuistezorgopdejuisteplek.nl/programmas/integraal-zorgakkoord/iza-onderdelen/transformatieplannen/goedgekeurde-voorstellen-en-plannen/positief-beoordeelde-snelle-toets-zorgviewer/positief-beoordeelde-snelle-toets-zorgviewer.pdf) |
| 2023  | [RIVO-Noord Zorgviewer MVP2 Project](https://www.rivo-noord.nl/zorgviewer). Livegang met een beperkt aantal gebruikers (april 2024)                                                                                                                                                                                                                                                 |
| 2022  | [Supernova Zorgviewer MVP1](https://www.salesforce.com/nl/blog/2022/05/supernova.html)                                                                                                                                                                                                                                                                                              |
| 2021  | Zorgviewer Prototype middels [dHealthLab](https://dhealth.nl/) Clinical Connectathon Netwerkzorg                                                                                                                                                                                                                                                                                    |
| 2020  | [Netwerkzorg Architectuur 1.0](https://jimdo-storage.global.ssl.fastly.net/file/a647b7db-1537-4f74-a4c0-b56066ae9d07/Netwerkzorgarchitectuur%201.0.pdf) vastgesteld                                                                                                                                                                                                                 |

### Leeswijzer implementatiegids

Gebruik deze leeswijzer om snel de juiste informatie te vinden. Elk tabblad in de gids behandelt een specifiek onderdeel van de Zorgviewer. Elk tabblad geeft tekst en uitleg over het specifieke onderdeel.

#### Requirements

Informatie over uitgangspunten, normen en gegevensbronnen.
- [Uitgangspunten en Requirements](requirements.html): beschrijft de visie, gebruikerswensen en architectuurprincipes.
- [NEN Conformiteit](nen-normen.html): beschrijft de kwaliteits- en veiligheidsnormen (zoals NEN 7510) die van toepassing zijn bij de ontwikkeling van de Zorgviewer.
- [Datasets](datasets.html): beschrijft concrete praktijkvoorbeelden (use-cases) met gegevens die gebruikt worden.
- [Must Support](must-support.html): geeft toelichting op het verplichte gebruik van bepaalde gegevensvelden binnen de FHIR-standaard.

#### Design

- [Design](design.html): overzicht van het volledige ontwerp van de Zorgviewer

#### RAO

- Onderwerpen en documenten uit het RIVO-Noord Architectuur Overleg (RAO).

#### Artifact Index

- [Artifact index](artifacts.html): geeft een beschrijving van de gebruikte FHIR-resources, met voorbeelden per systeem en organisatie.

Bijbehorende Zibs zoeken vanuit een FHIR resource:

- In onderstaande voorbeeld staat "This structure is derived from Zib Problem", deze link gaat naar de volledige zib op Simplifier.net. Op deze site staat onder het tabblad ‘Mappings’ bovenaan in de tabel de directe link naar de zib op zibs.nl.
- Ook in de link onder het kopje ‘Type’, in dit geval ‘Zib Problem’ gaat de link naar Simplifier.net. Het ‘Overview’ tabblad is de FHIR-representatie van de Zib. Daarin zitten de Mappings terug naar de Zib. 
- In de kolom "Description" staat de naam van het element in de Zib. Via bovenstaande links naar Simplifier.net staat in de kolom ‘Mappings’ de uitgebreide beschrijving.
<div>
{% include img.html img="leeswijzer-fhir-resources-en-zibs.png" width="70%" %}
</div>

### Dependencies

{% include dependency-table.xhtml %}