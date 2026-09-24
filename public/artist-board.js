/* Route-specific progressive enhancement for server-rendered show boards and
   index pages. It filters and reorders existing cards and tiles; it never
   fetches or reconstructs event/provider data.

   - Artist and artist-city boards (.show-board): one grid of date cards.
   - City and venue boards ([data-show-list]): the same cards in groups (by
     venue or by artist), so they are filtered and shortened but not re-sorted.
   - /artists, /cities, /venues ([data-tile-filter]): a filter box over the
     compact tile lists. */
(function () {
  "use strict";

  function fold(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function copy(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value);
    return Promise.reject(new Error("clipboard unavailable"));
  }

  function initTileFilter() {
    var box = document.querySelector("[data-tile-filter]");
    var input = box && box.querySelector("input");
    if (!input) return;
    var status = box.querySelector(".tile-filter-count");
    var lists = Array.from(document.querySelectorAll("[data-tile-list]"));
    var items = [];
    lists.forEach(function (list) {
      Array.from(list.children).forEach(function (item) { items.push({ item: item, text: fold(item.textContent) }); });
    });
    if (!items.length) return;
    // "Show all" sections open while a search runs, so matches inside them
    // show, and go back to how the visitor left them when the box is cleared.
    var mores = Array.from(document.querySelectorAll("[data-tile-more]")).map(function (node) {
      return { node: node, open: node.open };
    });
    box.hidden = false;
    input.addEventListener("input", function () {
      var terms = fold(input.value).split(/\s+/).filter(Boolean);
      mores.forEach(function (more) {
        if (terms.length) {
          if (!more.searching) more.open = more.node.open;
          more.searching = true;
          more.node.open = true;
        } else if (more.searching) {
          more.searching = false;
          more.node.open = more.open;
        }
      });
      var shown = 0;
      items.forEach(function (entry) {
        var match = terms.every(function (term) { return entry.text.indexOf(term) !== -1; });
        entry.item.hidden = !match;
        if (match) shown += 1;
      });
      // A group with nothing left in it (e.g. "No dates currently listed")
      // hides along with its heading.
      lists.forEach(function (list) {
        var empty = !list.querySelector(":scope > :not([hidden])");
        var group = list.closest(".artist-status-section") || list.closest("[data-tile-more]");
        (group || list).hidden = empty;
      });
      if (status) status.textContent = terms.length ? (shown ? shown + (shown === 1 ? " match" : " matches") : "No matches") : "";
    });
  }

  function initBoard() {
    var section = document.querySelector(".show-board") || document.querySelector("[data-show-list]");
    var grids = section ? Array.from(section.querySelectorAll("[data-show-grid]")) : [];
    if (!grids.length) return;
    // City and venue boards group their cards; their order is the server's.
    var grouped = !section.classList.contains("show-board");
    var groups = grouped ? Array.from(section.querySelectorAll("[data-show-group]")) : [];
    var grid = grids[0];
    var cards = Array.from(section.querySelectorAll("article.show-card[data-show-json]"));

    function parseCard(card) {
      try { return { card: card, show: JSON.parse(card.getAttribute("data-show-json") || "{}") }; }
      catch (error) { return null; }
    }
    var entries = cards.map(parseCard).filter(Boolean);
    if (entries.length < 2) return;
    entries.forEach(function (entry) { entry.group = grouped ? entry.card.closest("[data-show-group]") : null; });

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
    query.placeholder = grouped ? "Search by artist, venue, or tour" : "Search by city, venue, or tour";
    query.setAttribute("aria-label", "Search listed shows by artist, city, country, venue, event, or tour name");
    query.value = state.query;
    // A select only earns its place when it has more than one value to pick:
    // a one-city page gets no city select.
    var countryValues = values("country", entries);
    var cityValues = values("city", entries);
    var country = countryValues.length > 1 ? select("Filter by country", "All countries", countryValues) : null;
    var city = cityValues.length > 1 ? select("Filter by city", "All cities", cityValues) : null;
    var sort = null;
    if (!grouped) {
      sort = select("Sort by date", "Soonest first", ["Latest first"]);
      sort.options[1].value = "latest";
    }
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
    var hasExtra = Boolean(country || city || sort);
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
    // Grouped boards cap each group instead (GROUP_LIMIT dates per venue or
    // artist), so every group stays on screen rather than the first one or two
    // filling the whole allowance.
    var BOARD_LIMIT = 15;
    var GROUP_LIMIT = 3;
    var expanded = entries.length <= BOARD_LIMIT + 5;
    var more = document.createElement("button");
    more.type = "button";
    more.className = "button button-secondary show-board-more";
    more.hidden = true;

    function refreshCityOptions(preferred) {
      if (!city) {
        state.city = "";
        return;
      }
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

    if (country && Array.from(country.options).some(function (item) { return item.value === state.country; })) country.value = state.country;
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
      var terms = fold(state.query).split(/\s+/).filter(Boolean);
      var visible = entries.filter(function (entry) {
        var show = entry.show;
        if (state.country && String(show.country || "").trim() !== state.country) return false;
        if (state.city && String(show.city || "").trim() !== state.city) return false;
        var haystack = fold([show.artist_name, show.city, show.country, show.venue, show.event_name, show.tour_name].join(" "));
        return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
      });
      if (!grouped) {
        visible.sort(function (a, b) {
          var difference = dateValue(a.show) - dateValue(b.show);
          return state.sort === "latest" ? -difference : difference;
        });
      }
      var filtered = Boolean(state.query || state.country || state.city);
      var capped = !expanded && !filtered && visible.length > BOARD_LIMIT;
      var shown = visible;
      if (capped && grouped) {
        var perGroup = new Map();
        shown = visible.filter(function (entry) {
          var used = perGroup.get(entry.group) || 0;
          perGroup.set(entry.group, used + 1);
          return used < GROUP_LIMIT;
        });
        capped = shown.length < visible.length;
      } else if (capped) {
        shown = visible.slice(0, BOARD_LIMIT);
      }
      entries.forEach(function (entry) { entry.card.hidden = shown.indexOf(entry) === -1; });
      if (!grouped) visible.forEach(function (entry) { grid.appendChild(entry.card); });
      groups.forEach(function (group) { group.hidden = !group.querySelector("article.show-card:not([hidden])"); });
      count.textContent = "Showing " + shown.length + " of " + entries.length + " listed dates";
      more.hidden = !capped;
      more.textContent = "Show all " + visible.length + " dates";
      updateUrl();
    }
    function expandTo(anchorId) {
      var target = anchorId ? document.getElementById(anchorId) : null;
      if (!target || !section.contains(target) || !target.hidden || expanded) return;
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
      query.value = "";
      if (country) country.value = "";
      refreshCityOptions("");
      if (sort) sort.selectedIndex = 0;
      apply();
    }
    query.addEventListener("input", function () { state.query = query.value.trim(); apply(); });
    if (country) {
      country.addEventListener("change", function () {
        state.country = country.value;
        refreshCityOptions(state.city);
        apply();
      });
    }
    if (city) city.addEventListener("change", function () { state.city = city.value; apply(); });
    if (sort) sort.addEventListener("change", function () { state.sort = sort.value || "soonest"; apply(); });
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
    if (hasExtra) {
      [country, city, sort, reset, share].forEach(function (node) { if (node) extra.appendChild(node); });
      bar.append(query, filtersToggle, extra);
      setFiltersOpen(Boolean(state.country || state.city));
      filtersToggle.addEventListener("click", function () { setFiltersOpen(extra.hidden); });
    } else {
      bar.append(query);
    }
    var first = grouped ? groups[0] || grid : grid;
    var last = grouped ? groups[groups.length - 1] || grid : grid;
    first.before(bar, count);
    last.after(more);
    // A deep link to a date beyond the first BOARD_LIMIT keeps the board open.
    var initialTarget = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (initialTarget && section.contains(initialTarget)) {
      var ordered = grouped
        ? entries
        : entries.slice().sort(function (a, b) { return dateValue(a.show) - dateValue(b.show); });
      var targetEntry = ordered.filter(function (entry) { return entry.card === initialTarget; })[0];
      var position = grouped && targetEntry
        ? ordered.filter(function (entry) { return entry.group === targetEntry.group; }).indexOf(targetEntry)
        : ordered.indexOf(targetEntry);
      if (position >= (grouped ? GROUP_LIMIT : BOARD_LIMIT)) expanded = true;
    }
    apply();
  }

  initTileFilter();
  initBoard();

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
