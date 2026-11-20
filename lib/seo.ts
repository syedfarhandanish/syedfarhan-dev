import { site } from '@/content/site';
import type { Project } from '@/content/types';

/**
 * Structured data (schema.org JSON-LD).
 * A ProfilePage whose main entity is a Person is what Google recommends for
 * personal profile sites, and is what helps it connect searches for the name
 * with this site, GitHub, LinkedIn and Collabs.
 */

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export const profileUrls = site.socials.filter((s) => s.href.startsWith('http') && s.id !== 'whatsapp').map((s) => s.href);

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.name,
        alternateName: [site.shortName, `${site.name} Portfolio`],
        description: site.seo.description,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: site.url,
        name: site.seo.title,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        dateModified: new Date().toISOString(),
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        jobTitle: 'Software Developer',
        description: site.seo.description,
        email: `mailto:${site.email}`,
        homeLocation: { '@type': 'Place', name: site.location },
        address: { '@type': 'PostalAddress', addressRegion: 'Upper Chitral', addressCountry: 'PK' },
        affiliation: { '@type': 'EducationalOrganization', name: 'Aga Khan Higher Secondary School, Booni' },
        alumniOf: { '@type': 'EducationalOrganization', name: 'Aga Khan Higher Secondary School, Seenlasht' },
        knowsLanguage: ['en', 'ur', 'khw'],
        knowsAbout: ['Software development', 'Web development', 'Next.js', 'TypeScript', 'React', 'Supabase', 'UI/UX design', 'Civic technology'],
        sameAs: profileUrls,
      },
      {
        '@type': 'Organization',
        name: 'Collabs',
        url: 'https://collabs.eu.org',
        founder: { '@id': personId },
      },
    ],
  };
}

export function projectJsonLd(p: Project) {
  const url = `${site.url}/projects/${p.slug}`;
  const live = p.links.find((l) => l.kind === 'live')?.href;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${site.url}/#work` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
      {
        '@type': live ? 'SoftwareApplication' : 'CreativeWork',
        name: p.title,
        description: p.summary,
        url: live ?? url,
        ...(live ? { applicationCategory: 'WebApplication', operatingSystem: 'Web' } : {}),
        author: { '@type': 'Person', '@id': personId, name: site.name, url: site.url },
        keywords: p.stack.join(', '),
        image: `${url}/opengraph-image`,
        mainEntityOfPage: url,
      },
    ],
  };
}

export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
