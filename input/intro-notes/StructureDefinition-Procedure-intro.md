{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Verrichting](https://zibs.nl/wiki/Verrichting-v4.1(2017NL))

### User-Interface Mockup

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-Verrichtingen.png" class="figure-img img-responsive img-rounded center-block"></div>

### View Definition

* [ViewDefinition voor Verrichtingen](ViewDefinition-Procedure.json)

<div>
{% include ViewDefinition-Procedure.svg %}
</div>

* '+' voor de kolom naam betekent in de uitklap
* '()' om de kolom naam betekent gebruiken voor formatting of verbergen

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
      <td><samp>.meta.extension("http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source").valueUri</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
    </tr>
    <tr>
      <td>Datum</td>
      <td><samp>.performedPeriod.start​</samp></td>
      <td><code>dateTime</code></td>
      <td>VerrichtingBeginDatum</td>
      <td>​Kunnen vage datums zijn.​</td>
    </tr>
    <tr>
      <td>Verrichting</td>
      <td><samp>.code.text</samp></td>
      <td><code>string​</code></td>
      <td>VerrichtingType</td>
      <td></td>
    </tr>
    <tr>
      <td>Locatie</td>
      <td><samp>.location.display​</samp></td>
      <td><code>string</code></td>
      <td>Locatie::Zorgaanbieder</td>
      <td>Zie discussie hier: <a href="https://bits.nictiz.nl/browse/MM-5002">BITS ticket MM-5002</a></td>
    </tr>
    <tr>
      <td>Uitgevoerd door</td>
      <td><samp>.performer.actor.display​</samp></td>
      <td><code>string</code></td>
      <td>Uitvoerder</td>
      <td>Meestal alleen specialisme</td>
    </tr>
    <tr style="background-color:#8faadc; color:white">
      <th colspan="5">(1) UITKLAPVELD</tH>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Verrichtingcode</td>
      <td><samp>.code.coding[]</samp> en dan <samp>.system</samp>, <samp>.code</samp> en <samp>.display​</samp></td>
      <td><code>string</code></td>
      <td>VerrichtingType</td>
      <td>Meerdere codes mogelijk.<br/>Ignore NullFlavor.​<br/>Lookup system label middels <code>&lt;terminologie-base&gt;/CodeSystem?url=&lt;.system&gt;</code> en gebruik dan <code>CodeSystem.title</code>​</td>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Lateraliteit</td>
      <td><samp>.bodySite.extension[url="http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier"].valueCodeableConcept.text</samp></td>
      <td><code>string</code></td>
      <td>ProbleemLateraliteit</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Codesystemen

* [DHD Verrichtingenthesaurus, CBV en Zorgactiviteiten](https://trex.dhd.nl/)
  * SNOMED CT - http://snomed.info/sct
  * DHD VT - urn:oid:2.16.840.1.113883.2.4.3.120.5.2
* [NHG Ingrepenviewer tabel 49](https://viewers.nhg.org/ingrepenviewer/)
* CBV - urn:oid:2.16.840.1.113883.2.4.3.120.5.3
* NZa - urn:oid:2.16.840.1.113883.2.4.3.27.15.5

### Request

1. Opvragen (search) verrichtingen

    `GET <ontsluiten-bronsysteem-base>/Procedure?patient=<fhir_patient_id>`

    *N.B. Deze request is breder dan de BgZ request, waar alleen de chirugische verrichtingen worden opgevraagd.*

{% include bronsysteem-herkennen.md %}