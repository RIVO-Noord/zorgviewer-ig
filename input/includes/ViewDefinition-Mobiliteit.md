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
<td>Datum</td>
<td><samp>effectiveDateTime</samp></td>
<td><code>dateTime</code></td>
<td>ObservationDateTime</td>
<td></td>
</tr>
<tr>
<td>Lopen</td>
<td><samp>component.where(code.coding.exists(code='282097004')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>Walking</td>
<td></td>
</tr>
<tr>
<td>Rolstoelgebruik</td>
<td><samp>component.where(code.coding.exists(code='16581000146103')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>WheelchairUse</td>
<td></td>
</tr>
<tr>
<td>Hulpmiddelen</td>
<td><samp>component.where(code.coding.exists(code='183135000')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>MobilityAids</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>comment | note[0].text</samp></td>
<td><code>string</code></td>
<td>Comment</td>
<td></td>
</tr>
</tbody>
</table>