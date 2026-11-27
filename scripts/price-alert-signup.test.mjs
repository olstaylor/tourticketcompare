#!/usr/bin/env node
// Price-alert double opt-in: /api/price-alert stores a PENDING request and
// sends nothing unless a provider is fully configured; /api/price-alert-confirm
// only confirms on POST (a scanner's GET changes nothing); the stub provider
// never calls fetch; repeat requests get the same answer.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (f) => import(pathToFileURL(path.join(root, f)));
const signup = await load("functions/api/price-alert.js");
const confirm = await load("functions/api/price-alert-confirm.js");
const { createEmailProvider } = await load("functions/_email-provider.js");

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`price-alert: ${message}`);
  passed += 1;
}

// Minimal in-memory D1 covering exactly the statements these endpoints use.
function fakeDb() {
  const subs = new Map();
  const sends = new Map();
  const unsubs = new Map();
  const db = {
    subs, sends, unsubs, rate: 0,
    prepare(sql) {
      const q = sql.replace(/\s+/g, " ").trim();
      const st = {
        a: [],
        bind(...a) { st.a = a; return st; },
        async run() {
          if (/^INSERT INTO rate_limits/.test(q)) db.rate += 1;
          else if (/^INSERT INTO price_alert_subscriptions/.test(q)) {
            const [email, event_id, artist_slug, confirm_token, consent_text, source_path, created_at] = st.a;
            const prev = subs.get(`${email}|${event_id}`);
            Object.assign(prev || {}, {}); subs.set(`${email}|${event_id}`, Object.assign(prev || {}, { email, event_id, artist_slug, status: "pending", confirm_token, consent_text, source_path, created_at, confirmed_at: null }));
          } else if (/^INSERT INTO email_alert_sends/.test(q)) {
            const [email, artist_slug, alert_kind, token, claimed_at] = st.a;
            sends.set(`${email}|${alert_kind}`, { email, artist_slug, alert_kind, status: "claimed", unsubscribe_token: token, claimed_at });
          } else if (/^UPDATE email_alert_sends/.test(q)) {
            const [status, , , , email, , kind] = st.a;
            sends.get(`${email}|${kind}`).status = status;
          } else if (/^UPDATE price_alert_subscriptions SET confirm_sent_at/.test(q)) {
            subs.get(`${st.a[1]}|${st.a[2]}`).confirm_sent_at = st.a[0];
          } else if (/^UPDATE price_alert_subscriptions SET status = 'confirmed'/.test(q)) {
            const row = [...subs.values()].find((r) => r.confirm_token === st.a[1] && r.status === "pending");
            if (row) { row.status = "confirmed"; row.confirmed_at = st.a[0]; }
          }
          return {};
        },
        async first() {
          if (/FROM rate_limits/.test(q)) return { count: db.rate };
          if (/FROM price_alert_subscriptions WHERE email/.test(q)) return subs.get(`${st.a[0]}|${st.a[1]}`) || null;
          if (/FROM price_alert_subscriptions WHERE confirm_token/.test(q)) return [...subs.values()].find((r) => r.confirm_token === st.a[0]) || null;
          if (/FROM email_unsubscribes/.test(q)) return unsubs.get(st.a[0]) || null;
          return null;
        }
      };
      return st;
    }
  };
  return db;
}

const FUTURE = new Date(Date.now() + 60 * 86400000).toISOString();
const events = [{ id: "ev-1", artist_slug: "fixture-artist", artist_name: "Fixture Artist", city: "Leeds", datetime_iso: FUTURE, timezone: "Europe/London" },
  { id: "ev-old", artist_slug: "fixture-artist", artist_name: "Fixture Artist", city: "Leeds", datetime_iso: "2020-01-01T20:00:00Z", timezone: "Europe/London" }];
const assets = { async fetch(req) { return new URL(req.url).pathname.endsWith("/fixture-artist.json") ? new Response(JSON.stringify(events)) : new Response("", { status: 404 }); } };
const post = (body, extra = {}) => new Request("https://tourticketcompare.com/api/price-alert", { method: "POST", headers: { "Content-Type": "application/json", ...extra }, body: JSON.stringify(body) });
const good = { email: "Fan@Example.org", artistSlug: "fixture-artist", eventId: "ev-1", sourcePath: "/artists/fixture-artist" };

