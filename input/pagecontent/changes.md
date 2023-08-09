### Versies

<style>table, td, th { border: 1px solid black; padding:5px; }</style>

|Versie|Datum|Changes|
|---|---|---|
|0.13.0-CIbuild|current|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.12.0-sprint13...master)<br/>* Logging AuditEvent uitwerking|
|0.12.0-sprint13|9-aug-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.11.0-sprint12...0.12.0-sprint13)<br/>* UI Guidances detail updates/fixes<br/>* Epic checklist uitgewerkt|
|0.11.0-sprint12|27-jul-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.10.1-sprint11...0.11.0-sprint12)<br/>* Nog een lab voorbeeld toegevoegd<br/>* UI Guidances gelijkgetrokken<br/>* Structuur artifact pagina's gelijkgetrokken|
|0.10.1-sprint11|18-jul-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.10.0-sprint11...0.10.1-sprint11)<br/>* Behandelaanwijzing mapping ivm VIPLive aansluiting<br/>* Review en QA fixes|
|0.10.0-sprint11|12-jul-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.9.0-sprint10...0.10.0-sprint11)<br/>* Kleine detail updates en QA<br/>* AuditEvent draft<br/>* UI guidance updates|
|0.9.0-sprint10|27-jun-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.8.0-sprint9...0.9.0-sprint10)<br/>* Labuitslagen tweede draft<br/>* Toestemming mappings van HL7 v2 CON|
|0.8.0-sprint9|14-jun-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.7.0-sprint8...0.8.0-sprint9)<br/>* Alle UI Guidance updates<br/>* Labuitslagen eerste draft<br/>* Toestemming updates<br/>* Technische QA fixes|
|0.7.0-sprint8|30-mei-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.6.0-sprint7...0.7.0-sprint8)<br/>* Algemene UI Design aanpassingen kolom volgorde<br/>* Leeswijzer update<br/>* FHIR requests bijgesteld, DataTime vs Period<br/>* Terminologie resources toegevoegd<br/>* Kleine documentatie issues, plaatjes, missende links en wat vertalingen|
|0.6.0-sprint7|15-mei-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.5.0-sprint6...0.6.0-sprint7)<br/>* Verrichtingen, Behandelaanwijzing - UI en voorbeeld updates<br/>* Achtergrond Dokter Dokter - update|
|0.5.0-sprint6|2-mei-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.4.0-sprint5...0.5.0-sprint6)<br/>* Verrichtingen UI Guidance en Profiel - new<br/>* Patient naam algorithme<br/>* Ontsluiten bronsysteem - update<br/>* Behandelaanwijzing en Wilsverklaring UI Guidance en Profielen - concept|
|0.4.0-sprint5|17-apr-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.3.0-sprint4...0.4.0-sprint5)<br/>* Design Background - new<br/>* Probleem en Correspondentie UI Guidance - new<br/>* Toestemming CapabilityStatement, Toestemming Consent, Endpoint - new<br/>* Security Design update sequence diagram<br/>* Dataset Toestemmingen - updates|
|0.3.0-sprint4|3-apr-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.2.0-sprint3...0.3.0-sprint4)<br/>* Behandelaanwijzing (Consent) obv ACP - draft<br/>* Sequence diagrammen bijgewerkt<br/>* Bron zorgaanbieder meta tag<br/>* Correspondentie - draft|
|0.2.0-sprint3|24-mar-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.1.0-sprint2...0.2.0-sprint3)<br/>* Opstarten Zorgviewer - afgestemd<br/>* Correspondentie onderdelen, o.a. DocumentReference - draft<br/>* Security Design - draft|
|0.1.0-sprint1|tot 17-feb-2023|Wijzigingen sprint 1 en 2<br/>* Initiele vulling<br/>* Opstarten Zorgviewer draft<br/>* Requirements review door productowner|

### Versienummering

[Semantic Versioning](https://semver.org/)

Vorm: (major).(minor).(rev)-(tag)

Voorbeelden:

* 0.x.x-CIbuild - De "nightly" build
* 0.1.0-sprint1 - De versie (sprint snapshot) ten behoeve van sprint #1
* 0.2.0-sprint2 - De versie (sprint snapshot) ten behoeve van sprint #2
* 0.2.20-sprint2 - sprint #2 met verdere verduidelijking of foutjes adhv vragen
* ...
* 1.0.x-mvp2 - De eerste productie versie 1.0

### Review Workflow

* Ronde 1. Als de schrijvers van de IG een gedeelte klaar hebben dan volgt er eerst een interne review.
* Ronde 2. Daarna wordt het gedeelte aangeboden aan het bouwteam voor review.
* Ronde 3. Vervolgens kan de product owner een review uitvoeren.
* Ronde 4. Als daarmee de interne zorgviewer review is geweest kan het gedeelte nog worden aangeboden ter review aan de RIVO-Noord architecten.

**Weergave van alle reviews die tot nu toe zijn uitgevoerd:**

| Versie        | Onderdeel te reviewen                          | Ronde 1 (IG) | Ronde 2 (Bouw) | Ronde 3 (PO) | Ronde 4 (Extern) |
|---------------|------------------------------------------------|---------|---------------|---------|---------------|
| 0.1.0-sprint1 | Requirements en uitgangspunten alle paragrafen | Gereed  | Niet gevraagd | Gereed  | Niet gevraagd |
| | | | | | |

<div>
{% include Review-Workflow.svg %}
</div>