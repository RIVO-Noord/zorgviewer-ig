<blockquote class="stu-note" markdown="1">
Dit Profiel is het resultaat van de vergelijking tussen de zib2017 FHIR Profiel en de implementaties in Epic en Chipsoft.
De elementen die in ieder geval in alle output beschikbaar zullen zijn.
Voornamelijk bedoeld voor houvast van een client en voor validatie van output.
</blockquote>

### Bronsysteem herkennen

De Zorgviewer-backend **MOET** na bevragen van het bronsysteem aan elk resultaat resource een meta-tag toevoegen met de VEKTIS code of de HL7 NL OID van de zorgaanbieder, zodat dit kan worden gebruikt in de presentatie in de Zorgviewer-frontend.

Toevoegen aan elke response, dus per resource (bij een read) of per Bundle (bij een search):
```
{ ...
  "meta": {
    "tag": [
      { "system": "http://hl7.nl/fhir/zorgviewer-ig/bronsysteem-zorgaanbieder",
        "code": "06020101",
        "display": "UMCG"
      } ] }
  ... }
```