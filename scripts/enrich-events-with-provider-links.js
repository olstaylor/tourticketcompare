#!/usr/bin/env node

/**
 * Enrich events.json with provider_links scaffolding
 *
 * Safely adds the provider_links structure to all events.
 * For each event:
 * - Ticketmaster: copies from existing ticketmaster_event_id and ticketmaster_url
 * - Other providers: initializes with null placeholders (ready for future integration)
 *
 * Safety:
 * - Does not invent data
 * - Does not scrape providers
 * - Non-destructive: preserves all existing fields
 * - Idempotent: can be run multiple times
 *
 * Usage: node scripts/enrich-events-with-provider-links.js
 */

import fs from "fs";
import path from "path";

const EVENTS_FILE = path.join(process.cwd(), "public/data/events.json");
const OUTPUT_FILE = path.join(process.cwd(), "public/data/events.json");

const PROVIDERS = ["ticketmaster", "seatgeek", "vivid-seats", "stubhub"];

function createProviderLinks(event) {
  const links = {};

  for (const provider of PROVIDERS) {
    if (provider === "ticketmaster") {
      // Copy from existing ticketmaster fields
      links[provider] = {
        event_id: event.ticketmaster_event_id || null,
        url: event.ticketmaster_url || null,
        verified: !!(event.ticketmaster_url && event.source_type === "ticketmaster"),
        last_verified_at: links[provider]?.last_verified_at || event.last_verified_at || null,
        availability_status: event.ticketmaster_url ? "on_sale" : "not_checked"
      };
    } else if (provider === "seatgeek") {
      // Placeholder for future integration
      links[provider] = {
        event_id: event.seatgeek_event_id || null,
        url: event.seatgeek_url || null,
        verified: false,
        last_verified_at: null,
        availability_status: "not_checked"
      };
    } else if (provider === "vivid-seats") {
      // Placeholder for future integration
      links[provider] = {
        event_id: event.vividseats_event_id || null,
        url: event.vividseats_url || null,
        verified: false,
        last_verified_at: null,
        availability_status: "not_checked"
      };
    } else if (provider === "stubhub") {
      // Placeholder for future integration
      links[provider] = {
        event_id: event.stubhub_event_id || null,
        url: event.stubhub_url || null,
        verified: false,
        last_verified_at: null,
        availability_status: "not_checked"
      };
    }
  }

  return links;
}

function enrichEvent(event) {
  // If already enriched, return as-is
  if (event.provider_links) {
    return event;
  }

  return {
    ...event,
    provider_links: createProviderLinks(event)
  };
}

async function main() {
  try {
    console.log("Reading events.json...");
    const content = fs.readFileSync(EVENTS_FILE, "utf8");
    const events = JSON.parse(content);

    if (!Array.isArray(events)) {
      console.error("Error: events.json is not an array");
      process.exit(1);
    }

    console.log(`Found ${events.length} events`);

    const enriched = events.map(enrichEvent);

    const enrichedCount = enriched.filter((e) => e.provider_links).length;
    console.log(`Enriched ${enrichedCount} events with provider_links`);

    const output = JSON.stringify(enriched, null, 2);

    fs.writeFileSync(OUTPUT_FILE, output, "utf8");
    console.log(`✓ Written to ${OUTPUT_FILE}`);

    // Show sample
    if (enriched.length > 0) {
      console.log("\nSample enriched event:");
      console.log(JSON.stringify(enriched[0], null, 2).slice(0, 500) + "...");
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
