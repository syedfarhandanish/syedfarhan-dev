'use client';

import { useEffect, useState } from 'react';

/** Sticky in-page navigation for case studies, highlighting the section in view. */
export default function CaseStudyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <ol className="sticky top-28 grid gap-1 border-l border-line">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`-ml-px flex gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                active === s.id ? 'border-accent text-ink' : 'border-transparent text-ink-3 hover:text-ink'
              }`}
            >
              <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
