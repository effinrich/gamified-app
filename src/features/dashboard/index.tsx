import type { ReactNode } from 'react'
import { css } from 'styled-system/css'
import { ApplicationsProvider, useApplications } from '~/lib/applications'
import { MILESTONES, NAV_ITEMS, milestoneState } from './utils'
import { Sidebar } from './partials/Sidebar'
import { MilestoneBar } from './partials/MilestoneBar'

const layoutStyles = {
  app: css({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'bg.canvas',
    backgroundImage:
      'radial-gradient(ellipse 1200px 600px at 50% -10%, token(colors.teal.50), transparent 60%)',
    backgroundAttachment: 'fixed',
  }),
  main: css({
    flex: 1,
    padding: '32px 40px',
    maxWidth: '1100px',
    width: '100%',
  }),
}

/**
 * Dashboard layout. Mounts the shared applications store, then composes the
 * chrome (sidebar + milestone bar) around the routed screen passed as `children`.
 */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ApplicationsProvider>
      <DashboardChrome>{children}</DashboardChrome>
    </ApplicationsProvider>
  )
}

function DashboardChrome({ children }: { children: ReactNode }) {
  const { applications, currentMilestone } = useApplications()

  const steps = MILESTONES.map((m) => ({
    ...m,
    ...milestoneState(m.step, currentMilestone),
  }))

  return (
    <div className={layoutStyles.app}>
      <Sidebar items={NAV_ITEMS} applicationCount={applications.length} />
      <main className={layoutStyles.main}>
        <MilestoneBar steps={steps} />
        {children}
      </main>
    </div>
  )
}
