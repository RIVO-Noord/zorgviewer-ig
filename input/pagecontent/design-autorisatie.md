Na authenticatie in het eigen systeem (Zorgviewer Host) van de zorgverlener kan de zorgviewer worden opgestart. Daarvoor zijn bepaalde attributen nodig (1ste tabel) die al dan niet met een mapping of lookup worden omgezet in minimaal vereiste attributen i.h.k.v. wettelijke Logging bij het bevragen van de andere Bronsystemen (2de tabel).
De 1ste tabel toont de attributen ontvangen door de Zorgviewer van de Zorgviewer Host en de 2de tabel toont de attributen zoals ze worden meegestuurd bij bevragen bronsystemen.

### Opstarten zorgviewer: Summary Table

In onderstaande tabel hebben we voor alle methoden de verschillende definities van attributen naast elkaar gezet en waar ze te vinden zijn in de verschillende standaarden (SAML, SMART-on-FHIR, FHIR).

| Item | Sanday (SAML) | Nexus (SAML) | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Example | FHIR Path |
|--|--|--|--|--|--|--|--|
| Workflow ID | nvt | nvt | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `a84f5229-c804-4627-8b80-489ae3ed6a51` | nvt |
| Practitioner ID | `Subject/NameID` | `Subject/NameID` | `Subject/NameID` | `Subject/NameID` | Practitioner read adhv `token.practitioner` | `177578` | Practitioner.identifier |
| Practitioner Name Initials | - | ?? | - | `professional.initials` | *zie FHIR Path* | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Family Name | - | ?? | - | `professional.family_name` | *zie FHIR Path* | `Arts` | Practitioner.name.family |
| Practitioner Name | `zorgverlener.volledigenaam` | ?? | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | - | *zie FHIR Path* | `L. Arts` | Practitioner.name |
| Practitioner Role | *translate*[^1] | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role *translate*[^5]  | urn:oasis:names:tc:xacml:2.0:subject:role | *translate*[^4] PractitionerRole read adhv `token.practitioner` | `code=62247001 display=huisarts system=SNOMED CT` of [ConceptMap-rolcodenl](ConceptMap-rolcodenl.html) `urn:oid:2.16.840.1.113883.2.4.15.111.01.000` | PractitionerRole.code[system=sct] n.b. via [ConceptMap-epic-rolcode](ConceptMap-epic-rolcode.html) |
| Organization OID | *lookup*[^2] | urn:oasis:names:tc:xspa:1.0:subject:organization-id | urn:oasis:names:tc:xspa:1.0:subject:organization-id | `organization-id` | *zie FHIR Path* | `2.16.840.1.113883.2.4.3.8` | Practitioner.meta[extension=source] |
| Patient BSN | `patient.BSN` | `client.bsn` | urn:oasis:names:tc:xacml:1.0:resource:resource-id | `client.bsn` | Patient read adhv `token.patient` | `999911120` | Patient.identifier[system=bsn] |
| Patient FHIR ID | *request*[^3] |  ?? |`patient-fhir-id` uit Task.reference read adhv `workflow-id` | - | `token.patient` | `9819C39260647B5DE61609CDF1FA1C` | Patient.id |
| Patient Name Initials | - | `client.initials` | Patient.read adhv `patient-fhir-id` / *zie FHIR Path* | `client.initials` | *zie FHIR Path* | `J.` | Patient.name.given[extension=IN] |
| Patient Family Name | - | `client.family_name` | *zie FHIR Path* | `client.family_name` | *zie FHIR Path* | `Fictief` | Patient.name.family |
| Patient Name | `patient.volledigenaam` | - | *zie FHIR Path* | - | *zie FHIR Path* | `J. Fictief` | Patient.name |
| Patient Birthdate | `patient.geboortedatum` | `client.birthdate` | *zie FHIR Path* | `client.birthdate` | *zie FHIR Path* | `19700101` | Patient.birthDate |
{: .grid .table-striped}

[^1]: Omzetten naar SNOMED CT adhv `zorgverlener.functie.omschrijving` in [ConceptMap-sanday](ConceptMap-sanday.html)

[^2]: Opzoeken OID adhv `zorgverlener.praktijkURA`

