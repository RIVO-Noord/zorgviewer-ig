{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Contact](https://zibs.nl/wiki/Contact-v3.1(2017NL))

### View Definition

[ViewDefinition voor Appointment](ViewDefinition-Appointment.json)

{% include ViewDefinition-Appointment-ui.md %}

{% include ViewDefinition-Appointment.md %}

### Request

1. Opvragen (search) actieve en gesloten problemen

    `GET <ontsluiten-bronsysteem-base>/Appointment?status=booked,pending,proposed`

{% include bronsysteem-herkennen.md %}