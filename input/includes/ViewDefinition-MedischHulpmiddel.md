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
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Begin datum</td>
<td><samp>whenUsed.start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatum</td>
<td></td>
</tr>
<tr>
<td>Hulpmiddel</td>
<td><samp>device.display</samp></td>
<td><code>string</code></td>
<td>Product</td>
<td></td>
</tr>
<tr>
<td>Indicatie</td>
<td><samp>indication[0].display | indication[0].text</samp></td>
<td><code>string</code></td>
<td>Indicatie</td>
<td></td>
</tr>
<tr>
<td>Anatomische locatie</td>
<td><samp>bodySite.text | bodySite.coding[0].display</samp></td>
<td><code>string</code></td>
<td>AnatomischeLocatie</td>
<td></td>
</tr>
<tr>
<td>Lateraliteit</td>
<td><samp>bodySite.extension('http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier').valueCodeableConcept.coding[0].display</samp></td>
<td><code>string</code></td>
<td>Lateraliteit</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>note[0].text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
</tbody>
</table>