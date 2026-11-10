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
<td>Naam</td>
<td><samp>name.text</samp></td>
<td><code>string</code></td>
<td>Naamgegevens</td>
<td></td>
</tr>
<tr>
<td>Geboortedatum</td>
<td><samp>birthDate</samp></td>
<td><code>date</code></td>
<td>Geboortedatum</td>
<td></td>
</tr>
<tr>
<td>Leeftijd</td>
<td><samp>birthDate.toDate().leeftijd()</samp></td>
<td><code>string</code></td>
<td>Geboortedatum</td>
<td>Leeftijd berekend vanaf geboortedatum middels Zorgviewer algorithme.</td>
</tr>
<tr>
<td>BSN</td>
<td><samp>identifier.where(system='http://fhir.nl/fhir/NamingSystem/bsn').value</samp></td>
<td><code>string</code></td>
<td>Identificatienummer</td>
<td></td>
</tr>
</tbody>
</table>