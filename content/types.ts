/**
 * Content model for the portfolio.
 * Every piece of copy on the site comes from the typed files in /content —
 * edit those files to update the site; components never hardcode content.
 */

export type ProjectCategory =
  | 'full-stack'
  | 'web'
  | 'civic-tech'
  | 'ai'
  | 'tools'
  | 'ui-ux'
  | 'infrastructure';

export type ProjectStatus =
  | 'live' // deployed and publicly usable
  | 'in-development' // being actively built, not publicly launched
  | 'prototype' // proof of concept / MVP
  | 'case-study' // design or team work documented as a case study
  | 'archived'; // finished, no longer maintained

/** How the project is laid out in the Work section. */
export type ProjectPresentation = 'flagship' | 'feature' | 'card' | 'archive';

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'live' | 'source' | 'other';
}

export interface ProjectMedia {
  src: string;
  alt: string;
  /** 'cover' fills the frame; 'logo' is shown centred on the project's colour field. */
  fit: 'cover' | 'logo';
  width: number;
  height: number;
}

export interface CaseStudy {
  problem: string;
  why: string;
  approach: string;
  decisions: { title: string; detail: string }[];
  challenges: { challenge: string; solution: string }[];
  learned: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** One line, shown on cards. */
  tagline: string;
  summary: string;
  year: string;
  role: string;
  status: ProjectStatus;
  categories: ProjectCategory[];
  presentation: ProjectPresentation;
  /** Project accent colour (used for its visual identity field). */
  accent: string;
  stack: string[];
  features: string[];
  contribution: string;
  links: ProjectLink[];
  media?: ProjectMedia;
  gallery?: ProjectMedia[];
  /** Short honest note shown on the project (e.g. attribution, scope). */
  note?: string;
  caseStudy?: CaseStudy;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  start: string; // ISO yyyy-mm for sorting
  role: string;
  organization: string;
  kind: 'education' | 'leadership' | 'building' | 'teaching' | 'training';
  summary: string;
  points: string[];
  link?: { label: string; href: string };
}

export interface SkillItem {
  name: string;
  /** Where it was actually used — slugs from projects.ts. */
  usedIn: string[];
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  items: SkillItem[];
}

export type AvailabilityState = 'open' | 'limited' | 'focused';

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email' | 'whatsapp';
  label: string;
  href: string;
  handle: string;
}
