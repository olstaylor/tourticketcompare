// A per-activation correlation token, never a visitor identity or destination.
// Do not trim or truncate: malformed values must stay unjoined.
export function normalizeBrowserIntentId(value) {
  return typeof value === "string" && /^[a-f0-9]{32}$/.test(value) ? value : null;
}

export function browserIntentIdFromRequest(request) {
  return normalizeBrowserIntentId(new URL(request.url).searchParams.get("browserIntentId"));
}
