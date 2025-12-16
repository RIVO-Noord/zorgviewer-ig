### Uitgangspunten

1. De architectuur moet generiek zijn en voor verschillende zorgpaden en specialismen toepasbaar zijn.
1. Alle actoren in het zorgpad hebben inzage in dezelfde informatie, op basis van de gegeven toestemming van de patiënt.
1. Informatie blijft primair bij de bron en wordt zo min mogelijk gerepliceerd
    * Registratie aan de Bron - zorg voor juiste bron registratie, ontsluit wat er is
    * Aanpassen aan de bron, mappings in de bron en bron corrigeren als mogelijk
1. We doen geen interpretaties of aanpassingen aan de informatie, b.v. labuitslagen binnen of buiten de referentiewaarden
1. De Zorgviewer wordt opgestart vanuit de eigen informatieomgeving
1. *TOEKOMST* Informatie kan worden overgenomen in het eigen informatiesysteem wanneer daaraan behoefte is
1. De informatie wordt gefilterd op basis van de specifieke informatiebehoefte, bijvoorbeeld:
    * actief zorgpad
    * alle zorgepisodes van de afgelopen 2 jaar
    * alle benodigde informatie voor een gedefinieerd specifiek zorgpad
    * alle labuitslagen van de afgelopen 4 maanden
