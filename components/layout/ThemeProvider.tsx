'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark';
type Preference = Theme | 'system';

const STORAGE_KEY = 'sfd-theme';

/**
 * Runs before paint (inlined in <head>) so the first frame already has the right theme.
 * Stored preference wins; otherwise follow the operating system.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var p=localStorage.getItem('${STORAGE_KEY}');var t=(p==='light'||p==='dark')?p:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

interface ThemeContextValue {
  theme: Theme;
  preference: Preference;
  setPreference: (p: Preference) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animate && !reduce) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 450);
  }
  root.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Server render assumes light; the init script has already set the real value on <html>.
  const [preference, setPref] = useState<Preference>('system');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const pref: Preference = stored === 'light' || stored === 'dark' ? stored : 'system';
    // Sync React state with what the pre-paint script already applied.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPref(pref);
    setTheme((document.documentElement.dataset.theme as Theme) ?? systemTheme());
  }, []);

  // Follow OS changes while the visitor hasn't chosen explicitly.
  useEffect(() => {
    if (preference !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const next = systemTheme();
      applyTheme(next, true);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preference]);

  const setPreference = useCallback((p: Preference) => {
    const next = p === 'system' ? systemTheme() : p;
    try {
      if (p === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, p);
    } catch {}
    applyTheme(next, true);
    setPref(p);
    setTheme(next);
  }, []);

  const toggle = useCallback(() => {
    const current = (document.documentElement.dataset.theme as Theme) ?? 'light';
    setPreference(current === 'dark' ? 'light' : 'dark');
  }, [setPreference]);

  const value = useMemo(() => ({ theme, preference, setPreference, toggle }), [theme, preference, setPreference, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
