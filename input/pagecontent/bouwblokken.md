
Vertrouwensmodel bouwblokken TWIIN
Tabel toevoegen met vergelijking bouwblokken ZV, TWIIN, BabyConnect, (er was nog zoiets ter referentie)

* Zorgviewer Host - Eigen EPD (EHR Session)
* Zorgviewer
* Identiteit
    * Zorgverleners - ProviderRegistry
* Authenticatie
* Autorisatie
    * Behandelrelatie
        * Bepalen of er een openstaande relatie is tussen zorgverlener en patient in een zorgpad.
* Toestemming
    * Adressering
    * Localisatie - PatientIndex - Mitz
    * Mitz geeft welke rollen bij de gegevens mogen.
* Ontsluiting bronsysteem
* Logging
* Behandelplan
* Overname
* Terminologie
* Workflow


----
Na opstart SMART-on-FHIR -> patientfhirid,practiotioner(,encounter), adhv practitioner kan je BIG-nummer krijgen als id (iig in Epic UMCG)
Eerst tonen fhirid en practitionerid. Kunnen we practitionernaam en BiG-nummer meesturen (prefetchen) zoals CDS Hooks?
----

### Capability Statement

* !! Grofweg BgZ2017 en PDFa overnemen en bijstellen/iets generieker maken en check IPA voor extra's!
* Ook ZV Versie voor eerste vragen!
* Per Actor / Bouwblok??
    * e.g. VitalSignsServer https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.8/files/803365
    * Behandelplan Server - CarePlan resource search obv Condition code of specialisme / rol?
    * Behandelplan Client is dan Functie van Zorgviewer
* Er zijn bouwblokken die eigenlijk Functions zijn.
    * Overname is functionaliteit van de Zorgviewer naar de Zorgverlener Host (Eigen EPD)

-> Example CapabilityStatement items for SMART-on-FHIR: http://hl7.org/fhir/smart-app-launch/1.0.0/conformance/index.html
