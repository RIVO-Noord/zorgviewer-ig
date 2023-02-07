

### Examples

De BgZ test-patient uit Epic opvragen *Provider Facing* en diff op de volledige BgZ test-patient?

TODO: Provider Facing middels PostMan opvragen uit Epic, Condition
TODO: Provider Facing middels PostMan opvragen uit Chipsoft, Patient en Condition, nu van zorgplatform.developer gepakt

### Openstaande vragen

1. Vind nog plekje voor ### Globals {% include globals-table.xhtml %}

# Opstart sequence

1. Check of gebruiker zorgviewer mag gebruiken. Bij de zorgviewer staat de regel die bepaald of gebruikerid de zorgviewer mag starten.
1. Later. Break-the-glass
1. Generaliseren plaatje, Epic eruit
1. Identiteiten bron ipv
1. Rollen en Specialismen volgens AGB in ZIB Zorgverlener, dan hoeft de call naar Zorgverlener Registry niet.
1. Bouwblok: welke organisaties zijn aangesloten voor Zorgviewer om te checken
    * Trust relatie adhv PKI

### Capability Statements

Per bouwblok/functie.

Toestemming = MITZ
Zorgverlener Registry/Directory = ZORG-AB
Zorgviewer Host = SMART-on-FHIR + Patient.read + Practitioner.read
Zorgviewer = capability statement van bgz client + pdfa
Ontsluiting bronsysteem = capability statement van bgz server + pdfa
