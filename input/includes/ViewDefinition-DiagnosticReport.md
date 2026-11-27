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
<td>Datum</td>
<td><samp>effectiveDateTime</samp></td>
<td><code>dateTime</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>PA nummer</td>
<td><samp>identifier.where(type.text='Filler Identifier').value</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Categorie</td>
<td><samp>category.text</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Code</td>
<td><samp>code.text</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Uitvoerder</td>
<td><samp>performer.actor.display</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">DETAILS</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Componenten</td>
<td><samp>result.select(display).join('
')</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Tussen haakjes de component header, gevolgd door de tekst van het component.</td>
</tr>
</tbody>
</table>