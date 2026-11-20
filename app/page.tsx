import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Work from '@/components/home/Work';
import Lab from '@/components/home/Lab';
import Process from '@/components/home/Process';
import Skills from '@/components/home/Skills';
import Journey from '@/components/home/Journey';
import Contact from '@/components/home/Contact';
import SectionHeader from '@/components/ui/SectionHeader';
import { projects } from '@/content/projects';

export default function Home() {
  const live = projects.filter((p) => p.status === 'live').length;
  return (
    <>
      <Hero />
      <div className="contour-divider" aria-hidden />
      <About />

      <section id="work" aria-labelledby="work-title" className="section bg-bg-elev">
        <div className="shell">
          <SectionHeader
            index="02"
            kicker="Selected work"
            id="work-title"
            title="Products built for *real* people."
            intro="Each project below exists, with an honest status. Some are live and used, some are still being built."
            aside={
              <p className="font-mono text-xs text-ink-3">
                {projects.length} projects · {live} live
              </p>
            }
          />
          <Work />
        </div>
      </section>

      <section id="lab" aria-labelledby="lab-title" className="section">
        <div className="shell">
          <SectionHeader
            index="03"
            kicker="Capabilities lab"
            id="lab-title"
            title="Don't take my word for it — *try* it."
            intro="Small, working experiments taken from my projects. Everything here actually runs; local demos and sample data are labelled."
          />
          <Lab />
          <Process />
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-title" className="section bg-bg-elev">
        <div className="shell">
          <SectionHeader
            index="04"
            kicker="Skills & stack"
            id="skills-title"
            title="Tools I've *actually* shipped with."
            intro="Pick a skill to see the projects where I used it."
          />
          <Skills />
        </div>
      </section>

      <section id="journey" aria-labelledby="journey-title" className="section">
        <div className="shell">
          <SectionHeader
            index="05"
            kicker="Journey"
            id="journey-title"
            title="From teaching computers to *building* with them."
          />
          <Journey />
        </div>
      </section>

      <div className="contour-divider" aria-hidden />
      <Contact />
    </>
  );
}
