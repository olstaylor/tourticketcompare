//
// tm-ingestion-outcomes.mjs
//
// Observability for the automatic new-show ingestion loop
// (.github/workflows/tm-new-shows-pr.yml → scripts/sync-tm-events-write-pr.mjs
// → scripts/sync-ticketmaster-events.py). Diagnostics ONLY: nothing here
// decides whether a show is published, relaxes an eligibility rule, or touches
// event data. It reads the recogniser report plus the writer's own before/after
// view of events.json and answers three questions a run previously could not:
//
//   1. What happened to every candidate the recogniser discovered?
//      Each one gets exactly one deterministic result — `added`, `duplicate`,
//      or `withheld`. No candidate may fall through unaccounted (assertAccounting
//      makes that a hard failure rather than a silent gap).
//   2. Why was it withheld? Every non-added candidate carries at least one
//      STABLE reason code. The recogniser attaches its codes at the real
//      decision site (WITHHOLD_REASON_CODES in sync-ticketmaster-events.py);
//      the few codes this module adds cover decisions the recogniser cannot
//      see — an artist skipped before its rows were read, and the writer's own
//      post-write reconciliation.
//   3. How much of each? Totals by result and by reason code, per run and per
//      artist, so a withholding path that suddenly swallows a whole roster is
//      visible in one line instead of buried in prose.
//
// Output discipline (SAFE_PUBLISHING_RULES.md): the artifact carries a CAPPED
// sample of affected shows built from a field ALLOWLIST — never a provider
// payload, never a URL (query strings can carry credentials/affiliate tokens),
// never an API key. Host is kept because host allowlisting is a withhold rule.
//
// Pure module: no I/O, no network, no clock of its own (the caller supplies
// `generatedAt`), so the whole thing is directly testable from fixtures.

// ─── Vocabulary ─────────────────────────────────────────────────────────────

export const RESULTS = ["added", "duplicate", "withheld"];

// Codes this module owns. The recogniser's codes are NOT duplicated here — they
// ship inside its report (`withhold_reason_codes`) and are merged into the
// artifact catalogue at build time, so the two can never drift.
export const WRITER_REASON_CODES = {
  artist_not_eligible:
    "Artist failed the registry eligibility gate, so none of its rows were considered.",
  artist_lookup_failed:
    "Live Discovery lookup did not succeed for this artist; writing from a partial fetch is refused.",
  duplicate_existing_event_row:
    "Proposed row's deterministic events.json id already exists in events.json.",
  write_not_applied:
    "Row entered the write batch but is absent from events.json after the write (dropped by the canonical writer).",
  reason_codes_missing_from_report:
    "Recogniser report predates machine-readable reason codes; the withhold rule that fired is unknown.",
};

// A candidate counts as `duplicate` only when duplication is the SOLE reason it
// was held back — anything else in the list means a human still has something to
// look at, so it stays `withheld`.
//
// Tombstoned matches (owner-deleted rows Ticketmaster still lists) are
// deliberately NOT duplicates: they represent a human deletion decision being
// re-litigated by the provider, which is exactly the signal this report exists
// to surface.
export const DUPLICATE_REASON_CODES = new Set([
  "duplicate_existing_event_id",
  "duplicate_existing_venue_date",
  "duplicate_within_batch",
  "duplicate_existing_event_row",
]);

export const SAMPLE_CAP = { perBucket: 3, total: 30 };

const clean = (value) => String(value ?? "").trim();

// ─── Candidate identity ─────────────────────────────────────────────────────

// Stable key for one discovered candidate within a run. Falls back to the row's
// position for rows so broken they carry no id at all (those are always
// withheld, but they still have to be counted).
export function candidateKey(slug, row, index) {
  const id =
    clean(row?.ticketmaster_discovery_event_id) ||
    clean(row?.event_id) ||
    clean(row?.ticketmaster_event_id);
  return `${clean(slug)}|${id || `row-${index}`}`;
}

