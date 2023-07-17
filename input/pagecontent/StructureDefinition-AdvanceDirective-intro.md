### User-Interface guidance
! Belangrijk dat de UI Schets van Behandelaanwijzing en de UI Schets van Wilsverklaring in één scherm te tonen.

Dit figuur is opgebouwd uit grofweg 3 onderdelen:
1. tabel met veld beschrijving, FHIR Path naar de waarde, Zib element naam en extra toelichting of regels
1. een schets van de tabel met labels en sortering informatie
1. in geeltjes eventuele extra toelichting of regels

{% include img.html img="UI-Schets-BehandelAanwijzingenWilsverklaring2.png" caption="User-Interface Consent guidance" width="100%" %}

### Request

1. Opvragen (search) wilsbeschikkingen

    `GET <ontsluiten-bronsysteem-base>/Consent?patient=<fhir_patient_id>&category=http://snomed.info/sct|11341000146107`
