# DHD T-Rex API Documentatie

Dit document beschrijft de REST API-endpoints van [DHD T-Rex](https://trex.dhd.nl/) voor het zoeken naar diagnoses/concepten op basis van kernwoorden (zoals *"galblaas"*) en het ophalen van de bijbehorende coderingen, synoniemen en mappings (SNOMED CT, ICD-10, DBC, etc.).

---

## Basis-URL

```text
https://trex.dhd.nl/api/
```

---

## 1. Zoeken op trefwoord (`/api/search`)

Hiermee zoek je naar concepten/termen binnen de DHD Thesaurus.

- **Methode:** `GET`
- **URL:** `https://trex.dhd.nl/api/search`
- **Query Parameters:**
  - `query` (*string*, **verplicht**): Het zoekwoord (bijv. `galblaas`).
  - `type` (*integer*, optioneel): Type zoekmodus:
    - `0` = Auto
    - `1` = Fuzzy
    - `2` = Code
  - `thesaurus` (*string*, optioneel): ID van de thesaurus.
  - `specialism` (*string*, optioneel): Code van het poortspecialisme (bijv. `0318` voor Maag-Darm-Leverziekten).
  - `date` (*string*, optioneel): Peildatum in ISO-formaat (bijv. `2026-08-24`).
  - `obsolete` (*boolean*, optioneel): Inclusief vervallen termen (`true` / `false`).
  - `selectedCodeSystem` (*string*, optioneel): Filter op een specifiek codesysteem.
  - `conceptRole` (*string*, optioneel): Filter op conceptrol.
  - `registrationOption` (*string*, optioneel): Filter op registratieoptie.

### Voorbeeldverzoek
```http
GET https://trex.dhd.nl/api/search?query=galblaas&type=0
```

### Voorbeeldrespons
```json
{
  "totalItems": 36,
  "items": [
    {
      "conceptId": 1107,
      "snomed": 363353009,
      "description": "maligne neoplasma van galblaas",
      "synonyms": [
        "maligne tumor van galblaas",
        "malignant neoplasm gallbladder"
      ],
      "searchTerms": [],
      "codes": [
        "735",
        "6121",
        "979",
        "331",
        "02",
        "332",
        "102",
        "C23"
      ]
    }
  ]
}
```

---

## 2. Details, coderingen en mappings ophalen (`/api/concept/{conceptId}`)

Met het `conceptId` uit de zoekresultaten kunnen alle details, termen en afleidingen/mappings worden opgehaald.

- **Methode:** `GET`
- **URL:** `https://trex.dhd.nl/api/concept/{conceptId}`
- **Query Parameters:**
  - `date` (*string*, optioneel): Peildatum.
  - `specialism` (*string*, optioneel): Specialisme-filter.

### Voorbeeldverzoek
```http
GET https://trex.dhd.nl/api/concept/1107
```

### Inhoud van het resultaat
De JSON-respons bevat de volgende onderdelen:
- **`snomed`:** Het SNOMED CT Concept ID (`363353009`) en de bijbehorende Fully Specified Name (*Malignant neoplasm of gallbladder (disorder)*).
- **`terms`:** Alle synoniemen, voorkeurstermen, FSN en patiëntvriendelijke omschrijvingen (PVO).
- **`derivations`:** Mappings/afleidingen naar andere stelsels per specialisme:
  - **ICD-10:** Bijvoorbeeld `C23` (*Maligne neoplasma van galblaas*).
  - **DBC:** Diagnosecodes gekoppeld aan specifieke poortspecialismen (bijv. `735` voor MDL, `331` voor Heelkunde).
- **`specialisms`:** Lijst van specialismen waarvoor dit concept een basisdiagnose is.

---

## 3. Aanvullende endpoints in T-Rex

- **SNOMED Boomstructuur:** `GET https://trex.dhd.nl/api/tree/snomed?concept={conceptId}&parents={boolean}&specialism={code}`
- **ICD-10 Boomstructuur:** `GET https://trex.dhd.nl/api/tree/icd10`
- **Thesaurus Metadata:** `GET https://trex.dhd.nl/api/thesaurus`
- **Specialismenlijst:** `GET https://trex.dhd.nl/api/thesaurus/specialisms`
- **Codesystemen:** `GET https://trex.dhd.nl/api/thesaurus/codesystems`
- **Rollen:** `GET https://trex.dhd.nl/api/thesaurus/roles`
