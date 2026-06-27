import { css } from 'styled-system/css'
import type { Application, Stage } from '~/shared/jobs'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { HStack, Stack } from '~/components/ui/layout'

interface TrackerCardProps {
  application: Application
  prevStage: Stage | null
  nextStage: Stage | null
  onMove: (id: number, stage: Stage) => void
}

const styles = {
  root: css({
    padding: '14px',
    marginBottom: '10px',
    transition: 'all 0.2s',
    _hover: { borderColor: 'border.strong' },
  }),
  title: css({
    fontSize: '14px',
    fontWeight: 600,
    color: 'fg.default',
    lineHeight: '1.3',
  }),
  co: css({
    fontSize: '12px',
    color: 'fg.muted',
  }),
}

export function TrackerCard({
  application,
  prevStage,
  nextStage,
  onMove,
}: TrackerCardProps) {
  return (
    <Card variant="subtle" className={styles.root}>
      <Stack gap="1">
        <div className={styles.title}>{application.title}</div>
        <div className={styles.co}>{application.company}</div>
      </Stack>
      {(prevStage || nextStage) && (
        <HStack gap="2" style={{ marginTop: '10px' }}>
          {prevStage && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onMove(application.id, prevStage)}
            >
              ← Back
            </Button>
          )}
          {nextStage && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => onMove(application.id, nextStage)}
            >
              Next →
            </Button>
          )}
        </HStack>
      )}
    </Card>
  )
}
