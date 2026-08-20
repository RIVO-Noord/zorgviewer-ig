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
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Lopen</td>
<td><samp>component.where(code.coding.exists(code='282097004')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>Lopen</td>
<td></td>
</tr>
<tr>
<td>Traplopen</td>
<td><samp>component.where(code.coding.exists(code='301587001')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>Traplopen</td>
<td></td>
</tr>
<tr>
<td>Houding veranderen</td>
<td><samp>component.where(code.coding.exists(code='282869009')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>HoudingVeranderen</td>
<td></td>
</tr>
<tr>
<td>Houding handhaven</td>
<td><samp>component.where(code.coding.exists(code='249868004')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>HoudingHandhaven</td>
<td></td>
</tr>
<tr>
<td>Uitvoeren transfer</td>
<td><samp>component.where(code.coding.exists(code='364666007')).select(value.coding.display | value.text)</samp></td>
<td><code>string</code></td>
<td>UitvoerenTransfer</td>
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