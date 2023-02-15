
Op deze pagina volgen de checklists die als handvat kunnen worden gebruikt als je als bronsysteem wilt aansluiten (bouwblok Ontsluiten Bronsysteem) of als je de Zorgviewer wilt kunnen opstarten vanuit je eigen systeem (bouwblok Zorgviewer Host). 

1. Checklist
    1. Epic huizen
        1. Ontsluiten bronsysteem 
            1. Betrek je integratie (Bridges) team om het FHIR endpoint in te richten volgens de [OntsluitenBronsysteem CapabilityStatement](CapabilityStatement-OntsluitenBronsysteem.html)
                1. Back-end Integration voor trusted gebruikers, externe identifier wordt gelogd
            1. Voer de Ontsluiten Bronsysteem tests uit op dit FHIR endpoint
            1. Meld dit FHIR endpoint aan bij RIVO-Noord(?)
            1. ...
        1. Zorgviewer Host
            1. Betrek je integratie (Bridges) team om het FHIR endpoint in te richten volgens de [ZorgviewerHost CapabilityStatement](CapabilityStatement-ZorgviewerHost.html)
                1. Provider Facing FHIR voor lokale gebruikers
                1. [Epic Configure the Integration Record for SMART on FHIR](https://galaxy.epic.com/Redirect.aspx?DocumentID=100015309&PrefDocID=98566) n.b. SMART-on-FHIR
            1. Voer de Zorgviewer Host tests uit op dit FHIR endpoint
            1. Betrek je EPD team (Hyperspace) om het opstarten van de Zorgviewer (de SMART-on-FHIR knop) in te richten
            1. Draag zorg voor AGB-Z of BIG-Nummer registratie bij lokale gebruikers
            1. Meld deze Zorgviewer aan bij RIVO-Noord(?) whitelist
            1. ...
    1. Chipsoft huizen
        1. Regel Zorgplatform contract, specifiek voor [Digital-Care deel](https://developer.zorgplatform.online/digital-care)
        1. ...

