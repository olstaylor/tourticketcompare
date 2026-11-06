// @ts-check
// Embeddable "live ticket prices" widget: the pure parts (selection and HTML).
// Loading and the gate live in functions/api/embed.js and loadEmbedPrices
// (functions/[[path]].js), which reuse the artist page's own price gate.
//
// Rules this widget keeps, deliberately:
//   * Links go to TourTicketCompare pages only. Never /api/out or any seller URL.
//   * Every price is a cached, per-seller snapshot for one date, printed with its
//     seller, currency and check time. Dates are never compared with each other.
//   * No price -> the row says so. Nothing is estimated or filled in.

const CANONICAL_ORIGIN = "https://tourticketcompare.com";
export const EMBED_DEFAULT_LIMIT = 5;
export const EMBED_MAX_LIMIT = 8;
const ROW_PX = 74;

/** @param {unknown} value */
export function escapeEmbed(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c);
}

/**
 * Sanitise the query string. Unknown values fall back to defaults.
 * @param {URLSearchParams} params
 */
export function parseEmbedParams(params) {
  const artist = String(params.get("artist") || "").trim().toLowerCase();
  const limit = Math.min(EMBED_MAX_LIMIT, Math.max(1, Number.parseInt(params.get("limit") || "", 10) || EMBED_DEFAULT_LIMIT));
  const theme = params.get("theme") === "dark" ? "dark" : "light";
  const src = String(params.get("src") || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 32);
  return { artist: /^[a-z0-9-]{1,80}$/.test(artist) ? artist : "", limit, theme, src, builder: params.get("view") === "builder" };
}

/** @param {number} value @param {string} currency */
function money(value, currency) {
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "code", maximumFractionDigits: value % 1 === 0 ? 0 : 2 }).format(value).replace(/ /g, " ");
  } catch {
    return "";
  }
}

/** @param {string} iso @param {string} timeZone */
function dateLabel(iso, timeZone) {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "";
  for (const tz of [timeZone, "UTC"]) {
    try {
      return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: tz || "UTC" }).format(date);
    } catch { /* try UTC */ }
  }
  return "";
}

/** @param {string} value */
export function checkedLabel(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  return `${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(date)} UTC`;
}

/**
 * Pick what the widget shows: the next `limit` dates that have a listed price.
 * With no priced date at all, the next few dates are listed honestly as unpriced.
 * @param {{ rows: any[], shows: { id: string, city: string, venue: string }[] }} data
 * @param {number} limit
 */
export function selectEmbedEntries(data, limit) {
  const place = new Map(data.shows.map((s) => [s.id, [s.city, s.venue].filter(Boolean).join(" · ")]));
  const pricedRows = data.rows.filter((row) => row.lowest);
  const chosen = (pricedRows.length ? pricedRows : data.rows).slice(0, limit);
  return chosen.map((row) => ({ row, place: place.get(row.showId) || row.venue || "" }));
}

/** @param {string} slug @param {string} src */
export function artistLink(slug, src) {
  const campaign = src || "direct";
  return `${CANONICAL_ORIGIN}/artists/${encodeURIComponent(slug)}?utm_source=embed&utm_medium=widget&utm_campaign=${encodeURIComponent(campaign)}`;
}

const STYLE = `*{box-sizing:border-box}body{margin:0;padding:12px;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--fg)}
:root{--bg:#fff;--fg:#14151a;--muted:#5b6070;--line:#e3e5ec;--accent:#5b3df5}
body.dark{--bg:#14151a;--fg:#f2f3f7;--muted:#a3a8b8;--line:#2b2e3a;--accent:#9d8bff}
h1{font-size:16px;margin:0 0 8px}ul{list-style:none;margin:0;padding:0}li{padding:8px 0;border-top:1px solid var(--line)}
.d{font-weight:600}.p{color:var(--muted);font-size:13px}.lo{font-weight:700}.s{color:var(--muted);font-size:12px;margin-top:2px}
a{color:var(--accent)}.f{margin:10px 0 0;color:var(--muted);font-size:12px}.cta{display:inline-block;margin-top:10px;font-weight:600}`;

/**
 * The widget page. All text is escaped; there is no script.
 * @param {{ artist: {slug:string,name:string}, entries: ReturnType<typeof selectEmbedEntries>, totalDates: number, theme: string, src: string }} input
 */
