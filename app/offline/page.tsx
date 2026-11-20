import type { Metadata } from 'next';
import Link from 'next/link';
import BrandMark from '@/components/ui/BrandMark';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Offline',
  robots: { index: false, follow: false },
};

/** Served by the service worker when a page isn't cached and there's no connection. */
export default function Offline() {
  return (
    <section className="shell grid min-h-[80svh] place-items-center pt-28 text-center">
      <div>
        <BrandMark className="mx-auto h-16 w-16 text-ink" />
        <p className="eyebrow mt-8">No connection</p>
        <h1 className="font-display mt-4 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none">
          You&apos;re <span className="serif-accent">offline</span> — like a lot of the valley.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ink-2">
          Pages you&apos;ve already opened still work. Reconnect to load the rest, or reach me later at {site.email}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Try the home page</Link>
        </div>
      </div>
    </section>
  );
}
