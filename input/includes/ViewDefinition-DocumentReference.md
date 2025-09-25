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
<td><samp>iif(exists(context.period.start), context.period.start, indexed)</samp></td>
<td><code>dateTime</code></td>
<td>nvt</td>
<td>N.B. tijd is GMT, dus omzetten naar CET. Ter info: indien datum uit <code>indexed</code> komt, deze markeren met een icoontje &#9432;</td>
</tr>
<tr>
<td>Beschrijving</td>
<td><samp>iif(exists(description), description, content.attachment.title.replace('.pdf',''))+iif(exists(context.encounter.display),' '+context.encounter.display,'')</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Tijdelijk voor Zorgplatform: gebruik <code>content.attachment.title</code> voor de beschrijving van documenten inclusief het strippen van de <code>.pdf</code> extensie</td>
</tr>
<tr>
<td>Auteur</td>
<td><samp>author.display</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Tijdelijk voor Zorgplatform: indien <code>author.display</code> is gevuld met een OID, dan wordt het veld gevuld met <code>Auteur niet bekend</code></td>
</tr>
<tr>
<td>Specialisme</td>
<td><samp>iif(context.practiceSetting.text.startsWith('2.16.840.1.113883.'), context.practiceSetting.coding.code, context.practiceSetting.text)</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td>Tijdelijk voor Zorgplatform: indien <code>context.practiceSetting.text</code> is gevuld met een OID (startsWith('2.16.840.1.113883.)), dan wordt het veld gevuld met <code>context.practiceSetting.coding.code</code> (een SNOMED CT code)</td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#d6dce5">
<td>(MimeType)</td>
<td><samp>content.attachment.contentType</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td>Alleen <code>application/pdf</code> tonen</td>
</tr>
<tr style="background-color:#d6dce5">
<td>(Type)</td>
<td><samp>iif(type.text.startsWith('2.16.840.1.113883.'), type.coding[0].code, type.text)</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
</tbody>
</table>