export function renderEmbedHtml({ artist, entries, totalDates, theme, src }) {
  const href = artistLink(artist.slug, src);
  let latest = 0;
  const items = entries.map(({ row, place }) => {
    const when = dateLabel(row.datetimeISO, row.timezone);
    if (!row.lowest) {
      return `<li><div class="d">${escapeEmbed(when)}</div><div class="p">${escapeEmbed(place)}</div><div class="s">No listed price yet. Check the dates on TourTicketCompare.</div></li>`;
    }
    for (const lane of row.lanes) latest = Math.max(latest, Date.parse(lane.fetchedAt) || 0);
    const low = row.lowest;
    const sellers = row.lanes
      .map((lane) => `${escapeEmbed(lane.name)} ${escapeEmbed(money(lane.price, lane.currency))}`)
      .join(" · ");
    return `<li><div class="d">${escapeEmbed(when)} <span class="p">· ${escapeEmbed(place)}</span></div><div class="lo">Lowest listed: ${escapeEmbed(money(low.price, low.currency))} <span class="p">on ${escapeEmbed(low.name)}</span></div><div class="s">${sellers}</div></li>`;
  }).join("");
  const checked = latest ? `Prices checked ${escapeEmbed(checkedLabel(new Date(latest).toISOString()))}.` : "";
  const body = items
    ? `<ul>${items}</ul>`
    : `<p class="p">No upcoming dates are listed right now.</p>`;
  const more = totalDates > entries.length ? `See all ${totalDates} dates` : "See every date and ticket site";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escapeEmbed(artist.name)} ticket prices</title><style>${STYLE}</style></head><body class="${theme === "dark" ? "dark" : ""}"><h1>${escapeEmbed(artist.name)} ticket prices</h1>${body}<a class="cta" href="${escapeEmbed(href)}" target="_blank" rel="noopener">${escapeEmbed(more)} on TourTicketCompare</a><p class="f">${checked} Cached resale listings per date, not face value; fees may be added at checkout. Each price is for one date and is never compared with another date.</p></body></html>`;
}

/**
 * The copy-paste snippet. The visible credit link under the frame is the
 * backlink: a link inside an iframe does not count as one on the host page.
 */
export function embedSnippet({ artist, limit, theme, src }) {
  const q = `artist=${encodeURIComponent(artist.slug)}&limit=${limit}&theme=${theme}${src ? `&src=${encodeURIComponent(src)}` : ""}`;
  const height = 150 + ROW_PX * limit;
  return `<iframe src="${CANONICAL_ORIGIN}/api/embed?${q}" title="${escapeEmbed(artist.name)} ticket prices" width="100%" height="${height}" style="border:0;max-width:480px" loading="lazy"></iframe>
<p style="font-size:12px">Prices by <a href="${escapeEmbed(artistLink(artist.slug, src))}">TourTicketCompare</a></p>`;
}

/**
 * The "Embed this" page. One inline script (nonce-guarded) powers the copy button.
 * @param {{ artist: {slug:string,name:string}, limit: number, theme: string, src: string, nonce: string }} input
 */
export function renderBuilderHtml({ artist, limit, theme, src, nonce }) {
  const snippet = embedSnippet({ artist, limit, theme, src });
  const previewSrc = `/api/embed?artist=${encodeURIComponent(artist.slug)}&limit=${limit}&theme=${theme}${src ? `&src=${encodeURIComponent(src)}` : ""}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Embed ${escapeEmbed(artist.name)} ticket prices</title><style>${STYLE}body{max-width:720px;margin:0 auto;padding:20px}textarea{width:100%;min-height:150px;font:12px/1.5 ui-monospace,monospace;padding:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg)}button{font:inherit;font-weight:600;padding:8px 14px;margin:8px 0;cursor:pointer}iframe{border:1px solid var(--line);max-width:480px;width:100%}</style></head><body><h1>Embed ${escapeEmbed(artist.name)} ticket prices on your site</h1><p>Paste this into your page or blog post. It shows the lowest listed price per ticket site for the next dates, with the time each price was checked. It updates itself and is free to use. Please keep the credit link under it.</p><textarea id="code" readonly>${escapeEmbed(snippet)}</textarea><br><button id="copy" type="button">Copy code</button> <span id="done" class="p"></span><p class="p">Options: add <code>&amp;limit=3</code> (1 to ${EMBED_MAX_LIMIT} dates), <code>&amp;theme=dark</code>, and <code>&amp;src=yourname</code> so we can tell which site sent visitors.</p><h2>Preview</h2><iframe src="${escapeEmbed(previewSrc)}" title="Preview" height="${150 + ROW_PX * limit}" loading="lazy"></iframe><p class="f">Prices are cached resale listings, not face value, and are not a checkout total. Widget links go to TourTicketCompare. <a href="/affiliate-disclosure">Affiliate disclosure</a>.</p><script nonce="${escapeEmbed(nonce)}">document.getElementById("copy").addEventListener("click",function(){var t=document.getElementById("code");t.select();var d=document.getElementById("done");(navigator.clipboard?navigator.clipboard.writeText(t.value):Promise.reject()).then(function(){d.textContent="Copied"},function(){document.execCommand("copy");d.textContent="Copied"})})</script></body></html>`;
}
