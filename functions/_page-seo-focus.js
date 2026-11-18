// Pages in a one-off title/description experiment (Search Console, 28 days to
// 13 Nov 2026): each ranks at position 5-20 with a click-through rate under 1%,
// and the queries that reach it ask "how much are <artist> tickets" or "compare
// <artist> ticket prices". Only the metadata lead changes on these pages. Every
// figure is still the one the page prints (same date, site and check time), and
// no template, canonical, robots or indexing rule is touched. Read the effect
// around 8 Dec 2026 against the same pages, then fold the winner into the
// templates or drop the list.
export const PRICE_GUIDE_FOCUS_PATHS = new Set([
  "/artists/kings-of-leon/ticket-prices",
  "/artists/sienna-spiro/ticket-prices",
  "/artists/zach-bryan/ticket-prices",
  "/artists/olivia-rodrigo/ticket-prices",
  "/artists/don-omar/ticket-prices"
]);

export const ARTIST_FOCUS_PATHS = new Set([
  "/artists/sienna-spiro",
  "/artists/olivia-rodrigo",
  "/artists/saint-levant",
  "/artists/katseye"
]);

export const PRESALE_FOCUS_PATHS = new Set(["/artists/noah-kahan/presale"]);
