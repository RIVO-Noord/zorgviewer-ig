### Doel

Het doel van de test cases is om de bestaande Zorgviewer kolommen te voorzien van data zodat er gecontroleerd kan worden of ingevulde data in het bronsysteem zichtbaar is in Zorgviewer. Er zijn enkele negatieve tests opgenomen, de registraties in het bronsysteem zullen dan juist niet getoond worden in Zorgviewer.

### Algemeen

- Voor het registreren van onderstaande test cases geldt in alle gevallen, gebruik de werkwijze voor registratie zoals deze door de zorgverleners worden gebruikt. Vul de gevraagde gegevens bijvoorbeeld niet in onder een beheerdersaccount of via een methode die niet door de zorgverleners kan worden gebruikt in productie. 
- Voor de testcases veronderstellen wij dat de gegevens worden ingevuld door een arts.
- De voorbeelddata is gebaseerd op voorbeelddata uit ZIB2017 en is mogelijk niet klinisch relevant.

**Toevoegen wat wel/niet wordt getoond (disclaimer).**

Hennie: italic nog aanvullen met haakjes

Check bij Lieke: begrijpbare lay-out? (duidelijk wat er gevraagd wordt om in te vullen?). Niet alle velden zijn waarschijnlijk 1:1 in het bronsysteem in te vullen. Bijvoorbeeld de status 'niet actueel' kan worden herleid door hoe dit in het bronsysteem is geregistreerd.

### Testpatiënt 1

Omschrijving testpatiënt 1: alle hieronder genoemde testcases kunnen bij testpatiënt 1 worden geregistreerd.



#### Patiëntgegevens 

| Testpatiënt 1 | Patiëntgegevens  | |
| --- | --- | --|
| **Veld** | **Waarde** | **Opmerkingen**|
| Naam | T.E.S.T. Zorgviewer ||
| Test BSN | 000004881 |_Indien dit test BSN niet beschikbaar is, noteren welk BSN is gebruikt._ |
| Geboortedatum | 01-02-1973 ||
{: .grid .table-striped}

#### Correspondentie

Scenario: maak een verwijsbrief aan als arts voor testpatiënt 1. Includeer in de verwijsbrief de opmerking 'test Zorgviewer'. 
 
| Testpatiënt 1 | Correspondentie - verwijsbrief |
| --- | --- | 
| Datum | _Datum van vandaag_ | 
| Beschrijving| Verwijsbrief | 
| Auteur | _Naam ingelogde zorgverlener_| 
| Specialisme | _Specialisme ingelogde zorgverlener_ |
{: .grid .table-striped}

#### Problemen (incl. diagnoses)

Gebruik voor het registreren van de problemen/ diagnoses de beschikbare DHD variant. 
| Testpatiënt 1 | Problemen (incl. diagnoses) - status actief|
| --- | --- | 
| Datum | 10-08-2012 | 
| Diagnose | Oedeem| 
| Status | Actueel/Actief | 
| Toelichting | Geleidelijk in de loop van dagen erger geworden. Geen roodheid of pijn.| 
{: .grid .table-striped}

| Testpatiënt 1 | Problemen (incl. diagnoses) - status inactief|
| --- | --- | 
| Datum | 15-11-2012 | 
| Diagnose | Kortademigheid| 
| Status | Niet actueel/ Inactief | 
| Toelichting | _Geen_  | 
{: .grid .table-striped}

| Testpatiënt 1 | Problemen (incl. diagnoses) - status inactief, met einddatum|
| --- | --- | 
| Datum | 20-04-2011 | 
| Diagnose | Polsfractuur| 
| Status | Niet actueel/ Inactief |
| Einddatum | 07-06-2011 | 
| Toelichting | Gevallen op kunstijsbaan. |
{: .grid .table-striped}

**Verificatie status (bevestigd) nog toevoegen in een apart voorbeeld? > wordt nu niet gebruikt in Zorgviewer** 
 **Voorbeeld met einddatum nodig? > houden** 


#### Verrichtingen

klinische verrichting (positieve test)
poliklinische verrichting (negatieve test)
Gebruik voor het registreren van de verrichtingen de beschikbare DHD Verrichtingenthesaurus variant. 

| Testpatiënt 1 | Klinische verrichting|
| --- | --- | 
| Datum | 05-06-2012 | 
| Verrichting | implantatie van polsprothese |
| Locatie |UMCG| 
| Uitgevoerd door | {_Naam orthopeed_}|
| Lateraliteit | Links | 
{: .grid .table-striped}

