This scripts need version (>=14) of node. See https://www.linode.com/docs/guides/install-nodejs-on-ubuntu-22-04/

Setup:
```
@> apt update
@> apt install curl
@> curl -sL https://deb.nodesource.com/setup_23.x | bash -
@> apt install nodejs
@> npm install --save fhirpath
@> npm install @google/generative-ai
```

## updateviewmd.js

```
@> cd script
@> node updateviewmd.js
```

## changelog.js

```
@> cd script
@> export GEMINI_API_KEY=...
@> node changelog.js
```
