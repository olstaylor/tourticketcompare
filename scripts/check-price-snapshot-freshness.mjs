#!/usr/bin/env node
//
// Detects a price blackout on the live site.
//
// Why this exists (2026-09-08): the scheduled snapshot writers can stop
// delivering without anything turning red. GitHub drops scheduled ticks under
// load and never replays them, so a workflow whose last run succeeded still
// shows green while its cached rows quietly age past expires_at. When that
// happened, every TicketNetwork and StubHub International price disappeared
// from the site at 10:38Z and nothing reported it — the freshness audit inside
// each snapshot workflow only runs when that workflow runs, which is precisely
// the thing that had stopped.
//
// So this probe deliberately measures the visitor-facing symptom rather than
// the writer's own health: it asks the production API for the same cache-only
// approved-marketplace lanes an artist board renders, and counts the lanes that
// would actually print a price. That catches every cause at once — a stalled
// cron, a failed run, an expired cache, a revoked D1 binding, a flipped flag —
// without needing Cloudflare credentials or D1 access.
//
// Read-only: one GET against the public API. It never writes, and never edits
// events, provider data, or affiliate logic.

import process from "node:process";

const DEFAULT_BASE_URL = "https://tourticketcompare.com";
const DEFAULT_LIMIT = 200;

// A lane is expected to carry prices only when its display flag is on *and* a
// scheduled writer actually feeds it. Keeping both conditions here stops the
// check from alarming forever on a lane that is off by design.
const PRICE_LANES = [
  { provider: "Vivid Seats", flag: "VIVIDSEATS_PRICE_DISPLAY_ENABLED", snapshotsScheduled: true },
  { provider: "TicketNetwork", flag: "TICKETNETWORK_PRICE_DISPLAY_ENABLED", snapshotsScheduled: true },
  { provider: "StubHub International", flag: "STUBHUB_INTERNATIONAL_PRICE_DISPLAY_ENABLED", snapshotsScheduled: true },
  { provider: "Ticket Liquidator", flag: "TICKETLIQUIDATOR_PRICE_DISPLAY_ENABLED", snapshotsScheduled: true },
  // SeatGeek's scheduled snapshots were disabled 2026-07-15: the API returns
  // null lowest/average/highest price for every eligible event under this
  // client's entitlement. Its display flag stays on, but no writer feeds it, so
  // an empty SeatGeek lane is the documented steady state, not a regression.
  { provider: "SeatGeek", flag: "SEATGEEK_PRICE_DISPLAY_ENABLED", snapshotsScheduled: false }
];

function usage() {
  return `Usage: node scripts/check-price-snapshot-freshness.mjs [options]

Probes the live site for a provider price blackout. Read-only.

Options:
  --base-url <url>   Origin to probe (default: ${DEFAULT_BASE_URL})
  --limit <n>        Shows to sample, 1-500 (default: ${DEFAULT_LIMIT})
  --flags <k=v,...>  Override display flags instead of reading them from the
                     probed deployment's wrangler defaults (mainly for testing)
  --self-test        Run offline unit tests only; no network
  --json             Emit machine-readable JSON
  -h, --help         Show this help

Exit codes:
  0  at least one expected lane is serving fresh prices
  1  blackout: every expected lane is dark, or the probe itself failed
`;
}

