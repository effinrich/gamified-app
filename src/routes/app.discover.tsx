import { createFileRoute } from '@tanstack/react-router'
import { DiscoverPage } from '~/features/discover'

export const Route = createFileRoute('/app/discover')({
  component: DiscoverPage,
})
