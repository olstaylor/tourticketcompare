/* TourTicketCompare — hybrid homepage renderer (vanilla, no build).
   Reads the repo's REAL data directly:
     - data/catalog.json       (artists, ticket_links, providers, updated_at)
     - data/events-index.json  (announced events)
   Renders into #ttc-main. Mirrors how app.js hydrates <main> client-side.

   COMPLIANCE (SAFE_PUBLISHING_RULES.md):
   - Verification + "last checked" come from ticket_links[] (verified && public_enabled).
   - A ticket button renders ONLY for a verified, publicly-enabled destination whose
     provider is also public_enabled. Disabled providers never surface as buttons.
   - No invented dates/venues: every date is read from events-index.json.
   - No live prices, no "cheapest"/price-comparison claims anywhere.
*/
(function () {
  "use strict";

  /* ---------- DOM helper ---------- */
  function h(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k === "html") e.innerHTML = attrs[k];
      else if (k.startsWith("on") && typeof attrs[k] === "function") e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(c => { if (c == null) return; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  const frag = (kids) => { const f = document.createDocumentFragment(); kids.forEach(k => k && f.appendChild(k)); return f; };

  /* ---------- icons ---------- */
  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>',
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,12.5 9.5,18 20,6"/></svg>',
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg>',
  };
  const svg = (name) => { const s = h("span"); s.innerHTML = ICON[name]; return s.firstChild; };
  const pulse = () => h("span", { class: "ttc-pulse" }, [h("i")]);

  /* ---------- monogram ---------- */
  function monogram(name, size) {
    const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    let hue = 0; for (let i = 0; i < name.length; i++) hue = (hue * 31 + name.charCodeAt(i)) % 360;
    // CSP (style-src 'self') forbids inline styles, so size + per-name colour are
    // expressed as classes defined in ttc-home.css (12 hue buckets, fixed sizes).
    const bucket = Math.floor(hue / 30) % 12;
    const sizeClass = size >= 32 ? "ttc-mono--32" : "ttc-mono--30";
    return h("span", { class: "ttc-mono " + sizeClass + " ttc-mono--c" + bucket }, [initials]);
  }

  /* ---------- date helpers (timezone-safe: parse the date part directly) ---------- */
  const MON = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  function ymd(iso) { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ""); return m ? { y: +m[1], mo: +m[2], d: +m[3] } : null; }
  function dateParts(iso) { const p = ymd(iso); return p ? { day: p.d, mon: MON[p.mo - 1] } : { day: "", mon: "" }; }
  function prettyDate(iso) { const p = ymd(iso); if (!p) return ""; const m = MON[p.mo - 1]; return m.charAt(0) + m.slice(1).toLowerCase() + " " + p.d; }
  // Year-qualified variant for standalone dates (e.g. the "Catalog last updated"
  // stat), where a bare "May 20" with no year reads as ambiguous.
  function prettyDateFull(iso) { const p = ymd(iso); const d = prettyDate(iso); return d && p ? d + ", " + p.y : d; }
  const prettyChecked = prettyDate;

  function regionCode(country) {
    const c = (country || "").toLowerCase();
    if (c.includes("united states")) return "US";
    if (c.includes("united kingdom")) return "UK";
    if (c.includes("korea")) return "KR";
    if (c.includes("puerto rico")) return "PR";
    if (c.includes("spain")) return "ES";
    if (c.includes("canada")) return "CA";
    if (c.includes("germany")) return "DE";
    if (c.includes("netherlands")) return "NL";
    if (c.includes("sweden")) return "SE";
    if (c.includes("poland")) return "PL";
    if (c.includes("italy")) return "IT";
    if (c.includes("belgium")) return "BE";
    return country ? country.slice(0, 2).toUpperCase() : "—";
  }
  function regionTone(country) {
    const c = (country || "").toLowerCase();
    if (c.includes("united states") || c.includes("canada") || c.includes("puerto rico")) return "US";
    if (c.includes("korea") || c.includes("japan")) return "ASIA";
    return "EU";
  }

  /* ---------- guide title humanizer (from real related_guides slugs) ---------- */
  const BRAND_FIX = { ticketmaster: "Ticketmaster", stubhub: "StubHub", seatgeek: "SeatGeek", vs: "vs" };
  function guideTitle(slug) {
    const words = slug.split("-").map((w, i) => {
      if (BRAND_FIX[w]) return BRAND_FIX[w];
      if (i === 0) return w.charAt(0).toUpperCase() + w.slice(1);
      return w;
    });
    return words.join(" ");
  }
  function guideCategory(slug) {
    if (/scam|safe/.test(slug)) return "Safety";
    if (/time|when/.test(slug)) return "Timing";
    if (/compare|overpay/.test(slug)) return "Comparing";
    return "Basics";
  }

  /* ============================================================
     DATA — load and shape the two real files
     ============================================================ */
  function shape(catalog, events) {
    // verified ticket link per artist (source of truth)
    const linkByArtist = {};
    (catalog.ticket_links || []).forEach(l => { if (!linkByArtist[l.artist_slug]) linkByArtist[l.artist_slug] = l; });
    const providerBySlug = {};
    (catalog.providers || []).forEach(p => { providerBySlug[p.slug] = p; });

    // upcoming events (genuinely in the future), tz-safe sort
    const now = Date.now();
    const upcoming = (events || [])
      .map(e => ({ e, t: Date.parse(e.datetime_iso) }))
      .filter(x => !isNaN(x.t) && x.t >= now)
      .sort((a, b) => a.t - b.t)
      .map(x => x.e);

    // backfill missing country from events
    const countryBySlug = {};
    (events || []).forEach(e => { if (!countryBySlug[e.artist_slug] && e.country) countryBySlug[e.artist_slug] = e.country; });

    const artists = (catalog.artists || []).map(a => {
      const link = linkByArtist[a.slug];
      const prov = link ? providerBySlug[link.provider] : null;
      const verified = !!(link && link.verified && link.public_enabled && prov && prov.public_enabled);
      return {
        slug: a.slug,
        name: a.name,
        genres: a.genres || [],
        country: a.country || countryBySlug[a.slug] || "",
        short: a.short_description || "",
        verified,
        provider: verified ? prov.name : null,
        destination_type: link ? link.destination_type : null,
        last_checked: link ? link.last_checked_at : null,
      };
    });

    // next upcoming event per artist → hero feed
    const seenArtist = new Set();
    const feedEvents = [];
    upcoming.forEach(e => { if (!seenArtist.has(e.artist_slug)) { seenArtist.add(e.artist_slug); feedEvents.push(e); } });

    // collapse multi-night runs (artist+venue) → one row per venue, soonest date
    const seenRun = new Set();
    const eventRows = [];
    upcoming.forEach(e => { const k = e.artist_slug + "|" + e.venue; if (!seenRun.has(k)) { seenRun.add(k); eventRows.push(e); } });

    // public providers (for honest "verified source" signal)
    const publicProviders = (catalog.providers || []).filter(p => p.public_enabled).map(p => p.name);

    // guides from real related_guides slugs
    const guideSlugs = [];
    (catalog.artists || []).forEach(a => (a.related_guides || []).forEach(s => { if (!guideSlugs.includes(s)) guideSlugs.push(s); }));
    const guides = guideSlugs.map(s => ({ slug: s, title: guideTitle(s), category: guideCategory(s) }));

    return {
      updated_at: catalog.updated_at || "",
      artists,
      feedEvents: feedEvents.slice(0, 6),
      eventRows: eventRows.slice(0, 16),
      upcomingCount: upcoming.length,
      publicProviders,
      guides,
    };
  }

  /* ============================================================ SEARCH */
  function buildSearch(DATA, size) {
    const index = [];
    DATA.artists.forEach(a => index.push({ type: "artist", label: a.name, sub: (a.genres.join(" · ") || "Artist") + (a.country ? " · " + a.country : ""), ref: a }));
    DATA.eventRows.forEach(e => index.push({ type: "event", label: e.artist_name + " — " + e.city, sub: e.venue + " · " + prettyDate(e.datetime_iso), ref: e }));
    DATA.guides.forEach(g => index.push({ type: "guide", label: g.title, sub: g.category + " guide", ref: g }));

    let q = "", open = false, active = 0, filter = "all";
    const input = h("input", { class: "ttc-search__input", type: "text", placeholder: size === "sm" ? "Quick search…" : "Search artist, city, venue or guide", "aria-label": "Search" });
    const panel = h("div", { class: "ttc-search__panel" });
    const bar = h("div", { class: "ttc-search__bar" }, [
      h("span", { class: "ttc-search__ico" }, [svg("search")]),
      input,
      h("button", { class: "ttc-search__go", type: "button", onclick: () => { window.location.href = "/artists"; } }, ["Search"])
    ]);
    const wrap = h("div", { class: "ttc-search ttc-search--" + size }, [bar, panel]);

    function results() {
      const term = q.trim().toLowerCase();
      let pool = index.filter(r => filter === "all" || r.type === filter);
      if (!term) return pool.filter(r => r.type !== "guide").slice(0, 6);
      return pool.map(r => {
        const hay = (r.label + " " + r.sub).toLowerCase();
        let s = -1;
        if (hay.startsWith(term)) s = 0; else if (r.label.toLowerCase().includes(term)) s = 1; else if (hay.includes(term)) s = 2;
        return { r, s };
      }).filter(x => x.s >= 0).sort((a, b) => a.s - b.s).slice(0, 8).map(x => x.r);
    }
    function hrefFor(item) {
      if (item.type === "artist") return "/" + item.ref.slug;
      if (item.type === "event") return "/" + item.ref.artist_slug;
      return "/guides/" + item.ref.slug;
    }
    function render() {
      panel.classList.toggle("is-open", open);
      if (!open) return;
      const res = results();
      const tabs = [["all","All"],["artist","Artists"],["event","Dates"],["guide","Guides"]];
      panel.innerHTML = "";
      panel.appendChild(h("div", { class: "ttc-search__tabs" }, [
        ...tabs.map(([k, lbl]) => h("button", { class: "ttc-search__tab" + (filter === k ? " is-on" : ""), type: "button", onmousedown: (ev) => { ev.preventDefault(); filter = k; active = 0; render(); } }, [lbl])),
        h("span", { class: "ttc-search__hint" }, [q ? res.length + " matches" : "Popular right now"])
      ]));
      const body = h("div", { class: "ttc-search__results" });
      if (!res.length) body.appendChild(h("div", { class: "ttc-search__empty" }, ["No checked matches for “" + q + "”. Try an artist or city."]));
      const groups = { artist: "Artists", event: "Upcoming dates", guide: "Buying guides" };
      let idx = -1;
      ["artist","event","guide"].forEach(type => {
        const items = res.filter(r => r.type === type);
        if (!items.length) return;
        body.appendChild(h("div", { class: "ttc-search__grouphd" }, [groups[type]]));
        items.forEach(item => {
          idx++; const my = idx;
          const lead = item.type === "artist" ? monogram(item.ref.name, 32)
            : h("span", { class: "ttc-row__glyph ttc-row__glyph--" + item.type }, [item.type === "event" ? dateParts(item.ref.datetime_iso).mon.slice(0, 1) + dateParts(item.ref.datetime_iso).day : "★"]);
          const tail = item.type === "artist"
            ? (item.ref.verified ? h("span", { class: "ttc-pill ttc-pill--good" }, [svg("check"), "Verified"]) : h("span", { class: "ttc-pill ttc-pill--muted" }, ["Watching"]))
            : h("span", { class: "ttc-meta" }, [item.type === "event" ? regionCode(item.ref.country) : "Guide"]);
          body.appendChild(h("a", { class: "ttc-row" + (my === active ? " is-active" : ""), href: hrefFor(item), onmouseenter: () => { active = my; [...body.querySelectorAll(".ttc-row")].forEach((r, i) => r.classList.toggle("is-active", i === my)); } }, [
            lead,
            h("span", { class: "ttc-row__body" }, [h("span", { class: "ttc-row__label" }, [item.label]), h("span", { class: "ttc-row__sub" }, [item.sub])]),
            h("span", { class: "ttc-row__tail" }, [tail])
          ]));
        });
      });
      panel.appendChild(body);
      panel.appendChild(h("div", { class: "ttc-search__foot" }, [
        h("span", {}, [pulse(), "Catalog updated " + DATA.updated_at]),
        h("span", {}, ["No live prices — verified links only"])
      ]));
    }
    input.addEventListener("input", () => { q = input.value; open = true; active = 0; render(); });
    input.addEventListener("focus", () => { open = true; render(); });
    input.addEventListener("keydown", (ev) => {
      const res = results();
      if (ev.key === "ArrowDown") { ev.preventDefault(); active = Math.min(active + 1, res.length - 1); open = true; render(); }
      else if (ev.key === "ArrowUp") { ev.preventDefault(); active = Math.max(active - 1, 0); render(); }
      else if (ev.key === "Enter") { const r = res[active]; if (r) window.location.href = hrefFor(r); }
      else if (ev.key === "Escape") { open = false; render(); input.blur(); }
    });
    document.addEventListener("mousedown", (ev) => { if (!wrap.contains(ev.target)) { open = false; render(); } });
    return wrap;
  }

  /* ============================================================ SECTIONS */
  function heroSection(DATA) {
    const chips = DATA.artists.slice(0, 5).map(a => a.name);
    const left = h("div", {}, [
      h("span", { class: "ttc-eyebrow" }, [pulse(), "Independent & unofficial"]),
      h("h1", { class: "ttc-hero__h1", html: 'Verified ticket options for <em>major tours.</em>' }),
      h("p", { class: "ttc-hero__sub" }, ["Human-checked links to official ticket pages, clear official-vs-resale guidance, and the checks to run before you pay. We don’t sell tickets and we never show live prices."]),
      h("div", { class: "ttc-hero__searchwrap" }, [
        buildSearch(DATA, "lg"),
        h("div", { class: "ttc-hero__chips" }, [h("span", { class: "lab" }, ["Popular"]), ...chips.map(c => h("a", { class: "ttc-chip", href: "/artists" }, [c]))])
      ]),
      h("div", { class: "ttc-hero__trust" }, [
        h("div", {}, [svg("check"), document.createTextNode(" "), h("b", {}, ["Every link"]), document.createTextNode(" human-checked")]),
        h("div", {}, [pulse(), h("b", {}, ["Verified"]), document.createTextNode(" via " + (DATA.publicProviders.join(", ") || "checked providers"))]),
        h("div", {}, [h("span", { class: "ttc-pulse ttc-pulse--accent" }, [h("i")]), document.createTextNode(" No live prices, ever")])
      ])
    ]);

    const feedRows = DATA.feedEvents.map(e => {
      const p = dateParts(e.datetime_iso);
      return h("a", { class: "ttc-evrow", href: "/" + e.artist_slug }, [
        h("span", { class: "ttc-evrow__date" }, [h("span", { class: "d" }, [String(p.day)]), h("span", { class: "m" }, [p.mon])]),
        h("span", { class: "ttc-evrow__body" }, [h("span", { class: "ttc-evrow__a" }, [e.artist_name]), h("span", { class: "ttc-evrow__v" }, [e.venue + ", " + e.city])]),
        h("span", { class: "ttc-pill ttc-pill--info" }, [regionTone(e.country)])
      ]);
    });
    const feedList = h("div", { class: "ttc-feed__list" }, feedRows.length ? feedRows : [
      h("div", { class: "ttc-feed__empty" }, ["No upcoming dates are being tracked right now. New dates appear here once they’ve been announced and checked."])
    ]);
    const feed = h("div", { class: "ttc-feed" }, [
      h("div", { class: "ttc-feed__hd" }, [h("span", { class: "t" }, [pulse(), "Upcoming dates we’re tracking"]), h("span", { class: "ttc-meta" }, [DATA.upcomingCount + " dates"])]),
      feedList,
      h("div", { class: "ttc-feed__ft" }, [h("span", { class: "ttc-meta" }, ["Dates sourced from ticket providers. Confirm date, venue and final price on the provider page before you buy."])])
    ]);

    return h("section", { class: "ttc-hero" }, [h("div", { class: "ttc-wrap ttc-hero__grid" }, [left, feed])]);
  }

  function statsSection(DATA) {
    const verifiedCount = DATA.artists.filter(a => a.verified).length;
    const cells = [
      { n: String(verifiedCount), l: "Artists with verified pages" },
      { n: DATA.publicProviders.join(" · ") || "—", sm: true, l: "Verified ticket source" },
      { n: String(DATA.upcomingCount), l: "Upcoming dates tracked" },
      { n: prettyDateFull(DATA.updated_at), sm: true, l: "Catalog last updated", live: true },
    ];
    return h("section", { class: "ttc-stats" }, [
      h("div", { class: "ttc-wrap ttc-stats__in" }, cells.map(c => h("div", { class: "ttc-stat" }, [
        h("div", { class: "ttc-stat__n" + (c.sm ? " sm" : "") }, [c.n]),
        h("div", { class: "ttc-stat__l" }, c.live ? [pulse(), document.createTextNode(" " + c.l)] : [c.l])
      ])))
    ]);
  }

  function valueSection() {
    const vp = [
      { ic: "check",  t: "Verified destinations only", b: "A ticket button appears only when a human has checked the provider page. If it hasn’t been checked, you see a watchlist state — never a dead-end link." },
      { ic: "search", t: "Official vs resale, explained", b: "Know exactly what you’re buying before you leave. Our guides break down primary tickets, resale, fees, delivery and transfer rules in plain language." },
      { ic: "arrow",  t: "Confirm before you pay", b: "We never show live prices. We show you the checks to run at the provider’s checkout so the final total — fees included — holds no surprises." },
    ];
    return h("section", { class: "ttc-sec" }, [h("div", { class: "ttc-wrap" }, [
      h("div", { class: "ttc-sec__hd" }, [
        h("div", {}, [h("h2", { class: "ttc-sec__h2" }, ["What this tool actually does"]), h("p", { class: "ttc-sec__desc" }, ["No marketplace, no checkout, no live price comparison. Three jobs, done transparently."])]),
        h("a", { class: "ttc-sec__link", href: "/how-it-works" }, ["How it works ", svg("arrow")])
      ]),
      h("div", { class: "ttc-vp" }, vp.map((v, i) => h("div", { class: "ttc-vpcard" }, [
        h("div", { class: "ttc-vpcard__n" }, ["0" + (i + 1)]),
        h("div", { class: "ttc-vpcard__ic" }, [svg(v.ic)]),
        h("h3", {}, [v.t]),
        h("p", {}, [v.b])
      ])))
    ])]);
  }

  function tableSection(DATA) {
    let tab = "artist", sort = { key: "name", dir: 1 };
    const card = h("div", { class: "ttc-tablecard" });
    const emptyRow = (cols, msg) => h("tr", {}, [h("td", { colspan: cols, class: "ttc-table__empty" }, [msg])]);

    function artistRows() {
      const arr = [...DATA.artists].sort((a, b) => {
        let av, bv;
        if (sort.key === "name") { av = a.name; bv = b.name; }
        else if (sort.key === "genre") { av = a.genres[0] || "~"; bv = b.genres[0] || "~"; }
        else if (sort.key === "region") { av = a.country || "~"; bv = b.country || "~"; }
        else if (sort.key === "verified") { av = a.verified ? 0 : 1; bv = b.verified ? 0 : 1; }
        else { av = a.last_checked || ""; bv = b.last_checked || ""; }
        return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
      });
      return arr.map(a => h("tr", {}, [
        h("td", { "data-k": "Artist" }, [h("span", { class: "ttc-tcell-artist" }, [
          monogram(a.name, 30),
          h("span", {}, [h("span", { class: "nm" }, [a.name]), h("br"), h("span", { class: "gn" }, [a.short.length > 44 ? a.short.slice(0, 44) + "…" : (a.short || "—")])])
        ])]),
        h("td", { "data-k": "Genre" }, [h("span", { class: "ttc-region" }, [a.genres.join(" · ") || "—"])]),
        h("td", { "data-k": "Region" }, [h("span", { class: "ttc-region" }, [regionCode(a.country)])]),
        h("td", { "data-k": "Verified" }, [a.verified
          ? h("span", { class: "ttc-pill ttc-pill--good" }, [svg("check"), a.provider])
          : h("span", { class: "ttc-pill ttc-pill--muted" }, ["Watching"])]),
        h("td", { "data-k": "Last check" }, [h("span", { class: "ttc-meta" }, [a.last_checked ? prettyChecked(a.last_checked) : "—"])]),
        h("td", { class: "ttc-tcell-act", "data-k": "" }, [a.verified
          ? h("a", { class: "ttc-tbtn", href: "/" + a.slug }, ["Ticket options ", svg("arrow")])
          : h("a", { class: "ttc-tbtn ttc-tbtn--ghost", href: "/" + a.slug }, ["View page"])])
      ]));
    }
    function eventRows() {
      return DATA.eventRows.map(e => h("tr", {}, [
        h("td", { "data-k": "Event" }, [h("span", { class: "ttc-ev-name" }, [e.artist_name]), document.createTextNode(" "), h("span", { class: "ttc-ev-city" }, ["· " + e.city])]),
        h("td", { "data-k": "Venue", class: "ttc-ev-venue" }, [e.venue]),
        h("td", { "data-k": "Date" }, [h("span", { class: "ttc-meta" }, [prettyDate(e.datetime_iso)])]),
        h("td", { "data-k": "Region" }, [h("span", { class: "ttc-pill ttc-pill--info" }, [regionCode(e.country)])]),
        h("td", { class: "ttc-tcell-act", "data-k": "" }, [h("a", { class: "ttc-tbtn", href: "/" + e.artist_slug }, ["Artist page ", svg("arrow")])])
      ]));
    }
    function render() {
      card.innerHTML = "";
      const tabs = [["artist", "Artists", DATA.artists.length], ["event", "Upcoming dates", DATA.eventRows.length]];
      card.appendChild(h("div", { class: "ttc-tabs" }, [
        ...tabs.map(([k, lbl, c]) => h("button", { class: "ttc-tabs__t" + (tab === k ? " is-on" : ""), type: "button", onclick: () => { tab = k; sort = { key: tab === "artist" ? "name" : "date", dir: 1 }; render(); } }, [lbl, h("span", { class: "c" }, [String(c)])])),
        h("div", { class: "ttc-tabs__r" }, [h("span", { class: "ttc-meta" }, [pulse(), document.createTextNode(" updated " + DATA.updated_at)])])
      ]));
      const table = h("table", { class: "ttc-table" });
      const thead = h("thead");
      if (tab === "artist") {
        const cols = [["name", "Artist"], ["genre", "Genre"], ["region", "Region"], ["verified", "Verified"], ["last", "Last check"], [null, "Action", true]];
        thead.appendChild(h("tr", {}, cols.map(([key, lbl, right]) => {
          const th = h("th", { class: right ? "right" : "" }, [lbl]);
          if (key) { th.appendChild(h("span", { class: "car" }, [sort.key === key ? (sort.dir < 0 ? "↓" : "↑") : "↕"])); th.addEventListener("click", () => { sort = { key, dir: sort.key === key ? -sort.dir : 1 }; render(); }); }
          return th;
        })));
        table.appendChild(thead);
        const rows = artistRows();
        table.appendChild(h("tbody", {}, rows.length ? rows : [emptyRow(6, "No artists to show yet.")]));
      } else {
        thead.appendChild(h("tr", {}, [["Event"],["Venue"],["Date"],["Region"],["Action",true]].map(([lbl, right]) => h("th", { class: right ? "right" : "" }, [lbl]))));
        table.appendChild(thead);
        const rows = eventRows();
        table.appendChild(h("tbody", {}, rows.length ? rows : [emptyRow(5, "No upcoming dates are being tracked right now. Dates appear here once they’ve been announced and checked.")]));
      }
      card.appendChild(table);
    }
    render();

    return h("section", { class: "ttc-sec ttc-sec--flush" }, [h("div", { class: "ttc-wrap" }, [
      h("div", { class: "ttc-sec__hd" }, [
        h("div", {}, [h("h2", { class: "ttc-sec__h2" }, ["Coverage explorer"]), h("p", { class: "ttc-sec__desc" }, ["Every tracked artist and their verification status. Sort by name, genre, region or when we last checked. A ticket button appears only where the destination is verified."])]),
        h("a", { class: "ttc-sec__link", href: "/artists" }, ["All artists ", svg("arrow")])
      ]),
      card
    ])]);
  }

  function guidesSection(DATA) {
    const list = DATA.guides.slice(0, 6);
    return h("section", { class: "ttc-sec ttc-sec--flush" }, [h("div", { class: "ttc-wrap" }, [
      h("div", { class: "ttc-sec__hd" }, [
        h("div", {}, [h("h2", { class: "ttc-sec__h2" }, ["Buying guides"]), h("p", { class: "ttc-sec__desc" }, ["Practical, plain-language guidance for checking totals, understanding resale, and avoiding risky listings before you commit."])]),
        h("a", { class: "ttc-sec__link", href: "/guides" }, ["All guides ", svg("arrow")])
      ]),
      h("div", { class: "ttc-guides" }, list.map(g => h("a", { class: "ttc-gcard", href: "/guides/" + g.slug }, [
        h("div", { class: "ttc-gcard__cat" }, [h("span", { class: "ttc-pill ttc-pill--muted" }, [g.category]), h("span", { class: "ttc-meta" }, ["Guide"])]),
        h("h3", {}, [g.title]),
        h("span", { class: "ttc-gcard__cta" }, ["Read guide ", svg("arrow")])
      ])))
    ])]);
  }

  function trustSection() {
    const items = [
      { h: "Independent & unofficial", p: "Not affiliated with any artist, venue, promoter or ticketing platform." },
      { h: "Affiliate links, same price", p: "Some outbound links earn us a commission. This never changes the price you pay." },
      { h: "Providers set the terms", p: "External sites set their own prices, fees, availability and checkout rules." },
    ];
    return h("section", { class: "ttc-sec ttc-sec--flush" }, [h("div", { class: "ttc-wrap" }, [
      h("div", { class: "ttc-trust" }, [h("div", { class: "ttc-trust__grid" }, [
        h("div", {}, [
          h("span", { class: "ttc-eyebrow ttc-eyebrow--onbrand" }, ["Trust & transparency"]),
          h("h2", {}, ["Built to be checked, not just clicked."]),
          h("p", {}, ["Every link is reviewed by a human before it appears. We tell you exactly what we are and how we make money."]),
          h("div", { class: "ttc-trust__links" }, [
            h("a", { href: "/how-it-works" }, ["How we work"]),
            h("a", { href: "/affiliate-disclosure" }, ["Affiliate disclosure"]),
            h("a", { href: "/editorial-policy" }, ["Editorial policy"])
          ])
        ]),
        h("div", { class: "ttc-trust__items" }, items.map(it => h("div", { class: "ttc-trust__item" }, [
          h("span", { class: "ic" }, [svg("check")]),
          h("div", {}, [h("h4", {}, [it.h]), h("p", {}, [it.p])])
        ])))
      ])])
    ])]);
  }

  /* ============================================================ MOUNT */
  function render(DATA) {
    const main = document.getElementById("ttc-main");
    if (!main) return;
    // Scope the ttc-home stylesheet (everything is nested under `.ttc`). Added at
    // hydration time so the server-rendered fallback keeps the shell's own styles
    // until the redesign takes over.
    main.classList.add("ttc", "ttc-home");
    main.innerHTML = "";
    main.appendChild(frag([heroSection(DATA), statsSection(DATA), valueSection(DATA), tableSection(DATA), guidesSection(DATA), trustSection()]));
    const hs = document.getElementById("ttc-hd-search");
    if (hs) { hs.innerHTML = ""; hs.appendChild(buildSearch(DATA, "sm")); }
    const yr = document.getElementById("ttc-year"); if (yr) yr.textContent = new Date().getFullYear();
  }
  function boot() {
    Promise.all([
      fetch("/data/catalog.json").then(r => { if (!r.ok) throw new Error("catalog.json " + r.status); return r.json(); }),
      fetch("/data/events-index.json").then(r => r.ok ? r.json() : [])
    ])
      .then(([catalog, events]) => render(shape(catalog, Array.isArray(events) ? events : [])))
      // Graceful degradation: if the client data load fails, leave the
      // server-rendered homepage (inside #ttc-main) in place rather than
      // replacing it with an error state.
      .catch(err => { console.error("[ttc] data load failed; keeping server-rendered homepage", err); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
