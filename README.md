# Zorgviewer-IG
[Zorgviewer FHIR Implementation Guide](https://vdzel.home.xs4all.nl/zorgviewer-ig/)

# Validate resources
```
(optional) > curl -L https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar -o validator_cli.jar
> java -jar validator_cli.jar -version current input/resources -ig input/resources
```

# To build the IG
```
(optional)> curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o publisher.jar
> java -jar publisher.jar -ig ig.ini
```

-----------------
N.B. IG tooling is R4! Dus ook ImplementationGuide.json
* http://hl7.org/fhir/STU3/
* http://hl7.org/fhir/smart-app-launch/1.0.0/
* http://build.fhir.org/ig/FHIR/ig-guidance/
* PlantUML.com voor sequence diagrams, heel veel reklame dus beter editen via https://sequencediagram.org/
* https://www.markdownguide.org/basic-syntax/

Add to zorgviewer-ig.json, not working now??? See issue in FHIR chat
      {
        "uri": "https://simplifier.net/packages/hl7.fhir.uv.smart-app-launch/1.0.0",
        "packageId": "hl7.fhir.uv.smart-app-launch",
        "version": "1.0.0"
      }