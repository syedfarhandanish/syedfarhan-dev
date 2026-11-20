import Image from 'next/image';
import { site } from '@/content/site';
import { achievements } from '@/content/experience';
import SectionHeader from '@/components/ui/SectionHeader';

export default function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell">
        <SectionHeader index="01" kicker="About" id="about-title" title="A student who learns by *shipping*." />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Portrait with contour frame */}
          <figure data-reveal className="relative lg:col-span-4">
            <div className="relative mx-auto max-w-[360px] lg:mx-0">
              <div aria-hidden className="absolute -inset-3 rounded-[2rem] border border-dashed border-line-strong" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-surface-2">
                <Image
                  src={about.photo.src}
                  alt={about.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 80vw"
                  className="object-cover grayscale-[15%] contrast-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                  <span className="font-display text-lg font-semibold leading-tight">{site.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">Upper Chitral</span>
                </figcaption>
              </div>
            </div>
          </figure>

          {/* Story */}
          <div className="lg:col-span-8 lg:pl-6">
            <blockquote data-reveal className="font-display text-[clamp(1.45rem,2.6vw,2.15rem)] font-medium leading-[1.2] text-ink">
              <span aria-hidden className="serif-accent mr-1 text-[1.3em] leading-none">“</span>
              {about.pullQuote}
            </blockquote>

            <div className="mt-10 grid gap-10 md:grid-cols-[1fr_minmax(0,0.85fr)]">
              <div data-reveal className="prose-body text-ink-2 [&_p:first-child]:first-letter:float-left [&_p:first-child]:first-letter:mr-2 [&_p:first-child]:first-letter:font-display [&_p:first-child]:first-letter:text-[3.4rem] [&_p:first-child]:first-letter:leading-[0.85] [&_p:first-child]:first-letter:text-accent">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
                <dl className="divide-y divide-line border-y border-line">
                  {about.facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3 text-sm">
                      <dt className="font-mono text-xs uppercase tracking-wider text-ink-3">{f.label}</dt>
                      <dd className="text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="eyebrow mt-8">Milestones</h3>
                <ul className="mt-3 grid gap-2">
                  {achievements.map((a) => (
                    <li key={a.title} className="flex gap-3 text-sm">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        <span className="text-ink">{a.title}</span>
                        <span className="text-ink-3"> — {a.context}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
