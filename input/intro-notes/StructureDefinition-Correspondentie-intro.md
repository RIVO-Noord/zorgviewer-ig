{% include profile-note.md %}

### Zorginformatiebouwsteen

* [PDF/A](https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/OntwerpPDFA) - n.b. is geen zib, maar een informatiestandaard.
* [ZIB SOEPVerslag](https://zibs.nl/wiki/SOEPVerslag-v1.0(2020NL))
* [TekstRapportage](https://simplifier.net/anw/nl-core-nursingreport) - n.b. dit is geen zib, komt uit [NUTS Zorgtoepassing HA VVT Inzage](https://wiki.nuts.nl/books/samenwerken-huisarts-en-thuiszorg/page/zorgtoepassing-ha-vvt-inzage-dossier-v11)

### View Definition

[ViewDefinition voor Correspondentie](ViewDefinition-Correspondentie.json)

{% include ViewDefinition-Correspondentie-ui.md %}

{% include ViewDefinition-Correspondentie.md %}

### Requests

Er is geen request waarmee je de resources in 1 keer kan opvragen. Je moet hiervoor dus een request doen per resource.

1. Zie [DocumentReference](StructureDefinition-DocumentReference.html#request) en [EncounterReport](StructureDefinition-EncounterReport.html#request)

1. Opvragen (search) alle tekst rapportages (alleen NUTS gebasseerde bronnen)

    `GET <ontsluiten-bronsysteem-base>/Observation?patient=<fhir_patient_id>&_profile=https://nuts.nl/fhir/StructureDefinition/nl-core-nursingreport&_sort=-date&_count=10`

    