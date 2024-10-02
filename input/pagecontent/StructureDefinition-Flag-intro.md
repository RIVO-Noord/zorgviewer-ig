{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Alert](https://zibs.nl/wiki/Alert-v3.2(2017NL))

### View Definition

* [ViewDefinition voor Alerts](ViewDefinition-Flag.json)

### User-Interface guidance

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
      <td></td>
    </tr>
    <tr>
      <td>Voor</td>
      <td><samp>.code.text of .extension.where(url='http://hl7.org/fhir/StructureDefinition/flag-detail').valueReference.reference.resolve().code.text</samp></td>
      <td><code>string</code></td>
      <td>AlertNaam of <i>geassosieerde</i> Conditie::Probleem</td>
      <td>De resolve levert de bijbehorende Condition</td>
    </tr>
    <tr>
      <td>Categorie</td>
      <td><samp>.category.text</samp></td>
      <td><code>string</code></td>
      <td>AlertType</td>
      <td></td>
    </tr>
    <tr>
      <td>Status</td>
      <td><samp>.status</samp></td>
      <td><code>code</code></td>
      <td><i>nvt</i></td>
      <td>Mapping: ‘active’ naar ‘actueel’; ‘in-active’ naar ‘niet actueel’ Uitgefilterd: ‘entered-in-error’ wordt niet getoond in de Zorgviewer, omdat het om foutief ingevoerde data gaat.</td>
    </tr>
  </tbody>
</table>

### Request

1. Opvragen (search) definities

    `GET <ontsluiten-bronsysteem-base>/Flag?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}