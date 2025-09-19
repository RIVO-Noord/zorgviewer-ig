### Kolom Definities
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
<td><samp>dateTime</samp></td>
<td><code>dateTime</code></td>
<td>WilsverklaringDatum</td>
<td>Kunnen vage datums zijn</td>
</tr>
<tr>
<td>Type</td>
<td><samp>category[1].coding.display</samp></td>
<td><code>string</code></td>
<td>WilsverklaringType</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/Comment').valueString</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Document</td>
<td><samp>sourceAttachement.data</samp></td>
<td><code>base64Binary</code></td>
<td>WilsverklaringDocument</td>
<td></td>
</tr>
</tbody>
</table>