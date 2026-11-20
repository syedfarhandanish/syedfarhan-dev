import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/content/site';

/**
 * Branded 1200×630 social preview images, rendered at build time.
 * Uses the site's "Ridge" palette, the contour motif and the real brand fonts.
 */

export const ogSize = { width: 1200, height: 630 };

const C = {
  bg: '#0d1015',
  ink: '#ede8dd',
  ink2: '#b9b3a6',
  ink3: '#8d887d',
  line: 'rgba(237,232,221,0.10)',
  lineStrong: 'rgba(237,232,221,0.20)',
  accent: '#ff8a4c',
};

function asset(path: string) {
  return readFile(join(process.cwd(), path));
}
function assetBase64(path: string) {
  return readFile(join(process.cwd(), path), 'base64');
}

async function fonts() {
  const [display, sans, sansMed, serif, mono] = await Promise.all([
    asset('assets/fonts/Bricolage-SemiBold.ttf'),
    asset('assets/fonts/Inter-Regular.ttf'),
    asset('assets/fonts/Inter-Medium.ttf'),
    asset('assets/fonts/InstrumentSerif-Italic.ttf'),
    asset('assets/fonts/JetBrainsMono-Medium.ttf'),
  ]);
  return [
    { name: 'Display', data: display, weight: 600 as const, style: 'normal' as const },
    { name: 'Sans', data: sans, weight: 400 as const, style: 'normal' as const },
    { name: 'Sans', data: sansMed, weight: 500 as const, style: 'normal' as const },
    { name: 'Serif', data: serif, weight: 400 as const, style: 'italic' as const },
    { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
  ];
}

/** Wobbly closed contour ring as an SVG path (deterministic). */
function ring(cx: number, cy: number, rx: number, ry: number, seed: number) {
  const pts: string[] = [];
  const n = 72;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const wob = 1 + 0.07 * Math.sin(a * 3 + seed) + 0.04 * Math.sin(a * 5 + seed * 1.7) + 0.025 * Math.cos(a * 7 + seed * 0.6);
    pts.push(`${(cx + Math.cos(a) * rx * wob).toFixed(1)},${(cy + Math.sin(a) * ry * wob).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
}

function Contours({ cx, cy, accent }: { cx: number; cy: number; accent: string }) {
  const rings = Array.from({ length: 13 }, (_, i) => i);
  return (
    <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', top: 0, left: 0 }}>
      {rings.map((i) => (
        <path
          key={i}
          d={ring(cx - i * 6, cy + i * 3, 70 + i * 46, 52 + i * 34, i * 0.9)}
          fill="none"
          stroke={i === 3 ? accent : i % 4 === 0 ? C.lineStrong : C.line}
          strokeOpacity={i === 3 ? 0.85 : 1}
          strokeWidth={i === 3 ? 2.2 : i % 4 === 0 ? 1.6 : 1.1}
        />
      ))}
    </svg>
  );
}

function Mark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3.5c6.4 0 12.5 4.6 12.5 11.6 0 7.6-6.1 13.4-12.9 13.4C9 28.5 3.5 23.3 3.5 16.4 3.5 9 9.3 3.5 16 3.5Z" stroke={C.ink} strokeOpacity=".35" strokeWidth="1.4" />
      <path d="M16.3 8.3c4.2 0 8 3.1 8 7.6 0 4.8-3.9 8.3-8.4 8.3-4.4 0-7.8-3.3-7.8-7.6 0-4.7 3.8-8.3 8.2-8.3Z" stroke={C.ink} strokeOpacity=".65" strokeWidth="1.4" />
      <path d="M16.6 12.6c2 0 3.7 1.5 3.7 3.5 0 2.2-1.8 3.8-3.9 3.8-2 0-3.5-1.5-3.5-3.5 0-2.1 1.7-3.8 3.7-3.8Z" stroke={C.ink} strokeWidth="1.6" />
      <circle cx="16.5" cy="16.2" r="1.6" fill={C.accent} />
    </svg>
  );
}

function Frame({ children, accent = C.accent, cx = 980, cy = 300 }: { children: React.ReactNode; accent?: string; cx?: number; cy?: number }) {
  const host = site.url.replace(/^https?:\/\//, '');
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: C.bg, fontFamily: 'Sans', color: C.ink }}>
      <Contours cx={cx} cy={cy} accent={accent} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '56px 68px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Mark />
          <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 30, letterSpacing: -0.5 }}>
            {site.shortName}
            <span style={{ color: C.accent }}>.</span>
          </div>
        </div>
        {children}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${C.lineStrong}`, paddingTop: 22, fontFamily: 'Mono', fontSize: 20, color: C.ink3 }}>
          <span>{host}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: 9, background: accent }} />
            {site.location}
          </span>
        </div>
      </div>
    </div>
  );
}

/** The home / default share card: name, headline and portrait. */
export async function homeOgImage() {
  const portrait = `data:image/jpeg;base64,${await assetBase64('assets/og-portrait.jpg')}`;
  const [before, accentWord, after] = site.hero.headline.split('*');
  return new ImageResponse(
    (
      <Frame cx={1010} cy={300}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
            <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 19, letterSpacing: 3.5, color: C.ink3, textTransform: 'uppercase' }}>
              {site.identity.join('  •  ')}
            </div>
            <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 82, lineHeight: 1, letterSpacing: -3, marginTop: 22 }}>{site.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 38, lineHeight: 1.2, color: C.ink2, marginTop: 22, letterSpacing: -0.8 }}>
              {before}
              <span style={{ fontFamily: 'Serif', fontStyle: 'italic', color: C.accent, fontSize: 44, margin: '0 10px' }}>{accentWord}</span>
              {after}
            </div>
          </div>
          <div style={{ display: 'flex', position: 'relative', width: 270, height: 310 }}>
            <div style={{ position: 'absolute', top: -12, left: -12, width: 294, height: 334, borderRadius: 34, border: `2px dashed ${C.lineStrong}` }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portrait} width={270} height={310} style={{ borderRadius: 26, objectFit: 'cover' }} alt="" />
          </div>
        </div>
      </Frame>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

/** Share card for a case study page. */
export async function projectOgImage(p: { title: string; tagline: string; status: string; stack: string[]; accent: string; year: string }) {
  return new ImageResponse(
    (
      <Frame cx={1040} cy={280}>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Mono', fontSize: 19, letterSpacing: 3, color: C.ink3, textTransform: 'uppercase' }}>
            <span style={{ width: 34, height: 6, borderRadius: 6, background: p.accent }} />
            <span style={{ color: C.accent }}>Case study</span>
            <span>·</span>
            <span>{p.status}</span>
            <span>·</span>
            <span>{p.year}</span>
          </div>
          <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 104, lineHeight: 0.95, letterSpacing: -4, marginTop: 20 }}>
            {p.title}
            <span style={{ color: C.accent }}>.</span>
          </div>
          <div style={{ display: 'flex', fontFamily: 'Serif', fontStyle: 'italic', fontSize: 40, lineHeight: 1.2, color: C.ink2, marginTop: 22 }}>{p.tagline}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 30 }}>
            {p.stack.slice(0, 5).map((s) => (
              <span key={s} style={{ display: 'flex', fontFamily: 'Mono', fontSize: 18, color: C.ink2, border: `1px solid ${C.lineStrong}`, borderRadius: 999, padding: '7px 16px', background: 'rgba(23,28,36,0.85)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </Frame>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
