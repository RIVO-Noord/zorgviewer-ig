
### eAfspraak Dependency Issue

Door een issue in de eAfspraak package van Nictiz kunnen we nu niet onderstaande toevoegen.
Het issue heeft te maken met de dependency van eAfspraak met de wildcard versie 2.0.x van de zibs package.
Tot 15-jan-2026 (IG Publisher v2.0.29) werkte het correct. Vanaf die datum lijkt het niet meer te werken.
Na wat verder kijken lijkt het niet de IG Publisher versie te zijn, maar iets met de packages.

StructureDefinition-Appointment.json:
```json
  "baseDefinition": "http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment"
```
CapabilityStatement-OntsluitenBronsysteem.json:
```json
  "profile": [
    {
      "reference": "http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment",
      "display": "eAfspraak-Appointment"
    } ]
```
zorgviewer-ig.json:
```json
  "dependsOn": [
    {
      "id": "eafspraak",
      "uri": "https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6",
      "packageId": "nictiz.fhir.nl.stu3.eafspraak",
      "version": "1.0.6"
    } ]
```
