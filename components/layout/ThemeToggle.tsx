'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-surface ${className}`}
    >
      {/* Both icons are rendered; CSS decides which is visible so there is no hydration flash. */}
      <Sun
        aria-hidden="true"
        className="h-[18px] w-[18px] transition-transform duration-500 ease-out-expo dark:-translate-y-8 dark:rotate-90"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] translate-y-8 -rotate-90 transition-transform duration-500 ease-out-expo dark:translate-y-0 dark:rotate-0"
      />
    </button>
  );
}
