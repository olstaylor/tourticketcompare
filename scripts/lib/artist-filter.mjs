// Shared `--artist` filter semantics for the provider sync scripts.
//
// The SeatGeek enrichment and verification lanes are two halves of one nightly
// workflow, but they used to disagree about what `--artist` meant: verification
// compared the raw `artist_slug` exactly, while enrichment additionally matched
// on a substring of the artist NAME in both directions. A substring filter is
// not a filter you can reason about — `--artist sombr` would also sweep in any
// artist whose normalized name contains "sombr", and an operator scoping a run
// to one artist would silently spend the API budget on another.
//
// One rule for both: a filter matches an event when it names that event's
// artist exactly, given as either the slug or the artist name. Nothing fuzzy.

function clean(value, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

/** Lowercase hyphenated key for an artist slug or name. */
export function artistKey(value) {
  return clean(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Does this event belong to the artist named by `filter`?
 * An empty filter matches everything (no filter applied).
 *
 * @param {any} event Raw events.json record.
 * @param {string} filter Artist slug or artist name from `--artist`.
 * @returns {boolean}
 */
export function eventMatchesArtistFilter(event, filter) {
  const wanted = artistKey(filter);
  if (!wanted) return true;
  return artistKey(event?.artist_slug) === wanted || artistKey(event?.artist_name) === wanted;
}
