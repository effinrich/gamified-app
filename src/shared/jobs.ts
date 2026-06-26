// Shared job-search domain — types and seed data used across features.
// Lives in src/shared/ because multiple features (discover, tracker, dashboard)
// and the app-wide store in src/lib/ all depend on it.

export type Stage = 'applied' | 'screening' | 'interview' | 'offer'

export interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  transparency: number
  response: number
  fit: number
  tags: string[]
}

export interface Application {
  id: number
  title: string
  company: string
  stage: Stage
}

export const MOCK_JOBS: Job[] = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Stripe', location: 'Remote', salary: '$180–240k', transparency: 92, response: 78, fit: 88, tags: ['React', 'TypeScript'] },
  { id: 2, title: 'Staff Engineer', company: 'Vercel', location: 'Remote', salary: '$200–280k', transparency: 85, response: 65, fit: 82, tags: ['Next.js', 'Edge'] },
  { id: 3, title: 'Product Engineer', company: 'Linear', location: 'SF / Remote', salary: '$160–220k', transparency: 70, response: 45, fit: 75, tags: ['React', 'Design'] },
  { id: 4, title: 'Frontend Lead', company: 'Notion', location: 'NY / Remote', salary: '$170–230k', transparency: 88, response: 55, fit: 80, tags: ['React', 'Performance'] },
  { id: 5, title: 'UI Engineer', company: 'Figma', location: 'SF / Remote', salary: '$150–200k', transparency: 90, response: 72, fit: 85, tags: ['Canvas', 'WebGL'] },
  { id: 6, title: 'Senior Full Stack', company: 'Supabase', location: 'Remote', salary: '$140–190k', transparency: 95, response: 60, fit: 70, tags: ['Postgres', 'Open Source'] },
]

export const INITIAL_APPS: Application[] = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Stripe', stage: 'interview' },
  { id: 2, title: 'Staff Engineer', company: 'Vercel', stage: 'screening' },
  { id: 3, title: 'Product Engineer', company: 'Linear', stage: 'applied' },
  { id: 4, title: 'UI Engineer', company: 'Figma', stage: 'offer' },
]

export const STAGES: Stage[] = ['applied', 'screening', 'interview', 'offer']

export const STAGE_NAMES: Record<Stage, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
}
