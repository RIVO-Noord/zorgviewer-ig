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
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>effectiveDateTime</samp></td>
<td><code>dateTime</code></td>
<td>*DatumTijd</td>
<td></td>
</tr>
<tr>
<td>Meting</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>MetingNaam</td>
<td></td>
</tr>
<tr>
<td>Value</td>
<td><samp>valueQuantity.value.toString()+' '+valueQuantity.unit | valueString | valueCodeableConcept.coding.display</samp></td>
<td><code>string</code></td>
<td>Uitslag/Waarde</td>
<td></td>
</tr>
<tr>
<td>Components</td>
<td><samp>component.valueQuantity.value.select(toString()).join('/')+' '+component[0].valueQuantity.unit</samp></td>
<td><code>string</code></td>
<td>*Waarde</td>
<td></td>
</tr>
<tr>
<td>Uitvoerder</td>
<td><samp>performer.display</samp></td>
<td><code>string</code></td>
<td>Auteur</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Methode</td>
<td><samp>method.text</samp></td>
<td><code>string</code></td>
<td>*Type</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+MeetLocatie</td>
<td><samp>bodySite.text</samp></td>
<td><code>string</code></td>
<td>MeetLocatie</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Meting</td>
<td><samp>code.coding.where(system='http://loinc.org').select('LOINC#' + code + ' ' + display)</samp></td>
<td><code>string</code></td>
<td>MetingNaam</td>
<td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;system&gt;</code> en gebruik dan <code>CodeSystem.title</code></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Meting</td>
<td><samp>code.coding.where(system='https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen').select('NHG45#' + code + ' ' + display)</samp></td>
<td><code>string</code></td>
<td>MetingNaam</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>comment | note.text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td><b>LET OP:</b> note.text is een FHIR R4 veld</td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(Status)</td>
<td><samp>status</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr style="background-color:#d6dce5">
<td>(GroepCode)</td>
<td><samp>'lookup'</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Lookup groep LOINC code middels <code>&lt;terminologie-base&gt;/ConceptMap/vital-signs-groups$translate?code=&lt;code&gt;</code><br/>Gebruik deze om de regels te groeperen.</td>
</tr>
</tbody>
</table>