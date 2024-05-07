{% include profile-note.md %}

### User-Interface guidance

Een schets van het scherm met labels en sortering informatie:
<div style="clear:both;"><img src="ui-documentref.png" class="figure-img img-responsive img-rounded center-block"></div>

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
      <td><samp>.meta.extension[system="http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source"].valueUri</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
    </tr>
    <tr>
      <td>Datum</td>
      <td><samp>.context.period.start</samp></td>
      <td><code>dateTime</code></td>
      <td><i>nvt</i></td>
      <td>N.B. tijd is GMT, dus omzetten naar CET.​</td>
    </tr>
    <tr>
      <td>Beschrijving</td>
      <td><samp>.description​</samp> of <samp>.type.text<samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td></td>
    </tr>
    <tr>
      <td>Auteur</td>
      <td><samp>.author.display</samp> of <samp>.context.practiceSetting.text​</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td></td>
    </tr>    
  </tbody>
</table>

### Document soorten herkennen

<table class="grid">
  <thead>
    <th>class (higher level grouping)</th>
    <th>type (http://loinc.org)</th>
    <th>descriptions</th>
  </thead>
  <tbody>
    <tr>
      <td>correspondence Correspondentie</td>
      <td>Healthcare communication Document (56444-3)</td>
      <td>Correspondentie, Patiëntenbrief, Verwijsbrief, Poliklinische brief, Artsenbrief</td>
    </tr>
    <tr>
      <td>imaging-result Imaging result</td>
      <td>Procedure note (28570-0)</td>
      <td>Radiologie verslag</td>
    </tr>
    <tr>
      <td>clinical-note Notitie</td>
      <td>Epic clinical-note(s) types from https://vendorservices.epic.com/Sandbox/Index?api=865:
        <ul><li>Discharge Documentation (18842-5)</li>
        <li>Consultation (11488-4)</li>
        <li>History & Physical (34117-2)</li>
        <li>Progress Note (11506-3)</li>
        <li>Procedure Note (28570-0)</li>
        <li>Emergency Department Note (34111-5)</li>
        <li>Nurse Note (34746-8)</li>
        <li>Discharge Instructions (74213-0)</li>
        <li>Risk assessment and screening note (75492-9)</li>
        <li>OR Note (11504-8)</li>
        <li>Miscellaneous Notes (34109-9)</li></ul></td>
      <td></td>
    </tr>
  </tbody>
</table>

Zie het Excelbestand tab "classCode+decision tree" voor LOINC codes:
[Nationale XDS metadataset](https://nictiz.nl/standaarden/overzicht-van-standaarden/xds-metadata/)

### Request

1. Opvragen (search) alle documenten

    `GET <ontsluiten-bronsysteem-base>/DocumentReference?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}