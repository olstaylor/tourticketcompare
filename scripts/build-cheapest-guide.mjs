#!/usr/bin/env node
// Render one "How to get the cheapest <artist> tickets" pilot post from the
// committed figures in reports/cheapest-guides/<artist>/figures.json.
//
//   node scripts/build-cheapest-guide.mjs --artist metallica [--check]
//
// The figures file is the only source of numbers: it holds the D1 aggregates
// (queries named in its `sql` block) so every figure on the page can be traced
// and refreshed by re-running them. City, venue and venue-local date per date
// are copied from events.json into the file when it is refreshed, so the render
// does not move when event data changes. This script adds only fixed wording;
// it never reads D1 and never invents a price. `--check` fails if the post on
// disk differs from what the figures render.
//
// Pilot, not a template for mass publishing (owner decision 2026-11-16): each
// post exists only because its artist has real price history and a tour with
// current prices. See docs/BLOG.md, "Cheapest-tickets pilot".

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { longDate, money } from "./lib/data-stories.mjs";
import { citySlug } from "../functions/_cities.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const argIndex = process.argv.indexOf("--artist");
const artistSlug = argIndex === -1 ? "" : String(process.argv[argIndex + 1] || "");
const checkOnly = process.argv.includes("--check");

const slugFor = (artist) => `how-to-get-the-cheapest-${artist}-tickets`;
const shortDay = (iso) => longDate(iso).replace(/ \d{4}$/, "");
const utcTime = (iso) => `${shortDay(iso.slice(0, 10))}, ${iso.slice(11, 16)} UTC`;
const pct = (n) => `${n < 0 ? "−" : "+"}${Math.abs(n).toFixed(1)}%`;

function seller(price) {
  return price == null ? "none listed" : money(price, "USD");
}

