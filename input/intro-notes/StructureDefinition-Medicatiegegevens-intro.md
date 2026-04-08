{% include profile-note.md %}

### Zorginformatiebouwsteen

* [ZIB Medicatieafspraak](StructureDefinition-MedicationRequest.html#zorginformatiebouwsteen)
* [ZIB Medicatie Gebruik2](StructureDefinition-MedicationStatement.html#zorginformatiebouwsteen) 

### View Definition

[ViewDefinition voor Medicatiegegevens](ViewDefinition-Medicatiegegevens.json)

{% include ViewDefinition-Medicatiegegevens-ui.md %}

{% include ViewDefinition-Medicatiegegevens.md %}

### Requests

Er is geen request waarmee je beide resources in 1 keer kan opvragen. Je moet hiervoor dus een request doen per resource.

1. Zie [MedicationRequest](StructureDefinition-MedicationRequest.html#request) en [MedicationStatement](StructureDefinition-MedicationStatement.html#request)

1. **[LSP](https://aorta-on-fhir.public.vzvz.nl/aorta-on-fhir-specificaties/Working-version/interfaces-resource-broker-za#get-aorta-data):** Opvragen (search) medicatiegegevens

    `GET <ontsluiten-bronsysteem-base>/$get-aorta-data?context=MEDGEG`

     <blockquote class="stu-note" markdown="1">
    N.B. In de response Bundle zitten naast MedicationRequest en MedicationStatement ook MedicationDispense (Toedieningsafspraak of MedicatieToediening2).
    </blockquote>
