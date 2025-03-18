{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Probleem](https://zibs.nl/wiki/Probleem-v4.1(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags en de UI guidance is gebruikt: [Fit-gap analyse probleem](https://amigo.nictiz.nl/uploads/e4a96295-3715-439b-804a-024ca1d7fadf/fit_gap_analyse_Probleeem.pdf)

### View Definition

[ViewDefinition voor Problemen](ViewDefinition-Condition.json)

<div>
{% include ViewDefinition-Condition-ui.md %}
</div>

{% include ViewDefinition-Condition.md %}

### User-Interface Mockup

Een schets van het scherm met labels en sortering informatie
<div style="clear:both;"><img src="UI-Schets-Problemen.png" class="figure-img img-responsive img-rounded center-block"></div>

### Zoeken naar codes

* [DHD T-Rex](https://trex.dhd.nl/) - `system=http://snomed.info/sct`
* [ICD-10-NL](https://terminologie.nictiz.nl/art-decor/claml?collection=icd10-nl-data) - `system=http://hl7.org/fhir/sid/icd-10-nl`
* [ICPC-1 NL](https://viewers.nhg.org/icpcviewer/) - `system=http://hl7.org/fhir/sid/icpc-1-nl`

### Request

1. Opvragen (search) actieve en gesloten problemen

    `GET <ontsluiten-bronsysteem-base>/Condition?patient=<fhir_patient_id>[&clinical-status=active,resolved]`

    <blockquote class="stu-note" markdown="1">
    N.B. De clinical-status parameter is niet meer nodig als de Epic Feb '23 is geinstalleerd.
    </blockquote>

### Uitzondering onsetDateTime, onsetPeriod, abatementDateTime en abatementPeriod

<blockquote class="stu-note" markdown="1">
N.B. In tegenstelling tot het officiele zib profiel wordt in de praktijk voor de onset zowel een exacte datum (dateTime) geaccepteerd als een vage of range (period, b.v. ergens in 2011) datum.
</blockquote>

{% include bronsysteem-herkennen.md %}