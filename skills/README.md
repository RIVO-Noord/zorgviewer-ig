# SKILLs

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

---
IMPROVEMENTS
- Laat zibs.nl en simplifier gebruiken voor definities. Zibs 2017 of 2020.
- Laat alleen die files maken en kijk niet verder. Wil nu ook gegenereerde includes maken.
- Gebruik alleen de codes in de zib definities.
- De query code parameters moeten in de ViewDefinition where worden meegenomen.
- Also get the example from simplifier and add it in `input/examples/<ZibName>-Nictiz.json`