// Pins the schema-offers exception so it can only be widened on purpose
// (SAFE_PUBLISHING_RULES.md, "Schema and SEO", exception C).
//
// validate-route-schema.mjs proves what a rendered MusicEvent may carry. It does
// not notice (1) the origin flags in wrangler.toml changing, or (2) offer-shaped
// markup in a form it does not read: microdata, AggregateOffer, lowPrice,
// highPrice or priceSpecification. This test closes both. It only adds failures.
// Changing a pinned value is a deliberate edit of this file in the same PR.
//
// Run standalone (node scripts/schema-offers-pin.test.mjs) and in test:units.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Pinned origin configuration. SCHEMA_OFFERS_PILOT_SLUGS must stay unset or empty.
const PINNED = { SCHEMA_OFFERS_ENABLED: "true", SCHEMA_OFFERS_PILOT_SLUGS: "" };

// Offer-shaped markup that is never allowed anywhere in served code. The one
// sanctioned `"@type": "Offer"` lives in functions/[[path]].js behind the gate.
export const FORBIDDEN = [
  { name: "AggregateOffer", re: /AggregateOffer/ },
  { name: "lowPrice/highPrice/priceSpecification JSON-LD key", re: /["'](?:lowPrice|highPrice|priceSpecification)["']\s*:/ },
  { name: "microdata (itemscope/itemprop/itemtype)", re: /\bitem(?:scope|prop|type)\s*=/ },
  { name: "RDFa offer markup", re: /\b(?:typeof|property)\s*=\s*["'](?:schema:)?(?:Offer|offers|price|availability)["']/ },
];

export function scan(file, source) {
  return FORBIDDEN.filter(({ re }) => re.test(source)).map(({ name }) => `${file}: ${name}`);
}

export function readFlags(toml) {
  const flags = {};
  for (const key of Object.keys(PINNED)) {
    const match = new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, "m").exec(toml);
    flags[key] = match ? match[1] : "";
  }
  return flags;
}

async function walk(dir, out = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "admin" || entry.name === "data" || entry.name === "og") continue;
      await walk(full, out);
    } else if (/\.(?:js|mjs|html)$/.test(entry.name)) out.push(full);
  }
  return out;
}

if (process.argv.includes("--self-test")) {
  const problems = [
    ...scan("a", '{"@type":"AggregateOffer"}'),
    ...scan("b", '{"lowPrice": 10}'),
    ...scan("c", '<div itemscope itemtype="https://schema.org/Offer">'),
    ...scan("d", '<span property="price">'),
  ];
  if (problems.length !== 4) throw new Error(`schema-offers-pin self-test: expected 4 detections, got ${problems.length}`);
  if (scan("e", 'const lowPrice = Number(row.low_price);').length) throw new Error("self-test: a plain variable must not match");
  const flags = readFlags('SCHEMA_OFFERS_ENABLED = "false"\n');
  if (flags.SCHEMA_OFFERS_ENABLED !== "false") throw new Error("self-test: flag reader");
  console.log("schema-offers-pin self-test OK");
} else {
  const errors = [];
  const flags = readFlags(await fs.readFile(path.join(root, "wrangler.toml"), "utf8"));
  for (const [key, expected] of Object.entries(PINNED)) {
    if (flags[key] !== expected) {
      errors.push(`wrangler.toml ${key} is "${flags[key]}", pinned to "${expected}". Widening or switching the schema-offers exception needs an owner-reviewed edit of this test.`);
    }
  }
  const files = [...(await walk(path.join(root, "functions"))), ...(await walk(path.join(root, "public")))];
  for (const file of files) errors.push(...scan(path.relative(root, file), await fs.readFile(file, "utf8")));
  if (errors.length) {
    console.error("[schema-offers-pin] FAILED");
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }
  console.log(`[schema-offers-pin] OK: flags pinned, ${files.length} served files carry no offer-shaped markup outside JSON-LD Offer`);
}
