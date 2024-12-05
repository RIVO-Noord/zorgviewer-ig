{% include profile-note.md %}

### View Definition

* [ViewDefinition voor Correspondentie](ViewDefinition-DocumentReference.json)

### User-Interface guidance

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
      <td><samp>.context.period.start</samp> of <samp>.indexed</samp> indien <samp>.context.period.start</samp> leeg is</td>
      <td><code>dateTime</code></td>
      <td><i>nvt</i></td>
      <td>N.B. tijd is GMT, dus omzetten naar CET. 
      
  Ter info: indien datum uit ​<samp>.indexed</samp> komt, wordt deze gemarkeerd met een icoontje (i) </td>
    </tr>
    <tr>
      <td>Type</td>
      <td><samp>iif(type.text.startsWith('2.16.840.1.113883.'),type.coding[0].code,type.text)</samp></td>
      <td><code>code</code></td>
      <td><i>nvt</i></td>
      <td></td>
    </tr>
    <tr>
      <td>Klasse</td>
      <td><samp>iif(class.text.startsWith('2.16.840.1.113883.'),class.coding[0].code,class.text)</samp></td>
      <td><code>code</code></td>
      <td><i>nvt</i></td>
      <td></td>
    </tr>
    <tr>
      <td>Beschrijving</td>
      <td><samp>.description​</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Tijdelijk voor Zorgplatform: gebruik <code>content.attachment.title</code> voor de beschrijving van documenten inclusief het strippen van de <code>.pdf</code>extensie</td>
    </tr>
    <tr>
      <td>Auteur</td>
      <td><samp>.author.display</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Tijdelijk voor Zorgplatform: indien <code>.author.display</code> is gevuld met een OID, dan wordt het veld gevuld met <code>Auteur niet bekend</code></td>
    </tr>
    <tr>
      <td>Specialisme</td>
      <td><samp>.context.practiceSetting.text</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Tijdelijk voor Zorgplatform: indien <code>.context.practiceSetting.text</code> is gevuld met een OID (startsWith('2.16.840.1.113883.)), dan wordt het veld gevuld met <code>.context.practiceSetting.coding.code</code> (een SNOMED CT code)</td>
    </tr>
    <tr style="background-color:gray; color:white">
      <td>MimeType (voor filtering op pdf)</td>
      <td><samp>.content.attachment.contentType</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Alleen <code>application/pdf</code> tonen</td>
    </tr>
  </tbody>
</table>

### Document soorten herkennen

<table class="grid">
  <thead>
    <th>class (higher level grouping)</th>
    <th>type (http://loinc.org)</th>
    <th>type descriptions</th>
  </thead>
  <tbody>
    <tr>
      <td>correspondence<br/>Correspondentie</td>
      <td>Healthcare communication Document (56444-3)</td>
      <td>Correspondentie, Patiëntenbrief, Verwijsbrief, Poliklinische brief, Artsenbrief</td>
    </tr>
    <tr>  
      <td>CS: Brief (51852-2)<br/>CS: Hospital Letter (68609-7)</td>
      <td>CS: Brief (51852-2)<br/>CS: Hospital Letter (68609-7)</td>
      <td>{OID?}</td>
    </tr>
    <tr>
      <td>imaging-result<br/>Imaging result</td>
      <td>Procedure note (28570-0)</td>
      <td>Radiologie verslag</td>
    </tr>
    <tr>
      <td>clinical-note<br/>Notitie</td>
      <td>Epic clinical-note(s) types from https://vendorservices.epic.com/Sandbox/Index?api=865
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

    `GET <ontsluiten-bronsysteem-base>/DocumentReference?patient=<fhir_patient_id>&status=current`

{% include bronsysteem-herkennen.md %}