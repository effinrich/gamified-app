import { css } from 'styled-system/css'
import type { Application, Stage } from '~/shared/jobs'
import { adjacentStage } from '../utils'
import { TrackerCard } from './TrackerCard'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'

interface TrackerColumnProps {
  stage: Stage
  name: string
  cards: Application[]
  onMove: (id: number, stage: Stage) => void
}

const styles = {
  root: css({
    padding: '20px',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottomWidth: '1px',
    borderColor: 'border.subtle',
  }),
  name: css({
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'fg.muted',
    fontFamily: 'mono',
  }),
  empty: css({
    padding: '40px 12px',
    textAlign: 'center',
    color: 'fg.muted',
    fontSize: '13px',
    fontStyle: 'italic',
    fontFamily: 'display',
    opacity: 0.7,
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
  }),
}

const EMPTY_COPY: Record<Stage, string> = {
  applied: 'Nothing here yet.\nThat’s a kind of progress.',
  screening: 'Silence is data,\nnot failure.',
  interview: 'No conversations\nin motion right now.',
  offer: 'When the moment\ncomes, it lands here.',
}

export function TrackerColumn({ stage, name, cards, onMove }: TrackerColumnProps) {
  const prevStage = adjacentStage(stage, -1)
  const nextStage = adjacentStage(stage, 1)

  return (
    <Card className={styles.root}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <Badge variant="subtle" size="sm">
          {cards.length}
        </Badge>
      </div>
      {cards.length === 0 ? (
        <div className={styles.empty}>{EMPTY_COPY[stage]}</div>
      ) : (
        cards.map((app) => (
          <TrackerCard
            key={app.id}
            application={app}
            prevStage={prevStage}
            nextStage={nextStage}
            onMove={onMove}
          />
        ))
      )}
    </Card>
  )
}
