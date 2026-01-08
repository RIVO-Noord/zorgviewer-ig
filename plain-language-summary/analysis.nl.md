# RIVO Noord Zorgviewer IG: Analyse

### 1. Wat probeert deze IG te bereiken, in welke context en voor wie?

Deze Implementatiegids (IG) definieert de technische en functionele specificaties voor de "Zorgviewer", een systeem dat is ontworpen om zorgverleners in de regio Noord-Nederland (RIVO-Noord) snelle, veilige en duidelijke toegang te geven tot actuele medische informatie van een patiënt, ongeacht in welk zorgsysteem deze informatie is opgeslagen.

Het hoofddoel is het creëren van een compleet, uniform overzicht van patiëntgegevens ter ondersteuning van "netwerkzorg", waarbij meerdere organisaties samenwerken aan de behandeling van een patiënt. De IG is primair geschreven voor een technisch publiek – architecten, ontwikkelaars, IT-specialisten en projectmanagers – die verantwoordelijk zijn voor het implementeren en koppelen van EPD-systemen (van leveranciers zoals Epic, Chipsoft, Nexus) aan het Zorgviewer-platform (`index.md`).

### 2. Hoe verbetert deze IG eerdere benaderingen?

De IG verbetert eerdere initiatieven door de focus te verleggen van alleen "registratie aan de bron" (zoals gezien in programma's als VIPP en MedMij/PGO) naar het bieden van "goede technische ondersteuning voor zorgverleners" (`index.md`). Dit wordt bereikt door verschillende kernprincipes:

*   **Gegevens blijven aan de bron:** In tegenstelling tot systemen die gegevens in een centrale opslag kunnen repliceren, specificeert de Zorgviewer-architectuur dat informatie in real-time direct van de bronsystemen wordt opgevraagd. Dit minimaliseert gegevensduplicatie en zorgt ervoor dat de gegevens actueel zijn (`requirements.md`).
*   **Gecentraliseerd toestemmingsbeheer:** Het pakt het probleem aan van gefragmenteerde patiënttoestemming, waarbij voor elke instelling apart toestemming moet worden gegeven. De IG schetst een verschuiving naar een regionale (en uiteindelijk nationale, zoals Mitz) dienst waar patiënten hun toestemmingsrechten voor gegevensdeling op één plek kunnen beheren. Het omvat technische mappings van oudere HL7v2-toestemmingsberichten naar het nieuwe FHIR-gebaseerde systeem (`design-toestemming.md`, `ConceptMap-patient-toestemming-intro.md`).
*   **Pragmatische gegevensverwerking:** De IG hanteert een praktische benadering van problemen met gegevens uit de praktijk. Zo staat het expliciet het gebruik van `Condition.onsetPeriod` toe voor "vage" begindata van problemen (bijvoorbeeld "ergens in 2020"), een uitzondering die is gecoördineerd met Nictiz om het feitelijke gebruik in EPD's zoals Epic te weerspiegelen, wat flexibeler is dan striktere profielinterpretaties (`must-support.md`, `StructureDefinition-Condition-intro.md`).

### 3. Wat zijn de belangrijkste kenmerken en technische benaderingen van deze IG?

*   **Modulaire Architectuur:** Het systeem is ontworpen met een "bouwblokken"-benadering, met afzonderlijke, herbruikbare componenten voor functies zoals Toestemming, Authenticatie, Autorisatie, Logging en Koppeling met Gegevensbronnen (`design.md`).
*   **Standaardgebaseerde Integratie:** De IG verplicht het gebruik van open standaarden, met specifieke technische keuzes:
    *   **Gegevensuitwisseling:** HL7 FHIR STU3, gebaseerd op de Nederlandse "zibs" (Zorginformatiebouwstenen) publicatie uit 2017 (`requirements.md`).
    *   **App-integratie & Authenticatie:** Een hybride benadering met **SMART-on-FHIR 1.0.0** voor EPD-lancering en authenticatie met specifieke OAuth2-scopes voor front-end en back-end apps (`CapabilityStatement-ZorgviewerHost-intro.md`, `CapabilityStatement-OntsluitenBronsysteem-intro.md`), en **SAML** voor andere systemen zoals Chipsoft en VIPLive (`design-autorisatie.md`).
    *   **API-query's:** De IG biedt exacte `GET`-requestvoorbeelden voor elk gegevenstype, inclusief vereiste parameters zoals `patient=<id>`, `category` en `status`, om consistente query's over alle verbonden systemen te garanderen (bijvoorbeeld `StructureDefinition-AllergyIntolerance-intro.md`).
*   **Gefedereerd Datamodel:** De kerndataset is de Nederlandse "Basisgegevensset Zorg (BgZ)", inclusief 28 zibs en correspondentie. De Zorgviewer bevraagt deze gegevens van verschillende bronsystemen zonder deze centraal op te slaan (`datasets.md`, `requirements.md`).
*   **Gedistribueerde Logging:** Om end-to-end controleerbaarheid te garanderen, specificeert de IG het gebruik van `X-Correlation-Id` en `X-Request-Id` HTTP-headers om de acties van een gebruiker van de Zorgviewer naar het bronsysteem te traceren, een vereiste voor NEN 7513-naleving (`design-logging.md`).
*   **UI-gekoppelde definities:** Voor veel profielen bevat de IG een `ViewDefinition` JSON-object. Dit biedt een directe koppeling tussen de FHIR-gegevenselementen en hun beoogde presentatie in een gebruikersinterface, waardoor ontwikkelaars worden begeleid bij het zinvol weergeven van de informatie (bijvoorbeeld `StructureDefinition-AllergyIntolerance-intro.md`).

### 4. Hoe verhoudt deze IG zich tot bredere zorgstandaarden en -regelgeving?

De IG is expliciet ontworpen om te voldoen aan Nederlandse en internationale zorgstandaarden en -regelgeving.

*   **NEN-normen:** Het koppelt de bouwblokken direct aan Nederlandse NEN-normen, waaronder **NEN 7510/7512/7513** voor informatiebeveiliging en logging (waarbij het `AuditEvent`-profiel direct wordt gekoppeld aan NEN 7513), **NEN 7540** voor BgZ-gegevensuitwisseling, en toekomstige afstemming met standaarden voor toestemming (NEN 7517) en authenticatie (NEN 7518) (`nen-normen.md`, `StructureDefinition-AuditEvent-intro.md`).
*   **Wettelijke en professionele naleving:** De IG is gebouwd om te opereren binnen de wettelijke kaders van privacy (AVG) en medische praktijk ("Wet Geneeskundige BehandelOvereenkomst - WGBO"). Bovendien omvat het richtlijnen van professionele medische organisaties, zoals de "FMS Adequate Registratie", om `must-support`-vlaggen en UI-richtlijnen te definiëren (`design-toestemming.md`, `StructureDefinition-AllergyIntolerance-intro.md`).
*   **Interoperabiliteitsstandaarden:** De "bouwblokken" van de architectuur zijn gekoppeld aan overeenkomstige actorrollen uit **IHE** (Integrating the Healthcare Enterprise)-profielen. Het specificeert ook mappings van oudere standaarden zoals **HL7v2** naar de moderne FHIR-resources, wat achterwaartse compatibiliteit garandeert (`design.md`, `ConceptMap-patient-toestemming-intro.md`).
*   **Nationale programma's:** De IG sluit aan bij nationale gegevensuitwisselingsprogramma's en -standaarden, waaronder MedMij, VIPP, zibs en de nationale Mitz-toestemmingsdienst (`datasets.md`, `design-toestemming.md`).

### 5. Wie zijn de primaire gebruikers of begunstigden van deze IG?

*   **Primaire gebruikers (van de IG):** De gids is geschreven voor een technisch publiek dat verantwoordelijk is voor de implementatie: regionale architecten, ontwikkelaars, IT-specialisten, functionele ontwerpers en projectmanagers (`index.md`). De zeer gedetailleerde technische inhoud in de `intro-notes`-sectie (bijvoorbeeld specifieke API-requests, scopes en mappings) bevestigt dit publiek.
*   **Primaire begunstigden (van de Zorgviewer):**
    *   **Zorgverleners:** Zij zijn de belangrijkste eindgebruikers. De Zorgviewer is bedoeld om hen een compleet en duidelijk overzicht van patiëntgegevens te bieden, wat leidt tot betere samenwerking, minder fouten, snellere beslissingen en minder administratieve lasten (`index.md`).
    *   **Patiënten:** Patiënten zijn belangrijke begunstigden. De architectuur is gebaseerd op patiënttoestemming, waardoor zij controle hebben over wie hun gegevens mag inzien. Door betere geïnformeerde beslissingen mogelijk te maken, is het uiteindelijke doel om de patiënt "de juiste zorg op het juiste moment" te bieden (`requirements.md`, `index.md`).
