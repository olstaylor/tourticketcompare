#!/usr/bin/env node
// Optional auto-post of verified price drops to @tourticketcomp on X (owner
// approved 2026-11-18, monthly spend cap $10; plan: launch/x-price-drop-posts-plan.md).
//
//   node scripts/post-price-drops-to-x.mjs --drafts drafts.json [--dry-run] [--now ISO]
//   node scripts/post-price-drops-to-x.mjs --self-test
//
// INACTIVE by default. It posts only when ALL of these hold; otherwise it prints
// what it would do and exits 0 (a dry run never fails the draft job):
//   - repository variable X_POSTING_ENABLED is exactly "true" (kill switch: set
//     it to anything else, or delete the four secrets);
//   - X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET are all set;
//   - --dry-run was not passed.
//
// Per drop it re-checks the rules at posting time and skips (never edits) on any miss:
//   - newest observation at most 2 hours old;
//   - the post fits one X post with "#ad " first and the campaign
//     utm_campaign=tourticketcomp-drop;
//   - caps: 1 post a day, 4 a week, 40 a month (about $8 at $0.20 per link
//     post, under the $10 cap), one per artist per 7 days, one per show per 14 days, each drop key once ever.
// The record of posts lives in the body of one rolling `automation:x-posts`
// issue (hidden marker). The record is written BEFORE the next post is
// attempted and a failed X call records nothing, so a crash can mean a missed
// post, never a duplicate. Links go to our own event page, never to /api/out.
//
// Env: GITHUB_TOKEN (issues: write), GITHUB_REPOSITORY, X_POSTING_ENABLED, the four X secrets.

import crypto from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { renderDraftText, xLength, X_LIMIT } from "./lib/price-drop-posts.mjs";

const LABEL = "automation:x-posts";
const TITLE = "X posts (auto, @tourticketcomp)";
const MARKER = /<!-- x-posted: (\[.*?\]) -->/s;
const DAY = 86400000;
export const CAPS = Object.freeze({ perDay: 1, perWeek: 4, perMonth: 40, artistDays: 7, showDays: 14, maxAgeMs: 2 * 3600000 });
const CAMPAIGN = "tourticketcomp-drop";

export function parsePosted(body) {
  const m = MARKER.exec(body || "");
  if (!m) return [];
  try {
    const list = JSON.parse(m[1]);
    return Array.isArray(list) ? list.filter((p) => p && typeof p.key === "string" && Number.isFinite(Date.parse(p.at))) : [];
  } catch {
    return [];
  }
}

export function buildBody(posted) {
  return [
    "Price-drop posts published automatically to @tourticketcomp by `scripts/post-price-drops-to-x.mjs` (inactive unless the repository variable `X_POSTING_ENABLED` is `true` and the four X secrets exist).",
    "Kill switch: set `X_POSTING_ENABLED` to anything other than `true`.",
    "",
    `<!-- x-posted: ${JSON.stringify(posted.slice(-300))} -->`
  ].join("\n");
}

export function postText(d) {
  const text = `#ad ${renderDraftText(d, CAMPAIGN)}`;
  return text;
}

/** Why this drop must not be posted now, or "" when it may. Pure. */
export function skipReason(d, posted, now) {
  const observed = Date.parse(d.capturedAt);
  if (!Number.isFinite(observed) || now - observed > CAPS.maxAgeMs) return "newest price older than 2 hours";
  if (posted.some((p) => p.key === d.key)) return "already posted";
  const text = postText(d);
  if (xLength(text) > X_LIMIT) return "does not fit one X post";
  if (/api\/out/.test(text)) return "link must be an event page";
  const within = (ms) => posted.filter((p) => now - Date.parse(p.at) < ms);
  if (within(DAY).length >= CAPS.perDay) return "daily cap reached";
  if (within(7 * DAY).length >= CAPS.perWeek) return "weekly cap reached";
  if (within(30 * DAY).length >= CAPS.perMonth) return "monthly cap reached";
  if (within(CAPS.artistDays * DAY).some((p) => p.artist === d.artistSlug)) return "artist posted within 7 days";
  if (within(CAPS.showDays * DAY).some((p) => p.event && p.event === d.eventId)) return "show posted within 14 days";
  return "";
}

// OAuth 1.0a (HMAC-SHA1) header for a JSON POST: the body is not part of the signature.
export function oauthHeader({ method, url, key, secret, token, tokenSecret, nonce, timestamp }) {
  const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  const params = {
    oauth_consumer_key: key,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(timestamp),
    oauth_token: token,
    oauth_version: "1.0"
  };
  const norm = Object.keys(params).sort().map((k) => `${enc(k)}=${enc(params[k])}`).join("&");
  const base = [method.toUpperCase(), enc(url), enc(norm)].join("&");
  const signature = crypto.createHmac("sha1", `${enc(secret)}&${enc(tokenSecret)}`).update(base).digest("base64");
  const all = { ...params, oauth_signature: signature };
  return `OAuth ${Object.keys(all).sort().map((k) => `${enc(k)}="${enc(all[k])}"`).join(", ")}`;
}

