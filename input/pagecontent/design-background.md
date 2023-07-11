### Opties Ontsluiten Bronsysteem

In onderstaande plaat zijn een 2-tal opties geschetst voor het positioneren van de bouwblok Ontsluiten Bronsysteem.
Let op: dit is niet een solution layer plaat. Het kan nog steeds dat de functionaliteit van het bouwblok Ontsluiten Bronsysteem gesplitst is.

Functionaliteiten:
* Zorgt voor een FHIR IF conform deze implementatie gids.
* Als deze bij de zorgaanbieder wordt geplaatst zal hier ook iets van firewall functionaliteit in zitten om de FHIR IF veilig op het internet te ontsluiten.
* Als de Bron (EPD/ECM) geen FHIR kan of niet helemaal standaard, kunnen hier transformaties gebeuren.

{% include img.html img="ontsluiten-bronsysteem-opties.png" caption="Opties Ontsluiten Bronsysteem" width="70%" %}

#### Optie 1 (groen)
Voor het ontsluiten van het bronsysteem is een resource server, waar de informatie opgehaald kan worden, en is er een authenticatie server nodig, waar de authenticatie wordt afgehandeld. Bij optie 1, zijn de inrichting en het beheer met name aan de zorgaanbieder kant benodigd en kan de Zorgviewer op basis van de afgesproken standaard uit deze IG connecteren. 

* Conclusie: Inrichten en beheer ligt bij de zorgaanbieder.

#### Optie 2 (paars)
Voor het ontsluiten van het bronsysteem is een resource server, waar de informatie opgehaald kan worden, en is er een authenticatie server nodig, waar de authenticatie wordt afgehandeld. Bij optie 2, zijn de inrichting en het beheer met name aan de Zorgviewer kant benodigd en kan de Zorgviewer op basis van de iets afwijkende standaard uit deze IG connecteren. 

* Conclusie: Zorgviewer Bouw team neemt ontwikkeling en beheer op zich.

### Ontsluiten ACP vanuit Dokter Drenthe / VIPLive

In onderstaande plaat is globaal weergegeven hoe de systemen van de huisarts integreren richting de Zorgviewer.

{% include img.html img="ontsluiten-dokterdrenthe.png" caption="Ontsluiten dokter Drenthe" width="70%" %}

#### Definities
* Topicus = Leverancier van VIPLive
* VIPLive = producten suite / platform, VIPLive is geen HIS, in VIPLive wordt de ACP ingevoerd door de huisarts
* VIPLive Spoed EPD = module van VIPLive en wordt gebruikt in de huisartsenpost

#### Omschrijving proces
VIPLive (SPOED EPD) is het systeem waarmee de Zorgviewer gekoppeld moet worden. Het VIPLive platform, met daarin SPOED EPD wordt in de avond, nacht en weekend gebruikt door de huisartsenpost (HAP). De triagist aan de telefoon voert de triage uit wanneer een patiënt belt. De gegevens van de patiënt en BSN wordt gedocumenteerd in het VIPLive Spoed EPD. Basale dossier informatie is hier al bekend via Landelijk SchakelPunt (LSP) indien patiënt toestemming heeft gegeven.
 
Niet elk huisartspraktijk in Noord-Nederland (Groningen/Friesland/Drenthe) heeft VIPLive. Echter, in Drenthe is regionaal afgesproken om VIPLive (Spoed EPD) te gebruiken bij de HAPPEN. Daarbij wordt de ACP informatie áltijd in VIPLive vastgelegd. Nogmaals, deze afspraak is regionaal gemaakt binnen Drenthe. Dit is niet het geval in Friesland en in Groningen.

Voor alle huisartsen (niet HAP) is het relevant om de correspondentie vanuit het ziekenhuis te kunnen inzien vanuit VIPLive in de Zorgviewer. 

De integratie is als volgt met de Zorgviewer
* Ophalen van de ACP uit VIPLive platform met daarin VIPLive Spoed EPD
* opstarten Zorgviewer vanuit VIPLive

 