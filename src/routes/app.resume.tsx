import { createFileRoute } from '@tanstack/react-router'
import { ResumePage } from '~/features/resume'

export const Route = createFileRoute('/app/resume')({
  component: ResumePage,
})
