### Kolom Definities
<table class="grid">
<thead>
<th>Kolom label</th>
<th>FHIR Path Expression</th>
<th>FHIR Type</th>
<th>Zib element</th>
<th>Toelichting of regels</th>
</thead>
<tbody>
<tr>
<td>Bron</td>
<td><samp>meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>specimen.resolve().collection.collectedDateTime | effectiveDateTime</samp></td>
<td><code>dateTime</code></td>
<td>Monster/ AfnameDatumTijd, LaboratoriumTest/ TestDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Test</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>LaboratoriumTest/ TestCode</td>
<td></td>
</tr>
<tr>
<td>Testuitslag</td>
<td><samp>valueString | valueQuantity.value.toString() + iif(valueQuantity.unit.exists(),' ' + valueQuantity.unit,'')</samp></td>
<td><code>string</code></td>
<td>LaboratoriumTest/ TestUitslag</td>
<td><b>Epic:</b> Indien lab-order geannuleerd, dan krijgt dit alsnog de status <code>Definitief</code> met een Testuitslag van <code>GEANNULEERD</code>. Dit is voor nu akkoord bevonden door stuurgroep Zorgviewer.</td>
</tr>
<tr>
<td>Interpretatie</td>
<td><samp>interpretation.text</samp></td>
<td><code>string</code></td>
<td>LaboratoriumTest/ InterpretatieVlaggen</td>
<td><code>AA</code>: uitroepteken icon, kritiek<br/><code>281302008</code> of <code>H</code>: pijl omhoog, boven de bovengrens<br/><code>281300000</code> of <code>L</code>: pijl naar beneden, onder de ondergrens<br/>N.B. <code>Resistent</code>, <code>Intermediar</code> en <code>Sensitief</code> vanuit de standaard zijn niet van toepassing op de klinische chemie.</td>
</tr>
<tr>
<td>Onder- en bovengrens</td>
<td><samp>referenceRange.low.value.toString() + ' - ' + referenceRange.high.value.toString() + iif(referenceRange.high.unit.exists(),' ' + referenceRange.high.unit,'')</samp></td>
<td><code>string</code></td>
<td>LaboratoriumTest/ReferentieOndergrens, LaboratoriumTest/ ReferentieBovengrens</td>
<td>Indien <code>low.unit</code> en <code>high.unit</code> niet gelijk zijn aan elkaar toon dan <code>unit</code> bij beide.</td>
</tr>
<tr>
<td>Materiaal</td>
<td><samp>specimen.resolve().type.text</samp></td>
<td><code>string</code></td>
<td>Monster/ Monstermateriaal</td>
<td></td>
</tr>
<tr>
<td>Status</td>
<td><samp>status</samp></td>
<td><code>string</code></td>
<td>ResultaatStatus</td>
<td><b>Epic:</b> Indien lab-order geannuleerd, dan krijgt dit alsnog de status <code>Definitief</code> met een Testuitslag van <code>GEANNULEERD</code>. Dit is voor nu akkoord bevonden door stuurgroep Zorgviewer.</td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Commentaar</td>
<td><samp>comment</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting materiaal</td>
<td><samp>specimen.resolve().note.text</samp></td>
<td><code>string</code></td>
<td>Monster/ Toelichting</td>
<td></td>
</tr>
</tbody>
</table>