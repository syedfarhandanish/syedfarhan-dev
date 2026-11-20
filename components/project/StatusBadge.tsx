import type { ProjectStatus } from '@/content/types';
import { statusLabels } from '@/content/projects';

const styles: Record<ProjectStatus, string> = {
  live: 'text-ok',
  'in-development': 'text-warn',
  prototype: 'text-glacier',
  'case-study': 'text-glacier',
  archived: 'text-ink-3',
};

export default function StatusBadge({ status, className = '' }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={`chip ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${styles[status]}`} aria-hidden />
      <span className="sr-only">Status: </span>
      {statusLabels[status]}
    </span>
  );
}
