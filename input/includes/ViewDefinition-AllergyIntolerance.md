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
<td>Datum</td>
<td><samp>onsetPeriod.start | onsetDateTime</samp></td>
<td><code>dateTime</code></td>
<td>StartDateTime</td>
<td></td>
</tr>
<tr>
<td>Stof</td>
<td><samp>iif(exists(code.text),code.text,code.coding.display)</samp></td>
<td><code>string</code></td>
<td>CausativeAgent</td>
<td></td>
</tr>
<tr>
<td>Toelichting</td>
<td><samp>note.text</samp></td>
<td><code>string</code></td>
<td>Comment</td>
<td></td>
</tr>
<tr>
<td>Categorie</td>
<td><samp>category.join(',')</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Meerdere opties die tegelijk getoond kunnen worden</td>
</tr>
<tr>
<td>CategorieCS</td>
<td><samp>category.extension('http://nictiz.nl/fhir/StructureDefinition/code-specification').valueCodeableConcept.text</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Ernst(1)</td>
<td><samp>criticality</samp></td>
<td><code>code</code></td>
<td>MateVanKritiek</td>
<td></td>
</tr>
<tr>
<td>Ernst(1)CS</td>
<td><samp>criticality.extension('http://nictiz.nl/fhir/StructureDefinition/code-specification').valueCodeableConcept.text</samp></td>
<td><code>code</code></td>
<td>MateVanKritiek</td>
<td></td>
</tr>
<tr>
<td>Ernst(2)</td>
<td><samp>reaction[0].severity</samp></td>
<td><code>code</code></td>
<td>Reactie/Ernst</td>
<td></td>
</tr>
<tr>
<td>Reacties</td>
<td><samp>reaction[0].manifestation[0].text</samp></td>
<td><code>string</code></td>
<td>Reactie/Symptoom</td>
<td></td>
</tr>
<tr>
<td>Status</td>
<td><samp>clinicalStatus</samp></td>
<td><code>code</code></td>
<td>AllergieStatus</td>
<td>‘Actief’, ‘Niet meer aanwezig’, ‘Achterhaald’. ‘Foutief’ status wordt niet getoond in de Zorgviewer (wordt uitgefilterd). Indien geen extensie aanwezig, dan worden de waarden als volgt gemapped: Active -> Actief; InActive -> Achterhaald; Resolved -> Niet meer aanwezig</td>
</tr>
<tr>
<td>StatusCS</td>
<td><samp>clinicalStatus.extension('http://nictiz.nl/fhir/StructureDefinition/code-specification').valueCodeableConcept.text</samp></td>
<td><code>code</code></td>
<td>AllergieStatus</td>
<td>Zie AllergieStatus</td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(VStatus)</td>
<td><samp>verificationStatus</samp></td>
<td><code>code</code></td>
<td>AllergieStatus</td>
<td></td>
</tr>
</tbody>
</table>