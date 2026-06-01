#!/usr/bin/env node
/**
 * Pre-release script for Zorgviewer IG — "Afhechten van een Release"
 *
 * Implements the file update steps from README.md:
 *   1. input/pagecontent/changes.md
 *   2. input/images/package-feed.xml
 *   3. fhir.hl7.nl/package-list.json
 *   4. publication-request.json
 *
 * Usage: node pre-release.js <version>
 * Example: node pre-release.js 1.24.0
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

// ── Semver helpers ───────────────────────────────────────────────────

function parseSemver(v) {
  const m = v.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] || null };
}

/** Returns true when a is strictly greater than b (semver). */
function semverGt(a, b) {
  const va = parseSemver(a);
  const vb = parseSemver(b);
  if (!va) throw new Error(`Invalid semver: ${a}`);
  if (!vb) throw new Error(`Invalid semver: ${b}`);
  if (va.major !== vb.major) return va.major > vb.major;
  if (va.minor !== vb.minor) return va.minor > vb.minor;
  if (va.patch !== vb.patch) return va.patch > vb.patch;
  // 1.0.0 > 1.0.0-alpha (release beats pre-release)
  if (!va.pre && vb.pre) return true;
  if (va.pre && !vb.pre) return false;
  // both have pre-release: lexicographic
  if (va.pre && vb.pre) return va.pre > vb.pre;
  return false; // equal
}

// ── Date formatting helpers ──────────────────────────────────────────

function toRFC2822(d) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const pad = (n) => String(n).padStart(2, "0");
  return `${days[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${mons[d.getUTCMonth()]} ${d.getUTCFullYear()} 11:00:00 +0000`;
}

function toISO(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function toDutch(d) {
  const mons = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  return `${d.getUTCDate()}-${mons[d.getUTCMonth()]}-${d.getUTCFullYear()}`;
}

// ── Main ─────────────────────────────────────────────────────────────

const newVersion = process.argv[2];
if (!newVersion) {
  console.error("Usage: node pre-release.js <version>");
  console.error("Example: node pre-release.js 1.24.0");
  process.exit(1);
}

if (!parseSemver(newVersion)) {
  console.error(`ERROR: "${newVersion}" is not a valid semver version (expected e.g. 1.24.0)`);
  process.exit(1);
}

console.log("Pre-release: preparing version %s\n", newVersion);

// ── 1. Check for uncommitted changes ─────────────────────────────────

const gitStatus = execSync("git status --porcelain", { cwd: ROOT }).toString().trim();
if (gitStatus) {
  console.error("ERROR: Branch has uncommitted changes:\n");
  console.error(gitStatus);
  console.error("\nCommit or stash your changes before running pre-release.");
  process.exit(1);
}
console.log("✓ Working directory is clean");

// ── 2. Collect versions from the listed files ────────────────────────

const versions = {};

// input/zorgviewer-ig.json
const igPath = path.join(ROOT, "input/zorgviewer-ig.json");
const igContent = fs.readFileSync(igPath, "utf8");
const igJson = JSON.parse(igContent);
versions["input/zorgviewer-ig.json"] = igJson.version;

// publication-request.json
const pubReqPath = path.join(ROOT, "publication-request.json");
const pubReq = JSON.parse(fs.readFileSync(pubReqPath, "utf8"));
versions["publication-request.json"] = pubReq.version;

// fhir.hl7.nl/package-list.json  (latest non-ci-build entry)
const pkgListPath = path.join(ROOT, "fhir.hl7.nl/package-list.json");
const pkgList = JSON.parse(fs.readFileSync(pkgListPath, "utf8"));
const latestPkg = pkgList.list.find((e) => e.status !== "ci-build");
if (latestPkg) {
  versions["fhir.hl7.nl/package-list.json"] = latestPkg.version;
}

// input/images/package-feed.xml  (version from <title>)
const feedPath = path.join(ROOT, "input/images/package-feed.xml");
const feedXml = fs.readFileSync(feedPath, "utf8");
const feedMatch = feedXml.match(/hl7\.fhir\.nl\.zorgviewer#([\d]+\.[\d]+\.[\d]+(?:-[\w.]+)?)/);
if (feedMatch) {
  versions["input/images/package-feed.xml"] = feedMatch[1];
}

console.log("\nVersions found:");
for (const [file, ver] of Object.entries(versions)) {
  console.log("  %s: %s", file, ver);
}

// ── 3. Check version consistency ─────────────────────────────────────

const unique = [...new Set(Object.values(versions))];
if (unique.length > 1) {
  console.error("\nERROR: Versions are ambiguous! All version files should agree before running pre-release.");
  console.error("Found: %s", unique.join(", "));
  process.exit(1);
}

const currentVersion = unique[0];
console.log("\n✓ All versions consistent: %s", currentVersion);

// ── 4. Validate new version is higher ────────────────────────────────

if (!semverGt(newVersion, currentVersion)) {
  console.error("ERROR: New version %s must be higher than current version %s", newVersion, currentVersion);
  process.exit(1);
}
console.log("✓ %s > %s\n", newVersion, currentVersion);

// ── 5. Update files ──────────────────────────────────────────────────

const now = new Date();
const dateRFC = toRFC2822(now);
const dateISO = toISO(now);
const dateDutch = toDutch(now);

console.log("Updating files for %s (%s):\n", newVersion, dateISO);

// 5a. input/zorgviewer-ig.json — bump version
//     Only replace the top-level "version" (line ~6), not dependsOn versions.
//     We do a targeted replacement of the exact current version value.
igJson.version = newVersion;
// Also update version-comparison-master parameter to point at the current (now previous) version.
const params = igJson.definition && igJson.definition.parameter;
if (params) {
  const vcm = params.find((p) => p.code === "version-comparison-master");
  if (vcm) {
    vcm.value = currentVersion;
    console.log("  ✓ input/zorgviewer-ig.json — version-comparison-master → %s", currentVersion);
  }
}
// Write back by doing a precise text replacement to preserve formatting.
// Replace only the first "version" value in the file.
const updatedIG = igContent.replace(
  /("version":\s*)"[^"]+"/,
  `$1"${newVersion}"`
);
// Also update version-comparison-master value
const updatedIG2 = updatedIG.replace(
  /("code":\s*"version-comparison-master"[\s\S]*?"value":\s*)"[^"]+"/,
  `$1"${currentVersion}"`
);
fs.writeFileSync(igPath, updatedIG2);
console.log("  ✓ input/zorgviewer-ig.json — version → %s", newVersion);