function parseArgs(argv) {
  const options = { baseUrl: DEFAULT_BASE_URL, limit: DEFAULT_LIMIT, selfTest: false, json: false, flags: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (arg === "--base-url" || arg === "--limit" || arg === "--flags") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      i += 1;
      if (arg === "--base-url") options.baseUrl = value.replace(/\/+$/, "");
      else if (arg === "--flags") options.flags = parseFlagOverrides(value);
      else {
        const n = Number(value);
        if (!Number.isInteger(n) || n < 1 || n > 500) throw new Error("--limit must be an integer 1-500");
        options.limit = n;
      }
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function parseFlagOverrides(value) {
  const flags = {};
  for (const pair of String(value).split(",")) {
    const [key, raw] = pair.split("=");
    if (!key) continue;
    flags[key.trim()] = String(raw ?? "").trim();
  }
  return flags;
}

const flagEnabled = (flags, key) => String(flags?.[key] ?? "").trim().toLowerCase() === "true";

// A lane prints a price only when the runtime gate passes end to end, and the
// API already applies that gate — status "ok" is exactly the set the board
// renders. "affiliate_ready" is the tell-tale of an expired lane: the verified
// destination is still there, only the fresh cache row is gone.
export function evaluateFreshness(payload, { flags = {}, lanes = PRICE_LANES } = {}) {
  const shows = Array.isArray(payload?.shows) ? payload.shows : [];
  const byProvider = new Map();
  for (const show of shows) {
    for (const lane of Array.isArray(show?.prices) ? show.prices : []) {
      const name = String(lane?.provider || "");
      if (!name) continue;
      const entry = byProvider.get(name) || { ok: 0, affiliateReady: 0, unavailable: 0 };
      if (lane.status === "ok") entry.ok += 1;
      else if (lane.status === "affiliate_ready") entry.affiliateReady += 1;
      else entry.unavailable += 1;
      byProvider.set(name, entry);
    }
  }

  const report = lanes.map((lane) => {
    const counts = byProvider.get(lane.provider) || { ok: 0, affiliateReady: 0, unavailable: 0 };
    const expected = lane.snapshotsScheduled && flagEnabled(flags, lane.flag);
    return {
      provider: lane.provider,
      expected,
      ok: counts.ok,
      affiliateReady: counts.affiliateReady,
      unavailable: counts.unavailable,
      // Dark = we expect prices here, verified destinations exist, and yet not
      // one lane is fresh. That is the shape of an expired or unwritten cache.
      dark: expected && counts.ok === 0 && counts.affiliateReady > 0
    };
  });

  const expectedLanes = report.filter((lane) => lane.expected);
  const servingLanes = expectedLanes.filter((lane) => lane.ok > 0);
  const sampled = shows.length;

  return {
    sampled,
    lanes: report,
    darkLanes: report.filter((lane) => lane.dark).map((lane) => lane.provider),
    expectedLaneCount: expectedLanes.length,
    servingLaneCount: servingLanes.length,
    totalFreshLanes: expectedLanes.reduce((sum, lane) => sum + lane.ok, 0),
    // Only a total blackout fails the check. One dark lane among several is
    // reported loudly but does not fail on its own: a single provider can
    // legitimately have nothing priced, and a check that cries wolf gets muted.
    blackout: sampled > 0 && expectedLanes.length > 0 && servingLanes.length === 0
  };
}

async function probe(options) {
  const params = new URLSearchParams({
    includePrices: "true",
    priceProviders: "approved-marketplaces",
    limit: String(options.limit)
  });
  const url = `${options.baseUrl}/api/shows?${params.toString()}`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`price probe failed: HTTP ${response.status} from ${url}`);
  const payload = await response.json();
  if (payload?.includePrices !== true) {
    throw new Error("price probe returned includePrices=false — the API refused the cache-only price request");
  }
  return payload;
}

// The deployed flag values live in wrangler.toml [vars] (non-secret, repo
// managed), so the expectation follows the shipped configuration instead of a
// second hardcoded copy that could drift from it.
async function readDeployedFlags() {
  const { readFile } = await import("node:fs/promises");
  const path = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const toml = await readFile(path.join(root, "wrangler.toml"), "utf8");
  const flags = {};
  for (const line of toml.split("\n")) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*"([^"]*)"\s*$/.exec(line);
    if (match) flags[match[1]] = match[2];
  }
  return flags;
}

function printReport(result, options) {
  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`Price snapshot freshness — sampled ${result.sampled} shows on ${options.baseUrl}`);
  for (const lane of result.lanes) {
    const state = !lane.expected ? "not expected" : lane.ok > 0 ? `${lane.ok} fresh` : "DARK";
    console.log(`  ${lane.provider.padEnd(22)} ${String(state).padEnd(14)} (ok=${lane.ok}, affiliate_ready=${lane.affiliateReady}, unavailable=${lane.unavailable})`);
  }
  console.log(`\n${result.servingLaneCount}/${result.expectedLaneCount} expected lanes serving, ${result.totalFreshLanes} fresh lanes total.`);
}

