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
<tr><td colspan=5><i>Condition</i></td></tr>
<tr>
<td>Bron</td>
<td><samp>meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>onsetPeriod.start | onsetDateTime</samp></td>
<td><code>Period</code> of <code>dateTime</code></td>
<td>ProbleemBeginDatum</td>
<td>Laat één datum zien als de <code>.onsetDateTime</code> en <code>.onsetPeriod</code> hetzelfde zijn</td>
</tr>
<tr>
<td>Diagnose</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>ProbleemNaam</td>
<td></td>
</tr>
<tr>
<td>Status</td>
<td><samp>clinicalStatus.lookup('ProbleemStatus').display</samp></td>
<td><code>code</code></td>
<td>ProbleemStatus</td>
<td>Zie voor labels: <a href='ValueSet-ProbleemStatus.html'>ValueSet-ProbleemStatus</a></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Diagnose</td>
<td><samp>code.coding[0].select(system.lookup('CodeSystems').display+'#' + code + ' ' + iif(exists(display),display,''))</samp></td>
<td><code>string</code></td>
<td>ProbleemNaam</td>
<td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;.system&gt;</code> en gebruik dan <code>.display</code><br/>Zie voor labels: <a href='ValueSet-CodeSystems.html'>ValueSet-CodeSystems</a></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>note.text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(regelkleur)</td>
<td><samp>clinicalStatus</samp></td>
<td><code>code</code></td>
<td>ProbleemStatus</td>
<td>Actueel (<code>active,recurrence</code>) = groene rijen, dikgedrukt<br/>Niet actueel (<code>inactive,remission,resolved</code>) = grijze rijen</td>
</tr>
<tr><td colspan=5><i>EpisodeOfCare</i></td></tr>
<tr>
<td>Bron</td>
<td><samp>meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>diagnosis.condition.resolve().select(onsetPeriod.start | onsetDateTime)</samp></td>
<td><code>Period</code> of <code>dateTime</code></td>
<td>Probleem/ ProbleemBeginDatum</td>
<td>Laat één datum zien als de <code>.onsetDateTime</code> en <code>.onsetPeriod</code> hetzelfde zijn</td>
</tr>
<tr>
<td>Diagnose</td>
<td><samp>diagnosis.condition.resolve().select(code.text | code.coding[0].display)</samp></td>
<td><code>string</code></td>
<td>Probleem/ ProbleemNaam</td>
<td></td>
</tr>
<tr>
<td>Status</td>
<td><samp>status.lookup('ProbleemStatus').display</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Zie voor labels: <a href='ValueSet-ProbleemStatus.html'>ValueSet-ProbleemStatus</a></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Diagnose</td>
<td><samp>diagnosis.condition.resolve().select(code.coding[0].select(system.lookup('CodeSystems')[0].display+'#' + code + ' ' + iif(exists(display),display,'')))</samp></td>
<td><code>string</code></td>
<td>Probleem/ ProbleemNaam</td>
<td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;.system&gt;</code> en gebruik dan <code>.display</code><br/>Zie voor labels: <a href='ValueSet-CodeSystems.html'>ValueSet-CodeSystems</a></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>diagnosis.condition.resolve().note.text</samp></td>
<td><code>string</code></td>
<td>Probleem/ Toelichting</td>
<td></td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(regelkleur)</td>
<td><samp>status</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Actueel (<code>active</code>) = groene rijen, dikgedrukt<br/>Niet actueel (<code>finished</code>) = grijze rijen</td>
</tr>
</tbody>
</table>