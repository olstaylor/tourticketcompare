/* First-party Core Web Vitals. Only numeric timings and fixed, low-cardinality
   labels are sent: never element selectors, page text, resource URLs or search
   queries. */
(function () {
  "use strict";

  if (typeof PerformanceObserver === "undefined" || !navigator.sendBeacon) return;
  var supported = PerformanceObserver.supportedEntryTypes || [];
  var lcpEntry = null;
  var lcpFinal = false;
  var fcpValue = null;
  var clsValue = 0;
  var inpValue = null;
  var reported = false;

  function observe(type, handler, extra) {
    if (supported.indexOf(type) === -1) return null;
    try {
      var observer = new PerformanceObserver(function (list) { handler(list.getEntries()); });
      var options = { type: type, buffered: true };
      if (extra) for (var key in extra) options[key] = extra[key];
      observer.observe(options);
      return observer;
    } catch (error) { return null; }
  }

  var lcpObserver = observe("largest-contentful-paint", function (entries) {
    if (!lcpFinal && entries.length) lcpEntry = entries[entries.length - 1];
  });
  observe("paint", function (entries) {
    entries.forEach(function (entry) {
      if (entry.name === "first-contentful-paint") fcpValue = entry.startTime;
    });
  });

  function freezeLcp() {
    lcpFinal = true;
    if (!lcpObserver) return;
    try {
      var pending = lcpObserver.takeRecords ? lcpObserver.takeRecords() : [];
      if (pending.length) lcpEntry = pending[pending.length - 1];
      lcpObserver.disconnect();
    } catch (error) {}
    lcpObserver = null;
  }
  ["keydown", "click"].forEach(function (type) {
    addEventListener(type, freezeLcp, { once: true, capture: true });
  });

  var sessionValue = 0;
  var sessionFirst = 0;
  var sessionLast = 0;
  observe("layout-shift", function (entries) {
    entries.forEach(function (entry) {
      if (entry.hadRecentInput) return;
      if (sessionValue && entry.startTime - sessionLast < 1000 && entry.startTime - sessionFirst < 5000) {
        sessionValue += entry.value;
      } else {
        sessionValue = entry.value;
        sessionFirst = entry.startTime;
      }
      sessionLast = entry.startTime;
      if (sessionValue > clsValue) clsValue = sessionValue;
    });
  });

  var interactions = {};
  function recordInteraction(entry) {
    if (!entry.interactionId) return;
    interactions[entry.interactionId] = Math.max(interactions[entry.interactionId] || 0, entry.duration);
    var worst = 0;
    for (var id in interactions) worst = Math.max(worst, interactions[id]);
    inpValue = worst;
  }
  observe("event", function (entries) { entries.forEach(recordInteraction); }, { durationThreshold: 40 });
  observe("first-input", function (entries) { entries.forEach(recordInteraction); });

  function navigationEntry() {
    try { return performance.getEntriesByType("navigation")[0] || null; } catch (error) { return null; }
  }

  function lcpCategory(entry) {
    var element = entry && entry.element;
    if (!element || !element.tagName) return "other";
    var tag = String(element.tagName).toLowerCase();
    if (tag === "img" || tag === "picture" || tag === "video") return "image";
    if (/^h[1-6]$/.test(tag)) {
      return element.id === "heroTitle" || (element.closest && element.closest(".hero-panel,.ttc-hero"))
        ? "hero-heading"
        : "content-heading";
    }
    return element.closest && element.closest("article,.info-card,.show-card") ? "card" : "other";
  }

  function routeTemplate(pathname) {
    var parts = String(pathname || "/").split("/").filter(Boolean);
    if (!parts.length) return "home";
    if (parts[0] === "guides") return parts.length === 1 ? "guides-index" : "guide";
    if (parts[0] === "artists") return parts.length === 1 ? "artists-index" : parts[2] === "tickets" ? "artist-city" : "artist";
    if (parts[0] === "cities") return parts.length === 1 ? "cities-index" : "city";
    if (parts[0] === "venues") return parts.length === 1 ? "venues-index" : "venue";
    if (parts[0] === "blog") return parts.length === 1 ? "blog-index" : "blog-post";
    if (pathname === "/compare-concert-ticket-prices") return "comparison-hub";
    if (pathname === "/currency-converter") return "currency-converter";
    return "static";
  }

  function report() {
    if (reported) return;
    freezeLcp();
    var metadata = { routeTemplate: routeTemplate(window.location.pathname) };
    var navigation = navigationEntry();
    if (navigation) {
      var ttfb = navigation.responseStart - (navigation.activationStart || 0);
      if (isFinite(ttfb) && ttfb >= 0) metadata.ttfb = Math.round(ttfb);
      if (navigation.type) metadata.navigationType = String(navigation.type);
    }
    if (fcpValue !== null && isFinite(fcpValue)) metadata.fcp = Math.round(fcpValue);
    if (lcpEntry && isFinite(lcpEntry.startTime)) {
      metadata.lcp = Math.round(lcpEntry.startTime);
      metadata.lcpCategory = lcpCategory(lcpEntry);
      var loadedAt = Math.max(
        navigation && isFinite(navigation.responseEnd) ? navigation.responseEnd : 0,
        isFinite(lcpEntry.loadTime) ? lcpEntry.loadTime : 0
      );
      metadata.lcpRenderDelay = Math.round(Math.max(0, lcpEntry.startTime - loadedAt));
    }
    if (isFinite(clsValue)) metadata.cls = Math.round(clsValue * 10000) / 10000;
    if (inpValue !== null && isFinite(inpValue)) metadata.inp = Math.round(inpValue);
    if (!("ttfb" in metadata) && !("fcp" in metadata) && !("lcp" in metadata) && !("inp" in metadata)) return;
    reported = true;
    try {
      navigator.sendBeacon("/api/analytics", JSON.stringify({
        eventName: "web_vitals",
        sourcePath: window.location.pathname,
        metadata: metadata
      }));
    } catch (error) {}
  }

  addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") report();
  });
  addEventListener("pagehide", report);
})();
