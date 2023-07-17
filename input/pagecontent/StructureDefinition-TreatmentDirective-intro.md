{% include profile-note.md %}

### FMS Adequate Registratie

Als bron voor de must-support flags is gebruikt: [Fit-gap analyse behandelaanwijzing](https://amigo.nictiz.nl/uploads/7d857f79-4b79-4732-a1dd-2756bf4cdd24/fit_gap_analyse_Behandelaanwijzing.pdf)

<blockquote class="stu-note" markdown="1">
N.B. "Geverifieerd" en "Geverifieerd bij" wel gewenst, maar niet beschikbaar in de huidige configuraties en "echte" voorbeeld data.
</blockquote>

### Advance Care Planning (ACP)

*Synoniem = Proactieve zorgplanning*

Eerder in datasets onder het kopje [Advanced Care Planning (ACP)](datasets.html#advanced-care-planning) is uitgelegd waar het formulier en de dataset uit bestaat. Een belangrijke toevoeging is dat het project op dit moment de BehandelAanwijzing zorginformatiebouwsteen (zib) in scope heeft. Deze specificering van de zib BehandelAanwijzing is te vinden in dit [resource profile](#profile).

Vanuit de landelijke organisatie rondom palliatieve zorg is er een aanvulling nodig van de BehandelingCodelijst, komende uit de zib BehandelAanwijzing. Toegevoegd zijn drie nieuwe categorieen met SNOMED CT codering. Deze lijst kun je vinden op [ACP TreatmentCodelist](ValueSet-ACPTreatmentCodelist.html) pagina. 

### User-Interface guidance
! Belangrijk dat de UI Schets van Behandelaanwijzing en de UI Schets van Wilsverklaring in één scherm te tonen.

Dit figuur is opgebouwd uit grofweg 3 onderdelen:
1. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels
1. een schets van de tabel met labels en sortering informatie
1. in geeltjes eventuele extra toelichting of regels

{% include img.html img="UI-Schets-BehandelAanwijzingenWilsverklaring1.png" caption="User-Interface Consent guidance" width="100%" %}

### Request

1. Opvragen (search) behandelaanwijzingen

    `GET <ontsluiten-bronsysteem-base>/Consent?patient=<fhir_patient_id>&category=http://snomed.info/sct|11291000146105`

### Gerelateerde Mappings

* equal betekent 100% gelijk
* equivalent betekent ongeveer gelijk

* [ConceptMap Behandelaanwijzing 2017 en Behandelaanwijzing 2020](ConceptMap-behandelaanwijzing-2017-2020.html)
* [ConceptMap BehandelingToegestaan 2017 en BeandelingBesluit 2020](ConceptMap-behandeling-toegestaan-besluit.html)