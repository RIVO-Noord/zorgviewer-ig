{% include profile-note.md %}

### FMS Adequate Registratie

Als bron voor de must-support flags en de UI guidance is gebruikt: [Fit-gap analyse probleem](https://amigo.nictiz.nl/uploads/e4a96295-3715-439b-804a-024ca1d7fadf/fit_gap_analyse_Probleeem.pdf)

### User-Interface guidance

Dit figuur is opgebouwd uit grofweg 3 onderdelen:
1. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels
1. een schets van de tabel met labels en sortering informatie
1. in geeltjes eventuele extra toelichting of regels

{% include img.html img="ui-condition.png" caption="User-Interface-Condition Guidance" width="100%" %}

### Zoeken naar codes

* [DHD T-Rex](https://trex.dhd.nl/) - `system=http://snomed.info/sct`
* [ICD-10-NL](https://terminologie.nictiz.nl/art-decor/claml?collection=icd10-nl-data) - `system=http://hl7.org/fhir/sid/icd-10-nl`
* [ICPC-1 NL](https://viewers.nhg.org/icpcviewer/) - `system=http://hl7.org/fhir/sid/icpc-1-nl`

### Uitzondering onsetDateTime en onsetPeriod

<blockquote class="stu-note" markdown="1">
N.B. In tegenstelling tot het officiele zib profiel wordt in de praktijk voor de onset zowel een exacte datum (dateTime) geaccepteerd als een vage of range (period, b.v. ergens in 2011) datum.
</blockquote>
