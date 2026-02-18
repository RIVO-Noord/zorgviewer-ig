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
<td>Rol</td>
<td><samp>relationship.where(coding.system='urn:oid:2.16.840.1.113883.2.4.3.11.22.472' or coding.system='http://terminology.hl7.org/CodeSystem/v3-RoleClass').select(text | coding.display)</samp></td>
<td><code>string</code></td>
<td>Rol</td>
<td></td>
</tr>
<tr>
<td>Relatie</td>
<td><samp>relationship.where(coding.system='http://hl7.org/fhir/v3/RoleCode').select(text | coding.display)</samp></td>
<td><code>string</code></td>
<td>Relatie</td>
<td></td>
</tr>
<tr>
<td>Naam</td>
<td><samp>name.select(text | given.join(' ') + ' ' + family)</samp></td>
<td><code>string</code></td>
<td>Naamgegevens</td>
<td></td>
</tr>
<tr>
<td>Telefoonnummer</td>
<td><samp>telecom.where(system='phone').value</samp></td>
<td><code>string</code></td>
<td>Contactgegevens.Telefoonnummers.Telefoonnummer</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Emailadres</td>
<td><samp>telecom.where(system='email').value</samp></td>
<td><code>string</code></td>
<td>Contactgegevens.EmailAdressen.EmailAdres</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Adres</td>
<td><samp>address.line.extension.valueString.join(' ') + ' ' + address.postalCode + ' ' + address.city</samp></td>
<td><code>string</code></td>
<td>Contactgegevens.Adresgegevens</td>
<td></td>
</tr>
</tbody>
</table>