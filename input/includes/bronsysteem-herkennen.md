### Bronsysteem herkennen

De *Zorgviewer-backend* of *Ontsluiten bronsysteem* **MOET** na bevragen van het bronsysteem aan elk resultaat resource een meta-tag toevoegen met de AGB, OID of URA identifier van de zorgaanbieder (zie [Organization](StructureDefinition-Organization.html) voor voorbeelden). Dit wordt vervolgens gebruikt in de "Bron" kolom in de Zorgviewer-frontend. N.B. We gebruiken hier een *pre-adopt* van de FHIR R4 [Meta.source](StructureDefinition-extension-Meta.source.html).

Toevoegen aan elke response, dus per resource (bij een read) of per Bundle (bij een search):
```json
"meta": {
    "extension": [ {
        "url": "http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source",
        "valueUri": "urn:oid:2.16.840.1.113883.2.4.3.8"
    } ]
}
```

*Alternatief:* Elke entry van een search response Bundle bevat een referentie naar de bijbehorende Patient (``<resource>.subject|patient``). Elke patient heeft een ``Patient.managingOrganization`` en in de gerefereerde ``Organization.identifier`` staat vervolgens o.a. de OID van het bronsysyeem. Of je gebruikt de identifiers om een volledige Organization op te zoeken in het [adresboek](zorgviewer-services.html#adressering) en zie inhoud [hier](artifacts.html#zorgviewer-services-content).