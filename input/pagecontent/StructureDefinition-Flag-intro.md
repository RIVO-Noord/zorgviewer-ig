{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Alert](https://zibs.nl/wiki/Alert-v3.2(2017NL))

### View Definition

* [ViewDefinition voor Alerts](ViewDefinition-Flag.json)

### User-Interface guidance

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-Alerts.png" class="figure-img img-responsive img-rounded center-block"></div>

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
      <td><samp>.period.start</samp></td>
      <td><code>dateTime</code></td>
      <td>BeginDatumTijd</td>
      <td>​</td>
    </tr>
    <tr>
      <td>Categorie</td>
      <td><samp>Flag.category.text</samp> of <samp>Condition.category[0].text</samp></td>
      <td><code>string​</code></td>
      <td>AlertNaam of Conditie::Probleem</td>
      <td>Indien <samp>Condition.category[0].text</samp> null is wordt de <samp>Flag.code.text</samp> getoond</td>
    </tr>
    <tr>
      <td>Voor</td>
      <td><samp>FLag.code.text</samp> of <samp>Condition.code.text</samp></td>
      <td><code>string​</code></td>
      <td>AlertType</td>
      <td>Indien <samp>Condition.code.text null is wordt de <samp>Flag.code.text</samp> getoond </td>
    </tr>
  </tbody>
</table>

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/Flag?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}