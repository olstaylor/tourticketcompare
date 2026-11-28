/* Price snapshot history panels on show cards (artist, artist-city, city,
   venue and comparison-hub pages). Split out of artist-board.js on 2026-09-24:
   that module exits on pages without an artist board, so the "Show price
   snapshot history" buttons on city and venue cards did nothing.

   The price-drop interest form is rendered once per page as
   <template id="price-alert-interest-template"> and cloned into a panel the
   first time it opens, instead of being repeated, hidden, inside every card
   (~1.3 KB and ten elements per card on large boards). The panel only ever
   opens with JavaScript, so nothing is lost without it. */
(function () {
  "use strict";

  if (!document.querySelector("[data-price-history]")) return;

  // Clone the page's single interest form into this panel, bound to this
  // card's artist and event. Returns null when the page carries no template.
  function ensureInterestForm(panel, wrap) {
    var existing = panel.querySelector("form[data-price-alert-interest]");
    if (existing) return existing;
    var template = document.getElementById("price-alert-interest-template");
    if (!template || !template.content) return null;
    var form = template.content.querySelector("form");
    if (!form) return null;
    form = form.cloneNode(true);
    var showId = String(wrap.dataset.priceHistory || "");
    var suffix = showId.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    form.setAttribute("data-price-alert-interest", String(wrap.dataset.priceHistoryArtist || ""));
    form.setAttribute("data-event-id", showId);
    var label = form.querySelector("label[for]");
    var input = form.querySelector('input[name="email"]');
    if (label && input) {
      input.id = "price-alert-email-" + suffix;
      label.setAttribute("for", input.id);
    }
    var targetInput = form.querySelector('input[name="target"]');
    var targetLabel = form.querySelector('[data-alert-target] label');
    if (targetInput && targetLabel) {
      targetInput.id = "price-alert-target-" + suffix;
      targetLabel.setAttribute("for", targetInput.id);
    }
    return form;
  }

  function formatPrice(value, currency) {
    var amount = Number(value);
    if (!Number.isFinite(amount) || !currency) return "";
    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: String(currency).toUpperCase(),
        maximumFractionDigits: amount % 1 === 0 ? 0 : 2
      }).format(amount);
    } catch (error) { return ""; }
  }

  function formatSnapshotTime(value) {
    var date = new Date(value);
    if (!Number.isFinite(date.getTime())) return "";
    try {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC"
      }).format(date) + " UTC";
    } catch (error) { return ""; }
  }

  function formatSnapshotDay(value) {
    var date = new Date(String(value) + "T00:00:00Z");
    if (!Number.isFinite(date.getTime())) return "";
    try {
      return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(date);
    } catch (error) { return ""; }
  }

  function sparkline(points, currency) {
    var series = (Array.isArray(points) ? points : []).filter(function (point) { return Number.isFinite(Number(point && point.price)); });
    if (series.length < 2) return null;
    var prices = series.map(function (point) { return Number(point.price); });
    var min = Math.min.apply(Math, prices);
    var max = Math.max.apply(Math, prices);
    var span = max - min;
    var width = 260;
    var height = 56;
    var coordinates = series.map(function (point, index) {
      var x = 4 + ((width - 8) * index / (series.length - 1));
      var y = span ? 6 + ((height - 12) * (1 - ((Number(point.price) - min) / span))) : height / 2;
      return [x, y];
    });
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "price-history-spark");
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Listed-price snapshots between " + (formatPrice(min, currency) || min) + " and " + (formatPrice(max, currency) || max) + ".");
    var line = document.createElementNS(ns, "polyline");
    line.setAttribute("class", "price-history-spark-line");
    line.setAttribute("fill", "none");
    line.setAttribute("points", coordinates.map(function (pair) { return pair[0].toFixed(1) + "," + pair[1].toFixed(1); }).join(" "));
    svg.appendChild(line);
    var last = coordinates[coordinates.length - 1];
    var dot = document.createElementNS(ns, "circle");
    dot.setAttribute("class", "price-history-spark-dot");
    dot.setAttribute("cx", last[0].toFixed(1));
    dot.setAttribute("cy", last[1].toFixed(1));
    dot.setAttribute("r", "2.5");
    svg.appendChild(dot);
    return svg;
  }

  function appendText(parent, tag, value, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    parent.appendChild(node);
    return node;
  }

  // The optional target is offered only once the panel knows which currency
  // the show's prices are in, so the number means what the visitor sees.
  function offerTarget(form, data) {
    var box = form && form.querySelector("[data-alert-target]");
    if (!box) return;
    var providers = Array.isArray(data && data.providers) ? data.providers : [];
    var currencies = providers.map(function (s) { return String(s && s.currency || "").toUpperCase(); }).filter(function (c) { return /^[A-Z]{3}$/.test(c); });
    var first = currencies[0];
    if (!first || currencies.some(function (c) { return c !== first; })) return;
    form.dataset.targetCurrency = first;
    var tag = box.querySelector("[data-alert-target-currency]");
    if (tag) tag.textContent = first;
    box.hidden = false;
  }

  function renderPriceHistory(panel, wrap, data) {
    var interest = panel.querySelector("form[data-price-alert-interest]");
    offerTarget(interest, data);
    panel.replaceChildren();
    var rendered = 0;
    (Array.isArray(data && data.providers) ? data.providers : []).forEach(function (series) {
      var points = Array.isArray(series && series.points) ? series.points : [];
      if (points.length < 2) return;
      var block = document.createElement("div");
      block.className = "price-history-provider";
      appendText(block, "h5", String(series.provider || "Provider"), "price-history-provider-name");
      var chart = sparkline(points, series.currency);
      if (chart) block.appendChild(chart);
      var first = points[0];
      var last = points[points.length - 1];
      var latest = formatPrice(last.price, series.currency);
      var daily = series.basis === "daily";
      var firstAt = daily ? formatSnapshotDay(first.observedAt) : formatSnapshotTime(first.observedAt);
      var lastAt = daily ? formatSnapshotDay(last.observedAt) : formatSnapshotTime(last.observedAt);
      var counts = daily
        ? points.length + " daily checks, " + Number(series.priceChanges || 0) + " price changes"
        : points.length + " price changes";
      appendText(block, "p", latest && firstAt && lastAt
        ? counts + " · " + firstAt + " – " + lastAt + ". Latest: " + latest + "."
        : counts + ".", "price-history-caption muted");
      panel.appendChild(block);
      rendered += 1;
    });
    appendText(panel, "p", rendered
      ? String(data && data.framing || "Each ticket site's listed price when it was checked. Not live availability or your final total.")
      : "There aren't enough price checks for this date to show a history yet.", "disclosure-note");
    if (interest) {
      interest.hidden = false;
      panel.appendChild(interest);
    }
  }

  document.addEventListener("click", function (event) {
    var toggle = event.target && event.target.closest ? event.target.closest("[data-price-history-toggle]") : null;
    if (!toggle) return;
    var wrap = toggle.closest("[data-price-history]");
    var panel = wrap && wrap.querySelector("[data-price-history-panel]");
    if (!wrap || !panel) return;
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    toggle.textContent = expanded ? "Show price snapshot history" : "Hide price snapshot history";
    if (expanded || wrap.dataset.priceHistoryLoaded === "true") return;
    if (window.ttcAnalytics) window.ttcAnalytics.send("event_expand", {
      artistSlug: String(wrap.dataset.priceHistoryArtist || ""),
      showId: String(wrap.dataset.priceHistory || ""),
      panel: "price_history"
    });
    wrap.dataset.priceHistoryLoaded = "true";
    var interest = ensureInterestForm(panel, wrap);
    panel.replaceChildren();
    appendText(panel, "p", "Loading recent snapshots…", "disclosure-note");
    if (interest) {
      interest.hidden = true;
      panel.appendChild(interest);
    }
    fetch("/api/price-history?showId=" + encodeURIComponent(String(wrap.dataset.priceHistory || "")), { headers: { Accept: "application/json" } })
      .then(function (response) { if (!response.ok) throw new Error("history_unavailable"); return response.json(); })
      .then(function (data) { renderPriceHistory(panel, wrap, data); })
      .catch(function () {
        panel.replaceChildren();
        appendText(panel, "p", "Price history isn't available right now.", "disclosure-note");
        if (interest) {
          interest.hidden = false;
          panel.appendChild(interest);
        }
        wrap.dataset.priceHistoryLoaded = "";
      });
  });

  document.addEventListener("submit", function (event) {
    var form = event.target && event.target.closest ? event.target.closest("form[data-price-alert-interest]") : null;
    if (!form) return;
    event.preventDefault();
    if (form.dataset.submitting === "true") return;
    var status = form.querySelector("[data-alert-interest-status]");
    var email = String((form.querySelector('input[name="email"]') || {}).value || "").trim();
    var website = String((form.querySelector('input[name="website"]') || {}).value || "").trim();
    if (website) return;
    if (!email) { if (status) status.textContent = "Enter your email address first."; return; }
    form.dataset.submitting = "true";
    if (status) status.textContent = "Sending…";
    var submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;
    fetch("/api/price-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        website: website,
        artistSlug: String(form.dataset.priceAlertInterest || ""),
        eventId: String(form.dataset.eventId || ""),
        target: String((form.querySelector('input[name="target"]') || {}).value || "").trim(),
        targetCurrency: String(form.dataset.targetCurrency || ""),
        sourcePath: window.location.pathname
      })
    }).then(function (response) { return response.json().then(function (data) { return { ok: response.ok && data && data.ok, data: data || {} }; }); })
      .then(function (result) {
        if (!result.ok) {
          if (status && result.data.status === "invalid_target") status.textContent = "That target price didn't look right. Enter a whole number, or leave it blank.";
          else if (status && result.data.status === "rate_limited") status.textContent = "Too many tries just now. Please try again in a few minutes.";
          if (status && (result.data.status === "invalid_target" || result.data.status === "rate_limited")) {
            form.dataset.submitting = "";
            if (submit) submit.disabled = false;
            return;
          }
          throw new Error("signup_failed");
        }
        if (status) status.textContent = result.data.emailSent ? "Check your inbox for a link to confirm. Nothing is sent until you do." : "Request noted, but price emails aren't switched on yet.";
        var input = form.querySelector('input[name="email"]');
        if (input) input.value = "";
      }).catch(function () {
        if (status) status.textContent = "That couldn't be recorded just now — please try again later.";
        form.dataset.submitting = "";
        if (submit) submit.disabled = false;
      });
  });

})();
