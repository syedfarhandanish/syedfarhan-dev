'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { site } from '@/content/site';
import { projects, statusLabels } from '@/content/projects';
import { skillGroups } from '@/content/skills';
import { experience } from '@/content/experience';
import { useTheme } from '@/components/layout/ThemeProvider';

type Line = { kind: 'in' | 'out' | 'err'; text: string };

const HELP = [
  'Commands (this is a portfolio shell, not a real OS):',
  '  about              who I am',
  '  projects           list projects',
  '  project <slug>     details for one project',
  '  open <slug>        open a case study',
  '  skills             grouped skills + where they were used',
  '  journey            timeline',
  '  contact            how to reach me',
  '  theme              toggle light / dark',
  '  clear              clear the screen',
  'Tip: Tab completes, ↑/↓ walk history.',
];

const COMMANDS = ['help', 'about', 'projects', 'project', 'open', 'skills', 'journey', 'contact', 'theme', 'clear', 'whoami'];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: 'out', text: "Welcome. Type 'help' to see what I know about." }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toggle } = useTheme();
  const uid = useId();

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ').toLowerCase();
    const out: Line[] = [{ kind: 'in', text: cmd }];
    const say = (...t: string[]) => t.forEach((text) => out.push({ kind: 'out', text }));
    const err = (text: string) => out.push({ kind: 'err', text });

    switch ((name ?? '').toLowerCase()) {
      case '':
        break;
      case 'help':
        say(...HELP);
        break;
      case 'whoami':
      case 'about':
        say(`${site.name} — ${site.identity.join(' · ')}`, site.location, '', site.about.paragraphs[0]);
        break;
      case 'projects':
        projects.forEach((p) => say(`  ${p.slug.padEnd(22)} ${statusLabels[p.status].padEnd(15)} ${p.tagline}`));
        say('', "Run 'project <slug>' for details.");
        break;
      case 'project':
      case 'open': {
        const p = projects.find((x) => x.slug === arg || x.title.toLowerCase() === arg);
        if (!arg) err(`usage: ${name} <slug>`);
        else if (!p) err(`no project '${arg}'. Try 'projects'.`);
        else if (name === 'open') {
          if (p.caseStudy) {
            say(`Opening /projects/${p.slug} …`);
            setTimeout(() => router.push(`/projects/${p.slug}`), 300);
          } else err(`${p.title} has no case study page yet. Try 'project ${p.slug}'.`);
        } else {
          say(
            `${p.title} (${p.year}) — ${statusLabels[p.status]}`,
            p.summary,
            `role:  ${p.role}`,
            `stack: ${p.stack.join(', ') || '—'}`,
            ...p.links.map((l) => `link:  ${l.href}`),
            ...(p.note ? [`note:  ${p.note}`] : []),
          );
        }
        break;
      }
      case 'skills':
        skillGroups.forEach((g) => say(`${g.title}: ${g.items.map((i) => i.name).join(', ')}`));
        break;
      case 'journey':
        experience.forEach((e) => say(`  ${e.period.padEnd(20)} ${e.role} — ${e.organization}`));
        break;
      case 'contact':
        site.socials.forEach((s) => say(`  ${s.label.padEnd(10)} ${s.href.replace('mailto:', '')}`));
        say('', `Or use the form in the Contact section. ${site.availability.label}.`);
        break;
      case 'theme':
        toggle();
        say('Theme toggled.');
        break;
      case 'clear':
        setLines([]);
        return;
      case 'sudo':
        err('Nice try. This shell has no root — just a portfolio.');
        break;
      default:
        err(`command not found: ${name}. Type 'help'.`);
    }
    setLines((l) => [...l, ...out].slice(-200));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h].slice(0, 50));
      setInput('');
      setHIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(history.length - 1, hIndex + 1);
      if (history[i] !== undefined) {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(-1, i));
      setInput(i >= 0 ? history[i] : '');
    } else if (e.key === 'Tab') {
      const parts = input.split(' ');
      const pool = parts.length > 1 ? projects.map((p) => p.slug) : COMMANDS;
      const last = parts[parts.length - 1];
      const match = pool.filter((c) => c.startsWith(last));
      if (input && match.length === 1) {
        e.preventDefault();
        parts[parts.length - 1] = match[0];
        setInput(parts.join(' ') + (parts.length === 1 ? ' ' : ''));
      } else if (input && match.length > 1) {
        e.preventDefault();
        setLines((l) => [...l, { kind: 'out', text: match.join('  ') }]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-[#11141a] font-mono text-[12.5px] text-[#e6e1d6] dark:bg-[#0a0c10]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs text-white/50">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto">sfd@portfolio — interactive shell</span>
      </div>
      <div ref={scroller} className="no-scrollbar h-80 overflow-y-auto p-4" role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${l.kind === 'err' ? 'text-[#ff8a8a]' : l.kind === 'in' ? 'text-white' : 'text-[#cfc9bc]'}`}>
            {l.kind === 'in' && <span className="text-[#ff9b64]">~ $ </span>}
            {l.text}
          </div>
        ))}
        <div className="flex items-center">
          <label htmlFor={uid} className="text-[#ff9b64]">
            ~ ${' '}
            <span className="sr-only">Terminal command</span>
          </label>
          <input
            id={uid}
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="ml-2 flex-1 bg-transparent text-white caret-[#ff9b64] outline-none"
            placeholder="type help"
          />
        </div>
      </div>
    </div>
  );
}
