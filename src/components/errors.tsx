import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorPanel } from './ui/error-panel'

/**
 * RootErrorBoundary — last-resort catch-all for anything that escapes the
 * TanStack Router error boundaries. Renders a full-viewport branded fallback
 * with a way to retry (reload) or navigate home.
 *
 * Brand voice: no apologies. "Something went sideways." + a way forward.
 */
interface State {
  error: Error | null
}

export class RootErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log to console — swap for Sentry/PostHog/etc. when we wire observability.
    console.error('[RootErrorBoundary]', error, info.componentStack)
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <ErrorPanel
          variant="full"
          eyebrow="Something went sideways"
          title="We hit a snag."
          body="The page didn't load cleanly. Your data is safe — try again, or head back to the home page."
          primaryAction={{ to: '/', label: 'Back to home' }}
          secondaryAction={{ label: 'Reload', onClick: this.handleReload }}
        />
      )
    }
    return this.props.children
  }
}