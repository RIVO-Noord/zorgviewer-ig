### Kolomdefinities
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
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>effectiveDateTime</samp></td>
<td><code>dateTime</code></td>
<td>*DatumTijd</td>
<td></td>
</tr>
<tr>
<td>Soort gebruik</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>NVT</td>
<td>Code van de ZIB voor middelengebruik</td>
</tr>
<tr>
<td>Status</td>
<td><samp>valueQuantity.value.toString()+' '+valueQuantity.unit | valueString | valueCodeableConcept.coding.display</samp></td>
<td><code>string</code></td>
<td>Status</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>comment | note.text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
</tbody>
</table>