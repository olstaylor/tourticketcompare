// Internal Impact Publisher Tag test helper.
// Loaded only by the gated /internal/impact-tag-test route.
// 1. Optionally bootstraps a second Impact Publisher SDK (SeatGeek) using a
//    distinct global name so it does not collide with the page-wide
//    impactStat function used by the Ticketmaster tag.
// 2. Snapshots full href values on every [data-test-link] anchor at
//    DOMContentLoaded and again ~2s later, then renders a local diagnostic
//    table including detected affiliate/tracking params. Nothing is sent
//    off-device.
(function () {
  // Affiliate / tracking query parameters we treat as evidence that an Impact
  // Publisher Tag (or equivalent affiliate decorator) has rewritten a link.
  // Detection is case-insensitive on the key; "wt.mc_id" intentionally
  // contains a dot.
  var TRACKING_PARAMS = [
    "irgwc",
    "afsrc",
    "clickid",
    "camefrom",
    "impradid",
    "REFERRAL_ID",
    "wt.mc_id",
    "utm_source",
    "utm_medium",
    "ircid"
  ];

  function safeImpactCdn(url) {
    try {
      var u = new URL(url);
      if (u.protocol !== "https:") return null;
      if (!/(^|\.)impactcdn\.com$|(^|\.)impact\.com$/.test(u.hostname)) return null;
      return u.toString();
    } catch (err) {
      return null;
    }
  }

  function hostOf(href) {
    if (!href) return "";
    try {
      return new URL(href, window.location.href).host;
    } catch (err) {
      return "";
    }
  }

  function absoluteHref(href) {
    if (!href) return "";
    try {
      return new URL(href, window.location.href).toString();
    } catch (err) {
      return href;
    }
  }

  function detectTrackingParams(href) {
    if (!href) return [];
    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (err) {
      return [];
    }
    // Build a lowercase key set once so detection is case-insensitive while
    // still reporting the canonical TRACKING_PARAMS spelling.
    var present = {};
    url.searchParams.forEach(function (_value, key) {
      present[key.toLowerCase()] = true;
    });
    var found = [];
    for (var i = 0; i < TRACKING_PARAMS.length; i++) {
      if (present[TRACKING_PARAMS[i].toLowerCase()]) found.push(TRACKING_PARAMS[i]);
    }
    return found;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function truncate(value, max) {
    var s = String(value == null ? "" : value);
    if (s.length <= max) return s;
    return s.slice(0, max) + "…";
  }

  function bootstrapSeatGeekTag() {
    var meta = document.querySelector('meta[name="impact-sg-tag-src"]');
    var raw = meta ? meta.getAttribute("content") : null;
    var src = raw ? safeImpactCdn(raw) : null;
    var status = document.getElementById("sgTagStatus");
    if (!src) {
      if (status) {
        status.textContent =
          "SeatGeek Publisher Tag not loaded (IMPACT_SEATGEEK_PUBLISHER_TAG_URL missing or not an impactcdn.com/impact.com URL).";
      }
      return;
    }
    var name = "impactStatSG";
    window[name] = window[name] || function () {
      (window[name].a = window[name].a || []).push(arguments);
    };
    window.ire_o_sg = name;
    var el = document.createElement("script");
    el.async = true;
    el.src = src;
    var first = document.getElementsByTagName("script")[0];
    if (first && first.parentNode) {
      first.parentNode.insertBefore(el, first);
    } else {
      document.head.appendChild(el);
    }
    window[name]("transformLinks");
    window[name]("trackImpression");
    if (status) {
      status.textContent = "SeatGeek Publisher Tag loaded under window.impactStatSG.";
    }
  }

  function snapshot() {
    var anchors = document.querySelectorAll("[data-test-link]");
    var rows = [];
    for (var i = 0; i < anchors.length; i++) {
      var el = anchors[i];
      // <a> elements expose an absolute .href; <span> placeholders for
      // disabled links do not. Fall back to the raw attribute and resolve
      // against the document base when needed.
      var rawHref = el.getAttribute("href");
      var resolved = el.tagName === "A" && el.href ? el.href : absoluteHref(rawHref);
      rows.push({
        label: (el.textContent || "").trim(),
        provider: el.getAttribute("data-provider") || "",
        testId: el.getAttribute("data-test-link") || "",
        href: resolved || "",
        host: hostOf(resolved)
      });
    }
    return rows;
  }

  function classifyRow(testId, initialHref, finalHref, paramsFound) {
    var disabled = !initialHref && !finalHref;
    if (disabled) return { kind: "disabled", text: "disabled (no href)" };

    var hrefChanged = initialHref !== finalHref;
    var hasParams = paramsFound.length > 0;
    var isRaw = /^raw-/.test(testId);
    var isOut = /^out-/.test(testId);

    if (isRaw) {
      if (hrefChanged || hasParams) return { kind: "pass", text: "transformed" };
      return { kind: "fail", text: "not transformed" };
    }
    if (isOut) {
      if (!hrefChanged && !hasParams) return { kind: "pass", text: "untouched (expected)" };
      return { kind: "fail", text: "unexpectedly altered" };
    }
    return { kind: "info", text: "n/a" };
  }

  function hrefCell(href) {
    if (!href) return '<span class="muted">(none)</span>';
    var truncated = escapeHtml(truncate(href, 80));
    var full = escapeHtml(href);
    return (
      '<details class="href-details">' +
      '<summary><code class="href-preview">' + truncated + '</code></summary>' +
      '<code class="href-full">' + full + '</code>' +
      '</details>'
    );
  }

  function renderTable(initial, after) {
    var target = document.getElementById("tagTestResults");
    if (!target) return;
    var rows = [];
    for (var i = 0; i < initial.length; i++) {
      var a = initial[i];
      var b = after[i] || {};
      var initialHref = a.href || "";
      var finalHref = b.href || "";
      var initialHost = a.host || "";
      var finalHost = b.host || "";
      var hrefChanged = (initialHref || finalHref) && initialHref !== finalHref;
      var params = detectTrackingParams(finalHref);
      var verdict = classifyRow(a.testId, initialHref, finalHref, params);

      var paramsCell = params.length
        ? params.map(function (p) { return '<code>' + escapeHtml(p) + '</code>'; }).join(" ")
        : '<span class="muted">none</span>';

      rows.push(
        '<tr class="row-' + escapeHtml(verdict.kind) + '">' +
        '<td>' + escapeHtml(a.label) + '</td>' +
        '<td>' + escapeHtml(a.provider) + '</td>' +
        '<td>' + escapeHtml(a.testId) + '</td>' +
        '<td>' + escapeHtml(initialHost || "—") + '</td>' +
        '<td>' + escapeHtml(finalHost || "—") + '</td>' +
        '<td>' + hrefCell(initialHref) + '</td>' +
        '<td>' + hrefCell(finalHref) + '</td>' +
        '<td>' + (hrefChanged ? "yes" : "no") + '</td>' +
        '<td>' + (params.length ? "yes" : "no") + '</td>' +
        '<td>' + paramsCell + '</td>' +
        '<td class="verdict verdict-' + escapeHtml(verdict.kind) + '">' + escapeHtml(verdict.text) + '</td>' +
        '</tr>'
      );
    }
    target.innerHTML =
      "<thead><tr>" +
      "<th>label</th>" +
      "<th>data-provider</th>" +
      "<th>data-test-link</th>" +
      "<th>initial host</th>" +
      "<th>post-load host</th>" +
      "<th>initial href</th>" +
      "<th>post-load href</th>" +
      "<th>full href changed</th>" +
      "<th>affiliate params present</th>" +
      "<th>detected params</th>" +
      "<th>verdict</th>" +
      "</tr></thead><tbody>" + rows.join("") + "</tbody>";
  }

  function init() {
    bootstrapSeatGeekTag();
    var initial = snapshot();
    setTimeout(function () {
      renderTable(initial, snapshot());
    }, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
