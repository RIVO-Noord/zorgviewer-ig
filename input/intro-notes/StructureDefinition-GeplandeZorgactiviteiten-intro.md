{% include profile-note.md %}

{% include future-note.md %}

### Zorginformatiebouwsteen

* [ZIB OverdrachtGeplandeZorgActiviteit/Verrichting](https://www.zibs.nl/wiki/OverdrachtGeplandeZorgActiviteit-v3.1(2017NL))
* [ZIB VerpleegkundigeInterventie](https://www.zibs.nl/wiki/VerpleegkundigeInterventie-v3.1(2017NL))

### View Definition

[ViewDefinition voor GeplandeZorgactiviteiten](ViewDefinition-GeplandeZorgactiviteiten.json)

{% include ViewDefinition-GeplandeZorgactiviteiten-ui.md %}

{% include ViewDefinition-GeplandeZorgactiviteiten.md %}

### Request

1. Opvragen (search) geplande verrichtingen & verpleegkundigeinterventies

    `GET <ontsluiten-bronsysteem-base>/ProcedureRequest?patient=<fhir_patient_id>&status=active`

{% include bronsysteem-herkennen.md %}