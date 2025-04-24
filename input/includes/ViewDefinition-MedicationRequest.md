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
<td>Start</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-Medication-PeriodOfUse').valuePeriod.start</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode/startDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-Medication-PeriodOfUse').valuePeriod.end</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode/eindDatumTijd</td>
<td></td>
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
<td>N.B. Als gegenereerd uit discrete informatie dan wordt deze gemarkeerd met een icoontje &#9432;</td>
</tr>
<tr>
<td>Toedieningsweg</td>
<td><samp>iif(exists(dosageInstruction.route.text), dosageInstruction.route.text, dosageInstruction.route.coding.display)</samp></td>
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
</tbody>
</table>