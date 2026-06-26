import { Suspense } from 'react'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '~/features/dashboard'
import { ErrorPanel } from '~/components/ui/error-panel'

/**
 * `/app/*` route — dashboard shell.
 *
 * Layered error handling:
 *   - `errorComponent` catches render errors in any descendant route. The shell
 *     (sidebar + milestone bar) stays mounted so the user can navigate away.
 *   - `<Suspense>` wraps the Outlet so streamed routes don't tear the chrome.
 *   - The inner `<DashboardLayout>` already has its own providers/context
 *     isolation, so an error in one screen doesn't crash the others.
 */
export const Route = createFileRoute('/app')({
  component: AppLayout,
  errorComponent: AppRouteError,
})

function AppRouteError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.'
  return (
    <DashboardLayout>
      <ErrorPanel
        variant="inline"
        eyebrow="Screen error"
        title="This screen hit a wall."
        body="Something inside this view didn't load. The rest of the app is still here — try another route, or come back."
        detail={message}
        primaryAction={{ to: '/app/resume', label: 'Go to Resume' }}
        secondaryAction={{
          label: 'Reload',
          onClick: () => window.location.reload(),
        }}
      />
    </DashboardLayout>
  )
}

function AppLayout() {
  return (
    <DashboardLayout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  )
}