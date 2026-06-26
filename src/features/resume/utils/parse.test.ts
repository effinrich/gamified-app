import { describe, expect, it } from 'vitest'
import { parseResume, isLinkedInUrlOnly } from './parse'

describe('parseResume — contact extraction', () => {
  it('extracts email, phone, location, and LinkedIn from a typical header block', () => {
    const text = `Jordan Rivera
San Francisco, CA · jordan@example.com · (415) 555-0123 · linkedin.com/in/jordanrivera

Summary
Senior frontend engineer.

Experience
Senior Engineer — Acme
Jan 2022 – Present
• Built things.
`
    const r = parseResume(text)
    expect(r.contact.name).toBe('Jordan Rivera')
    expect(r.contact.email).toBe('jordan@example.com')
    expect(r.contact.phone).toContain('415')
    expect(r.contact.location).toContain('San Francisco')
    expect(r.contact.linkedin).toBe('https://www.linkedin.com/in/jordanrivera')
  })

  it('handles headerless input as best-effort contact + experience', () => {
    const text = `Alex Chen
alex@chen.dev
Remote

Staff Engineer — Vercel
2020 – 2024
- Shipped the dashboard redesign.
- Owned the docs site.
`
    const r = parseResume(text)
    expect(r.contact.name).toBe('Alex Chen')
    expect(r.contact.email).toBe('alex@chen.dev')
    expect(r.experience.length).toBeGreaterThan(0)
    expect(r.experience[0].title).toContain('Staff Engineer')
    expect(r.experience[0].bullets.length).toBeGreaterThanOrEqual(2)
  })
})

describe('parseResume — section detection', () => {
  it('recognizes common section header variants', () => {
    const text = `Name Person
name@example.com

Professional Summary
A short summary.

Work Experience
Engineer — Co
2020 – 2024
• Built it.

Technical Skills
TypeScript, React

Education
BS Computer Science — State U
2016 – 2020
`
    const r = parseResume(text)
    expect(r.summary).toContain('short summary')
    expect(r.experience.length).toBeGreaterThan(0)
    expect(r.skills).toContain('TypeScript')
    expect(r.skills).toContain('React')
    expect(r.education.length).toBe(1)
    expect(r.education[0].school).toContain('State U')
  })
})

describe('parseResume — experience parsing', () => {
  it('splits "Title — Company" headers', () => {
    const r = parseResume(`Name Person
name@example.com

Experience
Senior Frontend Engineer — Stripe
Mar 2018 – Dec 2021 · San Francisco
• Did A.
• Did B.
`)
    expect(r.experience[0].title).toBe('Senior Frontend Engineer')
    expect(r.experience[0].company).toBe('Stripe')
    expect(r.experience[0].location).toContain('San Francisco')
    expect(r.experience[0].dateRange).toContain('2018')
    expect(r.experience[0].bullets).toEqual(['Did A.', 'Did B.'])
  })

  it('handles "Title at Company" form', () => {
    const r = parseResume(`Name Person
name@example.com

Experience
Engineer at Acme
2020 – Present
• A.
`)
    expect(r.experience[0].title).toBe('Engineer')
    expect(r.experience[0].company).toBe('Acme')
  })

  it('strips bullet markers: •, -, *, ·, and numeric', () => {
    const r = parseResume(`Name Person
name@example.com

Experience
Engineer — Co
2020 – 2024
•  Bullet dot
-  Bullet dash
*  Bullet star
·  Bullet middle dot
1. Numbered one
2) Numbered two
`)
    expect(r.experience[0].bullets).toEqual([
      'Bullet dot',
      'Bullet dash',
      'Bullet star',
      'Bullet middle dot',
      'Numbered one',
      'Numbered two',
    ])
  })

  it('parses multiple roles separated by blank lines', () => {
    const r = parseResume(`Name Person
name@example.com

Experience
Engineer A — Company A
2020 – 2024
• A1.
• A2.

Engineer B — Company B
2018 – 2020
• B1.
`)
    expect(r.experience.length).toBe(2)
    expect(r.experience[0].company).toBe('Company A')
    expect(r.experience[1].company).toBe('Company B')
  })

  it('canonicalizes "Present", "Current", "Now" in date ranges (parse layer keeps raw)', () => {
    const r = parseResume(`Name Person
name@example.com

Experience
Engineer — Co
2020 – Current
• A.
`)
    // Parser preserves the source; optimizer canonicalizes to "Present".
    expect(r.experience[0].dateRange).toContain('Current')
  })
})

describe('parseResume — skills parsing', () => {
  it('splits skills on commas, pipes, bullets', () => {
    const r = parseResume(`Name Person
name@example.com

Skills
React, TypeScript | Next.js · GraphQL
`)
    expect(r.skills).toContain('React')
    expect(r.skills).toContain('TypeScript')
    expect(r.skills).toContain('Next.js')
    expect(r.skills).toContain('GraphQL')
  })

  it('dedupes case-insensitively while preserving first-seen casing', () => {
    const r = parseResume(`Name Person
name@example.com

Skills
React, react, REACT
`)
    expect(r.skills).toEqual(['React'])
  })
})

describe('parseResume — LinkedIn URL handling', () => {
  it('detects a bare LinkedIn URL and returns a blank-but-shaped resume', () => {
    const r = parseResume('https://www.linkedin.com/in/jordanrivera')
    expect(r.contact.linkedin).toBe('https://www.linkedin.com/in/jordanrivera')
    expect(r.contact.name).toBe('Jordanrivera')
  })

  it('isLinkedInUrlOnly returns true for URLs and false for paste content', () => {
    expect(isLinkedInUrlOnly('https://linkedin.com/in/foo')).toBe(true)
    expect(isLinkedInUrlOnly('linkedin.com/in/foo')).toBe(false)
    expect(isLinkedInUrlOnly('Name\nExperience\nEngineer')).toBe(false)
  })
})

describe('parseResume — empty input', () => {
  it('returns a blank resume with no sections', () => {
    const r = parseResume('')
    expect(r.contact).toEqual({ name: '' })
    expect(r.experience).toEqual([])
    expect(r.skills).toEqual([])
  })
})
