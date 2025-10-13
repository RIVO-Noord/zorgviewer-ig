### Algemeen
Deze pagina beschrijft testcases die gebruikt worden om de werking van de Zorgviewer te toetsen op basis van de bestaande Zorgviewer kolommen. Door een gestandaardiseerde "basis patiënt" in te voeren in alle aangesloten systemen, kunnen we controleren of gegevens correct en consistent worden weergegeven in de Zorgviewer. Er zijn enkele negatieve tests opgenomen, de registraties in het bronsysteem zullen dan juist niet getoond worden in Zorgviewer.

### Instructie
- Voor het registreren van de test cases geldt in alle gevallen, gebruik de werkwijze voor registratie zoals deze door de zorgverleners in het eigen systeem worden gebruikt. Vul de gevraagde gegevens bijvoorbeeld niet in onder een beheerdersaccount of via een methode die niet door de zorgverleners kan worden gebruikt in productie. 
- Voor de testcases veronderstellen wij dat de gegevens worden ingevuld door het type zorgverlener die dit ook in productie doet.
- De voorbeelddata is grotendeels gebaseerd op voorbeelddata uit [ZIB2017](https://zibs.nl/wiki/ZIB_Publicatie_2017(NL)) en is mogelijk niet klinisch relevant.

### Testpatiënten

| Testpatiënt nummer | Type testpatiënt                                                                        | Aan te maken test data                                                   | Verwacht resultaat                                                  |
| ------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| 1                  | Patiënt met consent   <br>Bij voorkeur: BSN 000004881  <br>T.E.S.T. Zorgviewer 1-2-1973 | Alle in zorgviewer getoonde informatie                                   | Data wordt getoond conform EPD                                      |
| 2                  | Patiënt zonder consent                                                                  | 1 Zib bijvoorbeeld: probleem registratie (of andere zib die in scope is) | Wordt geen data getoond in de Zorgviewer                            |
| 3                  | Patiënt met ongeverieerde BSN                                                           | Geen data vereist voor de test                                           | BSN waarschuwing#1 wordt getoond in Zorgviewer en geen data getoond |
| 4                  | 2 of meer patiënten met zelfde BSN                                                      | Geen data vereist voor de test                                           | BSN waarschuwing#2 wordt getoond in Zorgviewer en geen data getoond |
{: .grid .table-striped}

### Testpatiënt 1

Omschrijving testpatiënt 1: alle hieronder genoemde testcases kunnen bij testpatiënt 1 worden geregistreerd. Deze patiënt moet consent voor het delen van gegevens hebben gegeven. Zonder consent toont de data niet in Zorgviewer.

#### Patiëntgegevens 

| Testpatiënt 1 | Patiëntgegevens     |                                                                            |
| ------------- | ------------------- | -------------------------------------------------------------------------- |
| **Veld**      | **Waarde**          | **Opmerkingen**                                                            |
| Naam          | T.E.S.T. Zorgviewer |                                                                            |
| Test BSN      | 000004881           | _{Indien dit test BSN niet beschikbaar is, noteren welk BSN is gebruikt.}_ |
| Geboortedatum | 1-2-1973            |                                                                            |
{: .grid .table-striped}

#### Correspondentie

Maak een verwijsbrief aan als arts voor testpatiënt 1. Includeer in de verwijsbrief de opmerking 'test Zorgviewer'. 
 
| Testpatiënt 1 | Correspondentie - verwijsbrief         |
| ------------- | -------------------------------------- |
| Datum         | _{Datum van vandaag}_                  |
| Beschrijving  | Verwijsbrief                           |
| Auteur        | _{Zorgverlener}_                       |
| Specialisme   | _{Specialisme ingelogde zorgverlener}_ |
{: .grid .table-striped}

#### Problemen (incl. diagnoses)

Gebruik voor het registreren van de problemen/ diagnoses de beschikbare DHD variant. 

| Testpatiënt 1 | Problemen (incl. diagnoses) - status actief                             |
| ------------- | ----------------------------------------------------------------------- |
| Datum         | 10-08-2012                                                              |
| Diagnose      | Oedeem                                                                  |
| Status        | Actueel/Actief                                                          |
| Toelichting   | Geleidelijk in de loop van dagen erger geworden. Geen roodheid of pijn. |
{: .grid .table-striped}

| Testpatiënt 1 | Problemen (incl. diagnoses) - status inactief |
| ------------- | --------------------------------------------- |
| Datum         | 15-11-2012                                    |
| Diagnose      | Kortademigheid                                |
| Status        | Niet actueel/ Inactief                        |
| Toelichting   | _{Geen}_                                      |
{: .grid .table-striped}

| Testpatiënt 1 | Problemen (incl. diagnoses) - status inactief, met einddatum |
| ------------- | ------------------------------------------------------------ |
| Datum         | 20-04-2011                                                   |
| Diagnose      | Polsfractuur                                                 |
| Status        | Niet actueel/ Inactief                                       |
| Einddatum     | 07-06-2011                                                   |
| Toelichting   | Gevallen op kunstijsbaan.                                    |
{: .grid .table-striped}

#### Verrichtingen

Gebruik voor het registreren van de verrichtingen de beschikbare DHD Verrichtingenthesaurus variant. 

| Testpatiënt 1   | Klinische verrichting        |
| --------------- | ---------------------------- |
| Datum           | 05-06-2012                   |
| Verrichting     | implantatie van polsprothese |
| Locatie         | UMCG                         |
| Uitgevoerd door | {_{Naam orthopeed}_}         |
| Lateraliteit    | Links                        |
{: .grid .table-striped}

| Testpatiënt 1   | Poliklinische verrichting |
| --------------- | ------------------------- |
| Datum           | 07-08-2025                |
| Verrichting     | huidtest met latex        |
| Locatie         | _{Eigen locatie}_         |
| Uitgevoerd door | _{Zorgverlener}_          |
{: .grid .table-striped}

#### Behandelaanwijzingen

| Testpatiënt 1          | Behandelaanwijzingen, ja |
| ---------------------- | ------------------------ |
| Datum                  | 11-9-2012                |
| Behandeling            | Opname op Intensive Care |
| Behandeling toegestaan | Ja                       |
| Beperkingen            | geen                     |
| Geverifieerd bij       | gevolmachtigde           |
| Status                 | Actueel/actief           |
| Toelichting            |                          |
{: .grid .table-striped}

| Testpatiënt 1          | Behandelaanwijzingen, ja maar met beperkingen |
| ---------------------- | --------------------------------------------- |
| Datum                  | 10-05-2024                                    |
| Behandeling            | Cardiopulmonaire resuscitatie                 |
| Behandeling toegestaan | Ja, maar met beperkingen                      |
| Beperkingen            | eerst overleg met echtgenote                  |
| Geverifieerd bij       | patiënt                                       |
| Status                 | Actueel/actief                                |
| Toelichting            | besproken tbv opname                          |
{: .grid .table-striped}

| Testpatiënt 1          | Behandelaanwijzingen, nee |
| ---------------------- | ------------------------- |
| Datum                  | 10-05-2024                |
| Behandeling            | antibiotische therapie    |
| Behandeling toegestaan | Nee                       |
| Beperkingen            | geen beperkingen          |
| Geverifieerd bij       | patiënt                   |
| Status                 | Niet actueel/ inactief    |
| Toelichting            | besproken tbv opname      |
{: .grid .table-striped}

| Testpatiënt 1          | Behandelaanwijzingen, onbekend |
| ---------------------- | ------------------------------ |
| Datum                  | 10-05-2024                     |
| Behandeling            | opname in ziekenhuis           |
| Behandeling toegestaan | Onbekend                       |
| Beperkingen            | onbekend                       |
| Geverifieerd bij       |                                |
| Status                 | actief                         |
| Toelichting            |                                |
{: .grid .table-striped}

#### Wilsverklaringen

Maak een wilsverklaring document aan. 

| Testpatiënt 1 | Wilsverklaring             |
| ------------- | -------------------------- |
| Datum         | 15-08-2021                 |
| Type          | Niet reanimeren verklaring |
| Toelichting   | Test tekst Zorgviewer      |
{: .grid .table-striped}

#### Laboratoriumuitslagen

Gebruik de normale workflow voor het genereren van laboratoriumuitslagen.

| Testpatiënt 1         | Laboratoriumuitslagen |
| --------------------- | --------------------- |
| Afnamedatum           | {_{Vandaag}_}         |
| Test                  | Natrium               |
| Testuitslag           | 138 mmol/l            |
| Onder- en bovengrens  | 136 - 146 mmol/l      |
| Materiaal             | Bloed                 |
| Status                | Definitief            |
| Commentaar            | buis 1                |
| Toelichting materiaal | serum                 |
{: .grid .table-striped}

| Testpatiënt 1         | Laboratoriumuitslagen |
| --------------------- | --------------------- |
| Afnamedatum           | {_{Vandaag}_}         |
| Test                  | Chloride              |
| Testuitslag           | 138 mmol/l            |
| Onder- en bovengrens  | 99 - 108 mmol/l       |
| Materiaal             | Bloed                 |
| Status                | Definitief            |
| Commentaar            | buis 2                |
| Toelichting materiaal | serum                 |
{: .grid .table-striped}

| Testpatiënt 1         | Laboratoriumuitslagen |
| --------------------- | --------------------- |
| Afnamedatum           | {_{Vandaag}_}         |
| Test                  | Magnesium             |
| Testuitslag           | 0.2 mmol/l            |
| Onder- en bovengrens  | 0.7 - 1 mmol/l        |
| Materiaal             | Bloed                 |
| Status                | Definitief            |
| Commentaar            | buis 3                |
| Toelichting materiaal | serum                 |
{: .grid .table-striped}

| Testpatiënt 1         | Laboratoriumuitslagen |
| --------------------- | --------------------- |
| Afnamedatum           | {_{Vandaag}_}         |
| Test                  | Kalium                |
| Testuitslag           | 60 mmol/l             |
| Onder- en bovengrens  | 3.5 - 5 mmol/l        |
| Materiaal             | Bloed                 |
| Status                | Definitief            |
| Commentaar            | buis 4                |
| Toelichting materiaal | serum                 |
{: .grid .table-striped}

#### Alerts/waarschuwingen

| Testpatiënt 1 | Alerts/waarschuwingen, actueel  |
| ------------- | ------------------------------- |
| Datum         | 01-12-2023                      |
| Voor          | Drager van besmettelijke ziekte |
| Status        | Actief/ actueel                 |
{: .grid .table-striped}

| Testpatiënt 1 | Alerts/waarschuwingen, niet actueel |
| ------------- | ----------------------------------- |
| Datum         | 18-03-2024                          |
| Voor          | Drager MRSA                         |
| Status        | Inactief/ niet actueel              |
{: .grid .table-striped}

#### Allergieën en intoleranties

| Testpatiënt 1 | Allergieën en intoleranties |
| ------------- | --------------------------- |
| Datum         | 08-11-2008                  |
| Stof          | Bijengif                    |
| Toelichting   |                             |
| Categorie     | Stof of product             |
| Ernst         | Ernstig                     |
| Reacties      | Misselijk en braken         |
| Status        | Actief                      |
{: .grid .table-striped}

| Testpatiënt 1 | Allergieën en intoleranties |
| ------------- | --------------------------- |
| Datum         | 02-06-1998                  |
| Stof          | Penicilline                 |
| Toelichting   | Details onbekend            |
| Categorie     | Medicijn                    |
| Ernst         | Licht                       |
| Reacties      | Exantheem                   |
| Status        | Inactief                    |
{: .grid .table-striped}

#### Medicatie

| Testpatiënt 1                         | Medicatie, medicatie afspraak                 |
| ------------------------------------- | --------------------------------------------- |
| Datum                                 | {_Vandaag_}                                     |
| Medicatie                             | Lisinopril tablet 10mg                        |
| Dosering en instructies               | Van 8-9-2025 tot 18-9-2025 1x per dag 1 stuk. |
| Toedieningsweg                        |      Oraal                                         |
| Stop type                             | Definitief                                    |
| Medicatie vorm                        | Tablet                                        |
| Afspraakdatum (bij medicatieafspraak) |                                               {_Vandaag_}
| Voorschrijver                         | _{Zorgverlener}_                              |
{: .grid .table-striped}

| Testpatiënt 1                            | Medicatie, medicatie gebruik                                  |
| ---------------------------------------- | ------------------------------------------------------------- |
| Datum                                    |       {_Vandaag_}                                                        |
| Medicatie                                | Paracetamol tablet 500 mg                                     |
| Dosering en instructies                  | In de maand september heb ik regelmatig paracetamol gebruikt. |
| Toedieningsweg                           | Oraal                                                         |
| Stop type                                |                                                               |
| Medicatie vorm                           | Tablet                                                        |
| Registratiedatum  (bij medicatiegebruik) | 1-9-2025                                                      |
| Voorschrijver                            |                                                               |
{: .grid .table-striped}

#### Vaccinaties

| Testpatiënt 1 | Vaccinaties           |
| ------------- | --------------------- |
| Datum         | 03-06-2023            |
| Product       | Hepatitis A vaccin    |
| Toelichting   | Bezoek aan Guatemala. |
{: .grid .table-striped}

#### Vitale gegevens

| Testpatiënt 1 | Vitale gegevens, lengte |
| ------------- | ----------------------- |
| Datum         | 11-03-2025              |
| Waarde        | 153 cm                  |
| Uitvoerder    | _{Zorgverlener}_        |
| Toelichting   | Met schoenen aan        |
{: .grid .table-striped}

| Testpatiënt 1 | Vitale gegevens, gewicht |
| ------------- | ------------------------ |
| Datum         | 11-03-2025               |
| Waarde        | 72 kg                    |
| Uitvoerder    | _{Zorgverlener}_         |
| Toelichting   | Lichte kleding/ondergoed |
{: .grid .table-striped}

| Testpatiënt 1 | Vitale gegevens, bloeddruk        |
| ------------- | --------------------------------- |
| Datum         | _{Vandaag}_                       |
| Meting        | Bloeddruk                         |
| Waarde        | 125/75 mmHg                       |
| Uitvoerder    | _{Zorgverlener}_                  |
| Methode       | Non-invasive                      |
| Meetlocatie   | rechter bovenarm                  |
| Toelichting   | Liggend gemeten tijdens onderzoek |
{: .grid .table-striped}

### Testpatiënt 2

Patiënt zonder consent | Bijvoorbeeld probleem registratie | Wordt geen data getoond in de Zorgviewer |

Gebruik een testpatiënt die geen consent heeft en bijvoorbeeld wel een geregistreerd probleem, controleer of er geen data wordt getoond in Zorgviewer.

### Testpatiënt 3

Patiënt met ongeverieerde BSN | Geen data vereist voor de test | BSN waarschuwing#1 wordt getoond in Zorgviewer en geen data getoond |

Gebruik een testpatiënt met een ongeverifieerde BSN. De patiënt hoeft geen registraties in het dossier te hebben. Controleer of de BSN waarschuwing wordt getoond in Zorgviewer.

Waarschuwing: 'Deze patiënt heeft een ongeldig of nog niet gevalideerd BSN nummer'

### Testpatiënt 4

2 of meer patiënten met zelfde BSN | Geen data vereist voor de test | BSN waarschuwing#2 wordt getoond in Zorgviewer en geen data getoond |

Maak twee of meer testpatiënten aan met hetzelfde BSN. Deze testpatiënten hoeven geen registraties in het dossier te hebben. Controleer of de BSN waarschuwing wordt getoond. 

Waarschuwing: 'Bron '_{Eigen systeem}_ bevat meerdere patiënten met dit BSN nummer.'