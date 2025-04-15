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
<td>Medicatie</td>
<td><samp>medicationReference.display</samp></td>
<td><code>string</code></td>
<td>Afgesprokengeneesmiddel</td>
<td></td>
</tr>
<tr>
<td>Dosering & Instructies</td>
<td><samp>iif(exists(dosageInstruction.text), dosageInstruction.text, dosageInstruction.additionalInstruction.text)</samp></td>
<td><code>string</code></td>
<td>Gebruiksinstructie/Omschrijving, Gebruiksinstructie/AanvullendeInstructie</td>
<td></td>
</tr>
<tr>
<td>Toedieningsweg</td>
<td><samp>dosageInstruction.route.text</samp></td>
<td><code>string</code></td>
<td>Gebruiksinstructie/Toedieningsweg</td>
<td></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>authoredOn</samp></td>
<td><code>dateTime</code></td>
<td>MedicatieafspraakDatumTijd</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Categorie</td>
<td><samp>category.text</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
</tbody>
</table>