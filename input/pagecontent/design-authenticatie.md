### Opstarten zorgviewer: Summary Table

In onderstaande tabel hebben we voor alle methoden de verschillende definities van attributen naast elkaar gezet en waar ze te vinden zijn in de verschillende standaarden (SAML, SMART-on-FHIR, FHIR).

| Item | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Value | FHIR Path |
|--|--|--|--|--|--|
| Workflow ID | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `a84f5229-c804-4627-8b80-489ae3ed6a51` | nvt |
| Practitioner ID | Subject/NameID | Subject/NameID | Practitioner read adhv token.practitioner / *zie FHIR Path* | `177578` | Practitioner.identifier |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.initials | ^^ / *zie FHIR Path* | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.family_name | ^^ / *zie FHIR Path* | `Arts` | Practitioner.name.family |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role | PractitionerRole read adhv token.practitioner | `code=62247001 display=huisarts system=SNOMED CT` | PractitionerRole.code[system=sct] n.b. via [ConceptMap-epic-rolcode](ConceptMap-epic-rolcode.html) |
| Organization OID | urn:oasis:names:tc:xspa:1.0:subject:organization-id | organization-id | ^^ / *zie FHIR Path* | `2.16.840.1.113883.2.4.3.8` | Practitioner.meta[extension=source] |
| Patient BSN | urn:oasis:names:tc:xacml:1.0:resource:resource-id | client.bsn | Patient read adhv token.patient / *zie FHIR Path* | `999911120` | Patient.identifier[system=bsn] |
| Patient FHIR ID | patient-fhir-id uit Task.reference read adhv workflow-id |  | token.patient / *zie FHIR Path* | `9819C39260647B5DE61609CDF1FA1C` | Patient.id |
| Patient Name | ^^ / *zie FHIR Path* | client.initials | ^^ / *zie FHIR Path* | `J.` | Patient.name.given[extension=IN] |
| Patient Name | ^^ / *zie FHIR Path* | client.family_name | ^^ / *zie FHIR Path* | `Fictief` | Patient.name.family |
| Patient Birthdate | ^^ / *zie FHIR Path* | client.birthdate | ^^ / *zie FHIR Path* | `19700101` | Patient.birthDate |

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

| Item | Generiek (HTTP-Header) | **TA Notified Pull** | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Value | FHIR Path |
|--|--|--|--|--|--|--|--|
| PurposeOfUse |   | *FHIR Task.code* | urn:oasis:names:tc:xspa:1.0:subject:purposeofuse | nvt | nvt | `TREATMENT` | nvt |
| Workflow ID |   | *FHIR Task.identifier* | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `a84f5229-c804-4627-8b80-489ae3ed6a51` | nvt |
| Patient BSN |   | auth_token.patient | urn:oasis:names:tc:xacml:1.0:resource:resource-id | client.bsn | auth_token.patient | `999911120` | Patient.identifier[system=BSN] |
| Practitioner ID | X-ZV-Subject-Id | auth_token.user_id | Subject/NameID | Subject/NameID | auth_token.subject_id en HTTP-Header AORTA-ID usr | `177578` | Practitioner.identifier |
| Practitioner Role | X-ZV-Subject-Role | auth_token.user_role | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role | auth_token.subject_role en HTTP-Header AORTA-ID rol | `code=62247001 display=huisarts system=SNOMED CT` | Practitioner.qualification[system=sct] |
| Practitioner Name |   |   | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.initials + professional.family_name | auth_token.subject_name | `L. Arts` | Practitioner.name |
| Organization OID | X-ZV-Subject-Organization-Id | auth_token.sub | urn:oasis:names:tc:xspa:1.0:subject:organization-id | urn:oasis:names:tc:xspa:1.0:subject:organization-id | auth_token.subject_organization_id en HTTP-Header AORTA-ID org | `2.16.528.1.1007.3.3.15123` | Practitioner.meta[extension=source] |
| Correlation ID | X-Correlation-Id |   | &#8656; | &#8656; | HTTP-Header AORTA-ID cid | [NaN0-1D-12](https://zelark.github.io/nano-id-cc/) `H54f_8b9d6bC` | nvt |
| Request ID | X-Request-Id |   | &#8656; | &#8656; | HTTP-Header AORTA-ID rid | [NaN0-1D-12](https://zelark.github.io/nano-id-cc/) `1b9d6bCd-bBf` | nvt |
| Context | X-ZV-Context |   | &#8656; | &#8656; | &#8656; | zie boven |   |
{: .grid .table-striped}
