/* "My shows": a visitor can save a date on an artist page and come back to see
   its current lowest listed price against the one recorded when they saved it.
   Saved shows live only in this browser (localStorage); nothing is sent to the
   site except the saved show ids when /my-shows is opened, to look up current
   prices (/api/my-shows). No account, no email, no tracking. */
(function () {
  "use strict";
  var KEY = "ttc_my_shows_v1";
  var MAX = 20;

  function load() {
    try {
      var list = JSON.parse(window.localStorage.getItem(KEY) || "[]");
      return Array.isArray(list) ? list.filter(function (s) { return s && s.id && s.slug; }).slice(0, MAX) : [];
    } catch (e) { return []; }
  }
  function store(list) {
    try { window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX))); return true; } catch (e) { return false; }
  }
  function slugify(v) { return String(v || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function query(list) { return list.map(function (s) { return s.slug + "~" + s.id; }).join(","); }
  function money(low) {
    return low.currency + " " + (low.amount % 1 === 0 ? String(low.amount) : low.amount.toFixed(2));
  }
  function ageText(iso) {
    var t = Date.parse(iso);
    if (!isFinite(t)) return "";
    var m = Math.max(0, Math.round((Date.now() - t) / 60000));
    return m < 60 ? "under an hour ago" : (m < 2880 ? Math.round(m / 60) + " hours ago" : Math.round(m / 1440) + " days ago");
  }
  function dayText(iso) {
    var t = Date.parse(iso);
    return isFinite(t) ? new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
  }
  function fetchShows(list) {
    return fetch("/api/my-shows?s=" + encodeURIComponent(query(list)), { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : { shows: [] }; })
      .then(function (b) { return Array.isArray(b.shows) ? b.shows : []; })
      .catch(function () { return []; });
  }

  // 1. Save buttons on artist-page show cards.
  var m = window.location.pathname.match(/^\/artists\/([a-z0-9-]+)/);
  if (m) {
    var artistSlug = m[1];
    document.querySelectorAll("article.show-card[data-event-id]").forEach(function (card) {
      var id = card.getAttribute("data-event-id");
      var actions = card.querySelector(".show-card-actions");
      if (!id || !actions || actions.querySelector("[data-save-show]")) return;
      var button = document.createElement("button");
      button.type = "button";
      button.className = "text-link";
      button.setAttribute("data-save-show", id);
      var link = document.createElement("a");
      link.className = "text-link";
      link.href = "/my-shows";
      link.textContent = "My shows";
      link.hidden = true;
      function paint() {
        var on = load().some(function (s) { return s.id === id; });
        button.setAttribute("aria-pressed", on ? "true" : "false");
        button.textContent = on ? "Saved: remove from My shows" : "Save this date";
        link.hidden = !on;
      }
      button.addEventListener("click", function () {
        var list = load();
        var at = list.findIndex(function (s) { return s.id === id; });
        if (at >= 0) {
          list.splice(at, 1);
          store(list);
          paint();
          return;
        }
        if (list.length >= MAX) { button.textContent = "My shows is full (" + MAX + ")"; return; }
        var entry = { id: id, slug: artistSlug, savedAt: new Date().toISOString(), price: null };
        list.unshift(entry);
        if (!store(list)) { button.textContent = "Could not save in this browser"; return; }
        paint();
        // Record the lowest listed price at the moment of saving, if there is one.
        fetchShows([entry]).then(function (rows) {
          var row = rows[0];
          if (!row || !row.lowest) return;
          var current = load();
          var mine = current.find(function (s) { return s.id === id; });
          if (!mine) return;
          mine.price = { amount: row.lowest.amount, currency: row.lowest.currency, provider: row.lowest.provider, checked_at: row.lowest.checked_at };
          store(current);
        });
      });
      actions.appendChild(button);
      actions.appendChild(link);
      paint();
    });
  }

  // 2. The /my-shows page.
  var root = document.querySelector("[data-my-shows]");
  if (!root) return;
  var status = root.querySelector("[data-my-shows-status]");
  var out = root.querySelector("[data-my-shows-list]");
  var list = load();
  function say(text) { if (status) status.textContent = text; }
  if (!list.length) {
    say("You have not saved any shows yet. Open an artist page and choose “Save this date” on a show.");
    return;
  }
  say("Checking current prices…");
  fetchShows(list).then(function (rows) {
    var byId = {};
    rows.forEach(function (r) { byId[r.id] = r; });
    var items = list.map(function (s) { return { saved: s, row: byId[s.id] || null }; });
    items.sort(function (a, b) {
      var ta = a.row && a.row.datetime_iso ? Date.parse(a.row.datetime_iso) : Infinity;
      var tb = b.row && b.row.datetime_iso ? Date.parse(b.row.datetime_iso) : Infinity;
      return ta - tb;
    });
    say(rows.length ? "" : "Prices could not be loaded right now. Your saved shows are still here.");
    out.textContent = "";
    items.forEach(function (it) {
      var s = it.saved, r = it.row;
      var li = document.createElement("article");
      li.className = "info-card";
      var h = document.createElement("h3");
      var a = document.createElement("a");
      a.className = "text-link";
      a.href = "/artists/" + encodeURIComponent(s.slug) + "#show-" + slugify(s.id);
      a.textContent = r && r.status === "upcoming" ? (r.artist_name || s.slug) + ", " + r.city : s.slug.replace(/-/g, " ");
      h.appendChild(a);
      li.appendChild(h);
      var p = document.createElement("p");
      if (r && r.status === "upcoming") {
        p.textContent = [dayText(r.datetime_iso), r.venue].filter(Boolean).join(" · ");
      } else if (r) {
        p.textContent = r.status === "past" ? "This date has passed." : "This date is no longer listed on the site.";
      }
      li.appendChild(p);
      if (r && r.status === "upcoming") {
        var price = document.createElement("p");
        price.className = "muted";
        var parts = [];
        if (r.lowest) {
          parts.push("Lowest listed now: " + money(r.lowest) + " on " + r.lowest.provider + ", checked " + ageText(r.lowest.checked_at) + ". Not the final total.");
          var was = s.price;
          if (was) {
            var same = was.currency === r.lowest.currency && was.provider === r.lowest.provider;
            if (same && was.amount !== r.lowest.amount) {
              parts.push("On " + dayText(s.savedAt) + ", when you saved it, " + was.provider + " listed " + money(was) + " (" + (r.lowest.amount < was.amount ? "lower" : "higher") + " now).");
            } else if (same) {
              parts.push("Unchanged since " + dayText(s.savedAt) + ", when you saved it.");
            } else {
              parts.push("When you saved it: " + money(was) + " on " + was.provider + " (a different site, so not compared).");
            }
          } else {
            parts.push("No listed price was recorded when you saved it, so there is nothing to compare yet.");
          }
        } else {
          parts.push("No current listed price from our tracked sites. Open the show for its ticket options.");
        }
        price.textContent = parts.join(" ");
        li.appendChild(price);
      }
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "text-link";
      remove.textContent = "Remove";
      remove.addEventListener("click", function () {
        store(load().filter(function (x) { return x.id !== s.id; }));
        li.remove();
        if (!load().length) say("You have not saved any shows yet.");
      });
      li.appendChild(remove);
      out.appendChild(li);
    });
  });
})();