// Field ALLOWLIST for the sample. Adding a field here is a deliberate act;
// nothing is copied wholesale from the provider payload.
function sampleEvent(row) {
  return {
    discovery_event_id: clean(row?.ticketmaster_discovery_event_id),
    storefront_event_id: clean(row?.ticketmaster_event_id),
    date: clean(row?.datetime_iso).slice(0, 10),
    venue: clean(row?.venue),
    city: clean(row?.city),
    country: clean(row?.country),
    status_code: clean(row?.status_code),
    url_host: clean(row?.resolved_url_host) || clean(row?.raw_url_host),
  };
}

function reasonCodesOf(row) {
  const codes = Array.isArray(row?.withheld_reason_codes)
    ? row.withheld_reason_codes.map(clean).filter(Boolean)
    : [];
  if (codes.length > 0) return codes;
  // A withheld row with no codes came from a report generated before the
  // recogniser emitted them. Say so explicitly rather than inventing a rule.
  return ["reason_codes_missing_from_report"];
}

function resultForWithheld(codes) {
  return codes.length > 0 && codes.every((code) => DUPLICATE_REASON_CODES.has(code))
    ? "duplicate"
    : "withheld";
}

// ─── Outcome derivation ─────────────────────────────────────────────────────

/**
 * One outcome per discovered candidate, in report order.
 *
 * @param {object}  report            recogniser JSON report
 * @param {Map}     proposedIdByKey   candidateKey -> deterministic events.json id
 *                                    (only for rows that entered the write batch)
 * @param {Set}     existingEventIds  events.json ids BEFORE this run
 * @param {Set|null} appliedEventIds  events.json ids AFTER the write, or null
 *                                    when nothing was written (preview run)
 */
export function deriveOutcomes({
  report,
  proposedIdByKey = new Map(),
  existingEventIds = new Set(),
  appliedEventIds = null,
}) {
  const outcomes = [];
  for (const artist of report?.artists || []) {
    const slug = clean(artist?.artist_slug);
    // An artist the writer refused to use taints every row underneath it. The
    // recogniser returns no rows in these states today, but accounting must not
    // depend on that staying true.
    let artistBlock = "";
    if (artist?.eligible === false) artistBlock = "artist_not_eligible";
    else if (clean(artist?.live_lookup) && clean(artist?.live_lookup) !== "ok") {
      artistBlock = "artist_lookup_failed";
    }

    (artist?.rows || []).forEach((row, index) => {
      const key = candidateKey(slug, row, index);
      const event = sampleEvent(row);

      if (artistBlock) {
        outcomes.push({ key, artist_slug: slug, result: "withheld", reason_codes: [artistBlock], event });
        return;
      }

      if (clean(row?.disposition) !== "proposed") {
        const codes = reasonCodesOf(row);
        outcomes.push({ key, artist_slug: slug, result: resultForWithheld(codes), reason_codes: codes, event });
        return;
      }

      // Proposed rows: the recogniser cleared them, so their result comes from
      // what the canonical writer actually did with them.
      const eventsJsonId = clean(proposedIdByKey.get(key));
      if (eventsJsonId && existingEventIds.has(eventsJsonId)) {
        outcomes.push({
          key,
          artist_slug: slug,
          result: "duplicate",
          reason_codes: ["duplicate_existing_event_row"],
          event,
          events_json_id: eventsJsonId,
        });
        return;
      }
      if (appliedEventIds && eventsJsonId && !appliedEventIds.has(eventsJsonId)) {
        outcomes.push({
          key,
          artist_slug: slug,
          result: "withheld",
          reason_codes: ["write_not_applied"],
          event,
          events_json_id: eventsJsonId,
        });
        return;
      }
      outcomes.push({
        key,
        artist_slug: slug,
        result: "added",
        reason_codes: [],
        event,
        ...(eventsJsonId ? { events_json_id: eventsJsonId } : {}),
      });
    });
  }
  return outcomes;
}

