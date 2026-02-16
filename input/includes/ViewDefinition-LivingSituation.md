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
<td><samp>effectiveDateTime</samp></td>
<td><code>dateTime</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Woningtype</td>
<td><samp>valueCodeableConcept.text | valueCodeableConcept.coding.display</samp></td>
<td><code>string</code></td>
<td>WoningType</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>comment</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
</tbody>
</table>