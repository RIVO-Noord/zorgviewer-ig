{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Laboratorium uitslag](https://zibs.nl/wiki/LaboratoriumUitslag-v4.1(2017NL))

### User-Interface guidance

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-LaboratoriumUitslag.png" class="figure-img img-responsive img-rounded center-block"></div>

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
      <td>Afnamedatum</td>
      <td><samp>.specimen.resolve().collection.collectedDateTime</samp></td>
      <td><code>dateTime</code></td>
      <td>Monster/ AfnameDatumTijd</td>
      <td></td>
    </tr>
    <tr>
      <td>Test</td>
      <td><samp>.code.text</samp></td>
      <td><code>string​</code></td>
      <td>TestCode</td>
      <td></td>
    </tr>
    <tr>
      <td>Testuitslag (interpretatie)</td>
      <td><samp>.valueString</samp> of <samp>.valueQuantity.value</samp> + <samp>.valueQuantity.unit</samp> + (<samp>.interpretation.code</samp> zie toelichting)</td>
      <td><code>decimal + string (+ icon​)</code></td>
      <td>TestUitslag, InterpretatieVlaggen</td>
      <td><code>.interpretation.code</code><br/><code>"AA"</code>: uitroepteken icon, kritiek<br/>
      <code>"281302008" of "H"</code>: pijl omhoog, boven de bovengrens<br/>
      <code>"281300000" of "L"</code>: pijl naar beneden, onder de ondergrens<br/>
      N.B. Resistent, Intermediar en Sensitief vanuit de standaard zijn niet van toepassing op de klinische chemie. <br/><br/><b>Epic:</b> Indien lab-order geannuleerd, dan wordt deze kolom gevuld met <code>"GEANNULEERD"</code>. Dit is voor nu akkoord bevonden door stuurgroep Zorgviewer.</td>
    </tr>
    <tr>
      <td>Onder- en bovengrens</td>
      <td><samp>.referenceRange.low.value</samp> '–' <samp>.referenceRange.high.value</samp> + <samp>.referenceRange.high.unit</samp><br/>indien low.unit en high.unit niet gelijk zijn aan elkaar:<br/><samp>.referenceRange.low.value</samp> + <samp>.referenceRange.low.unit</samp> '–' <samp>.referenceRange.high.value</samp> + <samp>.referenceRange.high.unit</samp></td>
      <td><code>decimal + string​</code></td>
      <td>ReferentieOndergrens, ReferentieBovengrens</td>
      <td></td>
    </tr>
    <tr>
      <td>Materiaal</td>
      <td><samp>.specimen.resolve().type.text</samp></td>
      <td><code>string​</code></td>
      <td>Monster/ Monstermateriaal</td>
      <td></td>
    </tr> 
    <tr>
      <td>Status</td>
      <td><samp>.status</samp></td>
      <td><code>code</code></td>
      <td>ResultaatStatus</td>
      <td><b>Epic:</b> Indien lab-order geannuleerd, dan krijgt dit alsnog de status Definitief met een Testuitslag van <code>"GEANNULEERD"</code>. Dit is voor nu akkoord bevonden door stuurgroep Zorgviewer.</td>
      <td>​</td>
    </tr>
    <tr style="background-color:#8faadc; color:white">
      <th colspan="5">(1) UITKLAPVELD</tH>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Commentaar</td>
      <td><samp>.comment</samp></td>
      <td><code>string</code></td>
      <td>Toelichting</td>
      <td>​</td>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Toelichting materiaal</td>
      <td><samp>.specimen.revolve().note.text</samp></td>
      <td><code>string</code></td>
      <td>Monster/ Toelichting</td>
      <td>​</td>
    </tr>
  </tbody>
</table>

### Zoeken naar codes

* [LOINC lab-uitslagen](https://terminologie.nictiz.nl/art-decor/loinc) - `system=http://loinc.org`

### Request

1. Opvragen (search) laatst bekende labuitslag per type (inclusief materiaalsoort) voor een patient

    `GET <ontsluiten-bronsysteem-base>/Observation/$lastn?patient=<fhir_patient_id>&category=http://snomed.info/sct|275711006&_include=Observation:specimen`

    <blockquote class="stu-note" markdown="1">
    N.B. Alleen klinische chemie resultaten zijn op dit moment beschikbaar.
    </blockquote>

{% include bronsysteem-herkennen.md %}