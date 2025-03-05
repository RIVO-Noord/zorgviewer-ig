<style>table, td, th { border: 1px solid black; padding:5px; }</style>

Deze pagina beschrijft de interacties tussen de bouwblokken voor het opstarten van de zorgviewer en het ontsluiten van de bronsystemen.

### Bouwblokken

{% include img.html img="bouwblokken.png" caption="Bouwblokken" width="70%" %}

| | |
| --- | --- |
| **[Toestemming](CapabilityStatement-Toestemming.html)** | Inwoners van onze zorgregio geven op één keer, op één plek zorgverleners toestemming, dat zij  hun zorggegevens mogen inzien van andere behandelaren en vanuit andere zorgorganisaties. |
| **Gebruikers [Authenticatie](design-authenticatie.html)** | Klopt het dat jij als zorgverlener bent, wie je zegt dat je bent? Werk jij echt bij die zorgorganisatie? Door middel van twee factor authenticatie binnen je eigen informatieomgeving wordt jouw identiteit op twee manieren gecheckt. Met deze authenticatie heb je ook toegang tot de Zorgviewer. |
| **Autorisatie** | Welke informatie van patiënten en cliënten is voor mij als zorgverlener beschikbaar? Mag je als apotheker bijvoorbeeld de volledige zorginformatie zien of heb je enkel inzag in labuitslagen en medicatie?<br/>**N.B. Zorgviewer heeft 1 autorisatie profiel, namelijk alle Zorgverleners die toegang hebben tot de Zorgviewer hebben toegang tot het ontsloten dossier van de patiënt of cliënt als die toestemming heeft gegeven.** |
| **[Patiëntindex](CapabilityStatement-Toestemming.html)** | De patiëntindex maakt inzichtelijk bij welke zorgorganisaties de patiënt of cliënt bekend is. De zorgviewer bevraagt bij het inloggen door een zorgverlener enkel de informatiesystemen van deze zorgorganisaties. |
| **[Logging](design-logging.html)** | Wie logt wanneer en waar in? Het geautomatiseerde logboek houdt exact bij welke zorgverlener toegang heeft gevraagd en gekregen tot de zorginformatie van een patiënt of cliënt. |
| **[Behandelplan](CapabilityStatement-Behandelplan.html)** | De stappen die je als patiënt of cliënt doorloopt in het zorgpad. In de zorgviewer zie je een digitale weergave van het -regionaal overeengekomen- zorgpad. Aan de gestructureerde stappen ‘hangen’ informatiecomponenten vast. |
| **[Ontsluiting bronsysteem](CapabilityStatement-OntsluitenBronsysteem.html)** | Elk informatiesysteem communiceert in een eigen taal. Dit technische bouwblok is een koppeling, die ervoor zorgt, dat alle zorginformatie uit de verschillende bronsystemen in de zorgviewer in dezelfde taal beschikbaar is. |
| **Overname** *TOEKOMST* | Is de zorginformatie -beschikbaar in de zorgviewer, afkomstig van een ander bronsysteem- voor jou als zorgverlener relevant, dan kan je deze selecteren en overnemen in de informatieomgeving van jouw zorgorganisatie. |
| **Zorgviewer** | Alle bouwblokken samen vormen de zorgviewer. De zorgviewer combineert, ontdubbelt en filtert de informatie op basis van jouw behoefte als zorgverlener. De zorgviewer biedt zorgverleners een 360° beeld van de patiënt of cliënt. Opgebouwd uit alle beschikbare zorginformatie, waarvoor de patiënt of cliënt toestemming heeft gegeven. |
| **[Zorgviewer Services](zorgviewer-services.html)** | Bouwblokken voor generieke services |

**Multi-inzetbaar**: *De bouwblokken zijn niet alleen bruikbaar voor de regionale zorgviewer, maar zijn ook bruikbaar en essentieel voor het delen van diagnostiek, multidisciplinair overleg, monitoring en e-Health en de Persoonlijke Gezondheidsomgeving (PGO).* |

### Bouwblokken samenwerking

In onderstaande schema zie je de groepering en interacties (in globale volgorde) tussen de verschillende bouwblokken.

<div>
{% include Zorgviewer-comp-1.svg width="60%" %}
</div>

### Functionaliteiten

Hierna volgt een schema met functionaliteiten per bouwblok.

<div>
{% include Functionaliteiten.svg width="60%" %}
</div>

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
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | ``SNOMED CT 62247001 huisarts`` | PractitionerRole.code[system=sct] |
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
| Practitioner Role | urn:oasis:names:tc:xacml:2.0:subject:role | `<Role code="62247001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED_CT" displayName="huisarts" xmlns="urn:hl7-org:v3"/>` | PractitionerRole.code[system=sct] |
| Practitioner Name | professional.initials | `L.` | Practitioner.name.given[extension=IN] |
| Practitioner Name | professional.family_name | `Arts` | Practitioner.name.family |
| Patient Name | client.initials | `J.` | Patient.name.given[extension=IN] |
| Patient Name | client.family_name | `Fictief` | Patient.name.family |
| Patient Birthdate | client.birthdate | `19700101` | Patient.birthDate |
| Patient BSN | client.bsn | `999911120` | Patient.identifier[system=bsn] |

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

### Bevragen bronsystemen zorgaanbieders documenten

**Van toepassing zijnde standaarden en documentatie**:
* [MedMij PDF/a](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA)
* [Chipsoft Documenten API](https://developer.zorgplatform.online/digital-care/api/document)

<div>
{% include Zorgviewer-seq-4.svg %}
</div>
