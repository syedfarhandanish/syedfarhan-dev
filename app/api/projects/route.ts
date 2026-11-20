import { NextResponse, type NextRequest } from 'next/server';
import { categoryLabels, projects } from '@/content/projects';
import type { ProjectCategory, ProjectStatus } from '@/content/types';

/**
 * GET /api/projects?q=&category=&status=&limit=
 * A small, real JSON API over the portfolio's project data.
 * Used by the Lab's "API explorer" — and anyone else who wants it.
 */
export async function GET(req: NextRequest) {
  const started = performance.now();
  const sp = req.nextUrl.searchParams;
  const q = (sp.get('q') ?? '').trim().toLowerCase().slice(0, 60);
  const category = sp.get('category');
  const status = sp.get('status');
  const limitRaw = Number(sp.get('limit') ?? 20);

  const errors: string[] = [];
  if (category && !(category in categoryLabels)) errors.push(`Unknown category "${category}".`);
  const statuses: ProjectStatus[] = ['live', 'in-development', 'prototype', 'case-study', 'archived'];
  if (status && !statuses.includes(status as ProjectStatus)) errors.push(`Unknown status "${status}".`);
  if (!Number.isInteger(limitRaw) || limitRaw < 1 || limitRaw > 50) errors.push('limit must be an integer from 1 to 50.');

  if (errors.length) {
    return NextResponse.json(
      { error: 'Invalid query', details: errors, allowed: { category: Object.keys(categoryLabels), status: statuses } },
      { status: 400 },
    );
  }

  let results = projects;
  if (category) results = results.filter((p) => p.categories.includes(category as ProjectCategory));
  if (status) results = results.filter((p) => p.status === status);
  if (q) {
    results = results.filter((p) =>
      [p.title, p.tagline, p.summary, ...p.stack, ...p.features].join(' ').toLowerCase().includes(q),
    );
  }

  const data = results.slice(0, limitRaw).map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    status: p.status,
    year: p.year,
    categories: p.categories,
    stack: p.stack,
    url: p.links.find((l) => l.kind === 'live')?.href ?? null,
    caseStudy: p.caseStudy ? `/projects/${p.slug}` : null,
  }));

  return NextResponse.json(
    {
      query: { q: q || null, category: category ?? null, status: status ?? null, limit: limitRaw },
      total: results.length,
      returned: data.length,
      data,
      meta: { serverMs: Number((performance.now() - started).toFixed(2)) },
    },
    { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' } },
  );
}
