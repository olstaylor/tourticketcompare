// One door for sending email, so the provider can change without touching the
// alert logic. Default is the stub: it sends nothing and says so.
//
// PRICE_ALERTS_PROVIDER (wrangler.toml [vars]):
//   "stub"    (default) nothing leaves the building; send() reports delivered:false
//   "resend"  sends through Resend; needs RESEND_API_KEY (ALERT_EMAIL_FROM optional)
// Swapping provider means adding one adapter here and changing that value.
//
// Pure fetch, no node imports, so it runs in Pages Functions and in scripts.

// Works once tourticketcompare.com is verified in Resend; same default as the workflows.
const DEFAULT_FROM = "TourTicketCompare <alerts@tourticketcompare.com>";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const STUB_PROVIDER = Object.freeze({
  name: "stub",
  live: false,
  async send() {
    return { delivered: false, id: "" };
  }
});

function resendProvider(env) {
  const apiKey = String(env.RESEND_API_KEY || "").trim();
  const from = String(env.ALERT_EMAIL_FROM || "").trim() || DEFAULT_FROM;
  if (!apiKey) return null;
  const replyTo = String(env.ALERT_REPLY_TO || "").trim();
  return {
    name: "resend",
    live: true,
    async send(to, message, idempotencyKey) {
      const response = await fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {})
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: message.subject,
          html: message.html,
          text: message.text,
          headers: message.headers,
          ...(replyTo ? { reply_to: replyTo } : {})
        })
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(`Resend returned ${response.status}: ${String(body?.message || body?.name || "").slice(0, 200)}`);
      return { delivered: true, id: String(body?.id || "") };
    }
  };
}

// Anything but an explicit, fully configured "resend" is the stub, so a typo or
// a missing key can never turn sending on by accident.
export function createEmailProvider(env = {}) {
  const wanted = String(env.PRICE_ALERTS_PROVIDER || "stub").trim().toLowerCase();
  if (wanted === "resend") return resendProvider(env) || STUB_PROVIDER;
  return STUB_PROVIDER;
}
