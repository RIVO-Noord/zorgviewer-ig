{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Vaccinaties](https://zibs.nl/wiki/Vaccinatie-v3.1(2017NL))

### View Definition

* [ViewDefinition voor Vaccinaties](ViewDefinition-Immunization.json)

<div>
{% include ViewDefinition-Immunization-ui.md %}
</div>

{% include ViewDefinition-Immunization.md %}

### Gebruikte waardelijsten

* ATC (Nexus) - `system=http://www.whocc.no/atc`
* NDC (Epic) - `system=http://hl7.org/fhir/sid/ndc`
* CVX (Epic) - `system=http://hl7.org/fhir/sid/cvx`
* G-Standaard Voorschrijfproducten (PRK) (Chipsoft) - `system=urn:oid:2.16.840.1.113883.2.4.4.10`

### Request

1. Opvragen (search) vaccinaties

    `GET <ontsluiten-bronsysteem-base>/Immunization?patient=<fhir_patient_id>&status=completed`

{% include bronsysteem-herkennen.md %}