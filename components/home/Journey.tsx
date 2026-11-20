'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ExperienceEntry } from '@/content/types';
import { certifications, experience, kindLabels, languages } from '@/content/experience';

type Kind = 'all' | ExperienceEntry['kind'];

export default function Journey() {
  const [kind, setKind] = useState<Kind>('all');
  const kinds = (Object.keys(kindLabels) as ExperienceEntry['kind'][]).filter((k) => experience.some((e) => e.kind === k));
  const list = [...experience]
    .sort((a, b) => b.start.localeCompare(a.start))
    .filter((e) => kind === 'all' || e.kind === kind);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_18rem] [&>*]:min-w-0">
      <div>
        <div role="group" aria-label="Filter timeline" className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {(['all', ...kinds] as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                kind === k ? 'border-ink bg-ink text-bg' : 'border-line text-ink-2 hover:border-line-strong hover:text-ink'
              }`}
            >
              {k === 'all' ? 'Everything' : kindLabels[k]}
            </button>
          ))}
        </div>

        <ol className="relative border-l border-line-strong pl-8 sm:pl-10">
          {list.map((e) => (
            <li key={e.id} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[calc(2rem+5px)] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-bg ring-1 sm:-left-[calc(2.5rem+5px)] ${
                  e.kind === 'building' ? 'bg-accent ring-accent' : 'bg-bg ring-line-strong'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-xs text-ink-3">{e.period}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{kindLabels[e.kind]}</span>
              </div>
              <h3 className="font-display mt-2 text-xl font-semibold leading-snug sm:text-2xl">{e.role}</h3>
              <p className="text-ink-2">{e.organization}</p>
              <p className="mt-3 max-w-[62ch] text-ink-2">{e.summary}</p>
              {e.points.length > 0 && (
                <details className="group mt-3 max-w-[62ch]">
                  <summary className="cursor-pointer list-none text-sm font-medium text-ink hover:text-accent [&::-webkit-details-marker]:hidden">
                    <span className="inline-block transition-transform group-open:rotate-90" aria-hidden>›</span> Responsibilities & highlights
                  </summary>
                  <ul className="mt-2 grid gap-1.5 text-sm text-ink-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-3" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {e.link &&
                (e.link.href.startsWith('/') ? (
                  <Link href={e.link.href} className="mt-3 inline-flex items-center gap-1 text-sm text-accent link-underline">
                    {e.link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                ) : (
                  <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-accent link-underline">
                    {e.link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                ))}
            </li>
          ))}
        </ol>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card p-5">
          <h3 className="eyebrow">Certifications</h3>
          <ul className="mt-3 grid gap-2 text-sm">
            {certifications.map((c) => (
              <li key={c} className="flex gap-2.5">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-6">Languages</h3>
          <p className="mt-2 text-sm text-ink-2">{languages}</p>
        </div>
      </aside>
    </div>
  );
}
