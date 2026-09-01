/* Small shared shell for server-authoritative routes. Artist boards and the
   currency converter load their own route modules; this file owns navigation
   and shared first-party analytics. */
(function () {
  "use strict";
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");
  var skipLink = document.querySelector('a[href="#mainContent"]');
  var mainContent = document.getElementById("mainContent");
  var year = document.getElementById("currentYear");
  var compactYear = document.getElementById("ttc-year");
  var currentYear = String(new Date().getFullYear());
  if (year) year.textContent = currentYear;
  if (compactYear) compactYear.textContent = currentYear;

  if (navToggle && navLinks) {
    var closedLabel = navToggle.textContent.trim() || "Menu";
    function setOpen(open) {
      navToggle.setAttribute("aria-expanded", String(open));
      navLinks.toggleAttribute("data-open", open);
      navToggle.textContent = open ? "Close" : closedLabel;
    }
    navToggle.addEventListener("click", function () { setOpen(navToggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") setOpen(false); });
  }

  // The skip link must move keyboard focus as well as the viewport. A main
  // landmark is not focusable by default in every browser, so make this one a
  // programmatic target and focus it when the native fragment link activates.
  if (skipLink && mainContent) {
    mainContent.setAttribute("tabindex", "-1");
    skipLink.addEventListener("click", function (event) {
      event.preventDefault();
      mainContent.focus();
    });
  }

  var path = window.location.pathname;
  var guideMatch = /^\/guides\/([a-z0-9-]+)$/.exec(path);
  var artistMatch = /^\/artists\/([a-z0-9-]+)(?:\/|$)/.exec(path);
  var artistSlug = artistMatch ? artistMatch[1] : "";
  var sessionKey = "ttc:funnel-session";
  var funnelSession = null;
  var entry = true;
  function captureSession() {
    var params = new URLSearchParams(window.location.search);
    var referrer = "";
    try {
      var referrerUrl = new URL(document.referrer || "");
      if (referrerUrl.hostname && referrerUrl.hostname !== window.location.hostname) referrer = referrerUrl.origin;
    } catch (error) {}
    return {
      landingPath: path,
      referrer: referrer,
      utmSource: String(params.get("utm_source") || "").trim().slice(0, 80),
      utmMedium: String(params.get("utm_medium") || "").trim().slice(0, 80),
      utmCampaign: String(params.get("utm_campaign") || "").trim().slice(0, 80)
    };
  }
  try {
    funnelSession = JSON.parse(sessionStorage.getItem(sessionKey) || "null");
    entry = !funnelSession || typeof funnelSession.landingPath !== "string";
    if (entry) {
      funnelSession = captureSession();
      sessionStorage.setItem(sessionKey, JSON.stringify(funnelSession));
    }
  } catch (error) {}
  if (!funnelSession) funnelSession = captureSession();

  function pageType() {
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return "home";
    if (parts[0] === "artists") return parts.length === 1 ? "artists_index" : parts[2] === "tickets" ? "artist_city" : "artist";
    if (parts[0] === "cities") return parts.length === 1 ? "cities_index" : "city";
    if (parts[0] === "venues") return parts.length === 1 ? "venues_index" : "venue";
    if (parts[0] === "guides") return parts.length === 1 ? "guides_index" : "guide";
    return "other";
  }

  var ga4Events = ["artist_view", "provider_cta_view", "provider_click", "email_signup"];
  function mirrorToGa4(eventName, payload, metadata) {
    if (ga4Events.indexOf(eventName) === -1 || typeof window.gtag !== "function") return;
    try {
      var params = { page_type: pageType() };
      if (payload.artistSlug) params.artist_slug = payload.artistSlug;
      if (payload.provider) params.provider = payload.provider;
      if (metadata.ctaLocation) params.cta_location = metadata.ctaLocation;
      if (typeof metadata.isAffiliate === "boolean") params.is_affiliate = metadata.isAffiliate;
      window.gtag("event", eventName === "provider_click" ? "outbound_click" : eventName, params);
    } catch (error) {}
  }

  function send(eventName, metadata) {
    if (!navigator.sendBeacon) return;
    try {
      var enriched = Object.assign({}, metadata || {});
      var payload = {
        eventName: eventName,
        sourcePath: path,
        landingPath: funnelSession.landingPath || path,
        artistSlug: String(enriched.artistSlug || artistSlug || ""),
        provider: String(enriched.provider || ""),
        tourSlug: String(enriched.tourSlug || ""),
        destinationHost: String(enriched.destinationHost || ""),
        linkId: String(enriched.linkId || ""),
        eventId: String(enriched.eventId || enriched.showId || ""),
        metadata: enriched
      };
      if (eventName === "page_view" && entry) {
        enriched.entry = true;
        if (funnelSession.referrer) payload.referrer = funnelSession.referrer;
        if (funnelSession.utmSource) enriched.utmSource = funnelSession.utmSource;
        if (funnelSession.utmMedium) enriched.utmMedium = funnelSession.utmMedium;
        if (funnelSession.utmCampaign) enriched.utmCampaign = funnelSession.utmCampaign;
        entry = false;
      }
      navigator.sendBeacon("/api/analytics", JSON.stringify(payload));
      mirrorToGa4(eventName, payload, enriched);
    } catch (error) {}
  }

  window.ttcAnalytics = Object.freeze({ send: send });
  var pageMetadata = { routeType: "server-rendered", pageType: pageType(), guideSlug: guideMatch ? guideMatch[1] : "", artistSlug: artistSlug };
  send("page_view", pageMetadata);
  if (artistSlug) send("artist_view", pageMetadata);

  var recentClicks = new Set();
  var affiliateProviders = ["seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international"];
  document.addEventListener("click", function (event) {
    var cta = event.target && event.target.closest ? event.target.closest("a[data-cta-provider]") : null;
    if (!cta) return;
    var provider = String(cta.dataset.ctaProvider || "").trim();
    var showId = String(cta.dataset.ctaShowId || "").trim();
    var location = String(cta.dataset.ctaLocation || "").trim();
    var key = provider + ":" + showId + ":" + location;
    if (!provider || recentClicks.has(key)) return;
    recentClicks.add(key);
    window.setTimeout(function () { recentClicks.delete(key); }, 1000);
    send("provider_click", {
      provider: provider,
      artistSlug: String(cta.dataset.ctaArtist || "").trim(),
      showId: showId,
      eventId: showId,
      guideSlug: guideMatch ? guideMatch[1] : "",
      position: Number(cta.dataset.ctaPosition || 0) || undefined,
      ctaLocation: location,
      priceSnapshot: cta.dataset.ctaPriceSnapshot === "present" ? "present" : "absent",
      isAffiliate: affiliateProviders.indexOf(provider) !== -1,
      linkId: showId ? showId + ":" + provider : String(cta.dataset.ctaLinkId || "").trim()
    });
  });

  var seenEvents = new Set();
  var providerViewSent = false;
  if (typeof window.IntersectionObserver === "function") {
    var dwellTimers = new Map();
    var observer = new IntersectionObserver(function (observations) {
      observations.forEach(function (observation) {
        var element = observation.target;
        if (!observation.isIntersecting || observation.intersectionRatio < 0.5) {
          if (dwellTimers.has(element)) window.clearTimeout(dwellTimers.get(element));
          dwellTimers.delete(element);
          return;
        }
        if (dwellTimers.has(element)) return;
        dwellTimers.set(element, window.setTimeout(function () {
          dwellTimers.delete(element);
          if (element.matches("a[data-cta-provider]")) {
            if (providerViewSent) {
              observer.unobserve(element);
              return;
            }
            providerViewSent = true;
            var ctas = Array.from(document.querySelectorAll("a[data-cta-provider]"));
            ctas.forEach(function (cta) { observer.unobserve(cta); });
            var providers = Array.from(new Set(ctas.map(function (cta) { return String(cta.dataset.ctaProvider || "").trim(); }).filter(Boolean))).sort();
            send("provider_cta_view", {
              artistSlug: String(element.dataset.ctaArtist || artistSlug),
              ctaLocation: String(element.dataset.ctaLocation || ""),
              ctaProviders: providers.join(","),
              ctaCount: ctas.length
            });
          } else {
            var eventId = String(element.dataset.eventId || "").trim();
            if (!eventId || seenEvents.has(eventId) || seenEvents.size >= 20) return;
            seenEvents.add(eventId);
            var cta = element.querySelector("a[data-cta-provider]");
            send("event_view", {
              eventId: eventId,
              artistSlug: String(cta && cta.dataset.ctaArtist || artistSlug),
              pageType: pageType()
            });
          }
          observer.unobserve(element);
        }, 1000));
      });
    }, { threshold: [0.5] });
    Array.from(document.querySelectorAll("[data-event-id]")).slice(0, 20).forEach(function (card) { observer.observe(card); });
    Array.from(document.querySelectorAll("a[data-cta-provider]")).forEach(function (cta) { observer.observe(cta); });
  }
})();
