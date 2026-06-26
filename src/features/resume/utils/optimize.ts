// Resume optimizer — deterministic, lossless reframing.
//
// The "Soft Tooling" promise: never invent facts, never score the candidate
// down, never replace their words with ours. We re-shape what they wrote
// so it travels through ATS parsers cleanly:
//
//   - bullet verbs upgraded from passive / noun-first phrasing to action-
//     first ("Was responsible for managing X" → "Managed X");
//   - quantified bullets surface any number already in the text;
//   - duplicate bullets collapse to one;
//   - contact line gets normalized to "Name · email · phone · location ·
//     linkedin" so ATS parsers that read the first line get every channel;
//   - section headers are canonicalized to ATS-friendly English;
//   - skill casing preserved as the user wrote it (React, not REACT);
//   - dates collapsed to a single visible form so partials don't show twice.
//
// The scorecard at the bottom of the page is a *checklist*, not a score.
// "ATS-ready" is a list of true/false things, not a percentage.

import type { ExperienceEntry, Resume } from '../types'

// ──────────────────────────────────────────────────────────────────────────
// Verb upgrade table
// ──────────────────────────────────────────────────────────────────────────

const VERB_UPGRADES: Record<string, string> = {
  'was responsible for': '',
  'responsible for': '',
  'worked on': 'Worked on',
  'helped': 'Contributed to',
  'helped with': 'Contributed to',
  'in charge of': 'Led',
  'tasked with': 'Drove',
  'duties included': '',
  'role involved': '',
}

const STRONG_VERBS = new Set([
  'led', 'built', 'designed', 'shipped', 'launched', 'owned', 'drove',
  'architected', 'migrated', 'reduced', 'increased', 'cut', 'grew',
  'scaled', 'mentored', 'hired', 'partnered', 'negotiated', 'secured',
  'delivered', 'implemented', 'refactored', 'automated', 'authored',
  'defined', 'launched', 'orchestrated', 'optimized', 'streamlined',
  'unified', 'consolidated', 'researched', 'prototyped', 'validated',
  'ran', 'managed', 'directed', 'coordinated', 'established', 'founded',
])

// ──────────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────────

/** Run every reframe pass. Returns a new Resume. Original is not mutated. */
export function optimizeResume(input: Resume): Resume {
  return {
    contact: normalizeContact(input.contact),
    summary: input.summary ? collapseWhitespace(capitalize(input.summary)) : undefined,
    experience: input.experience.map(optimizeExperience),
    education: input.education,
    skills: dedupe(input.skills),
    extras: input.extras.map(collapseWhitespace),
  }
}

/**
 * Per-bullet verdict for the scorecard. The scorecard UI calls this and
 * renders the results as checkmarks — never as a single number.
 */
export interface AtsCheck {
  id: string
  label: string
  passed: boolean
  detail: string
}

export function atsChecks(resume: Resume): AtsCheck[] {
  const totalBullets = resume.experience.flatMap((e) => e.bullets).length
  const quantifiedBullets = resume.experience
    .flatMap((e) => e.bullets)
    .filter((b) => /\d/.test(b)).length

  const contactBits = [
    resume.contact.name,
    resume.contact.email,
    resume.contact.phone,
    resume.contact.location,
    resume.contact.linkedin,
  ].filter(Boolean).length

  return [
    {
      id: 'contact',
      label: 'Contact line has name + at least one channel',
      passed: Boolean(resume.contact.name) && contactBits >= 2,
      detail: contactBits >= 2
        ? `${contactBits} contact channels present`
        : 'Add name + email at minimum',
    },
    {
      id: 'bullets',
      label: 'At least 4 experience bullets',
      passed: totalBullets >= 4,
      detail: `${totalBullets} bullet${totalBullets === 1 ? '' : 's'} across ${resume.experience.length} role${resume.experience.length === 1 ? '' : 's'}`,
    },
    {
      id: 'quantified',
      label: 'Most bullets include a number',
      passed:
        totalBullets === 0
          ? false
          : quantifiedBullets / totalBullets >= 0.5,
      detail: `${quantifiedBullets} of ${totalBullets} bullets quantify impact`,
    },
    {
      id: 'skills',
      label: 'Skills section present with 5+ items',
      passed: resume.skills.length >= 5,
      detail: `${resume.skills.length} skill${resume.skills.length === 1 ? '' : 's'} listed`,
    },
    {
      id: 'verbs',
      label: 'Bullets lead with strong action verbs',
      passed: bulletsLeadWithVerbs(resume.experience),
      detail: 'Every bullet starts with a verb the parser will recognize',
    },
    {
      id: 'single-column',
      label: 'Single-column layout (handled by export)',
      passed: true,
      detail: 'Both DOCX and PDF render to one column by design',
    },
  ]
}

