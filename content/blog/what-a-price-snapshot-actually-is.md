---
title: What a price snapshot actually is (and what it is not)
seo_title: What a price snapshot actually is
description: A price here is one provider's listed figure for one exact show, captured at a stated time and expiring 24 hours later, not live inventory.
summary: When a figure appears on an event card here it is a snapshot: one provider's listed price for that exact show, captured at a stated moment and expiring within a day. That is a narrower claim than it looks, and the difference matters at checkout.
date: 2026-08-01
updated: 2026-09-24
status: published
tags:
  - how-we-work
  - ticket-prices
related_guides:
  - concert-ticket-fees-explained
  - why-ticket-prices-change
  - how-to-compare-concert-ticket-prices
---

When a figure appears on a ticket button here, it is one ticket site's lowest listed price for that one show, with the time we checked it. That's a narrower claim than "price" usually makes. On ticket sites the word can mean a starting figure, a per-ticket figure before fees, a figure for a section with two seats left, or the number you actually pay.

## One provider, one show, one moment

A snapshot is the lowest listed figure a single provider's approved feed carried for a single verified show, recorded with the time it was captured. It is stored, displayed with that timestamp, and expires. It isn't an average, a market rate, a figure we calculated, or the total you'll pay. Fees, delivery and tax land later, on the ticket site's own checkout.

Several conditions all have to hold before it renders at all: the provider must have granted display rights, the record must map to that exact show rather than a nearby one, the destination URL must carry its own verified provenance, the provider's display flag must be on, and the observation must not have expired. If any one of those fails, no figure appears. The absence of a price on a card is a real output, not a rendering bug.

## Why snapshots expire

Listed prices move, and a figure with no expiry quietly becomes a claim nobody is standing behind. So each snapshot is written with a hard expiry 24 hours out, and the jobs that capture them are scheduled hourly. The gap between those two numbers is deliberate. If a capture run fails, or a feed goes quiet, the figure already on the card stays rather than the card going blank, and the note under the buttons always says how long ago it was checked ("Checked 5 hours ago"). Past 24 hours there's no longer enough evidence behind it, and it stops showing.

That's why every price here comes with its age. The timestamp isn't a disclaimer bolted on afterwards; it's the part that makes the number honest.

## Not every provider has one

Providers differ in what their feeds expose, and the gaps are not filled by guessing. Vivid Seats, TicketNetwork and StubHub International supply numeric listed prices under agreements that permit displaying them, so their buttons can carry a figure. SeatGeek has no price lane here and never will: its API returns no prices to us, so it stays a checked link. Ticket Liquidator's catalogue carries no numeric listed price, so its lane is link-only too. Ticketmaster is a verification and link source here rather than a price lane.

The visible consequence is asymmetry: one show may display a figure from two providers and a plain link from three more. That is the data being reported accurately rather than flattened into a tidier-looking table.

## What the ordering is, and is not

Buttons appear in a fixed order: sites that pay us a commission first, the unpaid Ticketmaster link last. The page says so next to the buttons. The order is the same whether or not any figure is present. It isn't a ranking, and nothing on the card sorts by price or points at a "best" option.

The reason is that per-provider snapshots captured at different moments are not like-for-like offers, and ordering them as if they were would imply a comparison the underlying data cannot support. Calling one figure lower than another is only defensible with current figures for both sides, described for what they are: provider-supplied listed-price snapshots, each with its own timestamp. Nothing here claims availability either. There's no stock feed behind this site, and inventing one would be worse than saying nothing.

What a snapshot is genuinely good for is narrowing the field before you open two or three tabs. The final number is the provider's order summary after fees, delivery and tax, and [the guide to ticket fees](/guides/concert-ticket-fees-explained) covers what tends to get added between the headline and the total.
