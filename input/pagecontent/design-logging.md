### Gerelateerde Artifacts

* [Logging](CapabilityStatement-Logging.html)
* Opstart Zorgviewer ([AuditEvent](StructureDefinition-AuditEvent.html))

### Toevoegen Logging HTTP-Headers

Tbv het correleren van de Zorgviewer logging met de logging van een Bronsysteem dient een `X-Correlation-Id` HTTP Header (per sessie) en een `X-Request-Id` HTTP Header (per request) te worden toegevoegd aan ieder request aan het Bronsysteem. Deze kan dan door het Bronsysteem gelogd worden, zodat de logging in de Zorgviewer kan worden gekoppeld aan de logging in het Bronsysteem.
Epic ondersteunt dit nu d.m.v. key-value pairs in de `AORTA-ID` HTTP-Header, zie [Epic Nova](https://nova.epic.com/Search.aspx?CstID=2#SearchTerm=818072).
Voorbeeld voor Epic HTTP-Header van "L. Arts uit Tjongerschans": `AORTA-ID: rid:1b9d6bCd-bBf;cid:yA8UM8fHmhde;usr:larts;rol:62247001;org:2.16.528.1.1007.3.3.15123`. N.B. maximale lengte is 128 characters.
Voor de Request- en Correlation-ID's kan de [NaN0-1D-12](https://zelark.github.io/nano-id-cc/) 12 tekens gebruikt.

Voorbeeld van de headers:
```
GET /fhir/Patient/123456789 HTTP/1.1
...
X-Request-Id: 1b9d6bCd-bBf
X-Correlation-Id: H54f_8b9d6bC
```

### Gebruiker en Organisatie HTTP-Headers

De overige velden worden op twee manieren meegestuurd: individueel als HTTP header en verpakt in een
JWT, tevens als HTTP header.
De JWT variant is de veiligere optie, omdat de JWT ondertekend is en de waarden daarmee niet aangepast
kunnen worden. Het is echter niet perse gegarandeerd dat deze constructie door een bronsysteem
ondersteund wordt. Daarom worden ze ook individueel als HTTP header meegestuurd.
Voor de naamgeving is gekozen voor een prefix `X-ZV-` (Zorgviewer) gevolgd door de naam van het veld,
die weer gebaseerd zijn op [IHE IUA](https://profiles.ihe.net/ITI/IUA/#3714221-json-web-token-option).

Voorbeeld van de headers per veld:
```
GET /fhir/Patient/123456789 HTTP/1.1
...
X-ZV-Subject-Organization-Id: 2.16.840.1.113883.2.4.3.8
X-ZV-Subject-Id: smart-Practitioner-71614502
X-ZV-Subject-role: 223366009
```

Voorbeeld van de JWT:
```
{
 "subject_organization_id": "2.16.840.1.113883.2.4.3.8",
 "subject_id": "smart-Practitioner-71614502",
 "subject_role": "223366009"
}
```

De JWT wordt ondertekend met de private key waarmee ook de JWT voor het request voor access tokens
wordt ondertekend. Hiervoor is al een route ingericht om het publieke deel van de key op te vragen ([JWKS](https://auth.zorgviewer.nl/.well-known/jwks)).
Vervolgens wordt de JWT in een custom HTTP header geplaatst:
```
GET /fhir/Patient/123456789 HTTP/1.1
...
X-ZV-Context:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0X29yZ2FuaXphdGlvbl9pZCI6I
jIuMTYuODQwLjEuMTEzODgzLjIuNC4zLjgiLCJzdWJqZWN0X2lkIjoic21hcnQtUHJhY3RpdGl
vbmVyLTcxNjE0NTAyIiwic3ViamVjdF9yb2xlIjoiMjIzMzY2MDA5In0.luhI3cpGGpoEIAtDi
8d-Bhf0h2wdEO1f_Jt1xHFe1Xc
```
Het ontvangende systeem kan nu de JWT decoden, valideren en de velden uitlezen.