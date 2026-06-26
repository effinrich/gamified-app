import { createFileRoute } from '@tanstack/react-router'
import { TrackerPage } from '~/features/tracker'

export const Route = createFileRoute('/app/tracker')({
  component: TrackerPage,
})
