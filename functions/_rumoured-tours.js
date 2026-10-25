import watchlist from "../data/artist-watchlist.json" with { type: "json" };

// /tours/2027/rumoured: unconfirmed 2027 tours, one named source link each.
// Drawn from the "rumoured" entries in data/artist-watchlist.json and nothing
// else. It carries no dates, venues, prices or ticket links, so it cannot
// disagree with an artist page. An artist drops off the moment it has a page
// (a tour was announced and onboarded), and the page is noindex while empty.

export const RUMOURED_TOURS_PATH = "/tours/2027/rumoured";
export const RUMOURED_TOURS_INDEXABLE = true;

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
 * @param {{artists?: any[]}} [list] artist-watchlist.json.
 */
export function deriveRumouredTours(catalog, list = watchlist) {
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
