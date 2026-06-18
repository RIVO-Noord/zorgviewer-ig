library PneumokokkenVaccinatieEligibility version '1.0.0'

using FHIR version '3.0.0'

include FHIRHelpers version '3.0.0' called FHIRHelpers

codesystem "SNOMED-CT": 'http://snomed.info/sct'

valueset "Pneumokokken Risicoconditie":
  'http://fhir.hl7.nl/zorgviewer/ValueSet/pneumokokken-risicoconditie'

valueset "Pneumokokken Vaccins":
  'http://fhir.hl7.nl/zorgviewer/ValueSet/pneumokokken-vaccins'

valueset "Cochleair Implantaat":
  'http://fhir.hl7.nl/zorgviewer/ValueSet/pneumokokken-implantaat'

context Patient

// ---------------------------------------------------------------------------
// Groep 1 – Leeftijdsgebonden risico
// ---------------------------------------------------------------------------

define "Leeftijd":
  AgeInYears()

define "Groep 1 Eligible":
  "Leeftijd" >= 60

// ---------------------------------------------------------------------------
// Groep 2 – Medische risicogroepen
// ---------------------------------------------------------------------------

// In STU3, Condition.clinicalStatus is a code (not CodeableConcept)
define "Actieve Risicoconditie":
  exists (
    [Condition: "Pneumokokken Risicoconditie"] C
      where C.clinicalStatus = 'active'
  )

define "Groep 2 Risicoconditie Eligible":
  "Actieve Risicoconditie"

// MedischHulpmiddel zib maps to DeviceUseStatement + Device in STU3 NL core.
// Device.type is checked directly; the CQL engine is expected to have Device
// in scope (fetched alongside DeviceUseStatement by the Zorgviewer).
define "Cochleair Implantaat Aanwezig":
  exists (
    [Device] D
      where FHIRHelpers.ToConcept(D.type) in "Cochleair Implantaat"
        and D.status = 'active'
  )

define "Groep 2 Eligible":
  "Groep 2 Risicoconditie Eligible"
    or "Cochleair Implantaat Aanwezig"

// ---------------------------------------------------------------------------
// Gecombineerde eligibility
// ---------------------------------------------------------------------------

define "In Aanmerking voor Pneumokokkenvaccinatie":
  "Groep 1 Eligible" or "Groep 2 Eligible"

// In STU3, Patient.deceased is a choice: deceasedBoolean or deceasedDateTime.
// If deceasedBoolean = false or deceased is null, patient is alive.
define "Patient Niet Overleden":
  Patient.deceased is null
    or (
      Patient.deceased is FHIR.boolean
        and FHIRHelpers.ToBoolean(Patient.deceased as FHIR.boolean) = false
    )

define "Eligible":
  "In Aanmerking voor Pneumokokkenvaccinatie"
    and "Patient Niet Overleden"

// ---------------------------------------------------------------------------
// Vaccinatiestatus
// ---------------------------------------------------------------------------

// In STU3, Immunization uses 'date' (not 'occurrence')
define "Uitgevoerde Pneumokokkenvaccinaties":
  [Immunization: "Pneumokokken Vaccins"] I
    where I.status = 'completed'
    sort by date desc

define "Laatste Vaccinatie Datum":
  if exists "Uitgevoerde Pneumokokkenvaccinaties"
  then First("Uitgevoerde Pneumokokkenvaccinaties").date
  else null

define "Nooit Gevaccineerd":
  "Laatste Vaccinatie Datum" is null

// Hervaccinatie-interval: PPV23 eenmalig voor groep 1 en de meeste groep 2.
// Voor (functionele) asplenie gelden aanvullende regels – zie Speciale Instructies.
define "Hervaccinatie Interval Verstreken":
  "Laatste Vaccinatie Datum" is not null
    and years between "Laatste Vaccinatie Datum" and Today() >= 5

define "Vaccinatie Aanbevolen":
  "Eligible"
    and ("Nooit Gevaccineerd" or "Hervaccinatie Interval Verstreken")

// ---------------------------------------------------------------------------
// Speciale groep: (functionele) asplenie – extra vaccinatieschema vereist
// ---------------------------------------------------------------------------

define "Heeft Asplenie":
  exists (
    [Condition: Code '38096003' from "SNOMED-CT"] C
      where C.clinicalStatus = 'active'
  )
    or exists (
      [Condition: Code '234422006' from "SNOMED-CT"] C
        where C.clinicalStatus = 'active'
    )

define "Speciale Instructies Vereist":
  "Heeft Asplenie"
