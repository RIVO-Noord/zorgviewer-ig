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
<td>Begin</td>
<td><samp>start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>end</samp></td>
<td><code>dateTime</code></td>
<td>EindDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Met</td>
<td><samp>participant.where(actor.reference.contains('Practitioner/'))[0].actor.display</samp></td>
<td><code>string</code></td>
<td>ContactMet::Zorgverlener</td>
<td></td>
</tr>
<tr>
<td>Locatie</td>
<td><samp>participant.where(actor.reference.contains('Location/'))[0].actor.display</samp></td>
<td><code>string</code></td>
<td>Locatie::Zorgaanbieder</td>
<td></td>
</tr>
<tr>
<td>Status</td>
<td><samp>status</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Type</td>
<td><samp>appointmentType.coding.display</samp></td>
<td><code>code</code></td>
<td>ContactType</td>
<td></td>
</tr>
</tbody>
</table>