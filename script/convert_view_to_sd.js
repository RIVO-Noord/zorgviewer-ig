// convert_view_to_sd.js
// Node.js script that converts ViewDefinition JSON files (in /app/input/images)
// to minimal StructureDefinition JSON files (in /app/input/gensd).
// It extracts the resource type from select.foreach (FHIRPath containing "resourceType=")
// and gathers element paths from select.column.path. Each element gets only
// the `path` and a generic `type` of "string".

const fs = require('fs');
const path = require('path');
// FHIRPath parsing library
const fhirpath = require('fhirpath');

const INPUT_DIR = '/app/input/images';
const OUTPUT_DIR = '/app/temp/gensd';
const VIEW_PREFIX = 'ViewDefinition';
const SD_PREFIX = 'StructureDefinition';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract the resource type from a FHIRPath expression that contains
 * "resourceType=...". Supports several quoting styles.
 * @param {string} fhirPath
 * @returns {string}
 */
function extractResourceType(fhirPath) {
  if (!fhirPath) return 'Unknown';
  const patterns = [
    /resourceType\s*=\s*'([^']+)'/,
    /resourceType\s*=\s*"([^"]+)"/,
    /resourceType\s*=\s*([A-Za-z]+)/,
  ];
  for (const pat of patterns) {
    const m = fhirPath.match(pat);
    if (m) return m[1];
  }
  console.warn(`[WARN] Could not find resourceType in foreach: ${fhirPath}`);
  return 'Unknown';
}

