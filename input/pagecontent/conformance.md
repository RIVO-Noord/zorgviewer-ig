### Uitgangspunten

1. Registratie aan de Bron - zorg voor juiste bron registratie, ontsluit wat er is
1. Internet first - geen besloten netwerken
1. Standards based - nationaal, internationaal (universal)

1. De architectuur moet generiek zijn en voor verschillende zorgpaden en specialismen toepasbaar zijn.
1. Alle actoren in het zorgpad hebben inzage in dezelfde informatie, op basis van de gegeven toestemming van de patiënt en de behandelrelatie met die patiënt.
1. Informatie blijft primair bij de bron en wordt zo min mogelijk gerepliceerd
1. Informatie wordt benaderd vanuit het eigen informatiesysteem
1. Informatie kan worden overgenomen in het eigen informatiesysteem wanneer daaraan behoefte is
1. De informatie wordt gepresenteerd op basis van de specifieke informatiebehoefte, bijvoorbeeld
1. * Actief zorgpad
1. * Alle zorgepisodes van de afgelopen 2 jaar
1. * Alle benodigde informatie voor een gedefinieerd specifiek zorgpad
1. * Alle labuitslagen van de afgelopen 4 maanden
1. De architectuur gaat uit van een haalbare transitie vanuit bestaande werkwijzen en technieken. Deze transitie wordt verder beschreven in paragraaf 6
1. De architectuur voldoet aan wet- en regelgeving en maakt compliancy op het gebied van privacy en security mogelijk.
1. De architectuur rust op de verleende toestemming door de patiënt. De patiënt bepaalt of gegevens worden gedeeld, en heeft inzicht in wie de gegevens raadpleegt of overneemt.
1. De architectuur is gebaseerd op standaarden en vendor-neutraal, taal en transport zijn gescheiden zodat vendor-lock-in wordt voorkomen

### Requirements

#### Zorgviewer

**Definitie**: De Zorgviewer toont data uit de aangesloten bronsystemen, ordent deze, en biedt de raadpleger de mogelijkheid van filtering van de data op basis van het zorgpad of persoonlijke instellingen.

**Requirements**:
1. De zorgviewer bevat zelf geen patiëntgebonden data, en wijzigt geen data in de bronsystemen. 
1. De zorgviewer attendeert de raadpleger op conflicten in het tonen van data van verschillende bronnen waar ze niet overeenkomen. 
1. De zorgviewer attendeert de raadpleger op belangrijke lacunes in het eigen informatiesysteem: specificeren wat en welke dat zijn. Centraal vastleggen en dat alerten. 
1. De zorgviewer integreert in de informatieomgeving van de raadpleger (SMART-in-FHIR)
1. De zorgviewer biedt de mogelijkheid om informatie te tonen op basis van de plek van de patiënt in het zorgpad

#### Toestemming

**Definitie**: AVG: de expliciete specifieke, vrij gegeven toestemming tot het beschikbaar stellen van zorginformatie door de patiënt|

#### Identiteit

**Definitie**: Identiteit wordt gebruikt voor: 
* Vastleggen van logging 
* Bepalen van gerechtigde dataset 
* Basis voor authenticatie  

**Requirements**:
1. Gebruik van reeds in organisatie in gebruik zijnde ID’s.
1. ID Zorgaanbieder = URA 
1. ID Zorgverlener = Epic user = AD user & BIG nummer (voor bepalen specialisme ~ rol) 

#### Authorisatie

**Definitie**: (NEN) Rechten die een identiteit (zorgverlener, client / patient) heeft voor toegang tot cliëntgegevens.

#### Logging

**Definitie**: Stelselmatige geautomatiseerde registratie van gegevens rond de toegang tot het patiëntdossier, die controle van de rechtmatigheid ervan mogelijk maakt (NEN 7513).

**Requirements**:
1. Bij opvragen van gegevens dient een naam/user/id mee gestuurd te worden door het aanroepende instelling zodat dit bij bron systeem kan worden gelogd. 
1. Logging dient te gebeuren in het bronsysteem (dat is al actief) 
1. Logging dient te gebeuren op inzage van de gegevens, maar ook op overname. Bij overname dient dus een extra logregel te worden toegevoegd 
1. De Zorgviewer logt voor audit log naar een generieke log service.. (zie vragen) 
1. Logging volgens NEN 7513 en ATNA  
1. De Zorgviewer biedt zelf technische logging. 

#### Ontsluiting bronsysteem

**Definitie**: Het bouwblok ‘Ontsluiting bronsystemen’ draagt zorg voor het aanleveren van de informatie uit de bronsystemen in een formaat dat door de zorgviewer kan worden verwerkt (Zibs/FHIR).

**Requirements**:
1. Ontsluit minimaal de volgende gegevens in MVP2: de 28 BGZ-Zibs + de correspondentie (radiologie brieven, specialisten brieven, notities, ontslag brief) 
1. Zorginformatiebouwstenen conform NICTIZ publicatie 2017, https://zibs.nl/wiki/ZIB_Publicatie_2017(NL), alleen de 28 BGZ-Zibs,  
1. [Zibs 2017](https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/) en [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017) obv [HL7 FHIR STU3](http://hl7.org/fhir/STU3/) 
1. Individuele ZIBS moeten kunnen worden aangeleverd 
1. Vraag richting bronsysteem op basis van BSN, URA en Zorgverlener gegevens moet mee voor autorisatie en logging. 
1. Bron systeem checkt ook bij Mitz of iets mag nadat hij call heeft gehad van de zorgviewer.

**Kandidaat solutions**:
* [Epic Interconnect](https://fhir.epic.com)
* [Chipsoft Zorgplatform](https://developer.zorgplatform.online/) 
* Nexus via Foundra
* Topicus 
* Intersystems Iris Healthshare 
* XDS-NN 
* Een "Docker" voor een bron die geheel of gedeeltelijk nog niet conform zorgviewer-ig kan. Bij UMCG zit bijvoorbeeld Iris Healthshare er tussen voor Patient Context. 

### Data Requirements

### Dependencies

[zibs2017 Wiki](https://zibs.nl/wiki/HCIM_Release_2017(EN))

{% include dependency-table.xhtml %}
