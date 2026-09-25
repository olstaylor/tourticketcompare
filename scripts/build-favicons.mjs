// Rasterises public/favicon.svg into the two icon files browsers and crawlers
// request by convention whether or not a page links them: /favicon.ico (16, 32
// and 48 px PNG entries in one ICO container) and /apple-touch-icon.png
// (180 px). Both 404'd before this existed. Re-run after editing favicon.svg:
//
//   node scripts/build-favicons.mjs
//
// Needs the `sharp` dev dependency (npm ci).

import sharp from "sharp";
import fs from "node:fs";
const svg = fs.readFileSync("public/favicon.svg");

// favicon.ico: PNG-encoded 16/32/48 entries in one ICO container.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(svg, { density: 72 * s / 64 * 4 }).resize(s, s).png({ compressionLevel: 9 }).toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e); header.writeUInt8(s, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
fs.writeFileSync("public/favicon.ico", Buffer.concat([header, ...pngs]));
// apple-touch-icon.png: 180x180, full-bleed (iOS applies its own corner mask,
// and a transparent corner renders black), so the rounded rect is squared off.
const square = Buffer.from(svg.toString().replace(/<rect width="64" height="64" rx="14"/, '<rect width="64" height="64"'));
await sharp(square, { density: 72 * 180 / 64 * 2 }).resize(180, 180).flatten({ background: "#0f172a" }).png({ compressionLevel: 9 }).toFile("public/apple-touch-icon.png");
