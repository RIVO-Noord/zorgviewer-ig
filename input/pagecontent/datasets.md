Deze pagina beschrijft de content van de datasets.
N.B. Datasets zijn relevante selectie van data elementen met eventueel filters voor een bepaald zorgpad.

### Data Requirements 

*Aka "Gegevenssets" virtueel bouwblok.*

1. Basis zijn de 28 zibs uit de BgZ aangevuld met de correspondentie (radiologie brieven, specialisten brieven, notities, ontslag brief)
1. De Data Requirements zijn een gemeenschappelijk profiel op wat leveranciers nu kunnen en zorginstellingen hebben ingericht in hun workflows (VIPP5).
    1. Leidend zijn de zibs
    1. Vervolgens wordt getest wat de leveranciers ondersteunen van de zibs via FHIR
    * In sommige gevallen kan het zijn dat de workflow niet is ingericht of anders is ingericht (dat mag). Voor mantatory (min=1) en must-support elementen zou die workflow MOETEN worden aangepast om goed te functioneren in de Zorgviewer. Bijvoorbeeld bij zorgverleners MOET een externe identifier geregistreerd zijn, zodat deze ook via FHIR Practitioner wordt ontsloten.

### BgZ+PDF/a

Vanuit verschillende projecten en programma's wordt er gewerkt aan de de Basisgegevensset Zorg (BgZ) bestaande uit 28 zorginformatiebouwstenen (zibs). Vanuit de verschillende projecten en programma's worden bepaalde regels gehanteerd. Vanuit project Zorgviewer fase 1 richten wij ons op de overlap van al deze afspraken. Om hier een duidelijker beeld over te schetsen is het volgende flower venn-diagram opgesteld om de overeenkomsten van de verschillende projecten en programma's zichtbaar te maken.

{% include img.html img="FlowerVenndiagram.png" caption="BgZ+PDF/a Flower Venn-Diagram" width="50" %}

In het midden van bovenstaande flower venn-diagram staat de zorgviewer (ZV). Het project maakt gebruik van de eisen van verschillende programma's, de mogelijkheden die de verschillende systemen aanbieden (ChipSoft, Epic, Topicus, etc.) en wat de verschillende organisaties al kunnen op het gebied van data-ontsluiting (Martini, MCL, Tjongerschans, UMCG, etc.). 

