{% include profile-note.md %}

<blockquote class="stu-note" markdown="1">
* N.B. "Geverifieerd" en "Geverifieerd bij" wel gewenst vanuit FMS, maar niet beschikbaar in alle huidige configuraties en "echte" voorbeeld data.
* Op dit moment zijn alleen de ACP Behandelwensen deel (de BehandelAanwijzing zib) in scope. Deze specificering van de zib BehandelAanwijzing is te vinden in dit [profile](#profile).
</blockquote>

### Zorginformatiebouwsteen

[ZIB BehandelAanwijzing](https://zibs.nl/wiki/BehandelAanwijzing-v3.1(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags is gebruikt: [Fit-gap analyse behandelaanwijzing](https://amigo.nictiz.nl/uploads/7d857f79-4b79-4732-a1dd-2756bf4cdd24/fit_gap_analyse_Behandelaanwijzing.pdf)

### Behandelgrenzen van de Advance Care Planning (ACP)

*Synoniem = Proactieve zorgplanning*

Eerder in datasets onder het kopje [Advanced Care Planning (ACP)](datasets.html#advanced-care-planning) is uitgelegd waar het formulier en de dataset uit bestaat. 
Vanuit de landelijke organisatie rondom palliatieve zorg is er een aanvulling nodig van de BehandelingCodelijst, komende uit de zib BehandelAanwijzing. Toegevoegd zijn drie nieuwe categorieen met SNOMED CT codering. Deze lijst kun je vinden op [ACP TreatmentCodelist](ValueSet-ACPTreatmentCodelist.html) pagina.

### View Definition

[ViewDefinition voor Behandelaanwijzingen](ViewDefinition-Behandelaanwijzingen.json)

{% include ViewDefinition-Behandelaanwijzingen-ui.md %}

{% include ViewDefinition-Behandelaanwijzingen.md %}

### User-Interface Mockup

**! Belangrijk dat de UI Schets van Behandelaanwijzing en de UI Schets van Wilsverklaring in één scherm te tonen.**

Een schets van het scherm met labels en sortering informatie:
<div style="clear:both;"><img src="UI-Schets-BehandelAanwijzingenWilsverklaring1.png" class="figure-img img-responsive img-rounded center-block"></div>

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