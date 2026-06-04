/**
 * Generates public/logo-h.png — a horizontal logo lockup:
 * [golden emblem icon]  [PRIME GOLDEN / PROPERTIES text block]
 *
 * Uses only `sharp` (already in deps). Text is drawn via SVG overlay.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, '..');

// ── 1. Crop emblem from logo.png (top 42%, centred horizontally) ────────
const LOGO_W = 1080, LOGO_H = 1350;
const EMBL_H = Math.round(LOGO_H * 0.42);  // 567px
// The emblem is centred horizontally; crop to a square-ish box
const EMBL_X = Math.round((LOGO_W - EMBL_H) / 2);  // ~257px left offset
const CROP_W = Math.min(LOGO_W, EMBL_H);            // 567px wide

const emblemBuf = await sharp(resolve(root, 'public/logo.png'))
  .extract({ left: EMBL_X, top: 0, width: CROP_W, height: EMBL_H })
  .resize(240, 240, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
  .png()
  .toBuffer();

// ── 2. Build SVG text block (Sora font approximated by system sans-serif) ──
// We render the wordmark in SVG, then rasterise with sharp.
// Colours match brand tokens exactly.
const GOLD   = '#D4A017';
const DEEP   = '#0F3D2E';

const svgText = `
<svg xmlns="http://www.w3.org/2000/svg" width="440" height="240">
  <!-- PRIME GOLDEN — heavy, tight tracked -->
  <text
    x="20" y="108"
    font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    font-weight="800"
    font-size="80"
    letter-spacing="-2"
    fill="${DEEP}"
  >PRIME</text>

  <text
    x="20" y="196"
    font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    font-weight="800"
    font-size="80"
    letter-spacing="-2"
    fill="${GOLD}"
  >GOLDEN</text>

  <!-- PROPERTIES — small caps, spaced -->
  <text
    x="24" y="230"
    font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    font-weight="500"
    font-size="22"
    letter-spacing="8"
    fill="${DEEP}"
    opacity="0.65"
  >PROPERTIES</text>
</svg>`;

const textBuf = await sharp(Buffer.from(svgText))
  .png()
  .toBuffer();

// ── 3. Composite emblem + text side by side ─────────────────────────────
const GAP    = 32;
const TOTAL_W = 240 + GAP + 440;
const TOTAL_H = 240;

const output = await sharp({
  create: { width: TOTAL_W, height: TOTAL_H, channels: 4, background: { r:0,g:0,b:0,alpha:0 } }
})
  .composite([
    { input: emblemBuf,  left: 0,           top: 0 },
    { input: textBuf,    left: 240 + GAP,   top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();

const outPath = resolve(root, 'public/logo-h.png');
writeFileSync(outPath, output);
console.log(`✅  Written → ${outPath}  (${TOTAL_W}x${TOTAL_H}px)`);
