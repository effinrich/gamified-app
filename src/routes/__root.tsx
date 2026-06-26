import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import pandaCss from '~/index.css?url'
import { RootErrorBoundary } from '~/components/errors'
import { ErrorPanel } from '~/components/ui/error-panel'

/**
 * Root route — html shell, document head, and last-resort error boundary.
 *
 * Two layers of error handling live here:
 *   1. `errorComponent` (route-scoped) — catches render errors thrown by any
 *      descendant route. Renders an in-place full-viewport fallback.
 *   2. `RootErrorBoundary` (component-scoped) — a class-based boundary
 *      wrapping <Outlet />. Catches anything that escapes the route layer
 *      (e.g., errors in suspense, or during client-only effects after mount).
 */
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Fairshot — We run your job search. You pay when it works.',
      },
      {
        name: 'description',
        content:
          'Job search without the shame spiral. No resume scoring. No spam. No subscriptions. Pay when it works.',
      },
      { name: 'theme-color', content: '#f5f4f2' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&display=swap',
      },
      { rel: 'stylesheet', href: pandaCss },
    ],
  }),
  errorComponent: RootRouteError,
  notFoundComponent: NotFoundHere,
  component: RootComponent,
})

function RootRouteError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.'
  return (
    <ErrorPanel
      variant="full"
      eyebrow="Route error"
      title="This route hit a wall."
      body="A piece of the page failed to load. You can try again, or head home."
      detail={message}
      primaryAction={{ to: '/', label: 'Back to home' }}
      secondaryAction={{
        label: 'Reload',
        onClick: () => window.location.reload(),
      }}
    />
  )
}

function NotFoundHere() {
  return (
    <ErrorPanel
      variant="notFound"
      eyebrow="404 · Not found"
      title="That page doesn't exist."
      body="Maybe you typed the URL by hand, or the link drifted. Either way, here's a way back."
      primaryAction={{ to: '/', label: 'Back to home' }}
    />
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <RootErrorBoundary>
        <Outlet />
      </RootErrorBoundary>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}