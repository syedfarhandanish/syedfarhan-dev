import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { categoryLabels, getProject, projects } from '@/content/projects';
import { site } from '@/content/site';
import StatusBadge from '@/components/project/StatusBadge';
import ProjectVisual from '@/components/project/ProjectVisual';
import ProjectLinks from '@/components/project/ProjectLinks';
import CaseStudyNav from '@/components/project/CaseStudyNav';

const withCaseStudy = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return withCaseStudy.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — case study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: p.summary,
      url: `${site.url}/projects/${p.slug}`,
      type: 'article',
      images: p.media?.fit === 'cover' ? [{ url: p.media.src }] : [{ url: '/images/og-thumbnail.jpg', width: 1200, height: 630 }],
    },
  };
}

const sections = [
  { id: 'problem', label: 'Problem' },
  { id: 'why', label: 'Why I built it' },
  { id: 'approach', label: 'Approach' },
  { id: 'features', label: 'Features' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'learned', label: 'What I learned' },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.caseStudy) notFound();
  const cs = p.caseStudy;
  const idx = withCaseStudy.findIndex((x) => x.slug === p.slug);
  const next = withCaseStudy[(idx + 1) % withCaseStudy.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.summary,
    author: { '@type': 'Person', name: site.name, url: site.url },
    url: `${site.url}/projects/${p.slug}`,
    keywords: p.stack.join(', '),
  };

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      {/* Header */}
      <header className="shell">
        <Link href="/#work" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All work
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={p.status} />
              {p.categories.map((c) => (
                <span key={c} className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
                  {categoryLabels[c]}
                </span>
              ))}
            </div>
            <h1 className="font-display mt-5 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.92]">
              {p.title}
              <span style={{ color: p.accent }}>.</span>
            </h1>
            <p className="mt-5 max-w-[48ch] font-serif text-[clamp(1.4rem,2.6vw,2rem)] italic leading-snug text-ink-2">{p.tagline}</p>
          </div>
          <div className="lg:col-span-4">
            <ProjectLinks project={p} showCaseStudy={false} />
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            ['Role', p.role],
            ['Timeline', p.year],
            ['Status', p.note ?? (p.status === 'live' ? 'Deployed and public' : '—')],
            ['Stack', p.stack.slice(0, 4).join(' · ') || '—'],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-5">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="shell mt-12">
        <ProjectVisual project={p} priority sizes="(min-width: 1240px) 1200px, 100vw" aspect="aspect-[16/10] md:aspect-[2/1]" />
      </div>

      {/* Body */}
      <div className="shell mt-20 grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <CaseStudyNav sections={sections} />

        <div className="min-w-0 max-w-[72ch] lg:max-w-none">
          <Block id="problem" n="01" title="The problem">
            <p className="text-xl leading-relaxed text-ink">{cs.problem}</p>
          </Block>
          <Block id="why" n="02" title="Why I built it">
            <p>{cs.why}</p>
          </Block>
          <Block id="approach" n="03" title="My approach & role">
            <p>{cs.approach}</p>
            <p className="mt-4 rounded-xl border-l-2 border-accent bg-bg-elev px-5 py-4 text-ink">
              <span className="eyebrow mb-1 block">My contribution</span>
              {p.contribution}
            </p>
          </Block>
          <Block id="features" n="04" title="What it does">
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-ink">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-sm" style={{ background: p.accent }} />
                  {f}
                </li>
              ))}
            </ul>
            {p.stack.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {p.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            )}
          </Block>
          <Block id="decisions" n="05" title="Key technical decisions">
            <ol className="grid gap-4">
              {cs.decisions.map((d, i) => (
                <li key={d.title} className="grid gap-1 border-t border-line pt-4 sm:grid-cols-[2.5rem_1fr]">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{d.title}</h3>
                    <p className="mt-1">{d.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>
          <Block id="challenges" n="06" title="Challenges & solutions">
            <div className="grid gap-4">
              {cs.challenges.map((c) => (
                <div key={c.challenge} className="grid overflow-hidden rounded-xl border border-line md:grid-cols-2">
                  <div className="bg-surface-2 p-5">
                    <div className="eyebrow mb-1">Challenge</div>
                    <p className="text-ink">{c.challenge}</p>
                  </div>
                  <div className="bg-surface p-5">
                    <div className="eyebrow mb-1 !text-accent">Solution</div>
                    <p>{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </Block>
          <Block id="learned" n="07" title="What I learned">
            <ul className="grid gap-3">
              {cs.learned.map((l) => (
                <li key={l} className="font-display text-xl font-medium leading-snug text-ink">
                  <span className="serif-accent mr-2">—</span>
                  {l}
                </li>
              ))}
            </ul>
          </Block>

          {p.gallery && p.gallery.length > 0 && (
            <section aria-label="Gallery" className="mt-16 grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g) => (
                <figure key={g.src} className="overflow-hidden rounded-2xl border border-line">
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 640px) 40vw, 100vw" className="h-auto w-full" />
                  <figcaption className="border-t border-line bg-surface px-4 py-3 text-sm text-ink-2">{g.alt}</figcaption>
                </figure>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* Next project */}
      {next && next.slug !== p.slug && (
        <div className="shell mt-24">
          <Link href={`/projects/${next.slug}`} className="group block rounded-3xl border border-line bg-bg-elev p-8 transition-colors hover:border-ink sm:p-12">
            <span className="eyebrow">Next case study</span>
            <span className="font-display mt-3 flex items-center justify-between gap-6 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none">
              {next.title}
              <ArrowRight className="h-10 w-10 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-2" aria-hidden />
            </span>
            <span className="mt-3 block text-ink-2">{next.tagline}</span>
          </Link>
        </div>
      )}
    </article>
  );
}

function Block({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0">
      <h2 id={`${id}-h`} className="mb-5 flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent">{n}</span>
        <span className="font-display text-3xl font-semibold sm:text-4xl">{title}</span>
      </h2>
      <div className="text-lg leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}
