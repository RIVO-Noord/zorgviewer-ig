| Documentinformatie                            |                 |
| --------------------------- | ----------------------------------|
| Versie |_Versienummers volgen versies van de [IG](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/changes.html)_  |
| Documentatie                | `Minimaal Link naar powerpoint met de gebruikte schermvoorbeelden` [Schermvoorbeelden](https://umcgonline.sharepoint.com/:f:/r/sites/RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Analyseteam/Schermvoorbeelden?csf=1&web=1&e=FCRwUn)<br> `Waar relevant andere links`   |
| Features en/of user stories | `Gekoppelde work items (links Azure Devops m.b.v. hash #<id>`            |
| **Reviewstatus** |`Gebruik de` [Checklist reviews analyseteam](https://dev.azure.com/UMCG-MIT/Zorgviewer/_wiki/wikis/Zorgviewer.wiki/11916/Checklist-reviews-analyseteam) |
| Reviewdatum | | 
| Review door | |
| Feedback verwerkt (Ja/Nee) |  | 


Wijzigingenbeheer
===========================================================================================================================================

Meest recente wijziging bovenaan
|  Datum    | Wie    | Wat                                           |
| ---------| -----  | --------------------------------------------- |
|`dd-mm-yy`|`naam`  | `bv. 'start document'`                        |

[[_TOC_]]


# Aanleiding & context
`Benoem de algemene context en aanleiding`

# Gegevensbronnen
| Naam (NL)                                                 | Versie   | Standaard        | FHIR Resource/profile   | Beschrijving concept                                                                                                                   |
| --------------------------------------------------------- | ------------------ | ---------------- |  -------------| -------------------------------------------------------------------------------------------------------------------------------------- |
|`Het FO ontwerpt op logisch niveaus tegen de zibs aan:`  <br>[Link naar de ZIBs](https://zibs.nl/wiki/ZIB_Hoofdpagina) | `Gebruikte Versie van de ZIB` | `Naam standaard, bv. BgZ of eOverdracht` |`Zibs worden in de praktijk (technische uitwerking) gevuld in de FHIR resources met een lokaal profiel. Die technische invulling wordt beschreven in de HL7 FHIR implementatiegids`  [Link implementatiegids](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/artifacts.html#structures-resource-profiles) |`Plak hier een kopie van de beschrijving ('concept element) van de zib. Indien niet beschikbaar, een eigen eenduidige beschrijving.`<br>`We gebruiken de`.<br> [ZIB Publicatie 2017(NL) - Zorginformatiebouwstenen](https://zibs.nl/wiki/ZIB_Publicatie_2017(NL))).  |

# Ontwerpbeslissingen en/of bijzonderheden
`In deze paragraaf nemen we ontwerpbeslissingen op, denk aan informatie over waarom bepaalde velden wel of niet in een FHIR query zijn opgenomen of waarom van een uitgangspunt wordt afgeweken`


# Disclaimer
`De disclaimer is bedoeld om gebruikers te informeren over de beperkingen, verantwoordelijkheden en het gebruik van Zorgviewer en de getoonde informatie. Een disclaimer beschermt de aanbieder (zoals RIVO Noord) juridisch en informeert gebruikers over het juiste gebruik van de applicatie.` 
`Check ook eventuele data kwaliteit issues hier:` [Data kwaliteit bevindingen verzamel issue](https://dev.azure.com/umcg-MIT/Zorgviewer/_workitems/edit/385176)
`Doelen:`
`1.  Uitleggen dat de informatie in de applicatie mogelijk niet altijd volledig of actueel is.`
`2.  Verduidelijken dat gebruikers zelf verantwoordelijk zijn voor het interpreteren van de getoonde medische gegevens.`
`3.  Afbakening van aansprakelijkheid van de leverancier bij eventuele fouten, vertragingen of onjuistheden in de weergegeven informatie.`
`4.  Bevestigen dat de applicatie bedoeld is als hulpmiddel en niet als vervanging voor professioneel medisch advies of (direct) patiëntcontact.`

Deze informatie dient te worden toegevoegd aan Zorgviewer [disclaimer](https://rivo-noord.nl/zorgviewer/disclaimer).
- `tekst disclaimer` 

# Schermontwerp

| Naam scherm       | `Naam van het gegevensscherm`                                               
| ------------------- | -------------------------------------------------------------------------------- |
| Naam menu item    | `Naam van het menu item; kan verschillen (bv. 'medicatie' van de schermnaam)`                                            |
| Icoon `(of iconen)` | `We gebruiken google fonts; specificeer het icoon en vermeld de url`[icoon](https://fonts.google.com/icons) |
| Gegevensherkomst schermontwerp    | `Link naar het UI wireframe in de IG op https://build.fhir.org/ig/, overlapt in de praktijk met de het onderdeel 'gegevensbronnen' omdat het UI wireframe in de IG op dezelfde pagina staat als het resource profile. Toch apart opnemen.`                        |

**De volgende gegevens worden getoond:**
`Het bouwteam heeft niet alleen behoefte aan een *.png van het scherm maar ook aan een tekstuele opsomming van de op het scherm te tonen gegevens. Geef hier daarom een opsomming van zib-onderdelen bv:`

**Basisgegevens**
- `'Bron'`
- `'Datum'`
- `'Diagnose'`

**Detail (uitklap)**
- `'toelichting'`
- `'etc...'`

**Schermvoorbeeld**
`plak hier schermvoorbeelden die je tijdens het ontwerpfase in powerpoint maakt en bij releases update met een schermprint van het gerealiseerde scherm. Gebruik naar eigen inzicht subkoppen als 'aanpassing menu'/ 'basisoverzicht / 'detailscherm'`

**Schermgedrag**
`op termijn dit onderwerp verwijzen naar de stijlgids. Nu 'standaardgedrag' of beschrijf een uitzondering `
|                      |        |
| -------------------- | ------ |
| Zoeken               |        |
| Filteren | | 
| Sortering |  (standaard op datum aflopend)    |
| Uitklapveld          |        |


# Tijdlijn
`Het startscherm van de Zorgviewer is de zgn. tijdlijn.`
`Op de tijdlijn worden 'kaarten' getoond van klinisch relevant gebeurtenissen met betrekking tot de patiënt, bijvoorbeeld Correspondentie. Vanuit de tijdlijn kan een Zorgverlener via die 'kaart' doorklikken naar het corresponderende Zorgviewerscherm.`
`Omdat niet alle schermen klinisch relevante gebeurtenissen bevatten (bv. 'Patiëntcontext') kennen niet alle Zorgviewer-schermen. Voor die schermen waar een kaart bij hoort wordt hier een ontwerp van die kaart getoond. In overige gevallen volstaat hier 'niet van toepassing' en worden de subonderdelen (ontwerp, gedrag, etc.) verwijderd.`
   


| Naam kaart       | `Naam van de kaart op de tijdlijn`                                               |
| ---------------- | -------------------------------------------------------------------------------- |
| Icoon            | `specificeer het icoon en vermeld de url`[icoon](https://fonts.google.com/icons) |
| Resource Profile | `Link naar het resource profile in de IG, https://build.fhir.org/ig/`                                        |

**Kaartontwerp**
`(bv. Powerpoint) mock up met met voorbeelddata`

**De volgende gegevens worden getoond:**
`Het bouwteam heeft niet alleen behoefte aan een *.png van het scherm maar ook aan een tekstuele opsomming van de op het scherm te tonen gegevens. Geef hier daarom een opsomming van zib-onderdelen bv:`

**Basisgegevens**
- `'Bron'`
- `'Datum'`
- `'Diagnose'`

**Detail (uitklap)**
- `'toelichting'`
- `'etc...'`

**Kaartgedrag, bijzonderheden**
`indien van toepassing`

# Testcases
`Beschrijf hier verwachte gegevenssituaties.`