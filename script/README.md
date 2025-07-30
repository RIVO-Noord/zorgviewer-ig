This script needs newer version (>=14) of node. See https://www.linode.com/docs/guides/install-nodejs-on-ubuntu-22-04/

```
@> apt update
@> apt install curl
@> curl -sL https://deb.nodesource.com/setup_23.x | bash -
@> apt install nodejs
@> npm install --save fhirpath
```

Known limitations:
* Add code to handle resolve in Bundles; currently looks for single resource examples