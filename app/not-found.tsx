import Link from 'next/link';
import BrandMark from '@/components/ui/BrandMark';

export default function NotFound() {
  return (
    <section className="shell grid min-h-[80svh] place-items-center pt-28 text-center">
      <div>
        <BrandMark className="mx-auto h-16 w-16 text-ink" />
        <p className="eyebrow mt-8">Error 404 · Off the map</p>
        <h1 className="font-display mt-4 text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-none">
          This trail <span className="serif-accent">doesn&apos;t</span> exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ink-2">The page may have moved, or the link was mistyped. Here are some ways back.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back home</Link>
          <Link href="/#work" className="btn btn-ghost">See my work</Link>
        </div>
        <p className="mt-8 text-sm text-ink-3">
          Tip: press <span className="kbd">Ctrl</span> <span className="kbd">K</span> to jump anywhere.
        </p>
      </div>
    </section>
  );
}
