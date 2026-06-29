### Bevragen bronsysteem: Autorisatie

In onderstaande tabel staan de benodigde attributen voor bevragen van een CGM Huisarts systeem via de Pharmeon FHIR API vanuit de Zorgviewer.

| Item | CGM (SAML) | Example | FHIR Path |
|--|--|--|--|
| Patient BSN | *via $match* | `999911120` | Patient.identifier[system=BSN] |
| Requesting Organization (OID) | context-requester-org-id | `2.16.528.1.1007.3.3.15123` | Practitioner.meta[extension=source] |
| Target Organization (AGB) | context-target-org-id | [`01990140`](https://www.vektis.nl/agb-register/onderneming-01990140) | system=http://fhir.nl/fhir/NamingSystem/agb-z |
{: .grid .table-striped}

### Bevragen bronsysteem: Patient identificatie

1. Opzoeken patient FHIR id middels Patient/$match en de BSN van de patient
1. Meegeven patient FHIR id bij elke request als parameter "patient"

### Bevragen bronsysteem: Requests

* Zie ook specifieke Requests voor [Encounter](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/StructureDefinition-Encounter.html#request), [DocumentReference](StructureDefinition-DocumentReference.html#request), [VitalSigns](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/StructureDefinition-VitalSign.html#request), [LaboratoryTestResult](StructureDefinition-LaboratoryTestResult.html#request), [AllergyIntolerance](StructureDefinition-AllergyIntolerance.html#request) en [Middelengebruik](StructureDefinition-Middelengebruik.html#request).
