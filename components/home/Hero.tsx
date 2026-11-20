import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { getSocial, site } from '@/content/site';
import { getProject } from '@/content/projects';
import RichText from '@/components/ui/RichText';
import Availability from '@/components/ui/Availability';
import TopoCanvas from './TopoCanvas';

/** Survey markers pinned on the contour map — each links to a real project. */
const markers = [
  { slug: 'collabs', x: 76, y: 26 },
  { slug: 'hindukush-express', x: 88, y: 44 },
  { slug: 'collabs-e-vote', x: 78, y: 62 },
  { slug: 'loadmap', x: 90, y: 78 },
];

export default function Hero() {
  const github = getSocial('github');
  const pins = markers
    .map((m, i) => ({ ...m, n: i + 1, project: getProject(m.slug) }))
    .filter((m) => m.project);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32">
      {/* Map layer */}
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,transparent_0%,black_35%,black_100%)] max-md:[mask-image:linear-gradient(to_bottom,black,transparent_95%)] max-md:opacity-70">
        <TopoCanvas />
      </div>
      {/* Map frame ticks */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 -z-10 hidden md:block">
        <div className="shell flex justify-between font-mono text-[10px] tracking-[0.2em] text-ink-3">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>

      {/* Project survey pins (desktop) */}
      <div className="pointer-events-none absolute inset-0 -z-0 hidden xl:block">
        {pins.map((m) => (
          <Link
            key={m.slug}
            href={`/projects/${m.slug}`}
            className="group pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <span className="relative grid h-6 w-6 place-items-center">
              <span className="absolute inset-0 rounded-full border border-accent/60 transition-transform duration-500 ease-out-expo group-hover:scale-150" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="rounded-full border border-line bg-bg-elev/85 px-2.5 py-1 font-mono text-[11px] text-ink-2 backdrop-blur transition-colors group-hover:border-accent group-hover:text-ink">
              {String(m.n).padStart(2, '0')} · {m.project!.title}
            </span>
          </Link>
        ))}
      </div>

      <div className="shell relative flex flex-1 flex-col justify-center pb-10">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          {site.identity.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />}
              {label}
            </span>
          ))}
        </p>

        <h1
          id="hero-title"
          className="font-display mt-6 max-w-[13ch] text-[clamp(2.9rem,8.4vw,7.4rem)] font-semibold leading-[0.92] text-ink"
        >
          <RichText text={site.hero.headline} />
        </h1>

        <p className="mt-8 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-2 sm:text-lg">{site.hero.intro}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="#work" className="btn btn-primary">
            Explore my work <ArrowDownRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="#contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {site.resume.href && (
            <a href={site.resume.href} download={site.resume.fileName} className="link-underline inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
              <Download className="h-4 w-4" aria-hidden /> Download resume
            </a>
          )}
          {github && (
            <a href={github.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
              <GithubIcon /> View GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>

      {/* Bottom readout strip */}
      <div className="shell relative pb-8">
        <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Availability />
          <p className="font-mono text-xs text-ink-3">
            {site.location} · {site.coordinates}
          </p>
        </div>
      </div>
    </section>
  );
}