// 5b. publication-request.json — version, path
pubReq.version = newVersion;
pubReq.path = `http://fhir.hl7.nl/zorgviewer/${newVersion}`;
fs.writeFileSync(pubReqPath, JSON.stringify(pubReq, null, 4) + "\n");
console.log("  ✓ publication-request.json — version → %s", newVersion);

// 5c. fhir.hl7.nl/package-list.json — insert new release entry after ci-build
const newPkgEntry = {
  version: newVersion,
  path: "https://implementatiegids.zorgviewer.nl",
  status: "ballot",
  sequence: "Releases",
  fhirversion: "3.0.2",
  date: dateISO,
  desc: pubReq.desc || "This publication is used to implement the Zorgviewer",
  descmd: pubReq.desc || "This publication is used to implement the Zorgviewer",
};
const ciIdx = pkgList.list.findIndex((e) => e.status === "ci-build");
pkgList.list.splice(ciIdx + 1, 0, newPkgEntry);
fs.writeFileSync(pkgListPath, JSON.stringify(pkgList, null, 2) + "\n");
console.log("  ✓ fhir.hl7.nl/package-list.json — added entry %s (%s)", newVersion, dateISO);

// 5d. input/images/package-feed.xml — version in title, dates
let updatedFeed = feedXml
  .replace(
    /hl7\.fhir\.nl\.zorgviewer#[\d.]+(?:-[\w.]+)?/,
    `hl7.fhir.nl.zorgviewer#${newVersion}`
  )
  .replace(
    /(<lastBuildDate>).*?(<\/lastBuildDate>)/,
    `$1${dateRFC}$2`
  )
  .replace(
    /(<pubDate>).*?(<\/pubDate>)/g,
    `$1${dateRFC}$2`
  );
fs.writeFileSync(feedPath, updatedFeed);
console.log("  ✓ input/images/package-feed.xml — version → %s, dates → %s", newVersion, dateISO);

// 5e. input/pagecontent/changes.md — update comparison link, finalize current row
const changesPath = path.join(ROOT, "input/pagecontent/changes.md");
let changes = fs.readFileSync(changesPath, "utf8");

// Update the resource comparison link to point at the (now previous) version
changes = changes.replace(
  /\[Resource comparison with version v[\d.]+(?:-[\w.]+)?\]\(comparison-v[\d.]+(?:-[\w.]+)?\/index\.html\)/,
  `[Resource comparison with version v${currentVersion}](comparison-v${currentVersion}/index.html)`
);

// Finalize the "|...|current|..." row and insert a new current row.
// Current state: |1.24.0|current|[Detail wijzigingen](.../compare/1.23.0...HEAD)|
// Target state:
//   |{newVersion}|current|[Detail wijzigingen](.../compare/{oldRowVersion}...HEAD)|
//   |{oldRowVersion}|{date}|[Detail wijzigingen](.../compare/{fromVersion}...{oldRowVersion})|
const changesRowRe =
  /\|([\d.]+(?:-[\w.]+)?)\|current\|(\[Detail wijzigingen\]\(https:\/\/github\.com\/RIVO-Noord\/zorgviewer-ig\/compare\/)([^\s)]+?)\.\.\.HEAD\)\|/;
const rowMatch = changes.match(changesRowRe);
if (rowMatch) {
  const oldRowVersion = rowMatch[1];
  const linkPrefix = rowMatch[2];
  const fromVersion = rowMatch[3];
  const newCurrentRow = `|${newVersion}|current|${linkPrefix}${oldRowVersion}...HEAD)|`;
  const finalizedRow = `|${oldRowVersion}|${dateDutch}|${linkPrefix}${fromVersion}...${oldRowVersion})|`;
  changes = changes.replace(changesRowRe, `${newCurrentRow}\n${finalizedRow}`);
  console.log("  ✓ input/pagecontent/changes.md — finalized %s, added %s as current", oldRowVersion, newVersion);
} else {
  console.log("  ⚠ input/pagecontent/changes.md — could not find |...|current|...| row, skipping table update");
}

fs.writeFileSync(changesPath, changes);

// ── Done ─────────────────────────────────────────────────────────────

console.log("\nPre-release %s complete!\n", newVersion);
console.log("Next steps:");
console.log("  1. Review the changes and optionally add change bullets to input/pagecontent/changes.md");
console.log("  2. (Optional) Generate changelog: cd script && node changelog.js");
console.log('  3. git commit -a -m "afhechten release %s" && git push', newVersion);
console.log('  4. Create GitHub release with tag "%s"', newVersion);