1. De architectuur gaat uit van een haalbare eerste versie vanuit bestaande werkwijzen en technische mogelijkheden.
1. De architectuur voldoet aan wet- en regelgeving en maakt compliancy op het gebied van privacy en security mogelijk.
1. De architectuur rust op de verleende toestemming door de patiënt. De patiënt bepaalt of gegevens worden gedeeld, en heeft inzicht in wie de gegevens raadpleegt of overneemt.
1. De architectuur is gebaseerd op [open standaarden](https://en.wikipedia.org/wiki/Open_standard)
1. Taal en transport zijn gescheiden, zodat vendor-lock-in wordt voorkomen
    * Internet-first transport - geen besloten netwerken

### Requirements per Bouwblok

#### Zorgviewer Host

**Synoniemen**:
1. Hostsysteem
1. Informatieomgeving

**Definitie**: Informatieomgeving (EPD, ECD, Portal) van de gebruiker van waaruit de Zorgviewer opstart wordt.

**Requirements**:
1. De zorgviewer host draagt zorg voor (lokale) authenticatie van de gebruiker.
1. De zorgviewer host voorziet in patient selectie en toets behandelrelatie.
1. De zorgviewer host kan de zorgviewer opstarten met context (huidige gebruiker en patient).
1. De zorgviewer host ondersteunt patient context wissels.
1. De zorgviewer host ondersteunt gebruiker context wissels.
1. De zorgviewer host biedt mogelijkheid aan de zorgviewer om huidige gebruiker en patiënt details (zoals naam) op te vragen als dit mist in de context.

**Keuze**:
1. Conform [SMART-on-FHIR 1.0.0 EHR launch](http://hl7.org/fhir/smart-app-launch/1.0.0/index.html#ehr-launch-sequence)

**Solutions**:
1. Epic Hyperspace
1. Chipsoft HiX
1. Topicus VIPlive
1. *TOEKOMST* Zorgviewer Launcher - Los voor gebruikers zonder EPD/ECD

#### Zorgviewer

**Definitie**: De Zorgviewer toont data uit de aangesloten bronsystemen, ordent deze, en biedt de gebruiker de mogelijkheid van filtering van de data op basis van het zorgpad of persoonlijke instellingen.

**Requirements**:
1. De zorgviewer bevat zelf geen patiëntgebonden data, en wijzigt geen data in de bronsystemen. 
1. De zorgviewer integreert in de informatieomgeving van de gebruiker.
    1. **Keuze**: Conform [SMART-on-FHIR 1.0.0 EHR launch](http://hl7.org/fhir/smart-app-launch/1.0.0/index.html#ehr-launch-sequence)
1. Het moet mogelijk zijn om aan te geven dat het een spoedsituatie betreft.
1. Conflicten, ontdubbelen en duplicaatdetectie volgens paragraaf "3.2.9.1 Ontdubbelen" in 
[BgZ MSZ Informatiestandaard](https://informatiestandaarden.nictiz.nl/wiki/BgZ:V1.0_BgZ_MSZ_Informatiestandaard)
    1. De zorgviewer attendeert de gebruiker op belangrijke lacunes in het eigen informatiesysteem: specificeren wat en welke dat zijn. Centraal vastleggen en dat alerten. 
    1. De zorgviewer attendeert de gebruiker op conflicten in het tonen van data van verschillende bronnen waar ze niet overeenkomen. 
    1. De zorgviewer faciliteert in ontdubbelen
1. De zorgviewer logt gebruikersacties (clicks). Dit ten behoeve van optimalisatie gebruikersinterface en trends van gebruik.
1. De zorgviewer biedt de mogelijkheid om informatie te tonen op basis van de plek van de patiënt in het zorgpad.
1. De zorgviewer biedt de mogelijkheid om persoonlijke filters toe te passen.

#### Toestemming

**Definitie**: De expliciete specifieke, vrijgegeven toestemming tot het beschikbaar stellen van zorginformatie door de patiënt (bron: AVG)
{% include img.html img="mitz-toestemming.png" caption="Bron: MITZ Toestemming Documentatie" %}

**Kandidaat solutions**:
1. *INITIEEL*: Regionale service
    1. Invulling: FHIR server met vulling volgens FHIR API van [MITZ "Open autorisatievraag"](https://drive.google.com/file/d/1cHgsz-OORw5QMoGj5Lh_475Bu_TpDHvj/view)
1. Connect4Care Topicus
1. MITZ OTV *TOEKOMST*

#### Identiteit

**Definitie**: Identiteit wordt gebruikt voor: 
* Vastleggen van logging 
* Bepalen van gerechtigde dataset 
* Basis voor authenticatie

**Requirements**:
1. Gebruik van reeds in organisatie in gebruik zijnde ID’s gekoppeld aan een extern erkende identiteit, zoals AGB of BIG voor zorgverleners en zorgaanbieders.
    1. Lokale identiteit MOET AGB-Z of BIG-Nummer als attribuut hebben, zodat we via de Zorgverlener Directory de specialismen en rollen kunnen opvragen
1. Vektis AGB-medische specialismen

#### Zorgverlener Directory

**Synoniemem**:
1. Zorgverlener Registry
1. Zorgaanbieder Registry of Directory
1. Provider Directory (IHE)
1. Adressering
1. White pages

**Definitie**: Register met Identiteiten en attributen van zorgaanbieders en zorgverleners. Voorbeelden zijn volledige naam, maar ook technische endpoints.
>Volledige naam: "F. Heuvel (Cardiologie (cardioloog)) in het UMCG"<br/>
>FHIR Base voor UMCG: https://prd.epic.umcg.nl/fhir/STU3 

**Kandidaat solutions:**
1. Regionale FHIR server met vulling volgens FHIR API van ZORG-AB
    1. [ZORG-AB Implementatiehandeleiding](https://www.vzvz.nl/diensten/gemeenschappelijke-diensten/zorg-ab/releases)
    1. FHIR Interface definitie ZORG-AB: [Simplifier Project](https://simplifier.net/ZORG-AB)
1. *ONDERZOCHT*: Het [BIG-Register](https://www.bigregister.nl/zoek-zorgverlener/zoeken-eigen-systeem) - [Handleiding webservice BIG-register](https://www.bigregister.nl/documenten/publicaties/2017/03/03/handleiding-webservice-big-register) - deze biedt geen FHIR interface, bovendien zit de content ook in het ZORG-AB.

#### Authenticatie

**Definitie**: Het bouwblok authenticatie stelt de identiteit van de gebruiker onomstotelijk vast volgens de wettelijke kaders. Is onderdeel van de Zorgviewer Host.

**Requirements**:
1. ..

**Keuze**:
1. Compliant met [SMART-on-FHIR 1.0.0](http://hl7.org/fhir/smart-app-launch/1.0.0/)

**Invulling Epic**:
1. Zorgviewer [Epic OAuth2](https://appmarket.epic.com/Article/Index?docid=oauth2)
1. Ontsluiting bronsysteem [Epic Backend Authentication](https://appmarket.epic.com/Article/Index?docid=oauth2&section=BackendOAuth2Guide)

#### Autorisatie

**Definitie**: Rechten die een identiteit (zorgverlener, cliënt / patiënt) heeft voor toegang tot cliëntgegevens (bron: NEN 7510).

Er zijn meerdere niveau's van autorisatie, namelijk:
1. De zorgviewer moet geautoriseerd zijn om bronsysteem ontsluitingen te bevragen (technisch: welke FHIR resources in scope en clientID)
1. De gebruiker moet geautoriseerd zijn om de zorgviewer te gebruiken
1. De gebruiker moet geautoriseerd zijn om specifieke gegevens op te vragen aan de hand van toestemming en rol

#### Logging

**Definitie**: Stelselmatige geautomatiseerde registratie van gegevens rond de toegang tot het patiëntdossier, die controle van de rechtmatigheid ervan mogelijk maakt (NEN 7513).

**Requirements**:
1. Bij opvragen van gegevens dient een gebruikersnaam en extern id mee gestuurd te worden door de aanroepende instelling zodat dit bij het bronsysteem kan worden gelogd.
1. Logging dient te gebeuren in het bronsysteem.
1. Logging dient te gebeuren op inzage van de gegevens. 
1. De Zorgviewer logt voor audit log naar een regionale log service. 
1. Logging volgens NEN 7513 en IHE ATNA  

**Solutions**:
1. Regionale FHIR Server met AuditEvents conform NEN 7513 gevuld.

#### Ontsluiting bronsysteem

**Definitie**: Het bouwblok ‘Ontsluiting bronsystemen’ draagt zorg voor het aanleveren van de informatie uit de bronsystemen in een formaat dat door de zorgviewer kan worden verwerkt (Zibs/FHIR).

**Requirements**:
1. Ontsluit minimaal de volgende gegevens: 
    1. de 28 BgZ-Zibs
    1. de correspondentie (radiologie brieven, specialisten brieven, notities, ontslag brief)
    * N.B. de zibs kunnen heel veel gegevens ondersteunen, maar als er geen schermen voor zijn om de gegevens in te voeren of geen workflow is waar die schermen zichtbaar worden, zullen die gegevens nooit beschikbaar zijn.
1. Zorginformatiebouwstenen conform NICTIZ [publicatie 2017](https://zibs.nl/wiki/ZIB_Publicatie_2017(NL)), de 28 BgZ-Zibs,
[Zibs 2017 FHIR Profiles](https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/) en [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017) obv [HL7 FHIR STU3](http://hl7.org/fhir/STU3/) 
1. Individuele zibs moeten kunnen worden aangeleverd 
1. Alleen identiteiten zoals gedefinieerd door het Identiteit bouwblok mogen geaccepteerd worden.
1. *TOEKOMST* Bronsysteem ZOU MOETEN checken bij Mitz

**Kandidaat solutions**:
* [Epic Interconnect](https://fhir.epic.com) via Intersystems Iris Healthshare
* [Chipsoft Zorgplatform](https://developer.zorgplatform.online) 
* [Topicus VIPlive](https://viplive.nl/over-ons/viplive-koppelen-met-systemen)
* Nexus Cloud-Connect
* XDS-NN met een FHIR API volgens de IG (e.g. Documenten)
* Een "Docker" voor een bron die geheel of gedeeltelijk nog niet conform zorgviewer-ig kan ontsluiten

#### Behandelplan

**Definitie**: De stappen die je als patiënt of cliënt kan doorlopen in het zorgpad. In de zorgviewer zie je een digitale weergave van het -regionaal of per specialisme overeengekomen- zorgpad. Aan de gestructureerde stappen 'hangen' informatiecomponenten (de zibs of codes) vast, waarmee de relevante gegevens hoger getoond kunnen worden.

**Requirements**:
1. ..

**Solutions**:
* FHIR server met PlanDefinitions, focus op data-requirements tbv queries en filters 
    * in lijn met [FHIR Clinical Guidelines](https://hl7.org/fhir/uv/cpg/)
    * in lijn met [Problem List Maps](https://problemlist.org/)

### Technische Requirements

1. Alle implementaties dienen zich te houden aan **Postel's law, Robustness principle** [Grahame Grieve](http://www.healthintersections.com.au/?p=2403) of [Mark Kramer](https://lightmyfhir.org/2016/05/25/postels-law-and-fhir-profiles/)
1. Niet valideren tegen de profiles at-runtime, alleen bij aansluit (zelf) certificeren aan de hand van de [CapabilityStatements](artifacts.html#1) in deze implementatiegids.

### EHR-S FM Requirements Mapping

Het HL7 EHR System Functional Model is een referentie lijst van functies die mogelijk in een EPD Systeem (EHR-S) beschikbaar zijn.

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

