#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import { guideProviderPairEligibility, renderGuideProviderPair } from "../functions/[[path]].js";
import { sanitizeMetadata } from "../functions/api/analytics.js";
import { normalizeCtaLocation } from "../functions/_funnel.js";

const env = { IMPACT_VIVIDSEATS_BASE_TRACKING_URL: "https://vivid-seats.pxf.io/example" };
const valid = {
  id: "tm-test-2030-new-york-abc",
  artist_slug: "test-artist",
  artist_name: "Test Artist",
  city: "New York",
  venue: "Test Arena",
  datetime_iso: "2030-11-19T19:00:00-05:00",
  timezone: "America/New_York",
  ticketmaster_event_id: "ABC123",
  ticketmaster_url: "https://www.ticketmaster.com/test-artist/event/ABC123",
  vividseats_url: "https://www.vividseats.com/test-artist-tickets-test-arena-11-19-2030--concerts/production/9876543",
  provider_links: { ticketmaster: { verified: true }, "vivid-seats": { verified: true } }
};

assert.deepEqual(guideProviderPairEligibility([valid], env).map((event) => event.id), [valid.id]);
assert.equal(guideProviderPairEligibility([{ ...valid, ticketmaster_url: "https://evil.example/event/ABC123" }], env).length, 0);
assert.equal(guideProviderPairEligibility([{ ...valid, vividseats_url: "https://www.vividseats.com/" }], env).length, 0);
assert.equal(guideProviderPairEligibility([{ ...valid, vividseats_url: "" }], env).length, 0);
assert.equal(guideProviderPairEligibility([{ ...valid, datetime_iso: "2020-01-01T19:00:00-05:00" }], env).length, 0);

const route = {
  path: "/guides/vivid-seats-vs-ticketmaster",
  comparisonProviders: ["ticketmaster", "vivid-seats"]
};
const rendered = renderGuideProviderPair(route, [valid], env);
assert.match(rendered, /ctaLocation=guide_provider_pair/);
assert.match(rendered, /guideSlug=vivid-seats-vs-ticketmaster/);
assert.match(rendered, /position=1/);
assert.match(rendered, /rel="noopener nofollow"[^>]*data-cta-provider="ticketmaster"/);
assert.match(rendered, /rel="noopener nofollow sponsored"[^>]*data-cta-provider="vivid-seats"/);
assert.doesNotMatch(rendered, /\$\d|availability/i);

const fallback = renderGuideProviderPair(route, [], env);
assert.match(fallback, /No upcoming event currently passes/);
assert.match(fallback, /href="\/artists"/);
assert.match(fallback, /href="\/compare-concert-ticket-prices"/);
assert.equal(renderGuideProviderPair({ ...route, comparisonProviders: ["ticketmaster"] }, [valid], env), "");

assert.equal(normalizeCtaLocation("guide_provider_pair"), "guide_provider_pair");
const metadata = sanitizeMetadata({
  guideSlug: "vivid-seats-vs-ticketmaster",
  position: 1,
  ctaLocation: "guide_provider_pair",
  destinationUrl: "https://evil.example/path",
  freeTextQuery: "artist tickets"
});
assert.deepEqual(metadata, {
  guideSlug: "vivid-seats-vs-ticketmaster",
  position: 1,
  ctaLocation: "guide_provider_pair"
});

const inboundGuideFiles = [
  "ticketmaster-vs-seatgeek-vs-vivid-seats",
  "seatgeek-vs-ticketmaster",
  "ticketmaster-vs-stubhub",
  "primary-vs-resale-concert-tickets",
  "concert-ticket-fees-explained",
  "ticket-delivery-and-transfer-timing",
  "how-to-compare-concert-ticket-prices",
  "how-to-compare-event-ticket-prices"
];
for (const slug of inboundGuideFiles) {
  const source = fs.readFileSync(new URL(`../content/guides/${slug}.md`, import.meta.url), "utf8");
  assert.match(source, /\/guides\/vivid-seats-vs-ticketmaster/, `${slug} must link contextually to the provider-pair guide`);
}
const routerSource = fs.readFileSync(new URL("../functions/[[path]].js", import.meta.url), "utf8");
assert.ok((routerSource.match(/\/guides\/vivid-seats-vs-ticketmaster/g) || []).length >= 3, "homepage, guides cluster and comparison hub must discover the guide");

console.log("guide-provider-pair tests passed");
