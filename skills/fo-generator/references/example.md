| Titel | Allergieën en intoleranties |
| --- | --- |
| Documentatie | [Ontwerpdocument allergieën en intoleranties](https://umcgonline.sharepoint.com/:p:/r/sites/RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Werkgroep%20Implementatie%20gids/Allergieen%20en%20intoleranties/Allergieen%20en%20intoleranties.pptx?d=w3040c84d99124163b2887284e02effc2&csf=1&web=1&e=0lGOLb) |
| Work item(s) | [Als BO wil ik het FO en IG voor Allergieën uitbreiden met de Allergieën uit Sanday, zodat deze in één overzicht tonen](https://dev.azure.com/UMCG-MIT/Zorgviewer/_workitems/edit/313189) |
| Roadmap item(s) | [Allergieën en intoleranties](https://dev.azure.com/UMCG-MIT/Zorgviewer/_workitems/edit/290346) |

Contents

Algemeen
========
Dit functioneel ontwerp beschrijft hoe de Allergieën en intoleranties worden getoond in de Zorgviewer, binnen de tab **'Allergieën en intoleranties'**.

## Wat zijn allergieën en intoleranties?
Een allergie of intolerantie beschrijft de geneigdheid tot overgevoeligheid van een patiënt voor een stof, zodat na blootstelling een ongewenste fysiologische reactie verwacht wordt, terwijl bij de meeste mensen bij die hoeveelheid geen reactie zou optreden. De waargenomen fysiologische veranderings zijn meestal het resultaat van een immunologische reactie. 

**Allergieën en intoleranties**
De allergieën en intoleranties voor de ziekenhuizen zijn op basis van https://zibs.nl/wiki/AllergieIntolerantie-v3.2(2017NL).
Voor Sanday op basis van [Nictiz R4 Zib2020 | nl core AllergyIntolerance - SIMPLIFIER.NET](https://simplifier.net/nictiz-r4-zib2020/nlcoreallergyintolerance). 

Functionele wens
----------------
Als zorgverlener wil ik in de Zorgviewer de allergieën en intoleranties van een patiënt kunnen raadplegen. Dit overzicht dient de volgende gegevens te tonen: stof, toelichting, categorie, ernst en status. 

Gegevensbronnen
---------------
https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/StructureDefinition-AllergyIntolerance.html

Disclaimer
--------------------------------------------------------------------------------------------------------------------------

_Deze informatie dient te worden toegevoegd aan Zorgviewer [disclaimer](https://www.rivo-noord.nl/zorgviewer/disclaimer)_

- Er moet een disclaimer komen voor Sanday. 
"Let op: allergieën afkomstig uit Sanday betreffen uitsluitend medicatie-allergieën."

Mockup gegevensscherm
================================================================================================================================================

Algemeen
--------


| Naam gegevensscherm | Allergieën en intoleranties |
| --- | --- |
| Naam menu item | Allergieën en intoleranties |
| Icoon | [Allergies](https://fonts.google.com/icons?icon.query=allergy&selected=Material+Symbols+Outlined:allergies:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%231f1f1f) |
| Gegevensherkomst | [AllergyIntolerance](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/StructureDefinition-AllergyIntolerance.html) |

Schermontwerp
-------------
| Bron | Datum | Stof | Toelichting | Categorie| Ernst| Reactie | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
 | UMCG | 0103-2024 | DERMATOLOGICA | | Medicijn | | | Actief |  
| Frisius MC Leeuwarden| 12-12-2019 | MELKEIWIT | misselijk | Medicijn | Licht | |  Actief | 
| Frisius MC Heerenveen | 30-10-2019 |  Voeding - Noten - Pinda | VIPP audit allergie |  | Licht ||  Niet meer aanwezig | 

Gedrag gegevensscherm
---------------------

| Onderdeel | Gedrag |
| --- | --- |
| Filteren | De volgende allergieën worden eruit gefilterd en worden dus niet getoond in de Zorgviewer. Allergieën met `Klinische Status` = "Foutief". Allergieën met `Stof` de SNOMED code PatientNotAsked = "1631000175102"; In Epic wordt dit getoond als Niet in systeem. Dit betekent dat de patiënt nog niet is gevraagd naar de allergieën en intoleranties.|
| Sortering | De initiële sortering wordt gedaan op zowel de Klinische status als de Datum. Allereerst wordt er gesorteerd op de Klinische status met de volgende volgorde: 1. Actief, 2. Niet meer aanwezig en 3. Achterhaald. Daarna wordt er aflopend op datum gesorteerd. Een gebruiker kan altijd op de kolomkopjes klikken om een eigen sortering toe te passen. Hierbij zal altijd eerst worden gesorteerd op `Klinische Status` and daarna op de betreffende kolom, zodat de actieve allergieën altijd bovenaan staan.|
| Uitklapveld | n.v.t. |



Opmaak & uitzonderingen gegevensscherm
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Er zijn geen specifieke afwijkingen m.b.t. de opmaak, deze volgt de standaard.  
Er zijn geen specifieke uitzonderingen.

Mockup tijdlijn
====================================================================================================================================

De mockup van de tijdlijn geeft een impressie van het ontwerp van de 'kaart' voor allergieën en intoleranties.

Algemeen
----------------------------------------------------------------------------------------------------------------------

| Naam kaart | Allergieën en intoleranties |
| --- | --- |
| Icoon | [Allergies](https://fonts.google.com/icons?icon.query=allergy&selected=Material+Symbols+Outlined:allergies:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%231f1f1f)  |
| Gegevensherkomst | [AllergyIntolerance](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/StructureDefinition-AllergyIntolerance.html) |

Kaartontwerp
------------------------------------------------------------------------------------------------------------------------------

_Met voorbeeld data_
| Allergieën en intoleranties |
| --- |
| Frisius MC Heerenveen 1-3-2024 |
| NIET-SELECTIEVE NSAID'S EN SALICYLATEN |
| + Status: Niet meer aanwezig |
| + Categorie: Medicijn |

Gedrag kaart
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

| Onderdeel | Gedrag |
| --- | --- |
| Uitklapveld | Tonen van:  <br>`Status`  <br>`Categorie`   |

Opmaak en uitzonderingen
------------------------------------------------------------------------------------------------------------------------------------------------------
Het tabblad icoon krijgt een rode kleur als dit gegevens bevat en zal het startscherm een rode kaart hebben indien gegevens aanwezig zijn. 


## Uitzonderingen
1) **Epic** heeft daarnaast geen Nederlandse vertaling toegevoegd, waardoor er op dit moment het volgende gebeurt:
![Uitzondering-Epic-AllergyIntolerance.png](/.attachments/Uitzondering-Epic-AllergyIntolerance-d41dc0aa-e679-4491-803d-a1ff2d0e41ca.png)
[Hiervoor loopt nu een Sherlock met Epic](https://sherlock.epic.com/default.aspx?view=slg/home#cid=1012&id=8591336&rv=0)

2) Wanneer **Voor zover bekend geen allergieën (SNOMED code 716186003)** wordt teruggegeven, dan wordt deze wel getoond in de allergieën en intoleranties tab. Echter, de banner wordt NIET getoond en het icoon van het tabblad krijgt geen signalering mits geen andere allergie vanuit een andere bron getoond wordt. 
Zie [Epic VendorServices](https://vendorservices.epic.com/Sandbox/Index?api=465) API: _"If a patient has no active allergies, an AllergyIntolerance resource will be returned indicating whether the patient's allergies have never been reviewed (are not on file), or if they have been reviewed and it has been determined that they have no known allergies."_

Usecases
======================================================================================================================

| **Usecase 1** | Overzicht van allergieën en intoleranties |
| --- | --- |
| **Doel** | Als zorgverlener wil ik een overzicht van alle allergieën en intoleranties en hun status van een patiënt inzien |
| **Actie** | De zorgverlener kan een overzicht raadplegen van alle allergieën en intoleranties van een patiënt |
| **Beperkingen** |  |

Testcases
========================================================================================================================

Inrichting testpatiënt
-------------------------------------------------------------------------------------------------------------------------------------------------------

| Datum | Stof| Toelichting| Categorie| Ernst | Reactie| Status| |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [kies een datum] | [kies een stof] | [kies een toelichting] | [kies een categorie] | [kies een ernst]| [kies een reactie]| [kies een status]| 


### Gebruikte testpatiënt(en)

Aanname gedaan dat de genoemde testpatiënten van het UMCG zijn. Vermoedelijk bestaan deze testpatiënten niet meer door de copy down in 2025.

| Instelling | Naam | ID | Opmerkingen |
| --- | --- | --- | --- |
| UMCG | Zorgviewer, U.M.C.G. | BSN 390891022 |  |
| UMCG | Lor, K. | BSN 646141983 | Heeft een verlopen infectie (niet actuele infectie) |
| UMCG | Peppa, PIG | BSN 012344321 |Heeft ‘Voor zover bekend geen allergieën’, ofwel patiënt is gevraagd en heeft (voor zover bekend) geen allergieën  |
| Sanday | J. Xxx_cevat (J) | BSN 999911132 | Zandbak Sanday. Heeft de volgende registraties op 7-10-25: 'infusorienaarde'(intolerantie stof), 'NAPRT2 - NAPROXEN ACCORD TABLET 250MG (intolerantie handelsproduct), 'SIlICONENKLEEFMIDDEL'(intolerantie stof), 'ANTIVIRALE GUANINEDERIVATEN' (Ongewenste groep), 'HUISSTOFMIJTENALLERGEEN' (intolerantie stof) | 







Bevindingen
============================================================================================================================

Functioneel
-----------

Openstaande en opgeloste bevindingen
------------------------------------
*   Sanday
    *   Andere invulling Categorie definitie. Wordt 7-10-25 besproken.
- Zie voor herkomst van de vraag: [allergy-1759399184052.json](https://umcgonline-my.sharepoint.com/:u:/g/personal/a_r_g_bosman_umcg_nl/ERmIGcwA0tBOrgIO1TrHYrUBQsCoPUkSQovPj_NQisuBKA?e=TwGXAA). De request kan niet uitgevoerd worden zonder 'category=medication', dit geeft een error. 
- Volgens de Sanday documentatie ([Sanday FHIR-services Integration Guide V1.11.pdf](https://umcgonline.sharepoint.com/:b:/r/sites/RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Aansluiten%20Huisartsen/Sanday%20FHIR-services%20Integration%20Guide%20V1.11.pdf?csf=1&web=1&e=WBy5Pi)) interpreteren ze categorie heel anders. Zij zien het niet als categorie van de Allergy, maar als relevante voor medicatie gebruik. Dat is echt functioneel wat anders. In de zib is categorie bedoeld als de categorie van de allergie, dus voor "HUISSTOFMIJTENALLERGEEN" verwachten we de category "Stof of product" b.v.

Versiebeheer
================================================================================================================================================================================================================================================================================================================================================================

| Versienummer | Datum | Herkomst | Wijzigingen |
| --- | --- | --- | --- |
|  | 01-10-2025 | Analyse fase voor toevoegen Sanday huisartsgegevens |
|  | 06-10-2025 | IG/FO overleg | FO overgezet naar 'nieuwe' vorm |
