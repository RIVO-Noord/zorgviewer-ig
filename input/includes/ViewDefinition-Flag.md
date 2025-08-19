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
<td><samp>period.start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Voor(1)</td>
<td><samp>extension.where('http://hl7.org/fhir/StructureDefinition/flag-detail').valueReference.resolve().code.text</samp></td>
<td><code>string</code></td>
<td>Conditie::Probleem</td>
<td>Als geen Voor(1), dan Voor(2), als geen Voor(2) dan Voor(3).<br/><i>De Condition resolve in de resultaat Bundle.</i></td>
</tr>
<tr>
<td>Voor(2)</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>AlertNaam</td>
<td></td>
</tr>
<tr>
<td>Voor(3)</td>
<td><samp>extension('http://hl7.org/fhir/StructureDefinition/flag-detail').valueReference.display</samp></td>
<td><code>string</code></td>
<td>Conditie::Probleem</td>
<td></td>
</tr>
<tr>
<td>Categorie</td>
<td><samp>iif(exists(category.text),category.text,category.coding.display)</samp></td>
<td><code>string</code></td>
<td>AlertType</td>
<td></td>
</tr>
<tr>
<td>Status</td>
<td><samp>status</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Mapping: <code>active</code> naar <code>actueel</code>; <code>inactive</code> naar <code>niet actueel</code> Uitgefilterd: <code>entered-in-error</code> wordt niet getoond in de Zorgviewer, omdat het om foutief ingevoerde data gaat.</td>
</tr>
</tbody>
</table>