| Testpatiënt 1 | Poliklinische verrichting|
| --- | --- | 
| Datum |  | 
| Verrichting |  |
| Locatie || 
| Uitgevoerd door ||
| Lateraliteit | | 
{: .grid .table-striped}

**Uitgevoerd door specifiek een naam of het specialisme? > volgens de zib kan beide. Maar kies voor naam.** 
**Voorbeeld poliklinische verrichting> iets kiezen uit Epic**
Check of de verrichtingen in de verrichtingen t-rex zitten. 'Knie - prothese implantatie gewricht' zit er niet in.
Hennie: kies een poliklinische verrichting uit epic/verrichtingen t-rex (hechtingen verwijderen)

#### Behandelaanwijzingen

minimaal 1 van onze lijst (positieve test)
minimaal 1 die niet op onze lijst staat (negatieve test)

| Testpatiënt 1 | Behandelaanwijzingen, |
| --- | --- | 
| Datum |11-9-2012  | 
| Behandeling |Opname op Intensive Care| 
| Behandeling toegestaan |Ja| 
| Beperkingen || 
| Geverifieerd bij |gevolmachtigde| 
| Status |Actueel/actief| 
| Toelichting || 
{: .grid .table-striped}

| Testpatiënt 1 | Behandelaanwijzingen, |
| --- | --- | 
| Datum |  | 
| Behandeling || 
| Behandeling toegestaan || 
| Beperkingen || 
| Geverifieerd bij || 
| Status || 
| Toelichting || 
{: .grid .table-striped}

**Kan de lijst niet vinden > Differential table > waardelijst ([https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/ValueSet-ACPTreatmentCodelist.html](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/ValueSet-ACPTreatmentCodelist.html "https://build.fhir.org/ig/rivo-noord/zorgviewer-ig/valueset-acptreatmentcodelist.html"))**
**Moeten we de categorie actief uitvragen? > nee niet actief uitvragen (beheerder geen directe invloed op). Komt via de FHIR. Komt per bronsysteemtype een vaste waarde terug.**
**Willen we behandeling toegestaan ja/ ja, maar met beperkingen/ nee/ onbekend allemaal uitvragen? > Doe alle vier**
Cardiopulmonaire resuscitatie, Ja, maar met beperkingen, eerst overleg met echtgenote, patiënt, 11-9-2012 
Hennie: nog drie voorbeelden toevoegen

#### Wilsverklaringen

Maak een wilsverklaring document aan. 

| Testpatiënt 1 | Wilsverklaring|
| --- | --- | 
| Datum | 15-08-2021  | 
| Type |Niet reanimeren verklaring| 
| Toelichting |Test tekst Zorgviewer| 
{: .grid .table-striped}

**Wat uitvragen bij toelichting? vrije tekst? > Vrije tekst uitvragen**
**Verschillende soorten uitvragen? > Nee, zit verder geen logica achter die iets beinvloedt**

#### Laboratoriumuitslagen

Gebruik de normale workflow voor het genereren van laboratoriumuitslagen.

| Testpatiënt 1 | Laboratoriumuitslagen|
| --- | --- | 
| Afnamedatum | {_Vandaag_} |
| Test | Natrium| 
| Testuitslag | 138 mmol/l |
| Interpretatie | | 
| Onder- en bovengrens |136 - 146 mmol/l | 
| Materiaal | Bloed | 
| Status | Definitief | 
| Commentaar | {_vrije tekst_}| 
| Toelichting materiaal |{_vrije tekst_}|  
{: .grid .table-striped}

**Interpretatie een veld wat Zorgviewer zelf vult? > let op, zit logica in. Dus vier voorbeelden uitvragen, eentje binnen de waarden, eentje erboven, eentje eronder, eentje kritiek**
**Voorbeeld commentaar en toelichting?**

#### Alerts/waarschuwingen

| Testpatiënt 1 | Alerts/waarschuwingen, actueel|
| --- | --- | 
| Datum | 01-12-2023 |
| Voor | Drager van besmettelijke ziekte | 
| Categorie | | 
| Status | Actief/ actueel |  
{: .grid .table-striped}

| Testpatiënt 1 | Alerts/waarschuwingen, niet actueel|
| --- | --- | 
| Datum | 18-03-2024 |
| Voor | Drager MRSA | 
| Status | Inactief/ niet actueel |  
{: .grid .table-striped}

**Kunnen we categorie actief uitvragen of zit dit achter 'voor' > nee, heeft te maken met waar de alert in de FHIR zit.
Willen we nog specifieke voorbeelden t.b.v. voor uitvragen gezien de logica in zorgviewer? > nee, dit is een fix dus niet in de test uitvragen**

