### Versies

<style>table, td, th { border: 1px solid black; padding:10px; }</style>
|Versie|Datum|Changes|
|---|---|---|
|0.5.0-CI build|current|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.4.0-sprint5...master)<br/>* Resultaten sprint 6|
|0.4.0-sprint4|17-apr-2023|[Detail wijzigingen](https://github.com/RIVO-Noord/zorgviewer-ig/compare/0.3.0-sprint4...0.4.0-sprint5)<br/>* Design Background - new<br/>* Probleem en Correspondentie UI Guidance - new<br/>* Toestemming CapabilityStatement, Toestemming Consent, Endpoint - new<br/>* Security Design update sequence diagram<br/>* Dataset Toestemmingen - updates|
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
* 1.0.0-mvp2 - De finale versie

En verder:

1. Git tag noemen zoals we de sprint noemen in DevOps.
1. Onder de titels van paragrafen "(draft)" of "(sprint1)".
1. In changelog, deze pagina van de IG, per sprint een overzichtje van paragrafen waar iets is gewijzigd en zichtbaar als (new-content / ligt groen gearceerd waar mogelijk).
1. (FHIR) Artifacts hebben eigen status.

### Review Workflow

* Ronde 1. Als de schrijvers van de IG een gedeelte klaar hebben dan volgt er eerst een interne review.
* Ronde 2. Daarna wordt het gedeelte aangeboden aan het bouwteam voor review.
* Ronde 3. Vervolgens kan de product owner een review uitvoeren.
* Ronde 4. Als daarmee de interne zorgviewer review is geweest kan het gedeelte nog worden aangeboden ter review aan de RIVO-Noord architecten.

**Weergave van alle reviews die tot nu toe zijn uitgevoerd:**

| Versie        | Onderdeel te reviewen                          | Ronde 1 | Ronde 2       | Ronde 3 | Ronde 4       |
|---------------|------------------------------------------------|---------|---------------|---------|---------------|
| 0.1.0-sprint1 | [Requirements en uitgangspunten alle paragrafen](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/branches/0.1.0-sprint1/conformance.html) | Gereed  | Niet gevraagd | Gereed  | Niet gevraagd |
| | | | | | |

<div>
{% include Review-Workflow.svg %}
</div>