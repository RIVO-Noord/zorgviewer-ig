{% include profile-note.md %}

### Zorginformatiebouwsteen

De volgende zibs vallen onder het thema probleemlijst. LET OP: Deze samenstelling heeft als focus het Probleem (Condition) in tegenstelling tot het [profiel EpisodeOfCare](StructureDefinition-EpisodeOfCare.html) die heeft als focus de Episode.

- [ZIB Probleem](https://zibs.nl/wiki/Probleem-v4.1(2017NL)) - BgZ[^1]
- [ZIB ZorgEpisode](https://zibs.nl/wiki/ZorgEpisode-v1.0(2020NL)) Huisartsgegevens[^2]

[^1]: [BgZ 2017](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017)
[^2]: [Huisartsgegevens](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data)

### View Definition

[ViewDefinition voor Probleemlijst](ViewDefinition-Probleemlijst.json)

{% include ViewDefinition-Probleemlijst-ui.md %}

{% include ViewDefinition-Probleemlijst.md %}

### Requests

Er is geen request waarmee je beide resources in 1 keer kan opvragen. Je moet hiervoor dus een request doen per profiel. Zie [Condition](StructureDefinition-Condition.html#request) en [EpisodeOfCare](StructureDefinition-EpisodeOfCare.html#request)