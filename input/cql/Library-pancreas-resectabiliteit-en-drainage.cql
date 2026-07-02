library PancreasResectabiliteitEnDrainage version '1.0.0'

using FHIR version '3.0.0'

include FHIRHelpers version '3.0.0' called FHIRHelpers

codesystem "SNOMED": 'http://snomed.info/sct'
codesystem "Pancreas Vaatcontact Graad": 'http://fhir.hl7.nl/zorgviewer/CodeSystem/pancreas-vaatcontact-graad'
codesystem "LOINC": 'http://loinc.org'

context Patient

// ---------------------------------------------------------------------------
// Hulpfuncties
// ---------------------------------------------------------------------------

// In STU3 is Observation.effective een keuzetype (effectiveDateTime | effectivePeriod).
// Deze library gaat uit van effectiveDateTime voor CT-verslag- en labobservaties.
define function ObservatieMoment(O FHIR.Observation):
  FHIRHelpers.ToDateTime(O.effective as FHIR.dateTime)

define function MeestRecente(observaties List<FHIR.Observation>):
  Last(
    observaties O
      sort by ObservatieMoment(O)
  )

// Vergelijkt een vaatcontact-Observation.value met een specifieke gradatiecode
// (zie CodeSystem pancreas-vaatcontact-graad), zonder afhankelijk te zijn van
// concept-equivalentiesemantiek van de CQL-engine.
define function HeeftGraadCode(contact FHIR.CodeableConcept, code System.String):
  contact is not null and exists (
    contact.coding X where X.code.value = code
  )

// ---------------------------------------------------------------------------
// Vaatbetrokkenheid per vat (bron: CT-verslag pancreasprotocol, Hfst 2 / Tabel 4 / Appendix 4)
// Elk vat wordt als losse Observation verwacht, met Observation.code afkomstig
// uit ValueSet pancreas-vaten (SNOMED CT) en Observation.valueCodeableConcept
// afkomstig uit CodeSystem pancreas-vaatcontact-graad.
// ---------------------------------------------------------------------------

define "AMS Observaties":
  [Observation: Code '42258001' from "SNOMED"] O
    where O.status = 'final'

define "Truncus Coeliacus Observaties":
  [Observation: Code '57850000' from "SNOMED"] O
    where O.status = 'final'

define "Arteria Hepatica Observaties":
  [Observation: Code '76015000' from "SNOMED"] O
    where O.status = 'final'

// Vena mesenterica superior (VMS) en vena porta worden in Tabel 4 als één
// beoordelingslocatie (VMS/vena porta-confluens) gehanteerd; een bronsysteem
// kan de Observation met de code van beide vaten aanleveren.
define "VMS Observaties":
  [Observation: Code '90771006' from "SNOMED"] O
    where O.status = 'final'

define "Vena Porta Observaties":
  [Observation: Code '32764006' from "SNOMED"] O
    where O.status = 'final'

define "VMS Vena Porta Observaties":
  "VMS Observaties" union "Vena Porta Observaties"

define "AMS Contactgraad":
  (MeestRecente("AMS Observaties")).value as FHIR.CodeableConcept

define "Truncus Coeliacus Contactgraad":
  (MeestRecente("Truncus Coeliacus Observaties")).value as FHIR.CodeableConcept

define "Arteria Hepatica Contactgraad":
  (MeestRecente("Arteria Hepatica Observaties")).value as FHIR.CodeableConcept

define "VMS Vena Porta Contactgraad":
  (MeestRecente("VMS Vena Porta Observaties")).value as FHIR.CodeableConcept

// ---------------------------------------------------------------------------
// Classificatie per vat, conform Tabel 4 (Dutch Pancreatic Cancer Group)
//
// Arterieel (AMS, truncus coeliacus, a. hepatica):
//   resectabel = geen contact | borderline = <= 90 graden | lokaal gevorderd = > 90 graden
// Veneus (VMS / vena porta):
//   resectabel = <= 90 graden | borderline = 90-270 graden zonder occlusie |
//   lokaal gevorderd = > 270 graden of occlusie
// ---------------------------------------------------------------------------

define function ArterieelLokaalGevorderd(contact FHIR.CodeableConcept):
  HeeftGraadCode(contact, 'contact-90-270-geen-occlusie')
    or HeeftGraadCode(contact, 'contact-gt270-of-occlusie')

define function ArterieelBorderline(contact FHIR.CodeableConcept):
  HeeftGraadCode(contact, 'contact-lte-90')

