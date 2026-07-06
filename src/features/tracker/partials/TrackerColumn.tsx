import { css } from 'styled-system/css'
import type { Application, Stage } from '~/shared/jobs'
import { adjacentStage } from '../utils'
import { TrackerCard } from './TrackerCard'

interface TrackerColumnProps {
  stage: Stage
  name: string
  cards: Application[]
  onMove: (id: number, stage: Stage) => void
}

// Per-stage magazine number — `APPLIED · № 01`, `SCREENING · № 02`, etc.
// Kept here (not in `types.ts`) so the numbering is owned by the partial
// and is one-indexed to match the dashboard's `01 / 02 / 03` ToC cadence.
const COLUMN_NUMBERS: Record<Stage, string> = {
  applied: '№ 01',
  screening: '№ 02',
  interview: '№ 03',
  offer: '№ 04',
}

const COLUMN_LABELS: Record<Stage, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
}

const styles = {
  // Column frame — a hairline block. Top + bottom rules frame the
  // editorial column; the inset surface lets cards visually float inside.
  frame: css({
    borderWidth: '1px',
    borderColor: 'border.default',
    backgroundColor: 'bg.surface',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '400px',
    scrollSnapAlign: { base: 'start', lg: 'none' },
  }),
  // Header row — `APPLIED · № 01` mono uppercase label, hairline rule,
  // mono `N roles` count. No badge fills, no chips.
  header: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '14px 16px 12px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
  }),
  label: css({
    fontFamily: 'mono',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.default',
  }),
  num: css({
    color: 'accent.solid',
  }),
  count: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  // Body — inset surface block so cards visually float inside the frame.
  body: css({
    padding: '14px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  }),
  // Empty state — mono `No roles standing by.` rather than centered copy.
  empty: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
    padding: '40px 4px',
  }),
}

// Render the column header label. Split so the numeral can pick up the
// accent color independently of the label — same gesture the Discover
// `issue` chip uses (`Discover · № 01`).
function ColumnLabel({ stage }: { stage: Stage }) {
  return (
    <span className={styles.label}>
      <span>{COLUMN_LABELS[stage].toUpperCase()}</span>
      {' · '}
      <span className={styles.num}>{COLUMN_NUMBERS[stage]}</span>
    </span>
  )
}

export function TrackerColumn({
  stage,
  name,
  cards,
  onMove,
}: TrackerColumnProps) {
  const prevStage = adjacentStage(stage, -1)
  const nextStage = adjacentStage(stage, 1)
  const count = cards.length
  const countLabel = `${count} ${count === 1 ? 'role' : 'roles'}`

  return (
    <section className={styles.frame} aria-label={name} data-stage={stage}>
      <header className={styles.header}>
        <ColumnLabel stage={stage} />
        <span className={styles.count}>{countLabel}</span>
      </header>

      <div className={styles.body}>
        {cards.length === 0 ? (
          <div className={styles.empty}>No roles standing by.</div>
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
      </div>
    </section>
  )
}
