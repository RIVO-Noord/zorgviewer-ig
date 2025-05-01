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
<td><samp>effectivePeriod.start</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode/startDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Eind</td>
<td><samp>effectivePeriod.end</samp></td>
<td><code>dateTime</code></td>
<td>Gebruiksperiode/eindDatumTijd</td>
<td></td>
</tr>
<tr>
<td>Medicatie</td>
<td><samp>medicationReference.display</samp></td>
<td><code>string</code></td>
<td>Gebruiksproduct</td>
<td></td>
</tr>
<tr>
<td>Dosering & Instructies</td>
<td><samp>dosage.text</samp></td>
<td><code>string</code></td>
<td>Gebruiksinstructie/Omschrijving</td>
<td>N.B. Als text niet beschikbaar dan samenstellen uit discrete informatie en markeren met een icoontje &#9432;</td>
</tr>
<tr>
<td>Toedieningsweg</td>
<td><samp>dosage.route.text</samp></td>
<td><code>string</code></td>
<td>Gebruiksinstructie/Toedieningsweg</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Registratiedatum</td>
<td><samp>dateAsserted</samp></td>
<td><code>dateTime</code></td>
<td>MedicatieGebruikDatumTijd</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Voorschrijver</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse-Prescriber').valueReference.display</samp></td>
<td><code>string</code></td>
<td>Voorschrijver::Zorgverlener</td>
<td></td>
</tr>
</tbody>
</table>