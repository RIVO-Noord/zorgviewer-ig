{% include profile-note.md %}

### View Definition

[ViewDefinition voor Correspondentie](ViewDefinition-DocumentReference.json)

<div>
{% include ViewDefinition-DocumentReference.svg %}
</div>

{% include ViewDefinition-DocumentReference.md %}

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