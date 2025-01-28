Als basis voor deze non functional requirements is [Programma-van-Eisen-BgZ-MSZ-usecase-inzien-hergebruik-22-okt-24](https://nationalebibliotheek.nictiz.nl/bibliotheek/bgz-msz/) uit de Nationale Bibliotheek gebruikt.
Deze zijn herschreven vanuit het Zorgviewer perspectief.
... in principe zijn deze non functionals niet specifiek voor de gegevensset (BgZ) en zelfs niet voor de rollen (MSZ), ze zijn generiek voor al de beoogte rollen (ziekenhuis, huisarts, verpleegkundig, paramedisch) van de RIVO.

| ID | Kort | Requirement | Prio |
| --- | --- | --- | --- |
| 1 | Consistente Weergave | De weergave van de specifieke zib informatie die altijd zichtbaar moet zijn, moet snel en consistent zijn, ongeacht de omvang van de informatie in het systeem. | 1 |
| 2 | Efficiënte Weergave | De optionele weergave van zib informatie moet snel en efficiënt uitgevoerd worden. | 1 |
| 3 | Leesbaarheid | Informatie moet op een begrijpelijke en leesbare manier gepresenteerd worden. | 1 |
| 4 | Snelle Implementatie | De Zorgviewer moet in staat zijn om de doorontwikkeling van een uniforme codelijst snel te implementeren om zorgverleners snel de beschikbaarheid hierover te geven.<br/>*Bijvoorbeeld als een bronsysteem de DHD VT toevoegd moet dit snel zichtbaar zijn in de Zorgviewer* | 1 |
| 5 | Interoperabiliteit | De uniforme codelijsten in de Bronsystemen moeten voldoen aan interoperabiliteitseisen om uitwisseling te kunnen waarborgen. | 1 |
| 6 | Consistentie en Betrouwbaarheid | De uniforme codelijsten in de Bronsystemen moeten continue geüpdatet worden om consistentie en betrouwbaarheid van de lijsten te waarborgen. De doorontwikkeling moet stabiel zijn met geen fouten en inconsistente gegevens. | 1 |
| 7 | Interoperabiliteit van BgZ | Het ontvangen en opslaan van de BgZ (zib elementen) in de Bronsystemen moet voldoen aan interoperabiliteit om de uitwisseling en hergebruik te waarborgen. | 1 |
| 8 | Medische Relaties | De in de Bronsystemen aangegeven (medische) relaties moeten voldoen aan interoperabiliteitseisen om uitwisseling en hergebruik te waarborgen (mits beschikbaar in het bronsysteem). | 2 |
| 9 | Afwijkingen en Dubbelingen | De Zorgviewer moet signalering van afwijkingen/dubbelingen op een begrijpelijke en leesbare manier presenteren. | 1 |
| 10 | Snel en Consistent | Het ophalende (Zorgviewer) en beschikbaarstellende systeem (Bronsysteem) van de BgZ moet snel en consistent zijn, ongeacht de omvang van de informatie. | 1 |
| 11 | Efficiënt Ordenen | Het ordenen van BgZ gegevens moet snel en efficiënt plaatsvinden en consistent in de Zorgviewer worden gehandhaafd. | 2 |
| 12 | Filtermogelijkheden | De filtermogelijkheden om BgZ informatie te kunnen sorteren en/of filteren zijn te gebruiken op alle plekken in de Zorgviewer waar de informatie getoond wordt. | 2 |
| 13 | Gegevensbron | Het onderscheid tussen bron (Zorginstelling) van de gegevens is snel en intuïtief te maken. | 2 |
| 14 | Consistentie in Gegevens | De manier waarop het onderscheid tussen bron (Zorginstelling) van de gegevens is gemaakt wordt consistent toegepast in de Zorgviewer. | 1 |
| 15 | Suggesties voor Duplicaten | Het genereren van suggesties door de Zorgviewer voor duplicaten die niet overgenomen hoeven te worden moet snel en efficiënt plaatsvinden. | 2 |
| 16 | Minimale Handeling | Het wel of niet overnemen van de Zorgviewer suggesties voor het wel of niet overnemen van duplicaten moet met een minimale handeling mogelijk zijn. | 2 |
| 17 | Efficiënt Accorderen | Het accorderen en overnemen van de BgZ gegevens in het Bronsysteem moet snel en efficiënt plaatsvinden. | 1 |
| 18 | Gebruikersinterface | De presentatie van gegevens uit de BgZ die niet geverifieerd en overgenomen zijn moet plaatsvinden binnen een duidelijk gestructureerde en overzichtelijke gebruikersinterface die intuïtief en gebruiksvriendelijk is. | 2 |
| 19 | Efficiënte Verwerking | De Zorgviewer moet de ontvangen zib-elementen efficiënt verwerken en weergeven binnen een aanvaardbare responstijd, zelfs bij een toename van het aantal externe gegevens. | 2 |
| 20 | SNOMED Codelijst | Voor de lijst met symptomen ([zib Allergie](StructureDefinition-AllergyIntolerance.html)) wordt gebruikt gemaakt van de SNOMED codelijst die door Nictiz wordt onderhouden. | 1 |
| 21 | Weergave-Koppeling | De weergave-koppeling tussen [zib Probleem](StructureDefinition-Condition.html) en [zib Verrichting](StructureDefinition-Procedure.html) moet snel en efficiënt uitgevoerd worden. | 1 |

> *Gebruikte Copilot prompt: "Zet de non-functionele eisen tabellen uit het document 'Programma-van-Eisen-BgZ-MSZ-usecase-inzien-hergebruik-22-okt-24.pdf' om naar een markdown tabel. Voeg een ID kolom toe, maak de ID's uniek, en voeg een korte term kolom toe na de ID kolom."*