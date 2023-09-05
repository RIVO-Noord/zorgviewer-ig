{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Wilsverklaring](https://zibs.nl/wiki/Wilsverklaring-v3.1(2017NL))

### User-Interface guidance
**Belangrijk dat de UI Schets van Behandelaanwijzing en de UI Schets van Wilsverklaring in één scherm te tonen.**

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-BehandelAanwijzingenWilsverklaring2.png" class="figure-img img-responsive img-rounded center-block"></div>

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
      <td><samp>.meta.extension[system="http://hl7.org/fhir/R4/StructureDefinition/extension-Meta.source"].valueUri</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td> of lookup adhv code (AGB-Z of OID)</td>
    </tr>
    <tr>
      <td>Datum</td>
      <td><samp>.dateTime</samp></td>
      <td><code>dateTime</code></td>
      <td>WilsverklaringDatum</td>
      <td>Kunnen vage datums zijn</td>
    </tr>
    <tr>
      <td>Type​</td>
      <td><samp>.category[1].text</samp></td>
      <td><code>string</code></td>
      <td>WilsverklaringType</td>
      <td></td>
    </tr>
    <tr>
      <td>Source</td>
      <td><samp>.sourceAttachement.data</samp></td>
      <td><code>base64Binary</code> encoded PDF</td>
      <td>WilsverklaringDocument</td>
      <td>Indien beschikbaar.</td>
    </tr>
  </tbody>
</table>

### Request

1. Opvragen (search) wilsbeschikkingen

    `GET <ontsluiten-bronsysteem-base>/Consent?patient=<fhir_patient_id>&category=http://snomed.info/sct|11341000146107`

{% include bronsysteem-herkennen.md %}