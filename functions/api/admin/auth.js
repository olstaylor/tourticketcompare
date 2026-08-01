// Step 1 of the GitHub OAuth flow for the /admin content editor.
//
// The editor opens this endpoint in a popup; it redirects to GitHub's
// authorization screen and GitHub returns the visitor to
// /api/admin/callback. No token is ever minted here and no secret is
// echoed back — the client secret is used only in the callback's
// server-to-server exchange.
//
// Fails closed and loudly: with no OAuth app configured this returns 503 with
// setup instructions rather than a broken redirect. See docs/BLOG.md.

import { CANONICAL_HOST, isLocalOrigin } from "../../_route-metadata.js";

export const STATE_COOKIE = "ttc_admin_oauth_state";
const STATE_TTL_SECONDS = 600;

// `repo` is required: the editor commits Markdown to a repository that may be
// private, and GitHub has no narrower contents-write scope for OAuth apps.
const SCOPE = "repo";

/**
 * Only the canonical production host and local development may start the flow.
 * Preview and alias hosts are refused so a token can never be issued against an
 * origin the OAuth app's callback URL does not match.
 *
 * @param {URL} url
 * @returns {boolean}
 */
export function allowedAuthOrigin(url) {
  const host = url.hostname.toLowerCase();
  return host === CANONICAL_HOST || isLocalOrigin(url.origin);
}

function randomState() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function plain(body, status) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=UTF-8", "Cache-Control": "no-store" }
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);

  if (!allowedAuthOrigin(url)) {
    return plain(`The content editor sign-in is only available on https://${CANONICAL_HOST}/admin.`, 403);
  }

  const clientId = String(env?.GITHUB_OAUTH_CLIENT_ID || "").trim();
  const clientSecret = String(env?.GITHUB_OAUTH_CLIENT_SECRET || "").trim();
  if (!clientId || !clientSecret) {
    return plain(
      [
        "The content editor is not configured yet.",
        "",
        "An owner needs to create a GitHub OAuth App and add two Cloudflare Pages secrets:",
        "  GITHUB_OAUTH_CLIENT_ID",
        "  GITHUB_OAUTH_CLIENT_SECRET",
        "",
        `The OAuth App's Authorization callback URL must be exactly https://${CANONICAL_HOST}/api/admin/callback`,
        "",
        "Full instructions: docs/BLOG.md in the repository.",
        "Until then, edit content/blog/*.md directly on GitHub — the site publishes from those files either way."
      ].join("\n"),
      503
    );
  }

  const state = randomState();
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/api/admin/callback`);
  authorizeUrl.searchParams.set("scope", SCOPE);
  authorizeUrl.searchParams.set("state", state);

  const headers = new Headers({ Location: authorizeUrl.toString(), "Cache-Control": "no-store" });
  // HttpOnly so page scripts cannot read it, SameSite=Lax so it survives the
  // top-level redirect back from GitHub, and scoped to the callback path.
  headers.append(
    "Set-Cookie",
    `${STATE_COOKIE}=${state}; Path=/api/admin; Max-Age=${STATE_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`
  );
  return new Response(null, { status: 302, headers });
}
