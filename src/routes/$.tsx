import { createFileRoute } from '@tanstack/react-router'
import { ErrorPanel } from '~/components/ui/error-panel'

/**
 * Catch-all route — handles any path that doesn't match another route.
 *
 * Rendered as a full-page 404 with a way back home. Keeps the brand voice:
 * no apologies, no shame. Just: "That page doesn't exist" + an exit.
 */
export const Route = createFileRoute('/$')({
  component: NotFound,
})

function NotFound() {
  return (
    <ErrorPanel
      variant="notFound"
      eyebrow="404 · Not found"
      title="That page doesn't exist."
      body="Maybe the link drifted, or you typed the URL by hand. Either way, here's a way back to the home page."
      primaryAction={{ to: '/', label: 'Back to home' }}
    />
  )
}