define function VeneusLokaalGevorderd(contact FHIR.CodeableConcept):
  HeeftGraadCode(contact, 'contact-gt270-of-occlusie')

define function VeneusBorderline(contact FHIR.CodeableConcept):
  HeeftGraadCode(contact, 'contact-90-270-geen-occlusie')

// ---------------------------------------------------------------------------
// Gecombineerde resectabiliteitscategorie ("indien 1 criterium" per Tabel 4)
// ---------------------------------------------------------------------------

define "Alle Vaatcontacten Beschikbaar":
  "AMS Contactgraad" is not null
    and "Truncus Coeliacus Contactgraad" is not null
    and "Arteria Hepatica Contactgraad" is not null
    and "VMS Vena Porta Contactgraad" is not null

define "Lokaal Gevorderd":
  "Alle Vaatcontacten Beschikbaar"
    and (
      ArterieelLokaalGevorderd("AMS Contactgraad")
        or ArterieelLokaalGevorderd("Truncus Coeliacus Contactgraad")
        or ArterieelLokaalGevorderd("Arteria Hepatica Contactgraad")
        or VeneusLokaalGevorderd("VMS Vena Porta Contactgraad")
    )

define "Borderline Resectabel":
  "Alle Vaatcontacten Beschikbaar"
    and not "Lokaal Gevorderd"
    and (
      ArterieelBorderline("AMS Contactgraad")
        or ArterieelBorderline("Truncus Coeliacus Contactgraad")
        or ArterieelBorderline("Arteria Hepatica Contactgraad")
        or VeneusBorderline("VMS Vena Porta Contactgraad")
    )

define "Resectabel":
  "Alle Vaatcontacten Beschikbaar"
    and not "Lokaal Gevorderd"
    and not "Borderline Resectabel"

// ---------------------------------------------------------------------------
// Biliaire drainage (ERCP) indicatie op basis van bilirubine - Hoofdstuk 4
// LOINC 1975-2 = Bilirubin.total [Mass/volume] in Serum or Plasma
// ---------------------------------------------------------------------------

define "Bilirubine Observaties":
  [Observation: Code '1975-2' from "LOINC"] O
    where O.status = 'final'

define "Meest Recente Bilirubine":
  MeestRecente("Bilirubine Observaties")

define "Bilirubine Waarde (µmol/L)":
  if "Meest Recente Bilirubine" is not null
    then (FHIRHelpers.ToQuantity("Meest Recente Bilirubine".value as FHIR.Quantity)).value
    else null

// Algemene ERCP-drempel: bilirubine > 100 µmol/L (Hfst 4, i.v.m. prehabilitatie).
define "ERCP Geindiceerd Op Basis Van Bilirubine":
  "Bilirubine Waarde (µmol/L)" is not null and "Bilirubine Waarde (µmol/L)" > 100

// Verlaagde drempel voorafgaand aan start FOLFIRINOX: bilirubine > 25 µmol/L (Hfst 4).
define "ERCP Geindiceerd Voor Start FOLFIRINOX":
  "Bilirubine Waarde (µmol/L)" is not null and "Bilirubine Waarde (µmol/L)" > 25

define "ERCP Geindiceerd":
  "ERCP Geindiceerd Op Basis Van Bilirubine" or "ERCP Geindiceerd Voor Start FOLFIRINOX"

// ---------------------------------------------------------------------------
// Vervolgroute, afgeleid uit de resectabiliteitscategorie (Hfst 6/7/8)
// Let op: dit betreft alleen de categorie-afgeleide routering. De daadwerkelijke
// behandelkeuze wordt altijd in het regionale MDO vastgesteld (Hfst 5, nog niet
// computable beschikbaar in de brondocumentatie).
// ---------------------------------------------------------------------------

define "Kandidaat Systeemtherapie Gevolgd Door Herevaluatie Chirurgie":
  "Borderline Resectabel"

define "Kandidaat Primaire Operatieve Behandeling":
  "Resectabel"

define "Kandidaat LAPC Traject":
  "Lokaal Gevorderd"

// Gecombineerde conditie voor de systeemtherapie-actie in de PlanDefinition:
// zowel borderline resectabel als lokaal gevorderd starten met systeemtherapie.
define "Kandidaat Systeemtherapie (Borderline Of Lokaal Gevorderd)":
  "Borderline Resectabel" or "Lokaal Gevorderd"
