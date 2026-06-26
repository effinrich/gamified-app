import { css } from 'styled-system/css'
import type { AtsCheck } from '../utils/optimize'
import { Card } from '~/components/ui/card'
import { Eyebrow } from '~/components/ui/text'

const styles = {
  list: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '12px',
  }),
  row: css({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '13px',
    lineHeight: '1.5',
  }),
  mark: css({
    flexShrink: 0,
    width: '20px',
    height: '20px',
    borderRadius: '999px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
    marginTop: '1px',
  }),
  pass: css({
    backgroundColor: 'accent.subtle',
    color: 'accent.solid',
  }),
  fail: css({
    backgroundColor: 'bg.surface',
    color: 'fg.muted',
    border: '1px solid token(colors.border.subtle)',
  }),
  detail: css({
    color: 'fg.muted',
    fontSize: '12px',
    marginTop: '2px',
    fontFamily: 'display',
    fontStyle: 'italic',
  }),
  headline: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '8px',
  }),
  count: css({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'fg.muted',
  }),
}

interface ScorecardProps {
  checks: AtsCheck[]
  passedCount: number
}

/**
 * The "scorecard" — a checklist, not a score. Soft Tooling promise:
 * we never tell you a number, never tell you you're failing. We tell
 * you which boxes an ATS will be looking for, and whether yours are
 * checked.
 */
export function Scorecard({ checks, passedCount }: ScorecardProps) {
  return (
    <Card>
      <Card.Header>
        <div className={styles.headline}>
          <div>
            <Card.Title>ATS checklist</Card.Title>
            <Card.Description>
              A pass means an ATS will read it without losing anything.
            </Card.Description>
          </div>
          <span className={styles.count}>
            {passedCount} of {checks.length}
          </span>
        </div>
      </Card.Header>
      <div className={styles.list}>
        {checks.map((c) => (
          <div key={c.id} className={styles.row}>
            <span className={`${styles.mark} ${c.passed ? styles.pass : styles.fail}`}>
              {c.passed ? '✓' : '○'}
            </span>
            <div style={{ flex: 1 }}>
              <div>{c.label}</div>
              <div className={styles.detail}>{c.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <Eyebrow style={{ marginTop: '20px', marginBottom: '4px' }}>
        Why no score?
      </Eyebrow>
      <p style={{ fontSize: '12px', color: 'var(--colors-fg-muted, #888)', fontStyle: 'italic', lineHeight: 1.55 }}>
        Resume scores don't predict callbacks. Pass the boxes, then let the
        words do the work.
      </p>
    </Card>
  )
}
