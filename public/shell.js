/* Small shared shell for server-authoritative routes. Dynamic artist boards,
   the comparison hub and currency converter continue to load their own route
   module; this file owns only navigation and first-party analytics. */
(function () {
  "use strict";
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");
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

  function send(eventName, metadata) {
    try {
      navigator.sendBeacon("/api/analytics", JSON.stringify({
        eventName: eventName,
        sourcePath: window.location.pathname,
        referrer: document.referrer || "",
        metadata: metadata || {}
      }));
    } catch (error) {}
  }

  var path = window.location.pathname;
  var guideMatch = /^\/guides\/([a-z0-9-]+)$/.exec(path);
  var entry = false;
  try {
    entry = !sessionStorage.getItem("ttc_shell_entry");
    if (entry) sessionStorage.setItem("ttc_shell_entry", "1");
  } catch (error) {}
  var pageMetadata = { routeType: "server-rendered", guideSlug: guideMatch ? guideMatch[1] : "", entry: entry };
  var params = new URLSearchParams(window.location.search);
  ["utmSource", "utmMedium", "utmCampaign"].forEach(function (key) {
    var queryKey = key.replace(/[A-Z]/g, function (letter) { return "_" + letter.toLowerCase(); });
    var value = params.get(queryKey);
    if (value) pageMetadata[key] = value;
  });
  send("page_view", pageMetadata);

  var recentClicks = new Set();
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
      priceSnapshot: cta.dataset.ctaPriceSnapshot === "present" ? "present" : "absent"
    });
  });
})();