export function renderGuide(figures) {
  const { artist, artistSlug: slug, asOf, current, runUp } = figures;
  const nextDate = longDate(asOf);
  const runUpTotal = runUp.bySeller.reduce((sum, row) => sum + row.comparisons, 0);
  const runUpLower = runUp.bySeller.reduce((sum, row) => sum + row.lower, 0);
  const runUpHigher = runUp.bySeller.reduce((sum, row) => sum + row.higher, 0);

  const rows = (current?.cheapest || []).map((entry) => {
    const low = Math.min(...[entry.vividSeats, entry.ticketNetwork].filter((value) => value != null));
    return { entry, event: entry, low, localDate: entry.localDate };
  });
  rows.sort((a, b) => a.low - b.low);

  const lines = [];
  const first = rows[0];
  const firstSite = first ? (first.entry.ticketNetwork === first.low ? "TicketNetwork" : "Vivid Seats") : "";

  // Lead: the finding, in the order a buyer needs it.
  if (first) {
    lines.push(
      `On ${nextDate}, the lowest price listed on Vivid Seats or TicketNetwork for ${artist}${current.scopeShort ? ` in ${current.scopeShort}` : ""} was ${money(first.low, "USD")} on ${firstSite}, for ${first.event.city} on ${longDate(first.localDate)}. ` +
        `Before ${runUp.shows} ${artist} shows that have already played, a site's lowest price two days out was lower than a month out in ${runUpLower} of ${runUpTotal} comparisons and higher in ${runUpHigher}. This page sets out both.`
    );
  } else {
    lines.push(`Before ${runUp.shows} ${artist} shows that have already played, a site's lowest price two days out was lower than a month out in ${runUpLower} of ${runUpTotal} comparisons and higher in ${runUpHigher}.`);
  }

  if (first) {
    lines.push(`## Cheapest dates right now`);
    lines.push(
      `TourTicketCompare tracks ${current.upcomingDates} upcoming ${artist} dates. ${current.pricedDates} had a recent price on Vivid Seats or TicketNetwork on ${nextDate}${current.scopeShort ? ` in ${current.scopeShort}` : ""}. The five with the lowest figure on either site:`
    );
    const head = "| Date | City | Venue | Vivid Seats | TicketNetwork |\n|---|---|---|---|---|";
    const body = rows
      .map(({ entry, event, localDate }) => {
        const link = `/artists/${slug}/tickets/${citySlug(event.city, event.country)}`;
        return `| ${longDate(localDate)} | [${event.city}](${link}) | ${event.venue} | ${seller(entry.vividSeats)} | ${seller(entry.ticketNetwork)} |`;
      })
      .join("\n");
    lines.push(`${head}\n${body}`);
    lines.push(
      `Each figure is that site's lowest listed price for that one date, in US dollars, captured between ${utcTime(figures.capturedFrom)} and ${utcTime(figures.capturedTo)}. They are not final totals, and seat location and fees change what you pay. A city link opens every date there.`
    );
    const both = rows.filter(({ entry }) => entry.vividSeats != null && entry.ticketNetwork != null);
    const vividLower = both.filter(({ entry }) => entry.vividSeats < entry.ticketNetwork).length;
    const networkLower = both.filter(({ entry }) => entry.ticketNetwork < entry.vividSeats).length;
    lines.push(
      `Vivid Seats had a price for ${current.vividSeatsDates} of these dates and TicketNetwork for ${current.ticketNetworkDates}. In the table, Vivid Seats is lower on ${vividLower} date${vividLower === 1 ? "" : "s"} and TicketNetwork on ${networkLower}, so the cheaper site changes from date to date.`
    );
  }

  lines.push(`## How prices moved before shows that have played`);
  lines.push(
    `For ${runUp.shows} ${artist} shows held between ${longDate(runUp.firstShow)} and ${longDate(runUp.lastShow)} in ${runUp.showCities.join(", ")}, each site's lowest listed price about a month out was compared with its own lowest listed price two days before the same show.`
  );
  const head = "| Site | Shows | Lower | Higher | About the same | Typical change |\n|---|---|---|---|---|---|";
  const body = runUp.bySeller.map((row) => `| ${row.site} | ${row.comparisons} | ${row.lower} | ${row.higher} | ${row.same} | ${pct(row.medianPct)} |`).join("\n");
  lines.push(`${head}\n${body}`);
  lines.push(`${runUp.note} "About the same" means within 2% either way, and "typical change" is the median of the comparisons. This is a record of these shows, not a forecast.`);

  lines.push(`## What to do with this`);
  lines.push(
    [
      `- **Compare dates.** Figures differ a lot from one date to the next, so check more than one city if you can travel.`,
      `- **Check both sites for your date.** Open the date from its city page to see each site's listing side by side.`,
      `- **Don't treat the history as a rule.** It covers shows that have already played, so it gives no best day to buy this tour.`,
      `- **Check the total.** These are starting prices. The final total, with fees, is shown at checkout.`
    ].join("\n")
  );

  lines.push(`## How this was worked out`);
  const method = [
    `- **Current prices:** the lowest listed price for each date on Vivid Seats and TicketNetwork, from TourTicketCompare's stored snapshots, captured as shown above. One currency (US dollars), no conversion.`,
    `- **StubHub International:** not used. On North American dates its feed shows placeholder figures at some shows, so this page does not rank on them.`,
    `- **Price history:** a daily record of each site's lowest listed price, ${longDate(runUp.firstObserved)} to ${longDate(runUp.lastObserved)}. For each show, the reading closest to 30 days out (within 21 to 40 days) against the reading closest to 2 days out (within 0 to 4 days). A single reading that jumped to under half or over double both its neighbours and reverted was dropped as a feed glitch.`,
    `- **Sample:** ${runUp.shows} shows and ${runUpTotal} site-by-show comparisons. Each site is compared only with itself, and a show appears once for each site that had both readings. Others are left out.`,
    `- **Limits:** these are listed asking prices for the cheapest seat, not sales, and the fee basis is not confirmed. Seller listings come and go, so the cheapest seat is a different seat from one day to the next.`
  ];
  if (current?.scope) method.push(`- **Scope:** ${current.scope}.`);
  lines.push(method.join("\n"));

  const links = [`[${artist} dates and sellers](/artists/${slug})`];
  if (figures.pricePath) links.push(`[${artist} ticket price guide](${figures.pricePath})`);
  links.push(`[compare prices for a specific show](/compare-concert-ticket-prices)`);
  lines.push(`More: ${links.join(" · ")}.`);

  const related = figures.relatedGuides || ["why-ticket-prices-change", "when-is-the-best-time-to-buy-concert-tickets"];
  const description = first
    ? `The lowest listed ${artist} prices on ${nextDate}, which sellers list each date, and how prices moved before ${runUp.shows} shows that have already played.`
    : `How prices moved before ${runUp.shows} ${artist} shows that have already played, and what to check before you buy.`;
  const frontMatter = [
    "---",
    `title: "How to get the cheapest ${artist} tickets"`,
    `seo_title: "Cheapest ${artist} tickets"`,
    `description: "${description.replace(/"/g, "'")}"`,
    `summary: "${artist} ticket prices by date and site on ${nextDate}, and what prices did before ${runUp.shows} shows that have already played."`,
    `date: ${asOf}`,
    "status: published",
    "tags:",
    "  - tour-data",
    "  - ticket-prices",
    "related_artists:",
    `  - ${slug}`,
    "related_guides:",
    ...related.map((guide) => `  - ${guide}`),
    "---",
    ""
  ].join("\n");
  return `${frontMatter}\n${lines.join("\n\n")}\n`;
}

async function main() {
  if (!/^[a-z0-9-]+$/.test(artistSlug)) {
    console.error("cheapest-guide: pass --artist <slug>");
    process.exit(1);
  }
  const figures = JSON.parse(await fs.readFile(path.join(root, "reports/cheapest-guides", artistSlug, "figures.json"), "utf8"));
  const text = renderGuide(figures);
  const target = path.join(root, "content/blog", `${slugFor(artistSlug)}.md`);
  if (checkOnly) {
    const onDisk = await fs.readFile(target, "utf8").catch(() => "");
    if (onDisk !== text) {
      console.error(`cheapest-guide: ${slugFor(artistSlug)}.md is out of date with its figures; rerun without --check`);
      process.exit(1);
    }
    console.log(`cheapest-guide: ${slugFor(artistSlug)}.md matches its figures`);
    return;
  }
  await fs.writeFile(target, text);
  console.log(`Wrote content/blog/${slugFor(artistSlug)}.md`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
