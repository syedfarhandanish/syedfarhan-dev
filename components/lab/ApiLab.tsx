'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { categoryLabels, statusLabels, usedCategories } from '@/content/projects';

interface ApiResult {
  status: number;
  ms: number;
  url: string;
  body: unknown;
}

type Item = { slug: string; title: string; tagline: string; status: string; stack: string[] };

export default function ApiLab() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [limit, setLimit] = useState('5');
  const [res, setRes] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [netError, setNetError] = useState('');
  const ctrl = useRef<AbortController | null>(null);
  const uid = useId();

  useEffect(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (category) params.set('category', category);
    if (status) params.set('status', status);
    if (limit) params.set('limit', limit);
    const url = `/api/projects${params.size ? `?${params}` : ''}`;

    const t = setTimeout(async () => {
      ctrl.current?.abort();
      const c = new AbortController();
      ctrl.current = c;
      setLoading(true);
      setNetError('');
      const t0 = performance.now();
      try {
        const r = await fetch(url, { signal: c.signal, cache: 'no-store' });
        const body = await r.json();
        setRes({ status: r.status, ms: Math.round(performance.now() - t0), url, body });
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setNetError('Network request failed — are you offline?');
      } finally {
        if (ctrl.current === c) setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q, category, status, limit]);

  const items: Item[] = (res?.body as { data?: Item[] })?.data ?? [];
  const ok = res && res.status < 400;

  return (
    <div className="grid gap-6 [&>*]:min-w-0">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor={`${uid}-q`} className="mb-1 block text-xs text-ink-3">Search (q)</label>
          <input id={`${uid}-q`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. supabase, pwa, vote" className="field !min-h-11 text-sm" />
        </div>
        <div>
          <label htmlFor={`${uid}-c`} className="mb-1 block text-xs text-ink-3">category</label>
          <select id={`${uid}-c`} value={category} onChange={(e) => setCategory(e.target.value)} className="field !min-h-11 text-sm">
            <option value="">any</option>
            {usedCategories().map((c) => (
              <option key={c} value={c}>{categoryLabels[c]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-s`} className="mb-1 block text-xs text-ink-3">status</label>
          <select id={`${uid}-s`} value={status} onChange={(e) => setStatus(e.target.value)} className="field !min-h-11 text-sm">
            <option value="">any</option>
            {Object.entries(statusLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-l`} className="mb-1 block text-xs text-ink-3">limit (try 0 or 99)</label>
          <input id={`${uid}-l`} value={limit} onChange={(e) => setLimit(e.target.value)} inputMode="numeric" className="field !min-h-11 font-mono text-sm" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Raw HTTP exchange */}
        <div className="overflow-hidden rounded-xl border border-line bg-[#11141a] text-[#e6e1d6] dark:bg-[#0a0c10]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 font-mono text-xs">
            <span className="truncate">
              <span className="text-[#ff9b64]">GET</span> {res?.url ?? '/api/projects'}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin opacity-70" aria-hidden />}
              {res && (
                <>
                  <span className={ok ? 'text-[#7ee2a0]' : 'text-[#ff8a8a]'}>{res.status}</span>
                  <span className="opacity-60">{res.ms} ms</span>
                </>
              )}
            </span>
          </div>
          <pre className="no-scrollbar max-h-80 overflow-auto p-4 font-mono text-[11.5px] leading-relaxed" aria-label="JSON response" tabIndex={0}>
            {netError ? netError : res ? JSON.stringify(res.body, null, 2) : 'Sending request…'}
          </pre>
        </div>

        {/* Rendered result */}
        <div aria-live="polite">
          <p className="mb-3 text-sm text-ink-3">
            {ok ? (
              <>
                Rendered from the response: <strong className="text-ink">{(res!.body as { total: number }).total}</strong> match
                {(res!.body as { total: number }).total === 1 ? '' : 'es'}
              </>
            ) : res ? (
              <span className="text-danger">The API rejected the query — see the error on the left.</span>
            ) : (
              'Waiting for the first response…'
            )}
          </p>
          <ul className="grid gap-2">
            {items.map((p) => (
              <li key={p.slug} className="rounded-xl border border-line bg-surface px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{p.title}</span>
                  <span className="font-mono text-[10px] uppercase text-ink-3">{p.status}</span>
                </div>
                <p className="text-sm text-ink-2">{p.tagline}</p>
              </li>
            ))}
            {ok && items.length === 0 && <li className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-ink-3">No projects match. Try another keyword.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
