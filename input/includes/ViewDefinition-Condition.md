Kolom definities:
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
<td>Datum</td>
<td><samp>iif(exists(onsetPeriod),onsetPeriod.start,onsetDateTime)</samp></td>
<td><code>Period</code> of <code>dateTime</code></td>
<td>ProbleemBeginDatum</td>
<td>Laat één datum zien als de <code>.onsetDateTime</code> of <code>.onsetPeriod</code> hetzelfde is​</td>
</tr>
<tr>
<td>Diagnose</td>
<td><samp>code.text</samp></td>
<td><code>string</code></td>
<td>ProbleemNaam</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Diagnose</td>
<td><samp>code.coding[0].system+'#'+code.coding[0].code+' '+iif(exists(code.coding[0].display),code.coding[0].display,'')</samp></td>
<td><code>string</code></td>
<td>ProbleemNaam</td>
<td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;.system&gt;</code> en gebruik dan <code>CodeSystem.title</code></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>note.text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#b4c7e7">
<td>(regelkleur)</td>
<td><samp>clinicalStatus</samp></td>
<td><code>code</code></td>
<td>ProbleemStatus</td>
<td>Actueel (active) = groene rijen, dikgedrukt<br/>Niet actueel (inactive) = grijze rijen</td>
</tr>
</tbody>
</table>