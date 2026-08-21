#!/usr/bin/env node
// The contract between public/admin/config.yml and content/**.
//
// WHY THIS EXISTS
// ---------------
// Sveltia builds the document it saves from the fields declared in its config.
// A front-matter key with no configured field is therefore not merely invisible
// in the editor — opening the entry and pressing Save can drop it. For a guide
// that would mean losing a source, a publication date, or the Article object
// this migration preserved, with no error anywhere: the build would simply
// compile a smaller page.
//
// So two things are asserted here, and both are mechanical:
//
//   1. CONTRACT — every key persisted anywhere under content/ has a configured
//      field (visible or hidden), and every configured field maps to a key its
//      build accepts. This is the durable guard: it fires the moment someone
//      adds a front-matter key without adding the field.
//
//   2. ROUND TRIP — every real document survives being serialized the way the
//      vendored Sveltia bundle serializes, re-parsed by this repository's own
//      parser, and recompiled. Optional keys that are absent must stay absent:
//      a save must not introduce `howto: null` or empty legacy Article keys.
//
// ON THE YAML DEPENDENCY
// ----------------------
// The vendored bundle formats front matter with the `yaml` package, called as:
//
//   stringify(value, { indent: 2, indentSeq: true, lineWidth: 0,
//                      defaultKeyType: "PLAIN", defaultStringType: "PLAIN",
//                      singleQuote: true })
//
// (read out of public/admin/sveltia-cms.js — the `J3` helper — and pinned in
// SVELTIA_YAML_OPTIONS below). The bundle is minified and carries no version
// marker, so the exact `yaml` build it embeds is not recoverable; this repo
// pins yaml 2.9.0, whose v2 emitter accepts every one of those options. The
// assertions below are therefore behavioural — parse → serialize → parse is
// stable, and the compiled output does not move — rather than a claim of
// byte-identity with an unknown build. A future bundle upgrade should re-run
// this test and re-read `J3`.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringify } from "yaml";

import { splitDocument, parseFrontMatter } from "./lib/content-markdown.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(root, "public", "admin", "config.yml");
const BUNDLE_PATH = path.join(root, "public", "admin", "sveltia-cms.js");

// Exactly the options the vendored bundle passes to yaml.stringify().
const SVELTIA_YAML_OPTIONS = {
  indent: 2,
  indentSeq: true,
  lineWidth: 0,
  defaultKeyType: "PLAIN",
  defaultStringType: "PLAIN",
  singleQuote: true
};

const COLLECTIONS = [
  {
    name: "blog",
    dir: path.join(root, "content", "blog"),
    // Keys the blog build accepts (scripts/build-blog-content.mjs ALLOWED_KEYS).
    allowed: [
      "title",
      "seo_title",
      "description",
      "summary",
      "date",
      "updated",
      "status",
      "tags",
      "author",
      "related_guides",
      "related_artists",
      "sources"
    ],
    // `author` is a documented front-matter override with no CMS field: the
    // byline is the editorial team by default and an editor has no reason to
    // change it from the browser. It is listed here so the contract check can
    // tell a deliberate omission from an accidental one.
    configOptional: ["author"]
  },
  {
    name: "guides",
    dir: path.join(root, "content", "guides"),
    allowed: [
      "title",
      "h1",
      "description",
      "status",
      "date_published",
      "comparison_providers",
      "sources",
      "howto",
      "legacy_article_headline",
      "legacy_article_description"
    ],
    configOptional: []
  }
];

let failures = 0;
let passed = 0;
function assert(condition, message) {
  if (condition) {
    passed += 1;
    return;
  }
  failures += 1;
  console.error(`FAIL: ${message}`);
}

