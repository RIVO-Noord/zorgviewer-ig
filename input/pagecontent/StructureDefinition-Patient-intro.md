{% include profile-note.md %}

### Patient.name algorithme

Bovenop constraint **zv-pat-1**:
1. als ``name[].use`` gebruik dan de ``name[use="official"]``, anders de 1ste ``name[0]``
1. als ``name[].text`` gebruik die, anders concatenate de 1ste ``name[].given[0]`` met de ``name[].family``
