* [NEN 7513:2018](https://www.nen.nl/nen-7513-2018-nl-245399) ~vrij beschikbaar na registratie~
    * gebeurtenissen in scope van de Zorgviewer
        * Als de Zorgviewer een patient opent: "gegevens lezen"
        * Als een beheerder loggegevens inziet: "loggegevens lezen"
* Zie [AuditEvent-example-1](AuditEvent-example-1.html)

<style>table, td, th { border: 1px solid black; padding:5px; }</style>

| key | value | FHIR Path |
|--|--|--|
| **Gebeurtenis** | | `AuditEvent` |
| gebeurteniscode | DCM,110110,'Patient Record' | `AuditEvent.type.coding.system = http://dicom.nema.org/resources/ontology/DCM`<br/>`AuditEvent.type.coding.code = 110110` |
| actiecode | R | `AuditEvent.action = R` |
| datum en tijd | 1986‐09‐14T14:12:12 | `AuditEvent.recorded` |
| **Gebruiker** | | `AuditEvent.agent` |
| gebruikers-id | arts@umcg | zorgaanbieder OID `AuditEvent.agent.userId.system = urn:oid:2.16.840.1.113883.2.4.3.8`<br/>of AGB-Z `urn:oid:2.16.840.1.113883.2.4.6.1.06020101`<br/>`AuditEvent.agent.userId.value = Practitioner.name`<br/>`AuditEvent.agent.userId.assigner.display = UMCG` |
| | | `AuditEvent.agent.policy = https://rivo-noord.nl/zorgviewer/toestemming`<br/>Zelfde als voor ToestemmingConsent.policy! |
| gebruikersrol | 05 Directly involved healthcare professional | `AuditEvent.agent.role.coding.code = 05`<br/>`AuditEvent.agent.role.coding.display = Directly involved healthcare professional` |
| ID van verantwoordelijke gebruiker | zie gebruikers-id | |
| Rol van verantwoordelijke gebruiker | zie gebruikersrol | |
| **Object** | | `AuditEvent.entity` |
| Identificatortype | Patiëntnummer | `AuditEvent.entity.type.code = 1`<br/>`AuditEvent.entity.type.system = http://hl7.org/fhir/audit-entity-type` |
| Identifiator | http://fhir.nl/fhir/NamingSystem/bsn,999911120 | `AuditEvent.entity.identifier.system = http://fhir.nl/fhir/NamingSystem/bsn`<br/>`AuditEvent.entity.identifier.value = 999911120` |
| Autorisatieprotocol | ? | |
| Toestemmingsprofiel | ? | |
| **Loggegevens** | | `AuditEvent.source` |
| Identificatie van de bron | Zorgviewer RIVO-Noord | `AuditEvent.source.identifier.value` | 


{% include img.html img="nen7513-datamodel.png" caption="NEN 7513 overzicht datamodel<br/>geel is verplicht" width="70%" %}