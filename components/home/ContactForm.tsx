'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { projectTypes, validateContact, type ContactErrors, type ContactInput } from '@/lib/contact';
import { site } from '@/content/site';

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

const empty: ContactInput = { name: '', email: '', subject: '', projectType: '', message: '' };

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [state, setState] = useState<State>({ kind: 'idle' });
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (k: keyof ContactInput, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validateContact(next).errors);
  };
  const blur = (k: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateContact(values).errors);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { errors: errs } = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, projectType: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState({ kind: 'sending' });
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? '', startedAt: startedAt.current }),
      });
      const json = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: ContactErrors };
      if (r.ok && json.ok) {
        setState({ kind: 'sent' });
        setValues(empty);
        setTouched({});
      } else {
        if (json.fields) setErrors(json.fields);
        setState({ kind: 'error', message: json.error ?? `Something went wrong (HTTP ${r.status}).` });
      }
    } catch {
      setState({ kind: 'error', message: 'Network error — check your connection and try again.' });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const field = (k: keyof ContactInput) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k],
    onBlur: () => blur(k),
    'aria-invalid': touched[k] && errors[k] ? true : undefined,
    'aria-describedby': touched[k] && errors[k] ? `${uid}-${k}-err` : undefined,
  });
  const err = (k: keyof ContactInput) =>
    touched[k] && errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden /> {errors[k]}
      </p>
    ) : null;

  if (state.kind === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card grid place-items-center p-10 text-center outline-none">
        <CheckCircle2 className="h-12 w-12 text-ok" aria-hidden />
        <h3 className="font-display mt-4 text-2xl font-semibold">Message sent — thank you!</h3>
        <p className="mt-2 max-w-sm text-ink-2">It reached my inbox. I usually reply within a few days.</p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setState({ kind: 'idle' })}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card grid gap-5 p-5 sm:p-8" aria-describedby={`${uid}-note`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-medium">Name</label>
          <input {...field('name')} onChange={(e) => update('name', e.target.value)} autoComplete="name" required className="field" />
          {err('name')}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium">Email</label>
          <input {...field('email')} onChange={(e) => update('email', e.target.value)} type="email" autoComplete="email" inputMode="email" required className="field" />
          {err('email')}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <label htmlFor={`${uid}-subject`} className="mb-1.5 block text-sm font-medium">Subject</label>
          <input {...field('subject')} onChange={(e) => update('subject', e.target.value)} required className="field" />
          {err('subject')}
        </div>
        <div>
          <label htmlFor={`${uid}-projectType`} className="mb-1.5 block text-sm font-medium">
            Type <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <select {...field('projectType')} onChange={(e) => update('projectType', e.target.value)} className="field">
            <option value="">Choose…</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {err('projectType')}
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea {...field('message')} onChange={(e) => update('message', e.target.value)} rows={6} required className="field resize-y" />
        <div className="mt-1 flex justify-between gap-3">
          {err('message')}
          <span className="ml-auto font-mono text-xs text-ink-3">{values.message.length}/4000</span>
        </div>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input ref={honeypot} id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={statusRef} tabIndex={-1} role="alert" className="outline-none">
        {state.kind === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
            <span>
              {state.message}{' '}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${uid}-note`} className="text-xs text-ink-3">
          Sent securely through my server. Your details are only used to reply to you.
        </p>
        <button type="submit" disabled={state.kind === 'sending'} className="btn btn-accent disabled:cursor-wait disabled:opacity-70">
          {state.kind === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
