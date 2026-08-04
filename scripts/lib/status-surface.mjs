// The PROJECT_STATUS.md figures that move with the calendar rather than with a
// data edit — the route surface and the empty-boarded artist list.
//
// These were the last hand-maintained numbers in the file, and they drifted for
// exactly the reason the scalar counts used to: nothing recomputed them on the
// days the data moved. `scripts/validate-status-counts.mjs` cannot own them,
// because "is this route indexable?" is only truthfully answered by rendering
// the route and reading its robots meta — an 18-second crawl that would
// otherwise run three times per `test:mvp`. So the audit, which already does
// that crawl, owns them, and this module holds the anchors both sides read.
//
// Contract, mirroring validate-status-counts.mjs:
//   - an anchor that matches exactly once is checked and may be rewritten;
//   - an anchor that is missing or ambiguous is skipped with a warning, never
//     guessed at — a reworded sentence must surface as drift, not vanish;
//   - writes replace only the captured spans, so surrounding prose survives.

export const SURFACE_TYPES = [
  "home",
  "index",
  "static",
  "guide",
  "blog-post",
  "blog-tag",
  "artist",
  "city",
  "venue",
  "artist-city"
];

const iso = (date) => new Date(date).toISOString().slice(0, 10);

/**
 * Render the generated route-surface sentence from an audit summary.
 * The writer replaces the whole sentence, so its shape lives in one place.
 */
export function renderSurfaceLine(summary) {
  const byType = SURFACE_TYPES.map((type) => {
    const row = summary.totals?.[type] || { rendered: 0, indexable: 0 };
    return `${type} ${row.rendered}/${row.indexable}`;
  }).join(" · ");
  return (
    `Generated ${iso(summary.generated_at)}: **${summary.overall.rendered} rendered / ` +
    `${summary.overall.indexable} indexable**. By type (rendered/indexable): ${byType}.`
  );
}

/**
 * Render the generated empty-board sentence. Both figures come from the same
 * `artistPageIndexable` gate the router and sitemap read, so the file cannot
 * claim a page is live that renders `noindex`.
 */
export function renderEmptyBoardLine({ generatedAt, editoriallyIndexable, emptySlugs, zeroEventSlugs }) {
  const live = editoriallyIndexable - emptySlugs.length;
  const empties = emptySlugs.length
    ? `${emptySlugs.length} of the ${editoriallyIndexable} editorially-indexable artists have no upcoming date and render \`noindex,follow\` — ${emptySlugs.join(", ")} — leaving **${live} live artist pages**`
    : `every one of the ${editoriallyIndexable} editorially-indexable artists currently has an upcoming date, so all **${live}** render \`index,follow\``;
  const neverHad = zeroEventSlugs.length
    ? `; ${zeroEventSlugs.length} of them (${zeroEventSlugs.join(", ")}) have never had an event record`
    : "";
  return `Generated ${iso(generatedAt)}: ${empties}${neverHad}.`;
}

// Each entry owns one generated sentence. `re` must capture the replaceable
// span in group 1 and match exactly once in the document.
export const SURFACE_ANCHORS = [
  {
    key: "route-surface",
    re: /<!-- generated:route-surface -->\s*(.+?)\s*<!-- \/generated:route-surface -->/s,
    render: (input) => renderSurfaceLine(input.summary)
  },
  {
    key: "empty-boards",
    re: /<!-- generated:empty-boards -->\s*(.+?)\s*<!-- \/generated:empty-boards -->/s,
    render: (input) => renderEmptyBoardLine(input.emptyBoards)
  }
];

function globalOf(re) {
  return new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
}
function withIndices(re) {
  return new RegExp(re.source, re.flags.includes("d") ? re.flags : `${re.flags}d`);
}

/**
 * @returns {{divergences: Array, missing: Array, writeOps: Array}}
 */
export function checkSurface(text, input) {
  const divergences = [];
  const missing = [];
  const writeOps = [];
  for (const anchor of SURFACE_ANCHORS) {
    const hits = [...text.matchAll(globalOf(anchor.re))].length;
    if (hits !== 1) {
      missing.push({ key: anchor.key, reason: hits === 0 ? "anchor not found" : `anchor matched ${hits}× (ambiguous)` });
      continue;
    }
    const match = withIndices(anchor.re).exec(text);
    const expected = anchor.render(input);
    const found = match[1];
    if (found !== expected) {
      divergences.push({ key: anchor.key, found, expected });
      writeOps.push({ span: match.indices[1], value: expected });
    }
  }
  return { divergences, missing, writeOps };
}

export function applySurfaceWrites(text, writeOps) {
  const ops = [...writeOps].sort((a, b) => b.span[0] - a.span[0]);
  let out = text;
  for (const op of ops) out = out.slice(0, op.span[0]) + op.value + out.slice(op.span[1]);
  return out;
}

/**
 * Which editorially-indexable artists currently have no upcoming show, using
 * the same gate module the router and sitemap use.
 */
export function computeEmptyBoards({ artistsMeta, events, artistIndexabilityModule, now = Date.now() }) {
  const editorial = artistsMeta.filter(
    (artist) => artist?.indexing_status === artistIndexabilityModule.INDEXABLE_ARTIST_STATUS
  );
  const hasUpcoming = (slug) =>
    artistIndexabilityModule.artistPageIndexable(
      artistIndexabilityModule.INDEXABLE_ARTIST_STATUS,
      events,
      slug,
      now
    );
  const eventCount = new Map();
  for (const event of events) {
    const slug = String(event?.artist_slug || "").trim();
    eventCount.set(slug, (eventCount.get(slug) || 0) + 1);
  }
  const emptySlugs = [];
  const zeroEventSlugs = [];
  for (const artist of editorial) {
    const slug = String(artist?.slug || "").trim();
    if (!slug || hasUpcoming(slug)) continue;
    emptySlugs.push(slug);
    if (!eventCount.get(slug)) zeroEventSlugs.push(slug);
  }
  return { generatedAt: now, editoriallyIndexable: editorial.length, emptySlugs, zeroEventSlugs };
}
