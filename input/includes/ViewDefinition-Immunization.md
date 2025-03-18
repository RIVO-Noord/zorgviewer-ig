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
<td><samp>meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>date</samp></td>
<td><code>dateTime</code></td>
<td>VaccinatieDatum</td>
<td></td>
</tr>
<tr>
<td>Product</td>
<td><samp>iif(exists(vaccineCode.text),vaccineCode.text,vaccineCode.coding.display)</samp></td>
<td><code>string</code></td>
<td>ProductCode</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>note.text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
</tbody>
</table>