/* Real-user Core Web Vitals (LCP, INP, CLS) reported to the first-party
   analytics endpoint (functions/api/analytics.js, event "web_vitals").
   External file on purpose: the site CSP has no 'unsafe-inline' and only
   hash-authorises the gtag snippet, so this must load via script-src 'self'.
   Dependency-free; observers follow the web-vitals library's definitions:
   LCP freezes at first input or first hide, CLS uses 5s session windows
   with 1s gaps, INP takes the worst interaction deduped by interactionId. */
(function () {
  "use strict";

  if (typeof PerformanceObserver === "undefined" || !navigator.sendBeacon) return;
  var supported = PerformanceObserver.supportedEntryTypes || [];

  var lcpValue = null;
  var lcpFinal = false;
  var clsValue = 0;
  var inpValue = null;
  var reported = false;

  function observe(type, handler, extra) {
    if (supported.indexOf(type) === -1) return null;
    try {
      var po = new PerformanceObserver(function (list) {
        handler(list.getEntries());
      });
      var options = { type: type, buffered: true };
      if (extra) for (var key in extra) options[key] = extra[key];
      po.observe(options);
      return po;
    } catch (error) {
      return null;
    }
  }

  var lcpObserver = observe("largest-contentful-paint", function (entries) {
    if (lcpFinal) return;
    var last = entries[entries.length - 1];
    if (last) lcpValue = last.startTime;
  });

  function freezeLcp() {
    lcpFinal = true;
    if (lcpObserver) {
      try { lcpObserver.takeRecords && lcpObserver.takeRecords(); lcpObserver.disconnect(); } catch (error) {}
      lcpObserver = null;
    }
  }
  ["keydown", "click"].forEach(function (type) {
    addEventListener(type, freezeLcp, { once: true, capture: true });
  });

  // CLS session windows: shifts within 1s of the previous shift and 5s of the
  // window start accumulate; the page's CLS is the worst window seen.
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

  // INP: worst duration per interaction (deduped by interactionId), reported
  // as the page's slowest interaction. durationThreshold 40 keeps observer
  // callbacks cheap while still catching anything above the 200ms "good" bar.
  var interactions = {};
  function recordInteraction(entry) {
    if (!entry.interactionId) return;
    var previous = interactions[entry.interactionId] || 0;
    if (entry.duration > previous) interactions[entry.interactionId] = entry.duration;
    var worst = 0;
    for (var id in interactions) {
      if (interactions[id] > worst) worst = interactions[id];
    }
    inpValue = worst;
  }
  observe("event", function (entries) { entries.forEach(recordInteraction); }, { durationThreshold: 40 });
  observe("first-input", function (entries) { entries.forEach(recordInteraction); });

  function navigationType() {
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      return nav && nav.type ? String(nav.type) : "";
    } catch (error) {
      return "";
    }
  }

  function report() {
    if (reported) return;
    var metadata = {};
    if (lcpValue !== null && isFinite(lcpValue)) metadata.lcp = Math.round(lcpValue);
    if (isFinite(clsValue)) metadata.cls = Math.round(clsValue * 10000) / 10000;
    if (inpValue !== null && isFinite(inpValue)) metadata.inp = Math.round(inpValue);
    if (!("lcp" in metadata) && !("inp" in metadata) && metadata.cls === 0) return;
    var type = navigationType();
    if (type) metadata.navigationType = type;
    reported = true;
    freezeLcp();
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
  // Safari can skip visibilitychange on navigation-away; pagehide is the fallback.
  addEventListener("pagehide", report);
})();
