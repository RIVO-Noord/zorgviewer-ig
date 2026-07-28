{% include profile-note.md %}

### Zorginformatiebouwsteen

* [ZIB OverdrachtGeplandeZorgActiviteit/Afspraak:Contact](https://www.zibs.nl/wiki/OverdrachtGeplandeZorgActiviteit-v3.1(2017NL))
* [eAfspraak Appointment](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_eAfspraak)

<blockquote class="stu-note" markdown="1">
De Afspraak in een GeplandeZorgActiviteit is in FHIR gemapped op de eAfspraak Appointment Profiel, dus NIET op Encounter. Door een technische fout in de eAfspraak FHIR Package moeten we het profiel op de core FHIR Appointment baseren.
</blockquote>

### View Definition

[ViewDefinition voor Appointment](ViewDefinition-Appointment.json)

{% include ViewDefinition-Appointment-ui.md %}

{% include ViewDefinition-Appointment.md %}

### Request

1. Opvragen (search) afspraken (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Appointment?status=booked,pending,proposed`

1. Opvragen (search) afspraken (eAfspraak)

    `GET <ontsluiten-bronsysteem-base>/Appointment[?date=gtyyyy-mm-dd]`

{% include bronsysteem-herkennen.md %}