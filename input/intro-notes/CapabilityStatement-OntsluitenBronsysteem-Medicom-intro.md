### Bevragen bronsysteem: Autorisatie

In onderstaande tabel staan de benodigde attributen voor bevragen van een Pharmapartners Medicom systeem via het Formelio Zorg Integratie Platform (ZIP) vanuit de Zorgviewer.

| Item | ZIP (SAML Claim) | Example | FHIR Path |
|--|--|--|--|
| Patient BSN | patient | `999911120` | Patient.identifier[system=BSN] |
| ?? | use_case | `??` |  |
| Requesting Organization (OID) | requesting_organization | `2.16.528.1.1007.3.3.15123` | Practitioner.meta[extension=source] |
| Target Organization | target_organization | `??` | system=?? |
| Target Collaboration | target_collaboration | `??` | system=?? |
| Target System | target_system | `medicom` |  |
| Request ID | HTTP-header traceparent[^1] | `version-traceid-parentid-traceflags` |
{: .grid .table-striped}

[^1]: [W3C Trace Context](https://www.w3.org/TR/trace-context/)

### Bevragen bronsysteem: Patient identificatie

1. Opnemen patient claim bij verkrijgen token

### Bevragen bronsysteem: Requests

* Niet Flag (Alerts), Immunization (Vaccinaties) en DocumentReferences (Correspondentie) uitvragen.
* ...
