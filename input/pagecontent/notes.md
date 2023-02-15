
### Van alles

1. Open World Modeling toelichten – toelichten. 
    1. Alle stakeholders van het zorgproces. 
    1. Consequenties voor nu en toekomst. Identiteit nu BIG en AGB-Z maar later ook thuiszorg. Open houden. 
1. Er zijn bouwblokken die eigenlijk Functions zijn. Overname is functionaliteit van de Zorgviewer naar de Zorgverlener Host (Eigen EPD)

### Opstart sequence

1. Kunnen we Practitioner(practitionernaam en AGB-Z/BIG-Nummer) meesturen (prefetchen) zoals CDS Hooks?
1. LATER: Break-the-glass
1. Rollen en Specialismen volgens AGB in ZIB Zorgverlener, dan hoeft de call naar Zorgverlener Registry niet.
    * Deze zitten in PractitionerRole
    * Practitioner in Epic heeft qualification, je kan los de PractitionerRoles opvragen, dat zijn de rollen, maar dat ondersteund Chipsoft niet zo te zien, dus we moeten dit in de "nep" ZORG-AB doen
1. Bouwblok: welke organisaties zijn aangesloten voor Zorgviewer om te checken
    * Trust relatie adhv PKI

### Capability Statements

Per bouwblok/functie.

1. Zorgviewer Host = SMART-on-FHIR + Patient.read + Practitioner.read (zie CapabilityStatement-ZorgViewerHost)
1. Zorgviewer = capability statement van bgz client + pdfa
1. Ontsluiting bronsysteem = capability statement van bgz server + pdfa
1. Toestemming = MITZ Open Vraag
1. Zorgverlener Registry/Directory = ZORG-AB
* Per Actor / Bouwblok??
    * e.g. VitalSignsServer https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.8/files/803365
    * Behandelplan Server - CarePlan resource search obv Condition code of specialisme / rol?
    * Behandelplan Client is dan Functie van Zorgviewer
* Example CapabilityStatement items for SMART-on-FHIR: http://hl7.org/fhir/smart-app-launch/1.0.0/conformance/index.html

### Bouwblokken

* Check vertrouwensmodel bouwblokken TWIIN
* Tabel toevoegen met vergelijking bouwblokken ZV, TWIIN, BabyConnect, (er was nog zoiets ter referentie)
* Adressering bouwblok toevoegen? is dat Zorg-AB?
* Localisatie bouwblok toevoegen?
* Patient Index... is dat Localicatie?
* Logging
* Behandelplan
* Overname
* Terminologie
* Workflow

---------
DevOps indeling

!! Toevoegen meer dan 1 bron -> Bepalen zorgaanbieders / MITZ (Toestemming, Localisatie, Adressering) 
!! Eerst meerdere bronnen naast elkaar, dan pas samenvoegen,ontdubbelen,conflicten als losse US per zib

E Ontsluiten bronsysteem
- F FHIR Interface op het bronsysteem
 - US FHIR endpoint beschibaar voor Zorgviewer
 - US Identity van Zorgviewer geaccepteerd (NIET lokale gebruiker)
 - US Logging logt Zorgviewer Identity bij elke request

