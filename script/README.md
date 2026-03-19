These scripts need version (>=14) of node. See https://www.linode.com/docs/guides/install-nodejs-on-ubuntu-22-04/

Setup:
```
@> apt update
@> apt install curl
@> curl -sL https://deb.nodesource.com/setup_23.x | bash -
@> apt install nodejs
@> npm install
```

## Available Scripts

- `changelog.js`: Generates a changelog using the Gemini API based on git history from the last 3 weeks.
- `check-rolcode.js`: Validates role codes and concept maps within the vocabulary directory.
- `dosage.js`: Library to convert FHIR Dosage resources into human-readable strings (supports Dutch and English).
- `updateigex.js`: Synchronizes the Implementation Guide (`zorgviewer-ig.json`) with example resources from the examples directory.
- `updateviewmd.js`: Generates Markdown documentation for views based on FHIR examples and ViewDefinitions.

## Usage

### updateviewmd.js

```
@> cd script
@> node updateviewmd.js
```

### changelog.js

```
@> cd script
@> export GEMINI_API_KEY=...
@> node changelog.js
```

### Other Scripts

You can run the other scripts using `npm run <script-name>`:
- `npm run check-rolcode`
- `npm run updateigex`
- `npm run dosage`
