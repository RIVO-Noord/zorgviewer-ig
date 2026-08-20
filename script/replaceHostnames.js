// replaceHostnames.js
// This script walks through all JSON files in the "input/examples" directory
// and replaces the hostname part of absolute URLs found in the following JSON
// elements:
//   * link.url
//   * entry.fullUrl
//   * any reference field (e.g., reference.reference) that contains an absolute URL
//
// The hostname (including the scheme) is stripped, leaving only the path and query
// part of the URL. For example:
//   "https://example.com/fhir/Patient/1" → "/fhir/Patient/1"
//
// Usage: `node replaceHostnames.js`

const fs = require('fs');
const path = require('path');

// Directory containing the FHIR example JSON files
const EXAMPLES_DIR = path.resolve(__dirname, '../input/examples');

/**
 * Recursively collect all .json files under a directory.
 * @param {string} dir
 * @returns {string[]} array of absolute file paths
 */
function collectJsonFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * // Replace the hostname (preserving scheme) with "example.org".
// If the string is not a valid absolute URL, it is returned unchanged.
/**
 * @param {string} url
 * @returns {string}
 */
function replaceHostname(url) {
  try {
    const parsed = new URL(url);
    // Use the same protocol and set hostname to example.org
    return `${parsed.protocol}//example.org${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch (e) {
    // Not a valid URL – return original value.
    return url;
  }
}

/**
 * Deeply walk an object and replace matching fields.
 * @param {*} obj
 */
function replaceInObject(obj, path = []) {
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => replaceInObject(item, [...path, idx]));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      // helper to check if a name appears in the current path
      const hasAncestor = (name) => path.includes(name);
      // link.url (any ancestor named 'link')
      if (key === 'url' && hasAncestor('link') && typeof value === 'string' && /^(http|https):\/\//i.test(value)) {
        obj[key] = replaceHostname(value);
        continue;
      }
      // entry.fullUrl (any ancestor named 'entry')
      if (key === 'fullUrl' && hasAncestor('entry') && typeof value === 'string' && /^(http|https):\/\//i.test(value)) {
        obj[key] = replaceHostname(value);
        continue;
      }
      // reference fields anywhere
      if (key === 'reference' && typeof value === 'string' && /^(http|https):\/\//i.test(value)) {
        obj[key] = replaceHostname(value);
        continue;
      }
      // Recurse deeper for objects/arrays
      if (typeof value === 'object' && value !== null) {
        replaceInObject(value, [...path, key]);
      }
    }
  }
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to parse JSON in ${filePath}: ${e.message}`);
    return;
  }
  replaceInObject(data);
  const updated = JSON.stringify(data, null, 4);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`Processed ${filePath}`);
}

function main() {
  if (!fs.existsSync(EXAMPLES_DIR)) {
    console.error(`Examples directory does not exist: ${EXAMPLES_DIR}`);
    process.exit(1);
  }
  const files = collectJsonFiles(EXAMPLES_DIR);
  if (files.length === 0) {
    console.log('No JSON files found in the examples directory.');
    return;
  }
  files.forEach(processFile);
}

main();
