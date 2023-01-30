### Testing

#### Sandboxes

* [Official HL7 Logica Sandbox](https://www.logicahealth.org/)
* [Epic Hyperspace Simulator](https://appmarket.epic.com/HyperspaceSimulator)

#### Test Tooling

* [Crudible](https://projectcrucible.org​) - API testen obv Implementatie Gids 

#### Test Data

* [Nictiz-STU3-Zib2017](https://github.com/Nictiz/Nictiz-STU3-Zib2017/tree/stable-2.x/Examples)
* [Synthea](https://synthetichealth.github.io/synthea/) - Genereren van test data ​

#### FHIR Validator

Get the latest FHIR Validator.
```
> curl -L https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar -o validator_cli.jar
```

Run the FHIR Validator on the example JFictief Patient.
```
> java -jar validator_cli.jar -version 3.0.2 -ig input/resources/ input/examples/Patient-JFictief.json
```