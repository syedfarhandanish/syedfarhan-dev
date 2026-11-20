// Generates the PWA / favicon icon set from the SFD contour brand mark.
// Run: node scripts/generate-icons.mjs   (uses sharp, which ships with Next.js)
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const BG = '#0d1015', INK = '#ede8dd', ACCENT = '#ff8a4c';

// The mark is drawn on a 32×32 grid; `scale` controls how much of the canvas it fills.
function svg({ size, scale, radius }) {
  const s = (size * scale) / 32;
  const o = (size - 32 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${BG}"/>
  <g transform="translate(${o} ${o}) scale(${s})" fill="none">
    <path d="M16 3.5c6.4 0 12.5 4.6 12.5 11.6 0 7.6-6.1 13.4-12.9 13.4C9 28.5 3.5 23.3 3.5 16.4 3.5 9 9.3 3.5 16 3.5Z" stroke="${INK}" stroke-opacity=".4" stroke-width="1.5"/>
    <path d="M16.3 8.3c4.2 0 8 3.1 8 7.6 0 4.8-3.9 8.3-8.4 8.3-4.4 0-7.8-3.3-7.8-7.6 0-4.7 3.8-8.3 8.2-8.3Z" stroke="${INK}" stroke-opacity=".7" stroke-width="1.5"/>
    <path d="M16.6 12.6c2 0 3.7 1.5 3.7 3.5 0 2.2-1.8 3.8-3.9 3.8-2 0-3.5-1.5-3.5-3.5 0-2.1 1.7-3.8 3.7-3.8Z" stroke="${INK}" stroke-width="1.7"/>
    <circle cx="16.5" cy="16.2" r="1.8" fill="${ACCENT}"/>
  </g>
</svg>`;
}

const png = (opts, out) => sharp(Buffer.from(svg(opts))).png({ compressionLevel: 9 }).toFile(out);

await writeFile('app/icon.svg', svg({ size: 64, scale: 0.86, radius: 14 }));
await png({ size: 180, scale: 0.72, radius: 0 }, 'app/apple-icon.png'); // iOS adds its own rounding
await png({ size: 192, scale: 0.8, radius: 40 }, 'public/icons/icon-192.png');
await png({ size: 512, scale: 0.8, radius: 108 }, 'public/icons/icon-512.png');
await png({ size: 512, scale: 0.56, radius: 0 }, 'public/icons/maskable-512.png'); // mark inside the 80% safe zone
console.log('icons written');
