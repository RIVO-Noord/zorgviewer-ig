{% include profile-note.md %}

### Zorginformatiebouwsteen

* [ZIB Contact](https://zibs.nl/wiki/Contact-v1.0.1(2017NL))
* [ZIB OverdrachtGeplandeZorgActiviteit/Afspraak:Contact](https://www.zibs.nl/wiki/OverdrachtGeplandeZorgActiviteit-v3.1(2017NL))

### View Definition

[ViewDefinition voor Contacten en Afspraken](ViewDefinition-ContactenAfspraken.json)

{% include ViewDefinition-ContactenAfspraken-ui.md %}

{% include ViewDefinition-ContactenAfspraken.md %}

### Request

Er is geen request waarmee je beide resources in 1 keer kan opvragen. Je moet hiervoor dus een request doen per resource.

* Zie [Encounter](StructureDefinition-Encounter.html#request) en [Appointment](StructureDefinition-Appointment.html#request)