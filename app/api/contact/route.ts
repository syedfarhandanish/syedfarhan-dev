import { NextResponse, type NextRequest } from 'next/server';
import { validateContact } from '@/lib/contact';

/**
 * POST /api/contact
 * Server-side validation + spam protection, then delivery through a provider.
 * Provider keys live only in server environment variables:
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL) → Resend
 *   otherwise FORMSPREE_FORM_ID → Formspree (defaults to the form used by the previous site)
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // Timing trap: forms submitted faster than a human can type are rejected.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, error: 'That was very fast — please try again.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages in a short time. Please try again later or email me directly.' },
      { status: 429 },
    );
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: 'Please fix the highlighted fields.', fields: errors }, { status: 422 });
  }

  try {
    const delivered = await deliver(data);
    if (!delivered) {
      return NextResponse.json(
        { ok: false, error: 'The message service is not configured. Please email me directly.' },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] delivery failed', e);
    return NextResponse.json(
      { ok: false, error: 'Your message could not be delivered right now. Please try again or email me directly.' },
      { status: 502 },
    );
  }
}

async function deliver(d: ReturnType<typeof validateContact>['data']) {
  const text = `From: ${d.name} <${d.email}>\nType: ${d.projectType || '—'}\n\n${d.message}`;

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: d.email,
        subject: `[Portfolio] ${d.subject}`,
        text,
      }),
    });
    if (!r.ok) throw new Error(`Resend responded ${r.status}`);
    return true;
  }

  const formId = process.env.FORMSPREE_FORM_ID ?? 'mojbrvaj';
  if (!formId) return false;
  const r = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: d.name,
      email: d.email,
      _replyto: d.email,
      _subject: `[Portfolio] ${d.subject}`,
      projectType: d.projectType,
      message: d.message,
    }),
  });
  if (!r.ok) throw new Error(`Formspree responded ${r.status}`);
  return true;
}
