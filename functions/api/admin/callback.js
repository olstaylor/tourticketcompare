// Step 2 of the GitHub OAuth flow for the /admin content editor.
//
// GitHub returns the editor here with a short-lived `code`. This endpoint
// exchanges it for an access token server-side (the client secret never leaves
// the Function) and hands the token to the opener window using the
// postMessage handshake the CMS expects.
//
// The token is scoped to the signing-in user's own GitHub permissions: it is
// how *they* commit, not a site credential. It is never stored, never logged,
// and never written to D1.

import { CANONICAL_HOST } from "../../_route-metadata.js";
import { STATE_COOKIE, allowedAuthOrigin } from "./auth.js";

// The handshake script is fixed — the token is delivered separately in a
// non-executable JSON block — so its hash is stable and can be pinned in the
// CSP. It is computed per response rather than hardcoded, which removes the
// "recompute the hash if you edit the snippet" failure mode entirely.
const HANDSHAKE_SCRIPT = `(function () {
  var payload = document.getElementById("ttc-oauth-payload").textContent;
  function reply(event) {
    if (event.origin !== window.location.origin) return;
    window.removeEventListener("message", reply, false);
    window.opener.postMessage("authorization:github:success:" + payload, window.location.origin);
    window.close();
  }
  if (!window.opener) {
    document.body.textContent = "Sign-in finished, but this window was not opened by the editor. Close it and try again from /admin.";
    return;
  }
  window.addEventListener("message", reply, false);
  window.opener.postMessage("authorizing:github", window.location.origin);
})();`;

async function scriptHash(source) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return `sha256-${btoa(String.fromCharCode(...new Uint8Array(digest)))}`;
}

function escapeForScriptBlock(json) {
  // A JSON payload inside <script> must not be able to close the element.
  return json.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return "";
}

function failure(message, status = 400) {
  return new Response(`Content editor sign-in failed: ${message}\n\nClose this window and try again from /admin.`, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `${STATE_COOKIE}=; Path=/api/admin; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    }
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!allowedAuthOrigin(url)) return failure(`this flow only runs on https://${CANONICAL_HOST}`, 403);

  const clientId = String(env?.GITHUB_OAUTH_CLIENT_ID || "").trim();
  const clientSecret = String(env?.GITHUB_OAUTH_CLIENT_SECRET || "").trim();
  if (!clientId || !clientSecret) return failure("the OAuth app is not configured (see docs/BLOG.md)", 503);

  const error = url.searchParams.get("error");
  if (error) return failure(`GitHub returned "${error}"`);

  const code = String(url.searchParams.get("code") || "").trim();
  const state = String(url.searchParams.get("state") || "").trim();
  const expectedState = readCookie(request, STATE_COOKIE);
  if (!code) return failure("GitHub did not return an authorization code");
  // Constant-time comparison is unnecessary here (the attacker supplies both
  // sides), but a present, exact match is required: a missing or mismatched
  // state means the request did not originate from our own sign-in.
  if (!expectedState || state !== expectedState) return failure("the sign-in state did not match — start again from /admin");

  let token = "";
  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "tourticketcompare-admin" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: `${url.origin}/api/admin/callback` })
    });
    if (!response.ok) return failure(`GitHub rejected the token exchange (HTTP ${response.status})`, 502);
    const payload = await response.json();
    if (payload?.error) return failure(`GitHub returned "${payload.error}"`, 502);
    token = String(payload?.access_token || "").trim();
  } catch (cause) {
    return failure("the token exchange could not be completed", 502);
  }
  if (!token) return failure("GitHub did not return an access token", 502);

  const payloadJson = escapeForScriptBlock(JSON.stringify({ token, provider: "github" }));
  const hash = await scriptHash(HANDSHAKE_SCRIPT);
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Signing in…</title>
  </head>
  <body>
    <p>Signing you in…</p>
    <script type="application/json" id="ttc-oauth-payload">${payloadJson}</script>
    <script>${HANDSHAKE_SCRIPT}</script>
  </body>
</html>
`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Content-Security-Policy": `default-src 'none'; script-src '${hash}'; base-uri 'none'; frame-ancestors 'none'`,
      // No-store everywhere and a same-origin referrer policy: the response body
      // contains a live credential and must not be cached or leaked onward.
      "Cache-Control": "no-store",
      "Referrer-Policy": "same-origin",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      // Single-use: the state cookie is burned as soon as it is accepted.
      "Set-Cookie": `${STATE_COOKIE}=; Path=/api/admin; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    }
  });
}
