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
<td><samp>period.start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Voor</td>
<td><samp>iif(exists(code.text),code.text,code.coding.display)</samp></td>
<td><code>string</code></td>
<td>AlertNaam</td>
<td></td>
</tr>
<tr>
<td>Voor-detail</td>
<td><samp>extension('http://hl7.org/fhir/StructureDefinition/flag-detail').valueReference.reference.resolve().code.text + extension('http://hl7.org/fhir/StructureDefinition/flag-detail').valueReference.display</samp></td>
<td><code>dateTime</code></td>
<td>Conditie::Probleem</td>
<td>De resolve levert de bijbehorende Condition</td>
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
<td>Mapping: <code>active</code> naar <code>actueel</code>; <code>in-active</code> naar <code>niet actueel</code> Uitgefilterd: <code>entered-in-error</code> wordt niet getoond in de Zorgviewer, omdat het om foutief ingevoerde data gaat.</td>
</tr>
</tbody>
</table>