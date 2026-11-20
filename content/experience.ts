import type { ExperienceEntry } from './types';

/** Journey timeline — newest first. Source: resume (Sep 2025) and existing portfolio. */
export const experience: ExperienceEntry[] = [
  {
    id: 'deputy-president',
    period: 'Sep 2025 — 2026',
    start: '2025-09',
    role: 'Deputy President, Student Council',
    organization: 'Aga Khan Higher Secondary School, Booni',
    kind: 'leadership',
    summary: 'Elected student leadership role, working between the student body and the school administration.',
    points: [
      'Plan and run major school events and their logistics.',
      'Drive campus initiatives on academics, technical skill-building and peer advocacy.',
      'Represent students in conversations with the administration.',
    ],
  },
  {
    id: 'it-club',
    period: 'Aug 2025 — 2026',
    start: '2025-08',
    role: 'IT Club Lead',
    organization: 'Aga Khan Higher Secondary School, Booni',
    kind: 'leadership',
    summary: 'Running the school technology club as a space for peers to explore computer science and programming.',
    points: [
      'Organise workshops and peer-led sessions on coding fundamentals and modern workflows.',
      'Source learning materials and manage club logistics.',
      'Digitised the school library’s manual circulation records.',
    ],
  },
  {
    id: 'hssc',
    period: 'Jun 2025 — Jun 2027',
    start: '2025-06',
    role: 'Higher Secondary School Certificate (HSSC)',
    organization: 'Aga Khan Higher Secondary School, Booni',
    kind: 'education',
    summary: 'Currently studying for my HSSC, alongside building software.',
    points: [],
  },
  {
    id: 'collabs-founder',
    period: 'Mar 2025 — now',
    start: '2025-03',
    role: 'Founder & Developer',
    organization: 'Collabs, Chitral',
    kind: 'building',
    summary: 'Started a youth-led learning and civic-technology network and built its digital platform and tools.',
    points: [
      'Led the project from UI/UX wireframes through development to deployment.',
      'Run feedback loops with students to decide what to build and fix next.',
      'Co-organised SAF 2026, an inter-district Science, Art & Food Exhibition in Booni (31 Oct 2026).',
    ],
    link: { label: 'collabs.eu.org', href: 'https://collabs.eu.org' },
  },
  {
    id: 'mera-sawera',
    period: '2025 — now',
    start: '2025-04',
    role: 'Youth Ambassador',
    organization: 'Mera Sawera',
    kind: 'leadership',
    summary: 'Representing the organisation in community outreach for young people in remote regions.',
    points: ['Support community-focused initiatives and educational outreach programmes.'],
  },
  {
    id: 'xylem',
    period: '2025',
    start: '2025-05',
    role: 'UI Designer, Xylem Innovation Challenge',
    organization: 'Team of five',
    kind: 'building',
    summary: 'Designed the interface for a water-usage governance app as part of a five-person team.',
    points: ['Restructured the information architecture around progressive disclosure.'],
    link: { label: 'Case study', href: '/projects/xylem' },
  },
  {
    id: 'acem',
    period: 'Aug 2024 — Jan 2026',
    start: '2024-08',
    role: 'Freelancing & Professional Development Trainee',
    organization: 'American Academy of Continuing Education & Mentorship (ACEM), Chitral',
    kind: 'training',
    summary: 'Year-long programme on freelancing fundamentals and digital entrepreneurship.',
    points: [
      'Practised client communication and time management through hands-on project delivery.',
      'Curriculum accredited by the Texas Education Agency (TEA).',
    ],
  },
  {
    id: 'ssc',
    period: 'Jun 2023 — Jun 2025',
    start: '2023-06',
    role: 'Secondary School Certificate (SSC)',
    organization: 'Aga Khan Higher Secondary School, Seenlasht',
    kind: 'education',
    summary: 'Secondary education. Won 1st position at a district-level science exhibition.',
    points: [],
  },
  {
    id: 'class-rep',
    period: 'Sep 2022 — Sep 2023',
    start: '2022-09',
    role: 'Classroom Representative',
    organization: 'Aga Khan Higher Secondary School, Seenlasht',
    kind: 'leadership',
    summary: 'Elected by classmates as student–faculty liaison.',
    points: ['Set up classroom-level academic support.', 'Coordinated student participation in community service projects.'],
  },
  {
    id: 'mmicl',
    period: 'Jan 2021 — Jul 2024',
    start: '2021-01',
    role: 'Computer Learning Facilitator',
    organization: 'Mastuj Model Institute of Computer Learning',
    kind: 'teaching',
    summary: 'Where it started: teaching younger students computer basics and introductory programming logic.',
    points: [
      'Designed and ran hands-on workshops on computer use and programming basics.',
      'Managed lab resources and gave technical support.',
    ],
  },
];

export const achievements = [
  { title: '1st Position — District-Level Science Exhibition', context: 'Secondary school' },
  { title: 'Founded Collabs', context: 'Youth-led learning & civic-tech network, 2025' },
  { title: 'UI Designer — Xylem Innovation Challenge 2025', context: 'Five-person team' },
];

export const certifications = ['Effective Leadership', 'IT for Business Success', 'Professional Certification in Freelancing', 'Inventory Management'];

export const kindLabels: Record<ExperienceEntry['kind'], string> = {
  education: 'Education',
  leadership: 'Leadership',
  building: 'Building',
  teaching: 'Teaching',
  training: 'Training',
};

export const languages = 'Khowar & Urdu (native) · English (proficient) · German (beginner)';