// Helper to extract string literal from AST node
function extractStringLiteral(node) {
  if (!node) return null;
  if (node.type === 'StringLiteral') {
    return node.text.replace(/^['"]|['"]$/g, '');
  }
  if (node.children) {
    for (const child of node.children) {
      const val = extractStringLiteral(child);
      if (val) return val;
    }
  }
  return null;
}

// Parse a FHIRPath string and return all element sub‑paths used with potential profile URLs.
function parseFhirPath(fp) {
  if (!fp) return [];
  try {
    const ast = fhirpath.parse(fp);

    function extractFromAst(node) {
      if (!node) return { main: [], branch: [] };
      const type = node.type;

      if (type === 'EntireExpression') {
        return extractFromAst(node.children?.[0]);
      }

      if (type === 'UnionExpression') {
        let main = [];
        let branch = [];
        for (const child of (node.children || [])) {
          const res = extractFromAst(child);
          main = main.concat(res.main);
          branch = branch.concat(res.branch);
        }
        return { main, branch };
      }

      if (type === 'InvocationExpression') {
        const left = extractFromAst(node.children?.[0]);
        const right = extractFromAst(node.children?.[1]);

        let main = [];
        let branch = [...left.branch, ...right.branch];

        if (!left.main.length) {
          main = right.main;
        } else if (!right.main.length) {
          main = left.main;
        } else {
          for (const lp of left.main) {
            for (const rp of right.main) {
              main.push([...lp, ...rp]);
            }
          }
        }
        return { main, branch };
      }

      if (type === 'TermExpression' || type === 'InvocationTerm' || type === 'MemberInvocation') {
        let main = [];
        let branch = [];
        for (const child of (node.children || [])) {
          const res = extractFromAst(child);
          main = main.concat(res.main);
          branch = branch.concat(res.branch);
        }
        return { main, branch };
      }

      if (type === 'Identifier') {
        return { main: [ [{ name: node.text }] ], branch: [] };
      }

      if (type === 'FunctionInvocation') {
        const functn = node.children?.find(c => c.type === 'Functn');
        const ident = functn?.children?.find(c => c.type === 'Identifier');
        const funcName = ident ? ident.text : '';

        let branch = [];
        if (funcName === 'extension') {
          const paramList = functn?.children?.find(c => c.type === 'ParamList');
          const profileUrl = extractStringLiteral(paramList);
          return {
            main: [ [{ name: 'extension', profile: profileUrl || null }] ],
            branch
          };
        }

        const paramList = functn?.children?.find(c => c.type === 'ParamList');
        if (paramList) {
          const pRes = extractFromAst(paramList);
          branch = branch.concat(pRes.main, pRes.branch);
        }

        return { main: [], branch };
      }

      if (node.children) {
        let main = [];
        let branch = [];
        for (const child of node.children) {
          const res = extractFromAst(child);
          main = main.concat(res.main);
          branch = branch.concat(res.branch);
        }
        return { main, branch };
      }

      return { main: [], branch: [] };
    }

    const { main, branch } = extractFromAst(ast);
    const elementMap = new Map(); // path -> { path, profiles: Set }

    function addElement(pathStr, profile) {
      if (!elementMap.has(pathStr)) {
        elementMap.set(pathStr, { path: pathStr, profiles: new Set() });
      }
      if (profile) {
        elementMap.get(pathStr).profiles.add(profile);
      }
    }

    for (const chain of main) {
      let currentPath = '';
      for (const seg of chain) {
        currentPath = currentPath ? currentPath + '.' + seg.name : seg.name;
        addElement(currentPath, seg.profile);
      }
    }

    if (main.length === 0) {
      for (const b of branch) {
        const parts = b.split('.').filter(Boolean);
        for (let i = 1; i <= parts.length; i++) {
          addElement(parts.slice(0, i).join('.'), null);
        }
      }
    }

    return Array.from(elementMap.values()).map(e => ({
      path: e.path,
      profiles: Array.from(e.profiles)
    }));
  } catch (e) {
    // Fallback to simple split-based parser
    const cleaned = fp.replace(/\(.*?\)/g, '').replace(/"[^\\"]*"|'[^']*'/g, '');
    const parts = cleaned.split('.').map(p => p.trim()).filter(Boolean);
    const subpaths = [];
    for (let i = 0; i < parts.length; i++) {
      subpaths.push({ path: parts.slice(0, i + 1).join('.'), profiles: [] });
    }
    return subpaths;
  }
}

/**
 * Build a minimal StructureDefinition object.
 * @param {string} name Base name without prefix/extension
 * @param {string} resourceType FHIR resource type
 * @param {Array<{path: string, profiles: string[]}>} elementDefs List of element definitions
 * @returns {object}
 */
function buildStructureDefinition(name, resourceType, elementDefs) {
  const sd = {
    resourceType: 'StructureDefinition',
    url: `http://example.org/fhir/StructureDefinition/${name}`,
    name: name,
    status: 'draft',
    kind: 'resource',
    abstract: false,
    type: resourceType,
    differential: {
      element: []
    }
  };
  elementDefs.forEach(elem => {
    const trimmed = elem.path.trim();
    const elementObj = {
      id: trimmed,
      path: trimmed
    };

    // Only add element.type when it is an extension, with type "Extension"
    const lastSegment = trimmed.split('.').pop();
    if (lastSegment === 'extension') {
      const typeObj = { code: 'Extension' };
      if (elem.profiles && elem.profiles.length > 0) {
        typeObj.profile = elem.profiles;
      }
      elementObj.type = [typeObj];
    }

    sd.differential.element.push(elementObj);
  });
  return sd;
}

/**
 * Process a single ViewDefinition file.
 * @param {string} filePath Absolute path to the ViewDefinition JSON file.
 */
function processFile(filePath) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`[ERROR] Failed to read/parse ${path.basename(filePath)}: ${e.message}`);
    return;
  }

  let resourceType = 'Unknown';
  let columnPaths = [];
  const selects = data.select;
  if (Array.isArray(selects)) {
    for (const sel of selects) {
      // Determine resource type from the first meaningful foreach
      if (resourceType === 'Unknown') {
        const ft = sel?.forEach || '';
        const rt = extractResourceType(ft);
        if (rt && rt !== 'Unknown') resourceType = rt;
      }
      const column = sel?.column;
      if (Array.isArray(column)) {
        // column is an array of column objects
        for (const col of column) {
          const p = col?.path;
          if (Array.isArray(p)) {
            columnPaths.push(...p);
          } else if (p) {
            columnPaths.push(p);
          }
        }
      } else {
        // column is a single object
        const p = column?.path;
        if (Array.isArray(p)) {
          columnPaths.push(...p);
        } else if (p) {
          columnPaths.push(p);
        }
      }
    }
  } else if (selects) {
    const foreachPath = selects?.foreach || '';
    resourceType = extractResourceType(foreachPath);
    const column = selects?.column;
    if (Array.isArray(column)) {
      for (const col of column) {
        const p = col?.path;
        if (Array.isArray(p)) {
          columnPaths.push(...p);
        } else if (p) {
          columnPaths.push(p);
        }
      }
    } else {
      const p = column?.path;
      if (Array.isArray(p)) {
        columnPaths = p;
      } else if (p) {
        columnPaths = [p];
      }
    }
  }

  // Expand any FHIRPath expressions into individual element sub‑paths with profiles
  let expandedElements = [];
  columnPaths.forEach(fp => {
    expandedElements.push(...parseFhirPath(fp));
  });

  // Remove duplicates while preserving order and merging profiles
  const elementMap = new Map(); // path -> { path, profiles: Set }
  const orderedKeys = [];

  expandedElements.forEach(item => {
    const p = item.path;
    if (!elementMap.has(p)) {
      elementMap.set(p, { path: p, profiles: new Set(item.profiles || []) });
      orderedKeys.push(p);
    } else {
      const existing = elementMap.get(p);
      (item.profiles || []).forEach(prof => existing.profiles.add(prof));
    }
  });

  const finalElements = orderedKeys.map(k => ({
    path: k,
    profiles: Array.from(elementMap.get(k).profiles)
  }));

  const baseName = path.basename(filePath, '.json').replace(`${VIEW_PREFIX}-`, '');
  const sdObject = buildStructureDefinition(baseName, resourceType, finalElements);
  const outFile = path.join(OUTPUT_DIR, `${SD_PREFIX}-${baseName}.json`);
  try {
    fs.writeFileSync(outFile, JSON.stringify(sdObject, null, 2), 'utf8');
    console.log(`[INFO] ${path.basename(filePath)} -> ${path.basename(outFile)}`);
  } catch (e) {
    console.error(`[ERROR] Writing ${outFile} failed: ${e.message}`);
  }
}

function main() {
  let files;
  try {
    files = fs.readdirSync(INPUT_DIR).filter(f => f.startsWith(VIEW_PREFIX) && f.endsWith('.json'));
  } catch (e) {
    console.error(`[ERROR] Cannot read input directory ${INPUT_DIR}: ${e.message}`);
    return;
  }
  if (files.length === 0) {
    console.info('[INFO] No ViewDefinition JSON files found.');
    return;
  }
  files.forEach(f => processFile(path.join(INPUT_DIR, f)));
}

if (require.main === module) {
  main();
}
