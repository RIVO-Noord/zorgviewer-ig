
## Zorgviewer-IG output

* [Snapshot laatste release](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/branches/snapshot/)
* [CI Build](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/)
* [Releases](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/branches/)
* [Web-based editor](https://github.dev/RIVO-Noord/zorgviewer-ig/)

## Validate resources
```
(optional) > curl -L https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar -o validator_cli.jar
> java -jar validator_cli.jar -version current input/resources -ig input/resources
```

## To build the IG (need minimal version 1.2.31 dd 1-feb-2023 ivm zib2017 package fix)
```
(optional)> curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o publisher.jar
> java -jar publisher.jar -ig ig.ini
```

## Werkwijze met git

1. Werken in master
1. Tag als versie klaar voor review (0.M.m-sprintX)
1. Na review publish via snapshot branch
```
git clone https://github.com/RIVO-Noord/zorgviewer-ig.git
git checkout snapshot
git merge 0.2.0-sprint3
```
1. Zet release label in zorgviewer-ig.json op "sprintX".
```
vi input/zorgviewer-ig.json
git commit -a
git push
```

### Trigger FHIR auto-ig builder
```
curl -X POST  "https://us-central1-fhir-org-starter-project.cloudfunctions.net/ig-commit-trigger" \
  -H "Content-type: application/json" \
  --data '{"ref": "refs/heads/snapshot", "repository": {"full_name": "RIVO-Noord/zorgviewer-ig"}}'
```

## Some usefull resources

* Base standards
  * http://hl7.org/fhir/STU3/
  * http://hl7.org/fhir/smart-app-launch/1.0.0/
* IG Guidance
  * http://build.fhir.org/ig/FHIR/ig-guidance/
  * N.B. Basis van de IG tooling is R4. Dus ImplementationGuide gebruikt die. IG Tooling ondersteund STU3, R4, R5 voor content.
  * Auto IG Builder: https://github.com/FHIR/auto-ig-builder/blob/master/README.md
  * rivonoord-template/
    * http://build.fhir.org/ig/FHIR/ig-guidance/template.html
  * input/images-source/*.plantuml
    * https://plantuml.com/
    * Documentatie: https://crashedmind.github.io/PlantUMLHitchhikersGuide/
    * https://www.plantuml.com/plantuml/uml/
  * input/*/*.md
    * https://www.markdownguide.org/basic-syntax/
    * https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax 

## Known issues

### dependsOn smart-on-fhir issue

Add to zorgviewer-ig.json, dependesOn smart not working now??? See issue in FHIR chat: https://chat.fhir.org/#narrow/stream/179166-implementers/topic/SMART-on-FHIR.20package.201.2E0.2E0.20is.20STU3.20or.20R4.3F
      {
        "uri": "https://simplifier.net/packages/hl7.fhir.uv.smart-app-launch/1.0.0",
        "packageId": "hl7.fhir.uv.smart-app-launch",
        "version": "1.0.0"
      }

### dependsOn hl7.terminology.r3#5.0.0 issue

See issue in FHIR chat: https://chat.fhir.org/#narrow/stream/179252-IG-creation/topic/ValueSet-appropriateness-score.2Ejson.3A.20Unknown.20IdentifierUse.20c

Exception generating resource /home/michael/eclipse-workspace/zorgviewer-ig/input/resources/ValueSet-ACPTreatmentCodelist::ValueSet/ACPTreatmentCodelist: Error loading /home/michael/.fhir/packages/hl7.terminology.r3#5.0.0/package/CodeSystem-appropriateness-score.json: Unknown IdentifierUse code '?' (01:19.152)
org.hl7.fhir.exceptions.FHIRException: Error loading /home/michael/.fhir/packages/hl7.terminology.r3#5.0.0/package/CodeSystem-appropriateness-score.json: Unknown IdentifierUse code '?'

I worked around this Exception by replacing use="?" with use="official" in the local cache (hl7.terminology.r3#5.0.0):
1. hl7.terminology.r3#5.0.0/package/CodeSystem-appropriateness-score.json
2. hl7.terminology.r3#5.0.0/package/ValueSet-clinical-discharge-disposition.json
3. hl7.terminology.r3#5.0.0/package/ValueSet-appropriateness-score.json

Changing the dependsOn from (auto) hl7.terminology.r3#5.0.0 to hl7.terminology.r3#4.0.0 also seems to do the job.