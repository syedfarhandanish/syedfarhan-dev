import RichText from './RichText';

interface Props {
  index: string;
  kicker: string;
  title: string;
  intro?: string;
  id: string;
  aside?: React.ReactNode;
}

/** Editorial section header: index number, kicker, big display title. */
export default function SectionHeader({ index, kicker, title, intro, id, aside }: Props) {
  return (
    <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div data-reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {kicker}
        </p>
        <h2 id={id} className="font-display mt-5 max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold leading-[0.98]">
          <RichText text={title} />
        </h2>
        {intro && <p className="mt-5 max-w-[60ch] text-ink-2 sm:text-lg">{intro}</p>}
      </div>
      {aside && (
        <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          {aside}
        </div>
      )}
    </header>
  );
}
