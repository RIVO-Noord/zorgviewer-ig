### Bevragen bronsysteem: Autorisatie

In onderstaande tabel staan de benodigde attributen voor bevragen van een Sanday systeem vanuit de Zorgviewer.

| Item | Sanday (SAML) | Example | FHIR Path |
|--|--|--|--|
| Patient BSN | *via $match* | `999911120` | Patient.identifier[system=BSN] |
| Requesting Organization (OID) | context-requester-org-id | `2.16.528.1.1007.3.3.15123` | Practitioner.meta[extension=source] |
| Target Organization (AGB) | context-target-org-id | [`01010813`](https://www.vektis.nl/agb-register/onderneming-01010813) | system=http://fhir.nl/fhir/NamingSystem/agb-z
{: .grid .table-striped}

### Bevragen bronsysteem: Patient identificatie

1. Opzoeken patient FHIR id middels Patient/$match en de BSN van de patient
1. Meegeven patient FHIR id bij elke request als parameter "patient"

### Bevragen bronsysteem: Requests

* Niet Flag (Alerts), Immunization (Vaccinaties) en DocumentReferences (Correspondentie) uitvragen.
* Zie ook specifieke Requests voor [VitalSigns](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/StructureDefinition-VitalSign.html#request), [LaboratoryTestResult](StructureDefinition-LaboratoryTestResult.html#request) en [AllergyIntolerance](StructureDefinition-AllergyIntolerance.html#request).
