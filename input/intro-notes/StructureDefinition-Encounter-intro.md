{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Contact](https://zibs.nl/wiki/Contact-v3.1(2017NL))

### View Definition

[ViewDefinition voor Encounter](ViewDefinition-Encounter.json)

{% include ViewDefinition-Encounter-ui.md %}

{% include ViewDefinition-Encounter.md %}

### Request

1. Opvragen (search) contacten inclusief ziekenhuis opnames

    `GET <ontsluiten-bronsysteem-base>/Encounter?class=http://hl7.org/fhir/v3/ActCode|IMP,http://hl7.org/fhir/v3/ActCode|ACUTE,http://hl7.org/fhir/v3/ActCode|NONAC,http://hl7.org/fhir/v3/ActCode|AMB`

1. **CGM:** Ondersteunt de generieke query (`class=AMB`). CGM gebruikt het `gp-Encounter` profiel en codeert het type contact via NHG Tabel 14 (contactwijze).

{% include bronsysteem-herkennen.md %}