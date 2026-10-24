// Presentation for long-form pages. Ticket boards retain their own layout.
const READING_PATHS = new Set([
  "/about", "/about/ollie-taylor", "/how-it-works", "/contact", "/press",
  "/editorial-policy", "/affiliate-disclosure", "/privacy", "/terms"
]);

export function readingLayout(html, route) {
  if (route.type !== "guide" && route.type !== "blog-post" && !READING_PATHS.has(route.path)) return html;
  // These are server-owned templates, not arbitrary Markdown. Keep the title,
  // lead and attribution above the columns, and preserve the article verbatim.
  const page = html.match(/^(<main id="mainContent"><section class=")([^"]+)("[^>]*>)([\s\S]*?<\/h1>)([\s\S]*)(<\/section><\/main>)$/);
  if (!page) return html;
  const [, opening, classes, attributes, title, rest, closing] = page;
  const firstSection = rest.search(/<section\b/);
  if (firstSection < 0) return html;
  const intro = rest.slice(0, firstSection);
  const headings = [];
  const usedIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  let nextId = 1;
  const body = rest.slice(firstSection).replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (heading, attrs, text) => {
    const existingId = attrs.match(/\bid="([^"]+)"/);
    while (usedIds.has(`reading-section-${nextId}`)) nextId += 1;
    const id = existingId ? existingId[1] : `reading-section-${nextId++}`;
    usedIds.add(id);
    // Preserve escaped text; strip markup before reusing it as a link label.
    const label = text.replace(/<[^>]*>/g, "");
    headings.push({ id, label });
    return existingId ? heading : `<h2${attrs} id="${id}">${text}</h2>`;
  });
  const contents = headings.length > 2
    ? `<details class="reading-contents" data-reading-contents open><summary>On this page</summary><nav aria-label="On this page"><ol>${headings.map(({ id, label }) => `<li><a href="#${id}">${label}</a></li>`).join("")}</ol></nav></details>`
    : "";
  return `${opening}${classes} reading-page${attributes}<header class="reading-heading">${title}${intro}</header><div class="reading-layout${contents ? "" : " reading-layout--single"}">${contents}<div class="reading-body">${body}</div></div>${closing}`;
}
