// Third-party keyword evidence supplements the SEO report; it never becomes
// GSC impressions, measured visits, conversion, or a revenue estimate.
import { parseCsv } from "../report-event-indexing-pilot.mjs";

export function keywordRows(csv) {
  const [header = [], ...body] = parseCsv(csv.replace(/^\uFEFF/, ""));
  const columns = ["Keyword", "Rank", "Volume", "URL"].map((name) => header.indexOf(name));
  if (columns.some((index) => index < 0)) throw new Error("Keyword CSV needs Keyword, Rank, Volume and URL columns");
  const seen = new Set();
  return body.filter((row) => row.some((cell) => String(cell).trim())).map((row, i) => {
    const [keyword, rankText, volumeText, rawUrl] = columns.map((index) => String(row[index] ?? "").trim());
    const rank = Number(rankText), volume = Number(volumeText);
    let url;
    try { url = new URL(rawUrl); } catch { throw new Error(`Invalid keyword URL at row ${i + 2}`); }
    if (url.origin !== "https://tourticketcompare.com" || url.search || url.hash || !keyword || !rankText || !volumeText || !Number.isFinite(rank) || rank < 1 || !Number.isFinite(volume) || volume < 0) {
      throw new Error(`Invalid keyword evidence at row ${i + 2}`);
    }
    // Crawl the exported path verbatim. A trailing slash can redirect; using
    // its canonical destination here would hide the reconciliation work.
    const path = url.pathname;
    const key = `${path}\n${keyword.toLowerCase()}`;
    if (seen.has(key)) throw new Error(`Duplicate keyword/page at row ${i + 2}`);
    seen.add(key);
    return { keyword, rank, volume, path };
  });
}

// These are review buckets, not a second commercial scorer. Preserve every
// row and do not sum overlapping search variants into an audience estimate.
export function buildKeywordBaseline(rows, renderedPages) {
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.path)) groups.set(row.path, []);
    groups.get(row.path).push(row);
  }
  return [...groups].map(([path, keywords]) => {
    const page = renderedPages.get(path);
    const eligible = Boolean(page?.status === 200 && page.indexable && page.canonical === `https://tourticketcompare.com${path}`);
    const near = keywords.filter((row) => row.rank >= 4 && row.rank <= 20);
    const focus = [...(near.length ? near : keywords)].sort((a, b) => b.volume - a.volume || a.rank - b.rank)[0];
    const bucket = !eligible ? "HOLD" : near.length ? "NEAR_TERM" : keywords.some((row) => row.rank <= 3) ? "DEFEND" : "LONGER_TERM";
    return {
      path, bucket, focus, keywords,
      country: null, export_date: null, measured_visits: null, approved_commission: null,
      rendering: page ? { status: page.status, location: page.location, robots: page.robots, canonical: page.canonical, title: page.title, h1: page.h1 } : null,
      next_step: !eligible ? "Check current route eligibility; preserve indexing gates. Reconcile the CSV URL with its live destination."
        : "Confirm query × page × country demand, approved offer coverage and conversion before commercial prioritization."
    };
  }).sort((a, b) => ["NEAR_TERM", "DEFEND", "LONGER_TERM", "HOLD"].indexOf(a.bucket) - ["NEAR_TERM", "DEFEND", "LONGER_TERM", "HOLD"].indexOf(b.bucket) || b.focus.volume - a.focus.volume || a.path.localeCompare(b.path));
}

export function renderKeywordBaseline(queue) {
  const cell = (value) => String(value).replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
  return [
    "## Third-party keyword baseline",
    "",
    "Provisional review buckets, not commercial scores. Country, export date, actual visits and commission are unknown. Volumes are vendor estimates; overlapping variants are not summed. Rendering uses local reviewed data without production provider credentials.",
    "",
    "| Review bucket | Page | Focus query | CSV rank | Vendor volume | Local HTTP |",
    "|---|---|---|---:|---:|---:|",
    ...queue.map((row) => `| ${row.bucket} | ${cell(row.path)} | ${cell(row.focus.keyword)} | ${row.focus.rank} | ${row.focus.volume} | ${row.rendering?.status ?? "unknown"} |`),
    ""
  ].join("\n");
}
