import Image from 'next/image';
import type { Project } from '@/content/types';

/**
 * A project's visual identity.
 * - Screenshots/photos are framed in a minimal browser chrome.
 * - Logos sit on the project's own colour field with contour lines.
 * - Projects without media get a typographic identity on their colour field
 *   (never stock imagery).
 */
const DEFAULT_ASPECT = 'aspect-[16/10]';

export default function ProjectVisual({
  project,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className = '',
  chrome = true,
  aspect = DEFAULT_ASPECT,
  natural = true,
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
  className?: string;
  chrome?: boolean;
  aspect?: string;
  /** Use the image's own proportions (only with the default frame). */
  natural?: boolean;
}) {
  const m = project.media;
  const useNatural = natural && aspect === DEFAULT_ASPECT;
  const host = project.links.find((l) => l.kind === 'live')?.label ?? `${project.slug}.local`;

  if (m && m.fit === 'cover') {
    return (
      <div className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-md)] ${className}`}>
        {chrome && (
          <div className="flex items-center gap-2 border-b border-line bg-bg-elev px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            </span>
            <span className="mx-auto truncate rounded-md bg-surface-2 px-3 py-0.5 font-mono text-[11px] text-ink-3">{host}</span>
          </div>
        )}
        {/* With the default frame, use the image's own proportions so nothing is cropped. */}
        <div
          className={`relative overflow-hidden ${useNatural ? '' : aspect}`}
          style={useNatural ? { aspectRatio: `${m.width} / ${m.height}` } : undefined}
        >
          <Image
            src={m.src}
            alt={m.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative isolate ${aspect} overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-md)] ${className}`}
      style={{ background: `linear-gradient(140deg, ${project.accent}, color-mix(in srgb, ${project.accent} 55%, #000))` }}
    >
      <ContourPattern />
      {m ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-[42%] aspect-square overflow-hidden rounded-[22%] bg-white/95 p-[7%] shadow-2xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-2deg]">
            <Image src={m.src} alt={m.alt} fill sizes="240px" className="object-contain p-[12%]" priority={priority} />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none opacity-95">{project.title}</span>
          <span className="mt-2 font-mono text-xs uppercase tracking-[0.18em] opacity-75">{project.tagline}</span>
        </div>
      )}
    </div>
  );
}

function ContourPattern() {
  return (
    <svg aria-hidden viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 h-full w-full opacity-30">
      {Array.from({ length: 9 }, (_, i) => {
        const r = 30 + i * 26;
        return (
          <ellipse
            key={i}
            cx={300 - i * 4}
            cy={70 + i * 3}
            rx={r * 1.25}
            ry={r * 0.8}
            transform={`rotate(${-12 + i * 2} 300 70)`}
            fill="none"
            stroke="white"
            strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
          />
        );
      })}
    </svg>
  );
}
