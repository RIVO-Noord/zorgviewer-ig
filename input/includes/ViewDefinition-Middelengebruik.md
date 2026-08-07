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
<td><samp>effectivePeriod.select(iif(start.exists() and end.exists(), start.toString() + ' - ' + end.toString(), start | end)) | effectiveDateTime</samp></td>
<td><code>Period</code></td>
<td>StartDatum - StopDatum</td>
<td>EffectivePeriod is voorgeschreven in de ZIB, maar in veel gevallen zal de data geen periode bevatten. In die gevallen is de datum van vaststelling bepalend voor interpretatie.</td>
</tr>
<tr>
<td>Soort gebruik</td>
<td><samp>code.text | code.coding.display</samp></td>
<td><code>string</code></td>
<td>WaarnemingGebruik</td>
<td>De middelengebruik groep (roken, alcohol, drugs)</td>
</tr>
<tr>
<td>Status</td>
<td><samp>valueCodeableConcept.text | valueCodeableConcept.coding.display | valueString</samp></td>
<td><code>string</code></td>
<td>*Status</td>
<td>De status van het middelengebruik</td>
</tr>
<tr>
<td>Middel</td>
<td><samp>component.where(code.coding.exists(code = '410942007' or code = '53661000146106')).valueCodeableConcept.coding.display.combine(component.where(code.coding.exists(code = '410675002')).valueCodeableConcept.coding.display).join(' ')</samp></td>
<td><code>string</code></td>
<td>Middel</td>
<td>Soort middel en toedieningsvorm</td>
</tr>
<tr>
<td>Hoeveelheid/Antwoord</td>
<td><samp>iif(code.coding.where(system='https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen' and code in ('2418' | '2419' | '2420' | '2421' | '2422')).exists(), valueCodeableConcept.text | valueCodeableConcept.coding.display, iif(component.exists(), component.where(code.coding.where(code in ('266918002' | '228390007' | '160573003')).exists()).valueQuantity.value.toString() + ' ' + component.where(code.coding.where(code in ('266918002' | '228390007' | '160573003')).exists()).valueQuantity.unit+iif(component.where(code.coding.where(code='401201003').exists()).exists(), ' (' + component.where(code.coding.where(code='401201003').exists()).valueQuantity.value.toString() + ' ' + component.where(code.coding.where(code='401201003').exists()).valueQuantity.unit + ')', ''), valueQuantity.value.toString() + ' ' + valueQuantity.unit))</samp></td>
<td><code>string</code></td>
<td>Hoeveelheid</td>
<td>Het aantal eenheden (glazen, sigaretten, pillen, shots etc.) per dag, week, maand of jaar of de freqentie van gebruik, met eventueel de pack years voor roken. Of het antwoord op de vraag in de 5-shot vragenlijst.</td>
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