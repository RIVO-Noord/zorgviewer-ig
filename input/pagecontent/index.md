
### Introductie van de implementatiegids (IG)

Welkom op de implementatiegids van de Zorgviewer. In deze implementatiegids wordt ingegaan op de use-cases en de functionele en technische invulling hiervan. Op de [website van het Regionaal InformatieVoorzieningsOverleg Noord Nederland](http://rivo-noord.nl) kun je meer informatie vinden over de organisatie rondom de Zorgviewer. Op deze website kun je ook meer achtergrond informatie vinden over de [Zorgviewer](https://www.rivo-noord.nl/ontwikkelingen/zorgviewer/).

### Achtergrond

[Deze video](https://www.youtube.com/watch?v=3C2ol2i4w9s) vertelt je in een notendop wat de Zorgviewer is!

Tegenwoordig is het bestaan van ketenzorg en netwerkzorg de norm. Ondersteund met kreten als 'Juiste Zorg op de Juiste Plaats door de Juiste Zorgverlener <strong>met de Juiste (Technische) Ondersteuning</strong>. 

Samen met het RIVO en de regionale architecten (RAO) is er in 2020 een [netwerkzorgarchitectuur](https://jimdo-storage.global.ssl.fastly.net/file/a647b7db-1537-4f74-a4c0-b56066ae9d07/Netwerkzorgarchitectuur%201.0.pdf) opgeleverd, waar men spreekt over het neerzetten van een 360 graden beeld van de patiënt. In eerdere programma's rondom Registratie aan de Bron, VIPP, MedMij/PGO is het de bedoeling geweest om de registratie (aan de bron) recht te trekken. 

Nu zijn wij in een fase gekomen dat onze zorgverleners in de regio behoefte krijgen aan <strong>een Juiste (Technische) Ondersteuning</strong>. Om dit te realiseren is er gekozen om een aantal MVP trajecten te starten met leveranciers. Duidelijk is geworden hoe complex het zorglandschap en de zorgcontext is. Daaruit is een RIVO-Noord Zorgviewer MVP2 project ontstaan, namelijk de ontwikkeling van een Zorgviewer door de interne ontwikkelaars van het UMCG namens het RIVO.

Het RIVO-Noord Zorgviewer MVP2 Project wordt door een team vanuit het UMCG getrokken. Een aantal ontwikkelaars en architecten houden zich bezig met het design en ontwikkeling van de Zorgviewer. De context van de Zorgviewer kun je vinden in deze implementatiegids. Gebruik de Leeswijzer implementatiegids om je te oriënteren.

#### Historie Zorgviewer

| | |
| --- | --- |
| 2023 tot heden | [RIVO-Noord Zorgviewer MVP2 Project](https://www.rivo-noord.nl/zorgviewer). Livegang met een beperkt aantal gebruikers (april 2024)|
| 2022 | [Supernova Zorgviewer MVP1](https://www.salesforce.com/nl/blog/2022/05/supernova.html) |
| 2021-nov | Zorgviewer Prototype middels [dHealthLab](https://dhealth.nl/) Clinical Connectathon Netwerkzorg |
| 2020 | [Netwerkzorg Architectuur 1.0](https://jimdo-storage.global.ssl.fastly.net/file/a647b7db-1537-4f74-a4c0-b56066ae9d07/Netwerkzorgarchitectuur%201.0.pdf) vastgesteld

#### Leeswijzer implementatiegids

De implementatiegids bestaat uit een aantal tabbladen met sub-tabbladen. Elk tabblad geeft tekst en uitleg over het bepaalde onderdeel.

<strong>Tabblad: Requirements</strong>
- [Uitgangspunten en Requirements](requirements.html) = uitleg over de uitgangspunten, principes en de uiteindelijke requirements (eisen en wensen) van architectuur en onze gebruikers
- [NEN Conformiteit](nen-normen.html) = de NEN normen van toepassing bij de ontwikkeling van de Zorgviewer
- [Datasets](datasets.html) = content van praktijkvoorbeelden (use-cases) voor het inzetten van de Zorgviewer
- [Must Support](must-support.html) = bevat de specifieke interpretatie van "Must Support" in deze FHIR implementatie gids, zie ook [Must Support in de FHIR standaard](https://hl7.org/fhir/STU3/profiling.html#mustsupport)

<strong>Tabblad: Design</strong>
- [Design](design.html) = het volledige ontwerp van de Zorgviewer

<strong>Tabblad: RAO</strong>
Dit tabblad is voor de aanvullingen vanuit het Regionaal Architecten Overleg vanuit RIVO
- [Inzage Zorgnetwerk](zorgnetwerk.html) = overzicht hoe de verschillende systemen acteren rondom de patiënt met als perspectief 'de Zorgviewer'

<strong>Tabblad: Artifact Index</strong>
- [Artifact index](artifacts.html) = beschrijving van onder andere de FHIR resources. Deze pagina wordt gebruikt om de details van de FHIR resources in te zien met een aantal voorbeelden vanuit de verschillende organisaties en systemen

    Bijbehorende Zibs zoeken vanuit een FHIR resource:

* In onderstaande voorbeeld staat "This structure is derived from Zib Problem", deze link gaat naar de volledige zib op Simplifier.net. Op deze site staat onder het tabblad ‘Mappings’ bovenaan in de tabel de directe link naar de zib op zibs.nl.
* Ook in de link onder het kopje ‘Type’, in dit geval ‘Zib Problem’ gaat de link naar Simplifier.net. Het ‘Overview’ tabblad is de FHIR-representatie van de Zib. Daarin zitten de Mappings terug naar de Zib. 
* In de kolom "Description" staat de naam van het element in de Zib. Via bovenstaande links naar Simplifier.net staat in de kolom ‘Mappings’ de uitgebreide beschrijving.
<div>
{% include img.html img="leeswijzer-fhir-resources-en-zibs.png" width="70%" %}
</div>

[Toelichting op het format](https://hl7.org/fhir/STU3/formats.html#table)

### Dependencies

{% include dependency-table.xhtml %}

