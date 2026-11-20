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
  "/artists/don-omar/ticket-prices",
  // Batch 2 (20 Nov 2026, Search Console 3 months to 18 Nov): position 7-9 with
  // a click-through rate under 1%.
  "/artists/sombr/ticket-prices",
  "/artists/trans-siberian-orchestra/ticket-prices",
  "/artists/alex-warren/ticket-prices",
  "/artists/marc-anthony/ticket-prices"
]);

export const ARTIST_FOCUS_PATHS = new Set([
  "/artists/sienna-spiro",
  "/artists/olivia-rodrigo",
  "/artists/saint-levant",
  "/artists/katseye",
  // Batch 2 (20 Nov 2026): position 9-20, click-through rate under 1.4%. The
  // "Compare ... ticket prices" snippet still needs a live two-seller date.
  "/artists/lizzy-mcalpine",
  "/artists/nickelback",
  "/artists/bruno-mars",
  "/artists/def-leppard",
  "/artists/sam-fender",
  "/artists/karol-g",
  "/artists/greta-van-fleet",
  "/artists/shania-twain",
  "/artists/malcolm-todd",
  "/artists/staind",
  "/artists/fontaines-d-c",
  "/artists/john-summit",
  "/artists/sombr"
]);

export const PRESALE_FOCUS_PATHS = new Set([
  "/artists/noah-kahan/presale",
  // Batch 2 (20 Nov 2026): each has a Ticketmaster presale window listed now.
  "/artists/stray-kids/presale",
  "/artists/sam-fender/presale",
  "/artists/morgan-wallen/presale",
  "/artists/kings-of-leon/presale",
  "/artists/u2/presale",
  "/artists/bon-jovi/presale"
]);
