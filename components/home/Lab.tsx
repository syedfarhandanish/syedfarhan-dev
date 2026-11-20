'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Braces, Contrast, SunMedium, TerminalSquare, Vote } from 'lucide-react';

const Loading = () => (
  <div className="grid h-72 place-items-center rounded-xl border border-dashed border-line text-sm text-ink-3">Loading experiment…</div>
);

const LoadLab = dynamic(() => import('@/components/lab/LoadLab'), { loading: Loading });
const ApiLab = dynamic(() => import('@/components/lab/ApiLab'), { loading: Loading });
const BallotLab = dynamic(() => import('@/components/lab/BallotLab'), { loading: Loading });
const ThemeLab = dynamic(() => import('@/components/lab/ThemeLab'), { loading: Loading });
const Terminal = dynamic(() => import('@/components/lab/Terminal'), { loading: Loading });

const experiments = [
  {
    id: 'energy',
    skill: 'Problem solving',
    title: 'Solar sizing engine',
    icon: SunMedium,
    from: 'LoadMap',
    blurb:
      'The real calculation engine from LoadMap, running in your browser. Schedule appliances for a household and watch the village load curve and solar sizing update.',
    label: 'Runs locally · sample household data',
    Panel: LoadLab,
  },
  {
    id: 'api',
    skill: 'Full-stack',
    title: 'Live API explorer',
    icon: Braces,
    from: 'This site',
    blurb:
      'A real route handler at /api/projects that validates query parameters on the server. Every change sends an actual HTTP request — see the status, timing and JSON.',
    label: 'Real network requests · this portfolio’s data',
    Panel: ApiLab,
  },
  {
    id: 'ballot',
    skill: 'Backend thinking',
    title: 'Ballot rules',
    icon: Vote,
    from: 'Collabs e-Vote',
    blurb:
      'The rules behind e-Vote’s vote endpoint, modelled in the browser: role, election state, empty ballots, double voting, visibility — then an atomic write with SHA-256 receipts.',
    label: 'Runs locally · sample school, nothing is sent',
    Panel: BallotLab,
  },
  {
    id: 'theme',
    skill: 'UI/UX & accessibility',
    title: 'Two themes, measured',
    icon: Contrast,
    from: 'This site',
    blurb:
      'One component rendered in both of this site’s themes side by side, with a container-query layout and WCAG contrast ratios measured from the live CSS tokens.',
    label: 'Reads this page’s real design tokens',
    Panel: ThemeLab,
  },
  {
    id: 'shell',
    skill: 'Interaction',
    title: 'Portfolio shell',
    icon: TerminalSquare,
    from: 'This site',
    blurb: 'A small command line over this portfolio’s content — with history, tab-completion and a few honest error messages.',
    label: 'Portfolio feature · not a real OS shell',
    Panel: Terminal,
  },
] as const;

export default function Lab() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const exp = experiments[active];
  const Panel = exp.Panel;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % experiments.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + experiments.length) % experiments.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = experiments.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-10 [&>*]:min-w-0">
      <div
        role="tablist"
        aria-label="Lab experiments"
        aria-orientation="vertical"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {experiments.map((x, i) => {
          const Icon = x.icon;
          const selected = i === active;
          return (
            <button
              key={x.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`lab-tab-${x.id}`}
              aria-selected={selected}
              aria-controls={`lab-panel-${x.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all lg:w-full ${
                selected ? 'border-ink bg-ink text-bg shadow-[var(--shadow-md)]' : 'border-line bg-surface hover:border-line-strong'
              }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${selected ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-ink-2'}`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span>
                <span className={`block font-mono text-[10px] uppercase tracking-wider ${selected ? 'opacity-70' : 'text-ink-3'}`}>
                  {String(i + 1).padStart(2, '0')} · {x.skill}
                </span>
                <span className="block whitespace-nowrap text-sm font-semibold">{x.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`lab-panel-${exp.id}`}
        aria-labelledby={`lab-tab-${exp.id}`}
        tabIndex={0}
        className="card min-w-0 p-4 sm:p-6 lg:p-8"
      >
        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[60ch]">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">{exp.title}</h3>
            <p className="mt-2 text-ink-2">{exp.blurb}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
            <span className="chip">From: {exp.from}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3">{exp.label}</span>
          </div>
        </div>
        <Panel />
      </div>
    </div>
  );
}
