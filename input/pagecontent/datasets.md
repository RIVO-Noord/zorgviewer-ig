### Data Requirements 

*Aka "Gegevenssets" virtueel bouwblok.*

1. Basis zijn de 28 zibs uit de BgZ aangevuld met de correspondentie (radiologie brieven, specialisten brieven, notities, ontslag brief)
1. De Data Requirements zijn een gemeenschappelijk profiel op wat leveranciers nu kunnen en zorginstellingen hebben ingericht in hun workflows (VIPP5).
    1. Leidend zijn de zibs
    1. Vervolgens wordt getest wat de leveranciers ondersteunen van de zibs via FHIR
    * In sommige gevallen kan het zijn dat de workflow niet is ingericht of anders is ingericht (dat mag). Voor mantatory (min=1) en must-support elementen zou die workflow MOETEN worden aangepast om goed te functioneren in de Zorgviewer. Bijvoorbeeld bij zorgverleners MOET een externe identifier geregistreerd zijn, zodat deze ook via FHIR Practitioner wordt ontsloten.

### Datasets

N.B. Datasets zijn relevante selectie van data elementen met eventueel filters voor een bepaald zorgpad.

#### BgZ+PDF/a

Vanuit verschillende projecten en programma's wordt er gewerkt aan de de Basisgegevensset Zorg (BgZ) bestaande uit 28 zorginformatiebouwstenen (zibs). Vanuit de verschillende projecten en programma's worden bepaalde regels gehanteerd. Vanuit project Zorgviewer fase 1 richten wij ons op de overlap van al deze afspraken. Om hier een duidelijker beeld over te schetsen is het volgende venn-diagram opgesteld om de overeenkomsten van de verschillende projecten en programma's zichtbaar te maken.

{% include img.html img="vennDiagram.svg" caption="Figure 3: BgZ+PDF/a Venn-Diagram" width="70%" %}

In het midden van bovenstaande venn-diagram staat de zorgviewer (ZV). Het project maakt gebruik van de eisen van verschillende programma's, de mogelijkheden die de verschillende XISen aanbieden (ChipSoft, Epic, Topicus, etc.) en wat de verschillende organisaties al kunnen op het gebied van data-ontsluiting (Martini, MCL, Tjongerschans, UMCG, etc.). 

Onderstaande lijst sommeert nogmaals wat de verschillende bronnen zijn van de desbetreffende programma's, leveranciers en organisaties:
1. Wat wordt geeist: [VIPP5 Staatscourant stcrt-2020-7935](https://zoek.officielebekendmakingen.nl/stcrt-2020-7935.html)
1. Wat kan Epic nu:
    1. SMoR - VIPP 5 Module 1 - PDFA Correspondence via FHIR - Design - February 2021 revision.pdf
    1. SMoR - VIPP 5 Module 1 - BGZ on FHIR - Design - July 2020 revision.pdf
    1. Wij doen de zibs uit de BgZ (dus niet alleen laatste bloeddruk, maar alle b.v.) we doen meer dan de BgZ en minder dan de zibs.
    1. Epic FHIR **STU3** *Provider-Facing* https://fhir.epic.com/Specifications
1. Wat kan Chipsoft nu:
    1. [Digitale Zorg Zorgplatform](https://developer.zorgplatform.online/digital-care)
1. MedMij specs (basic): 
    1. [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpBGZ_2017)
    1. [BgZ 2017 FHIR](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
    1. [PDF/a](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA)

##### Voorbeeld BgZ
De Basisgegevensset Zorg (BgZ), ook wel patient summary (PS) genoemd, behandelen wij als een sub-set van zibs. In de BgZ worden de BgZ-secties beperkt. Bijvoorbeeld de BgZ-sectie Uitslagen beperkt zich op klinisch chemisch lab, laatste uitslag. Dit zou betekenen dat de zorgverlener geen inzage heeft in trends (eerdere klinische chemie uitslagen) of andere typen laboratorium uitslagen. De andere laboratorium uitslagen zijn bijvoorbeeld hematologie, serologie/immunologie, virologie, toxicologie, microbiologie of moleculaire genetica (zie zib LaboratoriumUitslag - ResultaatType - ResultaatTypeCodelijst). Deze filters op de zibs beschouwen we als voorbeelden. Vanuit project zorgviewer laten wij deze filters achterwegen, zodat alle labuitslagen ingezien kunnen worden. 

#### Acute Zorg - e-Spoed (#1)

* https://nictiz.nl/standaarden/informatiestandaarden/acute-zorg/
* https://informatiestandaarden.nictiz.nl/wiki/Landingspagina_Acute_Zorg
* https://amigo.nictiz.nl/acute-zorg/opvragingen-bij-huisarts/dataset

#### HartNet - TAVI Proces

#### Oncology

##### ACP
