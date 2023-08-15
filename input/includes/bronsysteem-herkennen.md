### Bronsysteem herkennen

De *Zorgviewer-backend* of *Ontsluiten bronsysteem* **MOET** na bevragen van het bronsysteem aan elk resultaat resource een meta-tag toevoegen met de VEKTIS AGB-Z code of de HL7 NL OID van de zorgaanbieder. Dit wordt vervolgens gebruikt in de "Bron" kolom in de Zorgviewer-frontend. N.B. We gebruiken hier een pre-adopt van de FHIR R4 Meta.source.

Toevoegen aan elke response, dus per resource (bij een read) of per Bundle (bij een search):
```json
"meta": {
    "extension": [ {
        "url": "http://hl7.org/fhir/R4/StructureDefinition/extension-Meta.source",
        "valueUri": "uri:oid:2.16.840.1.113883.2.4.3.8"
    } ]
}
```