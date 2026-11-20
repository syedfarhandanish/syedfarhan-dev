'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One shared IntersectionObserver for every [data-reveal] element on the page.
 * Elements stay visible without JS (the hidden state is gated on html.js).
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const observeAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
    observeAll();

    // Pick up elements rendered later (filtered lists, client sections).
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
