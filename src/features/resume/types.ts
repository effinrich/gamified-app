// The single source of truth for what a resume looks like in this app.
// Every module — parser, optimizer, preview editor, DOCX/PDF export —
// consumes and produces this shape. If you change it, all four move with you.

export interface ContactLine {
  name: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  portfolio?: string
}

export interface ExperienceEntry {
  /** Company line. e.g. "Acme Corp". Falls back to a blank if unrecognized. */
  company: string
  /** Job title line. e.g. "Senior Frontend Engineer". */
  title: string
  /** Free-text location. "Remote", "New York, NY", "SF / Remote". */
  location?: string
  /** Display range. "Jan 2022 – Present" or "2020 – 2022". Empty = current. */
  dateRange?: string
  /** Bullets. Already cleaned of leading "• - *". */
  bullets: string[]
}

export interface EducationEntry {
  school: string
  degree?: string
  field?: string
  dateRange?: string
}

export interface Resume {
  contact: ContactLine
  /** Optional 1–3 sentence summary. */
  summary?: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  /** Anything we couldn't classify. Shown in a "More" section if non-empty. */
  extras: string[]
}
