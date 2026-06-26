import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { MOCK_JOBS, type Job } from '~/shared/jobs'
import { useApplications } from '~/lib/applications'
import type { JobFilter } from './types'
import { filterJobs } from './utils'
import { DiscoverFilters } from './partials/DiscoverFilters'
import { JobCard } from './partials/JobCard'
import { Heading, Text } from '~/components/ui/text'

const pageStyles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
    gap: '16px',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    gap: '16px',
    flexWrap: 'wrap',
  }),
  fadeIn: css({
    animation: 'fadeIn 450ms ease both',
  }),
}

export function DiscoverPage() {
  const [filter, setFilter] = useState<JobFilter>('all')
  const { apply, hasApplied } = useApplications()
  const navigate = useNavigate()

  const jobs = filterJobs(MOCK_JOBS, filter)

  const handleApply = (job: Job) => {
    apply(job)
    navigate({ to: '/app/tracker' })
  }

  return (
    <div className={pageStyles.fadeIn}>
      <div className={pageStyles.header}>
        <div>
          <Heading as="h1" size="lg">Discover</Heading>
          <Text muted style={{ marginTop: '4px' }}>
            Worth-your-time roles, scored for transparency and response rate.
          </Text>
        </div>
        <DiscoverFilters value={filter} onChange={setFilter} />
      </div>

      <div className={pageStyles.grid}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            applied={hasApplied(job)}
            onApply={handleApply}
          />
        ))}
      </div>
    </div>
  )
}
