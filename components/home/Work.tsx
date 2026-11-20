'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project, ProjectCategory } from '@/content/types';
import { categoryLabels, projects, usedCategories } from '@/content/projects';
import StatusBadge from '@/components/project/StatusBadge';
import ProjectVisual from '@/components/project/ProjectVisual';
import ProjectLinks from '@/components/project/ProjectLinks';

type Filter = 'all' | ProjectCategory;

export default function Work() {
  const [filter, setFilter] = useState<Filter>('all');
  const reduce = useReducedMotion();
  const cats = usedCategories();

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const main = visible.filter((p) => p.presentation !== 'archive');
  const flagship = main.filter((p) => p.presentation === 'flagship');
  const features = main.filter((p) => p.presentation === 'feature');
  const cards = main.filter((p) => p.presentation === 'card');
  const archive = visible.filter((p) => p.presentation === 'archive');

  const count = (c: Filter) => (c === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c)).length);

  const anim = reduce
    ? {}
    : {
        layout: true,
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div>
      {/* Filters */}
      <div className="sticky top-[4.5rem] z-20 -mx-4 mb-12 px-4 py-3 sm:static sm:mx-0 sm:px-0 sm:py-0">
        <div role="group" aria-label="Filter projects by category" className="no-scrollbar flex gap-2 overflow-x-auto rounded-full sm:flex-wrap max-sm:bg-bg/85 max-sm:backdrop-blur">
          {(['all', ...cats] as Filter[]).map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  active ? 'border-ink bg-ink text-bg' : 'border-line text-ink-2 hover:border-line-strong hover:text-ink'
                }`}
              >
                {c === 'all' ? 'All work' : categoryLabels[c]}
                <span className={`ml-2 font-mono text-[11px] ${active ? 'opacity-70' : 'text-ink-3'}`}>{count(c)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} project{visible.length === 1 ? '' : 's'}
        {filter !== 'all' ? ` in ${categoryLabels[filter]}` : ''}.
      </p>

      <div className="grid gap-20 md:gap-28">
        {/* Flagship: large editorial feature */}
        <AnimatePresence mode="popLayout">
          {flagship.map((p) => (
            <motion.article key={p.slug} {...anim} aria-labelledby={`p-${p.slug}`} className="group grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <Meta project={p} index={projects.indexOf(p)} />
                <h3 id={`p-${p.slug}`} className="font-display mt-4 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.95]">
                  {p.title}
                </h3>
                <p className="mt-3 font-serif text-2xl italic text-ink-2">{p.tagline}</p>
                <p className="mt-6 text-ink-2">{p.summary}</p>
                <ul className="mt-6 grid gap-2 text-sm text-ink-2">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1 w-3 shrink-0 bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Stack stack={p.stack} />
                <div className="mt-8">
                  <ProjectLinks project={p} />
                </div>
              </div>
              <div className="relative lg:col-span-7">
                <ProjectVisual project={p} />
                <div aria-hidden className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-2xl border border-dashed border-line-strong sm:block" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {/* Features: alternating side-by-side showcases */}
        {features.length > 0 && (
          <div className="grid gap-20 md:gap-24">
            <AnimatePresence mode="popLayout">
              {features.map((p, i) => (
                <motion.article
                  key={p.slug}
                  {...anim}
                  aria-labelledby={`p-${p.slug}`}
                  className="group grid gap-8 md:grid-cols-12 md:items-center"
                >
                  <div className={`md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
                    <ProjectVisual project={p} sizes="(min-width: 768px) 58vw, 100vw" />
                  </div>
                  <div className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:pr-6' : 'md:pl-6'}`}>
                    <Meta project={p} index={projects.indexOf(p)} />
                    <h3 id={`p-${p.slug}`} className="font-display mt-4 text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-none">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-lg text-ink">{p.tagline}</p>
                    <p className="mt-4 text-ink-2">{p.summary}</p>
                    <dl className="mt-5 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
                      <dt className="font-mono text-xs uppercase tracking-wider text-ink-3">Role</dt>
                      <dd>{p.role}</dd>
                      <dt className="font-mono text-xs uppercase tracking-wider text-ink-3">Year</dt>
                      <dd>{p.year}</dd>
                    </dl>
                    <Stack stack={p.stack} />
                    <div className="mt-7">
                      <ProjectLinks project={p} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Cards: image-led grid */}
        {cards.length > 0 && (
          <div>
            <h3 className="eyebrow mb-6">More projects</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {cards.map((p) => (
                  <motion.article key={p.slug} {...anim} className="group card relative flex flex-col overflow-hidden p-3" aria-labelledby={`p-${p.slug}`}>
                    <ProjectVisual project={p} chrome={false} natural={false} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="!rounded-xl !shadow-none" />
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                      <div className="flex items-center justify-between gap-3">
                        <StatusBadge status={p.status} />
                        <span className="font-mono text-xs text-ink-3">{p.year}</span>
                      </div>
                      <h4 id={`p-${p.slug}`} className="font-display mt-4 text-2xl font-semibold leading-tight">
                        {p.caseStudy ? (
                          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                            {p.title}
                          </Link>
                        ) : (
                          p.title
                        )}
                      </h4>
                      <p className="mt-2 text-sm text-ink-2">{p.tagline}</p>
                      {p.note && <p className="mt-3 rounded-lg bg-surface-2 px-3 py-2 text-xs text-ink-2">{p.note}</p>}
                      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
                        {p.caseStudy && (
                          <span className="inline-flex items-center gap-1 font-medium text-accent">
                            Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                          </span>
                        )}
                        {p.links
                          .filter((l) => l.kind === 'live')
                          .map((l) => (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline text-ink-2 hover:text-ink">
                              {l.label} ↗<span className="sr-only"> (opens in new tab)</span>
                            </a>
                          ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Archive: compact list */}
        {archive.length > 0 && (
          <div>
            <h3 className="eyebrow mb-4">From the workbench — smaller tools & experiments</h3>
            <ul className="divide-y divide-line border-y border-line">
              {archive.map((p) => {
                const link = p.links[0];
                return (
                  <li key={p.slug} className="grid gap-2 py-5 sm:grid-cols-[1.2fr_2fr_auto] sm:items-baseline sm:gap-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-ink-3">{p.year}</span>
                      <span className="font-display text-lg font-semibold">{p.title}</span>
                    </div>
                    <div className="text-sm text-ink-2">
                      {p.summary}
                      {p.note && <span className="mt-1 block text-xs text-ink-3">{p.note}</span>}
                      <span className="mt-1 block font-mono text-[11px] text-ink-3">{p.stack.join(' · ')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={p.status} />
                      {link && (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-ink-2 hover:text-ink">
                          {link.kind === 'source' ? 'Source' : 'Visit'} ↗<span className="sr-only"> {p.title} (opens in new tab)</span>
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {visible.length === 0 && <p className="py-16 text-center text-ink-3">No projects in this category yet.</p>}
      </div>
    </div>
  );
}

function Meta({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
      <StatusBadge status={project.status} />
      {project.categories.slice(0, 2).map((c) => (
        <span key={c} className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
          {categoryLabels[c]}
        </span>
      ))}
    </div>
  );
}

function Stack({ stack }: { stack: string[] }) {
  if (!stack.length) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
      {stack.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
    </ul>
  );
}
