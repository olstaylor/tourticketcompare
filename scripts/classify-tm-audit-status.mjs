#!/usr/bin/env node
// Classifies a finished Ticketmaster Discovery audit for the daily audit workflow
// and prints the tm-status.json body.
//
//   ok      the audit exited 0.
//   partial the audit exited 1 only because a few individual events could not be
//           fetched (transient 429/5xx/timeouts that outlived the retries), and its
//           evidence (tm.json) was written. bump-verified-dates.mjs already holds
//           every artist with a current-event error, so an artist is still stamped
//           only if every one of its events was actually checked. A handful of
//           errors elsewhere no longer withholds every other artist's date.
//   failed  anything else: a crash, no evidence, or errors above the cap.
//
// Exit code is always 0; the caller reads the printed JSON.
import fs from 'node:fs';

export const PARTIAL_MAX_ERROR_SHARE = 0.01;
export const PARTIAL_MAX_ERRORS = 25;

export function classifyTmAudit({ exitCode, tm }) {
  if (exitCode === 0) return { status: 'ok' };
  const reason = `audit-tm-events.mjs exited ${exitCode}`;
  const totals = tm && typeof tm === 'object' ? tm.totals : null;
  const errors = Number(totals?.errors);
  const checked = Number(totals?.checked);
  if (exitCode !== 1 || !Array.isArray(tm?.artists) || !Number.isFinite(errors) || !Number.isFinite(checked)) {
    return { status: 'failed', reason };
  }
  const allowed = Math.min(PARTIAL_MAX_ERRORS, Math.floor(checked * PARTIAL_MAX_ERROR_SHARE));
  if (errors >= 1 && errors <= allowed) {
    return { status: 'partial', reason: `${reason}; ${errors} of ${checked} events unfetched, their artists held`, errors, checked };
  }
  return { status: 'failed', reason: `${reason}; ${errors} errors across ${checked} events exceeds the partial cap (${allowed})` };
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  let tm = null;
  try { tm = JSON.parse(fs.readFileSync(arg('--tm'), 'utf8')); } catch { /* no usable evidence */ }
  console.log(JSON.stringify(classifyTmAudit({ exitCode: Number(arg('--exit-code')), tm })));
}
