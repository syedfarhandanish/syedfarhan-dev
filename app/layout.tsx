import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { site } from '@/content/site';
import { ThemeProvider, themeInitScript } from '@/components/layout/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/layout/CommandPalette';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';
import Cursor from '@/components/layout/Cursor';
import RevealObserver from '@/components/ui/RevealObserver';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s — ${site.name}` },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: site.locale,
    images: [{ url: '/images/og-thumbnail.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: ['/images/og-thumbnail.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f0e8' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1015' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Software Developer',
  description: site.seo.description,
  image: `${site.url}${site.about.photo.src}`,
  address: { '@type': 'PostalAddress', addressRegion: 'Upper Chitral', addressCountry: 'PK' },
  sameAs: site.socials.filter((s) => s.href.startsWith('http') && s.id !== 'whatsapp').map((s) => s.href),
  founder: { '@type': 'Organization', name: 'Collabs', url: 'https://collabs.eu.org' },
  knowsAbout: ['Web development', 'Next.js', 'TypeScript', 'React', 'UI/UX design', 'Civic technology'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CommandPalette />
          <BackToTop />
          <Cursor />
          <RevealObserver />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
