/* Route-specific progressive enhancement for server-rendered artist boards.
   It filters and reorders existing cards; it never fetches or reconstructs
   event/provider data. */
(function () {
  "use strict";

  var section = document.querySelector(".show-board");
  var grid = section && section.querySelector("[data-show-grid]");
  if (!section || !grid) return;
  var cards = Array.from(grid.querySelectorAll("article.show-card[data-show-json]"));

  function parseCard(card) {
    try { return { card: card, show: JSON.parse(card.getAttribute("data-show-json") || "{}") }; }
    catch (error) { return null; }
  }
  var entries = cards.map(parseCard).filter(Boolean);

  function values(key, source) {
    return Array.from(new Set(source.map(function (entry) { return String(entry.show[key] || "").trim(); }).filter(Boolean))).sort();
  }
  function option(value, label) {
    var node = document.createElement("option");
    node.value = value;
    node.textContent = label;
    return node;
  }
  function select(label, allLabel, items) {
    var node = document.createElement("select");
    node.className = "show-filter-select";
    node.setAttribute("aria-label", label);
    node.appendChild(option("", allLabel));
    items.forEach(function (item) { node.appendChild(option(item, item)); });
    return node;
  }
  function dateValue(show) {
    var value = Date.parse(String(show.dateTimeISO || show.datetime_iso || ""));
    return Number.isFinite(value) ? value : 0;
  }
  function copy(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value);
    return Promise.reject(new Error("clipboard unavailable"));
  }

  if (entries.length > 1) {
    var params = new URLSearchParams(window.location.search);
    var state = {
      query: String(params.get("showQuery") || "").trim(),
      country: String(params.get("country") || "").trim(),
      city: String(params.get("city") || "").trim(),
      sort: "soonest"
    };
    var bar = document.createElement("div");
    bar.className = "show-filter-bar";
    var query = document.createElement("input");
    query.type = "search";
    query.className = "show-filter-input";
    query.placeholder = "Search by city, venue, or tour";
    query.setAttribute("aria-label", "Search listed shows by city, country, venue, event, or tour name");
    query.value = state.query;
    var country = select("Filter by country", "All countries", values("country", entries));
    var city = select("Filter by city", "All cities", values("city", entries));
    var sort = select("Sort by date", "Soonest first", ["Latest first"]);
    sort.options[1].value = "latest";
    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "show-filter-reset";
    reset.textContent = "Clear filters";
    var share = reset.cloneNode(true);
    share.textContent = "Copy filtered view";
    var count = document.createElement("p");
    count.className = "muted show-filter-count";
    count.setAttribute("role", "status");

    function refreshCityOptions(preferred) {
      var source = state.country
        ? entries.filter(function (entry) { return String(entry.show.country || "").trim() === state.country; })
        : entries;
      var allowed = values("city", source);
      city.replaceChildren(option("", "All cities"));
      allowed.forEach(function (item) { city.appendChild(option(item, item)); });
      if (preferred && allowed.indexOf(preferred) !== -1) {
        state.city = preferred;
        city.value = preferred;
      } else {
        state.city = "";
        city.value = "";
      }
    }

    if (Array.from(country.options).some(function (item) { return item.value === state.country; })) country.value = state.country;
    else state.country = "";
    refreshCityOptions(state.city);

    function updateUrl() {
      var url = new URL(window.location.href);
      [["showQuery", state.query], ["country", state.country], ["city", state.city]].forEach(function (item) {
        if (item[1]) url.searchParams.set(item[0], item[1]);
        else url.searchParams.delete(item[0]);
      });
      history.replaceState(history.state, "", url.pathname + url.search + url.hash);
    }
    function apply() {
      var terms = state.query.toLowerCase().split(/\s+/).filter(Boolean);
      var visible = entries.filter(function (entry) {
        var show = entry.show;
        if (state.country && String(show.country || "").trim() !== state.country) return false;
        if (state.city && String(show.city || "").trim() !== state.city) return false;
        var haystack = [show.city, show.country, show.venue, show.event_name, show.tour_name].join(" ").toLowerCase();
        return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
      }).sort(function (a, b) {
        var difference = dateValue(a.show) - dateValue(b.show);
        return state.sort === "latest" ? -difference : difference;
      });
      entries.forEach(function (entry) { entry.card.hidden = visible.indexOf(entry) === -1; });
      visible.forEach(function (entry) { grid.appendChild(entry.card); });
      count.textContent = "Showing " + visible.length + " of " + entries.length + " listed dates";
      updateUrl();
    }
    function resetAll() {
      state = { query: "", country: "", city: "", sort: "soonest" };
      query.value = country.value = "";
      refreshCityOptions("");
      sort.selectedIndex = 0;
      apply();
    }
    query.addEventListener("input", function () { state.query = query.value.trim(); apply(); });
    country.addEventListener("change", function () {
      state.country = country.value;
      refreshCityOptions(state.city);
      apply();
    });
    city.addEventListener("change", function () { state.city = city.value; apply(); });
    sort.addEventListener("change", function () { state.sort = sort.value || "soonest"; apply(); });
    reset.addEventListener("click", resetAll);
    share.addEventListener("click", function () {
      updateUrl();
      copy(window.location.href).then(function () {
        share.textContent = "Copied filtered view";
        window.setTimeout(function () { share.textContent = "Copy filtered view"; }, 1800);
      }).catch(function () {
        share.textContent = "Copy failed";
        window.setTimeout(function () { share.textContent = "Copy filtered view"; }, 1800);
      });
    });
    bar.append(query, country, city, sort, reset, share);
    grid.before(bar, count);
    apply();
  }

  document.addEventListener("click", function (event) {
    var action = event.target && event.target.closest ? event.target.closest("[data-copy-show-link]") : null;
    if (!action) return;
    event.preventDefault();
    var anchorId = String(action.getAttribute("data-copy-show-link") || "").trim();
    if (!anchorId) return;
    copy(window.location.origin + window.location.pathname + "#" + anchorId).then(function () {
      var label = action.textContent;
      action.textContent = "Copied";
      window.setTimeout(function () { action.textContent = label; }, 1800);
    });
  });

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
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC"
      }).format(date) + " UTC";
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

  function renderPriceHistory(panel, wrap, data) {
    var interest = panel.querySelector("form[data-price-alert-interest]");
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
      var firstAt = formatSnapshotTime(first.observedAt);
      var lastAt = formatSnapshotTime(last.observedAt);
      appendText(block, "p", latest && firstAt && lastAt
        ? points.length + " listed-price snapshots · " + firstAt + " – " + lastAt + ". Most recent: " + latest + "."
        : points.length + " listed-price snapshots.", "price-history-caption muted");
      panel.appendChild(block);
      rendered += 1;
    });
    appendText(panel, "p", rendered
      ? String(data && data.framing || "Provider-supplied listed-price snapshots, not live inventory, availability, or final checkout totals.")
      : "Not enough snapshots have been recorded yet to show a history for this event.", "disclosure-note");
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
    var interest = panel.querySelector("form[data-price-alert-interest]");
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
        appendText(panel, "p", "Price snapshot history isn't available right now.", "disclosure-note");
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
    if (!email) { if (status) status.textContent = "Enter an email address to register interest."; return; }
    form.dataset.submitting = "true";
    if (status) status.textContent = "Recording your interest…";
    var submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        website: website,
        artistSlug: String(form.dataset.priceAlertInterest || ""),
        eventId: String(form.dataset.eventId || ""),
        intent: "price_alert",
        sourcePath: window.location.pathname
      })
    }).then(function (response) { return response.json().then(function (data) { return { ok: response.ok && data && data.ok }; }); })
      .then(function (result) {
        if (!result.ok) throw new Error("signup_failed");
        if (status) status.textContent = "Thanks — interest noted. We're not sending price emails yet; this just helps us gauge demand.";
        var input = form.querySelector('input[name="email"]');
        if (input) input.value = "";
      }).catch(function () {
        if (status) status.textContent = "We couldn't record that just now — please try again later.";
        form.dataset.submitting = "";
        if (submit) submit.disabled = false;
      });
  });

  document.querySelectorAll("form[data-watchlist-shell]").forEach(function (form) {
    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = false;
  });
})();
