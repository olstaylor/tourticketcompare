// The shape of public/data/events-index.json, in one place.
//
// scripts/partition-events.py writes that file as part of `npm run
// events:partition`, and this module is the JavaScript mirror of its
// INDEX_FIELDS and its row projection. Two consumers need it: the standalone
// timezone backfill, which edits events.json without going through the Python
// generator and so has to keep the index in step itself, and
// validate-partitions.mjs, which checks the two agree.
//
// The Python list and this one must move together. Adding a field there
// without adding it here leaves the new field unchecked and un-backfilled,
// silently; adding it here first fails validation until the generator catches
// up, loudly. The loud direction is the safe one, which is why the mirror is
// here rather than inferred from whatever the file happens to contain.

export const INDEX_FIELDS = Object.freeze([
  "id",
  "artist_slug",
  "artist_name",
  "country",
  "city",
  "venue",
  "datetime_iso",
  "timezone",
  "tour_name",
  "status",
]);

/**
 * Project one event into its index row.
 *
 * Mirrors the generator's dict comprehension exactly: a field the event does
 * not carry is absent from the row rather than present and null. That
 * distinction is load-bearing for the validator — a row holding a key the
 * master event lacks is drift, not a formatting difference.
 */
export function indexRowFor(event) {
  const row = {};
  for (const field of INDEX_FIELDS) {
    if (field in event) row[field] = event[field];
  }
  return row;
}

/**
 * Build the whole index, in events.json order.
 *
 * Order is part of the contract, not a detail: public/ttc-home.js filters the
 * index and then truncates with `.slice(0, 12)` without sorting first, so the
 * file's order decides which matching shows a visitor is shown.
 */
export function buildEventsIndex(events) {
  return events.map((event) => indexRowFor(event));
}

/** Serialize the index the way the Python generator writes it. */
export function serializeEventsIndex(events) {
  return `${JSON.stringify(buildEventsIndex(events), null, 2)}\n`;
}
