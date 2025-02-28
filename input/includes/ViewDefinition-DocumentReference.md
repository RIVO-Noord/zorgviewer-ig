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
<td><samp>iif(exists(context.period.start),context.period.start,indexed+'(i)')</samp></td>
<td><code>dateTime</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Type</td>
<td><samp>iif(type.text.startsWith('2.16.840.1.113883.'),type.coding[0].code,type.text)</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Class</td>
<td><samp>iif(class.text.startsWith('2.16.840.1.113883.'),class.coding[0].code,class.text)</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Beschrijving</td>
<td><samp>iif(exists(description),description,content.attachment.title)</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Auteur</td>
<td><samp>author.display</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr>
<td>Specialisme</td>
<td><samp>iif(context.practiceSetting.text.startsWith('2.16.840.1.113883.'),context.practiceSetting.coding.code,context.practiceSetting.text)</samp></td>
<td><code>string</code></td>
<td>nvt</td>
<td></td>
</tr>
<tr style="background-color:#adb9ca; color:white"><th colspan="5">MARKERING</th></tr>
<tr style="background-color:#b4c7e7">
<td>(MimeType - voor filteren op pdf)</td>
<td><samp>content.attachment.contentType</samp></td>
<td><code>code</code></td>
<td>nvt</td>
<td></td>
</tr>
</tbody>
</table>