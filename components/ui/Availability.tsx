import { site } from '@/content/site';

const tone = {
  open: 'text-ok',
  limited: 'text-accent',
  focused: 'text-ink-3',
} as const;

/** Availability indicator, driven entirely by `site.availability`. */
export default function Availability({ detail = false, className = '' }: { detail?: boolean; className?: string }) {
  const a = site.availability;
  return (
    <div className={`inline-flex items-start gap-2.5 ${className}`}>
      <span className={`mt-[0.45em] ${tone[a.state]}`}>
        <span className="pulse-dot block" aria-hidden />
      </span>
      <span>
        <span className="sr-only">Availability: </span>
        <span className="text-sm font-medium text-ink">{a.label}</span>
        {detail && <span className="block text-sm text-ink-3">{a.detail}</span>}
      </span>
    </div>
  );
}
