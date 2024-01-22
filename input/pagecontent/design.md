<style>table, td, th { border: 1px solid black; padding:5px; }</style>

Deze pagina beschrijft de interacties tussen de systemen. 
Dit is de startpagina voor het bouwteam.

### Actors

Scope is Epic (UMCG, MCL), Chipsoft (Antonius Sneek, Tjongerschans, Wilhelmina, Martini, Nij Smellinge), en Topicus VIPlive (bij Dokter Drenthe aangesloten partijen).

### System Actors

Note: (?) Probeer definities te hergebruiken uit [IHE Actors](https://gazelle.ihe.net/GMM/tf/actor/listActors.seam), b.v. de [IHE Mobile Profiles IHE_PCC_Suppl_QEDm](https://www.ihe.net/uploadedFiles/Documents/PCC/IHE_PCC_Suppl_QEDm.pdf)

* Clinical Data Consumer "Raadpleger" - Zorgviewer bouwblok
* Clinical Data Source "Beschikbaar steller" - Ontsluiten Bronsysteem bouwblok
* Authorization Client, Result Aggregator - Zorgviewer bouwblok
* Authorization Server - Authenticatie bouwblok
* Provider Information Directory - Zorgverlener Registry bouwblok

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
| Workflow ID | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | ``?`` | nvt |
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
| Organization OID | urn:oasis:names:tc:xspa:1.0:subject:organization-id | ``urn:oid:2.16.840.1.113883.2.4.3.8`` | Organization.identifier |
| Practitioner ID | Subject/NameID | ``?`` | Practitioner.identifier |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | ``<Role code="62247001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED_CT" displayName="huisarts" xmlns="urn:hl7-org:v3"/>`` | Practitioner.qualification[system=sct] |
| Practitioner Name | professional.initials | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Name | professional.family_name | `Arts` | Practitioner.name.family |
| Patient Name | client.initials | `J.` | Patient.name.given[extension=IN] |
| Patient Name | client.family_name | ``Fictief`` | Patient.name.family |
| Patient Birthdate | client.birthdate | `19700101` | Patient.birthDate |
| Patient BSN | client.bsn | ``999911120`` | Patient.identifier[system=bsn] |

### Opstarten zorgviewer: Summary Table

In onderstaande tabel hebben we voor alle methoden de verschillende definities van attributen naast elkaar gezet en waar ze te vinden zijn in de verschillende standaarden (SAML, SMART, FHIR).

| Item | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Value | FHIR Path |
|--|--|--|--|--|--|
| Workflow ID | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `?` | nvt |
| Practitioner ID | Subject/NameID | Subject/NameID | Practitioner read adhv token.practitioner / *zie FHIR Path* | `larts@2.16.528.1.1007.3.3.15123` | Practitioner.identifier |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role | ^^ / *zie FHIR Path* | ``code=62247001 display=huisarts system=SNOMED CT`` | Practitioner.qualification[system=sct] |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.initials | ^^ / *zie FHIR Path* | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | professional.family_name | ^^ / *zie FHIR Path* | `Arts` | Practitioner.name.family |
| Organization OID | urn:oasis:names:tc:xspa:1.0:subject:organization-id | organization-id | ^^ / *zie FHIR Path* | `urn:oid:2.16.840.1.113883.2.4.3.8` | Practitioner.meta[extension=source] |
| Patient BSN | urn:oasis:names:tc:xacml:1.0:resource:resource-id | client.bsn | Patient read adhv token.patient / *zie FHIR Path* | ``999911120`` | Patient.identifier[system=bsn] |
| Patient FHIR ID | patient-fhir-id uit Task.reference read adhv workflow-id |  | token.patient / *zie FHIR Path* | `abcd` | Patient.id |
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

### Bevragen terminologie

*TODO*
Opvragen CodeSystems en ValueSets voor gebruik in de Zorgviewer.

**Van toepassing zijnde standaarden en documentatie**:
* [FHIR Terminology Service](https://hl7.org/fhir/STU3/terminology-service.html)

### Bevragen bronsystemen zorgaanbieders

**Van toepassing zijnde standaarden en documentatie**:
* [Bulk Data Access Backend Authentication](http://hl7.org/fhir/uv/bulkdata/authorization/index.html#obtaining-an-access-token)
* [IHE Internet User Authorization (IUA)](https://profiles.ihe.net/ITI/IUA/)
* [MedMij BgZ 2017 FHIR](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
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
Epic ondersteunt dit nu dmv key-value pairs in de `AORTA-ID` HTTP-Header, zie [Epic Nova](https://nova.epic.com/Search.aspx?CstID=2#SearchTerm=818072).
Voorbeeld voor Epic HTTP-Header van "L. Arts uit Tjongerschans": `AORTA-ID: req=3aaab721-f8ae-4cbb-a83a-67306ffd04ae; usr=larts; rol=62247001; org=2.16.528.1.1007.3.3.15123`. N.B. zonder de sessionId, want de maximale lengte is 128 characters.

### Bevragen bronsysteem: Summary Table

In onderstaande tabel hebben we voor alle methoden de verschillende definities van attributen naast elkaar gezet en waar ze te vinden zijn in de verschillende standaarden (SAML, SMART, FHIR).

| Item | Chipsoft Zorgplaform (SAML) | VIPLive (SAML) | Epic (SMART-on-FHIR) | Value | FHIR Path |
|--|--|--|--|--|--|
| PurposeOfUse | urn:oasis:names:tc:xspa:1.0:subject:purposeofuse | nvt | nvt | `TREATMENT` | nvt |
| Workflow ID | http://sts.zorgplatform.online/ws/claims/2017/07/workflow/workflow-id | nvt | nvt | `?` | nvt |
| Patient ID | urn:oasis:names:tc:xacml:1.0:resource:resource-id | ? | nvt | `999911120` | Practitioner.identifier[system=BSN] |
| Practitioner ID | Subject/NameID | Subject/NameID | auth_token.subject_id en HTTP-Header AORTA-ID usr | `..` | Practitioner.identifier |
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | urn:oasis:names:tc:xacml:2.0:subject:role | auth_token.subject_role en HTTP-Header AORTA-ID rol | `code=62247001 display=huisarts system=SNOMED CT` | Practitioner.qualification[system=sct] |
| Practitioner Name | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name | ? | auth_token.subject_name | `L. Arts` | Practitioner.name |
| Organization OID | urn:oasis:names:tc:xspa:1.0:subject:organization-id | ? | auth_token.subject_organization_id en HTTP-Header AORTA-ID org | `urn:oid:2.16.840.1.113883.2.4.3.8` | Practitioner.meta[extension=source] |
| Zorgviewer Sessio ID | HTTP-Header X-Correlation-Id UUID | HTTP-Header X-Correlation-Id | x | | nvt |
| Zorgviewer Request ID | HTTP-Header X-Request-Id UUID | HTTP-Header X-Request-Id | HTTP-Header AORTA-ID req | `3aaab721-f8ae-4cbb-a83a-67306ffd04ae` | nvt |

### Bevragen bronsystemen zorgaanbieders documenten

**Van toepassing zijnde standaarden en documentatie**:
* [MedMij PDF/a](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA)
* [Chipsoft Documenten API](https://developer.zorgplatform.online/digital-care/api/document)

<div>
{% include Zorgviewer-seq-4.svg %}
</div>
