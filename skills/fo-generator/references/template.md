|                             |                 |
| --------------------------- | ----------------------------------|
| Versie |_Versienummers volgen versies of de [IG](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/changes.html)_  |
| Documentatie                | `Minimaal Link naar powerpoint met` [schermvoorbeelden]([Schermvoorbeelden](https://umcgonline.sharepoint.com/:f:/r/sites/RIVO-Noord-RealisatieZorgviewer/Shared%20Documents/Analyseteam/Schermvoorbeelden?csf=1&web=1&e=FCRwUn))``<br> `Waar relevant andere links`   |
| Features en/of user stories | `Gekoppelde work items (links Azure Devops m.b.v. hash #`            |

Wijzigingenbeheer[](https://dev.azure.com/UMCG-MIT/Zorgviewer/_wiki/wikis/Zorgviewer.wiki/7051/Template-Functioneel-Ontwerp?anchor=versiebeheer)
===========================================================================================================================================

Meest recente wijziging bovenaan
| Versie | Datum    | Wie    | Wat                                           |
| -------| ---------| -----  | --------------------------------------------- |
|        |`dd-mm-yy`|`naam`  | `bv. 'start document'`                        |

[[_TOC_]]

# Aanleiding & context

`Benoem de algemene context en aanleiding`

# Gegevensbronnen

| Naam (NL)                                                 | Versie   | Standaard        | FHIR Resource/profile   | Beschrijving concept                                                                                                                   |
| --------------------------------------------------------- | ------------------ | ---------------- |  -------------| -------------------------------------------------------------------------------------------------------------------------------------- |
|`Het FO ontwerpt op logisch niveaus tegen de zibs aan:`  <br>[Link naar de ZIBs](https://zibs.nl/wiki/ZIB_Hoofdpagina) | `Gebruikte Versie van de ZIB` | `Naam standaard, bv. BgZ of eOverdracht` |`Zibs worden in de praktijk (technische uitwerking) gevuld in de FHIR resources met een lokaal profiel. Die technische invulling wordt beschreven in de HL7 FHIR implementatiegids`  [Link implementatiegids](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/artifacts.html#structures-resource-profiles) |`Plak hier een kopie van de beschrijving ('concept element) van de zib. Indien niet beschikbaar, een eigen eenduidige beschrijving.`<br>`We gebruiken de`.<br> [ZIB Publicatie 2017(NL) - Zorginformatiebouwstenen](https://zibs.nl/wiki/ZIB_Publicatie_2017(NL))).  |
# Disclaimer
`De disclaimer is bedoeld om gebruikers te informeren over de beperkingen, verantwoordelijkheden en het gebruik van Zorgviewer en de getoonde informatie. Een disclaimer beschermt de aanbieder (zoals RIVO Noord) juridisch en informeert gebruikers over het juiste gebruik van de applicatie.` 
`Doelen:`
`1.  Uitleggen dat de informatie in de applicatie mogelijk niet altijd volledig of actueel is.`
`2.  Verduidelijken dat gebruikers zelf verantwoordelijk zijn voor het interpreteren van de getoonde medische gegevens.`
`3.  Afbakening van aansprakelijkheid van de leverancier bij eventuele fouten, vertragingen of onjuistheden in de weergegeven informatie.`
`4.  Bevestigen dat de applicatie bedoeld is als hulpmiddel en niet als vervanging voor professioneel medisch advies of (direct) patiëntcontact.`

Deze informatie dient te worden toegevoegd aan Zorgviewer [disclaimer](https://www.rivo-noord.nl/zorgviewer/disclaimer)_` 
- `tekst disclaimer` 

# Schermontwerp

| Naam scherm  & menu item       | `Naam van het gegevensscherm`                                               |
| ------------------- | -------------------------------------------------------------------------------- |
| Naam menu item      | `Naam van het menu item`                                            |
| Icoon `(of iconen)` | `We gebruiken google fonts; specificeer het icoon en vermeld de url`[icoon](https://fonts.google.com/icons) |
| Gegevensherkomst schermontwerp    | `Link naar het UI wireframe in de IG, overlapt in de praktijk met de het onderdeel 'gegevensbronnen' omdat het UI wireframe in de IG op dezelfde pagina staat als het resource profile. Toch apart opnemen.`                        |

`Het bouwteam heeft niet alleen behoefte aan een *.png van het scherm maar ook aan een tekstuele opsomming van de op het scherm te tonen gegevens. Geef hier daarom een opsomming van zib-onderdelen bv:`
- `'Contactpersoon'`
- `'Rol'`
- `'Relatie'`
- `'etc...'`

`plak hier schermvoorbeelden die je tijdens het ontwerpfase in powerpoint maakt en bij releases update met een schermprint van het gerealiseerde scherm. Gebruik naar eigen inzicht subkoppen als 'aanpassing menu'/ 'basisoverzicht / 'detailscherm'`

## Schermgedrag

`op termijn dit onderwerp verwijzen naar de stijlgids. Nu 'standaardgedrag'. Niet-standard gedrag beschrijven onder de kop 'Uitzonderingen gegevensscherm `
|                      |        |
| -------------------- | ------ |
| Zoeken               |        |
| Filteren & sortering |        |
|  Uitklapveld         |        |

## Uitzonderingen gegevensscherm

- `uitzonderingen opsommen en toelichten`

# Tijdlijn

`Het startscherm van de Zorgviewer is the zgn. tijdlijn. De tijdlijn kent momenteel geen eigen FO.`
`Op de tijdlijn worden 'kaarten' getoond van gebeurtenissen met betrekking tot de patiënt, bijvoorbeeld Correspondentie. Vanuit de tijdlijn kan een Zorgverlener via die 'kaart' doorklikken naar het corresponderende Zorgviewerscherm.`

`Niet alle Zorgviewer-schermen kennen een kaart (bv. Patiëntcontext). Voor die schermen waar een kaart bij hoort wordt hier een ontwerp van die kaart getoond. In overige gevallen volstaat hier 'niet van toepassing' en kunnen de subonderdelen (ontwerp, gedrag, etc.) verwijderd worden.`
   
| Naam kaart       | `Naam van de kaart op de tijdlijn`                                               |
| ---------------- | -------------------------------------------------------------------------------- |
| Icoon            | `specificeer het icoon en vermeld de url`[icoon](https://fonts.google.com/icons) |
| Resource Profile | `Link naar het resource profile in de IG`                                        |

## Kaartontwerp

`(bv. Powerpoint) mock up met met voorbeelddata`

## Gedrag kaart

| Onderdeel     | Gedrag                         |
| ------------- | ------------------------------ |
| Uitklapveld   | `kolomnaam eerste uitklapveld` |

## Uitzonderingen 

`indien van toepassing`
