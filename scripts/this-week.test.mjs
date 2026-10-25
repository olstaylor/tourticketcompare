// Tests for the "On sale this week" block (functions/_this-week.js): only
// linkable artists, only the next 7 days, presale-only mode for the home page,
// and no ticket link, price or code in the output.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`this-week: ${message}`);
  passed += 1;
}

const NOW = Date.parse("2026-10-25T12:00:00Z");
const DAY = 86400000;
const iso = (offsetDays) => new Date(NOW + offsetDays * DAY).toISOString();
const { deriveThisWeek, renderThisWeekHtml, THIS_WEEK_GUIDE_PATHS } = await import(
  pathToFileURL(path.join(root, "functions/_this-week.js"))
);

const show = (slug, extra = {}) => ({
  id: `${slug}-1`,
  artist_slug: slug,
  artist_name: slug.toUpperCase(),
  city: "London",
  venue: "O2",
  timezone: "Europe/London",
  datetime_iso: iso(120),
  ...extra
});
const events = [
  show("soon", { public_onsale_at: iso(2) }),
  show("later", { public_onsale_at: iso(9) }),
  show("hidden", { public_onsale_at: iso(1) }),
  show("pre", { presales: [{ name: "Artist presale", start: iso(3), end: iso(4) }] }),
  show("pastpre", { presales: [{ name: "Old presale", start: iso(-3), end: iso(4) }] }),
  show("cancelled", { public_onsale_at: iso(1), ticketmaster_status_code: "cancelled" })
];
const linkable = new Set(["soon", "later", "pre", "pastpre", "cancelled"]);

const all = deriveThisWeek(events, linkable, NOW);
assert(all.map((i) => i.artistSlug).join() === "soon,pre", `expected soon,pre got ${all.map((i) => i.artistSlug)}`);
assert(!all.some((i) => i.artistSlug === "hidden"), "unlinkable artist listed");
assert(deriveThisWeek(events, linkable, NOW, { kinds: ["presale"] }).every((i) => i.kind === "presale"), "kinds filter ignored");
assert(deriveThisWeek([], linkable, NOW).length === 0, "empty events");

const html = renderThisWeekHtml(all);
assert(html.includes('href="/artists/soon"') && html.includes("/on-sale"), "links missing");
assert(!/price|\$|£|code|ticketmaster\.com/i.test(html.replace("as listed by Ticketmaster", "")), "unexpected price/code/ticket link");
assert(renderThisWeekHtml([]) === "", "empty block should render nothing");
assert(THIS_WEEK_GUIDE_PATHS.has("/guides"), "guides index should be covered");

console.log(`this-week: ${passed} checks passed`);