E Opstarten Zorgviewer (https://appmarket.epic.com/Article/Index?docid=appbuilding101)
- F ?
 - US Registreren Zorgviewer tbv client ID (scopes)
 - US FHIR endpoint beschibaar voor Zorgviewer (lokale gebruiker Identity)
 - US Logging
 - US Uitbouwen knop maken in EPD

E Zorgviewer
    1. Hello world
    1. SMART-on-FHIR start met context
    1. Gebruiker en Patient
    1. zib Problemen
    1. Meerdere bronnen naast elkaar
    1. Conflicten en duplicaten
    1. Uitbreiden zibs

E Toestemming / PatientIndex (Localisatie) (incl Adresering (FHIR endpoints))
 - F Initiele Toestemming
  - US Vulling
  - US FHIR IF defieren CapabilityStatement
  - US FHIR profielen obv zibs (Patient, Practitioner, Organization) + Endpoint

E Behandelplan
 - ..ErasmusMC heeft iets..
------------

14-feb-2023
* zorgviewer applicatie gaat inloggen, gebruiker id wordt meegestuurd en gelogd
    * zorgviewer client id en een "ontsluiten bronsysteem" back-end client id
    * Er zijn 2 back-end accounts eentje in het "zorgviewer-netwerk" en een tussen "ontsluiten bronsysteem" en "bronsysteem"!
    * 2 views van sequence plaatjes maken, ook eentje met alleen OAuth+SSL+JWT enzo netwerk en een met FHIR requests
        * Scope openid zorgt voor identity token met "preferred_user". Nu is dat AD bij UMCG, maar kan dat ook AGB-Z zijn? Gevraagd bij Sam. 14-feb-2023 https://jwt.io/
    * Bouw plaatje mist nu "Ontsluiten bronsysteem"
* Ook uitleggen dat "Zorgviewer Host" eventuele aanpassingen isoleert van EPD mogelijkheden naar SMART-on-FHIR zoals in de Zorgviewer IG! Net zoals de "Ontsluiten bronsysteem" dat doet voor de FHIR data IF op het Bronsysteem.
* Zorgverlener Registry -> Provider Directory?
* IG
    * auto-ig-build filmpje Josh -> @Frank https://www.youtube.com/watch?v=VVbF1O4pgQA
    * implementatiegids.zorgviewer.nl
    * "knopje" voor deployen versie
        * SWA CLI? Zie Lammert Team chat
    * Werk met Heleen Vreugenhil aan dummy uitleg -> neem ChatGTP voorbeeld en voeg "standaarden" toe!
        * DataSet nu mogelijk: https://vdzel.home.xs4all.nl/zorgviewer-ig/design.html#bgzpdfa

ChatGPT: "Wat is de longitudinal patient record viewer "zorgviewer" fhir implementatiegids?", "De Longitudinal Patient Record Viewer "Zorgviewer" FHIR-implementatiegids is een specifieke implementatiegids voor de ontwikkeling van een patiëntendossier-viewer die longitudinale patiëntgegevens kan weergeven met behulp van de FHIR (Fast Healthcare Interoperability Resources) standaard. Een longitudinale weergave toont de gezondheidsgeschiedenis van een patiënt over een langere periode, inclusief diagnoses, behandelingen, medicijnen, laboratoriumresultaten en andere relevante informatie.
De implementatiegids biedt richtlijnen en best practices voor het ontwerpen, bouwen en testen van een patiëntendossier-viewer die longitudinale patiëntgegevens kan weergeven met behulp van de FHIR-standaard. Het omvat ook aanbevelingen voor integratie met andere systemen en normen voor gegevensuitwisseling. Het doel van de implementatiegids is om de interoperabiliteit en uitwisseling van patiëntgegevens tussen verschillende zorgverleners en zorgsystemen te bevorderen, waardoor de kwaliteit van de zorg kan worden verbeterd"

De Zorgviewer FHIR-implementatiegids is een specifieke implementatiegids voor de ontwikkeling van een patiëntendossier-viewer die regionaal patiëntgegevens kan weergeven met behulp van de FHIR (Fast Healthcare Interoperability Resources) standaard. Een regionale weergave toont de gezondheidsgeschiedenis van een patiënt ontsloten in de regio, inclusief diagnoses, behandelingen, medicijnen, laboratoriumresultaten en andere relevante informatie.
De implementatiegids biedt richtlijnen voor het bouwen en testen van een patiëntendossier-viewer die regionale patiëntgegevens kan weergeven met behulp van de FHIR-standaard. Het omvat ook aanbevelingen voor integratie met andere systemen en normen voor gegevensuitwisseling. Het doel van de implementatiegids is om de interoperabiliteit en uitwisseling van patiëntgegevens tussen verschillende zorgverleners en zorgsystemen te bevorderen, waardoor de kwaliteit van de zorg kan worden verbeterd.