Onderstaande lijst sommeert nogmaals wat de verschillende bronnen zijn van de desbetreffende programma's, leveranciers en organisaties:
1. Wat wordt geeist Wat wordt geeist vanuit de wet en moet dus door de leveranciers worden ondersteund: 
     1. [IZA](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjr49Tvntv9AhWK2aQKHdAaDooQFnoECAwQAQ&url=https%3A%2F%2Fwww.rijksoverheid.nl%2Fbinaries%2Frijksoverheid%2Fdocumenten%2Frapporten%2F2022%2F09%2F16%2Fintegraal-zorgakkoord-samen-werken-aan-gezonde-zorg%2Fintegraal-zorg-akkoord.pdf&usg=AOvVaw3KopPSCxT2VkhnPKQlehkb&cshid=1678790821565394)
     1. Vanuit de ziekenhuizen: [VIPP5 Staatscourant stcrt-2020-7935](https://zoek.officielebekendmakingen.nl/stcrt-2020-7935.html)
     1. Vanuit de huisartsen: [VIPPOPEN Staatscourant 2022 3373260-1029631-CZ](https://zoek.officielebekendmakingen.nl/stcrt-2022-18226.html)
1. MedMij specs (basic): 
    1. [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpBGZ_2017)
    1. [BgZ 2017 FHIR](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
    1. [PDF/a](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA)
1. Wat kan Epic nu:
    1. De Epic huizen doen de zibs uit de BgZ, dus niet alleen laatste bloeddruk, maar alle b.v. Ofwel, we doen meer dan de BgZ en minder dan de zibs.
    1. [Epic FHIR](https://fhir.epic.com/Specifications) **STU3** *Provider-Facing*
    1. [SMoR - VIPP 5 Module 1 - PDFA Correspondence via FHIR - Design - February 2021 revision.pdf](https://umcgonline.sharepoint.com/:b:/r/sites/RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Werkgroep%20Implementatie%20gids/Achtergrond%20materiaal/SMoR%20-%20VIPP%205%20Module%201%20-%20PDFA%20Correspondence%20via%20FHIR%20-%20Design%20-%20February%202021%20revision.pdf?csf=1&web=1&e=o7DDKG)
    1. [SMoR - VIPP 5 Module 1 - Updates to BgZ on FHIR to Support Hospital MedMij Kwalificatie - Medications and Problems](https://umcgonline.sharepoint.com/:b:/r/sites/RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Werkgroep%20Implementatie%20gids/Achtergrond%20materiaal/VIPP%205%20Module%201%20-%20Updates%20to%20BgZ%20on%20FHIR%20to%20Support%20Hospital%20MedMij%20Kwalificatie%20-%20Medications%20and%20Problems.pdf?csf=1&web=1&e=bTTAUJ)
    1. [SMoR - VIPP 5 Module 1 - BGZ on FHIR - Design - July 2020 revision.pdf](https://umcgonline.sharepoint.com/:b:/r/sites/
    RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Werkgroep%20Implementatie%20gids/Achtergrond%20materiaal/SMoR%20-%20VIPP%205%20Module%201%20-%20BGZ%20on%20FHIR%20-%20Design%20-%20July%202020%20revision.pdf?csf=1&web=1&e=fEd69C)
1. Wat kan Chipsoft nu:
    1. [Digitale Zorg Zorgplatform](https://developer.zorgplatform.online/digital-care)
    1. [FHIR BgZ API](https://developer.zorgplatform.online/digital-care/api/bgz)
    1. [FHIR Document API](https://developer.zorgplatform.online/digital-care/api/document)


#### Voorbeeld BgZ

De Basisgegevensset Zorg (BgZ), ook wel patient summary (PS) genoemd, behandelen wij als een sub-set van zibs. In de BgZ worden de BgZ-secties beperkt. Bijvoorbeeld de BgZ-sectie Uitslagen beperkt zich op klinisch chemisch lab, laatste uitslag. Dit zou betekenen dat de zorgverlener geen inzage heeft in trends (eerdere klinische chemie uitslagen) of andere typen laboratorium uitslagen. De andere laboratorium uitslagen zijn bijvoorbeeld hematologie, serologie/immunologie, virologie, toxicologie, microbiologie of moleculaire genetica (zie zib LaboratoriumUitslag - ResultaatType - ResultaatTypeCodelijst). Deze filters op de zibs beschouwen we als voorbeelden. Vanuit project zorgviewer laten wij deze filters achterwegen, zodat alle labuitslagen ingezien kunnen worden. 

### Typen consent

#### Informed Consent

In de gezondheidszorg wordt gebruik gemaakt van de [Informed Consent](https://www.knmg.nl/advies-richtlijnen/dossiers/informed-consent). Middels de informed consent geeft de patiënt toestemming voor het uitvoeren van het medisch beleid door de zorgverlener. Het wordt 'informed' genoemd, omdat je de patiënt voorafgaand informeert over de mogelijke behandeling en de consequenties van behandelen. Bij behandelen worden ook de onderzoeken verstaan, zoals bloedafname of de röntgen foto. 

Het informeren van de patiënt over de behandeling is de informatieplicht die een zorgverlener heeft. Dit is ook vastgelegd in de Wet Geneeskundige BehandelOvereenkomst (WGBO). 

#### Toestemming delen gegevens

Voor het delen van gegevens moet apart toestemming gevraagd worden. Dit is niet opgenomen in het informed consent. Op dit moment moet bij elke instelling apart de toestemming gevraagd én geregistreerd worden in eigen informatiesysteem. Hierdoor ervaren gebruikers problemen, omdat niet in elke instelling de toestemming juist is geregistreerd, waardoor informatie niet uitgewisseld kan worden.

[*Mitz-toestemming*](https://www.mitz-toestemming.nl/)
Om problemen rondom toestemming en gegevensuitwisseling tegen te gaan is er landelijk Mitz gekozen als dé oplossing voor de toestemmingsvoorziening. In Mitz kan de patiënt op één plek zijn/haar toestemmingen beheren. Alle uitwisselingssystemen (US) worden aangesloten op Mitz, zodat ook de US'en op de hoogte zijn van de toestemming van de patiënt. De toestemming wordt op een categorie van zorgaanbieders geregistreerd. 

Als een zorgaanbieder de toestemming van een patiënt wil raadplegen, dan wordt er een vraag gesteld aan het US. Het US vraagt dan de toestemming op bij Mitz. Eerst wordt er gevraagd of er toestemming is voor het delen van gegevens: [de gesloten autorisatievraag](https://www.mitz-toestemming.nl/over-mitz/hoe-werkt-mitz).

#### Huidige MITZ toestemmingen (v3.8.1)

Algemene vraag aan patient:
> "Geeft u {gevelnaam zorgaanbieder} toestemming om uw noodzakelijke {gegevenscategorie} beschikbaar te stellen aan andere zorgaanbieders, zoals huisartsen, ziekenhuizen en andere medisch specialistische instellingen en apotheken, als dat voor uw behandeling nodig is?"

Zorgaanbiedercategorien (raadeplegende):
* Huisartsen en huisartsenposten
* Ziekenhuizen, medische centra en klinieken
* Geestelijke gezondheidszorg (GGZ)
* Verpleging en verzorging
* Apotheken
* Laboratoria en diagnostische centra

Gegevenscategorieën:
# Behandelgegevens (medische gegevens)
# Uitslagen (zit ook in #1)
# Medicatiegegevens (zit ook in #1)
# Alle gegevens

### Acute Zorg

Binnen de acute zorg lopen een aantal trajecten om gegevensuitwisseling voor elkaar te krijgen. Binnen de acute zorg is het noodzakelijk om op snelle wijze informatie over de patiënt te ontvangen. Denk bijvoorbeeld aan het reanimatiebeleid en -wensen van de patiënt. Middels project e-Spoed is getracht om afspraken rondom verschillende scenario's in kaart te brengen. Per scenario's worden verschillende technische en functionele eisen gesteld; denk aan het berichttype en naar wie het bericht verstuurd moet worden. Deze informatiestandaard staat onder beheer van Nictiz. 

Verder heeft de acute zorg meerdere andere informatiestandaarden per uitwisseling uitgeschreven, onder andere:
* Ambulanceoverdracht naar SEH en retourbericht 2.4.0
* (Triage)verwijzingen; spoedmelding; bevestiging en voorwaarschuwing 1.5.0
* Professionele samenvatting en rapportages verleende zorg 2.1.0

Hieronder nog een aantal links:
* [https://nictiz.nl/standaarden/informatiestandaarden/acute-zorg/](https://nictiz.nl/standaarden/informatiestandaarden/acute-zorg/)
* [https://informatiestandaarden.nictiz.nl/wiki/Landingspagina_Acute_Zorg](https://informatiestandaarden.nictiz.nl/wiki/Landingspagina_Acute_Zorg)
* [https://amigo.nictiz.nl/acute-zorg/opvragingen-bij-huisarts/dataset](https://amigo.nictiz.nl/acute-zorg/opvragingen-bij-huisarts/dataset)

### HartNet - TAVI Proces

[HartNet is een regionaal samenwerkingsverband tussen de ziekenhuizen in Groningen en Drenthe](https://www.umcg.nl/-/hartnet-de-juiste-hartzorg-op-de-juiste-plek). Het doel is om de juiste hartzorg op de juiste plek aan te bieden voor de bewoners in Noord-Nederland. HartNet heeft daarom vijf verschillende zorgpaden volledig uitgeschreven en geoptimaliseerd. Eén van deze zorgpaden is het TAVI zorgpad en staat voor Transcatheter Aortic Valve Implantation. Bij TAVI wordt een hartklep vervangen, wanneer deze niet optimaal werkt. Denk aan aandoeningen zoals aortaklepstenose; een aandoening waarbij de hartklep onvoldoende sluit. 

Het TAVI zorgpad is eerst uitgeschreven door de afdelingen van de verschillende huizen en vervolgens over elkaar gelegd.  

Het idee van de regionale zorgpaden is om de zorg op de juiste plek bij de juiste professional uit te voeren:
* De diagnostiek vindt plaats in de 2e lijn;
* De Hart Bespreking (MDO) vindt plaats in de 3e lijn voor het bepalen van het zorgplan;
* De ingreep wordt uitgevoerd in de 3e lijn;
* De follow-up wordt uitgevoerd in de 2e lijn.

### Advanced Care Planning

Advanced Care Planning (ACP) wordt ook wel het proactieve zorgplan genoemd. Een plan waarin de wensen en behoeften van de patiënt worden beschreven. In de ACP Leidraad proactieve zorgplanning (advance care planning) van Palliaweb wordt het proces van het verkrijgen van informatie rondom ACP uitgelegd. In het ACP staan zaken rondom de wilsbekwaamheid, wettelijke vertegenwoordiging, doelen van behandeling en behandelgrenzen. Behandelgrenzen beschrijven onder andere het reanimatiebeleid.

Het ACP beschrijft ook informatie over de patiëntencontext in de Gegevensset Passende Zorg. Deze gegevensset heeft overeenkomsten met de gegevensset oncologie algemeen (GOA) en de mensgeboden set (MGS). De set komt ook overeen met de basisgegevensset zorg (BgZ) met een aantal aanvullingen:
* Sociale context
    * Gezinssamenstelling
    * Beroep
    * Hobbies
    * Sociaal netwerk
    * Onafhankelijkheid
    * Sociale observaties
* Zingeving
* Communicatie
* Organisatie van zorg
    * Plaats van zorg
    * Plaats van overlijden
* Functioneel en somatisch (specifieke vragenlijsten / metingen)

Vanuit project Zorgviewer is de ACP deels in scope, namelijk de BehandelAanwijzing met een aanvulling in de codelijst. [De BehandelingCodelijst bestaat uit vijf waarden](https://zibs.nl/wiki/BehandelAanwijzing-v3.1(2017NL)#BehandelingToegestaanCodelijst). Deze is nu uitgebreid met drie andere waarden, zoals landelijk afgesproken door de palliatieve zorg. 
