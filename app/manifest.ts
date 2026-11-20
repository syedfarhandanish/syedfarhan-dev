import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: `${site.name} — Portfolio`,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0d1015',
    theme_color: '#0d1015',
    lang: 'en',
    categories: ['portfolio', 'education', 'developer'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Selected work', short_name: 'Work', url: '/#work', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Capabilities lab', short_name: 'Lab', url: '/#lab', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Contact', short_name: 'Contact', url: '/#contact', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  };
}
