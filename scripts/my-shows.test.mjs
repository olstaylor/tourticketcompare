// Tests for "My shows": the lookup API and the page shell. Saved shows stay in
// the visitor's browser; the API only reads, never stores.
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function assert(condition, message) {
  if (!condition) throw new Error(`my-shows: ${message}`);
}
const load = (p) => import(pathToFileURL(path.join(root, p)));
const { onRequestGet, parseSaved } = await load("functions/api/my-shows.js");
const { renderMyShowsBody } = await load("functions/[[path]].js");

assert(parseSaved("amy~e1,amy~e1,BAD~e2,amy~bad id,bo~e3").map((s) => s.id).join() === "e1,e3", "valid, unique ids only");
assert(parseSaved(Array.from({ length: 40 }, (_, i) => `amy~e${i}`).join(",")).length === 20, "capped at 20");

const future = new Date(Date.now() + 30 * 86400000).toISOString();
const past = new Date(Date.now() - 30 * 86400000).toISOString();
const partitions = { amy: [
  { id: "up", artist_slug: "amy", artist_name: "Amy", city: "Austin", venue: "Moody Center", datetime_iso: future, timezone: "UTC" },
  { id: "old", artist_slug: "amy", artist_name: "Amy", city: "Dallas", venue: "AAC", datetime_iso: past, timezone: "UTC" },
  { id: "cxl", artist_slug: "amy", artist_name: "Amy", city: "Reno", venue: "Hall", datetime_iso: future, timezone: "UTC", ticketmaster_status_code: "cancelled" }
] };
const env = { ASSETS: { fetch: async (req) => {
  const m = new URL(req.url).pathname.match(/^\/data\/events\/(.+)\.json$/);
  const body = m && partitions[decodeURIComponent(m[1])];
  return body ? new Response(JSON.stringify(body)) : new Response("nope", { status: 404 });
} } };
const res = await onRequestGet({ request: new Request("https://x.test/api/my-shows?s=amy~up,amy~old,amy~cxl,amy~missing,zed~zid"), env });
const body = await res.json();
const by = Object.fromEntries(body.shows.map((s) => [s.id + (s.slug === "zed" ? "-zed" : ""), s]));
assert(by.up.status === "upcoming" && by.up.city === "Austin", "upcoming show returned");
assert(by.old.status === "past", "past date flagged");
assert(by.cxl.status === "past", "a cancelled show is not offered as upcoming");
assert(by.missing.status === "gone" && by["zid-zed"].status === "gone", "unknown ids and wrong artist are 'gone'");
assert(res.headers.get("X-Robots-Tag") === "noindex" && /private/.test(res.headers.get("Cache-Control")), "private, noindex");
assert(!("lowest" in by.up), "no price invented when no lane has one");

const html = renderMyShowsBody({ path: "/my-shows", breadcrumb: [{ name: "My shows", path: "/my-shows" }] });
assert(html.includes("data-my-shows") && html.includes("this device"), "page shell and plain-language limits");
assert(!/cheapest|guarantee|alert/i.test(html), "no cheapest, guarantee or alert promises");

const client = fs.readFileSync(path.join(root, "public/my-shows.js"), "utf8");
assert(!/innerHTML|insertAdjacentHTML|document\.write/.test(client), "client builds the page with textContent only");
assert(!/\/api\/out|gtag|dataLayer|sendBeacon/.test(client), "client touches no redirect or analytics");
console.log("my-shows: ok");
