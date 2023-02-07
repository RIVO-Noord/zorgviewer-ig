

### Examples

1. De BgZ test-patient uit Epic opvragen *Provider Facing* en diff op de volledige BgZ test-patient?
1. TODO: Provider Facing middels PostMan opvragen uit Epic
1. TODO: Provider Facing middels PostMan opvragen uit Chipsoft, nu van zorgplatform.developer gepakt


### Openstaande vragen

1. Vind nog plekje voor ### Globals {% include globals-table.xhtml %}

# Opstart sequence

1. LATER: Break-the-glass
1. Rollen en Specialismen volgens AGB in ZIB Zorgverlener, dan hoeft de call naar Zorgverlener Registry niet.
    * Deze zitten in PractitionerRole
    * Practitioner in Epic heeft qualification, je kan los de PractitionerRoles opvragen, dat zijn de rollen, maar dat ondersteund Chipsoft niet zo te zien, dus we moeten dit in de "nep" ZORG-AB doen
1. Bouwblok: welke organisaties zijn aangesloten voor Zorgviewer om te checken
    * Trust relatie adhv PKI
    * Ook aansluit-checklist maken

### Capability Statements

Per bouwblok/functie.

1. Zorgviewer Host = SMART-on-FHIR + Patient.read + Practitioner.read (zie CapabilityStatement-ZorgViewerHost)
1. Zorgviewer = capability statement van bgz client + pdfa
1. Ontsluiting bronsysteem = capability statement van bgz server + pdfa
1. Toestemming = MITZ Open Vraag
1. Zorgverlener Registry/Directory = ZORG-AB