[^3]: Adhv request [Patient/$match](StructureDefinition-Patient.html#requests) (optie 3)

[^4]: Omzetten naar SNOMED CT in [ConceptMap-epic-rolcode](ConceptMap-epic-rolcode.html)

[^5]: Omzetten naar SNOMED CT in [ConceptMap-rolcodenl](ConceptMap-rolcodenl.html)

### Verkrijgen bronsysteem access token

<blockquote class="stu-note" markdown="1">
N.B. Deze IG bouwt op SMART-on-FHIR 1.0.0 ivm FHIR STU3 en Scopes notatie. De bijbehorende backend authenticatie is gespecificeerd in Bulk Data Access FHIR specificaties. SMART-on-FHIR 2.0 brengt eea weer samen, maar upgrade ook de Scopes en de FHIR versie naar R4. Daarom blijven wij voor MVP2 bij de 1.0.0 versie.
</blockquote>

<blockquote class="stu-note" markdown="1">
N.B. Vanuit de WEGIZ wordt de TA Notified Pull een eis. Richting de toekomst zullen de verschillende bronsystemen hier naartoe werken.
Naast SMART-on-FHIR zal de TA Notified Pull de voorkeur standaard zijn. Tot die tijd moeten we meerdere vormen ondersteunen, zie de Summary Tables. 
</blockquote>

Hier passen we de request access token flow toe van de Bulk Data Access Backend authenticatie specificaties.
Daarnaast ivm NEN 7513 logging requirement moet het bronsysteem de vragende organisatie weten. De vragende organisatie is de organisatie van de geauthenticeerde gebruiker van de Zorgviewer. De [IHE IUA standaard](https://profiles.ihe.net/ITI/IUA/) beschrijft de attribuut naam die hiervoor gebruikt dient te worden in de authentication JWT die mee gaat naar de access token request. Dit is ook zoals LSP/VZVZ dit doet.
```
{ "iss": "...",
  "sub": "...",
  "exp": "...",
  (optioneel) "subject_organization": "UMCG",
  "subject_organization_id": "urn:oid:2.16.840.1.113883.2.4.3.8" 
}
```

### Bevragen bronsysteem: Summary Table

In onderstaande tabel hebben we voor alle methoden de verschillende definities van attributen naast elkaar gezet en waar ze te vinden zijn in de verschillende standaarden (Zorgviewer, SAML, SMART-on-FHIR, TA Notified Pull).

| Item | Generiek (HTTP-Header) | **TA Notified Pull** | Sanday (SAML) | Nexus (SAML) | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Value | FHIR Path |
|--|--|--|--|--|--|--|--|--|--|
| PurposeOfUse |   | *FHIR Task.code* | nvt | nvt | urn:oasis:names:tc:xspa:1.0:subject:purposeofuse | nvt | nvt | `TREATMENT` | nvt |
| Workflow ID |   | *FHIR Task.identifier* | nvt | nvt | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `a84f5229-c804-4627-8b80-489ae3ed6a51` | nvt |
| Patient BSN |   | auth_token.patient | *via $match* | ?? | urn:oasis:names:tc:xacml:1.0:resource:resource-id | client.bsn | auth_token.patient | `999911120` | Patient.identifier[system=BSN] |
| Practitioner ID | X-ZV-Subject-Id | auth_token.user_id | ?? | ?? | Subject/NameID | Subject/NameID | auth_token.subject_id en HTTP-Header AORTA-ID usr | `177578` | Practitioner.identifier |
| Practitioner Role | X-ZV-Subject-Role | auth_token.user_role | ?? | ?? | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role | auth_token.subject_role en HTTP-Header AORTA-ID rol | `code=62247001 display=huisarts system=SNOMED CT` | Practitioner.qualification[system=sct] |
| Practitioner Name |   |   | ?? | ?? | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.initials + professional.family_name | auth_token.subject_name | `L. Arts` | Practitioner.name |
| Requesting Organization (OID) | X-ZV-Subject-Organization-Id | auth_token.sub | context-requester-org-id | ?? |  urn:oasis:names:tc:xspa:1.0:subject:organization-id | urn:oasis:names:tc:xspa:1.0:subject:organization-id | auth_token.subject_organization_id en HTTP-Header AORTA-ID org | `2.16.528.1.1007.3.3.15123` | Practitioner.meta[extension=source] |
| Requesting Organization (URA) | X-ZV-Subject-Organization-Ura |  |  | ?? |  |  | auth_token.subject_organization_ura | `12345678` | Practitioner.meta[extension=source] http://fhir.nl/fhir/NamingSystem/ura |
| Target Organization (AGB) | | | context-target-ord-id | | | | | |
| Correlation ID | X-Correlation-Id |   | ?? | ?? | &#8656; | &#8656; | HTTP-Header AORTA-ID cid | [NaN0-1D-12](https://zelark.github.io/nano-id-cc/) `H54f_8b9d6bC` | nvt |
| Request ID | X-Request-Id |   | ?? | ?? | &#8656; | &#8656; | HTTP-Header AORTA-ID rid | [NaN0-1D-12](https://zelark.github.io/nano-id-cc/) `1b9d6bCd-bBf` | nvt |
| Context | X-ZV-Context |   | ?? | ?? | &#8656; | &#8656; | &#8656; | zie boven |   |
{: .grid .table-striped}
