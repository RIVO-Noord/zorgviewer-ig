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
<td>Begin</td>
<td><samp>period.start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>period.end</samp></td>
<td><code>dateTime</code></td>
<td>EindDatumTijd</td>
<td></td>
</tr>
<tr>
<td>ConcernLabel</td>
<td><samp>type.text | type.coding[0].display</samp></td>
<td><code>string</code></td>
<td>ConcernLabel</td>
<td></td>
</tr>
<tr>
<td>Probleem</td>
<td><samp>diagnosis.condition.display</samp></td>
<td><code>string</code></td>
<td>Probleem</td>
<td></td>
</tr>
</tbody>
</table>