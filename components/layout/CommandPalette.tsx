'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ArrowRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  FolderGit2,
  Hash,
  Mail,
  MonitorDown,
  MoonStar,
  Search,
} from 'lucide-react';
import { navSections, site } from '@/content/site';
import { projects } from '@/content/projects';
import { useTheme } from './ThemeProvider';
import { canInstall, promptInstall, subscribeInstall } from '@/lib/pwa';

const OPEN_EVENT = 'sfd:open-palette';
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

interface Cmd {
  id: string;
  group: 'Navigate' | 'Projects' | 'Actions' | 'Elsewhere';
  label: string;
  hint?: string;
  keywords?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { toggle, theme } = useTheme();
  const installable = useSyncExternalStore(subscribeInstall, canInstall, () => false);
  const listId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setIndex(0);
    returnFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (id: string) => {
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
      } else router.push(`/#${id}`);
    },
    [pathname, router],
  );

  const commands = useMemo<Cmd[]>(() => {
    const list: Cmd[] = [
      { id: 'home', group: 'Navigate', label: 'Home', icon: Hash, run: () => (pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : router.push('/')) },
      ...navSections.map<Cmd>((s) => ({ id: `nav-${s.id}`, group: 'Navigate', label: s.label, icon: Hash, run: () => go(s.id) })),
      ...projects
        .filter((p) => p.caseStudy)
        .map<Cmd>((p) => ({
          id: `p-${p.slug}`,
          group: 'Projects',
          label: p.title,
          hint: 'Case study',
          keywords: `${p.tagline} ${p.stack.join(' ')}`,
          icon: FolderGit2,
          run: () => router.push(`/projects/${p.slug}`),
        })),
      {
        id: 'theme',
        group: 'Actions',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        keywords: 'dark light mode appearance',
        icon: MoonStar,
        run: toggle,
      },
      {
        id: 'cv-open',
        group: 'Actions',
        label: 'Open CV',
        hint: 'PDF, new tab',
        keywords: 'resume',
        icon: FileText,
        run: () => window.open(site.resume.href, '_blank', 'noopener'),
      },
      {
        id: 'cv-dl',
        group: 'Actions',
        label: 'Download CV',
        keywords: 'resume pdf',
        icon: Download,
        run: () => {
          const a = document.createElement('a');
          a.href = site.resume.href;
          a.download = site.resume.fileName;
          a.click();
        },
      },
      {
        id: 'email-copy',
        group: 'Actions',
        label: 'Copy email address',
        hint: site.email,
        icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setToast('Email copied to clipboard');
          } catch {
            setToast(`Copy failed — it's ${site.email}`);
          }
        },
      },
      ...(installable
        ? [
            {
              id: 'install',
              group: 'Actions' as const,
              label: 'Install as an app',
              hint: 'Works offline',
              keywords: 'pwa install home screen offline',
              icon: MonitorDown,
              run: async () => {
                const outcome = await promptInstall();
                if (outcome === 'accepted') setToast('Installed — find it on your home screen or app list');
              },
            },
          ]
        : []),
      { id: 'contact', group: 'Actions', label: 'Contact me', keywords: 'message hire email', icon: Mail, run: () => go('contact') },
      ...site.socials
        .filter((s) => s.href.startsWith('http'))
        .map<Cmd>((s) => ({
          id: `s-${s.id}`,
          group: 'Elsewhere',
          label: `Visit ${s.label}`,
          hint: s.handle,
          icon: ExternalLink,
          run: () => window.open(s.href, '_blank', 'noopener'),
        })),
    ];
    return list;
  }, [go, installable, pathname, router, theme, toggle]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ''} ${c.hint ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => {
          if (!o) returnFocus.current = document.activeElement as HTMLElement;
          return !o;
        });
      }
    };
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const runAt = (i: number) => {
    const cmd = filtered[i];
    if (!cmd) return;
    setOpen(false);
    setQuery('');
    setIndex(0);
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setIndex(Math.max(0, filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAt(index);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      // Single focusable element inside the dialog: keep focus here.
      e.preventDefault();
    }
  };

  let lastGroup = '';

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center px-3 pt-[12vh]">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm dark:bg-black/60" onClick={close} aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-[var(--shadow-lg)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-ink-3" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Search sections, projects, actions…"
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={filtered[index] ? `${listId}-${filtered[index].id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search commands"
              />
              <span className="kbd">Esc</span>
            </div>
            <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="no-scrollbar max-h-[min(60vh,420px)] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-10 text-center text-sm text-ink-3" role="presentation">
                  Nothing matches “{query}”. Try “projects”, “cv” or “theme”.
                </li>
              )}
              {filtered.map((c, i) => {
                const showGroup = c.group !== lastGroup;
                lastGroup = c.group;
                const Icon = c.icon;
                const selected = i === index;
                return (
                  <li key={c.id} role="presentation">
                    {showGroup && <div className="eyebrow px-3 pb-1.5 pt-3">{c.group}</div>}
                    <div
                      id={`${listId}-${c.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runAt(i)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                        selected ? 'bg-accent-soft text-ink' : 'text-ink-2'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${selected ? 'text-accent' : 'text-ink-3'}`} />
                      <span className="flex-1 truncate">{c.label}</span>
                      {c.hint && <span className="hidden truncate font-mono text-xs text-ink-3 sm:inline">{c.hint}</span>}
                      {selected && <ArrowRight className="h-4 w-4 text-accent" aria-hidden />}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-ink-3">
              <span className="flex items-center gap-1.5">
                <span className="kbd">↑</span>
                <span className="kbd">↓</span> move
              </span>
              <span className="flex items-center gap-1.5">
                <span className="kbd">↵</span> run
              </span>
              <span className="ml-auto hidden sm:inline">{filtered.length} commands</span>
            </div>
          </div>
        </div>
      )}
      <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[130] -translate-x-1/2">
        {toast && <div className="rounded-full bg-ink px-4 py-2 text-sm text-bg shadow-[var(--shadow-lg)]">{toast}</div>}
      </div>
    </>
  );
}
