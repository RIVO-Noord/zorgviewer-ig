### Uitgangspunten

1. De architectuur moet generiek zijn en voor verschillende zorgpaden en specialismen toepasbaar zijn.
1. Alle actoren in het zorgpad hebben inzage in dezelfde informatie, op basis van de gegeven toestemming van de patiënt en de behandelrelatie met die patiënt.
1. Informatie blijft primair bij de bron en wordt zo min mogelijk gerepliceerd
    * Registratie aan de Bron - zorg voor juiste bron registratie, ontsluit wat er is
1. Informatie wordt benaderd vanuit het eigen informatiesysteem
1. Informatie kan worden overgenomen in het eigen informatiesysteem wanneer daaraan behoefte is
1. De informatie wordt gepresenteerd op basis van de specifieke informatiebehoefte, bijvoorbeeld
    * Actief zorgpad
    * Alle zorgepisodes van de afgelopen 2 jaar
    * Alle benodigde informatie voor een gedefinieerd specifiek zorgpad
    * Alle labuitslagen van de afgelopen 4 maanden
1. De architectuur gaat uit van een haalbare transitie vanuit bestaande werkwijzen en technieken.
1. De architectuur voldoet aan wet- en regelgeving en maakt compliancy op het gebied van privacy en security mogelijk.
1. De architectuur rust op de verleende toestemming door de patiënt. De patiënt bepaalt of gegevens worden gedeeld, en heeft inzicht in wie de gegevens raadpleegt of overneemt.
1. De architectuur is gebaseerd op standaarden en vendor-neutraal, taal en transport zijn gescheiden, zodat vendor-lock-in wordt voorkomen
    * Standards based - nationaal, internationaal (universal)
    * Internet first - geen besloten netwerken, zodat network-lock-in wordt voorkomen

### Requirements

#### Zorgviewer Host
**Definitie**: Informatieomgeving (EPD, ECM, Portal) van de gebruiker van waaruit de Zorgviewer opstart wordt.

