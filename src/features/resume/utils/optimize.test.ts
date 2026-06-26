import { describe, expect, it } from 'vitest'
import { optimizeResume, atsChecks } from './optimize'
import type { Resume } from '../types'

const baseResume: Resume = {
  contact: {
    name: 'jordan rivera',
    email: 'jordan@example.com',
    phone: '(415) 555-0123',
    location: 'San Francisco, CA',
    linkedin: 'https://www.linkedin.com/in/jordanrivera',
  },
  summary: '  Frontend engineer with 8 years of experience.  ',
  experience: [
    {
      title: 'senior frontend engineer',
      company: 'Stripe',
      location: 'remote',
      dateRange: 'Mar 2018 - Dec 2021',
      bullets: [
        'Was responsible for managing the redesign',
        'helped with the launch',
        'Built the dashboard',
        'Built the dashboard',
      ],
    },
    {
      title: 'staff engineer',
      company: 'linear',
      dateRange: 'jan 2022 – current',
      bullets: [
        'Led migration of legacy app',
        'Cut bundle size by 42%',
      ],
    },
  ],
  education: [
    { school: 'UC Berkeley', degree: 'B.S.', field: 'Computer Science' },
  ],
  skills: ['React', 'react', 'TypeScript', 'TypeScript', 'Next.js'],
  extras: [],
}

describe('optimizeResume — contact normalization', () => {
  it('preserves email casing and trims whitespace', () => {
    const out = optimizeResume(baseResume)
    expect(out.contact.email).toBe('jordan@example.com')
  })

  it('title-cases names that came in fully lowercase', () => {
    const out = optimizeResume(baseResume)
    expect(out.contact.name).toBe('Jordan Rivera')
  })

  it('leaves mixed-case names alone ("McDonald", "del Toro")', () => {
    const r = optimizeResume({
      ...baseResume,
      contact: { ...baseResume.contact, name: 'Toni McDonald' },
    })
    expect(r.contact.name).toBe('Toni McDonald')
  })

  it('capitalizes job titles, leaves company names alone', () => {
    const out = optimizeResume(baseResume)
    expect(out.experience[0].title).toBe('Senior frontend engineer')
    expect(out.experience[0].company).toBe('Stripe')
  })

  it('canonicalizes date ranges (en-dash, "Current" → "Present")', () => {
    const out = optimizeResume(baseResume)
    expect(out.experience[1].dateRange).toBe('jan 2022 – Present')
  })
})

describe('optimizeResume — bullet reframing', () => {
  it('replaces passive "Was responsible for" prefixes', () => {
    const out = optimizeResume(baseResume)
    expect(out.experience[0].bullets[0]).toMatch(/^Managing the redesign/)
  })

  it('replaces "helped with" with "Contributed to"', () => {
    const out = optimizeResume(baseResume)
    expect(out.experience[0].bullets[1]).toMatch(/^Contributed to/)
  })

  it('dedupes identical bullets', () => {
    const out = optimizeResume(baseResume)
    expect(out.experience[0].bullets.filter((b) => b.toLowerCase().includes('dashboard')).length).toBe(1)
  })

  it('preserves the candidate\'s words — does not invent verbs', () => {
    const out = optimizeResume(baseResume)
    expect(out.experience[1].bullets[0]).toBe('Led migration of legacy app')
  })
})

describe('optimizeResume — skills', () => {
  it('dedupes skills case-insensitively', () => {
    const out = optimizeResume(baseResume)
    expect(out.skills).toEqual(['React', 'TypeScript', 'Next.js'])
  })
})

describe('optimizeResume — summary', () => {
  it('collapses whitespace and capitalizes first letter', () => {
    const out = optimizeResume(baseResume)
    expect(out.summary).toBe('Frontend engineer with 8 years of experience.')
  })
})

describe('optimizeResume — purity', () => {
  it('does not mutate the input', () => {
    const before = JSON.parse(JSON.stringify(baseResume))
    optimizeResume(baseResume)
    expect(baseResume).toEqual(before)
  })
})

describe('atsChecks', () => {
  it('flags a missing email on the contact line', () => {
    const r = optimizeResume({ ...baseResume, contact: { name: 'Anon' } })
    const c = atsChecks(r).find((x) => x.id === 'contact')
    expect(c?.passed).toBe(false)
  })

  it('passes contact when name + email present', () => {
    const r = optimizeResume(baseResume)
    const c = atsChecks(r).find((x) => x.id === 'contact')
    expect(c?.passed).toBe(true)
  })

  it('reports quantified bullet count vs total', () => {
    const r = optimizeResume(baseResume)
    const c = atsChecks(r).find((x) => x.id === 'quantified')
    expect(c?.detail).toMatch(/\d+ of \d+ bullets quantify impact/)
  })

  it('passes skills check with 5+ skills', () => {
    const r = optimizeResume({
      ...baseResume,
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Playwright'],
    })
    const c = atsChecks(r).find((x) => x.id === 'skills')
    expect(c?.passed).toBe(true)
  })

  it('flags weak leading verbs', () => {
    const weak: Resume = {
      ...baseResume,
      experience: [
        {
          title: 'Engineer',
          company: 'Co',
          bullets: ['Worked on the thing', 'Worked on another thing'],
        },
      ],
    }
    const c = atsChecks(weak).find((x) => x.id === 'verbs')
    expect(c?.passed).toBe(false)
  })
})
