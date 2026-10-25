// /tours/2027/rumoured: unconfirmed 2027 tours, one named source link each.
// Entries mirror the "rumoured" rows of data/artist-watchlist.json (functions
// cannot import data/, the same reason EVENT_INDEXING_BATCHES is a JS list);
// edit both together. Nothing else feeds it. It carries no dates, venues,
// prices or ticket links, so it cannot disagree with an artist page. An artist drops off the moment it has a page
// (a tour was announced and onboarded), and the page is noindex while empty.

export const RUMOURED_TOURS_PATH = "/tours/2027/rumoured";
export const RUMOURED_TOURS_INDEXABLE = true;

/** @type {ReadonlyArray<{name: string, note: string, source_url: string, added: string}>} */
const RUMOURED_WATCHLIST = Object.freeze([
  Object.freeze({ name: "Taylor Swift", note: "Reported (anonymous sources) to be planning a 2027 tour; nothing announced.", source_url: "https://www.yahoo.com/entertainment/music/articles/taylor-swift-reportedly-planning-2027-103043096.html", added: "2026-10-11" }),
  Object.freeze({ name: "Drake", note: "Said he plans to tour in 2027; no dates.", source_url: "https://www.vividseats.com/blog/2027-concert-tour-predictions", added: "2026-10-11" }),
  Object.freeze({ name: "Cardi B", note: "Said in an interview she expects a large 2027 tour including Europe; no dates.", source_url: "https://www.vividseats.com/blog/2027-concert-tour-predictions", added: "2026-10-11" }),
  Object.freeze({ name: "Luis Miguel", note: "Teased \"Luis Miguel Tour 2027\" on social media; no dates.", source_url: "https://www.vividseats.com/blog/2027-concert-tour-predictions", added: "2026-10-11" }),
  Object.freeze({ name: "Justin Bieber", note: "Insiders reportedly point to a 2027 return to touring; unconfirmed.", source_url: "https://engagehospitality.co.uk/big-rumoured-concerts-for-2027/", added: "2026-10-11" }),
  Object.freeze({ name: "U2", note: "Adam Clayton reportedly suggested a 2026 or 2027 tour depending on the next album.", source_url: "https://engagehospitality.co.uk/big-rumoured-concerts-for-2027/", added: "2026-10-11" }),
  Object.freeze({ name: "Celine Dion", note: "Listed as a trending 2027 tour in a ticketing-industry blog; no tour has been announced.", source_url: "https://www.vividseats.com/blog/2027-concert-tour-predictions", added: "2026-10-11" })
]);

function trimmed(value) {
  return String(value ?? "").trim();
}

function sourceHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * @param {{artists?: any[]}} catalog catalog.json; artists already in it are left out.
 * @param {{artists?: any[]}} [list] Watchlist-shaped rows; defaults to the mirrored list.
 */
export function deriveRumouredTours(catalog, list = { artists: RUMOURED_WATCHLIST.map((item) => ({ ...item, reason: "rumoured" })) }) {
  const known = new Set();
  for (const artist of catalog?.artists || []) {
    known.add(trimmed(artist.name).toLowerCase());
    known.add(trimmed(artist.slug).toLowerCase());
  }
  const seen = new Set();
  const entries = [];
  for (const item of list?.artists || []) {
    const name = trimmed(item?.name);
    const url = trimmed(item?.source_url);
    if (item?.reason !== "rumoured" || !name || !/^https:\/\//.test(url)) continue;
    const host = sourceHost(url);
    const key = name.toLowerCase();
    if (!host || seen.has(key) || known.has(key)) continue;
    seen.add(key);
    entries.push({ name, note: trimmed(item.note), sourceUrl: url, sourceName: host, added: trimmed(item.added) });
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));
  return { entries, entryCount: entries.length, indexable: RUMOURED_TOURS_INDEXABLE && entries.length > 0 };
}