#### Allergieën en intoleranties

| Testpatiënt 1 | Allergieën en intoleranties|
| --- | --- | 
| Datum | 08-11-2008 |
| Stof |Bijengif| 
| Toelichting || 
| Categorie |Stof of product| 
| Ernst |Ernstig|
| Reacties |Misselijk en braken| 
| Status |Actief| 
{: .grid .table-striped}

| Testpatiënt 1 | Allergieën en intoleranties|
| --- | --- | 
| Datum | 02-06-1998 |
| Stof |Penicilline| 
| Toelichting |Details onbekend| 
| Categorie |Medicijn| 
| Ernst |Licht|
| Reacties |Exantheem| 
| Status |Inactief| 
{: .grid .table-striped}

#### Medicatie

| Testpatiënt 1 | Medicatie, medicatie afspraak|
| --- | --- | 
| Datum | 8-9-2025 |
| Medicatie | Lisinopril tablet 10mg| 
| Dosering en instructies | Van 8-9-2025 tot 18-9-2025 1x per dag 1 stuk.| 
| Toedieningsweg| |
| Stop type | Definitief| 
| Medicatie vorm | Tablet|
| Afspraakdatum (bij medicatieafspraak)| |
| Voorschrijver | _Naam zorgverlener_ |
{: .grid .table-striped}

| Testpatiënt 1 | Medicatie, medicatie gebruik|
| --- | --- | 
| Datum |  |
| Medicatie |Paracetamol tablet 500 mg | 
| Dosering en instructies |In de maand september heb ik regelmatig paracetamol gebruikt. | 
| Toedieningsweg| Oraal |
| Stop type | | 
| Medicatie vorm | Tablet |
| Registratiedatum  (bij medicatiegebruik)| 1-9-2025 |
| Voorschrijver | |
{: .grid .table-striped}

**Einddatum opgeven voor stop type definitief? > voor nu zo laten. Na de eerste keer kijken wat relevante scenario's zijn die we echt moeten doen**
**Ook een variant met de samengestelde informatie van dosering instructies bij medicatieafspraak? > niet specifiek uitvragen. Voor Epic mogelijk wel splitsen in 2.**
bewust biologicals en chemo niet uitgevraagd.

#### Vaccinaties

| Testpatiënt 1 | Vaccinaties|
| --- | --- | 
| Datum | 03-06-2023 |
| Product | Hepatitis A vaccin|
| Toelichting | Bezoek aan Guatemala. |
{: .grid .table-striped}

#### Vitale gegevens

| Testpatiënt 1 | Vitale gegevens|
| --- | --- | 
| Datum |  |
| Meting | | 
| Waarde | |
| Uitvoerder | |
| Methode |  |
| Meetlocatie | | 
| Toelichting | |
{: .grid .table-striped}

| Testpatiënt 1 | Vitale gegevens|
| --- | --- | 
| Datum |  _Vandaag_ |
| Meting | Bloeddruk | 
| Waarde | 125/75 mmHg |
| Uitvoerder | _Zorgverlener_ |
| Methode | Non-invasive |
| Meetlocatie | rechter bovenarm| 
| Toelichting | Liggend gemeten tijdens onderzoek |
{: .grid .table-striped}

**Waarde voor alles? Bloeddruk, gewicht, lengte, temperatuur, ademhaling, polsfrequentie, algemenemeting, O2saturatie, hartfrequentie? > Hoeven nu alleen maar lengte, gewicht en bloeddruk uit te vragen want ChipSoft/Zorgplatform**


--------------------
test cases 'Myrthe' toevoegen

| 1 | Patiënt met consent   <br>Bij voorkeur: BSN 999990019  <br>B. Aansluittest 2-2-1950 | Alle in zorgviewer getoonde informatie | Data wordt getoond conform EPD |
| --- | --- | --- | --- |
| 1.1 | Patiënt die **tijdens test** toestemming intrekt |   | Wordt geen data getoond in de Zorgviewer |
| 2 | Patiënt zonder consent | 1 Zib bijvoorbeeld: probleem registratie (of andere zib die in scope is) | Wordt geen data getoond in de Zorgviewer |
| 3 | Patiënt met ongeverieerde BSN | Geen data vereist voor de test | BSN waarschuwing#1 wordt getoond in Zorgviewer en geen data getoond |
| 4 | 2 of meer patiënten met zelfde BSN | Geen data vereist voor de test | BSN waarschuwing#2 wordt getoond in Zorgviewer en geen data getoond |
{: .grid .table-striped}
