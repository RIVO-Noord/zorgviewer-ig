### Gegevensherkomst
<table class="grid">
<thead>
<th>Label</th>
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
<td>Burgerlijke staat</td>
<td><samp>maritalStatus.text | maritalStatus.coding.display</samp></td>
<td><code>string</code></td>
<td>BurgerlijkeStaat</td>
<td></td>
</tr>
</tbody>
</table>