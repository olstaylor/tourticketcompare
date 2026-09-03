---
title: Why a price on this site disappears
seo_title: Why a price disappears
description: A price shown here has an expiry stamped on it and several gates behind it. When any one of them fails the figure vanishes rather than going stale. Here is why.
summary: A figure that was on an event card an hour ago can be gone now. That is the price system working as designed — snapshots expire, the gates fail closed, and a blank space is the honest output.
date: 2026-08-19
updated: 2026-09-03
status: published
tags:
  - ticket-prices
  - how-we-work
related_guides:
  - why-ticket-prices-change
  - concert-ticket-fees-explained
  - how-resale-ticket-pricing-works
---

You opened an event card this morning and a provider button carried a figure. You have come back to book and the figure has gone — same show, same button, no number. Nothing broke. That blank is a deliberate output, and it is worth explaining what produced it, because a site that quietly left the old figure there would look more helpful while telling you less.

## A snapshot has an expiry stamped on it

A price here is one provider's listed figure for one verified show, captured at a recorded moment. It is written with a hard expiry six hours out, and the capture lanes run every two hours — comfortably inside that window, so an ordinary run keeps the figure current. When a run cannot fetch, or the provider's feed stops carrying that event, no new observation lands, and the existing one simply ages past its expiry and stops rendering.

Nothing is refreshed in place and no last-known value is left standing. The figure was true at the time printed next to it; past its expiry there is no longer any evidence for it, so it is not shown. [What a price snapshot actually is](/blog/what-a-price-snapshot-actually-is) covers the shape of the underlying claim in more detail.

## The gate has more than one door, and all of them fail closed

Expiry is only one of the conditions. Before any figure renders, the provider must have display rights, the row must map to that exact show rather than a nearby date, the destination URL must carry its own verified provenance, the provider's display flag must be on, and the stored figure must be a plausible number in a real currency. A single failure hides the figure. None of them degrade into a partial answer.

That produces one consequence worth knowing about: a price can disappear because something changed about the *event record*, not about the price. If a show's provenance gets re-flagged for checking, or its provider link is cleared after a confirmed mismatch, the figure attached to that lane goes with it. The number is downstream of the link, and the link is downstream of the evidence.

## Some providers never show a figure at all

If a provider on a card has never carried a price for you, that is structural rather than a gap in coverage. SeatGeek has no pricing lane here at all — the API returns no pricing statistics for this site's client, permanently — so it is a checked-link provider and nothing more. Ticket Liquidator's catalogue carries no numeric listed price, so its lane stays price-disabled while its links stay live. Ticketmaster is a verification and link source rather than a price lane.

Their silence tells you about the feed behind them, not about the show or its demand.

## What does not happen when a snapshot lapses

No last-known value is held over. No "from" estimate is generated. Nothing is averaged across providers, filled in from a different date, or borrowed from another seat. No provider is promoted up the card because it still has a figure and its neighbours do not — the order is fixed and is not a ranking. A blank beats a stale number that reads as current, and it beats an invented one by a wider margin still.

## What the blank actually leaves you

The link. The expiry removes the figure, not the destination: the button is still there, still checked, and still goes to that exact show. The provider's own page is the only place a current figure and a final total are settled anyway, once fees, delivery and tax are added, so a card that has lost its snapshot has lost a starting point rather than the answer.

Where a card does have a current snapshot, it also carries a snapshot history — up to ninety days of what that provider's listed figure has been for that show, which is a better guide to whether today's number is unusual than any single reading, present or missing.

## The short version

Prices here are timestamped observations with a shelf life, not a live feed. When the shelf life runs out, or any of the gates behind the figure stops passing, the number goes and the checked link stays. That is the system keeping its promise rather than breaking it.
