{% include profile-note.md %}

{% include future-note.md %}

### Zorginformatiebouwsteen

* [ZIB OverdrachtGeplandeZorgActiviteit/Afspraak:Contact](https://www.zibs.nl/wiki/OverdrachtGeplandeZorgActiviteit-v3.1(2017NL))
* [eAfspraak Appointment](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_eAfspraak)

_N.B. In tegenstelling tot wat bij de zib OverdrachtGeplandeZorgActiviteit is gedocumenteerd is de Afspraak niet een zib Contact, maar een eAfspraak Appointment._

### View Definition

[ViewDefinition voor Appointment](ViewDefinition-Appointment.json)

{% include ViewDefinition-Appointment-ui.md %}

{% include ViewDefinition-Appointment.md %}

### Request

1. Opvragen (search) afspraken (BgZ)

    `GET <ontsluiten-bronsysteem-base>/Appointment?status=booked,pending,proposed`

{% include bronsysteem-herkennen.md %}