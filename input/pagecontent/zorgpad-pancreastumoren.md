### Zorgpad Pancreastumoren

Dit zorgpad ondersteunt de regionale samenwerking rond patiënten met (verdenking op) een pancreastumor, conform het Regionaal Zorgpad Pancreastumoren van het Oncologienetwerk Groningen-Drenthe en het Oncologienetwerk Friesland (TTN Pancreascarcinoom, CONCEPT versie 0.98 maart 2026), gebaseerd op het zorgpad pancreastumoren van de regio Noord-Holland/Flevoland (dpcg-zorgpadpancreastumoren). Pancreasresecties zijn conform het Integraal Zorgakkoord (IZA) geconcentreerd in het UMCG (echelon-1); overige centra opereren als echelon-2 (met of zonder ERCP-faciliteit).

### Scope van deze FHIR-representatie

Het bronzorgpad is een uitgebreid, meerdere ziekenhuizen omvattend document (11 hoofdstukken + appendices) waarin veel stappen berusten op multidisciplinair overleg (MDO) en klinische afweging ("overweeg", "in overleg") in plaats van eenduidige, computable regels. Deze IG modelleert het gedeelte dat zich leent voor een ECA-regel (Event-Condition-Action), aangevuld met een aantal klinisch-relevante vervolgstappen die wél als actie zijn opgenomen maar niet aan een CQL-conditie zijn gekoppeld omdat de trigger een klinische beoordeling is:

| Computable (CQL-conditie) | Als actie opgenomen, klinische beoordeling (geen CQL-conditie) | Niet gemodelleerd (narratief / buiten scope) |
|---|---|---|
| Resectabiliteitsclassificatie op basis van vaatbetrokkenheid (Tabel 4) | Aanvullende MRI (Hoofdstuk 2): cystesuspectie, onduidelijke leverlaesie, diagnostische twijfel | Inhoud/checklist van de MDO-verwijzing (Hoofdstuk 5) - in de brondocumentatie zelf nog niet vastgesteld, in afwachting van het werkpakket MDO conform SONCOS 2026 |
| Indicatie voor biliaire drainage (ERCP) op basis van bilirubine (Hoofdstuk 4) | EUS-FNB buiten de systeemtherapie-indicatie: geen laesie op CT, negatieve brush (Hoofdstuk 3) | Systeemtherapie bij definitief irresectabel/gemetastaseerd pancreascarcinoom (Hoofdstuk 6) - geen metastaseringsstatus in het datamodel |
| Doorlooptijd-streefnormen tussen de stappen (Hoofdstuk 1) | PTCD / EUS-geleide galwegdrainage bij falen van ERCP (Hoofdstuk 4) | Regimekeuze binnen systeemtherapie (FOLFIRINOX vs. Gemcitabine/Nab-paclitaxel) - klinische afweging |
| Kandidaatschap voor (inductie- of adjuvante) systeemtherapie | Adjuvante systeemtherapie: fitheidsbeoordeling (WHO 0/1) (Hoofdstuk 6) | LAPC-subclassificatie (LAPC-1/-2/-3), lokale ablatie, pijnbestrijding (Hoofdstuk 8, 10) |
| | Postoperatief follow-upschema (Hoofdstuk 9) | Coördinatie van zorg / hoofdbehandelaarschap tussen centra (Hoofdstuk 11) |

### Resectabiliteitsclassificatie

De classificatie volgt Tabel 4 (resectabiliteitscriteria Dutch Pancreatic Cancer Group) en wordt berekend in de [Library pancreas-resectabiliteit-en-drainage](Library-pancreas-resectabiliteit-en-drainage.html) op basis van per-vat vaatbetrokkenheid-Observaties:

| Categorie | Arterieel (AMS, truncus coeliacus, a. hepatica) | Veneus (VMS / vena porta) |
|---|---|---|
| Resectabel | Geen contact | ≤ 90° contact |
| Borderline resectabel (1 criterium) | ≤ 90° contact | 90° - 270° contact, geen occlusie |
| Lokaal gevorderd (1 criterium) | > 90° contact | > 270° contact of occlusie |