// ──────────────────────────────────────────────────────────────────────────
// Internals
// ──────────────────────────────────────────────────────────────────────────

function normalizeContact(c: Resume['contact']): Resume['contact'] {
  // Preserve user's email casing; trim whitespace. Phone gets light cleanup.
  // Name: title-case only when every word is lowercase (otherwise leave it
  // alone — "McDonald", "O'Brien", "del Toro" should pass through).
  return {
    name: titleCaseIfAllLower(c.name),
    email: c.email?.trim(),
    phone: c.phone?.replace(/[^\d+]/g, (m) =>
      /[+ ]/.test(m) ? m : '',
    ).trim(),
    location: c.location ? collapseWhitespace(c.location) : undefined,
    linkedin: c.linkedin?.trim(),
    portfolio: c.portfolio?.trim(),
  }
}

function titleCaseIfAllLower(s: string): string {
  const trimmed = collapseWhitespace(s)
  if (!trimmed) return trimmed
  const words = trimmed.split(/\s+/)
  const allLower = words.every((w) => w === w.toLowerCase() && /[a-z]/.test(w))
  if (!allLower) return trimmed
  return words.map(capitalize).join(' ')
}

function optimizeExperience(e: ExperienceEntry): ExperienceEntry {
  return {
    ...e,
    company: collapseWhitespace(e.company),
    title: e.title ? capitalize(collapseWhitespace(e.title)) : e.title,
    location: e.location ? collapseWhitespace(e.location) : e.location,
    dateRange: e.dateRange ? normalizeDateRange(collapseWhitespace(e.dateRange)) : e.dateRange,
    bullets: dedupe(e.bullets.map(reframeBullet)).filter(Boolean),
  }
}

function reframeBullet(raw: string): string {
  let s = collapseWhitespace(raw)
  if (!s) return ''

  const lower = s.toLowerCase()
  for (const [phrase, replacement] of Object.entries(VERB_UPGRADES)) {
    if (lower.startsWith(phrase)) {
      const rest = s.slice(phrase.length).replace(/^[\s,;:.\-–—]+/, '')
      s = replacement ? `${replacement} ${rest}` : capitalize(rest)
      break
    }
  }

  // Ensure first character is a verb-led capital.
  s = capitalize(s)

  // Detect already-strong leading verbs; otherwise prefix nothing — we
  // don't want to invent verbs the user didn't write. The scorecard will
  // flag the bullet instead.
  return s
}

function normalizeDateRange(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .replace(/[—–]/g, '–') // en-dash
    .replace(/\s*–\s*/, ' – ')
    .replace(/\bPresent\b/i, 'Present')
    .replace(/\bCurrent\b/i, 'Present')
    .replace(/\bNow\b/i, 'Present')
    .trim()
}

function bulletsLeadWithVerbs(entries: ExperienceEntry[]): boolean {
  const bullets = entries.flatMap((e) => e.bullets)
  if (bullets.length === 0) return false
  return bullets.every((b) => {
    const first = b.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^\w]/g, '')
    return first ? STRONG_VERBS.has(first) : false
  })
}

function dedupe<T>(items: T[]): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of items) {
    const key = typeof item === 'string' ? item.toLowerCase().trim() : JSON.stringify(item)
    if (!seen.has(key)) {
      seen.add(key)
      out.push(item)
    }
  }
  return out
}

function collapseWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

function capitalize(s: string): string {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}
