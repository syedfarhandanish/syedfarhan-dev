import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { site } from '@/content/site';
import SectionHeader from '@/components/ui/SectionHeader';
import Availability from '@/components/ui/Availability';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import ContactForm from './ContactForm';

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: ({ className }: { className?: string }) => <Mail className={className} aria-hidden />,
  whatsapp: ({ className }: { className?: string }) => <MessageCircle className={className} aria-hidden />,
};

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell">
        <SectionHeader
          index="06"
          kicker="Contact"
          id="contact-title"
          title="Have a problem worth *solving*?"
          intro="Whether it's a website, a web app, or a civic or education idea you want to build together — tell me about it."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div className="grid content-start gap-8" data-reveal>
            <Availability detail />

            <div>
              <h3 className="eyebrow mb-3">I can help with</h3>
              <ul className="grid gap-3">
                {site.services.map((s) => (
                  <li key={s.title} className="rounded-xl border border-line bg-bg-elev px-4 py-3">
                    <span className="font-medium">{s.title}</span>
                    <span className="block text-sm text-ink-2">{s.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow mb-3">Or reach me directly</h3>
              <ul className="grid gap-2">
                {site.socials.map((s) => {
                  const Icon = icons[s.id];
                  const external = s.href.startsWith('http');
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-3 rounded-xl px-1 py-1.5"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-2 transition-colors group-hover:border-accent group-hover:text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm">
                          <span className="block text-ink-3">{s.label}</span>
                          <span className="link-underline text-ink">{s.handle}</span>
                        </span>
                        {external && <ArrowUpRight className="ml-auto h-4 w-4 text-ink-3" aria-hidden />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