De vaten zijn vastgelegd in [ValueSet pancreas-vaten](ValueSet-pancreas-vaten.html) (SNOMED CT) en de contactgradaties in de lokale codelijst [CodeSystem pancreas-vaatcontact-graad](CodeSystem-pancreas-vaatcontact-graad.html), bedoeld als `Observation.code` respectievelijk `Observation.valueCodeableConcept` voor een gestructureerde CT-verslaglegging (zie ook Appendix 4 van het bronzorgpad). Vena mesenterica superior en vena porta worden hierbij als één beoordelingslocatie behandeld: beide SNOMED CT-codes zijn in de ValueSet opgenomen. Lokaal gevorderde tumoren (LAPC) worden in het pancreascentrum verder onderverdeeld in LAPC-1, -2 of -3 op basis van MDO-beoordeling; deze subclassificatie is niet computable vanuit de brondocumentatie.

### Aanvullende diagnostiek

* **MRI** ([ActivityDefinition pancreas-mri-pancreasprotocol](ActivityDefinition-pancreas-mri-pancreasprotocol.html)): vóór eventuele galwegdrainage bij diagnostische twijfel, cystesuspectie of een op CT niet nader te classificeren leverlaesie (Hoofdstuk 2).
* **EUS met FNB** ([ActivityDefinition pancreas-eus-fnb](ActivityDefinition-pancreas-eus-fnb.html)): pathologische bevestiging, met name bij kandidaten voor systeemtherapie; ook bij het ontbreken van een laesie op CT of een negatieve brush (Hoofdstuk 3). Niet te gebruiken voor beoordeling van vasculaire betrokkenheid.

### Biliaire drainage

Een ERCP wordt geïndiceerd geacht bij bilirubine > 100 µmol/L (algemeen) of > 25 µmol/L voorafgaand aan FOLFIRINOX (Hoofdstuk 4), en wordt altijd ná de CT-abdomen uitgevoerd. Bij falen van de ERCP zijn twee alternatieven gedocumenteerd (niet CQL-getriggerd, want "falen ERCP" is geen dataelement): [PTCD](ActivityDefinition-pancreas-ptcd.html) en, uitsluitend in de palliatieve setting in een expertcentrum, [EUS-geleide galwegdrainage](ActivityDefinition-pancreas-eus-galwegdrainage.html).

### Systeemtherapie

* **Inductie** ([ActivityDefinition pancreas-systeemtherapie-inductie](ActivityDefinition-pancreas-systeemtherapie-inductie.html)): bij borderline resectabele of lokaal gevorderde tumoren, inclusief het baseline- en responsevaluatieschema (2/4/6 maanden) uit Hoofdstuk 6/8.
* **Adjuvant** ([ActivityDefinition pancreas-systeemtherapie-adjuvant](ActivityDefinition-pancreas-systeemtherapie-adjuvant.html)): na resectie bij chemotherapie-fitte patiënten (Hoofdstuk 6); fitheidsbeoordeling is een klinische afweging.
* **Palliatief** ([ActivityDefinition pancreas-systeemtherapie-palliatief](ActivityDefinition-pancreas-systeemtherapie-palliatief.html)): bij definitief irresectabel of gemetastaseerd pancreascarcinoom (Hoofdstuk 6). Deze resource is uitsluitend documentair; metastasering wordt niet uit het datamodel afgeleid en de resource is daarom geen actie in de PlanDefinition.

### Postoperatieve follow-up

Het standaard follow-upschema (Hoofdstuk 9) - eerste controle na 2 weken, vervolgens elke 3 maanden (jaar 1), elke 6 maanden (jaar 2) en elke 12 maanden (jaar 3-5), totale duur 5 jaar - is opgenomen als [ActivityDefinition pancreas-postoperatieve-follow-up](ActivityDefinition-pancreas-postoperatieve-follow-up.html), inclusief voeding/suppletie (Creon) en de regel dat een recidief in opzet met PA wordt bewezen.

### Doorlooptijden

De streefnormen uit Hoofdstuk 1 zijn gemodelleerd als `relatedAction`/`offsetDuration` tussen de acties in de [PlanDefinition](PlanDefinition-pancreas-resectabiliteit-en-behandelpad.html):

| Van → Naar | Streefnorm |
|---|---|
| Aanmelding → MDO-bespreking | Binnen 10 dagen |
| Aanmelding → CT-verslag | Binnen 1 week |
| CT-stadiëring → ERCP | Binnen 1 week |
| CT-stadiëring → Start systeemtherapie | Binnen 4 weken |
| MDO-bespreking → Operatie | Binnen 6 weken (SONCOS-norm) |
| Operatie → Adjuvante systeemtherapie | Binnen 12 weken |
| Operatie → Eerste follow-up controle | Binnen 2 weken |

