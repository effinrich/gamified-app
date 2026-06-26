// Resume parser — accepts free-text paste or a LinkedIn URL.
//
// The parser is deliberately tolerant. Real pasted resumes are messy: tabs,
// weird dashes, smart quotes, all-caps section headers, bullets that are
// sometimes "•" and sometimes "-". Our job is to surface a structured
// Resume shape from any of that without losing content. The optimizer
// (utils/optimize.ts) and the export modules (utils/exportDocx.ts,
// utils/exportPdf.ts) both consume the parsed shape and assume nothing
// else about the source text.
//
// Determinism: this module has zero randomness and no I/O. Same input → same
// output. Tested in tests/parse.test.ts.

import type {
  ContactLine,
  EducationEntry,
  ExperienceEntry,
  Resume,
} from '../types'

// ──────────────────────────────────────────────────────────────────────────
// Section detection
// ──────────────────────────────────────────────────────────────────────────

const SECTION_HEADERS: Record<string, RegExp> = {
  contact: /^\s*(contact(?:\s+info(?:rmation)?)?)\s*:?\s*$/i,
  summary: /^\s*(summary|professional\s+summary|profile|objective|about)\s*:?\s*$/i,
  experience:
    /^\s*(work\s+experience|experience|employment(\s+history)?|professional\s+experience|career\s+history|work\s+history)\s*:?\s*$/i,
  education:
    /^\s*(education|academic\s+background|qualifications)\s*:?\s*$/i,
  skills:
    /^\s*(skills|technical\s+skills|core\s+competencies|key\s+skills|expertise|technologies)\s*:?\s*$/i,
  projects: /^\s*(projects|side\s+projects|notable\s+projects)\s*:?\s*$/i,
  certifications:
    /^\s*(certifications?|licenses?\s+(&|and)\s+certifications?)\s*:?\s*$/i,
  extras: /^\s*(awards|honors|publications|volunteer|interests|languages|additional\s+information|other)\s*:?\s*$/i,
}

type SectionName = keyof typeof SECTION_HEADERS

interface SectionedLines {
  contact: string[]
  summary: string[]
  experience: string[]
  education: string[]
  skills: string[]
  projects: string[]
  certifications: string[]
  extras: string[]
}

const EMPTY_SECTIONS: SectionedLines = {
  contact: [],
  summary: [],
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  extras: [],
}

/**
 * Split the raw text into ordered sections keyed by their canonical name.
 * Lines that don't match any header stay attached to the previous section.
 * If no headers are recognized at all, we fall back to a single best-effort
 * pass that treats the whole input as the implicit "experience + contact"
 * blob (common for short LinkedIn pastes).
 */
function splitSections(text: string): SectionedLines {
  const buckets: SectionedLines = {
    contact: [],
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    extras: [],
  }

  const lines = text.split(/\r?\n/)
  let current: SectionName | null = null

  // Detect if ANY header is present. If not, treat the entire input as a
  // blob and try to extract contact + experience heuristically.
  const anyHeader = lines.some((l) =>
    Object.values(SECTION_HEADERS).some((re) => re.test(l.trim())),
  )

  if (!anyHeader) {
    // No headers — leave buckets empty; parseResume() handles the fallback
    // by scanning the top of the input for contact info and the remainder
    // for experience blocks. This avoids re-classifying "Remote" as a name
    // when we re-run extractContactFromBlock over section content.
    return buckets
  }

  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed) {
      pushTo(buckets, current, '')
      continue
    }
    const match = (Object.entries(SECTION_HEADERS) as [SectionName, RegExp][])
      .find(([, re]) => re.test(trimmed))
    if (match) {
      current = match[0]
      continue
    }
    pushTo(buckets, current, raw)
  }

  return buckets
}

