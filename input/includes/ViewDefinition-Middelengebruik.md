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
<tr>
<td>Bron</td>
<td><samp>meta.extension('http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source').valueUri</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Datum</td>
<td><samp>effectiveDateTime | issued</samp></td>
<td><code>dateTime</code></td>
<td>WaarnemingGebruik</td>
<td>Datum van de vaststelling van het gebruik.</td>
</tr>
<tr>
<td>Gebruiksperiode</td>
<td><samp>iif(effectivePeriod.start.exists() and effectivePeriod.end.exists(), effectivePeriod.start.toString()+' tot '+effectivePeriod.end.toString(), iif(effectivePeriod.start.exists(), 'vanaf '+effectivePeriod.start.toString(), iif(effectivePeriod.end.exists(), 'tot '+effectivePeriod.end.toString(), 'vanaf '+effectiveDateTime.toString())))</samp></td>
<td><code>string</code></td>
<td>WaarnemingGebruik</td>
<td>EffectivePeriod is voorgeschreven in de ZIB, maar in veel gevallen zal de data geen periode bevatten. In die gevallen is de datum van vaststelling bepalend voor interpretatie.</td>
</tr>
<tr>
<td>Soort gebruik</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>NVT</td>
<td>Code van de ZIB voor middelengebruik</td>
</tr>
<tr>
<td>Status</td>
<td><samp>valueCodeableConcept.coding[0].display | valueString</samp></td>
<td><code>string</code></td>
<td>Status</td>
<td>Indicatie of in het heden of verleden sprake is (geweest) van middelengebruik.</td>
</tr>
<tr>
<td>Middel</td>
<td><samp>iif(component.where(code.coding.where(code='410675002').exists()).valueCodeableConcept.exists(), component.where(code.coding.where(code='410942007').exists() or code.coding.where(code='53661000146106').exists()).valueCodeableConcept.coding[0].display + ' ' + component.where(code.coding.where(code='410675002').exists()).valueCodeableConcept.coding[0].display, component.where(code.coding.where(code='410942007').exists() or code.coding.where(code='53661000146106').exists()).valueCodeableConcept.coding[0].display)</samp></td>
<td><code>string</code></td>
<td>Middel</td>
<td>Soort middel en toedieningsvorm</td>
</tr>
<tr>
<td>Hoeveelheid</td>
<td><samp>iif(component.exists(), iif(component.where(code.coding.where(code='401201003').exists()).exists(), component.where(code.coding.where(code='266918002').exists() or code.coding.where(code='228390007').exists() or code.coding.where(code='160573003').exists()).valueQuantity.value.toString()+' '+component.where(code.coding.where(code='266918002').exists() or code.coding.where(code='228390007').exists() or code.coding.where(code='160573003').exists()).valueQuantity.unit+' ('+component.where(code.coding.where(code='401201003').exists()).valueQuantity.value.toString()+' '+component.where(code.coding.where(code='401201003').exists()).valueQuantity.unit+')', component.where(code.coding.where(code='266918002').exists() or code.coding.where(code='228390007').exists() or code.coding.where(code='160573003').exists()).valueQuantity.value.toString()+' '+component.where(code.coding.where(code='266918002').exists() or code.coding.where(code='228390007').exists() or code.coding.where(code='160573003').exists()).valueQuantity.unit), valueQuantity.value.toString()+' '+valueQuantity.unit)</samp></td>
<td><code>string</code></td>
<td>Hoeveelheid</td>
<td>Het aantal eenheden (glazen, sigaretten, pillen, shots etc.) per dag, week, maand of jaar of de freqentie van gebruik.</td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>comment | note.text</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td></td>
</tr>
</tbody>
</table>