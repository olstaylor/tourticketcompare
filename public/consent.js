// Cookie consent for the two third-party tags that set cookies: Google Tag
// Manager (which runs Google Analytics 4) and the Impact publisher tag.
//
// Neither loads until the visitor accepts. The choice is kept in localStorage
// under CONSENT_KEY, which is storage the visitor asked for and needs no
// consent of its own. With no stored choice the banner shows on every page;
// "Reject" is as prominent as "Accept"; and the footer's "Cookie settings"
// button (data-consent-open) reopens the banner so a choice can be changed.
//
// The inline Google tag bootstrap in public/index.html sets Consent Mode's
// defaults to denied before anything is queued, so even a container loaded by
// some other route starts with analytics storage denied. First-party
// measurement (/api/analytics beacons, the same-tab sessionStorage attribution
// in shell.js and app.js) sets no cookie and is not governed here; the privacy
// policy describes it separately.
(function () {
  "use strict";

  var CONSENT_KEY = "ttcCookieConsent";
  var CONSENT_VERSION = 1;
  var GTM_ID = "GTM-MZ42TPMM";
  var IMPACT_TAG_SRC = "/impact-publisher-tag.js?v=20260714a";
  var loaded = false;

  function readChoice() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null");
      if (stored && stored.v === CONSENT_VERSION && typeof stored.analytics === "boolean") return stored.analytics;
    } catch (error) {}
    return null;
  }

  function saveChoice(accepted) {
    try {
      window.localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ v: CONSENT_VERSION, analytics: accepted, at: new Date().toISOString() })
      );
    } catch (error) {}
  }

  function addScript(src) {
    var script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  // Same container and the same load-after-render timing the inline loader
  // used before consent gating.
  function loadTags() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") window.gtag("consent", "update", { analytics_storage: "granted" });
    var start = function () {
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      addScript("https://www.googletagmanager.com/gtm.js?id=" + GTM_ID);
      addScript(IMPACT_TAG_SRC);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }

  // Withdrawing consent: stop further analytics storage and clear the cookies
  // the tags set on this site's own domain. A reload then leaves the page with
  // no third-party tag running.
  function clearTagCookies() {
    var names = document.cookie
      .split(";")
      .map(function (part) { return part.split("=")[0].trim(); })
      .filter(function (name) { return /^(_ga|_gid|_gat|IR_)/.test(name); });
    var host = window.location.hostname;
    var domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
    names.forEach(function (name) {
      domains.forEach(function (domain) {
        document.cookie =
          name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (domain ? "; domain=" + domain : "");
      });
    });
  }

  var banner = null;

  function closeBanner() {
    if (banner) banner.hidden = true;
  }

  function choose(accepted) {
    var previous = readChoice();
    saveChoice(accepted);
    closeBanner();
    if (accepted) {
      loadTags();
      return;
    }
    if (typeof window.gtag === "function") window.gtag("consent", "update", { analytics_storage: "denied" });
    clearTagCookies();
    if (previous === true || loaded) window.location.reload();
  }

  function button(label, accepted) {
    var element = document.createElement("button");
    element.type = "button";
    element.className = "button button-secondary cookie-consent__button";
    element.textContent = label;
    element.addEventListener("click", function () { choose(accepted); });
    return element;
  }

  function buildBanner() {
    banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.setAttribute("aria-label", "Cookie consent");
    banner.setAttribute("data-cookie-consent", "");

    var text = document.createElement("p");
    text.className = "cookie-consent__text";
    text.appendChild(
      document.createTextNode(
        "TourTicketCompare would like to use Google Analytics to count visits and an Impact affiliate tag to measure page views. Both set cookies, and neither loads unless you accept. "
      )
    );
    var policy = document.createElement("a");
    policy.className = "text-link";
    policy.href = "/privacy";
    policy.textContent = "Privacy policy";
    text.appendChild(policy);

    var actions = document.createElement("div");
    actions.className = "cookie-consent__actions";
    actions.appendChild(button("Reject", false));
    actions.appendChild(button("Accept", true));

    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function openBanner() {
    if (!banner) buildBanner();
    banner.hidden = false;
    var first = banner.querySelector("button");
    if (first) first.focus();
  }

  function init() {
    var choice = readChoice();
    if (choice === true) loadTags();
    else if (choice === null) buildBanner();
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.closest && target.closest("[data-consent-open]")) {
        event.preventDefault();
        openBanner();
      }
    });
  }

  window.ttcConsent = Object.freeze({ open: openBanner, accepted: function () { return readChoice() === true; } });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