// ─── Totals ─────────────────────────────────────────────────────────────────

export function summariseOutcomes(outcomes) {
  const byResult = { added: 0, duplicate: 0, withheld: 0 };
  const byReasonCode = {};
  const byArtist = new Map();
  for (const outcome of outcomes) {
    byResult[outcome.result] = (byResult[outcome.result] || 0) + 1;
    // A candidate can trip several rules; each is counted once, so reason-code
    // totals sum to at least (duplicate + withheld) and need not equal it.
    for (const code of new Set(outcome.reason_codes)) {
      byReasonCode[code] = (byReasonCode[code] || 0) + 1;
    }
    const artist = byArtist.get(outcome.artist_slug) || { slug: outcome.artist_slug, added: 0, duplicate: 0, withheld: 0 };
    artist[outcome.result] += 1;
    byArtist.set(outcome.artist_slug, artist);
  }
  return {
    candidates: outcomes.length,
    by_result: byResult,
    by_reason_code: Object.fromEntries(
      Object.entries(byReasonCode).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    ),
    by_artist: [...byArtist.values()].sort((a, b) => a.slug.localeCompare(b.slug)),
  };
}

// Hard accounting guard: every candidate resolved, every non-added candidate
// explained. Called by the writer and by the tests — a gap here means the
// report is lying, which is worse than no report.
export function assertAccounting(outcomes, summary) {
  const total = summary.by_result.added + summary.by_result.duplicate + summary.by_result.withheld;
  if (total !== outcomes.length) {
    throw new Error(`Ingestion accounting mismatch: ${outcomes.length} candidate(s) but ${total} classified.`);
  }
  for (const outcome of outcomes) {
    if (!RESULTS.includes(outcome.result)) {
      throw new Error(`Ingestion accounting: candidate ${outcome.key} has unknown result '${outcome.result}'.`);
    }
    if (outcome.result !== "added" && outcome.reason_codes.length === 0) {
      throw new Error(`Ingestion accounting: candidate ${outcome.key} is ${outcome.result} with no reason code.`);
    }
  }
  return true;
}

// ─── Capped sampling ────────────────────────────────────────────────────────

// Bucket = what a reader would group by: `added`, or the first reason code that
// fired (recogniser order, so the bucket is the rule that decided the row).
function bucketOf(outcome) {
  return outcome.result === "added" ? "added" : outcome.reason_codes[0];
}

export function sampleOutcomes(outcomes, cap = SAMPLE_CAP) {
  const sorted = [...outcomes].sort(
    (a, b) =>
      a.artist_slug.localeCompare(b.artist_slug) ||
      clean(a.event.date).localeCompare(clean(b.event.date)) ||
      a.key.localeCompare(b.key)
  );
  const perBucket = new Map();
  const picked = [];
  for (const outcome of sorted) {
    if (picked.length >= cap.total) break;
    const bucket = bucketOf(outcome);
    const used = perBucket.get(bucket) || 0;
    if (used >= cap.perBucket) continue;
    perBucket.set(bucket, used + 1);
    picked.push(outcome);
  }
  return {
    cap: { per_bucket: cap.perBucket, total: cap.total },
    shown: picked.length,
    of: outcomes.length,
    truncated: picked.length < outcomes.length,
    outcomes: picked,
  };
}

// ─── Artifact + Markdown ────────────────────────────────────────────────────

