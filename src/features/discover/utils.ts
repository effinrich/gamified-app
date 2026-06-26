// Pure helpers for the discover feature. No React.

import type { Job } from '~/shared/jobs'
import type { JobFilter } from './types'

const QUALITY_THRESHOLD = 85

export function filterJobs(jobs: Job[], filter: JobFilter): Job[] {
  if (filter === 'all') return jobs
  return jobs.filter((j) => j.transparency >= QUALITY_THRESHOLD)
}

/** Maps a score to its color class — teal when healthy, gold as a soft warning. */
export function scoreClass(value: number, goodAtOrAbove: number): 'good' | 'warning' {
  return value >= goodAtOrAbove ? 'good' : 'warning'
}