// Stub provider: stores pending, sends nothing, even if fetch would work.
{
  const realFetch = globalThis.fetch;
  let fetched = 0;
  globalThis.fetch = async () => { fetched += 1; return new Response("{}"); };
  const db = fakeDb();
  const res = await signup.onRequestPost({ request: post(good), env: { DEMAND_DB: db, ASSETS: assets } });
  const body = await res.json();
  assert(res.status === 200 && body.ok && body.status === "pending_confirmation" && body.emailSent === false, "stub: accepted, reports no email sent");
  assert(fetched === 0, "stub provider makes no network call");
  const sub = [...db.subs.values()][0];
  assert(sub.email === "fan@example.org" && sub.status === "pending" && /^[a-f0-9]{48}$/.test(sub.confirm_token), "stored pending with a token, address lower-cased");
  assert(/at most 2 a week/.test(sub.consent_text), "consent wording stored with the signup");
  assert([...db.sends.values()][0].status === "not_sent", "confirmation recorded as not sent");

  // Configured provider: sends exactly one confirmation, with a confirm link and unsubscribe.
  globalThis.fetch = async (url, init) => { fetched += 1; globalThis.__last = { url, init }; return new Response(JSON.stringify({ id: "msg_1" })); };
  const env = { DEMAND_DB: fakeDb(), ASSETS: assets, PRICE_ALERTS_PROVIDER: "resend", RESEND_API_KEY: "k", ALERT_EMAIL_FROM: "TTC <a@tourticketcompare.com>", ALERT_POSTAL_ADDRESS: "PO Box 1" };
  const live = await (await signup.onRequestPost({ request: post(good), env })).json();
  const sent = JSON.parse(globalThis.__last.init.body);
  assert(live.emailSent === true && fetched === 1, "live provider sends one confirmation");
  assert(sent.to[0] === "fan@example.org" && sent.text.includes("/api/price-alert-confirm?t=") && sent.text.includes("/api/unsubscribe?t=") && sent.text.includes("PO Box 1"), "confirmation has confirm link, unsubscribe link, postal address");
  assert(!/price drop is|lowest listed price (is|fell)/i.test(sent.text), "confirmation makes no price claim");
  const again = await (await signup.onRequestPost({ request: post(good), env })).json();
  assert(fetched === 1 && again.status === "pending_confirmation", "asking again within minutes does not send another email");
  // Missing postal address: never sends.
  const noPostal = await (await signup.onRequestPost({ request: post({ ...good, email: "b@example.org" }), env: { ...env, DEMAND_DB: fakeDb(), ALERT_POSTAL_ADDRESS: "" } })).json();
  assert(noPostal.emailSent === false && fetched === 1, "no postal address, no email");
  globalThis.fetch = realFetch;
}

// Validation.
{
  const env = { DEMAND_DB: fakeDb(), ASSETS: assets };
  const status = async (body) => (await signup.onRequestPost({ request: post(body), env })).status;
  assert(await status({ ...good, email: "nope" }) === 400, "bad email");
  assert(await status({ ...good, website: "http://spam" }) === 400, "honeypot");
  assert(await status({ ...good, eventId: "missing" }) === 400, "unknown show");
  assert(await status({ ...good, eventId: "ev-old" }) === 400, "past show");
  assert(await status({ ...good, artistSlug: "other-artist" }) === 400, "show must belong to the artist");
  const noDb = await signup.onRequestPost({ request: post(good), env: { ASSETS: assets } });
  assert(noDb.status === 503, "missing D1 is reported");
}

// Confirm: GET changes nothing; POST confirms; stale and unknown tokens do not.
{
  const db = fakeDb();
  await signup.onRequestPost({ request: post(good), env: { DEMAND_DB: db, ASSETS: assets } });
  const sub = [...db.subs.values()][0];
  const url = `https://tourticketcompare.com/api/price-alert-confirm?t=${sub.confirm_token}`;
  const get = await confirm.onRequestGet({ request: new Request(url) });
  assert(get.status === 200 && /<form method="post"/.test(await get.text()) && sub.status === "pending", "GET shows a button and confirms nothing");
  const post1 = await confirm.onRequestPost({ request: new Request(url, { method: "POST" }), env: { DEMAND_DB: db } });
  assert(post1.status === 200 && sub.status === "confirmed" && sub.confirmed_at, "POST confirms");
  const bad = await confirm.onRequestPost({ request: new Request(`https://x.test/?t=${"c".repeat(48)}`, { method: "POST" }), env: { DEMAND_DB: db } });
  assert(bad.status === 400, "unknown token");
  const malformed = await confirm.onRequestPost({ request: new Request("https://x.test/?t=zzz", { method: "POST" }), env: { DEMAND_DB: db } });
  assert(malformed.status === 400, "malformed token");
  sub.status = "pending"; sub.created_at = new Date(Date.now() - 8 * 86400000).toISOString();
  const stale = await confirm.onRequestPost({ request: new Request(url, { method: "POST" }), env: { DEMAND_DB: db } });
  assert(stale.status === 400 && sub.status === "pending", "a link older than 7 days is refused");

  // Confirmed and not unsubscribed: asking again is a quiet no-op. After an unsubscribe it is fresh consent.
  sub.status = "confirmed"; sub.confirmed_at = "2026-11-01T00:00:00.000Z"; sub.created_at = "2026-11-01T00:00:00.000Z";
  const token = sub.confirm_token;
  await signup.onRequestPost({ request: post(good), env: { DEMAND_DB: db, ASSETS: assets } });
  assert(sub.status === "confirmed" && sub.confirm_token === token, "already confirmed: unchanged");
  db.unsubs.set("fan@example.org", { unsubscribed_at: "2026-11-10T00:00:00.000Z" });
  await signup.onRequestPost({ request: post(good), env: { DEMAND_DB: db, ASSETS: assets } });
  assert([...db.subs.values()][0].status === "pending", "after unsubscribing, a new request starts again at pending");
}

assert(createEmailProvider({}).live === false && createEmailProvider({ PRICE_ALERTS_PROVIDER: "resend" }).live === false && createEmailProvider({ PRICE_ALERTS_PROVIDER: "typo" }).live === false, "anything short of full config is the stub");

console.log(`price-alert: ${passed} checks passed`);
