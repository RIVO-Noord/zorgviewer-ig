### Bronsysteem herkennen

De *Zorgviewer-backend* of *Ontsluiten bronsysteem* **MOET** na bevragen van het bronsysteem aan elk resultaat resource een meta-tag toevoegen met de VEKTIS AGB-Z code of de HL7 NL OID van de zorgaanbieder, zodat dit kan worden gebruikt in de presentatie in de Zorgviewer-frontend.

Toevoegen aan elke response, dus per resource (bij een read) of per Bundle (bij een search):
```
{ ...
  "meta": {
    "tag": [
      { "system": "http://hl7.nl/fhir/zorgviewer-ig/bronsysteem-zorgaanbieder",
        "code": "06020101", // UMCG AGB-Z of UMCG oid "2.16.840.1.113883.2.4.3.8"
        "display": "UMCG"
      } ] }
  ... }
```