### Processtappen

| Stap | Titel | Conditie |
|---|---|---|
| 1 | Aanmelding en MDO-bespreking | - |
| 2 | Radiologische stadiëring (CT-abdomen pancreasprotocol) | Na aanmelding |
| 2a | Aanvullende MRI (indien geïndiceerd) | Klinische beoordeling |
| 3 | Resectabiliteitsclassificatie | `Alle Vaatcontacten Beschikbaar` |
| 3a/b/c | Resectabel / Borderline resectabel / Lokaal gevorderd | `Resectabel` / `Borderline Resectabel` / `Lokaal Gevorderd` |
| 4 | Pathologische bevestiging (EUS-FNB) | `Kandidaat Systeemtherapie (Borderline Of Lokaal Gevorderd)` |
| 5 | Biliaire drainage (ERCP) | `ERCP Geindiceerd` |
| 5a/b | PTCD / EUS-geleide galwegdrainage (bij falen ERCP) | Klinische beoordeling |
| 6 | Systeemtherapie (inductie) | `Kandidaat Systeemtherapie (Borderline Of Lokaal Gevorderd)` |
| 7 | Operatieve resectie | `Resectabel` |
| 7a | Adjuvante systeemtherapie (indien fit) | Klinische beoordeling |
| 7b | Postoperatieve follow-up | - |

### FHIR Artifact Overzicht

Conform het patroon van de [HL7 FHIR Clinical Practice Guidelines IG](http://hl7.org/fhir/uv/cpg/) zijn de volgende resources gedefinieerd:

| Type | Resource | Beschrijving |
|---|---|---|
| PlanDefinition | [pancreas-resectabiliteit-en-behandelpad](PlanDefinition-pancreas-resectabiliteit-en-behandelpad.html) | ECA-regel met de computable deelverzameling van het zorgpad |
| Library | [pancreas-resectabiliteit-en-drainage](Library-pancreas-resectabiliteit-en-drainage.html) | CQL-logica voor resectabiliteitsclassificatie en ERCP-indicatie |
| ActivityDefinition | [pancreas-ct-abdomen-pancreasprotocol](ActivityDefinition-pancreas-ct-abdomen-pancreasprotocol.html) | CT-abdomen volgens pancreasprotocol |
| ActivityDefinition | [pancreas-mri-pancreasprotocol](ActivityDefinition-pancreas-mri-pancreasprotocol.html) | Aanvullende MRI |
| ActivityDefinition | [pancreas-eus-fnb](ActivityDefinition-pancreas-eus-fnb.html) | EUS met fine needle biopsy |
| ActivityDefinition | [pancreas-ercp-biliaire-drainage](ActivityDefinition-pancreas-ercp-biliaire-drainage.html) | ERCP met biliaire drainage |
| ActivityDefinition | [pancreas-ptcd](ActivityDefinition-pancreas-ptcd.html) | Percutane transhepatische cholangiografische drainage |
| ActivityDefinition | [pancreas-eus-galwegdrainage](ActivityDefinition-pancreas-eus-galwegdrainage.html) | EUS-geleide galwegdrainage (expertcentrum) |
| ActivityDefinition | [pancreas-systeemtherapie-inductie](ActivityDefinition-pancreas-systeemtherapie-inductie.html) | Inductie-systeemtherapie |
| ActivityDefinition | [pancreas-systeemtherapie-adjuvant](ActivityDefinition-pancreas-systeemtherapie-adjuvant.html) | Adjuvante systeemtherapie |
| ActivityDefinition | [pancreas-systeemtherapie-palliatief](ActivityDefinition-pancreas-systeemtherapie-palliatief.html) | Systeemtherapie bij irresectabel/gemetastaseerd pancreascarcinoom (documentair) |
| ActivityDefinition | [pancreas-resectie](ActivityDefinition-pancreas-resectie.html) | Operatieve resectie |
| ActivityDefinition | [pancreas-postoperatieve-follow-up](ActivityDefinition-pancreas-postoperatieve-follow-up.html) | Postoperatief follow-upschema |
| ValueSet | [pancreas-vaten](ValueSet-pancreas-vaten.html) | Vaten (SNOMED CT) voor vaatbetrokkenheidsbeoordeling |
| CodeSystem | [pancreas-vaatcontact-graad](CodeSystem-pancreas-vaatcontact-graad.html) | Gradaties van vaatcontact |
