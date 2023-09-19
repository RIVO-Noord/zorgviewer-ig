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

### Opstarten zorgviewer

Eerst opstarten Zorgviewer Host, inloggen en patiënt selectie en vervolgens opstarten van de Zorgviewer.

**Van toepassing zijnde standaarden en documentatie**:
* [SMART-on-FHIR 1.0.0](http://hl7.org/fhir/smart-app-launch/1.0.0/)
* [EHR Launch](http://hl7.org/fhir/smart-app-launch/1.0.0/#ehr-launch-sequence)
* [Epic SSO Launching](https://appmarket.epic.com/Article/Index?docid=launching)
* [Chipsoft Web Browser Single-Sign-On](https://developer.zorgplatform.online/digital-care/authenticatie)

<div>
{% include Zorgviewer-seq-1-fhir.svg %}
</div>

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
* [IHE Internet User Authorization (IUA)](https://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_Suppl_IUA.pdf)
* [MedMij BgZ 2017 FHIR](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
* Epic
      * [Epic Backend Authentication](https://appmarket.epic.com/Article/Index?docid=oauth2&section=BackendOAuth2Guide)
      * [Epic Galaxy: Backend System Integrations](https://galaxy.epic.com/Redirect.aspx?DocumentID=100001068&PrefDocID=97042)
      * [Epic FHIR](https://appmarket.epic.com/Sandbox/)
* Chipsoft
      * [Chipsoft BgZ API](https://developer.zorgplatform.online/digital-care/api/bgz)
      * [Chipsoft Service Authenticatie](https://developer.zorgplatform.online/digital-care/authenticatie)

#### Verkrijgen bronsysteem access token

<blockquote class="stu-note" markdown="1">
N.B. Deze IG bouwt op SMART-on-FHIR 1.0.0 ivm FHIR STU3 en Scopes notatie. De bijbehorende backend authenticatie is gespecificeerd in Bulk Data Access FHIR specificaties. SMART-on-FHIR 2.0 brengt eea weer samen, maar upgrade ook de Scopes en de FHIR versie naar R4. Daarom blijven wij voor MVP2 bij de 1.0.0 versie.
</blockquote>

Hier passen we de request access token flow toe van de Bulk Data Access Backend authenticatie specificaties.
Daarnaast ivm NEN 7513 logging requirement moet het bronsysteem de vragende organisatie weten. De vragende organisatie is de organisatie van de geauthenticeerde gebruiker van de Zorgviewer. De IHE IUA standaard beschrijft de attribuut naam die hiervoor gebruikt dient te worden in de authentication JWT die mee gaat naar de access token request. Dit is ook zoals LSP/VZVZ dit doet.
```
{ "iss": "...",
  "sub": "...",
  "exp": "...",
  (optioneel) "subject_organization": "UMCG",
  "subject_organization_id": "urn:oid:2.16.840.1.113883.2.4.3.8" 
}
```

#### Toevoegen X-Request-Id HTTP Header

Tbv het correleren van de Zorgviewer logging met de logging van een Bronsysteem dient een `X-Request-Id` HTTP Header (zie [Custom Headers to support logs/audit](https://hl7.org/fhir/R4/http.html#custom)) te worden toegevoegd aan ieder request aan het Bronsysteem. Deze kan dan door het Bronsysteem gelogd worden.
<div style="margin: 5px; padding: 10px; color: #3c763d; background-color: #dff0d8; border: 4px solid black;">
<b>In de toekomst kijken we naar de <a href="https://www.w3.org/TR/trace-context/">W3C Recommendation Trace Context</a>. Niet in scope MVP2.</b>
</div>

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