**Requirements**:
1. De zorgviewer host draagt zorg voor (lokale) authenticatie van de gebruiker.
1. De zorgviewer host voorziet in patient selectie en toets behandelrelatie.
1. De zorgviewer host kan de zorgviewer opstarten met context (gebruiker en huidige patient).
1. Bij de zorgviewer host kan de zorgviewer minimaal volledige (via context doorgegeven id's) patient en gebruiker gegevens opvragen
    1. Conform [SMART-on-FHIR 1.0.0 EHR launch](http://hl7.org/fhir/smart-app-launch/1.0.0/index.html#ehr-launch-sequence)

**Solutions**:
1. Epic
1. Chipsoft
1. Topicus
1. Zorgviewer Launcher - Los voor gebruikers zonder EPD/ECM

#### Zorgviewer

**Definitie**: De Zorgviewer toont data uit de aangesloten bronsystemen, ordent deze, en biedt de gebruiker de mogelijkheid van filtering van de data op basis van het zorgpad of persoonlijke instellingen.

**Requirements**:
1. De zorgviewer bevat zelf geen patiëntgebonden data, en wijzigt geen data in de bronsystemen. 
1. De zorgviewer integreert in de informatieomgeving van de gebruiker.
    1. Conform [SMART-on-FHIR 1.0.0 EHR launch](http://hl7.org/fhir/smart-app-launch/1.0.0/index.html#ehr-launch-sequence)
1. Het moet mogelijk zijn om aan te geven dat het een spoedsituatie betreft. In spoedsituatie is altijd toegang toegestaan.
    1. Als er geen toegang toestemming is, dan spoedoptie "knop" weergeven.
1. De zorgviewer attendeert de gebruiker op conflicten in het tonen van data van verschillende bronnen waar ze niet overeenkomen. 
1. De zorgviewer attendeert de gebruiker op belangrijke lacunes in het eigen informatiesysteem: specificeren wat en welke dat zijn. Centraal vastleggen en dat alerten. 
1. De zorgviewer biedt de mogelijkheid om informatie te tonen op basis van de plek van de patiënt in het zorgpad
1. De zorgviewer fasciliteert in ontdubbelen
    1. Zie voor details paragrafen 3.2.9.1 Ontdubbelen en 3.2.9.2 Duplicaatdetectie van de [BgZ MSZ Informatistandaard](https://informatiestandaarden.nictiz.nl/wiki/BgZ:V1.0_BgZ_MSZ_Informatiestandaard)

#### Toestemming

**Definitie**: AVG: de expliciete specifieke, vrij gegeven toestemming tot het beschikbaar stellen van zorginformatie door de patiënt
{% include img.html img="mitz-toestemming.png" caption="Figure 2: uit MITZ Toestemming Documentatie" %}

**Kandidaat solutions**:
1. INITIEEL: "plain" FHIR server met vulling volgens FHIR IF van [MITZ "Open autorisatievraag"](https://drive.google.com/file/d/1cHgsz-OORw5QMoGj5Lh_475Bu_TpDHvj/view)
1. MITZ 

#### Identiteit

**Definitie**: Identiteit wordt gebruikt voor: 
* Vastleggen van logging 
* Bepalen van gerechtigde dataset 
* Basis voor authenticatie  

**Requirements**:
1. Gebruik van reeds in organisatie in gebruik zijnde ID’s.
1. ID Zorgaanbieder = URA - Een URA-code is een uniek nummer dat een zorgaanbieder heeft voor elektronische communicatie van zorgdata. URA is een afkorting van UZI Registratie Abonneenummer. UZI staat voor Unieke Zorgaanbieder Identificatienummer.
    1. UMCG : via managingOrganization bij Patient/Practitioner
    1. Martini : 
    1. ...
1. ID Zorgverlener = Lokale identiteit user
    1. UMCG -> Epic user = AD user + AGB-Z
    1. Chipsoft -> AGZ-Z
    1. Topicus
    1. Losse Zorgviewer Launcher -> BIG-Nummer
1. Lokale identitie MOET AGB-Z of BIG-Nummer als attribuut hebben, zodat we via de Zorgverlener Registry de specialismen en rollen kunnen opvragen
1. Vektis AGB-medische specialismen

**Details**:
1. AGB-Z URI: http://fhir.nl/fhir/NamingSystem/agb-z
1. BIG-Nummer URI: http://fhir.nl/fhir/NamingSystem/big - niet in Epic en in Chipsoft, wel voor fysiotherapeuten en verloskundigen
1. COD016-VEKT (Vektis AGB-medische specialismen) OID: 2.16.840.1.113883.2.4.6.7
1. URA OID: http://fhir.nl/fhir/NamingSystem/ura (e.g 12345678) **TODO: Hoe kom ik aan de URA nummers??**

#### Zorgverlener Directory

**A.k.a.**
1. Zorgverlener Registry/Directory
1. Zorgaanbieder Registry/Directory
1. Provider Directory (IHE)
1. Adresering

**Definitie**: Register met Identititeiten en attributen van zorgaanbieders en zorgverleners. Voorbeelden zijn volledige naam, maar ook technische endpoints.
>Volledige naam: "F. Heuvel (Cardiologie (cardioloog)) in het UMCG"
>FHIR Base voor UMCG: https://prd.epic.umcg.nl/fhir/STU3 

**Kandidaat solutions:**
1. INITIEEL: "plain" FHIR server met vulling volgens FHIR API van ZORG-AB
1. ~~Het [BIG-Register](https://www.bigregister.nl/zoek-zorgverlener/zoeken-eigen-systeem). Nodig voor behandelplan en weergave van de rol van de gebruiker in de zorgviewer. [Handleiding webservice BIG-register](https://www.bigregister.nl/documenten/publicaties/2017/03/03/handleiding-webservice-big-register)~~ - deze biedt geen FHIR interface, content zit ook in het ZORG-AB
1. Het ZORG-AB is een gemeenschappelijke adresinformatie voorziening die alle dienstverleners in de zorg kunnen gebruiken om (medische) gegevens met elkaar uit te wisselen.
    1. [ZORG-AB Implementatiehandeleiding](https://www.google.com/search?q=zorg-ab+implementatiehandleiding)
    1. FHIR Interface definitie ZORG-AB: [Simplifier Project](https://simplifier.net/ZORG-AB)

#### Authenticatie

**Definitie**: Het bouwblok authenticatie stelt de identiteit van de gebruiker onomstotelijk vast volgens de wettelijke kaders. Is onderdeel van de Zorgviewer Host.

**Requirements**:
1. Compliant met [SMART-on-FHIR 1.0.0](http://hl7.org/fhir/smart-app-launch/1.0.0/)
    1. voor Epic::Zorgviewer [Epic OAuth2](https://appmarket.epic.com/Article/Index?docid=oauth2)
    1. voor Epic::Ontsluitening bronsysteem [Epic Backend Authentication](https://appmarket.epic.com/Article/Index?docid=oauth2&section=BackendOAuth2Guide)
1. Lokale AD (ADFS)
1. SAML 2.0
1. Check MITZ *OTV 
1. Check [TWIIN](https://www.twiin.nl/twiin-afsprakenstelsel/wat-het-twiin-afsprakenstelsel)
    * [Twiin Afsprakenstelsel release 1.1 beta](https://public.vzvz.nl/display/TA11beta)
    * [Open toestemmingsvraag](https://public.vzvz.nl/display/TA11beta/Mitz+Transacties) - *waar is de FHIR versie??*

#### Autorisatie

**Definitie**: Rechten die een identiteit (zorgverlener, client / patient) heeft voor toegang tot cliëntgegevens (bron: NEN).

<div class="new-content" markdown="1">
Er zijn meerdere nivo's van autorisatie, namelijk:
1. De zorgviewer moet geautoriseerd zijn om bronsysteem ontsluitingen te bevragen (technisch: welke FHIR resources in scope en clientID)
1. De gebruiker moet geautoriseerd zijn om de zorgviewer te gebruiken
1. De gebruiker moet geautoriseerd zijn om specifieke gegevens op te vragen adhv toestemming en rol
</div>

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
1. Ontsluit minimaal de volgende gegevens in MVP2: de 28 BGZ-Zibs + de correspondentie (radiologie brieven, specialisten brieven, notities, ontslag brief) en N.B. dan alleen waar in de bron workflow voor is.
1. Zorginformatiebouwstenen conform NICTIZ [publicatie 2017](https://zibs.nl/wiki/ZIB_Publicatie_2017(NL)), de 28 BGZ-Zibs,
[Zibs 2017 FHIR Profiles](https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/) en [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017) obv [HL7 FHIR STU3](http://hl7.org/fhir/STU3/) 
1. Individuele ZIBS moeten kunnen worden aangeleverd 
1. Vraag richting bronsysteem op basis van BSN, URA en Zorgverlener gegevens moet mee voor autorisatie en logging.
1. Het moet mogelijk zijn om de door het Identiteit bouwblok gedefinieerde identities te accepteren naast de bronsysteem eigen identities. 
1. Bron systeem checkt ook bij Mitz of iets mag nadat hij call heeft gehad van de zorgviewer.

**Kandidaat solutions**:
* [Epic Interconnect](https://fhir.epic.com) via Intersystems Iris Healthshare
* [Chipsoft Zorgplatform](https://developer.zorgplatform.online) 
* Nexus via Foundra
* Topicus 
* ~~XDS-NN~~ 
* Een "Docker" voor een bron die geheel of gedeeltelijk nog niet conform zorgviewer-ig kan aanleveren

#### Behandelplan

**Definitie**: ...

**Requirements**:

**Kandidaat solutions**:
* INITIEEL: plain FHIR server met PlanDefinitions, focus op filters

### Technische Requirements

1. Alle implementaties dienen zich te houden aan [Postel's law, Robustness principle](http://www.healthintersections.com.au/?p=2403)

#### Dependencies

{% include dependency-table.xhtml %}

### Globals

{% include globals-table.xhtml %}

### EHR-S FM Requirements Mapping

Het EHR-S FM is ...

* Bronsysteem Ontsluiting 
    * Alles onder [TI.5 Standards-Based Interoperability](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.5.html)
    * [TI.5.1.1 Application Interchange Standards](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.5.1.1.html)
* Logging [TI.2 Audit](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.2.html)
* Authenticatie
    * [TI.1.1 Entity Authentication](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.1.1.html)
    * [TI.1.11 Trusted Information Exchange Environment](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.1.11.html)
* Autorisatie [TI.1.2 Entity Authorization](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.1.2.html)
* Terminology [TI.4.1 Standard Terminology and Terminology Models](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.4.1.html)
* Toestemming Privacy AVG [TI.1.8 Patient Privacy and Confidentiality](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-TI.1.8.html)
* Behandelplan [CPS.3.3 Support for Standard Care Plans, Guidelines, Protocols](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-CPS.3.3.html)
* Zorgviewer [CPS.3.4 Support for Context-Sensitive Care Plans, Guidelines, Protocols](https://vdzel.home.xs4all.nl/ehrsfm-fhir-r5/Requirements-EHRSFMR2.1-CPS.3.4.html)

