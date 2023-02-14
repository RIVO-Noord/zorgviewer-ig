
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
DevOps indeling 10-feb-2023 met Geertje

!! Toevoegen meer dan 1 bron -> Bepalen zorgaanbieders / MITZ (Toestemming, Localisatie, Adressering) 
!! Toevoegen us per sequence diagram?

E Ontsluiten bronsysteem
- F FHIR Interface op het bronsysteem
 - US FHIR endpoint beschibaar voor Zorgviewer
 - US Identity van Zorgviewer geaccepteerd (NIET lokale gebruiker)
 - US Logging logt Zorgviewer Identity bij elke request
- F BgZ
 - US zib Patient
  - T bijbehorende zib FHIR profielen verder beperken (Patient, Practitioner(HA))
  - T capabilitystatement bijwerken
  - T client ID scope bijstellen Patient.read/Patient.search
 - US zib Probleem
  - T FHIR profielen voor Condition, Practitioner(Artsen), Organization
  - T capabilitystatement bijwerken
 - US zib ...
- F PDF/a Correspondentie
 - US VIPP5 Epic: specialist, progress, and discharge letters en radiology reports (conclusies)

E Opstarten Zorgviewer (https://appmarket.epic.com/Article/Index?docid=appbuilding101)
- F ?
 - US Registreren Zorgviewer tbv client ID (scopes)
 - US FHIR endpoint beschibaar voor Zorgviewer (lokale gebruiker Identity)
 - US Logging
 - US Uitbouwen knop maken in EPD

E Toestemming / PatientIndex (Localisatie) (incl Adresering (FHIR endpoints))
 - F Initiele Toestemming
  - US Vulling
  - US FHIR IF defieren CapabilityStatement
  - US FHIR profielen obv zibs (Patient, Practitioner, Organization) + Endpoint

E Behandelplan
 - ErasmusMC heeft iets
------------

14-feb-2023
* zorgviewer applicatie gaat inloggen, gebruiker id wordt meegestuurd en gelogd
    * zorgviewer client id en een "ontsluiten bronsysteem" back-end client id
    * Er zijn 2 back-end accounts eentje in het "zorgviewer-netwerk" en een tussen "ontsluiten bronsysteem" en "bronsysteem"!
    * 2 plaatjes maken, ook eentje met alleen OAuth+SSL+JWT enzo
    * Bouw plaatje mist nu "Ontsluiten bronsysteem"
* Ook uitleggen dat "Zorgviewer Host" eventuele aanpassingen isoleert van EPD mogelijkheden naar SMART-on-FHIR zoals in de Zorgviewer IG! Net zoals de "Ontsluiten bronsysteem" dat doet voor de FHIR data IF op het Bronsysteem.
* IG
    * auto-ig-build filmpje Josh -> @Frank https://www.youtube.com/watch?v=VVbF1O4pgQA
    * implementatiegids.zorgviewer.nl
    * "knopje" voor deployen versie
    * Werk met Heleen Vreugenhil aan dummy uitleg -> neem ChatGTP voorbeeld en voeg "standaarden" toe!
        * DataSet nu mogelijk: https://vdzel.home.xs4all.nl/zorgviewer-ig/design.html#bgzpdfa

ChatGPT: "Wat is de longitudinal patient record viewer "zorgviewer" fhir implementation guide?", "The Longitudinal Patient Record Viewer "Zorgviewer" FHIR Implementation Guide is a specific implementation guide for the development of a patient record viewer that can display longitudinal patient data using the FHIR (Fast Healthcare Interoperability Resources) standard. A longitudinal display shows a patient's health history over a longer period, including diagnoses, treatments, medications, laboratory results, and other relevant information.

The implementation guide provides guidelines and best practices for designing, building, and testing a patient record viewer that can display longitudinal patient data using the FHIR standard. It also includes recommendations for integration with other systems and standards for data exchange. The goal of the implementation guide is to promote interoperability and exchange of patient data between different healthcare providers and systems, thereby improving the quality of care."