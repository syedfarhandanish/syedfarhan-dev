# syedfarhandanish.me

Personal portfolio of Syed Farhan Danish — Next.js 16 (App Router), TypeScript, Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Updating content (no component edits needed)

All copy lives in typed files in [`content/`](content):

| What | File |
|---|---|
| Name, hero text, about, socials, services | `content/site.ts` |
| **Availability status** | `content/site.ts` → `availability` (`open` / `limited` / `focused`) |
| **CV / resume** | Replace `public/Syed_Farhan_Resume.pdf`, or change `site.resume.href` |
| Projects + case studies | `content/projects.ts` (add a `caseStudy` block to get a `/projects/<slug>` page) |
| Timeline, achievements, certifications | `content/experience.ts` |
| Skills (each linked to projects) | `content/skills.ts` |

Project images go in `public/projects/`. Pages, sitemap, command palette, terminal and the `/api/projects` endpoint all read from these files automatically.

## Contact form

The form posts to `/api/contact`, which validates on the server, applies spam protection (honeypot, timing check, rate limit) and then delivers the message. Configure delivery with environment variables (see `.env.example`):

- **Resend:** set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (optional `CONTACT_FROM_EMAIL`).
- **Formspree:** set `FORMSPREE_FORM_ID` (falls back to the form ID the previous site used).

Keys stay on the server and are never shipped to the browser.

## Structure

```
app/            routes: home, /projects/[slug], /api/contact, /api/projects, sitemap, robots
components/
  layout/       navbar, footer, theme, command palette, cursor, scroll progress
  home/         homepage sections (hero, about, work, lab, skills, journey, contact)
  lab/          Capabilities Lab experiments
  project/      shared project UI (visual, status, links, case-study nav)
  ui/           small primitives
content/        all site content (typed)
lib/            noise, LoadMap engine, e-Vote rules model, contrast, contact schema
```
