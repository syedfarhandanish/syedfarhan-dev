'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { contrastRatio, wcagLevel } from '@/lib/contrast';

const pairs = [
  { fg: '--ink', bg: '--bg', label: 'Body text on page' },
  { fg: '--ink-2', bg: '--bg', label: 'Secondary text' },
  { fg: '--ink-3', bg: '--bg', label: 'Muted labels' },
  { fg: '--ink', bg: '--surface', label: 'Text on cards' },
  { fg: '--accent', bg: '--bg', label: 'Accent text' },
  { fg: '--accent-ink', bg: '--accent', label: 'Text on accent button' },
];

type Row = { label: string; fg: string; bg: string; ratio: number | null };

/**
 * The same component rendered in both themes at once, measured live.
 * Colours are read from this site's real CSS custom properties.
 */
export default function ThemeLab() {
  const [width, setWidth] = useState(420);
  const lightRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<{ light: Row[]; dark: Row[] }>({ light: [], dark: [] });
  const uid = useId();

  useEffect(() => {
    const read = (el: HTMLElement | null): Row[] => {
      if (!el) return [];
      const cs = getComputedStyle(el);
      return pairs.map((p) => {
        const fg = cs.getPropertyValue(p.fg).trim();
        const bg = cs.getPropertyValue(p.bg).trim();
        return { label: p.label, fg, bg, ratio: contrastRatio(fg, bg) };
      });
    };
     
    setRows({ light: read(lightRef.current), dark: read(darkRef.current) });
  }, []);

  return (
    <div className="grid gap-6 [&>*]:min-w-0">
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor={uid} className="text-sm text-ink-2">
          Container width
        </label>
        <input
          id={uid}
          type="range"
          min={260}
          max={560}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-48 accent-[var(--accent)]"
        />
        <output htmlFor={uid} className="font-mono text-sm">{width}px</output>
        <span className="text-xs text-ink-3">The card switches layout with a CSS container query below 380px.</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(['light', 'dark'] as const).map((t) => (
          <div
            key={t}
            ref={t === 'light' ? lightRef : darkRef}
            data-theme={t}
            className="overflow-hidden rounded-xl border border-line bg-bg p-4 text-ink"
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              <span>{t === 'light' ? 'Paper · light' : 'Ridge · dark'}</span>
              <span>{width}px</span>
            </div>
            <div className="no-scrollbar overflow-x-auto">
              <div className="@container mx-auto max-w-full transition-[width] duration-300" style={{ width }}>
                <article className="card grid gap-3 p-4 @[380px]:grid-cols-[88px_1fr] @[380px]:items-center">
                  <div className="grid aspect-square w-16 place-items-center rounded-xl bg-accent-soft font-display text-2xl font-semibold text-accent @[380px]:w-full">
                    e
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-semibold">Collabs e-Vote</span>
                      <span className="chip !py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden /> Live
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-2">Secure online elections for school councils.</p>
                    <p className="mt-1 font-mono text-[11px] text-ink-3">Next.js · Prisma · NextAuth</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" tabIndex={-1} className="btn btn-accent btn-sm">Open</button>
                      <button type="button" tabIndex={-1} className="btn btn-ghost btn-sm">Details</button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[520px] text-sm">
          <caption className="sr-only">WCAG contrast ratios of this site&apos;s colour tokens in both themes</caption>
          <thead className="bg-surface-2 text-left font-mono text-[10px] uppercase tracking-wider text-ink-3">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-normal">Pair</th>
              <th scope="col" className="px-4 py-2.5 font-normal">Light</th>
              <th scope="col" className="px-4 py-2.5 font-normal">Dark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {pairs.map((p, i) => (
              <tr key={p.label}>
                <th scope="row" className="px-4 py-2.5 text-left font-normal">
                  {p.label}
                  <span className="block font-mono text-[10px] text-ink-3">
                    {p.fg} on {p.bg}
                  </span>
                </th>
                {(['light', 'dark'] as const).map((t) => {
                  const r = rows[t][i];
                  const level = r?.ratio ? wcagLevel(r.ratio) : null;
                  return (
                    <td key={t} className="px-4 py-2.5">
                      {r?.ratio ? (
                        <span className="flex items-center gap-2">
                          <span className="grid h-6 w-6 place-items-center rounded border border-line text-[11px] font-bold" style={{ background: r.bg, color: r.fg }} aria-hidden>
                            Aa
                          </span>
                          <span className="font-mono">{r.ratio.toFixed(2)}:1</span>
                          <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${level === 'Fail' ? 'bg-danger/15 text-danger' : 'bg-ok/15 text-ok'}`}>{level}</span>
                        </span>
                      ) : (
                        <span className="text-ink-3">measuring…</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
