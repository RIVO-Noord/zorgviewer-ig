<style>table, td, th { border: 1px solid black; padding:5px; }</style>

Deze pagina beschrijft de interacties tussen de bouwblokken voor het opstarten van de zorgviewer en het ontsluiten van de bronsystemen. 
Dit is de startpagina voor het bouwteam.

### Actors

Scope MVP2 is Epic (UMCG, MCL), Chipsoft (Antonius Sneek, Tjongerschans, Wilhelmina, Martini, Nij Smellinge), en Topicus VIPlive (bij Dokter Drenthe aangesloten partijen).

### IHE System Actors

Note: Relatie tussen bouwblokken en definities uit [IHE Actors](https://gazelle.ihe.net/GMM/tf/actor/listActors.seam), b.v. de [IHE Mobile Profiles IHE_PCC_Suppl_QEDm](https://www.ihe.net/uploadedFiles/Documents/PCC/IHE_PCC_Suppl_QEDm.pdf)

* Authorization Client, Result Aggregator - Zorgviewer bouwblok
* Authorization Server - Authenticatie bouwblok
* Provider Information Directory - Zorgverlener Registry bouwblok
* Clinical Data Consumer "Raadpleger" - Zorgviewer bouwblok
* Clinical Data Source "Beschikbaar steller" - Ontsluiten Bronsysteem bouwblok

### Sequence Diagrams

### Opstarten zorgviewer: Epic

Eerst opstarten Zorgviewer Host, inloggen en patiënt selectie en vervolgens opstarten van de Zorgviewer.

**Van toepassing zijnde standaarden en documentatie**:
* [SMART-on-FHIR 1.0.0](http://hl7.org/fhir/smart-app-launch/1.0.0/)
* [EHR Launch](http://hl7.org/fhir/smart-app-launch/1.0.0/#ehr-launch-sequence)
* [Epic SSO Launching](https://appmarket.epic.com/Article/Index?docid=launching)

<div>
{% include Zorgviewer-seq-1-fhir.svg %}
</div>

**Token Attributes mapping op FHIR tabel**:

| Scope | Name/Path | Value | FHIR Path |
|--|--|--|--|
| Practitioner FHIR ID | practitioner | ``ABCD..`` | Practitioner.id |
| Patient FHIR ID | patient | ``WXYZ..`` | Patient.id |

### Opstarten zorgviewer: Chipsoft HiX/Zorgplatform

Eerst opstarten Zorgviewer Host, inloggen en patiënt selectie en vervolgens opstarten van de Zorgviewer.

**Van toepassing zijnde standaarden en documentatie**:
* [XACML SAML Profile Version 2.0](https://docs.oasis-open.org/xacml/xacml-saml-profile/v2.0/xacml-saml-profile-v2.0.html)
* [Chipsoft Web Browser Single-Sign-On](https://developer.zorgplatform.online/digital-care/authenticatie)

<div>
{% include Zorgviewer-seq-1-zp.svg %}
</div>

**SAML Attributes Assertions mapping op FHIR tabel**:

| Item | Attribute Name/Path | Value | FHIR Path |
|--|--|--|--|
| Workflow ID | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | `a84f5229-c804-4627-8b80-489ae3ed6a51` | nvt |
| Practitioner ID | Subject/NameID | ``larts@2.16.528.1.1007.3.3.15123`` | Practitioner.identifier |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | ``SNOMED CT 62247001 huisarts`` | Practitioner.qualification[system=sct] |
| Patient BSN | urn:oasis:names:tc:xacml:1.0:resource:resource-id | ``999911120`` | Patient.identifier[system=bsn] |

### Opstarten zorgviewer: VIPlive

**Van toepassing zijnde standaarden en documentatie**:
* [XACML SAML Profile Version 2.0](https://docs.oasis-open.org/xacml/xacml-saml-profile/v2.0/xacml-saml-profile-v2.0.html)
* VIPLive Interconnect - IdP initiated SAML 2023-11-09 17:01:43 Versie 1.1

<div>
{% include Zorgviewer-seq-1-viplive.svg %}
</div>

**SAML Attributes Assertions op FHIR mapping tabel**:

| Item | Attribute Name/Path | Value | FHIR Path |
|--|--|--|--|
| Organization OID | urn:oasis:names:tc:xspa:1.0:subject:organization-id | ``2.16.840.1.113883.2.4.3.164.2.1.2`` | Organization.identifier |
| Practitioner ID | Subject/NameID | `177578` | Practitioner.identifier |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | `<Role code="62247001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED_CT" displayName="huisarts" xmlns="urn:hl7-org:v3"/>` | Practitioner.qualification[system=sct] |
| Practitioner Name | professional.initials | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Name | professional.family_name | `Arts` | Practitioner.name.family |
| Patient Name | client.initials | `J.` | Patient.name.given[extension=IN] |
| Patient Name | client.family_name | `Fictief` | Patient.name.family |
| Patient Birthdate | client.birthdate | `19700101` | Patient.birthDate |
| Patient BSN | client.bsn | `999911120` | Patient.identifier[system=bsn] |

### Opstarten zorgviewer: Summary Table

In onderstaande tabel hebben we voor alle methoden de verschillende definities van attributen naast elkaar gezet en waar ze te vinden zijn in de verschillende standaarden (SAML, SMART, FHIR).

| Item | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Value | FHIR Path |
|--|--|--|--|--|--|
| Workflow ID | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `a84f5229-c804-4627-8b80-489ae3ed6a51` | nvt |
| Practitioner ID | Subject/NameID | Subject/NameID | Practitioner read adhv token.practitioner / *zie FHIR Path* | `177578` | Practitioner.identifier |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role | ^^ / *zie FHIR Path* | `code=62247001 display=huisarts system=SNOMED CT` | Practitioner.qualification[system=sct] |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.initials | ^^ / *zie FHIR Path* | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.family_name | ^^ / *zie FHIR Path* | `Arts` | Practitioner.name.family |
| Organization OID | urn:oasis:names:tc:xspa:1.0:subject:organization-id | organization-id | ^^ / *zie FHIR Path* | `2.16.840.1.113883.2.4.3.8` | Practitioner.meta[extension=source] |
| Patient BSN | urn:oasis:names:tc:xacml:1.0:resource:resource-id | client.bsn | Patient read adhv token.patient / *zie FHIR Path* | `999911120` | Patient.identifier[system=bsn] |
| Patient FHIR ID | patient-fhir-id uit Task.reference read adhv workflow-id |  | token.patient / *zie FHIR Path* | `9819C39260647B5DE61609CDF1FA1C` | Patient.id |
| Patient Name | ^^ / *zie FHIR Path* | client.initials | ^^ / *zie FHIR Path* | `J.` | Patient.name.given[extension=IN] |
| Patient Name | ^^ / *zie FHIR Path* | client.family_name | ^^ / *zie FHIR Path* | `Fictief` | Patient.name.family |
| Patient Birthdate | ^^ / *zie FHIR Path* | client.birthdate | ^^ / *zie FHIR Path* | `19700101` | Patient.birthDate |

### Bepalen zorgaanbieders

Bepalen zorgaanbieders en endpoints zonder toestemming check
<div>
{% include Zorgviewer-seq-2a.svg %}
</div>

### Bepalen zorgaanbieders adhv toestemming

Bepalen zorgaanbieders en endpoints waarvoor toestemming is gegeven door de patiënt.

Met de Zorgviewer MVP2 zullen we een toestemming realiseren volgens de afspraken tussen de RIVO-Noord instellingen. Zie het beleid [hier](https://rivo-noord.nl/zorgviewer/toestemming). Deze zal zoveel mogelijk volgens de MITZ specificatie zijn. MITZ zal zich laten inspireren door de Zorgviewer specificaties.

**Van toepassing zijnde standaarden en documentatie**:
* MITZ Open autorisatie vraag gebruikt als lokalisatie vraag

<div>
{% include Zorgviewer-seq-2.svg %}
</div>

### Bevragen bronsystemen zorgaanbieders

**Van toepassing zijnde standaarden en documentatie**:
* [Bulk Data Access Backend Authentication](https://www.hl7.org/fhir/smart-app-launch/backend-services.html#obtain-access-token)
* [IHE Internet User Authorization (IUA)](https://profiles.ihe.net/ITI/IUA/)
* [MedMij BgZ 2017 FHIR](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
* [TA Notified Pull / TWIIN TTA FHIR](https://twiin-afsprakenstelsel.scrollhelp.site/ta12/10-2-5-tta-fhir-authentication-authorization)
* Epic
      * [Epic Backend Authentication](https://appmarket.epic.com/Article/Index?docid=oauth2&section=BackendOAuth2Guide)
      * [Epic Galaxy: Backend System Integrations](https://galaxy.epic.com/Redirect.aspx?DocumentID=100001068&PrefDocID=97042)
      * [Epic FHIR](https://appmarket.epic.com/Sandbox/)
* Chipsoft
      * [Chipsoft BgZ API](https://developer.zorgplatform.online/digital-care/api/bgz)
      * [Chipsoft Service Authenticatie](https://developer.zorgplatform.online/digital-care/authenticatie)

<div>
{% include Zorgviewer-seq-3.svg %}
</div>

#### Verkrijgen bronsysteem access token

<blockquote class="stu-note" markdown="1">
N.B. Deze IG bouwt op SMART-on-FHIR 1.0.0 ivm FHIR STU3 en Scopes notatie. De bijbehorende backend authenticatie is gespecificeerd in Bulk Data Access FHIR specificaties. SMART-on-FHIR 2.0 brengt eea weer samen, maar upgrade ook de Scopes en de FHIR versie naar R4. Daarom blijven wij voor MVP2 bij de 1.0.0 versie.
</blockquote>

<blockquote class="stu-note" markdown="1">
N.B. Vanuit de WEGIZ wordt de TA Notified Pull een eis. De richting de toekomst zullen de verschillende bronsystemen hiernaartoe werken.
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

#### Toevoegen Logging HTTP-Headers

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

#### Gebruiker en Organisatie HTTP-Headers

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


### Bevragen bronsystemen zorgaanbieders documenten

**Van toepassing zijnde standaarden en documentatie**:
* [MedMij PDF/a](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA)
* [Chipsoft Documenten API](https://developer.zorgplatform.online/digital-care/api/document)

<div>
{% include Zorgviewer-seq-4.svg %}
</div>
