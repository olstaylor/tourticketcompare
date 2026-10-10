#!/usr/bin/env node
// /api/signup keeps its two forms apart. An artist date-alert signup enrolls
// the address for that artist; a price-drop "register interest" submission is
// demand measurement only and must never enrol the address for artist alerts,
// because the privacy policy describes them as separate purposes and a future
// date-alert send must not reach someone who only registered price interest.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { onRequestPost } = await import(pathToFileURL(path.join(root, "functions/api/signup.js")));

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`signup-intent: ${message}`);
  passed += 1;
}

function fakeDb() {
  const writes = [];
  return {
    writes,
    prepare(sql) {
      const statement = {
        args: [],
        bind(...args) {
          statement.args = args;
          return statement;
        },
        async run() {
          writes.push({ sql: sql.replace(/\s+/g, " ").trim(), args: statement.args });
          return {};
        },
        async first() {
          return /FROM rate_limits/.test(sql) ? { count: 1 } : null;
        }
      };
      return statement;
    }
  };
}

const env = (db) => ({
  DEMAND_DB: db,
  ASSETS: {
    async fetch() {
      return new Response(JSON.stringify([{ slug: "fixture-artist" }]), { status: 200 });
    }
  }
});

async function submit(body) {
  const db = fakeDb();
  const response = await onRequestPost({
    request: new Request("https://tourticketcompare.com/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json", "user-agent": "fixture", "cf-connecting-ip": "203.0.113.9" },
      body: JSON.stringify(body)
    }),
    env: env(db)
  });
  return { response, writes: db.writes };
}

const subscriberRow = (writes) => writes.find((write) => write.sql.startsWith("INSERT INTO email_subscribers"));
const interestRows = (writes) => writes.filter((write) => write.sql.startsWith("INSERT INTO artist_interests"));
const consentRows = (writes) => writes.filter((write) => write.sql.startsWith("INSERT INTO email_update_consents"));
const analyticsRow = (writes) => writes.find((write) => write.sql.includes("analytics_events"));

{
  const { response, writes } = await submit({
    email: "fan@example.com",
    artistSlug: "fixture-artist",
    sourcePath: "/artists/fixture-artist"
  });
  assert(response.status === 200, "a date-alert signup succeeds");
  assert(interestRows(writes).length === 1, "a date-alert signup enrols the address for the artist");
  assert(subscriberRow(writes)?.args[3] === "fixture-artist", "a date-alert signup credits the artist on the subscriber row");
}

{
  const { response, writes } = await submit({
    email: "fan@example.com",
    artistSlug: "fixture-artist",
    sourcePath: "/artists/fixture-artist",
    intent: "price_alert",
    eventId: "tm-fixture-1"
  });
  assert(response.status === 200, "a price-interest submission succeeds");
  assert(interestRows(writes).length === 0, "price interest never enrols the address for artist date alerts");
  assert(subscriberRow(writes)?.args[3] === null, "price interest does not credit an artist on the subscriber row");
  const analytics = analyticsRow(writes);
  assert(analytics, "price interest is still counted in analytics");
  assert(analytics.args.includes("price_alert_interest"), "the analytics row is the distinct price_alert_interest event");
  assert(analytics.args.includes("fixture-artist"), "the analytics row keeps the artist for demand measurement");
}

// The optional weekly updates box: recorded only when ticked, with the exact
// wording shown, and never from the price-interest form.
const { UPDATES_CONSENT_TEXT } = await import(pathToFileURL(path.join(root, "functions/_email-alerts.js")));

{
  const { writes } = await submit({ email: "fan@example.com", artistSlug: "fixture-artist", sourcePath: "/artists/fixture-artist" });
  assert(consentRows(writes).length === 0, "an unticked box records no updates consent");
}

{
  const { response, writes } = await submit({ email: "fan@example.com", artistSlug: "fixture-artist", sourcePath: "/artists/fixture-artist", updates: true });
  const consent = consentRows(writes);
  assert(response.status === 200 && (await response.json()).updates === true, "a ticked box is reported back");
  assert(consent.length === 1, "a ticked box records updates consent");
  assert(consent[0].args[0] === "fan@example.com" && consent[0].args[2] === UPDATES_CONSENT_TEXT, "consent keeps the address and the exact wording");
  assert(interestRows(writes).length === 1, "the date alert signup still happens alongside it");
  assert(writes.some((write) => write.sql.startsWith("CREATE TABLE IF NOT EXISTS email_update_consents")), "the consent table creates itself");
}

{
  const { writes } = await submit({ email: "fan@example.com", artistSlug: "fixture-artist", intent: "price_alert", updates: true });
  assert(consentRows(writes).length === 0, "price interest can never record updates consent");
}

{
  const { writes } = await submit({ email: "fan@example.com", artistSlug: "fixture-artist", updates: "on" });
  assert(consentRows(writes).length === 0, "only an explicit yes counts as consent");
}

{
  const db = fakeDb();
  const response = await onRequestPost({
    request: new Request("https://tourticketcompare.com/api/signup", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": "fixture", "cf-connecting-ip": "203.0.113.9" },
      body: new URLSearchParams({ email: "fan@example.com", artistSlug: "fixture-artist", sourcePath: "/artists/fixture-artist", updates: "yes" }).toString()
    }),
    env: env(db)
  });
  const html = await response.text();
  assert(consentRows(db.writes).length === 1, "a no-JS form post with the box ticked records consent");
  assert(/weekly presale and on-sale email/.test(html), "the no-JS confirmation mentions the weekly email");
}

// The form copy matches the stored consent wording on both render paths.
{
  const fs = await import("node:fs");
  const appJs = fs.readFileSync(path.join(root, "public/app.js"), "utf8");
  assert(appJs.includes(`const UPDATES_CONSENT_TEXT = ${JSON.stringify(UPDATES_CONSENT_TEXT)};`), "public/app.js shows the same consent wording");
  const router = fs.readFileSync(path.join(root, "functions/[[path]].js"), "utf8");
  assert(router.includes('name="updates" value="yes" /> ${escapeHtml(UPDATES_CONSENT_TEXT)}'), "the server-rendered form uses the shared wording");
  assert(!/name="updates"[^>]*checked/.test(router) && !/updates\.checked = true/.test(appJs), "the box is never pre-ticked");
}

console.log(`signup-intent: ${passed} assertions passed`);
