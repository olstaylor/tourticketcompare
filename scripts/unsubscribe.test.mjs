#!/usr/bin/env node
// /api/unsubscribe: GET only shows a confirmation (mail scanners pre-fetch
// links), POST records the opt-out for the address the token was sent to, and
// a token no send row holds changes nothing.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { onRequestGet, onRequestPost } = await import(pathToFileURL(path.join(root, "functions/api/unsubscribe.js")));

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`unsubscribe: ${message}`);
  passed += 1;
}

const TOKEN = "b".repeat(48);

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
          return /FROM email_alert_sends/.test(sql) && statement.args[0] === TOKEN ? { email: "fan@example.org" } : null;
        }
      };
      return statement;
    }
  };
}

const request = (method, token) => new Request(`https://tourticketcompare.com/api/unsubscribe?t=${token}`, { method });
const optOuts = (db) => db.writes.filter((w) => /INSERT INTO email_unsubscribes/.test(w.sql));

{
  const res = await onRequestGet({ request: request("GET", TOKEN), env: { DEMAND_DB: fakeDb() } });
  const html = await res.text();
  assert(res.status === 200 && /<form method="post"/.test(html), "GET shows a confirm button");
  assert(res.headers.get("X-Robots-Tag") === "noindex", "page is noindex");
}
{
  const db = fakeDb();
  const res = await onRequestPost({ request: request("POST", TOKEN), env: { DEMAND_DB: db } });
  assert(res.status === 200 && /unsubscribed/.test(await res.text()), "POST confirms");
  assert(optOuts(db).length === 1 && optOuts(db)[0].args[0] === "fan@example.org", "POST records the token's address");
}
{
  const db = fakeDb();
  const res = await onRequestPost({ request: request("POST", "c".repeat(48)), env: { DEMAND_DB: db } });
  assert(res.status === 400 && optOuts(db).length === 0, "unknown token changes nothing");
}
{
  const res = await onRequestPost({ request: request("POST", "not-a-token"), env: { DEMAND_DB: fakeDb() } });
  assert(res.status === 400, "malformed token is rejected");
}
{
  const res = await onRequestPost({ request: request("POST", TOKEN), env: {} });
  assert(res.status === 503, "missing D1 is reported, not swallowed");
}

console.log(`unsubscribe: ${passed} checks passed`);