async function selfTest() {
  const assert = (await import("node:assert/strict")).default;
  const flags = {
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true",
    TICKETNETWORK_PRICE_DISPLAY_ENABLED: "true",
    STUBHUB_INTERNATIONAL_PRICE_DISPLAY_ENABLED: "true",
    TICKETLIQUIDATOR_PRICE_DISPLAY_ENABLED: "false",
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  };
  const show = (lanes) => ({ prices: lanes });

  // Healthy: one expected lane serving is enough to clear the check.
  const healthy = evaluateFreshness(
    { shows: [show([{ provider: "Vivid Seats", status: "ok" }, { provider: "TicketNetwork", status: "affiliate_ready" }])] },
    { flags }
  );
  assert.equal(healthy.blackout, false);
  assert.deepEqual(healthy.darkLanes, ["TicketNetwork"]);
  assert.equal(healthy.totalFreshLanes, 1);

  // The 2026-09-08 incident: verified destinations intact, every price expired.
  const blackout = evaluateFreshness(
    {
      shows: [
        show([
          { provider: "Vivid Seats", status: "affiliate_ready" },
          { provider: "TicketNetwork", status: "affiliate_ready" },
          { provider: "StubHub International", status: "affiliate_ready" }
        ])
      ]
    },
    { flags }
  );
  assert.equal(blackout.blackout, true);
  assert.deepEqual(blackout.darkLanes, ["Vivid Seats", "TicketNetwork", "StubHub International"]);

  // A lane that is off by design must never be reported dark, or the check
  // becomes noise and stops being trusted.
  const byDesign = evaluateFreshness(
    {
      shows: [
        show([
          { provider: "Vivid Seats", status: "ok" },
          { provider: "Ticket Liquidator", status: "affiliate_ready" },
          { provider: "SeatGeek", status: "unavailable" }
        ])
      ]
    },
    { flags }
  );
  assert.equal(byDesign.darkLanes.length, 0);
  assert.equal(byDesign.lanes.find((l) => l.provider === "Ticket Liquidator").expected, false);
  assert.equal(byDesign.lanes.find((l) => l.provider === "SeatGeek").expected, false);

  // SeatGeek stays unexpected even with its display flag on and a ready
  // destination, because no scheduled writer feeds it — so it can never be
  // counted as dark, nor as a lane that clears the blackout check.
  const seatGeekOnly = evaluateFreshness(
    { shows: [show([{ provider: "SeatGeek", status: "affiliate_ready" }])] },
    { flags }
  );
  const seatGeekLane = seatGeekOnly.lanes.find((l) => l.provider === "SeatGeek");
  assert.equal(seatGeekLane.expected, false);
  assert.equal(seatGeekLane.dark, false);
  assert.equal(seatGeekOnly.servingLaneCount, 0);

  // An empty sample is "no signal", never a blackout — a probe that returned
  // nothing must not be mistaken for prices being down.
  assert.equal(evaluateFreshness({ shows: [] }, { flags }).blackout, false);

  // Flags are read as strings; anything but "true" is off.
  assert.equal(flagEnabled({ X: "true" }, "X"), true);
  assert.equal(flagEnabled({ X: "false" }, "X"), false);
  assert.equal(flagEnabled({}, "X"), false);

  // Argument parsing guards.
  assert.equal(parseArgs(["--limit", "10"]).limit, 10);
  assert.throws(() => parseArgs(["--limit", "0"]), /--limit must be/);
  assert.throws(() => parseArgs(["--limit", "501"]), /--limit must be/);
  assert.throws(() => parseArgs(["--base-url"]), /requires a value/);
  assert.equal(parseArgs(["--base-url", "https://example.com/"]).baseUrl, "https://example.com");
  assert.deepEqual(parseFlagOverrides("A=true,B=false"), { A: "true", B: "false" });

  // The shipped configuration must still name every lane this check knows about,
  // so a renamed or dropped flag surfaces here instead of silently disabling a
  // lane's monitoring.
  const deployed = await readDeployedFlags();
  for (const lane of PRICE_LANES) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(deployed, lane.flag),
      `wrangler.toml [vars] is missing ${lane.flag}, which this check reads to decide whether ${lane.provider} should be serving prices`
    );
  }

  console.log("price snapshot freshness self-test passed");
  return 0;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }
  if (options.help) {
    console.log(usage());
    return;
  }
  if (options.selfTest) {
    process.exitCode = await selfTest();
    return;
  }

  try {
    const flags = options.flags || (await readDeployedFlags());
    const result = evaluateFreshness(await probe(options), { flags });
    printReport(result, options);

    if (result.blackout) {
      console.error(
        `\nPRICE BLACKOUT: none of the ${result.expectedLaneCount} expected provider lanes is serving a fresh price.\n` +
          `Verified destinations are still present, so this is a snapshot-freshness failure, not a link failure.\n` +
          `Check that the scheduled price snapshot workflows are still firing — GitHub drops scheduled ticks\n` +
          `silently, and a workflow whose last run succeeded still reports green. Re-run them with apply=true\n` +
          `to restore prices immediately.`
      );
      process.exitCode = 1;
      return;
    }
    if (result.darkLanes.length) {
      console.warn(`\nWarning: no fresh prices for ${result.darkLanes.join(", ")} — that lane's snapshot writer may have stalled.`);
    }
  } catch (error) {
    console.error(`price snapshot freshness check failed: ${error.message}`);
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();

export { PRICE_LANES, flagEnabled, parseArgs, parseFlagOverrides, readDeployedFlags };
