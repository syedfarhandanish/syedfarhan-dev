'use client';

import { useState } from 'react';

/** How an idea becomes a product — told through one real project (Hindukush Express). */
const steps = [
  {
    name: 'Notice',
    title: 'Find a real problem',
    body: 'Seats on Chitral transport were booked by phone and paper registers — double bookings happened and passengers had no record.',
    artifact: 'A list of what goes wrong today, from people who use it.',
  },
  {
    name: 'Model',
    title: 'Design the data first',
    body: 'Routes, vehicle configurations (19-seat coaster, 33-seat bus) and bookings — the rules live in the data model, not just the UI.',
    artifact: 'Types + database tables before any screen.',
  },
  {
    name: 'Sketch',
    title: 'Wireframe the flows',
    body: 'Two very different users: passengers on a phone (a 3-step wizard) and operators at a desk (a dense manifest view).',
    artifact: 'Booking wizard: route & date → seat → checkout.',
  },
  {
    name: 'Build',
    title: 'Ship the smallest useful version',
    body: 'Next.js + Supabase, a seat map, a booking API with server-side checks, and printable PDF tickets with QR codes.',
    artifact: 'A deployed app, live on Vercel.',
  },
  {
    name: 'Harden',
    title: 'Plan for real conditions',
    body: 'Mobile signal is patchy along mountain routes, so it became an installable PWA with an offline page and a network indicator.',
    artifact: 'Offline fallback, network status, installable app.',
  },
  {
    name: 'Iterate',
    title: 'Close the loop',
    body: 'Operators still take walk-ins, so offline bookings joined the same manifest. Next on the list: enforcing fares on the server.',
    artifact: 'An honest backlog, not a finished-forever product.',
  },
];

export default function Process() {
  const [i, setI] = useState(0);
  const s = steps[i];
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-display text-2xl font-semibold sm:text-3xl">From idea to working product</h3>
        <p className="text-sm text-ink-3">Example: Hindukush Express</p>
      </div>
      <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {steps.map((st, n) => (
          <li key={st.name}>
            <button
              type="button"
              aria-pressed={n === i}
              onClick={() => setI(n)}
              className={`group w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                n === i ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong'
              }`}
            >
              <span className="font-mono text-[10px] text-ink-3">0{n + 1}</span>
              <span className="mt-1 block text-sm font-semibold">{st.name}</span>
              <span aria-hidden className="mt-2 block h-0.5 w-full overflow-hidden rounded bg-line">
                <span className={`block h-full bg-accent transition-[width] duration-500 ${n <= i ? 'w-full' : 'w-0'}`} />
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div aria-live="polite" className="mt-4 grid gap-4 rounded-2xl border border-line bg-bg-elev p-6 md:grid-cols-[1fr_0.8fr]">
        <div>
          <h4 className="font-display text-xl font-semibold">{s.title}</h4>
          <p className="mt-2 text-ink-2">{s.body}</p>
        </div>
        <div className="rounded-xl border border-dashed border-line-strong p-4">
          <div className="eyebrow">Output of this step</div>
          <p className="mt-2 text-sm">{s.artifact}</p>
        </div>
      </div>
    </div>
  );
}
