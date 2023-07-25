{% include profile-note.md %}

### Zorginformatiebouwsteen

[ZIB Wilsverklaring](https://zibs.nl/wiki/Wilsverklaring-v3.1(2017NL))

### User-Interface guidance
**Belangrijk dat de UI Schets van Behandelaanwijzing en de UI Schets van Wilsverklaring in één scherm te tonen.**

Dit figuur is opgebouwd uit grofweg 2 onderdelen:
1. een schets van het scherm met labels en sortering informatie

{% include img.html img="UI-Schets-BehandelAanwijzingenWilsverklaring2.png" width="100%" %}

2. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels

{% include img.html img="tabel-UI-Schets-BehandelAanwijzingenWilsverklaring2.png" width="100%" %}

### Request

1. Opvragen (search) wilsbeschikkingen

    `GET <ontsluiten-bronsysteem-base>/Consent?patient=<fhir_patient_id>&category=http://snomed.info/sct|11341000146107`

{% include bronsysteem-herkennen.md %}