{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Allergie Intolerantie](https://zibs.nl/wiki/AllergieIntolerantie-v3.2(2017NL))

### FMS Adequate Registratie

Als bron voor de must-support flags en de UI guidance is gebruikt: [Fit-gap analyse allergie-intolerantie](https://amigo.nictiz.nl/uploads/a158231f-a872-4828-b5c5-0a24e7b4e4bd/Fit_gap_analyse_Allergie-intolerantie.pdf)

### View Definition

[ViewDefinition voor Allergieën en Intoleranties](ViewDefinition-AllergyIntolerance.json)

<div>
{% include ViewDefinition-AllergyIntolerance.svg %}
</div>

{% include ViewDefinition-AllergyIntolerance.md %}

### Request

1. Opvragen (search) allergieen en intoleranties

    `GET <ontsluiten-bronsysteem-base>/AllergyIntolerance/?patient=<fhir_patient_id>`

{% include bronsysteem-herkennen.md %}