import Link from 'next/link';
import { navSections, site } from '@/content/site';
import BrandMark from '@/components/ui/BrandMark';
import LocalTime from '@/components/ui/LocalTime';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print relative border-t border-line bg-bg-elev">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9 text-ink" />
            <span className="font-display text-xl font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-ink-2">
            Student and software developer from {site.location}. Building practical tools, one real problem at a time.
          </p>
          <p className="mt-6 font-mono text-xs text-ink-3">
            {site.coordinates} · <LocalTime /> PKT
          </p>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Sitemap</h2>
          <ul className="grid gap-2 text-sm">
            {navSections.map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} className="link-underline text-ink-2 hover:text-ink">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Elsewhere</h2>
          <ul className="grid gap-2 text-sm">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="link-underline text-ink-2 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.resume.href} target="_blank" rel="noopener" className="link-underline text-ink-2 hover:text-ink">
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-line py-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. Designed and built by me with Next.js.
        </p>
        <p>
          Press <span className="kbd">Ctrl</span> <span className="kbd">K</span> to navigate anywhere.
        </p>
      </div>
    </footer>
  );
}
