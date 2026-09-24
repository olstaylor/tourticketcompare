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
    // Country, city, sort and the two utility buttons sit behind one "Filters"
    // toggle, so the first date is not pushed a screen down by six controls.
    // It opens on load when the URL already carries a country or city filter.
    var filtersId = "show-filter-extra";
    var filtersToggle = document.createElement("button");
    filtersToggle.type = "button";
    filtersToggle.className = "show-filter-reset show-filter-toggle";
    filtersToggle.textContent = "Filters";
    filtersToggle.setAttribute("aria-controls", filtersId);
    var extra = document.createElement("div");
    extra.className = "show-filter-extra";
    extra.id = filtersId;
    function setFiltersOpen(open) {
      extra.hidden = !open;
      filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    // Long boards show the first BOARD_LIMIT dates, then one button for the
    // rest. Every card stays in the HTML (no-JS visitors and crawlers see them
    // all); a search or filter always shows every match, and a link or month
    // jump to a later date expands the board first.
    var BOARD_LIMIT = 15;
    var expanded = entries.length <= BOARD_LIMIT + 5;
    var more = document.createElement("button");
    more.type = "button";
    more.className = "button button-secondary show-board-more";
    more.hidden = true;

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
      var filtered = Boolean(state.query || state.country || state.city);
      var capped = !expanded && !filtered && visible.length > BOARD_LIMIT;
      var shown = capped ? visible.slice(0, BOARD_LIMIT) : visible;
      entries.forEach(function (entry) { entry.card.hidden = shown.indexOf(entry) === -1; });
      visible.forEach(function (entry) { grid.appendChild(entry.card); });
      count.textContent = "Showing " + shown.length + " of " + entries.length + " listed dates";
      more.hidden = !capped;
      more.textContent = "Show all " + visible.length + " dates";
      updateUrl();
    }
    function expandTo(anchorId) {
      var target = anchorId ? document.getElementById(anchorId) : null;
      if (!target || !grid.contains(target) || !target.hidden || expanded) return;
      expanded = true;
      apply();
      target.scrollIntoView({ block: "start" });
    }
    more.addEventListener("click", function () {
      expanded = true;
      apply();
    });
    // A month jump or a shared #show- link can point past the first dates.
    window.addEventListener("hashchange", function () { expandTo(decodeURIComponent(window.location.hash.slice(1))); });
    section.addEventListener("click", function (event) {
      var jump = event.target && event.target.closest ? event.target.closest(".show-board-jump a[href^='#']") : null;
      if (jump) expandTo(decodeURIComponent(jump.getAttribute("href").slice(1)));
    });
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
    extra.append(country, city, sort, reset, share);
    bar.append(query, filtersToggle, extra);
    setFiltersOpen(Boolean(state.country || state.city));
    filtersToggle.addEventListener("click", function () { setFiltersOpen(extra.hidden); });
    grid.before(bar, count);
    grid.after(more);
    // A deep link to a date beyond the first BOARD_LIMIT keeps the board open.
    var initialTarget = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (initialTarget && grid.contains(initialTarget)) {
      var sortedIds = entries.slice().sort(function (a, b) { return dateValue(a.show) - dateValue(b.show); }).map(function (entry) { return entry.card; });
      if (sortedIds.indexOf(initialTarget) >= BOARD_LIMIT) expanded = true;
    }
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

  document.querySelectorAll("form[data-watchlist-shell]").forEach(function (form) {
    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = false;
  });
})();
