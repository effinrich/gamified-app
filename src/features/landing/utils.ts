// Static marketing content. Pure data — no React.

import type { PhilosophyPair, PricingTier, Problem, Step } from './types'

export const PROBLEMS: Problem[] = [
  {
    icon: '📉',
    title: 'Resume shaming',
    desc: 'Every builder scores you down. "Weak action verbs." "Missing keywords." Your document is never good enough.',
  },
  {
    icon: '🤖',
    title: 'Spray-and-pray bots',
    desc: 'Auto-apply tools fire generic apps into the void. Low response rates. Wasted time. Damaged reputation.',
  },
  {
    icon: '💸',
    title: 'Pay for hope',
    desc: '$20/month for a template. $40/month for auto-apply. The bill keeps coming. The job doesn’t.',
  },
]

export const STEPS: Step[] = [
  {
    num: '01',
    title: 'Input',
    desc: 'Upload your LinkedIn or paste your background. Tell us your target roles, locations, and salary range.',
  },
  {
    num: '02',
    title: 'Discover',
    desc: 'We scan 10+ job boards, filter for quality, and score postings on transparency, response rate, and fit.',
  },
  {
    num: '03',
    title: 'Tailor',
    desc: 'For each role, we restructure your resume and write a genuine cover letter — not keyword stuffing.',
  },
  {
    num: '04',
    title: 'Submit & Track',
    desc: 'Auto-apply where possible. One-click where not. Track every outcome in a quiet, no-shame dashboard.',
  },
]

export const PRICING: PricingTier[] = [
  {
    label: 'Milestone 01',
    price: { amount: '$29' },
    name: 'Build & Optimize',
    desc: 'We build your base resume and LinkedIn from your background. Optimized for humans and parsers. Yours to keep.',
    meta: 'One-time · Instant',
    featured: false,
  },
  {
    label: 'Milestone 02',
    price: { amount: '$49', unit: '/ 50 apps' },
    name: 'Apply at Scale',
    desc: 'We find roles, tailor each application, and submit on your behalf. Real customization per job, not mail merge.',
    meta: 'Pay as you go · No expiry',
    featured: true,
  },
  {
    label: 'Milestone 03',
    price: { amount: '$99' },
    name: 'Interview Unlocked',
    desc: 'Report an interview and unlock premium features: interview prep, salary negotiation coach, and offer review.',
    meta: 'Voluntary · Unlocks phase',
    featured: false,
  },
]

export const PHILOSOPHY: PhilosophyPair[] = [
  { q: 'What other tools say', a: '"Your resume scores 42/100. Weak action verbs."' },
  { q: 'What we say', a: '"Here’s a stronger framing of what you actually did."' },
  { q: 'What other tools say', a: '"You applied to 200 jobs this week!"' },
  { q: 'What we say', a: '"12 quality applications to roles that fit. 3 responses."' },
  { q: 'What other tools say', a: '"Your subscription renews tomorrow."' },
  { q: 'What we say', a: '"You haven’t paid us in three months. That’s fine."' },
]
