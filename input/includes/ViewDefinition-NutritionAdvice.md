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
<td><samp>dateTime</samp></td>
<td><code>date</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>DieetType</td>
<td><samp>oralDiet.type.text</samp></td>
<td><code>string</code></td>
<td>DieetType</td>
<td></td>
</tr>
<tr>
<td>Consistentie</td>
<td><samp>oralDiet.texture.text | oralDiet.fluidConsistencyType.text</samp></td>
<td><code>string</code></td>
<td>Consistentie</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice-Explanation').valueString</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
</tbody>
</table>