function pushTo(
  buckets: SectionedLines,
  section: SectionName | null,
  line: string,
): void {
  if (section === null) return
  // `section` is the discriminant for SectionedLines but TS in --strict mode
  // can't index a non-Record by a string-literal union without help. The
  // switch exhaustively narrows each key.
  switch (section) {
    case 'contact': buckets.contact.push(line); return
    case 'summary': buckets.summary.push(line); return
    case 'experience': buckets.experience.push(line); return
    case 'education': buckets.education.push(line); return
    case 'skills': buckets.skills.push(line); return
    case 'projects': buckets.projects.push(line); return
    case 'certifications': buckets.certifications.push(line); return
    case 'extras': buckets.extras.push(line); return
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Contact-line extraction
// ──────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i
const PHONE_RE =
  /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/
const LINKEDIN_RE = /linkedin\.com\/(?:in|pub)\/[a-z0-9_-]+\/?/i
const LOCATION_RE =
  /^(?:location|based in)\s*:?\s*(.+)$/i
// "City, ST" or "City, State" — used as a fallback when no "Location:" label
// is present, but a clean US-style city/state pair appears in the contact
// block. Conservative: only matches capitalized words separated by a comma.
const CITY_STATE_RE = /^([A-Z][a-zA-Z .'-]+,\s*[A-Z]{2}|[A-Z][a-zA-Z .'-]+,\s*[A-Z][a-zA-Z .'-]+)$/

function extractContactFromBlock(lines: string[]): {
  lines: string[]
  contact: Partial<ContactLine>
  name?: string
} {
  const contact: Partial<ContactLine> = {}
  let name: string | undefined
  const kept: string[] = []

  const stripTrailing = (s: string) => s.replace(/[|·•,\s]+$/g, '').trim()

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue

    // A single line may carry several contact bits joined by · | • — extract
    // all of them on the same pass; do NOT short-circuit because email,
    // phone, and LinkedIn are independent signals that often appear together.
    const emailMatch = line.match(EMAIL_RE)
    const phoneMatch = line.match(PHONE_RE)
    const linkedinMatch = line.match(LINKEDIN_RE)
    const locationMatch = line.match(LOCATION_RE)

    if (emailMatch?.[0]) {
      contact.email = emailMatch[0]
    }
    if (phoneMatch?.[0]) {
      contact.phone = phoneMatch[0].trim()
    }
    if (linkedinMatch?.[0]) {
      contact.linkedin = `https://www.${linkedinMatch[0]}`
    }
    if (locationMatch?.[1]) {
      contact.location = locationMatch[1].trim()
    }

    if (emailMatch || phoneMatch || linkedinMatch || locationMatch) {
      // Compute the line's remainder with all detected bits removed.
      const remainder = stripTrailing(
        line
          .replace(emailMatch?.[0] ?? '', '')
          .replace(phoneMatch?.[0] ?? '', '')
          .replace(linkedinMatch?.[0] ?? '', '')
          .replace(locationMatch?.[1] ?? '', ''),
      )
      // If no explicit "Location:" label was used but the remainder looks
      // like a city/state pair, capture it as the candidate location.
      if (!contact.location) {
        const cityState = remainder.match(CITY_STATE_RE)
        if (cityState) {
          contact.location = cityState[1].trim()
        }
      }
      // Skip a pure-separator remainder.
      if (remainder && !/^[|·•,\s]+$/.test(remainder)) {
        kept.push(remainder)
      }
      continue
    }

    // First non-contact, non-empty line is the candidate name.
    if (!name && line.length < 80 && !/[|·•@]/.test(line)) {
      name = line
      continue
    }

    kept.push(line)
  }

  return { lines: kept, contact, name }
}

// ──────────────────────────────────────────────────────────────────────────
// Bullet normalization
// ──────────────────────────────────────────────────────────────────────────

const BULLET_PREFIX = /^\s*(?:[•●○◦▪▫■□–—\-*·]|\d+[.)])\s+/

function stripBullet(line: string): string {
  return line.replace(BULLET_PREFIX, '').trim()
}

// ──────────────────────────────────────────────────────────────────────────
// Experience-block parsing
// ──────────────────────────────────────────────────────────────────────────

/**
 * Heuristic: an experience block is usually a header line (Title at Company,
 * or Company alone) optionally followed by a date/location line, then 0+
 * bullet lines. A blank line ends the entry.
 *
 *   Senior Frontend Engineer — Acme Corp
 *   Jan 2022 – Present · Remote
 *   • Led migration of legacy jQuery to React…
 *   • Built component library…
 *
 *   Acme Corp
 *   Senior Frontend Engineer | Jan 2022 – Present
 *   - Did the thing
 */
function parseExperienceBlocks(lines: string[]): ExperienceEntry[] {
  const out: ExperienceEntry[] = []
  let i = 0

  while (i < lines.length) {
    // Skip blanks.
    while (i < lines.length && !lines[i].trim()) i++
    if (i >= lines.length) break

    const header = lines[i].trim()
    const bullets: string[] = []
    let dateRange: string | undefined
    let location: string | undefined
    let title: string | undefined
    let company: string | undefined

    const split = splitExperienceHeader(header)
    title = split.title
    company = split.company

    i++

    // Optional second line: date, location, or another header fragment.
    if (i < lines.length && lines[i].trim()) {
      const next = lines[i].trim()
      if (looksLikeDateOrLocation(next)) {
        const parsed = splitDateLocation(next)
        dateRange = parsed.date
        location = parsed.location
        i++
      }
    }

    // Bullets until next blank or end-of-section.
    while (i < lines.length && lines[i].trim()) {
      const trimmed = lines[i].trim()
      // Stop if this looks like a new experience header (line without bullet
      // markers followed by a date line).
      if (
        !BULLET_PREFIX.test(lines[i]) &&
        i + 1 < lines.length &&
        lines[i + 1].trim() &&
        looksLikeDateOrLocation(lines[i + 1].trim())
      ) {
        break
      }
      bullets.push(stripBullet(trimmed))
      i++
    }

    if (company || title) {
      out.push({ company: company ?? '', title: title ?? '', dateRange, location, bullets })
    } else if (bullets.length) {
      // No header detected — treat the whole block as one company's bullets.
      out.push({ company: '', title: '', bullets })
    }
  }

  return out
}

function splitExperienceHeader(line: string): { title?: string; company?: string } {
  // Common separators: em dash, en dash, pipe, "at", " — ", " @ ", " - ".
  const seps = [' — ', ' – ', ' | ', ' @ ', ' - ']
  for (const sep of seps) {
    if (line.includes(sep)) {
      const [a, b] = line.split(sep).map((s) => s.trim())
      // Title first → "Senior Engineer — Acme"
      if (looksLikeJobTitle(a) && !looksLikeJobTitle(b)) {
        return { title: a, company: b }
      }
      if (looksLikeJobTitle(b) && !looksLikeJobTitle(a)) {
        return { company: a, title: b }
      }
      // Fall back: assume "Title — Company"
      return { title: a, company: b }
    }
  }

  const atMatch = line.match(/^(.+?)\s+at\s+(.+)$/i)
  if (atMatch) return { title: atMatch[1].trim(), company: atMatch[2].trim() }

  // Single-line header with no separator — guess based on shape.
  if (looksLikeJobTitle(line)) return { title: line }
  return { company: line }
}

const JOB_TITLE_HINTS = [
  /engineer/i,
  /developer/i,
  /designer/i,
  /manager/i,
  /lead/i,
  /director/i,
  /analyst/i,
  /consultant/i,
  /architect/i,
  /scientist/i,
  /officer/i,
  /specialist/i,
  /coordinator/i,
  /founder/i,
  /intern/i,
  /associate/i,
  /head of/i,
  /vp/i,
  /chief/i,
  /principal/i,
  /staff/i,
  /senior/i,
  /junior/i,
]

function looksLikeJobTitle(line: string): boolean {
  return JOB_TITLE_HINTS.some((re) => re.test(line))
}

const MONTH_RE =
  '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*'
const YEAR_RE = '\\d{4}'
const DATE_TOKEN_RE = new RegExp(
  `\\b(?:${MONTH_RE}\\.?\\s*${YEAR_RE}|${YEAR_RE})\\b`,
  'i',
)
const DATE_RANGE_RE = new RegExp(
  `(?:${MONTH_RE}\\.?\\s*${YEAR_RE}|${YEAR_RE})\\s*(?:[–—\\-]|to)\\s*(?:${MONTH_RE}\\.?\\s*${YEAR_RE}|${YEAR_RE}|present|current|now)`,
  'i',
)

function looksLikeDateOrLocation(line: string): boolean {
  if (DATE_RANGE_RE.test(line)) return true
  if (DATE_TOKEN_RE.test(line) && /(remote|hybrid|on-?site|[a-z]+,\s*[a-z]{2,})/i.test(line))
    return true
  return false
}

function splitDateLocation(line: string): { date?: string; location?: string } {
  let date: string | undefined
  let location: string | undefined
  const dateMatch = line.match(DATE_RANGE_RE)
  if (dateMatch) {
    date = dateMatch[0].replace(/\s+/g, ' ').trim()
    const rest = line.replace(dateMatch[0], '').replace(/[|·•,]+/g, ' ').trim()
    if (rest) location = rest
  } else {
    // Date and location may be separated by | or ·.
    const parts = line.split(/[|·•]/).map((s) => s.trim()).filter(Boolean)
    if (parts.length === 2) {
      date = parts[0]
      location = parts[1]
    } else {
      location = line
    }
  }
  return { date, location }
}

// ──────────────────────────────────────────────────────────────────────────
// Education-block parsing
// ──────────────────────────────────────────────────────────────────────────

function parseEducationBlocks(lines: string[]): EducationEntry[] {
  const out: EducationEntry[] = []
  let i = 0
  while (i < lines.length) {
    while (i < lines.length && !lines[i].trim()) i++
    if (i >= lines.length) break
    const header = lines[i].trim()
    i++

    let dateRange: string | undefined
    // Optional date line.
    if (i < lines.length && lines[i].trim() && DATE_RANGE_RE.test(lines[i])) {
      const m = lines[i].match(DATE_RANGE_RE)
      if (m) dateRange = m[0].replace(/\s+/g, ' ').trim()
      i++
    }

    let degree: string | undefined
    let field: string | undefined
    // Optional degree line ("BS in Computer Science", "MBA").
    if (i < lines.length && lines[i].trim() && !BULLET_PREFIX.test(lines[i])) {
      const deg = lines[i].trim()
      const m = deg.match(/^(.+?)\s+in\s+(.+)$/i)
      if (m) {
        degree = m[1].trim()
        field = m[2].trim()
      } else if (
        /^(b\.?s\.?|m\.?s\.?|m\.?a\.?|m\.?b\.?a\.?|ph\.?d\.?|b\.?a\.?|associate|certificate)/i.test(
          deg,
        )
      ) {
        degree = deg
      }
      i++
    }

    out.push({ school: header, degree, field, dateRange })
  }
  return out
}

// ──────────────────────────────────────────────────────────────────────────
// Skills-line parsing
// ──────────────────────────────────────────────────────────────────────────

function parseSkills(lines: string[]): string[] {
  const all = lines
    .flatMap((l) => l.split(/[|·•·,;]/g))
    .map((s) => s.trim())
    .filter(Boolean)
  // Dedupe, case-insensitive, preserve first-seen casing.
  const seen = new Set<string>()
  const out: string[] = []
  for (const s of all) {
    const key = s.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      out.push(s)
    }
  }
  return out
}

// ──────────────────────────────────────────────────────────────────────────
// Public entry
// ──────────────────────────────────────────────────────────────────────────

/**
 * Parse a raw resume blob (free text or LinkedIn paste) into a structured
 * Resume. Tolerant: empty sections are returned as empty arrays.
 */
export function parseResume(raw: string): Resume {
  const trimmed = raw.trim()
  if (!trimmed) {
    return blankResume()
  }

  // LinkedIn URL alone — the caller handles prompting the user to paste
  // their public profile text. We just stash the URL on the contact line.
  if (/^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\//i.test(trimmed)) {
    const slug = trimmed.match(/linkedin\.com\/(?:in|pub)\/([a-z0-9_-]+)/i)?.[1] ?? ''
    return {
      ...blankResume(),
      contact: { name: humanizeSlug(slug), linkedin: trimmed },
    }
  }

  const lines = trimmed.split(/\r?\n/)
  const sections = splitSections(trimmed)

  // Contact: scan the top of the input once. We deliberately don't re-extract
  // from `sections.contact` because the headerless branch already classifies
  // everything (and re-running would mis-classify "Remote" as a name).
  const headLines = lines.slice(0, 6)
  const contactParsed = extractContactFromBlock(headLines)

  const contact: ContactLine = {
    name: contactParsed.name ?? '',
    ...contactParsed.contact,
  }

  const summary = sections.summary.filter((l) => l.trim()).join(' ').trim() || undefined

  // For experience/education/skills, prefer the dedicated section if it has
  // content; otherwise fall back to scanning the lines after the contact
  // block for headerless pastes.
  const anyHeader = lines.some((l) =>
    Object.values(SECTION_HEADERS).some((re) => re.test(l.trim())),
  )

  let experienceLines = sections.experience
  let educationLines = sections.education
  let skillsLines = sections.skills
  let extraLines = [
    ...sections.projects.filter((l) => l.trim()),
    ...sections.certifications.filter((l) => l.trim()),
    ...sections.extras.filter((l) => l.trim()),
  ]

  if (!anyHeader) {
    // Headerless: take everything past the first 4 lines as the implicit
    // experience block. The contact extractor already pulled out name /
    // email / phone / LinkedIn from the head of the document, so we don't
    // need to track which exact lines were "consumed" — the experience
    // parser handles duplicates gracefully (the optimizer dedupes bullets).
    // The first 4 lines are typically: name, email/phone, location, blank.
    experienceLines = lines.slice(4)
  }

  const experience = parseExperienceBlocks(experienceLines)
  const education = parseEducationBlocks(educationLines)
  const skills = parseSkills(skillsLines)

  return { contact, summary, experience, education, skills, extras: extraLines }
}

function blankResume(): Resume {
  return {
    contact: { name: '' },
    experience: [],
    education: [],
    skills: [],
    extras: [],
  }
}

function humanizeSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** True when the input looks like a single LinkedIn URL (no paste text). */
export function isLinkedInUrlOnly(raw: string): boolean {
  const trimmed = raw.trim()
  return /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-z0-9_-]+\/?$/i.test(
    trimmed,
  )
}
