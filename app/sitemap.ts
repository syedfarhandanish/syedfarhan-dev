import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${site.url}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ];
}
