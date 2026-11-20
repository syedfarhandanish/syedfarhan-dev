'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { skillGroups } from '@/content/skills';
import { getProject, statusLabels } from '@/content/projects';

export default function Skills() {
  const [sel, setSel] = useState({ g: 0, i: 0 });
  const group = skillGroups[sel.g];
  const skill = group.items[sel.i];
  const used = skill.usedIn.map(getProject).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_24rem] [&>*]:min-w-0">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <div key={g.id} data-reveal style={{ '--reveal-delay': `${gi * 60}ms` } as React.CSSProperties}>
            <h3 className="flex items-baseline gap-3 border-b border-line pb-3">
              <span className="font-mono text-xs text-accent">{String(gi + 1).padStart(2, '0')}</span>
              <span className="font-display text-xl font-semibold">{g.title}</span>
            </h3>
            <p className="mt-2 text-sm text-ink-3">{g.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it, ii) => {
                const active = sel.g === gi && sel.i === ii;
                return (
                  <li key={it.name}>
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-controls="skill-evidence"
                      onClick={() => setSel({ g: gi, i: ii })}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        active
                          ? 'border-accent bg-accent text-accent-ink'
                          : 'border-line bg-surface text-ink hover:border-line-strong'
                      }`}
                    >
                      {it.name}
                      {it.usedIn.length > 0 && (
                        <span className={`ml-1.5 font-mono text-[10px] ${active ? 'opacity-80' : 'text-ink-3'}`}>{it.usedIn.length}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <aside id="skill-evidence" aria-live="polite" className="lg:sticky lg:top-28 lg:self-start">
        <div className="card overflow-hidden">
          <div className="border-b border-line bg-surface-2 px-5 py-4">
            <div className="eyebrow">Evidence for</div>
            <div className="font-display mt-1 text-2xl font-semibold">{skill.name}</div>
            {skill.note && <p className="mt-1 text-sm text-ink-2">{skill.note}</p>}
          </div>
          <div className="p-5">
            {used.length ? (
              <>
                <p className="mb-3 text-sm text-ink-3">
                  Used in {used.length} project{used.length > 1 ? 's' : ''}:
                </p>
                <ul className="grid gap-2">
                  {used.map((p) => {
                    const href = p.caseStudy ? `/projects/${p.slug}` : p.links.find((l) => l.kind === 'live')?.href;
                    const inner = (
                      <>
                        <span className="h-8 w-1 shrink-0 rounded-full" style={{ background: p.accent }} aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{p.title}</span>
                          <span className="block truncate text-xs text-ink-3">
                            {statusLabels[p.status]} · {p.year}
                          </span>
                        </span>
                        {href && <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 group-hover:text-accent" aria-hidden />}
                      </>
                    );
                    return (
                      <li key={p.slug}>
                        {href ? (
                          href.startsWith('/') ? (
                            <Link href={href} className="group flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 transition-colors hover:border-line-strong">
                              {inner}
                            </Link>
                          ) : (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 transition-colors hover:border-line-strong">
                              {inner}
                            </a>
                          )
                        ) : (
                          <div className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="text-sm text-ink-2">A tool I use every day or am actively learning — not tied to a specific project yet.</p>
            )}
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-ink-3">No percentage bars — each skill points to the work that shows it.</p>
      </aside>
    </div>
  );
}
