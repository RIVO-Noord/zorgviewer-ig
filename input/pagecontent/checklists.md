
Op deze pagina volgen de checklists die als handvat kunnen worden gebruikt als je als bronsysteem wilt aansluiten (bouwblok Ontsluiten Bronsysteem) of als je de Zorgviewer wilt kunnen opstarten vanuit je eigen systeem (bouwblok Zorgviewer Host). 

1. Verbinding en TLS Certificaten
    1. ?? Eisen?
    1. ?? Waar kan/moet je deze aanvragen?
    1. ...
1. Epic huizen
    1. Ontsluiten bronsysteem
        1. Betrek je integratie (Bridges) team om het FHIR endpoint in te richten volgens de [OntsluitenBronsysteem CapabilityStatement](CapabilityStatement-OntsluitenBronsysteem.html)
            1. Back-end Integration voor trusted gebruikers, externe identity wordt gelogd
        1. Client Certificate (UMCG) aanvragen
        1. Voer de Ontsluiten Bronsysteem tests uit op dit FHIR endpoint
        1. Meld dit FHIR endpoint aan bij RIVO-Noord(?)
        1. ...
    1. Opstarten van de Zorgviewer vanuit eigen EPD
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
1. Chipsoft huizen
    1. Ontsluiten bronsysteem 
        1. Regel Zorgplatform contract, specifiek voor de BgZ en Documenten Services van de [Digital-Care API](https://developer.zorgplatform.online/digital-care)
        1. OID's voor Zorgplatform ontsluiting en HiX Webintegratie activiteitendefinities
            * 2.16.840.1.113883.2.4.3.213.1.3 = Test Zorgviewer
            * 2.16.840.1.113883.2.4.3.213.1.2 = Acceptatie Zorgviewer
            * 2.16.840.1.113883.2.4.3.213.1.1 = Productie Zorgviewer
        1. Eerste keer FHIR ontsluiting toepassen: Aanzetten / synchroniseren Zorgplatform
    1. Opstarten van de Zorgviewer vanuit eigen EPD
        1. Webintegratie configureren in HiX
1. Topicus huizen met VIPLive
    1. Ontsluiten bronsysteem 
        1. ...
    1. Opstarten van de Zorgviewer vanuit eigen EPD
        1. ...
1. Behandelplan / zorgpad / zorgproces
    1. Maak uitwerking volgend RadB analysesheet / ZiRA...
    1. Installeer in Behandelplan bouwblok
