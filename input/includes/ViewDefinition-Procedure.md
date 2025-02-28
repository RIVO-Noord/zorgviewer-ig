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
<td><samp>performedPeriod.start</samp></td>
<td><code>dateTime</code></td>
<td>VerrichtingBeginDatum</td>
<td>​Kunnen vage datums zijn.</td>
</tr>
<tr>
<td>Verrichting</td>
<td><samp>iif(exists(code.text),code.text,code.coding.display)</samp></td>
<td><code>string</code></td>
<td>VerrichtingType</td>
<td></td>
</tr>
<tr>
<td>Locatie</td>
<td><samp>location.display</samp></td>
<td><code>string</code></td>
<td>Locatie::Zorgaanbieder</td>
<td>Zie discussie hier: <a href="https://bits.nictiz.nl/browse/MM-5002">BITS ticket MM-5002</a></td>
</tr>
<tr>
<td>Uitgevoerd door</td>
<td><samp>performer.actor.display.join('
')</samp></td>
<td><code>string</code></td>
<td>Uitvoerder</td>
<td>Meestal alleen specialisme</td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Verrichtingcode</td>
<td><samp>code.coding[0].system+'#'+code.coding[0].code+' '+code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>VerrichtingType</td>
<td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.​<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;.system&gt;</code> en gebruik dan <code>CodeSystem.title</code></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Lateraliteit</td>
<td><samp>bodySite.extension('http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier').valueCodeableConcept.text</samp></td>
<td><code>string</code></td>
<td>ProbleemLateraliteit</td>
<td></td>
</tr>
</tbody>
</table>