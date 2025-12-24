### Bevragen bronsysteem: Summary Table

In onderstaande tabel staan de benodigde SAML attributen voor bevragen van een Sanday systeem vanuit de Zorgviewer.

| Item | Sanday (SAML) | Example | FHIR Path |
|--|--|--|--|
| Patient BSN | *via $match* | `999911120` | Patient.identifier[system=BSN] |
| Requesting Organization (OID) | context-requester-org-id | `2.16.528.1.1007.3.3.15123` | Practitioner.meta[extension=source] |
| Target Organization (AGB) | context-target-org-id | [`01010813`](https://www.vektis.nl/agb-register/onderneming-01010813) | system=http://fhir.nl/fhir/NamingSystem/agb-z
{: .grid .table-striped}
