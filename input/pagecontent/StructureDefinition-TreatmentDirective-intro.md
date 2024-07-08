{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB BehandelAanwijzing](https://zibs.nl/wiki/BehandelAanwijzing-v3.1(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags is gebruikt: [Fit-gap analyse behandelaanwijzing](https://amigo.nictiz.nl/uploads/7d857f79-4b79-4732-a1dd-2756bf4cdd24/fit_gap_analyse_Behandelaanwijzing.pdf)

<blockquote class="stu-note" markdown="1">
N.B. "Geverifieerd" en "Geverifieerd bij" wel gewenst, maar niet beschikbaar in de huidige configuraties en "echte" voorbeeld data.
</blockquote>

### Behandelgrenzen van de Advance Care Planning (ACP)

*Synoniem = Proactieve zorgplanning*

Eerder in datasets onder het kopje [Advanced Care Planning (ACP)](datasets.html#advanced-care-planning) is uitgelegd waar het formulier en de dataset uit bestaat. 
Vanuit de landelijke organisatie rondom palliatieve zorg is er een aanvulling nodig van de BehandelingCodelijst, komende uit de zib BehandelAanwijzing. Toegevoegd zijn drie nieuwe categorieen met SNOMED CT codering. Deze lijst kun je vinden op [ACP TreatmentCodelist](ValueSet-ACPTreatmentCodelist.html) pagina.

<blockquote class="stu-note" markdown="1">
Op dit moment zijn alleen de Behandelwensen deel (de BehandelAanwijzing zib) in scope. Deze specificering van de zib BehandelAanwijzing is te vinden in dit [resource profile](#profile).
</blockquote>

### User-Interface guidance
**! Belangrijk dat de UI Schets van Behandelaanwijzing en de UI Schets van Wilsverklaring in één scherm te tonen.**

Een schets van het scherm met labels en sortering informatie:
<div style="clear:both;"><img src="UI-Schets-BehandelAanwijzingenWilsverklaring1.png" class="figure-img img-responsive img-rounded center-block"></div>

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
      <td><samp>.meta.extension[system="http://hl7.org/fhir/4.0/StructureDefinition/extension-Meta.source"].valueUri</samp></td>
      <td><code>string</code></td>
      <td><i>nvt</i></td>
      <td>Lookup adhv uri (AGB-Z of OID) <code>&lt;adressering-base&gt;/Organization?identifier=&lt;.meta.tag.code&gt;</code> en gebruik dan <code>Organization.name</code></td>
    </tr>  
    <tr>
      <td>Datum</td>
      <td><samp>.period.start​</samp></td>
      <td><code>dateTime</code></td>
      <td></td>
      <td>Kunnen vage datums zijn.</td>
    </tr>
    <tr>
      <td>Behandeling</td>
      <td><samp>.extension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment').valueCodeableConcept.text, zie Toelichting voor de variaties per bronsysteem</samp></td>
      <td><code>string</code></td>
      <td></td>
      <td>Epic: .extension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment').valueCodeableConcept.text met lange display; VIPLive: .extension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment').valueCodeableConcept.display in het Engels; ChipSoft: .extension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment').valueCodeableConcept.text korte display met hoofdletters</td>
    </tr>
    <tr>
      <td>Behandeling toegestaan</td>
      <td><samp>.modifierExtension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-TreatmentPermitted').valueCodeableConcept.coding.display</samp></td>
      <td><code>string</code></td>
      <td>BehandelingToegestaan</td>
      <td>Zie UI schets voor icon mappings</td>
    </tr>
    <tr>
      <td>Beperkingen</td>
      <td><samp>.except.extension.where(url='http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Restrictions').value</samp></td>
      <td><code>string</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Geverifieerd bij</td>
      <td><samp>.extension.extension.where(url='VerifiedWith').valueCodeableConcept.text</samp></td>
      <td><code>string</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr style="background-color:#8faadc; color:white">
      <th colspan="5">(1) UITKLAPVELD</tH>
    </tr>
    <tr style="background-color:#b4c7e7">
      <td>Toelichting</td>
      <td><samp>.extension.where(url='http://nictiz.nl/fhir/StructureDefinition/Comment').valueString</samp></td>
      <td><code>string</code></td>
      <td>Toelichting</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Gerelateerde Mapping

<blockquote class="stu-note" markdown="1">
Voor implementatie in VIPLive, die zib 2020 gebasseerd is, zijn mappings gedefinieerd tussen de 2017 zib versie en de 2020 zib versie. Deze mappings zijn voorgelegd aan het Nictiz zib-centrum en zij hebben deze voorlopig geaccepteerd terwijl zij verder werken aan de officiele transformaties.

* equal betekent 100% gelijk
* equivalent betekent ongeveer gelijk
</blockquote>

* [ConceptMap Behandelaanwijzing 2017 en Behandelaanwijzing2 2020](ConceptMap-behandelaanwijzing-2017-2020.html)

### Request

1. Opvragen (search) behandelaanwijzingen

    `GET <ontsluiten-bronsysteem-base>/Consent?patient=<fhir_patient_id>&category=http://snomed.info/sct|11291000146105`

{% include bronsysteem-herkennen.md %}