// ---------------------------------------------------------------------------
// A very small reader for the collection/field shape of config.yml.
//
// Deliberately not a YAML parser: it walks the `collections:` block and records
// each collection's field names, including nested `fields:` under a list or
// object widget. That is all the contract needs, and a narrow reader cannot
// quietly mis-parse the config into a passing result.
// ---------------------------------------------------------------------------
export function collectionFieldNames(configText) {
  const lines = String(configText).split("\n");
  const collections = new Map();
  let current = null;
  let inCollections = false;

  for (const line of lines) {
    if (/^collections:\s*$/.test(line)) {
      inCollections = true;
      continue;
    }
    if (!inCollections) continue;
    if (/^\S/.test(line)) break;

    const collectionStart = line.match(/^ {2}- name:\s*(\S+)\s*$/);
    if (collectionStart) {
      current = { name: collectionStart[1], top: [], all: [] };
      collections.set(current.name, current);
      continue;
    }
    if (!current) continue;

    // `- name: x` / `- { name: x, ... }` at any depth is a field declaration.
    const inlineField = line.match(/^(\s*)- \{\s*name:\s*([A-Za-z0-9_]+)/);
    const blockField = line.match(/^(\s*)- name:\s*([A-Za-z0-9_]+)\s*$/);
    const field = inlineField || blockField;
    if (!field) continue;
    const indent = field[1].length;
    const name = field[2];
    current.all.push(name);
    // Top-level fields of a collection sit at six spaces:
    //   collections: / "  - name:" / "    fields:" / "      - name:"
    if (indent === 6) current.top.push(name);
  }
  return collections;
}

/** Front-matter keys actually persisted in a collection's documents. */
function persistedKeys(dir) {
  const keys = new Map();
  if (!fs.existsSync(dir)) return keys;
  for (const file of fs.readdirSync(dir).filter((entry) => entry.endsWith(".md"))) {
    const { frontMatter } = splitDocument(fs.readFileSync(path.join(dir, file), "utf8"));
    for (const key of Object.keys(frontMatter)) {
      if (!keys.has(key)) keys.set(key, []);
      keys.get(key).push(file);
    }
  }
  return keys;
}

/**
 * Serialize a parsed document the way Sveltia does, then read it back.
 * Mirrors the bundle's own assembly: `---\n<yaml>\n---\n\n<body>\n`.
 */
export function sveltiaRoundTrip(frontMatter, body) {
  const document = `---\n${stringify(frontMatter, SVELTIA_YAML_OPTIONS).trim()}\n---\n\n${body}\n`;
  return { document, parsed: splitDocument(document) };
}

// ---------------------------------------------------------------------------
// 1. The bundle still serializes the way this test assumes
// ---------------------------------------------------------------------------
const bundle = fs.readFileSync(BUNDLE_PATH, "utf8");
assert(
  bundle.includes("lineWidth:0,defaultKeyType:`PLAIN`"),
  "the vendored Sveltia bundle still formats front matter with lineWidth 0 and plain keys (re-read J3 if this fails after a bundle upgrade)"
);
assert(bundle.includes("indentSeq:i"), "the vendored bundle still honours indent_sequences");

// ---------------------------------------------------------------------------
// 2. Contract: persisted keys <-> configured fields
// ---------------------------------------------------------------------------
const configText = fs.readFileSync(CONFIG_PATH, "utf8");
const configured = collectionFieldNames(configText);

for (const collection of COLLECTIONS) {
  const declared = configured.get(collection.name);
  assert(Boolean(declared), `public/admin/config.yml declares a "${collection.name}" collection`);
  if (!declared) continue;

  const topLevel = new Set(declared.top);
  const optional = new Set(collection.configOptional);
  const allowed = new Set(collection.allowed);

  for (const [key, files] of persistedKeys(collection.dir)) {
    assert(
      allowed.has(key),
      `${collection.name}: front-matter key "${key}" (in ${files[0]}) is accepted by the build`
    );
    assert(
      topLevel.has(key) || optional.has(key),
      `${collection.name}: front-matter key "${key}" (in ${files.join(", ")}) has a configured CMS field — without one a Sveltia save can drop it`
    );
  }

  for (const name of declared.top) {
    if (name === "body") continue;
    assert(
      allowed.has(name),
      `${collection.name}: configured field "${name}" maps to a front-matter key the build accepts`
    );
  }
}

// Nested field names must match the keys the builds read, or a save writes a
// well-formed document the compiler cannot use.
const guideFields = configured.get("guides");
if (guideFields) {
  for (const nested of ["name", "publisher", "url", "last_checked", "steps", "text"]) {
    assert(guideFields.all.includes(nested), `guides: nested field "${nested}" is configured`);
  }
}

// ---------------------------------------------------------------------------
// 3. Round trip: every real document, plus the optional-key edge cases
// ---------------------------------------------------------------------------
for (const collection of COLLECTIONS) {
  if (!fs.existsSync(collection.dir)) continue;
  for (const file of fs.readdirSync(collection.dir).filter((entry) => entry.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(collection.dir, file), "utf8");
    const original = splitDocument(raw);
    const { document, parsed } = sveltiaRoundTrip(original.frontMatter, original.body);

    assert(
      JSON.stringify(parsed.frontMatter) === JSON.stringify(original.frontMatter),
      `${collection.name}/${file}: front matter survives a Sveltia-style save unchanged`
    );
    assert(parsed.body === original.body, `${collection.name}/${file}: body survives a Sveltia-style save unchanged`);
    assert(
      JSON.stringify(Object.keys(parsed.frontMatter)) === JSON.stringify(Object.keys(original.frontMatter)),
      `${collection.name}/${file}: key order survives a Sveltia-style save`
    );
    assert(!/:\s*null\s*$/m.test(document), `${collection.name}/${file}: a save writes no explicit nulls`);

    // Second pass: a save of a saved document must be a no-op.
    const again = sveltiaRoundTrip(parsed.frontMatter, parsed.body);
    assert(again.document === document, `${collection.name}/${file}: a second save is byte-identical to the first`);
  }
}

// Optional keys that are absent must stay absent — the specific failure mode
// that would introduce `legacy_article_headline: ''` on 16 guides.
const minimalGuide = {
  title: "A guide",
  h1: "A guide heading",
  description: "A description that is comfortably long enough to clear the fifty character floor.",
  status: "draft",
  sources: [{ name: "N", publisher: "P", url: "https://example.org/a", last_checked: "2026-01-01" }]
};
const minimal = sveltiaRoundTrip(minimalGuide, "Body.\n\n## A\n\nMore.");
for (const key of ["howto", "legacy_article_headline", "legacy_article_description", "date_published"]) {
  assert(!(key in minimal.parsed.frontMatter), `an absent optional key stays absent after a save: ${key}`);
  assert(!minimal.document.includes(`${key}:`), `an absent optional key is not written to the file: ${key}`);
}

// Nested list-of-object and object-with-nested-list shapes are the ones a
// narrow parser is most likely to mangle, so assert them directly.
const nestedGuide = {
  ...minimalGuide,
  date_published: "2026-01-02",
  sources: [
    { name: "One: with a colon", publisher: "P", url: "https://example.org/a", last_checked: "2026-01-01" },
    { name: "Two", publisher: "P's desk", url: "https://example.org/b", last_checked: "2026-01-02" }
  ],
  howto: {
    name: "How to X",
    description: "Do X.",
    steps: [
      { name: "One", text: "First." },
      { name: "Two", text: "Second: with a colon." }
    ]
  },
  legacy_article_headline: "H",
  legacy_article_description: "D"
};
const nested = sveltiaRoundTrip(nestedGuide, "Intro.\n\n## A\n\nBody.");
assert(
  JSON.stringify(nested.parsed.frontMatter) === JSON.stringify(nestedGuide),
  "nested sources and howto steps round-trip exactly, colons and apostrophes included"
);
assert(nested.parsed.frontMatter.howto.steps.length === 2, "howto steps survive as a list of objects");
assert(nested.parsed.frontMatter.sources[1].publisher === "P's desk", "an apostrophe survives single-quoted YAML");

// Empty optional values must not become a persisted empty string that the build
// would then have to reject.
const cleared = sveltiaRoundTrip({ ...minimalGuide, date_published: "" }, "Body.");
assert(cleared.parsed.frontMatter.date_published === "", "a cleared optional scalar reads back as empty, not as the string 'null'");

// ---------------------------------------------------------------------------
// 4. Relation fields store slugs, and every stored value resolves
//
// The stand-in for exercising the picker against a live GitHub backend, which
// cannot be done from CI without a token and a real save. What the picker does
// is fully determined by its configuration, so assert the configuration: the
// wrong `value_field` would silently store `/guides/<slug>` or a title, and the
// blog build would then reject every post an editor touched.
// ---------------------------------------------------------------------------
const relationBlock = configText.slice(
  configText.indexOf("- name: related_guides"),
  configText.indexOf("- name: related_artists")
);
assert(/widget:\s*relation/.test(relationBlock), "related_guides is a relation widget");
assert(/collection:\s*guides/.test(relationBlock), "related_guides targets the guides collection");
assert(/multiple:\s*true/.test(relationBlock), "related_guides accepts more than one guide");
assert(/value_field:\s*'\{\{slug\}\}'/.test(relationBlock), "related_guides stores the guide slug, not a URL or a title");
assert(/display_fields:\s*\[h1\]/.test(relationBlock), "related_guides shows the guide's H1 in the picker");
assert(/search_fields:\s*\[title, h1, description\]/.test(relationBlock), "related_guides is searchable by title, H1 and description");

// Sveltia dropped the camelCase spellings; a config still using them silently
// falls back to defaults, which for valueField means storing the whole entry.
for (const deprecated of ["valueField", "displayFields", "searchFields", "optionsLength"]) {
  assert(!configText.includes(`${deprecated}:`), `config.yml uses no deprecated camelCase option (${deprecated})`);
}

// `artists.json` must not have become editable just to populate a picker.
assert(!/folder:\s*public\/data/.test(configText), "no collection is rooted in public/data");
assert(!configText.includes("artists.json"), "public/data/artists.json is not exposed as a CMS collection");
assert(
  /- name: related_artists[\s\S]{0,200}?widget:\s*list/.test(configText),
  "related_artists stays a plain list rather than a relation onto artist data"
);

// Every slug an editor has already stored must resolve to a real guide file —
// the same resolution the blog build performs, checked here against the source
// of truth rather than the compiled output.
const guideSlugs = new Set(
  fs.existsSync(path.join(root, "content", "guides"))
    ? fs.readdirSync(path.join(root, "content", "guides")).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
    : []
);
for (const [key, files] of persistedKeys(path.join(root, "content", "blog"))) {
  if (key !== "related_guides") continue;
  for (const file of files) {
    const { frontMatter } = splitDocument(fs.readFileSync(path.join(root, "content", "blog", file), "utf8"));
    for (const slug of frontMatter.related_guides || []) {
      assert(!String(slug).includes("/"), `blog/${file}: related_guides "${slug}" is a bare slug, not a path`);
      assert(guideSlugs.has(String(slug)), `blog/${file}: related_guides "${slug}" resolves to a guide file`);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Opening an entry and saving it unchanged publishes nothing
//
// The stand-in for the live "no-op save" check. An editor who opens a guide to
// read it and presses Save must not move a single byte of public output — no
// reordered front matter, no reformatted body, and therefore no new fingerprint
// and no advanced "Updated" date. This drives the real build over documents
// rewritten exactly as Sveltia would rewrite them.
// ---------------------------------------------------------------------------
const { buildGuideOutputs } = await import("./build-guide-content.mjs");

const guidesDir = path.join(root, "content", "guides");
const originals = new Map();
for (const file of fs.readdirSync(guidesDir).filter((f) => f.endsWith(".md"))) {
  originals.set(file, fs.readFileSync(path.join(guidesDir, file), "utf8"));
}

const beforeContent = fs.readFileSync(path.join(root, "public", "data", "guides-content.json"), "utf8");
const beforeRoutes = fs.readFileSync(path.join(root, "functions", "_guide-routes.generated.js"), "utf8");
const beforeProvenance = fs.readFileSync(path.join(root, "data", "content-provenance.json"), "utf8");

let rebuild;
try {
  // Simulate the save: every guide rewritten through Sveltia's serializer.
  for (const [file, raw] of originals) {
    const { frontMatter, body } = splitDocument(raw);
    fs.writeFileSync(path.join(guidesDir, file), sveltiaRoundTrip(frontMatter, body).document, "utf8");
  }
  for (const [file, raw] of originals) {
    assert(
      fs.readFileSync(path.join(guidesDir, file), "utf8") === raw,
      `a no-op save of ${file} rewrites the file byte-for-byte identically`
    );
  }
  rebuild = await buildGuideOutputs({ write: true });
} finally {
  for (const [file, raw] of originals) fs.writeFileSync(path.join(guidesDir, file), raw, "utf8");
}

assert(rebuild.problems.length === 0, `a rebuild after a no-op save validates cleanly (${rebuild.problems.join("; ")})`);
assert(
  fs.readFileSync(path.join(root, "public", "data", "guides-content.json"), "utf8") === beforeContent,
  "a no-op save leaves public/data/guides-content.json byte-identical"
);
assert(
  fs.readFileSync(path.join(root, "functions", "_guide-routes.generated.js"), "utf8") === beforeRoutes,
  "a no-op save leaves functions/_guide-routes.generated.js byte-identical"
);
assert(
  fs.readFileSync(path.join(root, "data", "content-provenance.json"), "utf8") === beforeProvenance,
  "a no-op save advances no published or updated date"
);

if (failures) {
  console.error(`\ncms-content-contract: ${failures} check(s) failed.`);
  process.exit(1);
}
console.log(`cms-content-contract: ${passed} assertions passed.`);
