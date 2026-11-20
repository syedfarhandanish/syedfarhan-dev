import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import type { Project } from '@/content/types';
import { GithubIcon } from '@/components/ui/BrandIcons';

/** Only renders actions that have real destinations. */
export default function ProjectLinks({ project, showCaseStudy = true }: { project: Project; showCaseStudy?: boolean }) {
  const live = project.links.find((l) => l.kind === 'live');
  const source = project.links.find((l) => l.kind === 'source');
  if (!live && !source && !(showCaseStudy && project.caseStudy)) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {showCaseStudy && project.caseStudy && (
        <Link href={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
          <BookOpen className="h-4 w-4" aria-hidden /> Case study
          <span className="sr-only">: {project.title}</span>
        </Link>
      )}
      {live && (
        <a href={live.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          Visit live <ArrowUpRight className="h-4 w-4" aria-hidden />
          <span className="sr-only">: {live.label} (opens in new tab)</span>
        </a>
      )}
      {source && (
        <a href={source.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          <GithubIcon /> Source
          <span className="sr-only"> code for {project.title} (opens in new tab)</span>
        </a>
      )}
    </div>
  );
}
