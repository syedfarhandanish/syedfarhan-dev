'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Command, FileText, Menu, X } from 'lucide-react';
import { navSections, site } from '@/content/site';
import BrandMark from '@/components/ui/BrandMark';
import ThemeToggle from './ThemeToggle';
import { openCommandPalette } from './CommandPalette';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view (home page only).
  useEffect(() => {
    if (!isHome) return;
    const els = navSections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = menuRef.current?.querySelector<HTMLElement>('a,button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a,button'));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <nav
        aria-label="Main"
        className={`flex w-full items-center justify-between gap-2 rounded-full border transition-all duration-500 ease-out-expo ${
          scrolled
            ? 'max-w-[980px] border-line bg-bg-elev/80 py-1.5 pl-3 pr-1.5 shadow-[var(--shadow-md)] backdrop-blur-xl'
            : 'max-w-[1240px] border-transparent bg-transparent py-2.5 pl-2 pr-2'
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label={`${site.name} — home`}>
          <BrandMark className="h-8 w-8 text-ink transition-transform duration-700 ease-out-expo group-hover:rotate-[24deg]" />
          <span className="font-display text-[1.05rem] font-semibold leading-none">
            {site.shortName}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navSections.map((s) => {
            const isActive = isHome && active === s.id;
            return (
              <li key={s.id}>
                <Link
                  href={href(s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {isActive && <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-surface-2" />}
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden h-10 items-center gap-2 rounded-full border border-line px-3 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink sm:flex"
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Command className="h-4 w-4" aria-hidden />
            <span className="kbd">K</span>
          </button>
          <ThemeToggle />
          <a
            href={site.resume.href}
            target="_blank"
            rel="noopener"
            className="hidden h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink md:flex"
          >
            <FileText className="h-4 w-4" aria-hidden /> CV
          </a>
          <Link href={href('contact')} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Let&apos;s talk
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-x-3 top-[4.75rem] z-40 rounded-3xl border border-line bg-bg-elev p-3 shadow-[var(--shadow-lg)] lg:hidden"
      >
        <ul className="grid">
          {navSections.map((s, i) => (
            <li key={s.id}>
              <Link
                href={href(s.id)}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between rounded-2xl px-4 py-3.5 transition-colors hover:bg-surface-2"
              >
                <span className="font-display text-2xl font-semibold">{s.label}</span>
                <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
          <a href={site.resume.href} target="_blank" rel="noopener" className="btn btn-ghost">
            <FileText className="h-4 w-4" aria-hidden /> View CV
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setOpen(false);
              openCommandPalette();
            }}
          >
            <Command className="h-4 w-4" aria-hidden /> Commands
          </button>
        </div>
      </div>
    </header>
  );
}
