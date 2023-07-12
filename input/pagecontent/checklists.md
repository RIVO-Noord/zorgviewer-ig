
Op deze pagina volgen de checklists die als handvat kunnen worden gebruikt als je als bronsysteem wilt aansluiten (bouwblok Ontsluiten Bronsysteem) of als je de Zorgviewer wilt kunnen opstarten vanuit je eigen systeem (bouwblok Zorgviewer Host).
Maar ook voor het toevoegen van een nieuw behandelplan met relevante filters voor bepaalde aandoening of gewoon een setje relevante gegevens filters op gegevens.

### Basis afspraken

1. *Vulling*: Zorgaanbieder is verantwoordelijk om zoveel mogelijk van de Zorgviewer implementatiegids zib vulling te regelen
1. *Vulling*: Zorgaanbieder is er bewust van dat niet alle gegevens beschikbaar zijn in de Zorgviewer, of doordat het technisch (nog) niet mogelijk is (FHIR), of omdat de workflow niet is ingericht (Bronsysteem), of omdat configuratie niet volledig is (Bronsysteem of Bronsysteem ontsluiting), of omdat de Zorgviewer het betreffende veld (nog) niet toont.
1. *Vulling*: Zorgaanbieder accepteert dat vulling vanuit andere Zorgaanbieders minder kan zijn dan verwacht. We ontsluiten eerst wat we (technisch) kunnen. Bijvoorbeeld:
    1. codering mist, omdat coderingen niet (volledig) zijn ingelezen 
    1. regels missen, e.g. medische voorgeschiedenis
1. *Identiteit/Security*: Zorgaanbieder accepteert identiteit van de andere aangesloten Zorgaanbieders en mag ervanuit gaan dat er wordt gezorgd voor een juiste gebruikersrechten administratie.
1. *Security*: Zorgaanbieder staat in het NEN 7510 register
1. *Logging*: Zorgaanbieder moet voor de NEN 7513 conforme logging zorgen
1. *Governance*: Zorgaanbieder is deelnemer RIVO-Noord

### Epic huizen

#### Ontsluiten bronsysteem

1. Betrek je integratie (Bridges) team om het FHIR endpoint in te richten volgens de [OntsluitenBronsysteem CapabilityStatement](CapabilityStatement-OntsluitenBronsysteem.html)
    1. Back-end Integration voor trusted gebruikers, externe identity wordt gelogd
1. Client Certificate (UMCG) aanvragen
1. Client ID en Epic API's:
    1. Patient.Search (STU3)
    1. Patient.Read (STU3)
    1. Practitioner.Read (STU3)
    1. Organization.Read (STU3)
    1. DocumentReference.Search (Correspondences) (STU3)
    1. DocumentReference.Search (Radiology Results) (STU3)
    1. Binary.Read (Correspondences) (STU3)
    1. Binary.Read (Radiology Results) (STU3)
    1. Condition.Search (Encounter Diagnosis, Problems) (STU3)
    1. Procedure.Search (Orders, Surgeries) (STU3)
    1. Consent.Search (Code Status) (STU3)
    1. Consent.Search (Document) (STU3)
    1. Observation.$lastn (Labs) (STU3)
    1. Observation.Search (Labs) (STU3)
    1. Specimen.Read (Labs) (STU3)
1. Voer de Ontsluiten Bronsysteem tests uit op dit FHIR endpoint
1. Meld dit FHIR endpoint aan bij RIVO-Noord (?)
1. [DocumentReference.type](StructureDefinition-DocumentReference.html)
    * *from I HNO 34033 – Category List INP 5010 en mappings in FHIR AIP via CDA_NOTE_TYPE_TBL*
    * *You can map additional LOINCs via the EXM activity. EPT 20208 (hospital-built list) - LOINC code.*
1. ...

#### Opstarten van de Zorgviewer vanuit eigen EPD

1. Betrek je integratie (Bridges) team om het FHIR endpoint in te richten volgens de [ZorgviewerHost CapabilityStatement](CapabilityStatement-ZorgviewerHost.html)
    1. Provider Facing FHIR voor lokale gebruikers
1. Accepteer het Zorgviewer client ID
1. [Epic Configure the Integration Record for SMART on FHIR](https://galaxy.epic.com/Redirect.aspx?DocumentID=100015309&PrefDocID=98566) n.b. SMART-on-FHIR
    1. Configureer opstart parameters als context (patient_id, practitioner_id) (Epic FDI)
1. Voer de Zorgviewer Host tests uit op dit FHIR endpoint
1. Betrek je EPD team (Hyperspace) om het opstarten van de Zorgviewer (de SMART-on-FHIR knop) in te richten
1. Draag zorg voor AGB-Z of BIG-Nummer registratie bij lokale gebruikers
1. Meld deze Zorgviewer aan bij RIVO-Noord(?) whitelist
1. ...

### Chipsoft huizen

#### Ontsluiten bronsysteem 

1. Regel Zorgplatform contract, specifiek voor de BgZ en Documenten Services van de [Digital-Care API](https://developer.zorgplatform.online/digital-care)
1. OID's voor Zorgplatform ontsluiting en HiX Webintegratie activiteitendefinities
    * 2.16.840.1.113883.2.4.3.213.1.3 = Test Zorgviewer
    * 2.16.840.1.113883.2.4.3.213.1.2 = Acceptatie Zorgviewer
    * 2.16.840.1.113883.2.4.3.213.1.1 = Productie Zorgviewer
1. Eerste keer FHIR ontsluiting toepassen: Aanzetten / synchroniseren Zorgplatform

#### Opstarten van de Zorgviewer vanuit eigen EPD

1. Webintegratie configureren in HiX

### Topicus huizen met VIPLive

#### Ontsluiten bronsysteem 
1. ...

#### Opstarten van de Zorgviewer vanuit eigen EPD
1. ...

### Verbinding en TLS Certificaten

1. [NCSC ICT-beveiligingsrichtlijnen voor Transport Layer Security (TLS)](https://www.ncsc.nl/documenten/publicaties/2021/januari/19/ict-beveiligingsrichtlijnen-voor-transport-layer-security-2.1)
1. ?? Eisen?
1. ?? Waar kan/moet je de Client en Server aanvragen?
1. ...

### Behandelplan / zorgpad / zorgproces

1. Maak uitwerking volgend RadB analysesheet / ZiRA...
1. Installeer in Behandelplan bouwblok
