# SKILLs

## Azure DevOps wijzigingsoverzicht

Vraag de work-itemupdates en wiki-paginarevisies van Project Zorgviewer op met:

```bash
node skills/get-devops-changes.js
```

Standaard loopt de periode vanaf 20 november van dit jaar (of het vorige jaar) tot nu. Gebruik `--from YYYY-MM-DD` en `--to YYYY-MM-DD` voor een eigen periode; de einddatum is inclusief. Per work item wordt ook de huidige area vermeld. `--json` geeft JSON-uitvoer. De PAT wordt gelezen uit `PAT` of uit `.env` in de repository-root; geef de token nooit als argument mee.

### Personal access token aanmaken

1. Meld je aan bij [Azure DevOps UMCG-MIT](https://dev.azure.com/UMCG-MIT/) met een account dat toegang heeft tot de work items en wiki van Zorgviewer.
2. Open **User settings** en kies **Personal access tokens**. Kies **+ New Token**.
3. Geef de token een naam, kies organisatie **UMCG-MIT** en stel een zo kort mogelijke geldigheidsduur in.
4. Kies **Custom defined** en selecteer alleen **Work Items: Read** en **Wiki: Read**. Volledige toegang en schrijfrechten zijn niet nodig.
5. Kies **Create** en kopieer de token direct; deze wordt daarna niet opnieuw getoond. Bewaar hem veilig.
6. Zet de token lokaal in het bestand `.env` in de repository-root, op een regel met `PAT=<token>`. Een bestaande omgevingsvariabele `PAT` heeft voorrang op `.env`.

Behandel de PAT als een wachtwoord: deel hem niet in chat, commando's of uitvoer en commit hem nooit. `.env` wordt door Git genegeerd. Trek een gelekte token direct in. Voor meer informatie, zie de [Microsoft-documentatie over PAT's](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops).

## zib-fhir-generator

Prompt:
Maak een skill aan die adhv een zib fhir profile de bijbehorende bestanden aanmaakt.
Bijvoorbeeld voor de zib Alert die in het FHIR profiel  
https://simplifier.net/resolve?scope=nictiz.fhir.nl.stu3.zib2017@2.3.2&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Alert die de ViewDefinition aanmaakt in @example/ViewDefinition-Flag.json de bijbehorende FHIR StructureDefinition met
must-support @example/StructureDefinition-Flag.json en de markdown intro in @example/StructureDefinition-Flag-intro.md
Gebruik de zib naam in de filenames ipv de ResourceName.

> gemini skill install /app/skills/zib-fhir-generator

Gebruik prompt:
Genereer artifacts voor de zib-Mobiliteit profile

### Constraints
- Laat zibs.nl en simplifier gebruiken voor definities.
- Gebruik Zibs 2017 STU3 of als STU3 niet bestaat dan zibs 2020 R4.
- Laat alleen de templated files maken.
- Gebruik alleen de codes in de zib definities.
- De query code parameters moeten in de ViewDefinition where worden meegenomen.
- Also get the example from simplifier and add it in `input/examples/<ZibName>-Nictiz.json`

### TODO
- Niet door script gegenereerde includes maken (run updateviewmd.js)
- Hij update zelf wel zorgviewer-ig.js met examples!
- Markeer alleen must support elementen die worden gebruikt in de gegevensherkomst.
- Stijlgids toevoegen (als we die hebben), maar in ieder geval: Bron kolom altijd als eerste en daarna "logische" datum kolom en dan de rest.

## fo-generator

Maak een fo-generator skill aan die adhv een zib fhir profile de bijbehorende functioneel ontwerp (FO) aanmaakt adhv de template @Functionele-Ontwerpen-\(FO\'s\)/%2ATemplate-Functioneel-Ontwerp.md
Bijvoorbeeld voor de zib @Functionele-Ontwerpen-\(FO\'s\)/Allergieën-en-intoleranties.md 
Die is gemaakt adhv de zib fhir profiel AllergyIntolerance gevonden op https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/artifacts.html 

### Constraints
- Laat zibs.nl en simplifier gebruiken voor definities.
- Gebruik Zibs 2017 STU3 of als STU3 niet bestaat dan zibs 2020 R4.
- Laat alleen de templated files maken.
- Volgorde van de kolommen in het schermontwerp in het FO document moet overeenkomen met de volgorde in de UI Wireframe.
- Gebruik bij Gegevensherkomst link naar de IG de '#kolomdefinities' variant.

> cd _local/Zorgviewer.wiki
> gemini skill install fo-generator

Gebruik prompt voorbeeld:
"Genereer FO voor het Medisch Hulpmiddel profile"

### Bevindingen
- Use Cases en Test Cases missen in template
- Template niet altijd helemaal duidelijk e.g. "gedrag kaart" is niet duidelijk.
- Uitleg bij disclaimer mist