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
<td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
</tr>
<tr>
<td>Beoogde datum</td>
<td><samp>occurrencePeriod.select(iif(start.exists() and end.exists(), start.toString() + ' - ' + end.toString(), start | end)) | occurrenceDateTime | occurrenceTiming.repeat.boundsPeriod.select(iif(start.exists() and end.exists(), start.toString() + ' - ' + end.toString(), start | end) | scheduledPeriod.select(iif(start.exists() and end.exists(), start.toString() + ' - ' + end.toString(), start | end)) | scheduledDateTime)</samp></td>
<td><code>Period</code></td>
<td>BeoogdeDatum</td>
<td>Geplande datum, streefdatum of beoogde periode van de activiteit.</td>
</tr>
<tr>
<td>Activiteit</td>
<td><samp>code.text | code.coding[0].display</samp></td>
<td><code>string</code></td>
<td>Activiteit</td>
<td>De geplande zorgactiviteit of verrichting (SNOMED CT / verpleegkundige interventie).</td>
</tr>
<tr>
<td>Beoogde uitvoerder</td>
<td><samp>performer.display | performerType.coding[0].display | performerType.text | extension('http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference').valueReference.display</samp></td>
<td><code>string</code></td>
<td>BeoogdeUitvoerder</td>
<td>De beoogde zorgverlener, rol, discipline of zorgorganisatie die de activiteit zal uitvoeren.</td>
</tr>
<tr>
<td>Status</td>
<td><samp>status.lookup('ProcedureStatus').display | status</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Status van de geplande activiteit (bijv. Actueel / Gepland / Aangevraagd).</td>
</tr>
<tr style="background-color:#8faadc; color:white"><th colspan="5">UITKLAPVELD</th></tr>
<tr style="background-color:#b4c7e7">
<td>+Indicatie</td>
<td><samp>reasonCode[0].text | reasonCode[0].coding[0].display | reasonReference.display | reasonReference.resolve().select(code.text | code.coding[0].display)</samp></td>
<td><code>string</code></td>
<td>Indicatie</td>
<td>De medische of verpleegkundige indicatie / diagnose (zib Probleem) voor de geplande activiteit.</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Anatomische locatie</td>
<td><samp>bodySite.text | bodySite.coding[0].display</samp></td>
<td><code>string</code></td>
<td>AnatomischeLocatie</td>
<td>Anatomische locatie van de activiteit.</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Lateraliteit</td>
<td><samp>bodySite.extension('http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier').valueCodeableConcept.coding[0].display | bodySite.extension('http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier').valueCodeableConcept.text</samp></td>
<td><code>string</code></td>
<td>Lateraliteit</td>
<td>Lateraliteit (bijv. links, rechts, tweezijdig).</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Frequentie & instructies</td>
<td><samp>occurrenceTiming.repeat.frequency.select($this.toString() + 'x per ' + %context.occurrenceTiming.repeat.periodUnit) | occurrenceTiming.code.text | patientInstruction | note.text.join('
')</samp></td>
<td><code>string</code></td>
<td>Instructie</td>
<td>Frequentie, herhaling en specifieke instructies voor verpleegkundige zorg conform eOverdracht 3.1.</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Aanvrager</td>
<td><samp>requester.agent.display | requester.display</samp></td>
<td><code>string</code></td>
<td>Aanvrager</td>
<td>De zorgverlener of organisatie die de activiteit heeft aangevraagd of gepland.</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Ontvangende organisatie</td>
<td><samp>performer.where(reference.contains('Organization/')).display | extension('http://nictiz.nl/fhir/StructureDefinition/ext-Organization-Reference').valueReference.display</samp></td>
<td><code>string</code></td>
<td>OntvangendeOrganisatie</td>
<td>De ontvangende zorgaanbieder bij overdracht (eOverdracht 3.1).</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Activiteitcode</td>
<td><samp>code.coding[0].select('(' + system.lookup('CodeSystems').display + ') ' + code + ' ' + iif(exists(display),display,''))</samp></td>
<td><code>string</code></td>
<td>Activiteit</td>
<td>Meerdere codes mogelijk (SNOMED CT). Lookup system label middels CodeSystem terminologie.</td>
</tr>
<tr style="background-color:#b4c7e7">
<td>+Toelichting</td>
<td><samp>note.text.join('
')</samp></td>
<td><code>string</code></td>
<td>Toelichting</td>
<td>Aanvullende opmerkingen of toelichting.</td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(regelkleur)</td>
<td><samp>status</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Actueel (active, requested, draft) = groene/actieve statuspil, Gepland (planned, accepted, received, in-progress) = geplande statuspil.</td>
</tr>
</tbody>
</table>