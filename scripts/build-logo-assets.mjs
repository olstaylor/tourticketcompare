#!/usr/bin/env node
/**
 * Build the brand logo raster assets in public/assets/ from public/assets/logo.svg.
 *
 * The mark is not invented here: it is the same "TTC" rounded-square lockup the
 * site header renders in CSS (.ttc-brand__mark / .ttc-brand__name in
 * public/ttc-home.css), redrawn at export sizes with the same self-hosted brand
 * fonts and the same tokens (--ttc-ink, --ttc-brand, --ttc-accent).
 *
 * Sizes follow the Google Ads image-asset spec:
 *   square    1:1  — min 128x128,  recommended 1200x1200
 *   landscape 4:1  — min 512x128,  recommended 1200x300
 *
 * Rendering uses the Chromium already present in the environment (no new deps);
 * pass --chromium=<path> if it is not on PATH or in the usual Playwright dir.
 *
 * Usage: node scripts/build-logo-assets.mjs [--check] [--debug]
 *   --check  render to a temp dir and diff against the committed PNGs instead
 *            of overwriting them (exit 1 on drift). Wired up as `npm run logo:check`.
 *   --debug  also print the measured fit geometry (viewport, scale, painted box)
 *            for each export, and keep the intermediate HTML.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(repoRoot, 'public', 'assets');
const fontsDir = path.join(repoRoot, 'public', 'fonts');

const TOKENS = {
  ink: '#1c1a16',
  brand: '#214034',
  accent: '#bf4a2c',
  paper: '#fbfaf8'
};

// One entry per exported PNG. `variant` selects the layout in renderMarkup().
// `pad` is the minimum clear space on every side, as a fraction of the shorter
// edge. Google Ads crops square logos to a circle in some placements, so the
// square keeps more breathing room than the landscape lockup needs.
const TARGETS = [
  { file: 'logo-square-1200.png', variant: 'square', width: 1200, height: 1200, pad: 0.04, background: 'transparent' },
  { file: 'logo-square-1200-solid.png', variant: 'square', width: 1200, height: 1200, pad: 0.04, background: TOKENS.paper },
  { file: 'logo-landscape-1200x300.png', variant: 'landscape', width: 1200, height: 300, pad: 0.09, background: 'transparent' },
  { file: 'logo-landscape-1200x300-solid.png', variant: 'landscape', width: 1200, height: 300, pad: 0.09, background: TOKENS.paper }
];

// headless_shell is listed first on purpose: the full chrome binary subtracts
// window chrome from --window-size, so a 1200x300 window yields a 1200x213
// viewport and silently crops the bottom of the export. assertViewport() below
// catches that for any binary, but preferring the shell avoids it entirely.
function findChromium() {
  const fromArg = process.argv.find((a) => a.startsWith('--chromium='));
  if (fromArg) return fromArg.slice('--chromium='.length);
  const pwRoot = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  const candidates = [
    `${pwRoot}/chromium_headless_shell-1194/chrome-linux/headless_shell`,
    `${pwRoot}/chromium-1194/chrome-linux/chrome`,
    `${pwRoot}/chromium`,
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome'
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  if (existsSync(pwRoot)) {
    const found = execFileSync(
      'find',
      [pwRoot, '-maxdepth', '3', '-type', 'f', '(', '-name', 'headless_shell', '-o', '-name', 'chrome', ')'],
      { encoding: 'utf8' }
    )
      .split('\n')
      .filter(Boolean);
    if (found.length) return found[0];
  }
  throw new Error('No Chromium binary found. Pass --chromium=<path>.');
}

// Fail loudly rather than shipping a cropped logo: confirm the browser gives us
// exactly the viewport we asked for before any PNG is written.
function assertViewport(chromium, width, height, workDir) {
  const probePath = path.join(workDir, `viewport-${width}x${height}.html`);
  writeFileSync(
    probePath,
    `<!doctype html><html><body><pre id="o"></pre><script>` +
      `document.getElementById('o').textContent=innerWidth+'x'+innerHeight+'@'+devicePixelRatio;` +
      `</script></body></html>`
  );
  const dom = execFileSync(
    chromium,
    ['--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1',
     `--window-size=${width},${height}`, '--dump-dom', `file://${probePath}`],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );
  rmSync(probePath);
  const got = (dom.match(/<pre id="o">([^<]*)<\/pre>/) || [])[1];
  const want = `${width}x${height}@1`;
  if (got !== want) {
    throw new Error(
      `Chromium viewport is ${got}, expected ${want} — exports would be cropped or scaled.\n` +
        `Use the headless shell binary, or pass --chromium=<path> to one that honours --window-size.`
    );
  }
}

function fontFace(family, file, weight) {
  const data = readFileSync(path.join(fontsDir, file)).toString('base64');
  return `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};src:url(data:font/woff2;base64,${data}) format("woff2");}`;
}

function renderMarkup({ variant, width, height, pad, background }) {
  const fonts = [
    fontFace('Hanken Grotesk', 'hanken-grotesk.woff2', '100 900'),
    fontFace('IBM Plex Mono', 'ibm-plex-mono-600.woff2', '600')
  ].join('');

  // Square: mark only, near full-bleed (Google Ads crops to a circle in some
  // placements, so the wordmark cannot survive here — the mark has to stand alone).
  // Landscape: mark + wordmark, matching the site header lockup.
  const layout =
    variant === 'square'
      ? `
      <div class="mark mark--square">TTC</div>`
      : `
      <div class="lockup">
        <div class="mark mark--inline">TTC</div>
        <div class="wordmark">Tour<b>Ticket</b>Compare</div>
      </div>`;

  // The lockup is authored at a nominal size and then scaled to the export
  // frame from its measured box, so the wordmark can never overflow or be
  // clipped when the font metrics shift.
  const inset = Math.round(Math.min(width, height) * pad);

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:${width}px;height:${height}px;background:${background};overflow:hidden;}
body{position:relative;-webkit-font-smoothing:antialiased;}
/* Measured from the top-left so the fit maths below is a pure box calculation:
   flex centring plus a scale transform double-counts the descender overflow. */
