// @ts-check
// Published face values (the original primary-sale price) for artist-city
// pages, shown next to resale prices. Source: data/face-values.json, hand
// verified, one source link and date per entry. Display only: nothing here is
// subtracted from or compared with a resale price, and an entry whose
// currency differs from the page's priced rows is still just a labelled fact.
import { FACE_VALUES } from "./_face-values.data.js";

const CURRENCY_SYMBOL = { GBP: "£", EUR: "€", USD: "$", CAD: "CA$", AUD: "A$" };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** @param {string} iso YYYY-MM-DD */
export function formatFaceDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
  if (!m) return "";
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

/** @param {number} amount @param {string} currency */
export function formatFaceAmount(amount, currency) {
  const symbol = CURRENCY_SYMBOL[currency];
  if (!symbol || !Number.isFinite(amount) || amount <= 0) return "";
  return `${symbol}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}

/** An entry is usable only with an https source, a date and a real amount. */
export function validFaceValue(entry) {
  return Boolean(
    entry &&
      entry.artist_slug &&
      entry.city_slug &&
      /^https:\/\//.test(entry.source_url || "") &&
      formatFaceDate(entry.published_at) &&
      formatFaceAmount(entry.amount, entry.currency)
  );
}

/** @returns {object|null} */
export function faceValueFor(artistSlug, citySlug, entries = FACE_VALUES.entries) {
  return entries.find((e) => validFaceValue(e) && e.artist_slug === artistSlug && e.city_slug === citySlug) || null;
}

/** One compact line: "Face value from £79.40, general sale (Time Out, 1 Sep 2026)". */
export function faceValueLineHtml(artistSlug, citySlug, escape, entries = FACE_VALUES.entries) {
  const e = faceValueFor(artistSlug, citySlug, entries);
  if (!e) return "";
  const basis = e.basis ? `, ${e.basis}` : "";
  return `<p class="face-value muted">Face value from ${escape(formatFaceAmount(e.amount, e.currency))}${escape(basis)} (<a href="${escape(
    e.source_url
  )}" rel="noopener nofollow">${escape(e.source_name)}</a>, ${escape(formatFaceDate(e.published_at))})</p>`;
}
