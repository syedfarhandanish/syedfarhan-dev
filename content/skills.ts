import type { SkillGroup } from './types';

/**
 * Skills, grouped — each one linked to the projects where it was actually used.
 * No percentages: the evidence is the list of projects.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'What I write day to day.',
    items: [
      { name: 'TypeScript', usedIn: ['collabs', 'hindukush-express', 'collabs-e-vote', 'loadmap', 'collabs-mail'] },
      { name: 'JavaScript', usedIn: ['qrlab', 'collabs-drop', 'pdf-lab', 'collabs-certify'] },
      { name: 'Python', usedIn: ['akhss-eattendance', 'collabs-certify'], note: 'Flask apps and small APIs' },
      { name: 'SQL', usedIn: ['collabs-e-vote', 'hindukush-express'], note: 'Postgres via Prisma and Supabase' },
      { name: 'HTML & CSS', usedIn: ['cosmopolitan-hostel', 'qrlab'] },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces that are fast, responsive and accessible.',
    items: [
      { name: 'React', usedIn: ['collabs', 'hindukush-express', 'collabs-e-vote', 'collabs-drop', 'loadmap'] },
      { name: 'Next.js (App Router)', usedIn: ['collabs', 'hindukush-express', 'easiness', 'collabs-e-vote', 'loadmap', 'collabs-mail'] },
      { name: 'Tailwind CSS', usedIn: ['collabs', 'hindukush-express', 'collabs-e-vote', 'loadmap'] },
      { name: 'Framer Motion', usedIn: ['collabs-e-vote', 'collabs'] },
      { name: 'Progressive Web Apps', usedIn: ['qrlab', 'hindukush-express', 'collabs-drop', 'collabs-mail'] },
      { name: 'State: Zustand', usedIn: ['loadmap'] },
      { name: 'Charts: Recharts', usedIn: ['loadmap'] },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    description: 'APIs, auth and data models that enforce the rules.',
    items: [
      { name: 'Next.js Route Handlers & Server Actions', usedIn: ['collabs', 'collabs-e-vote', 'hindukush-express'] },
      { name: 'Supabase', usedIn: ['hindukush-express', 'collabs-drop', 'collabs-mail'] },
      { name: 'Prisma + PostgreSQL', usedIn: ['collabs-e-vote'] },
      { name: 'Authentication (NextAuth, bcrypt)', usedIn: ['collabs-e-vote'] },
      { name: 'Headless CMS (Sanity)', usedIn: ['collabs'] },
      { name: 'Flask', usedIn: ['akhss-eattendance'] },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & infrastructure',
    description: 'Shipping and keeping things running.',
    items: [
      { name: 'Git & GitHub', usedIn: ['collabs', 'hindukush-express', 'collabs-e-vote', 'qrlab'] },
      { name: 'Vercel', usedIn: ['collabs', 'hindukush-express', 'collabs-e-vote', 'collabs-drop'] },
      { name: 'DNS & domain email', usedIn: ['collabs-mail', 'collabs'], note: 'MX, TXT and CNAME records' },
      { name: 'PDF generation (jsPDF)', usedIn: ['hindukush-express', 'collabs-e-vote', 'loadmap'] },
      { name: 'VS Code', usedIn: [] },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Thinking about the person on the other side of the screen.',
    items: [
      { name: 'Figma', usedIn: ['xylem'] },
      { name: 'Wireframing & prototyping', usedIn: ['xylem', 'collabs'] },
      { name: 'Information architecture', usedIn: ['xylem', 'collabs'] },
      { name: 'Responsive & accessible UI', usedIn: ['cosmopolitan-hostel', 'collabs'] },
    ],
  },
  {
    id: 'exploring',
    title: 'Exploring',
    description: 'Actively learning — not claiming mastery.',
    items: [
      { name: 'LLM APIs (Gemini)', usedIn: ['collabs', 'collabs-mail'], note: 'Assistants and reply drafting' },
      { name: 'AI for low-resource languages', usedIn: ['khowarify'] },
      { name: 'Energy modelling', usedIn: ['loadmap'] },
      { name: 'Backend architecture', usedIn: [] },
    ],
  },
];