#stage{position:absolute;top:0;left:0;transform-origin:0 0;}
.mark{
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg, ${TOKENS.ink}, ${TOKENS.brand});
  color:#fff;font-family:"IBM Plex Mono",monospace;font-weight:600;
}
/* text-indent is half the letter-spacing: the tracking adds a trailing space
   after the last glyph, which otherwise pulls the centred "TTC" left. */
.mark--square{width:1000px;height:1000px;border-radius:224px;font-size:310px;letter-spacing:10px;text-indent:5px;}
.mark--inline{width:216px;height:216px;border-radius:48px;font-size:66px;letter-spacing:2px;text-indent:1px;}
.lockup{display:flex;align-items:center;gap:40px;}
/* line-height 1.25 keeps the "p" descender inside the measured layout box. */
.wordmark{
  font-family:"Hanken Grotesk",sans-serif;font-weight:800;font-size:118px;
  letter-spacing:-0.028em;color:${TOKENS.ink};line-height:1.25;white-space:nowrap;
}
.wordmark b{color:${TOKENS.accent};font-weight:800;}
</style></head><body>
<div id="stage">${layout}</div>
<script>
  (async () => {
    await document.fonts.ready;
    const stage = document.getElementById('stage');
    const box = stage.getBoundingClientRect();
    const scale = Math.min((${width} - ${inset} * 2) / box.width, (${height} - ${inset} * 2) / box.height);
    const dx = (${width} - box.width * scale) / 2;
    const dy = (${height} - box.height * scale) / 2;
    stage.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';
    const painted = stage.getBoundingClientRect();
    document.documentElement.dataset.fit = JSON.stringify({
      viewport: [innerWidth, innerHeight],
      scale: Number(scale.toFixed(4)),
      painted: [painted.x, painted.y, painted.width, painted.height].map((n) => Number(n.toFixed(1)))
    });
  })();
</script>
</body></html>`;
}

function shoot(chromium, target, outDir) {
  const html = renderMarkup(target);
  const htmlPath = path.join(outDir, `${target.file}.html`);
  writeFileSync(htmlPath, html);
  const outPath = path.join(outDir, target.file);
  execFileSync(
    chromium,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      // Transparent page background; the solid variants paint their own.
      '--default-background-color=00000000',
      // Let the font load + fit script settle before the frame is captured.
      '--virtual-time-budget=4000',
      `--window-size=${target.width},${target.height}`,
      `--screenshot=${outPath}`,
      `file://${htmlPath}`
    ],
    { stdio: 'pipe' }
  );
  if (process.argv.includes('--debug')) {
    const dom = execFileSync(
      chromium,
      ['--headless', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=4000',
       `--window-size=${target.width},${target.height}`, '--dump-dom', `file://${htmlPath}`],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    const fit = dom.match(/data-fit="([^"]*)"/);
    console.log(`${target.file} fit: ${fit ? fit[1].replace(/&quot;/g, '"') : 'SCRIPT DID NOT RUN'}`);
  } else {
    rmSync(htmlPath);
  }
  return outPath;
}

function main() {
  const check = process.argv.includes('--check');
  const chromium = findChromium();
  const outDir = check ? mkdtempSync(path.join(tmpdir(), 'ttc-logo-')) : assetsDir;
  mkdirSync(outDir, { recursive: true });

  for (const size of new Set(TARGETS.map((t) => `${t.width}x${t.height}`))) {
    const [w, h] = size.split('x').map(Number);
    assertViewport(chromium, w, h, outDir);
  }

  const drift = [];
  for (const target of TARGETS) {
    const rendered = shoot(chromium, target, outDir);
    if (check) {
      const committed = path.join(assetsDir, target.file);
      if (!existsSync(committed) || !readFileSync(committed).equals(readFileSync(rendered))) {
        drift.push(target.file);
      }
    } else {
      console.log(`wrote public/assets/${target.file} (${target.width}x${target.height})`);
    }
  }

  if (check) {
    rmSync(outDir, { recursive: true, force: true });
    if (drift.length) {
      console.error(`logo assets out of sync with the builder: ${drift.join(', ')}`);
      console.error('Regenerate with: node scripts/build-logo-assets.mjs');
      process.exit(1);
    }
    console.log('logo assets match the builder output');
  }
}

main();
