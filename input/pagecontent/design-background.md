### Opties Ontsluiten Bronsysteem

In onderstaande plaat zijn een 2-tal opties geschets voor het positioneren van de bouwblok Ontsluiten Bronsysteem.
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

In onderstaade plaat is globaal weergegeven hoe de systemen van de huisarts integreren richting de Zorgviewer.

{% include img.html img="ontsluiten-dokterdrenthe.png" caption="Ontsluiten dokter Drenthe" width="50%" %}

#### Definities
* Topicus = Leverancier van VIPLive
* VIPLive = producten suite / platform, VIPLive is geen HIS
* VIPLive Spoed EPD = module van VIPlive en wordt gebruikt in de huisartsenpost

#### Omschrijving proces
VIPLive SPOED EPD is het systeem waarmee de Zorgviewer gekoppeld moet worden. Het VIPlive SPOED EPD wordt in de avond, nacht en weekend gebruikt. De telefoniste voert de triage uit en documenteert hierin de gegevens van de patiënt + BSN. Basale dossier informatie is hier al bekend via LSP als patiënt toestemming heeft gegeven.
Indien het noodzakelijk is om de huisartsenpost te bezoeken wordt de afspraak, behandeling etc. allemaal in VIPLive SPOED EPD vastgelegd. Vervolgens krijgt de eigen huisarts de informatie doorgestuurd vanuit VIPlive in het eigen HIS. VIPlive SPOED EPD slaat in principe geen informatie op (slechts 72 uur), behalve voor de ACP, daarbij is VIPLive het bronsysteem.
 
Niet elke praktijk in Groningen/Friesland/Drenthe heeft VIPlive maar in Drenthe is regionaal afgesproken om VIPLive Spoed EPD te gebruiken bij de huisartsenposten. Daarbij wordt de ACP informatie áltijd in de VIPlive Spoed EPD wordt vastgelegd. Voor alle huisartsen (niet HAP) is het relevant om de correspondentie vanuit het ziekenhuis te kunnen inzien vanuit VIPlive in de Zorgviewer. 

De integratie is als volgt met de Zorgviewer
* Ophalen van de ACP uit VIP Live Spoed EPD
* opstarten Zorgviewer vanuit VIPlive

 