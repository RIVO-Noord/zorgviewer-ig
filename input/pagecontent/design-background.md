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

