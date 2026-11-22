---
title: "Is there a cheapest day of the week to check resale concert prices?"
seo_title: "Cheapest day to check concert prices?"
description: "Across 281,915 daily readings for 4,066 shows, resale prices were about 0.8% higher early in the week than on Fridays and Saturdays. Too small to plan around."
summary: "Advice columns often name a best weekday for concert tickets. TourTicketCompare tested it on 281,915 daily readings of the lowest listed resale price. Mondays and Tuesdays ran slightly higher and Fridays and Saturdays slightly lower, but the gap was under one percentage point, about a dollar on a typical ticket."
date: 2026-11-22
status: published
review: automated
tags:
  - tour-data
  - ticket-prices
related_guides:
  - when-is-the-best-time-to-buy-concert-tickets
  - why-ticket-prices-change
---

Plenty of money sites say there is a best day of the week to buy concert tickets. TourTicketCompare tested that on the daily record it keeps of the lowest listed resale price on Vivid Seats, TicketNetwork and StubHub International. There is a pattern, but it is small: across 281,915 readings, prices were about 0.8% higher on Monday to Wednesday than on Friday and Saturday. On the typical listed price in this sample, $129, that is roughly a dollar.

## How it was tested

Each reading is one site's lowest listed price for one show at its last check of a day (days in UTC, checks around 10 to 11am US Eastern). Each was compared with the average of the other readings for the same show on the same site, within three days either side. A seven-day window contains every weekday once, so a price drifting up or down over the week cancels out.

The sample is readings from 15 September to 18 November 2026 that were at least 14 days before the show, so end-of-run falls do not distort it. Readings of $1,000 or more were left out as placeholders. That leaves 281,915 readings for 4,066 shows by 238 artists, mostly in the US. No artist makes up more than 4% of the readings. To stop heavily tracked artists dominating, the readings were averaged within each artist first, then across artists.

## What the data shows

| Day | Artists | Listed price vs the rest of that week | Artists above their own average |
|---|---|---|---|
| Monday | 229 | +0.5% | 56% |
| Tuesday | 231 | +0.7% | 54% |
| Wednesday | 233 | -0.3% | 45% |
| Thursday | 224 | -0.3% | 48% |
| Friday | 226 | -0.6% | 38% |
| Saturday | 227 | -0.5% | 38% |
| Sunday | 230 | 0.0% | 47% |

Taking Monday to Wednesday against Friday and Saturday, the gap was 0.8 percentage points. It pointed the same way on every site: 1.0 points on StubHub International, 0.9 on TicketNetwork and 0.5 on Vivid Seats. Each site is compared only with itself, and this does not rank them.

## Why it is not worth planning around

- **It is small.** A show's lowest listed price normally moves by about 3% from one day to the next. The weekday effect is a quarter of that.
- **It is not consistent.** At 60% of artists, early-week prices were higher than Friday and Saturday. At 40% they were not.
- **It was not there all year.** From July to mid-September, when far fewer artists were tracked, there was no consistent weekday pattern.
- **The grouping was chosen after looking.** Monday to Wednesday against Friday and Saturday is how the table naturally split, so the confidence is weaker than the numbers suggest.
- **The cause is unknown.** It could be how sellers reprice, when the site checks, or which shows are on sale which days.

So this is not advice to wait for Friday. Which show you want, and how close it is, matter far more than the weekday you look.

## Where the bigger moves are

Two timing patterns in the site's data were larger and met a stricter evidence bar. For US shows, the lowest listed price the day before a show was [lower than a week earlier at 59% of 421 shows](/blog/do-concert-ticket-prices-drop-in-the-last-week). Two weeks after TourTicketCompare first recorded a price for a new tour's shows, it was [lower at 49% of 1,608 shows and higher at 24%](/blog/do-resale-ticket-prices-drop-after-a-tour-goes-on-sale). Both are records of past shows, not forecasts.

## What this does and doesn't say

- **It is the lowest listed price, not every seat.** A change can mean a different listing became the cheapest, not that every ticket moved.
- **It is not a checkout total.** Fees and delivery differ between sites and listings. Check the full total before you pay.
- **It is not completed sales.** The site does not see what sold.
- **It is a record of autumn 2026,** not a forecast for any show.

For the current listed price of any show, with the time it was checked, open the artist's page. The [guide to when to buy concert tickets](/guides/when-is-the-best-time-to-buy-concert-tickets) covers the trade-offs beyond price, and [why ticket prices change](/guides/why-ticket-prices-change) explains what moves them. The query is in the project repository under `reports/data-stories/is-there-a-cheapest-day-to-check-resale-concert-prices/`.
