// Internal Impact Publisher Tag test helper.
// Loaded only by the gated /internal/impact-tag-test route.
// 1. Optionally bootstraps a second Impact Publisher SDK (SeatGeek) using a
//    distinct global name so it does not collide with the page-wide
//    impactStat function used by the Ticketmaster tag.
// 2. Snapshots href values on every [data-test-link] anchor at DOMContentLoaded
//    and again ~2s later, then renders a local diagnostic table. Nothing is
//    sent off-device.
(function () {
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
      var a = anchors[i];
      var href = a.getAttribute("href") || "";
      rows.push({
        label: (a.textContent || "").trim(),
        provider: a.getAttribute("data-provider") || "",
        testId: a.getAttribute("data-test-link") || "",
        href: href,
        host: hostOf(a.href)
      });
    }
    return rows;
  }

  function renderTable(initial, after) {
    var target = document.getElementById("tagTestResults");
    if (!target) return;
    var rows = [];
    for (var i = 0; i < initial.length; i++) {
      var a = initial[i];
      var b = after[i] || {};
      var changed = a.host !== b.host ? "yes" : "no";
      rows.push(
        '<tr><td>' + a.label +
        '</td><td>' + a.provider +
        '</td><td>' + a.testId +
        '</td><td>' + a.host +
        '</td><td>' + (b.host || "") +
        '</td><td>' + changed +
        '</td></tr>'
      );
    }
    target.innerHTML =
      "<thead><tr>" +
      "<th>label</th><th>data-provider</th><th>data-test-link</th>" +
      "<th>initial href host</th><th>post-load href host</th><th>changed</th>" +
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
