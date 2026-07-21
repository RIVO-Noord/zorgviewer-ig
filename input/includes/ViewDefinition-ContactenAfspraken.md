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
<tr style="background-color:#000000; color:white"><td colspan=5><i>Encounter</i></td></tr>
<tr>
<td>Bron</td>
<td><samp>meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Begin</td>
<td><samp>period.start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>period.end</samp></td>
<td><code>dateTime</code></td>
<td>EindDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Met</td>
<td><samp>participant.individual.display</samp></td>
<td><code>string</code></td>
<td>ContactMet::Zorgverlener</td>
<td></td>
</tr>
<tr>
<td>Rol</td>
<td><samp>participant.individual.extension('http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference').valueReference.display</samp></td>
<td><code>string</code></td>
<td>ContactMet::Zorgverlener/ZorgverlenersRol</td>
<td></td>
</tr>
<tr>
<td>Locatie</td>
<td><samp>location.location.display</samp></td>
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
<td><samp>class.display</samp></td>
<td><code>code</code></td>
<td>ContactType</td>
<td></td>
</tr>
<tr>
<td>Reden</td>
<td><samp>episodeOfCare.display | reason.text | diagnosis.condition.display</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Uit huisarts gekoppelde Episode or DeviatingResult or Problem or Condition</td>
</tr>
<tr style="background-color:#000000; color:white"><td colspan=5><i>Appointment' and (status='proposed' or status='pending' or status='booked</i></td></tr>
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
<td><samp>participant.actor.where(reference.contains('Practitioner/'))[0].display</samp></td>
<td><code>string</code></td>
<td>ContactMet::Zorgverlener</td>
<td></td>
</tr>
<tr>
<td>Rol</td>
<td><samp>participant.actor.where(reference.contains('Practitioner/'))[0].extension('http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference').valueReference.display</samp></td>
<td><code>string</code></td>
<td>ContactMet::Zorgverlener/ZorgverlenersRol</td>
<td></td>
</tr>
<tr>
<td>Locatie</td>
<td><samp>participant.actor.where(reference.contains('Location/'))[0].display</samp></td>
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
<td><code>string</code></td>
<td>ContactType</td>
<td></td>
</tr>
<tr>
<td>Reden</td>
<td><samp>reason.text | indication.display</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>DeviatingResult or Problem or Condition<br/>n.b. dit is geen ZIB.</td>
</tr>
</tbody>
</table>