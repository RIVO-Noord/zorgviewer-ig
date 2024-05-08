Zie in de FHIR specificaties: [Testing FHIR](https://hl7.org/fhir/STU3/testing.html)

### Sandboxes

* [Official HL7 Logica Sandbox](https://www.logicahealth.org/)
* [SMART Launcher](https://launch.smarthealthit.org/?fhir_version=r3)
* [Epic Hyperspace Simulator](https://appmarket.epic.com/HyperspaceSimulator)
* [Zorgplatform Sandbox](https://developer.zorgplatform.online/swaggerdocs)

### Test Tooling

* [Touchstone](https://touchstone.aegis.net/touchstone/) - REDELIJK Standaard FHIR TestScript - ook gebruikt voor MedMij kwalificatie
* [Interoplab](https://interoplab.nl/platform/)
* [Inferno](https://inferno-framework.github.io/inferno-core/) - MOEILIJK Custom Ruby
* [Crucible](https://github.com/fhir-crucible/) - API testen obv Implementatie Gids - MOEILIJK Custom Ruby

### Test Data

* [Nictiz-STU3-Zib2017](https://github.com/Nictiz/Nictiz-STU3-Zib2017/tree/stable-2.x/Examples)
* [Synthea](https://synthetichealth.github.io/synthea/) - Genereren van test data

### FHIR Path

* [FHIR Path](https://fhirpath-lab.azurewebsites.net/FhirPath/) of [fhirpath.js](https://hl7.github.io/fhirpath.js/) - query van FHIR output

### FHIR Validator Web

N.B. Vergeet niet in Options STU3 te kiezen.
* [Officiele HL7 FHIR](https://validator.fhir.org/)
* [Simplifier Validator](https://simplifier.net/validate?scope=nictiz.fhir.nl.stu3.zib2017@2.2.12)

### FHIR Validator CLI

Get the latest FHIR Validator.
```
> curl -L https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar -o validator_cli.jar
```

Run the FHIR Validator on the example Patients against the Zorgviewer profile and Dutch(nl) SNOMED CT.
```
> java -jar validator_cli.jar -version 3.0.2 -ig ~/.fhir/packages/hl7.fhir.nl.zorgviewer#dev/package/ -ig ~/.fhir/packages/nictiz.fhir.nl.stu3.zib2017#2.2.18/package/ -sct nl -profile http://hl7.nl/fhir/zorgviewer/StructureDefinition/Patient input/examples/Patient-JFictief.json
> java -jar validator_cli.jar -version 3.0.2 -ig input/resources -ig ~/.fhir/packages/nictiz.fhir.nl.stu3.zib2017#2.2.18/package/ -sct nl -profile http://hl7.nl/fhir/zorgviewer/StructureDefinition/Patient input/examples/Patient-Chipsoft.json
```

Run the FHIR Validator on your example output against the Zorgviewer IG and Dutch(nl) SNOMED CT and produce friendly HTML.
```
> java -jar validator_cli.jar -version 3.0.2 -ig ~/.fhir/packages/hl7.fhir.nl.zorgviewer#dev/package/ -ig ~/.fhir/packages/nictiz.fhir.nl.stu3.zib2017#2.2.18/package/ -sct nl -language nl -html-output validation.html 20240417\ PDFA\ 3.0.38\ NEXUS\ DocumentReference.json 
> open validation.html in your favorite browser
```