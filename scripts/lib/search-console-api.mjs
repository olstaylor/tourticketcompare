// Read-only Search Console client for the SEO opportunity report
// (scripts/report-seo-opportunities.mjs --gsc-api).
//
// Signs in as a Google service account (JWT bearer flow, RS256 via node:crypto,
// no dependencies) with the read-only webmasters scope and pulls the "page"
// and "query" searchAnalytics rows for the domain property. Rows come back in
// the shape searchConsoleRows() gives a CSV export, so the scorer cannot tell
// the two sources apart.
//
// Never logs or throws the key, the access token or a response body: errors
// carry the step and the HTTP status only. `fetch` is injectable for tests.
import { createSign } from "node:crypto";

export const SITE = "sc-domain:tourticketcompare.com";
export const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
export const TOKEN_URL = "https://oauth2.googleapis.com/token";
export const QUERY_URL = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
export const ROW_LIMIT = 1000;
export const MAX_ROWS = 5000;
// Search Console data settles about three days late; the window is the 28
// complete days that end three days before today (UTC).
export const LAG_DAYS = 3;
export const WINDOW_DAYS = 28;

const DAY_MS = 86400000;
const base64url = (input) => Buffer.from(input).toString("base64url");
const isoDay = (ms) => new Date(ms).toISOString().slice(0, 10);

/** Parsed service-account key. Throws without echoing the value. */
export function parseServiceAccount(json) {
  let key;
  try {
    key = typeof json === "string" ? JSON.parse(json) : json;
  } catch {
    throw new Error("GSC_SERVICE_ACCOUNT_JSON is not valid JSON (expected a service-account key file)");
  }
  if (!key || typeof key.client_email !== "string" || typeof key.private_key !== "string") {
    throw new Error("GSC_SERVICE_ACCOUNT_JSON needs client_email and private_key (a Google service-account JSON key)");
  }
  return { clientEmail: key.client_email, privateKey: key.private_key };
}

/** The signed JWT assertion for the token endpoint. */
export function buildJwtAssertion({ clientEmail, privateKey }, nowMs = Date.now()) {
  const iat = Math.floor(nowMs / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({ iss: clientEmail, scope: SCOPE, aud: TOKEN_URL, iat, exp: iat + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  signer.end();
  return `${header}.${claims}.${signer.sign(privateKey).toString("base64url")}`;
}

/** { startDate, endDate } for the last 28 complete days, three days of lag. */
export function reportWindow(nowMs = Date.now()) {
  const today = Date.UTC(new Date(nowMs).getUTCFullYear(), new Date(nowMs).getUTCMonth(), new Date(nowMs).getUTCDate());
  const end = today - LAG_DAYS * DAY_MS;
  return { startDate: isoDay(end - (WINDOW_DAYS - 1) * DAY_MS), endDate: isoDay(end) };
}

/** API rows → the { key, clicks, impressions, ctr, position } shape searchConsoleRows() gives. */
export function mapApiRows(rows) {
  return (rows || [])
    .filter((row) => Array.isArray(row?.keys) && String(row.keys[0] ?? "").trim())
    .map((row) => {
      const clicks = Number(row.clicks) || 0;
      const impressions = Number(row.impressions) || 0;
      return { key: String(row.keys[0]).trim(), clicks, impressions, ctr: impressions ? clicks / impressions : 0, position: Number(row.position) || 0 };
    });
}

export async function fetchAccessToken(account, { fetchImpl = globalThis.fetch, now = Date.now() } = {}) {
  const res = await fetchImpl(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: buildJwtAssertion(account, now) }).toString()
  });
  if (!res.ok) throw new Error(`Search Console sign-in failed (HTTP ${res.status})`);
  let token;
  try {
    token = (await res.json())?.access_token;
  } catch {
    token = undefined;
  }
  if (typeof token !== "string" || !token) throw new Error(`Search Console sign-in returned no access token (HTTP ${res.status})`);
  return token;
}

async function queryDimension(dimension, { token, window, fetchImpl }) {
  const rows = [];
  for (let startRow = 0; startRow < MAX_ROWS; startRow += ROW_LIMIT) {
    const res = await fetchImpl(QUERY_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...window, dimensions: [dimension], type: "web", rowLimit: ROW_LIMIT, startRow })
    });
    if (!res.ok) throw new Error(`Search Console ${dimension} query failed (HTTP ${res.status})`);
    let page;
    try {
      page = (await res.json())?.rows || [];
    } catch {
      throw new Error(`Search Console ${dimension} query returned unreadable JSON (HTTP ${res.status})`);
    }
    rows.push(...page);
    if (page.length < ROW_LIMIT) break;
  }
  return mapApiRows(rows.slice(0, MAX_ROWS));
}

/**
 * { pages, queries, window } for the domain property. `json` is the
 * service-account key (the GSC_SERVICE_ACCOUNT_JSON value).
 */
export async function fetchSearchConsole(json, { fetchImpl = globalThis.fetch, now = Date.now() } = {}) {
  const account = parseServiceAccount(json);
  const token = await fetchAccessToken(account, { fetchImpl, now });
  const window = reportWindow(now);
  const pages = await queryDimension("page", { token, window, fetchImpl });
  const queries = await queryDimension("query", { token, window, fetchImpl });
  return { pages, queries, window };
}
