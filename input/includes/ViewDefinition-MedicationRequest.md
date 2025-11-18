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
<td>Start</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-Medication-PeriodOfUse').valuePeriod.start | extension('http://nictiz.nl/fhir/StructureDefinition/ext-TimeInterval.Period').valuePeriod.start</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode::TijdsInterval/startDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-Medication-PeriodOfUse').valuePeriod.end | extension('http://nictiz.nl/fhir/StructureDefinition/ext-TimeInterval.Period').valuePeriod.end</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode::TijdsInterval/eindDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Medicatie</td>
<td><samp>medication.display</samp></td>
<td><code>string</code></td>
<td>Afgesprokengeneesmiddel::Product</td>
<td></td>
</tr>
<tr>
<td>Dosering & instructies</td>
<td><samp>dosageInstruction.text | extension('http://nictiz.nl/fhir/StructureDefinition/ext-RenderedDosageInstruction').valueString</samp></td>
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
<td>Stop type</td>
<td><samp>modifierExtension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-Medication-StopType').valueCodeableConcept.coding.display</samp></td>
<td><code>string</code></td>
<td>StopType</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Medicatie vorm</td>
<td><samp>medication.resolve().form.coding.display</samp></td>
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
<td><samp>requester.agent.display | requester.display</samp></td>
<td><code>string</code></td>
<td>Voorschrijver::Zorgverlener</td>
<td><b>LET OP:</b> <code>requester.display</code> is een FHIR R4 veld</td>
</tr>
</tbody>
</table>