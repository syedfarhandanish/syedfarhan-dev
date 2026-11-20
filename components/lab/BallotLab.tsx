'use client';

import { useId, useMemo, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { ballotFor, sampleSchool, submitBallot, tally, type ElectionStatus, type SubmitResult } from '@/lib/evote-sim';

const schema = [
  { model: 'School', fields: ['id', 'election_status', 'positions[]', 'results_published'] },
  { model: 'Student', fields: ['id', 'schoolId →', 'grade · section', 'has_voted'] },
  { model: 'Contestant', fields: ['id', 'schoolId →', 'position', 'visibility'] },
  { model: 'Vote', fields: ['id', 'studentId →', 'contestantId →', 'position'] },
];

export default function BallotLab() {
  const [school, setSchool] = useState(sampleSchool);
  const [studentId, setStudentId] = useState('S-101');
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [busy, setBusy] = useState(false);
  const uid = useId();

  const student = school.students.find((s) => s.id === studentId)!;
  const ballot = useMemo(() => ballotFor(school, student), [school, student]);
  const results = tally(school);

  const submit = async () => {
    setBusy(true);
    const r = await submitBallot(school, { role: 'student', studentId }, choices);
    setResult(r);
    setSchool(r.school);
    if (r.status === 200) setChoices({});
    setBusy(false);
  };

  const setStatus = (s: ElectionStatus) => {
    setSchool((prev) => ({ ...prev, election_status: s }));
    setResult(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
      {/* Ballot */}
      <div className="grid content-start gap-5">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor={`${uid}-st`} className="mb-1 block text-xs text-ink-3">Logged in as</label>
            <select
              id={`${uid}-st`}
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setChoices({});
                setResult(null);
              }}
              className="field !min-h-11 text-sm"
            >
              {school.students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} · Grade {s.grade}-{s.section} {s.has_voted ? '(voted)' : ''}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="mb-1 text-xs text-ink-3">Election status (admin)</legend>
            <div className="flex overflow-hidden rounded-full border border-line-strong">
              {(['UPCOMING', 'LIVE', 'COMPLETED'] as ElectionStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={school.election_status === s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-2 font-mono text-[11px] transition-colors ${
                    school.election_status === s ? 'bg-ink text-bg' : 'text-ink-2 hover:bg-surface-2'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setSchool(sampleSchool());
              setChoices({});
              setResult(null);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset data
          </button>
        </div>

        {school.positions.map((pos) => {
          const options = ballot.filter((c) => c.position === pos);
          return (
            <fieldset key={pos} className="rounded-xl border border-line bg-bg-elev p-4">
              <legend className="px-1 text-sm font-semibold">{pos}</legend>
              <p className="mb-3 text-xs text-ink-3">
                {options.length} candidate{options.length === 1 ? '' : 's'} visible to Grade {student.grade}-{student.section}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {options.map((c) => (
                  <label
                    key={c.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                      choices[pos] === c.id ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${uid}-${pos}`}
                      value={c.id}
                      checked={choices[pos] === c.id}
                      onChange={() => setChoices((v) => ({ ...v, [pos]: c.id }))}
                      className="accent-[var(--accent)]"
                    />
                    <span>
                      {c.name}
                      <span className="block font-mono text-[10px] text-ink-3">{c.visibility.replace('_', ' ').toLowerCase()}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={submit} disabled={busy} className="btn btn-accent disabled:opacity-60">
            Submit ballot
          </button>
          <span className="text-xs text-ink-3">Try: an empty ballot, voting twice, or voting while UPCOMING.</span>
        </div>
      </div>

      {/* Server view */}
      <div className="grid content-start gap-4">
        <div className="overflow-hidden rounded-xl border border-line bg-[#11141a] text-[#e6e1d6] dark:bg-[#0a0c10]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-xs">
            <span>
              <span className="text-[#ff9b64]">POST</span> /api/student/vote
            </span>
            {result && <span className={result.status === 200 ? 'text-[#7ee2a0]' : 'text-[#ff8a8a]'}>{result.status}</span>}
          </div>
          <div className="p-4 font-mono text-[11.5px] leading-relaxed" aria-live="polite">
            {!result ? (
              <span className="opacity-60">Submit a ballot to see each server-side check run.</span>
            ) : (
              <>
                <ol className="grid gap-1">
                  {result.checks.map((c) => (
                    <li key={c.rule} className="flex items-start gap-2">
                      {c.passed ? (
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7ee2a0]" aria-label="passed" />
                      ) : (
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff8a8a]" aria-label="failed" />
                      )}
                      {c.rule}
                    </li>
                  ))}
                </ol>
                <pre className="no-scrollbar mt-3 overflow-x-auto border-t border-white/10 pt-3">{JSON.stringify(result.body, null, 2)}</pre>
              </>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-bg-elev p-4">
          <h5 className="mb-3 text-sm font-semibold">Live tally (Vote table)</h5>
          {results.map((r) => (
            <div key={r.position} className="mb-3 last:mb-0">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">{r.position}</div>
              {r.rows.map((c) => (
                <div key={c.id} className="flex items-center gap-2 text-sm">
                  <span className="w-36 truncate">{c.name}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <span className="block h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${Math.min(100, c.votes * 34)}%` }} />
                  </span>
                  <span className="w-5 text-right font-mono text-xs">{c.votes}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <details className="rounded-xl border border-line bg-bg-elev p-4 text-sm">
          <summary className="cursor-pointer font-semibold">Data model (Prisma schema)</summary>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {schema.map((m) => (
              <div key={m.model} className="rounded-lg border border-line bg-surface p-2.5">
                <div className="font-mono text-xs font-semibold text-accent">{m.model}</div>
                <ul className="mt-1 font-mono text-[10.5px] text-ink-2">
                  {m.fields.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-3">A School has many Students, Contestants and Votes; each Vote links one Student to one Contestant for one position.</p>
        </details>
      </div>
    </div>
  );
}