export function buildOutcomesArtifact({
  report,
  outcomes,
  mode = "preview",
  applied = false,
  generatedAt,
  artistScope = "all-approved",
  cap = SAMPLE_CAP,
}) {
  const summary = summariseOutcomes(outcomes);
  assertAccounting(outcomes, summary);
  const catalogue = { ...(report?.withhold_reason_codes || {}), ...WRITER_REASON_CODES };
  const skipped = (report?.artists || [])
    .filter((a) => a?.eligible === false || (clean(a?.live_lookup) && clean(a?.live_lookup) !== "ok"))
    .map((a) => ({
      slug: clean(a?.artist_slug),
      reason_code: a?.eligible === false ? "artist_not_eligible" : "artist_lookup_failed",
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    schema_version: 1,
    generated_at: generatedAt,
    run: {
      mode,
      // false on a preview run: `added` then means "would be added", because
      // nothing was written. Never report a write that did not happen.
      applied,
      artist_scope: artistScope,
      artists_attempted: (report?.artists || []).length,
      artists_skipped: skipped,
    },
    totals: summary,
    reason_code_catalogue: catalogue,
    sample: sampleOutcomes(outcomes, cap),
    notes: [
      "Diagnostics only — this artifact changes no eligibility rule and no event data.",
      "`duplicate` means duplication was the only reason a candidate was held back; anything else stays `withheld`.",
      "Sample is capped and built from a field allowlist: no provider payloads, no URLs, no credentials.",
    ],
  };
}

export function buildOutcomesMarkdown(artifact) {
  const t = artifact.totals;
  const verb = artifact.run.applied ? "added" : "would be added";
  const lines = [];
  lines.push(`### Ticketmaster new-show ingestion — ${t.candidates} candidate(s)`);
  lines.push("");
  lines.push(
    `Run mode \`${artifact.run.mode}\`${artifact.run.applied ? "" : " (nothing written)"} · scope \`${artifact.run.artist_scope}\` · ${artifact.run.artists_attempted} artist(s) attempted, ${artifact.run.artists_skipped.length} skipped.`
  );
  lines.push("");
  lines.push("| result | count |");
  lines.push("| --- | ---: |");
  lines.push(`| added (${verb}) | ${t.by_result.added} |`);
  lines.push(`| existing duplicate | ${t.by_result.duplicate} |`);
  lines.push(`| withheld | ${t.by_result.withheld} |`);
  lines.push(`| **total candidates** | **${t.candidates}** |`);
  lines.push("");

  const reasons = Object.entries(t.by_reason_code);
  if (reasons.length) {
    lines.push("#### Withholding reasons");
    lines.push("");
    lines.push("| count | code | rule |");
    lines.push("| ---: | --- | --- |");
    for (const [code, count] of reasons) {
      lines.push(`| ${count} | \`${code}\` | ${artifact.reason_code_catalogue[code] || "(uncatalogued code)"} |`);
    }
    lines.push("");
  } else {
    lines.push("No candidate was withheld or de-duplicated in this run.");
    lines.push("");
  }

  if (artifact.run.artists_skipped.length) {
    lines.push("#### Skipped artists");
    lines.push("");
    for (const artist of artifact.run.artists_skipped) {
      lines.push(`- \`${artist.slug}\` — \`${artist.reason_code}\``);
    }
    lines.push("");
  }

  const sample = artifact.sample;
  lines.push(
    `#### Sample of affected shows (${sample.shown} of ${sample.of}${sample.truncated ? ", capped" : ""})`
  );
  lines.push("");
  if (sample.outcomes.length === 0) {
    lines.push("_No candidates were discovered in this run._");
  } else {
    lines.push("| artist | date | venue | city | result | reason codes |");
    lines.push("| --- | --- | --- | --- | --- | --- |");
    for (const outcome of sample.outcomes) {
      const codes = outcome.reason_codes.map((c) => `\`${c}\``).join(", ") || "—";
      lines.push(
        `| \`${outcome.artist_slug}\` | ${outcome.event.date || "(no date)"} | ${outcome.event.venue || "(no venue)"} | ${outcome.event.city || "(no city)"} | ${outcome.result} | ${codes} |`
      );
    }
    if (sample.truncated) {
      lines.push("");
      lines.push(
        `_Capped at ${sample.cap.per_bucket} row(s) per bucket and ${sample.cap.total} overall — full per-candidate detail is in \`ingestion-outcomes.json\` in the run artifact._`
      );
    }
  }
  lines.push("");
  return lines.join("\n");
}
