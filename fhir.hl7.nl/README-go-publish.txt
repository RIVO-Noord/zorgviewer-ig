
https://www.argentixinfo.com/ig/howtopub/setup.html

docker run --rm -it -v $(pwd):/app hl7fhir/ig-publisher-base:latest

H2. setup

1.
cd /app
mkdir src
cd src
git clone --depth=1 https://github.com/HL7/fhir-ig-history-template.git ig-history
git clone --depth=1 https://github.com/HL7/fhir-web-templates.git fhir-web-templates
git clone --depth=1 https://github.com/FHIR/ig-registry.git ig-registry

2.
cd /app
mkdir publication
cd publication
mkdir templates webroot
cp ../fhir-web-templates/*template* templates

cd /app/src
rm -rf fhir-web-templates

4.
copy HL7nl logo into /app/src/publication/webroots
edit templates/preamble.template and change HL7 int logo to HL7 nl logo
     <img height="50" alt="visit the hl7 nl website" src="../HL7nl_Logo.png"/>
edit templates/postamble.template
      <span id="ig-footer">[%id%] </span> <a style="color: #81BEF7" href="http://hl7.nl/">HL7 Netherlands</a> |

5.
/app/src/publication/webroot/publish-setup.json

6.
/app/src/publication/webroot/publication-feed.xml

7.

8.
cd /app/src
curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o publisher.jar

9.
cd /app/src/publication
java -jar ../publisher.jar -generate-package-registry webroot
(also done in go-publish)

10.
skip

11.
skip

------------
H3.1 go-publish (per IG va.aders)

1.
cd /app/src
git clone --depth=1 -b 1.10.0-sprint48 https://github.com/RIVO-Noord/zorgviewer-ig

2.
skip

3.
cd /app/src/zorgviewer-ig
id -> hl7.fhir.nl.zorgviewer
canonical -> http://fhir.hl7.nl/zorgviewer
release-label "sprint48"
use that in step 5.

4.
cd /app/src/zorgviewer-ig
_updatePublisher.sh

5. 
create /app/src/zorgviewer-ig/publication-request.json

6.
cd /app/src/zorgviewer-ig
_genonce.sh


H3.2 publication
1.
...

2.
cd /app/src
curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o publisher.jar

3.
cd /app/src/publication
java -jar ../publisher.jar -go-publish \
   -source    /app/src/zorgviewer-ig \
   -web       /app/src/publication/webroot \
   -history   /app/src/ig-history \
   -registry  /app/src/ig-registry/fhir-ig-list.json \
   -temp      /app/src/publication/temp \
   -templates /app/src/publication/templates

4.
cd /app/src/publication/webroot
jekyll serve # werkt niet :-( use local
http-server -p 4000 webroot
----
Add new sprint release (kan pas vanaf 1.10.0-sprint48 ivm canonical change!)

cd /app/src
rm -rf zorgviewer-ig
git clone --depth=1 -b 1.11.0-sprint49 https://github.com/RIVO-Noord/zorgviewer-ig
cd /app/src/zorgviewer-ig
// edit release "sprint47" input/zorgviewer-ig.json
cp /app/src/publication-request.json
// edit publication-request.json with 1.11.0 and sprint48 
_genonce.sh
cd /app/src/publication
java -jar ../publisher.jar -go-publish    -source    /app/src/zorgviewer-ig    -web       /app/src/publication/webroot    -history   /app/src/ig-history    -registry  /app/src/ig-registry/fhir-ig-list.json    -temp      /app/src/publication/temp    -templates /app/src/publication/templates

----
Publish webroot to fhir.hl7.nl

cd /app/src/publication/webroot
> sftp fhirhl7@fhir.hl7.nl
// Wat is het WW???
@> cd WWW/ehrsfm-fhir-r5
@> put -r *