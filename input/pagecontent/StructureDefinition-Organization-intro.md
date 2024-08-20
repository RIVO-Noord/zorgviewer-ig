{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Zorgaanbieder](https://zibs.nl/wiki/Zorgaanbieder-v3.1.1(2017NL))

### Zoeken naar identifiers

* [Vektiz AGB Register zoeken](https://www.vektis.nl/agb-register/zoeken) system=http://fhir.nl/fhir/NamingSystem/agb-z
* [HL7 NL OID Register](https://hl7.nl/actuele-hl7-nl-oid-register.html) system=urn:oid:2.16.840.1.113883.2.4.3
* [URA UZI Register Abonneenummer](https://www.zorgcsp.nl/zoeken/UitgegevenServerCertificatenUzi) http://fhir.nl/fhir/NamingSystem/ura
* Voorbeeld:
    * [Vektiz AGB Register UMCG](https://www.vektis.nl/agb-register/onderneming-06020101)

### Requests

1. Opvragen (search) naar organisatie op basis van de organisatie AGB, OID of URA

    `GET <bronsysteem-ontsluiting-base/Organization?identifier=<URA|AGB|OID>`

{% include bronsysteem-herkennen.md %}
