import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import {
  INITIAL_APPS,
  type Application,
  type Job,
  type Stage,
} from '~/shared/jobs'

interface ApplicationsContextValue {
  applications: Application[]
  apply: (job: Job) => void
  move: (id: number, stage: Stage) => void
  hasApplied: (job: Job) => boolean
  /** 1 = Build, 2 = Apply, 3 = Interview */
  currentMilestone: number
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null)

/**
 * App-wide store for job applications. Lives in src/lib/ (infrastructure) so any
 * feature can share a single source of truth without importing a sibling feature.
 */
export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPS)

  const apply = useCallback((job: Job) => {
    setApplications((apps) => {
      if (apps.some((a) => a.title === job.title && a.company === job.company)) {
        return apps
      }
      const nextId = apps.reduce((max, a) => Math.max(max, a.id), 0) + 1
      return [
        ...apps,
        { id: nextId, title: job.title, company: job.company, stage: 'applied' },
      ]
    })
  }, [])

  const move = useCallback((id: number, stage: Stage) => {
    setApplications((apps) =>
      apps.map((a) => (a.id === id ? { ...a, stage } : a)),
    )
  }, [])

  const value = useMemo<ApplicationsContextValue>(() => {
    const hasApplied = (job: Job) =>
      applications.some((a) => a.title === job.title && a.company === job.company)

    const currentMilestone = applications.some(
      (a) => a.stage === 'interview' || a.stage === 'offer',
    )
      ? 3
      : applications.length > 0
        ? 2
        : 1

    return { applications, apply, move, hasApplied, currentMilestone }
  }, [applications, apply, move])

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  )
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext)
  if (!ctx) {
    throw new Error('useApplications must be used within an ApplicationsProvider')
  }
  return ctx
}
