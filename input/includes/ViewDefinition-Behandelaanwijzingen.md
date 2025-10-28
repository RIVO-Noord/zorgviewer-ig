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
<td>Datum</td>
<td><samp>period.start</samp></td>
<td><code>dateTime</code></td>
<td>BeginDatum</td>
<td>Kunnen vage datums zijn.</td>
</tr>
<tr>
<td>Behandeling</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment').valueCodeableConcept.coding[0].display</samp></td>
<td><code>string</code></td>
<td>Behandeling</td>
<td></td>
</tr>
<tr>
<td>Behandeling toegestaan</td>
<td><samp>modifierExtension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-TreatmentPermitted').valueCodeableConcept.coding.display</samp></td>
<td><code>string</code></td>
<td>BehandelingToegestaan</td>
<td>Zie UI schets voor icon mapping. N.B. obv coding.code</td>
</tr>
<tr>
<td>Beperkingen</td>
<td><samp>except.extension('http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Restrictions').value</samp></td>
<td><code>string</code></td>
<td>Beperkingen</td>
<td></td>
</tr>
<tr>
<td>Geverifieerd bij</td>
<td><samp>extension('http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Verification').extension('VerifiedWith').valueCodeableConcept.text.join(' & ')</samp></td>
<td><code>string</code></td>
<td>GeverifieerdBij</td>
<td></td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>extension.where(url='http://nictiz.nl/fhir/StructureDefinition/Comment').valueString</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Categorie</td>
<td><samp>category.coding.display.join(' & ')</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(status)</td>
<td><samp>status</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td></td>
</tr>
</tbody>
</table>