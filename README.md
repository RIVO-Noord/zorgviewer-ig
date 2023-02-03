# Zorgviewer-IG
[Zorgviewer FHIR Implementation Guide](https://vdzel.home.xs4all.nl/zorgviewer-ig/)

# Validate resources
```
(optional) > curl -L https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar -o validator_cli.jar
> java -jar validator_cli.jar -version current input/resources -ig input/resources
```

# To build the IG (need minimal version 1.2.31 dd 1-feb-2023 ivm zib2017 package fix)
```
(optional)> curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o publisher.jar
> java -jar publisher.jar -ig ig.ini
```

-----------------
* http://hl7.org/fhir/STU3/
* http://hl7.org/fhir/smart-app-launch/1.0.0/
* http://build.fhir.org/ig/FHIR/ig-guidance/
  * N.B. Basis van de IG tooling is R4. Dus ImplementationGuide gebruikt die. IG Tooling ondersteund STU3, R4, R5 voor content. 
* PlantUML.com voor sequence diagrams
  * https://plantuml.com/sequence-diagram
  * heel veel reclame dus beter editen via https://sequencediagram.org/
    * N.B. seq diagram ondersteund box niet, daar heet het participantgroup
* Markdown
  * https://www.markdownguide.org/basic-syntax/
  * https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax 
-----------------
Add to zorgviewer-ig.json, dependeson smart not working now??? See issue in FHIR chat: https://chat.fhir.org/#narrow/stream/179166-implementers/topic/SMART-on-FHIR.20package.201.2E0.2E0.20is.20STU3.20or.20R4.3F
      {
        "uri": "https://simplifier.net/packages/hl7.fhir.uv.smart-app-launch/1.0.0",
        "packageId": "hl7.fhir.uv.smart-app-launch",
        "version": "1.0.0"
      }
