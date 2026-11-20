import type { Project, ProjectCategory, ProjectStatus } from './types';

/**
 * All portfolio projects. Order matters: it is the order shown on the site.
 * To add a project, copy an entry, change the slug, and fill in the fields.
 * A `caseStudy` block gives the project its own page at /projects/<slug>.
 */
export const projects: Project[] = [
  {
    slug: 'collabs',
    title: 'Collabs',
    tagline: 'A youth-led learning and civic-tech network — and the platform that runs it.',
    summary:
      'Collabs connects students across Chitral and Gilgit-Baltistan with learning resources, mentors and each other. I founded it in 2025 and built its main site: a CMS-driven Next.js platform with an embedded admin studio and an AI assistant.',
    year: '2025 — now',
    role: 'Founder & lead developer',
    status: 'live',
    categories: ['civic-tech', 'full-stack', 'ai'],
    presentation: 'flagship',
    accent: '#0F766E',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Sanity CMS', 'Gemini API', 'Vercel'],
    features: [
      'Content managed by the team through an embedded Sanity Studio — no code needed',
      'Programs, projects, events, chapters and impact pages driven from the CMS',
      'AI assistant (Gemini) that answers questions about Collabs',
      'Server actions for forms with validation and spam protection',
      'Webhook-based revalidation, so published content appears instantly',
    ],
    contribution:
      'Started the initiative, defined its programs, and designed and built the website and most of the tools in its ecosystem. I also coordinate the student team that runs events like SAF 2026.',
    links: [{ label: 'collabs.eu.org', href: 'https://collabs.eu.org', kind: 'live' }],
    media: { src: '/projects/collabs-mark.png', alt: 'Collabs logo mark', fit: 'logo', width: 512, height: 512 },
    gallery: [
      {
        src: '/projects/saf-2026-poster.webp',
        alt: 'Poster for SAF 2026, the Science, Art & Food Exhibition organised by Collabs in Booni',
        fit: 'cover',
        width: 1080,
        height: 1350,
      },
    ],
    caseStudy: {
      problem:
        'Students in remote valleys of Chitral and Gilgit-Baltistan are often talented but disconnected — from learning resources, from mentors, and from students in the next valley. Information about opportunities travels by word of mouth, if at all.',
      why:
        'I saw classmates miss scholarships and events simply because nobody told them in time. A network run by students themselves, with a single place to find programs, events and tools, felt like the most direct fix I could actually build.',
      approach:
        'I treated Collabs as a product with several surfaces: a public hub site, and focused tools (e-Vote, QRLab, Drop, Mail, LoadMap, Khowarify) that each solve one problem. The hub is CMS-driven so non-technical team members can publish without me.',
      decisions: [
        {
          title: 'Embedded CMS instead of hardcoded pages',
          detail:
            'Sanity Studio lives at /studio inside the same Next.js app, so the team edits content in a familiar UI while pages stay statically generated and fast.',
        },
        {
          title: 'Instant publishing via webhooks',
          detail: 'A revalidation endpoint receives Sanity webhooks, so static pages update seconds after an edit instead of waiting for a redeploy.',
        },
        {
          title: 'One brand, many small tools',
          detail: 'Instead of one giant app, each tool is deployed separately on its own subdomain — easier to build, ship and fix independently.',
        },
      ],
      challenges: [
        {
          challenge: 'Team members without coding experience needed to update the site.',
          solution: 'Moved all content into the CMS and wrote an admin guide in plain language.',
        },
        {
          challenge: 'Keeping many separate projects consistent.',
          solution: 'Shared naming, colours and domains under collabs.eu.org so the ecosystem reads as one organisation.',
        },
      ],
      learned: [
        'Building the tool is the easy half — getting a team to adopt it is the real work.',
        'Content modelling decisions shape every page; it pays to design the schema first.',
        'Small, independently deployed tools are easier for a student team to maintain.',
      ],
    },
  },
  {
    slug: 'hindukush-express',
    title: 'Hindukush Express',
    tagline: 'Seat booking and operations for transport on the Chitral routes.',
    summary:
      'A full-stack booking platform for a transport service running Chitral ↔ Peshawar, Rawalpindi and Mastuj. Passengers pick a route, date and seat on a live cabin map; operators manage manifests, statements and printable tickets from an admin dashboard.',
    year: '2026',
    role: 'Solo full-stack developer',
    status: 'live',
    categories: ['full-stack', 'web'],
    presentation: 'feature',
    accent: '#B45309',
    stack: ['Next.js', 'TypeScript', 'Supabase (Postgres)', 'Tailwind CSS', 'jsPDF', 'PWA'],
    features: [
      'Step-by-step booking wizard: route & date → seat → checkout',
      'Seat maps for 19-seat coasters and 33-seat buses',
      'Admin manifest with seat editing, offline (walk-in) bookings and driver print views',
      'E-tickets with QR codes, generated as PDFs',
      'SMS notification to the route operator on every new booking',
      'Installable PWA with an offline fallback page and network status indicator',
    ],
    contribution: 'Designed the data model and UI, built the booking flow, admin tools and API routes, and deployed it.',
    links: [{ label: 'hindukushexpress.vercel.app', href: 'https://hindukushexpress.vercel.app/', kind: 'live' }],
    media: { src: '/projects/hindukush-hero.jpg', alt: 'Hindukush Express hero image of a mountain road', fit: 'cover', width: 2048, height: 1366 },
    caseStudy: {
      problem:
        'Seats on vans and buses between Chitral and the cities are booked by phone calls and paper registers. Double bookings happen, and passengers have no record of what they reserved.',
      why: 'Mastuj ↔ Chitral is a route I travel myself. A booking system with a real seat map is a small piece of software that removes a lot of everyday friction.',
      approach:
        'I modelled the system around three things — routes, vehicle configurations and bookings — and built two experiences on top: a mobile-first booking wizard for passengers and a dense admin dashboard for operators.',
      decisions: [
        {
          title: 'Supabase as the backend',
          detail: 'Postgres with a hosted API let me focus on the booking logic instead of running servers, and fits a project with one developer.',
        },
        {
          title: 'Server-side validation of every booking',
          detail: 'The booking API validates the route against the known route list and requires date and seats before anything is written.',
        },
        {
          title: 'Vehicle configs as data',
          detail: 'Seat layouts (19-seat coaster, 33-seat bus) live in one config, so adding a vehicle type does not mean redrawing the UI.',
        },
      ],
      challenges: [
        {
          challenge: 'Unreliable mobile internet along the routes.',
          solution: 'Made it an installable PWA with an offline page and a visible network status indicator.',
        },
        {
          challenge: 'Operators still take bookings in person.',
          solution: 'Added an offline-booking form in the admin so walk-ins and online bookings share one manifest.',
        },
      ],
      learned: [
        'Admin tools deserve as much design attention as the customer-facing side.',
        'Fare and pricing logic should be enforced on the server, not trusted from the client — something I am tightening up next.',
        'Printing (tickets, manifests) is still a core requirement in the real world.',
      ],
    },
  },
  {
    slug: 'easiness',
    title: 'Easiness',
    tagline: 'Point of sale, stock and an online shop for small shops — even offline.',
    summary:
      'A shop management app for kiryana stores, grocers, pharmacies and other small shops: sell at the counter, manage stock and barcodes, take online orders with Cash on Delivery, manage staff and see real profit. Designed for shopkeepers — big buttons, clear words, English and Urdu.',
    year: '2026',
    role: 'Developer',
    status: 'live',
    categories: ['full-stack', 'web'],
    presentation: 'feature',
    accent: '#0F766E',
    stack: ['Next.js', 'Offline-first', 'English / Urdu (RTL)'],
    features: [
      'Point of sale: scan, tap or search; cash, bank transfer, split payments and receipts',
      'Keeps selling offline — sales sync automatically when the connection returns',
      'Stock history, low-stock alerts, batches, expiry dates and branch transfers',
      'Camera or USB/Bluetooth barcode scanning, plus generated barcode labels',
      'Each shop gets its own online store with Cash on Delivery and delivery areas',
      'Staff logins with role-based permissions and an action history',
      'Profit from actual item cost minus expenses, with daily to yearly reports',
      'Full right-to-left Urdu interface',
    ],
    contribution: 'Built the product and its public site, with a free plan and a demo shop anyone can try.',
    links: [{ label: 'easiness.vercel.app', href: 'https://easiness.vercel.app/', kind: 'live' }],
    media: {
      src: '/projects/easiness-og.png',
      alt: 'Easiness preview: run your shop with ease, even offline — point of sale, stock and barcodes, online shop with Cash on Delivery, reports',
      fit: 'cover',
      width: 1200,
      height: 630,
    },
  },
  {
    slug: 'collabs-e-vote',
    title: 'Collabs e-Vote',
    tagline: 'Secure online elections for school councils.',
    summary:
      'A web-based voting system for school and institutional elections. Schools register, add students and contestants, open the election, and publish results; students log in and vote once per position.',
    year: '2026',
    role: 'Solo full-stack developer',
    status: 'live',
    categories: ['full-stack', 'civic-tech'],
    presentation: 'feature',
    accent: '#4338CA',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'bcrypt', 'Upstash Redis', 'jsPDF'],
    features: [
      'Separate roles and logins for schools and students',
      'Election lifecycle: Upcoming → Live → Completed, with results published on demand',
      'Contestant visibility by whole school, grade or section',
      'One ballot per student, written in a single database transaction',
      'SHA-256 audit receipts for each vote',
      'PDF export of results and student credentials',
    ],
    contribution: 'Designed the schema and the election rules, built the school admin and student voting flows, and deployed it.',
    links: [{ label: 'evote.collabs.eu.org', href: 'https://evote.collabs.eu.org/', kind: 'live' }],
    media: { src: '/projects/evote-icon.png', alt: 'Collabs e-Vote icon', fit: 'logo', width: 512, height: 512 },
    caseStudy: {
      problem:
        'School council elections are usually run on paper: slow to count, hard to audit, and easy to dispute. As Deputy President at AKHSS Booni I saw how much time counting alone takes.',
      why: 'Elections are a high-trust process, which made this a good project to learn how to build something where correctness matters more than features.',
      approach:
        'I started from the rules — who can vote, for which positions, and when — and expressed them in a Prisma schema (School, Student, Contestant, Vote) before building any screens. Every rule is checked on the server, never only in the UI.',
      decisions: [
        {
          title: 'Server-enforced election state',
          detail: 'The vote endpoint rejects any ballot unless the school’s election is LIVE, regardless of what the client shows.',
        },
        {
          title: 'Atomic ballot submission',
          detail: 'All votes in a ballot and the student’s has_voted flag are written in one transaction, so a ballot is either fully counted or not at all.',
        },
        {
          title: 'Scoped candidate visibility',
          detail: 'Contestants can be visible to the whole school, one grade or one section — matching how class representatives are actually elected.',
        },
      ],
      challenges: [
        {
          challenge: 'Preventing double voting.',
          solution: 'A has_voted check on the server before writing, plus the transaction that flips it together with the votes.',
        },
        {
          challenge: 'Onboarding hundreds of students quickly.',
          solution: 'Bulk student creation with generated passwords and printable credential sheets.',
        },
      ],
      learned: [
        'Write the rules down as data constraints first; the UI is the easy part.',
        'Transactions are the difference between “usually works” and “always consistent”.',
        'Trust in a system comes from being able to audit it, not just from it working.',
      ],
    },
  },
  {
    slug: 'qrlab',
    title: 'QRLab',
    tagline: 'Bulk QR codes, privately, right in the browser.',
    summary:
      'A free QR code generator with logos, colours and shapes — and bulk generation from a CSV into a ZIP. Everything runs client-side: no sign-up, nothing uploaded, codes never expire.',
    year: '2026',
    role: 'Solo developer',
    status: 'live',
    categories: ['tools', 'web'],
    presentation: 'feature',
    accent: '#0E7490',
    stack: ['JavaScript (ES modules)', 'HTML', 'CSS', 'Service Worker', 'qr-code-styling', 'JSZip'],
    features: [
      'URL, Wi-Fi, vCard, WhatsApp, email and SMS QR types',
      'Custom logo, colours and module shapes',
      'Bulk generation from CSV, exported as a ZIP of PNGs',
      'Installable PWA that works offline',
      'Recent downloads kept locally on the device',
    ],
    contribution: 'Designed and built the whole tool, including SEO, legal pages and the PWA setup.',
    links: [
      { label: 'qrlab.eu.org', href: 'https://www.qrlab.eu.org/', kind: 'live' },
      { label: 'Source', href: 'https://github.com/syedfarhandanish/qr-lab', kind: 'source' },
    ],
    media: { src: '/projects/qrlab-og.png', alt: 'QRLab social preview: free QR code generator with logos, bulk CSV, Wi-Fi and vCard', fit: 'cover', width: 1200, height: 630 },
    caseStudy: {
      problem:
        'Schools and organisers often need dozens of QR codes at once — for attendance, events or resources. Most online generators upload your data, add watermarks, or make codes that expire behind a paywall.',
      why: 'I needed bulk QR codes for Collabs events and could not find a free tool that did not want an account or my data.',
      approach:
        'Keep everything in the browser. No backend means no data leaves the device, nothing to pay for hosting, and nothing that can expire.',
      decisions: [
        {
          title: 'No framework',
          detail: 'Plain ES modules keep the page small and fast on slow connections — the whole app is under 800 lines of JavaScript.',
        },
        {
          title: 'Load heavy code on demand',
          detail: 'JSZip is only fetched when someone actually starts a bulk export.',
        },
        {
          title: 'PWA for offline use',
          detail: 'A service worker caches the app so it keeps working without a connection.',
        },
      ],
      challenges: [
        {
          challenge: 'Codes looked blurry when printed.',
          solution: 'Render at high resolution for downloads, independent of the on-screen preview size.',
        },
      ],
      learned: [
        'Not every project needs a framework or a server.',
        'Privacy can be a feature people notice, not just a policy page.',
      ],
    },
  },
  {
    slug: 'loadmap',
    title: 'LoadMap',
    tagline: 'Load profiling and solar sizing for off-grid villages.',
    summary:
      'A rural electrification tool: survey households and their appliances, schedule when each runs across 24 hours, and LoadMap builds the village load curve and estimates the solar array, battery and inverter needed.',
    year: '2026',
    role: 'Solo developer',
    status: 'in-development',
    categories: ['civic-tech', 'web'],
    presentation: 'card',
    accent: '#A16207',
    stack: ['Next.js', 'TypeScript', 'Zustand', 'Recharts', 'jsPDF'],
    features: [
      'Household and appliance surveys',
      '24-hour appliance scheduler',
      'Hourly load curve, peak demand, daily energy and load factor',
      'PV, battery and inverter sizing with stated assumptions',
      'Exportable reports',
    ],
    contribution: 'Building it end to end — the survey flow, the calculation engine and the dashboard.',
    links: [],
    note: 'Not publicly deployed yet. You can try its calculation engine in the Lab on the home page.',
    caseStudy: {
      problem:
        'Many villages in the mountains have unreliable grid power or none. Planning a solar system starts with knowing how much energy a community actually uses, and when — which most communities have no simple way to estimate.',
      why: 'It combines two things I care about: practical software and the physics/maths I study at school.',
      approach:
        'Model each appliance as wattage × quantity × a 24-slot on/off schedule. Summing those gives an hourly load curve; from that come peak demand, daily energy and the system sizing.',
      decisions: [
        {
          title: 'Explicit, visible assumptions',
          detail: 'Safety margin (15%), days of autonomy (2) and depth of discharge (80%) are named constants, so anyone can see and question them.',
        },
        {
          title: 'Client-side state with Zustand',
          detail: 'Surveys are built up on the device without a backend, which suits field use with poor connectivity.',
        },
      ],
      challenges: [
        {
          challenge: 'Entering schedules for many appliances is tedious.',
          solution: 'A 24-hour grid scheduler where you toggle hours directly instead of typing times.',
        },
      ],
      learned: [
        'Simple models with clearly stated assumptions are more useful than precise-looking black boxes.',
        'The interface for entering data matters as much as the calculation.',
      ],
    },
  },
  {
    slug: 'khowarify',
    title: 'Khowarify',
    tagline: 'Bringing Khowar into the AI era.',
    summary:
      'An AI-assisted English ↔ Khowar translation and language-preservation initiative. Khowar, my mother tongue, is a low-resource language that modern translation tools mostly ignore.',
    year: '2026 — now',
    role: 'Initiator',
    status: 'in-development',
    categories: ['ai', 'civic-tech'],
    presentation: 'card',
    accent: '#7C3AED',
    stack: [],
    features: ['English → Khowar translation', 'Khowar → English translation', 'Focus on preserving the language'],
    contribution: 'Started the initiative under Collabs and am working on the approach and data for it.',
    links: [],
    note: 'Early stage — no public release yet. Details will be added as it develops.',
  },
  {
    slug: 'collabs-mail',
    title: 'Collabs Mail',
    tagline: 'Custom-domain email and a web mail client for the Collabs team.',
    summary:
      'Professional email on the Collabs domain — configured DNS (MX, TXT, CNAME) for deliverability and authentication — plus a Next.js mail app with a rich-text editor, admin broadcasts and AI-drafted replies.',
    year: '2026',
    role: 'Developer & infrastructure',
    status: 'live',
    categories: ['infrastructure', 'full-stack', 'ai'],
    presentation: 'card',
    accent: '#BE123C',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'TipTap', 'Gemini API', 'DNS (MX/TXT/CNAME)', 'Zoho Mail'],
    features: [
      'Domain email with SPF/DKIM-style TXT records configured',
      'Rich-text compose with TipTap',
      'Admin broadcast to members',
      'AI-assisted reply drafts',
      'Installable PWA',
    ],
    contribution: 'Set up the domain email infrastructure and built the web client.',
    links: [{ label: 'collabsmail.eu.org', href: 'https://www.collabsmail.eu.org', kind: 'live' }],
    media: { src: '/projects/collabs-mail.png', alt: 'Collabs Mail interface', fit: 'cover', width: 1918, height: 885 },
  },
  {
    slug: 'collabs-drop',
    title: 'Collabs Drop',
    tagline: 'Sharing study resources across campuses.',
    summary:
      'A React + Vite PWA where students post and find shared resources. Built on Supabase, with a rich-text editor, sanitised content and virtualised lists for long feeds.',
    year: '2026',
    role: 'Solo developer',
    status: 'live',
    categories: ['web', 'full-stack'],
    presentation: 'card',
    accent: '#1D4ED8',
    stack: ['React', 'Vite', 'Supabase', 'DOMPurify', 'react-virtuoso', 'PWA'],
    features: ['Resource posts with rich text', 'HTML sanitisation with DOMPurify', 'Virtualised feeds', 'Installable PWA'],
    contribution: 'Built and deployed the app.',
    links: [{ label: 'collabsdrop.vercel.app', href: 'https://collabsdrop.vercel.app/', kind: 'live' }],
    media: { src: '/projects/collabs-drop-logo.png', alt: 'Collabs Drop logo', fit: 'logo', width: 1024, height: 1024 },
  },
  {
    slug: 'xylem',
    title: 'Xylem Innovation',
    tagline: 'UI design for a water-usage governance app — Xylem Innovation Challenge 2025.',
    summary:
      'As UI designer in a five-person team, I designed an interface that turns complex water-usage data into something local authorities and researchers can act on.',
    year: '2025',
    role: 'UI/UX designer (team of 5)',
    status: 'case-study',
    categories: ['ui-ux'],
    presentation: 'card',
    accent: '#0369A1',
    stack: ['Figma', 'Prototyping', 'Information architecture'],
    features: ['Progressive disclosure of data', 'Overview → stream drill-down', 'Responsive layouts'],
    contribution: 'Owned the interface design: wireframes, information architecture and the final prototype.',
    links: [],
    media: { src: '/projects/xylem-interface.jpg', alt: 'Xylem water-governance dashboard design', fit: 'cover', width: 1024, height: 512 },
    caseStudy: {
      problem:
        'Ecological data is dense. Researchers and local authorities needed to make decisions from large water-usage data streams without being overwhelmed by raw numbers.',
      why: 'This was our team’s entry for the Xylem Innovation Challenge 2025; I took the interface because I enjoy turning complexity into something clear.',
      approach:
        'Restructure the information architecture around progressive disclosure: show a few top-level health indicators first, and let people drill into individual water streams for detailed charts.',
      decisions: [
        { title: 'Overview first', detail: 'The landing view answers “is anything wrong?” before showing any detailed chart.' },
        { title: 'Drill-down per stream', detail: 'Details live one click deeper, so the main screen stays readable.' },
      ],
      challenges: [
        {
          challenge: 'Balancing completeness with clarity.',
          solution: 'Grouped metrics and hid secondary data behind explicit interactions instead of removing it.',
        },
      ],
      learned: ['Design reviews in a team improve the work far more than polishing alone.', 'The hardest design decisions are about what not to show.'],
    },
  },
  {
    slug: 'cosmopolitan-hostel',
    title: 'Cosmopolitan Boys Hostel',
    tagline: 'A client website for a local student hostel.',
    summary:
      'A responsive multi-page website — home, facilities, gallery and contact — giving a local hostel its first web presence.',
    year: '2026',
    role: 'Freelance web developer',
    status: 'live',
    categories: ['web'],
    presentation: 'card',
    accent: '#15803D',
    stack: ['HTML', 'CSS', 'Responsive design'],
    features: ['Multi-page static site', 'Custom brand palette', 'Mobile-first layouts', 'Photo gallery'],
    contribution: 'Gathered requirements from the client, designed and built the site, and deployed it.',
    links: [{ label: 'cosmopolitanhostel.vercel.app', href: 'https://cosmopolitanhostel.vercel.app/', kind: 'live' }],
    media: { src: '/projects/cosmopolitan-hero.jpeg', alt: 'Cosmopolitan Boys Hostel building', fit: 'cover', width: 1040, height: 780 },
  },
  {
    slug: 'collabs-flow',
    title: 'Collabs Flow',
    tagline: 'A Pomodoro timer and Kanban board for students.',
    summary:
      'A focus app combining a configurable Pomodoro timer with a drag-and-drop Kanban board, adapted for Collabs students.',
    year: '2025',
    role: 'Adapted & deployed',
    status: 'live',
    categories: ['web'],
    presentation: 'archive',
    accent: '#334155',
    stack: ['Next.js', 'TypeScript', 'shadcn/ui', 'Framer Motion'],
    features: ['Pomodoro timer', 'Kanban board with local persistence'],
    contribution: 'Adapted and deployed it for Collabs.',
    links: [{ label: 'collabsflow.vercel.app', href: 'https://collabsflow.vercel.app/', kind: 'live' }],
    note: 'Based on an open-source MIT-licensed Pomodoro & Kanban project, customised for Collabs.',
  },
  {
    slug: 'akhss-eattendance',
    title: 'AKHSS eAttendance',
    tagline: 'A desktop attendance app for teachers at my school.',
    summary: 'A Flask app packaged as a Windows executable so teachers can log in and record attendance without an internet connection.',
    year: '2025',
    role: 'Solo developer',
    status: 'archived',
    categories: ['tools'],
    presentation: 'archive',
    accent: '#334155',
    stack: ['Python', 'Flask', 'PyInstaller'],
    features: ['Teacher login', 'Attendance dashboard', 'Runs offline as an .exe'],
    contribution: 'Built it for my school.',
    links: [],
  },
  {
    slug: 'pdf-lab',
    title: 'PDF Lab',
    tagline: 'A local, in-browser PDF studio.',
    summary: 'Merge and work with PDFs entirely in the browser, without uploading files anywhere.',
    year: '2026',
    role: 'Solo developer',
    status: 'prototype',
    categories: ['tools'],
    presentation: 'archive',
    accent: '#334155',
    stack: ['JavaScript', 'HTML'],
    features: ['Merge PDFs locally'],
    contribution: 'Built it.',
    links: [],
  },
  {
    slug: 'collabs-certify',
    title: 'Collabs Certify',
    tagline: 'A certificate editor for Collabs events.',
    summary: 'A web editor with a small Python API for generating participation certificates for events.',
    year: '2026',
    role: 'Solo developer',
    status: 'prototype',
    categories: ['tools'],
    presentation: 'archive',
    accent: '#334155',
    stack: ['JavaScript', 'Python', 'Vercel'],
    features: ['Certificate editor', 'Server-side generation'],
    contribution: 'Built it.',
    links: [{ label: 'Source', href: 'https://github.com/syedfarhandanish/Collabs-Certify', kind: 'source' }],
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  'full-stack': 'Full-Stack',
  web: 'Web Development',
  'civic-tech': 'Civic Technology',
  ai: 'AI & Language',
  tools: 'Developer Tools & Utilities',
  'ui-ux': 'UI/UX',
  infrastructure: 'Infrastructure',
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  prototype: 'Prototype',
  'case-study': 'Case study',
  archived: 'Archived',
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Categories that actually have projects, in a stable order. */
export function usedCategories(): ProjectCategory[] {
  const order = Object.keys(categoryLabels) as ProjectCategory[];
  return order.filter((c) => projects.some((p) => p.categories.includes(c)));
}
