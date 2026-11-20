import type { AvailabilityState, SocialLink } from './types';

/**
 * Site-wide identity and copy. Edit here; every section reads from this file.
 */
export const site = {
  name: 'Syed Farhan Danish',
  shortName: 'SFD',
  url: 'https://www.syedfarhandanish.me',
  locale: 'en_US',
  location: 'Upper Chitral, Pakistan',
  /** Shown in the hero as a survey-style coordinate readout. */
  coordinates: '36.2°N · 72.3°E',
  timezone: 'Asia/Karachi',
  email: 'cyedfarhandanish@gmail.com',

  identity: ['Software Developer', 'Student', 'Builder'],

  seo: {
    title: 'Syed Farhan Danish — Software Developer & Student',
    description:
      'Student and software developer from Upper Chitral, Pakistan. I build practical web applications — a bus-booking platform, a school e-voting system, rural energy and language tools — with Next.js, TypeScript and Supabase.',
    keywords: [
      'Syed Farhan Danish',
      'software developer',
      'Next.js developer',
      'student developer Pakistan',
      'Chitral',
      'Collabs',
      'web developer portfolio',
    ],
  },

  hero: {
    // `*word*` renders in the italic serif accent.
    headline: 'I turn local problems into *working* software.',
    intro:
      "I'm Syed Farhan Danish — a Grade 12 student and software developer from Upper Chitral, Pakistan. I design and build web apps with Next.js, TypeScript and Supabase — a bus-booking platform for the Hindukush route, an e-voting system for school elections, and tools for rural energy and the Khowar language. Most of them started as a problem I noticed around me.",
  },

  about: {
    pullQuote:
      'Where I grew up, distance decides a lot — which school you reach, what you can learn, who you can learn from. Software is how I push back on that.',
    paragraphs: [
      "I grew up in Tooq, a village in Mastuj, Upper Chitral, and study at Aga Khan Higher Secondary School in Booni. I started out teaching computer basics to younger students at the Mastuj Model Institute of Computer Learning; somewhere along the way I went from explaining software to building it.",
      'In 2025 I founded Collabs, a youth-led network that connects students across Chitral and Gilgit-Baltistan with learning resources, mentors and each other. Most of what I build either powers Collabs or comes from problems I ran into through it: running fair school elections, booking seats on mountain transport, planning solar power for off-grid villages.',
      "I care about the whole product — the problem, the interface, the data model and the deployment. I'm still learning, and I learn fastest by shipping something real, watching people use it, and fixing what breaks.",
    ],
    facts: [
      { label: 'Based in', value: 'Upper Chitral, Pakistan' },
      { label: 'Studying', value: 'HSSC, Grade 12 · AKHSS Booni' },
      { label: 'Building', value: 'Collabs ecosystem · LoadMap · Khowarify' },
      { label: 'Exploring', value: 'Backend systems, AI for low-resource languages' },
      { label: 'Speaks', value: 'Khowar, Urdu, English, some German' },
      { label: 'Away from code', value: 'Hiking, cycling, chess, 3D modelling' },
    ],
    photo: { src: '/images/profilepic.png', alt: 'Portrait of Syed Farhan Danish' },
  },

  /**
   * Availability indicator. Change `state` and `label` when your situation changes.
   * open = taking new work · limited = selective · focused = not taking work right now
   */
  availability: {
    state: 'limited' as AvailabilityState,
    label: 'Open to selected projects & collaboration',
    detail: 'Balancing Grade 12 studies — I reply within a few days.',
  },

  /** Kinds of work I can genuinely help with (shown in Contact). */
  services: [
    { title: 'Websites', detail: 'Fast, responsive sites for schools, organisations and small businesses.' },
    { title: 'Web applications', detail: 'Booking, voting, registration and dashboard apps with Next.js + a database.' },
    { title: 'UI implementation', detail: 'Turning a Figma design into an accessible, themed React interface.' },
    { title: 'Civic & education tools', detail: 'Collaborating on technology for schools and community initiatives.' },
  ],

  resume: {
    href: '/Syed_Farhan_Resume.pdf',
    fileName: 'Syed_Farhan_Danish_Resume.pdf',
    updated: 'Sep 2025',
  },

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/syedfarhandanish', handle: '@syedfarhandanish' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/syedfarhandanish', handle: 'in/syedfarhandanish' },
    { id: 'email', label: 'Email', href: 'mailto:cyedfarhandanish@gmail.com', handle: 'cyedfarhandanish@gmail.com' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/923465092108', handle: '+92 346 5092108' },
  ] satisfies SocialLink[],
} as const;

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;

export function getSocial(id: SocialLink['id']) {
  return site.socials.find((s) => s.id === id);
}
