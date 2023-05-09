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

Dit figuur is opgebouwd uit grofweg 3 onderdelen:
1. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels
1. een schets van de tabel met labels en sortering informatie
1. in geeltjes eventuele extra toelichting of regels

{% include img.html img="ui-consent.png" caption="User-Interface Consent guidance" width="100%" %}

### Request

1. Opvragen (search) behandelaanwijzingen

    `GET <ontsluiten-bronsysteem-base>/Consent?subject=<fhir_patient_id>&category=http://snomed.info/sct|11291000146105`