Op deze pagine beschrijven we de conformiteit met de verschillende NEN normen als gevolg van de [Wet EGIZ](https://www.gegevensuitwisselingindezorg.nl/gegevensuitwisseling/uitleg-over-de-wet) en bijbehorende [NEN-Normen](https://www.nen-egiz.nl/overzicht-normen/) van toepassing op de Zorgviewer.

### Normen voor specifieke gegevensuitwisselingen

* [NEN 7540:2022](https://www.nen.nl/nen-7540-2022-ontw-nl-302516) 
    * Zorgviewer is conform de "BGZ-uitwisseling tussen instellingen voor medisch specialistische zorg" 
    * "Figuur 9 – Usecase Opvragen BgZ" 
    * En voor "6.4.7. Stap 7: Verwerken BgZ' ondersteund het de "Inzien" functie
* (TTA Direct Pull)[https://vzvz.atlassian.net/wiki/spaces/Twiincon/pages/331847141/10.2.4+TTA+FHIR+-+Pull] *in ontwikkeling*

### Normen voor generieke functies

* NEN 7517 – Toestemming *in ontwikkeling*
* NEN 7518 – Identificatie & Authenticatie *in ontwikkeling*
* NEN 7519 – Lokalisatie - [Normontwerp](https://normontwerpen.nen.nl/Home/Details/931?_gl=1*1fahnj8*_ga*MTY2NjY5OTI4MS4xNjkwMzYzMjg5*_ga_C13P8HNDG2*MTY5ODkyMDE5Ni45MS4xLjE2OTg5MjA1MzEuMC4wLjA.) gepubliceerd en open voor inzage

### Normen voor informatiebeveiliging

* [NEN 7510-2:2017](https://www.nen.nl/nen-7510-2-2017-nl-238787)
    * [AuditEvent](StructureDefinition-AuditEvent.html)
* [NEN 7512:2022](https://www.nen.nl/nen-7512-2022-nl-297137)
* [NEN 7513:2023](https://www.nen.nl/nen-7513-2023-ontw-nl-309856)
    * [AuditEvent](StructureDefinition-AuditEvent.html)

### Bouwblokken x Norm

|Bouwblok|Norm|
|-|-|
|Logging|NEN 7510, 7513|
|Toestemming|NEN 7517, NEN 7519 (Lokalisatie)|
|Authenticatie|NEN 7518|
|Zorgviewer, Ontsluiten bronsysteem|NEN 7540|
