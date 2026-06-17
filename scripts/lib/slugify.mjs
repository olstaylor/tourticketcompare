// Canonical accent-aware slug generator, shared across the discovery,
// onboarding, scoring, and reporting tooling so slug generation stays uniform.
//
// It decomposes accented characters (ROSALÍA -> rosalia, Beyoncé -> beyonce,
// São Paulo -> sao-paulo) and strips the combining marks BEFORE reducing to
// [a-z0-9-]. Without the decomposition an accented letter collapses straight to
// a hyphen (ROSALÍA -> "rosal-a"), which is the bug PR #286 fixed in the two
// discovery scripts; this module is the single source of truth for that logic.
//
// NOTE: this is the plain artist/place slugifier. The SeatGeek matching scripts
// (propose-seatgeek-urls.mjs, enrich-seatgeek-events.mjs) intentionally use a
// different, filler-word-stripping normaliser for fuzzy matching — they do NOT
// use this helper.
export function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Minimal self-test: `node scripts/lib/slugify.mjs --self-test`
if (import.meta.url === `file://${process.argv[1]}` && process.argv.includes("--self-test")) {
  const cases = [
    ["ROSALÍA", "rosalia"],
    ["Beyoncé", "beyonce"],
    ["São Paulo", "sao-paulo"],
    ["AC/DC", "ac-dc"],
    ["  Lil Nas X  ", "lil-nas-x"],
    ["Sigur Rós", "sigur-ros"],
    ["", ""],
    [null, ""],
    [undefined, ""],
  ];
  let failed = 0;
  for (const [input, expected] of cases) {
    const got = slugify(input);
    if (got !== expected) {
      failed += 1;
      console.error(`FAIL: slugify(${JSON.stringify(input)}) === ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`);
    }
  }
  if (failed) {
    console.error(`\nslugify self-test: ${failed} failure(s)`);
    process.exit(1);
  }
  console.log(`slugify self-test: ${cases.length} case(s) passed`);
}
