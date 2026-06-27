import { css } from 'styled-system/css'
import { STAGES, STAGE_NAMES } from '~/shared/jobs'
import { useApplications } from '~/lib/applications'
import { applicationsInStage } from './utils'
import { TrackerColumn } from './partials/TrackerColumn'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'

const pageStyles = {
  fadeIn: css({
    animation: 'fadeIn 450ms ease both',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    gap: '16px',
    flexWrap: 'wrap',
  }),
  board: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
    gap: '16px',
  }),
}

export function TrackerPage() {
  const { applications, move } = useApplications()

  return (
    <div className={pageStyles.fadeIn}>
      <div className={pageStyles.header}>
        <div>
          <Heading as="h1" textStyle="xl">Tracker</Heading>
          <Text variant="muted" style={{ marginTop: '4px' }}>
            Quietly track where things stand. No pressure.
          </Text>
        </div>
      </div>

      <div className={pageStyles.board}>
        {STAGES.map((stage) => (
          <TrackerColumn
            key={stage}
            stage={stage}
            name={STAGE_NAMES[stage]}
            cards={applicationsInStage(applications, stage)}
            onMove={move}
          />
        ))}
      </div>
    </div>
  )
}
