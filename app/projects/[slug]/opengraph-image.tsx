import { notFound } from 'next/navigation';
import { getProject, projects, statusLabels } from '@/content/projects';
import { ogSize, projectOgImage } from '@/lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Case study preview';

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return projectOgImage({ title: p.title, tagline: p.tagline, status: statusLabels[p.status], stack: p.stack, accent: p.accent, year: p.year });
}
