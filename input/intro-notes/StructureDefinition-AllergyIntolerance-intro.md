{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Allergie Intolerantie](https://zibs.nl/wiki/AllergieIntolerantie-v3.2(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags en de UI guidance is gebruikt: [Fit-gap analyse allergie-intolerantie](https://amigo.nictiz.nl/uploads/a158231f-a872-4828-b5c5-0a24e7b4e4bd/Fit_gap_analyse_Allergie-intolerantie.pdf)

### View Definition

* [ViewDefinition voor Allergieën en Intoleranties](ViewDefinition-AllergyIntolerance.json)

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
      <td><samp>.meta.extension("http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source").valueUri</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
    </tr>
    <tr>
      <td>Datum</td>
      <td><samp>.onsetPeriod.start</samp></td>
      <td><code>dateTime</code></td>
      <td>BeginDatumTijd</td>
      <td></td>
    </tr>
    <tr>
      <td>Stof</td>
      <td><samp>.code.text</samp></td>
      <td><code>string</code></td>
      <td>VeroorzakendeStof</td>
      <td></td>
    </tr>
    <tr>
      <td>Toelichting</td>
      <td><samp>.note.extension('http://nictiz.nl/fhir/StructureDefinition/note')</samp></td>
      <td><code>string</code></td>
      <td>Toelichting</td>
      <td></td>
    </tr>
    <tr>
      <td>Ernst</td>
      <td><samp>.criticality.extension[system="http://nictiz.nl/fhir/StructureDefinition/code-specification"].text</samp> of indien geen extensie aanwezig <samp>.criticality</samp></td>
      <td><code>string,code</code></td>
      <td>MateVanKritiek</td>
      <td></td>
    </tr>
    <tr>
      <td>Reactie</td>
      <td><samp>.reaction.manifestation.text</samp></td>
      <td><code>string</code></td>
      <td>Reactie Symptoom</td>
      <td></td>
    </tr>
    <tr>
      <td>Categorie</td>
      <td><samp>.category.extension[system=” http://nictiz.nl/fhir/StructureDefinition/code-specification"].text</samp> of indien geen extensie aanwezig <samp>.category</samp></td>
      <td><code>string,code</code></td>
      <td>AllergieCategorie</td>
      <td>Hebt meerdere opties die tegelijk getoond kunnen worden</td>
    </tr>
    <tr>
      <td>Klinische status</td>
      <td><samp>.clinicalStatus.extension[system=" http://nictiz.nl/fhir/StructureDefinition/code-specification "].text</samp> of indien geen extensie aanwezig <samp>.clinicalStatus</samp></td>
      <td><code>string,code</code></td>
      <td>AllergieStatus</td>
      <td>‘Actief’, ‘Niet meer aanwezig’, ‘Achterhaald’. ‘Foutief’ status wordt niet getoond in de Zorgviewer (wordt uitgefilterd). Indien geen extensie aanwezig, dan worden de waarden als volgt gemapped: Active -> Actief; InActive -> Achterhaald; Resolved -> Niet meer aanwezig</td>
    </tr>
  </tbody>
</table>

### Request

1. Opvragen (search) allergieen en intoleranties

    `GET <ontsluiten-bronsysteem-base>/AllergyIntolerance/?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}