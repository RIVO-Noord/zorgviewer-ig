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
<td>Gebruiksperiode::TijdsInterval/startDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-Medication-PeriodOfUse').valuePeriod.end</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode::TijdsInterval/eindDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Medicatie</td>
<td><samp>medicationReference.display</samp></td>
<td><code>string</code></td>
<td>Afgesprokengeneesmiddel::Product</td>
<td></td>
</tr>
<tr>
<td>Dosering & instructies</td>
<td><samp>dosageInstruction.text</samp></td>
<td><code>string</code></td>
<td>Gebruiksinstructie/Omschrijving, Gebruiksinstructie/AanvullendeInstructie</td>
<td>N.B. Als text niet beschikbaar dan samenstellen uit discrete informatie en markeren met een icoontje &#9432;</td>
</tr>
<tr>
<td>Toedieningsweg</td>
<td><samp>iif(exists(dosageInstruction.route.text), dosageInstruction.route.text, dosageInstruction.route.coding.display)</samp></td>
<td><code>string</code></td>
<td>Gebruiksinstructie/Toedieningsweg</td>
<td></td>
</tr>
<tr>
<td>Stop Type</td>
<td><samp>modifierExtension('http://nictiz.nl/fhir/StructureDefinition/zib-Medication-StopType').valueCodeableConcept.coding.display</samp></td>
<td><code>string</code></td>
<td>StopType</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Medicatie Vorm</td>
<td><samp>medicationReference.resolve().form.coding.display</samp></td>
<td><code>string</code></td>
<td>Afgesprokengeneesmiddel::FarmaceutischProduct/FarmaceutischeVorm</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Afspraakdatum</td>
<td><samp>authoredOn</samp></td>
<td><code>dateTime</code></td>
<td>MedicatieafspraakDatumTijd</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Voorschrijver</td>
<td><samp>requester.agent.display</samp></td>
<td><code>string</code></td>
<td>Voorschrijver::Zorgverlener</td>
<td></td>
</tr>
</tbody>
</table>