async function sendPost(text, env) {
  const url = "https://api.x.com/2/tweets";
  const header = oauthHeader({
    method: "POST", url, key: env.X_API_KEY, secret: env.X_API_SECRET, token: env.X_ACCESS_TOKEN, tokenSecret: env.X_ACCESS_SECRET,
    nonce: crypto.randomBytes(16).toString("hex"), timestamp: Math.floor(Date.now() / 1000)
  });
  const res = await fetch(url, { method: "POST", headers: { Authorization: header, "Content-Type": "application/json", "User-Agent": "tourticketcompare-x-poster" }, body: JSON.stringify({ text }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.data?.id) throw new Error(`X post failed: HTTP ${res.status} ${JSON.stringify(json).slice(0, 200)}`);
  return json.data.id;
}

function selfTest() {
  const now = Date.parse("2026-12-01T15:00:00Z");
  const drop = { key: "k1", artistSlug: "a", artist: "A", city: "Paris", site: "TicketNetwork", kind: "week-out", daysToShow: 9, localDate: "2026-12-10", dropShare: 0.25, from: 200, to: 150, currency: "USD", fromDate: "2026-11-24", toDate: "2026-12-01", capturedAt: "2026-12-01T14:00:00Z", eventPath: "/events/x" };
  assert.equal(skipReason(drop, [], now), "");
  assert(postText(drop).startsWith("#ad "));
  assert(postText(drop).includes("utm_campaign=tourticketcomp-drop"));
  assert.equal(skipReason({ ...drop, capturedAt: "2026-12-01T12:00:00Z" }, [], now), "newest price older than 2 hours");
  assert.equal(skipReason(drop, [{ key: "k1", at: "2026-11-01T00:00:00Z", artist: "z" }], now), "already posted");
  assert.equal(skipReason(drop, [{ key: "o", at: "2026-12-01T01:00:00Z", artist: "z" }], now), "daily cap reached");
  const four = [1, 2, 3, 4].map((n) => ({ key: `o${n}`, at: new Date(now - (n + 1) * DAY).toISOString(), artist: `z${n}` }));
  assert.equal(skipReason(drop, four, now), "weekly cap reached");
  const month = Array.from({ length: 40 }, (_, n) => ({ key: `m${n}`, at: new Date(now - (8 + n / 2) * DAY).toISOString(), artist: `m${n}` }));
  assert.equal(skipReason(drop, month, now), "monthly cap reached");
  assert.equal(skipReason(drop, [{ key: "o", at: "2026-11-27T01:00:00Z", artist: "a" }], now), "artist posted within 7 days");
  assert.equal(skipReason({ ...drop, eventId: "e1", key: "k2" }, [{ key: "o", at: "2026-11-20T01:00:00Z", artist: "z", event: "e1" }], now), "show posted within 14 days");
  assert.equal(skipReason({ ...drop, eventId: "e1", key: "k2" }, [{ key: "o", at: "2026-11-10T01:00:00Z", artist: "z", event: "e1" }], now), "");
  assert.deepEqual(parsePosted(buildBody([{ key: "k", at: "2026-12-01T00:00:00Z", artist: "a" }])).map((p) => p.key), ["k"]);
  assert.deepEqual(parsePosted("<!-- x-posted: [bad -->"), []);
  const h = oauthHeader({ method: "POST", url: "https://api.x.com/2/tweets", key: "k", secret: "s", token: "t", tokenSecret: "ts", nonce: "n", timestamp: 1 });
  assert(h.startsWith("OAuth ") && h.includes('oauth_signature="'));
  assert.equal(h, oauthHeader({ method: "POST", url: "https://api.x.com/2/tweets", key: "k", secret: "s", token: "t", tokenSecret: "ts", nonce: "n", timestamp: 1 }), "deterministic");
  console.log("post-price-drops-to-x self-test passed");
}

async function main() {
  const argv = process.argv.slice(2);
  const arg = (f) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : "");
  const dry = argv.includes("--dry-run");
  const now = arg("--now") ? Date.parse(arg("--now")) : Date.now();
  const draftsPath = arg("--drafts");
  if (!draftsPath || !existsSync(draftsPath)) {
    console.log("No candidates file; nothing posted.");
    return;
  }
  const drafts = JSON.parse(readFileSync(draftsPath, "utf8"));
  const env = process.env;
  const keys = ["X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_SECRET"];
  const live = !dry && env.X_POSTING_ENABLED === "true" && keys.every((k) => env[k]);
  if (!live) {
    const why = dry ? "dry run" : env.X_POSTING_ENABLED !== "true" ? "X_POSTING_ENABLED is not true" : `missing secrets: ${keys.filter((k) => !env[k]).join(", ")}`;
    console.log(`X posting inactive (${why}). ${drafts.length} new draft(s); nothing posted.`);
    return;
  }
  const token = env.GITHUB_TOKEN, repo = env.GITHUB_REPOSITORY;
  const gh = async (method, endpoint, payload) => {
    const res = await fetch(`https://api.github.com/repos/${repo}${endpoint}`, { method, headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "tourticketcompare-x-poster" }, body: payload ? JSON.stringify(payload) : undefined });
    if (!res.ok) throw new Error(`GitHub ${method} ${endpoint} failed: ${res.status}`);
    return res.json();
  };
  // The ledger is found in any state: a closed ledger must never reset the caps.
  const found = await gh("GET", `/issues?state=all&labels=${encodeURIComponent(LABEL)}`);
  const issue = found[0] || (await gh("POST", "/issues", { title: TITLE, body: buildBody([]), labels: [LABEL] }));
  let posted = parsePosted(issue.body);
  for (const d of drafts) {
    const why = skipReason(d, posted, Date.now());
    if (why) { console.log(`Skipped ${d.key}: ${why}`); continue; }
    const id = await sendPost(postText(d), env);
    posted = [...posted, { key: d.key, at: new Date().toISOString(), artist: d.artistSlug, event: d.eventId, id }];
    await gh("PATCH", `/issues/${issue.number}`, { body: buildBody(posted) });
    console.log(`Posted ${d.key} as ${id}.`);
  }
}

if (process.argv.includes("--self-test")) selfTest();
else if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error?.message || error); process.exit(1); });
}
