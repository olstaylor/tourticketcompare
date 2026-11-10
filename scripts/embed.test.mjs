import assert from "node:assert/strict";
import { parseEmbedParams, selectEmbedEntries, renderEmbedHtml, renderBuilderHtml, embedSnippet, artistLink } from "../functions/_embed.js";

// Params are sanitised.
const p = parseEmbedParams(new URLSearchParams("artist=Olivia-Rodrigo&limit=99&theme=dark&src=Fan X!<script>"));
assert.deepEqual({ ...p }, { artist: "olivia-rodrigo", limit: 8, theme: "dark", src: "fanxscript", builder: false });
assert.equal(parseEmbedParams(new URLSearchParams("artist=../etc")).artist, "", "bad slug rejected");
assert.equal(parseEmbedParams(new URLSearchParams("artist=a&limit=0")).limit, 5, "bad limit falls back");

const lane = (name, price, at = "2026-11-03T10:00:00Z") => ({ provider: name.toLowerCase(), name, price, currency: "USD", fetchedAt: at, href: "/api/out?x=1" });
const row = (showId, iso, lanes) => ({ showId, venue: "Hall", datetimeISO: iso, timezone: "America/New_York", ts: Date.parse(iso), currency: lanes.length ? "USD" : "", lanes, lowest: lanes[0] || null, comparedCount: lanes.length, checked: true });
const data = {
  totalDates: 9,
  shows: [{ id: "a", city: "Boston", venue: "Garden" }, { id: "b", city: "NYC", venue: "MSG" }, { id: "c", city: "<b>X</b>", venue: "V" }],
  rows: [row("a", "2026-12-01T19:00:00-05:00", []), row("b", "2026-12-02T19:00:00-05:00", [lane("Vivid Seats", 120), lane("SeatGeek", 150, "2026-11-03T11:30:00Z")]), row("c", "2026-12-03T19:00:00-05:00", [lane("SeatGeek", 99.5)])]
};
const entries = selectEmbedEntries(data, 5);
assert.deepEqual(entries.map((e) => e.row.showId), ["b", "c"], "priced dates only when any are priced");
const html = renderEmbedHtml({ artist: { slug: "x-band", name: "X <Band>" }, entries, totalDates: 9, theme: "light", src: "fan1" });
assert.match(html, /Lowest listed: USD 120/);
assert.match(html, /SeatGeek USD 150/, "per-seller prices shown");
assert.match(html, /Prices checked Nov 3, 2026, 11:30 AM UTC/, "latest check time shown");
assert.match(html, /See all 9 dates/);
assert.ok(!html.includes("X <Band>") && html.includes("X &lt;Band&gt;"), "artist name escaped");
assert.ok(!html.includes("<b>X</b>") && html.includes("&lt;b&gt;X&lt;/b&gt;"), "place escaped");
assert.ok(!html.includes("/api/out") && !/<script/i.test(html), "no outbound seller links and no script");
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
assert.ok(hrefs.every((h) => h.startsWith("https://tourticketcompare.com/artists/")), "links go to TTC artist page only");
assert.match(hrefs[0], /utm_source=embed&amp;utm_medium=widget&amp;utm_campaign=fan1/);

// Nothing priced: dates listed with an honest empty state, never a made-up price.
const empty = renderEmbedHtml({ artist: { slug: "x-band", name: "X" }, entries: selectEmbedEntries({ ...data, rows: [data.rows[0]] }, 5), totalDates: 1, theme: "dark", src: "" });
assert.match(empty, /No listed price yet/);
assert.ok(!/USD|\$/.test(empty));
assert.match(empty, /utm_campaign=direct/);
assert.match(empty, /class="dark"/);

// Snippet carries the visible credit link (the real backlink) and canonical frame URL.
const snip = embedSnippet({ artist: { slug: "x-band", name: "X" }, limit: 3, theme: "light", src: "me" });
assert.match(snip, /<iframe src="https:\/\/tourticketcompare\.com\/api\/embed\?artist=x-band&limit=3&theme=light&src=me"/);
assert.match(snip, /Prices by <a href="https:\/\/tourticketcompare\.com\/artists\/x-band\?utm_source=embed/);
const builder = renderBuilderHtml({ artist: { slug: "x-band", name: "X" }, limit: 3, theme: "light", src: "", nonce: "abc" });
assert.match(builder, /<script nonce="abc">/);
assert.match(builder, /&lt;iframe src=/, "snippet shown escaped in textarea");
assert.equal(artistLink("a b", ""), "https://tourticketcompare.com/artists/a%20b?utm_source=embed&utm_medium=widget&utm_campaign=direct");
console.log("embed tests passed");
