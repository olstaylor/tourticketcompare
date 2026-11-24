---
title: "Weeknight or weekend: which night of a multi-night run lists cheaper?"
seo_title: "Weeknight or weekend concert nights"
description: "In 94 US multi-night runs, the lowest resale listing for Friday and Saturday nights was about 9% higher on average than for the run's other nights."
summary: "For 248 shows in 94 multi-night US concert runs, TourTicketCompare compared each night's lowest listed resale price with the rest of the same run. Friday and Saturday nights listed about 9% higher on average, on all three sites. The first and last nights showed no pattern."
date: 2026-11-29
status: draft
review: automated
tags:
  - tour-data
  - ticket-prices
related_guides:
  - why-ticket-prices-change
  - how-to-compare-concert-ticket-prices
---

When an artist plays several nights at one venue, the Friday and Saturday shows list higher. TourTicketCompare compared each night's lowest listed resale price with the other nights of the same run, on the same site and day. Across 248 US shows in 94 runs by 56 artists, Friday and Saturday nights averaged 9.1 percentage points higher than the run's other nights. On the average listed price in this sample, $194, that is roughly $16 to $18. It is a record of autumn 2026 listings, not a forecast for any show.

## How it was tested

A run is one artist's nights at one city, no more than three days apart. For each site and each day, every night of the run needed a recorded lowest listed price. Each night was then compared with the run's average that day, so the level of the artist's prices and any drift over time cancel out. Friday and Saturday were picked as the "weekend" nights before looking at the results. Only runs with both weekend and other nights count.

The readings run from 15 September to 21 November 2026 and are at least 14 days before the first night, so final-week moves are left out. Prices of $1,000 or more were excluded as placeholders. Results were averaged within each artist first, then across artists. The largest artist is 11% of the readings.

## What it shows

- **Average gap: 9.1 percentage points** (Friday and Saturday higher), and 77% of the 56 artists went the same way.
- **The typical artist's gap was 8.5 points.** For a quarter of artists there was no gap at all.
- **Every site agreed**, comparing each only with itself:

| Site | Artists | Runs | Friday/Saturday vs other nights | Artists with a higher weekend |
|---|---|---|---|---|
| StubHub International | 32 | 63 | +14.5 points | 91% |
| Vivid Seats | 47 | 81 | +12.3 points | 89% |
| TicketNetwork | 52 | 89 | +8.2 points | 75% |

- **It held in both halves of the period.** From 15 September to 24 October the gap was 10.6 points (35 artists). From 25 October to 21 November it was 10.6 points (50 artists).

The first and last nights of a run showed no pattern once the weekday was ignored.

## What this does and doesn't say

- **It is a gap in listings, not in what people paid.** The site sees the lowest listed price, not completed sales.
- **It is not a rule for any one run.** Individual run-days moved by about 21 points on average, so this is a tendency across many runs.
- **It does not say a midweek night is better.** Seat quality, travel and what else is on differ by night. Check the full total, with fees, before paying.
- **It is a lowest listing, not every seat.** A different listing becoming the cheapest can move it.
- **Show weekdays are approximated** from the start time, six hours behind UTC, to match US evening shows.

For your own dates, open the artist's page, where each night has its own buttons with the time the price was checked. Pick the night first and compare only listings for that night. The guides on [choosing a Metallica Sphere night](/blog/choosing-a-metallica-sphere-night) and [a Harry Styles Madison Square Garden night](/blog/choosing-a-harry-styles-madison-square-garden-night) cover the non-price differences, and [why ticket prices change](/guides/why-ticket-prices-change) explains what moves them. The query is in the repository under `reports/data-stories/weekend-or-weeknight-multi-night-concert-ticket-prices/`.
