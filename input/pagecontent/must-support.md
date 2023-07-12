
Op basis van bronsysteem voorbeeld berichten conform de zibs wordt bekeken wat de minimale overlappende vulling is.
Dat weer aangevuld met de [FMS Handreiking Adequate registratie](https://amigo.nictiz.nl/handreiking-adequate-registratie) resulteert in de must-support en mandatory (min=1) van elementen.
De FMS Handreiking en Fit-Gap analyse laat de overeenkomstige elementen zien voor de bronsystemen Epic, Chipsoft en Nexus.
Van mandatory elementen (min=1) wordt er altijd vulling verwacht.
De Zorgviewer FHIR Profilen zijn constraints van de generieke zib2017 FHIR STU3 Profielen.

### User Interface levels

Daarnaast is er een onderverdeling van alle elementen voor de User Interface.

1. minimale selectie
1. must-support
1. maximaal zibs/BgZ
1. (complete fhir resource en extra extensions) *buiten scope*

Het laatst genoemde niveau is buiten scope. Met name omdat er bijna oneindig veel mogelijke vullingen en extensies mogelijk zijn.

### Uitzonderingen

In tegenstelling tot wat het zib2017 profiel zegt is het wel degelijk toegestaan om Condition.onsetPeriod te gebruiken als ProbleemBeginDatum. Dit wordt o.a. door Epic gebruikt als een begin datum een "vage" datum is, zoals ergens in het jaar 2020. Dan is het begin 20200101 en eind 20201231.
Dit is afgestemd met Nictiz zie [BITS ticket MM-4077](https://bits.nictiz.nl/browse/MM-4077).
Vanaf de volgende versie (zibs2020) is Nictiz sowieso open-world bezig.
