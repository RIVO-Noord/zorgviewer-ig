{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Probleem](https://zibs.nl/wiki/Probleem-v4.1(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags en de UI guidance is gebruikt: [Fit-gap analyse probleem](https://amigo.nictiz.nl/uploads/e4a96295-3715-439b-804a-024ca1d7fadf/fit_gap_analyse_Probleeem.pdf)

### View Definition

* [ViewDefinition voor Problemen](ViewDefinition-Condition.json)

### User-Interface Mockup

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-Problemen.png" class="figure-img img-responsive img-rounded center-block"></div>

Kolom definities:
<table class="grid">
  <thead>
    <th>Kolom label</th>
    <th width="25%">FHIR Path</th>
    <th>FHIR Type</th>
    <th>Zib element</th>
    <th>Toelichting of regels</th>
  </thead>
  <tbody>
    <tr>
      <td>Bron</td>
      <td><samp>.meta.extension("http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source").valueUri</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
    </tr>
    <tr>
      <td>Datum</td>
      <td><samp>.onsetDateTime</samp> of <samp>.onsetPeriod​</samp> (Epic)</td>
      <td><code>dateTime</code> of <code>Period</code></td>
      <td>ProbleemBeginDatum</td>
      <td>Laat één datum zien als de <code>.onsetDateTime</code> of <code>.onsetPeriod</code> hetzelfde is​</td>
    </tr>
    <tr>
      <td>Diagnose​</td>
      <td><samp>.code.text</samp></td>
      <td><code>string​</code></td>
      <td>ProbleemNaam</td>
      <td></td>
    </tr>
    <tr style="background-color:#8faadc; color:white">
      <th colspan="5">(1) UITKLAPVELD</tH>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Diagnose</td>
      <td><samp>.code.coding[]</samp> en dan <samp>.system</samp>, <samp>.code</samp> en <samp>.display​</samp></td>
      <td><code>string</code></td>
      <td>ProbleemNaam</td>
      <td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.​<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;.system&gt;</code> en gebruik dan <code>CodeSystem.title</code></td>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Toelichting</td>
      <td><samp>.note.text</samp></td>
      <td><code>string</code></td>
      <td>Toelichting</td>
      <td></td>
    </tr>
    <tr style="background-color:#adb9ca; color:white">
      <th colspan="5">MARKERING</tH>
    </tr>
    <tr style="background-color:#d6dce5">
      <td></td>
      <td><samp>.clinicalStatus</samp></td>
      <td><code>code</code></td>
      <td>ProbleemStatus</td>
      <td>Actueel (active) = groene rijen, dikgedrukt​<br/>
Niet actueel (inactive) = grijze rijen​</td>
    </tr>
  </tbody>
</table>

### Zoeken naar codes

* [DHD T-Rex](https://trex.dhd.nl/) - `system=http://snomed.info/sct`
* [ICD-10-NL](https://terminologie.nictiz.nl/art-decor/claml?collection=icd10-nl-data) - `system=http://hl7.org/fhir/sid/icd-10-nl`
* [ICPC-1 NL](https://viewers.nhg.org/icpcviewer/) - `system=http://hl7.org/fhir/sid/icpc-1-nl`

### Request

1. Opvragen (search) actieve en gesloten problemen

    `GET <ontsluiten-bronsysteem-base>/Condition?patient=<fhir_patient_id>[&clinical-status=active,resolved]`

    <blockquote class="stu-note" markdown="1">
    N.B. De clinical-status parameter is niet meer nodig als de Epic Feb '23 is geinstalleerd.
    </blockquote>

### Uitzondering onsetDateTime, onsetPeriod, abatementDateTime en abatementPeriod

<blockquote class="stu-note" markdown="1">
N.B. In tegenstelling tot het officiele zib profiel wordt in de praktijk voor de onset zowel een exacte datum (dateTime) geaccepteerd als een vage of range (period, b.v. ergens in 2011) datum.
</blockquote>

{% include bronsysteem-herkennen.md %}