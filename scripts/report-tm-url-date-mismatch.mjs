#!/usr/bin/env node
// Report-only: upcoming events whose Ticketmaster URL slug carries a
// date (mm-dd-yyyy on ticketmaster.com/.ca, dd-mm-yyyy elsewhere) that differs from the stored start date, with no
// previous_start_date recording a reschedule. Never fails the build and never
// edits data; a human checks each row on Ticketmaster. Usage:
//   node scripts/report-tm-url-date-mismatch.mjs [--json]
import fs from "node:fs";

const events = JSON.parse(fs.readFileSync(new URL("../public/data/events.json", import.meta.url), "utf8"));
const DAY = 86400000;

export function urlDate(url) {
  const m = String(url || "").match(/^https?:\/\/([^/]+)\/.*-(\d{2})-(\d{2})-(\d{4})(?:\/|$|\?)/);
  if (!m) return null;
  const usStyle = /(^|\.)ticketmaster\.(com|ca)$/i.test(m[1]);
  const [day, month] = usStyle ? [Number(m[3]), Number(m[2])] : [Number(m[2]), Number(m[3])];
  const t = Date.UTC(Number(m[4]), month - 1, day);
  const d = new Date(t);
  // Reject impossible dates such as 31-02-2027.
  return d.getUTCDate() === day && d.getUTCMonth() === month - 1 ? t : null;
}

export function findMismatches(list, now = Date.now()) {
  const rows = [];
  for (const e of list) {
    const stored = Date.parse(e.datetime_iso || "");
    if (!Number.isFinite(stored) || stored < now - DAY) continue;
    const fromUrl = urlDate(e.ticketmaster_url);
    if (fromUrl === null || e.previous_start_date) continue;
    const storedDay = Date.UTC(...(new Date(stored).toISOString().slice(0, 10).split("-").map((n, i) => (i === 1 ? Number(n) - 1 : Number(n)))));
    // Venue-local date can sit a day either side of the UTC date.
    if (Math.abs(storedDay - fromUrl) <= DAY) continue;
    rows.push({ id: e.id, artist: e.artist_slug, city: e.city, stored: e.datetime_iso, url_date: new Date(fromUrl).toISOString().slice(0, 10), url: e.ticketmaster_url });
  }
  return rows;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const rows = findMismatches(events);
  if (process.argv.includes("--json")) console.log(JSON.stringify(rows, null, 2));
  else {
    console.log(`Ticketmaster URL date differs from stored date (no previous_start_date): ${rows.length} upcoming event(s). Report only.`);
    for (const r of rows) console.log(`- ${r.id} | ${r.artist} | ${r.city} | stored ${r.stored} | URL ${r.url_date} | ${r.url}`);
  }
}
