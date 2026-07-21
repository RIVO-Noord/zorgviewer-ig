{% include profile-note.md %}

### Zorginformatiebouwsteen

* [ZIB OverdrachtGeplandeZorgActiviteit/Afspraak:Contact](https://www.zibs.nl/wiki/OverdrachtGeplandeZorgActiviteit-v3.1(2017NL))
* [eAfspraak Appointment](https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6/files/714361)

### View Definition

[ViewDefinition voor Appointment](ViewDefinition-Appointment.json)

{% include ViewDefinition-Appointment-ui.md %}

{% include ViewDefinition-Appointment.md %}

### Request

1. Opvragen (search) afspraken

    `GET <ontsluiten-bronsysteem-base>/Appointment?status=booked,pending,proposed`

{% include bronsysteem-herkennen.md %}