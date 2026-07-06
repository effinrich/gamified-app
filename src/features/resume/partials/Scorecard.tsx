import { css } from 'styled-system/css'
import type { AtsCheck } from '../utils/optimize'

const styles = {
  // ── Filed-report frame (hairline top + bottom, no rounded card) ─────
  frame: css({
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    paddingTop: '14px',
    paddingBottom: '18px',
  }),
  // ── Mono eyebrow + standing-by caption ───────────────────────────────
  eyebrow: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '6px',
  }),
  eyebrowLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  eyebrowMark: css({
    fontFamily: 'mono',
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'fg.subtle',
  }),
  // ── Each checklist row ──────────────────────────────────────────────
  list: css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12px',
  }),
  row: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderTopWidth: '1px',
    borderColor: 'border.subtle',
    borderLeftWidth: '2px',
    borderLeftColor: 'border.subtle',
    paddingLeft: '12px',
    transition: 'border-left-color 200ms ease',
    _hover: {
      borderLeftColor: 'accent.solid',
    },
  }),
  rowLast: css({
    borderBottomWidth: '1px',
    borderColor: 'border.subtle',
  }),
  rowLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.default',
    fontWeight: 600,
  }),
  rowDetail: css({
    fontFamily: 'display',
    fontStyle: 'italic',
    fontSize: '12px',
    color: 'fg.muted',
    lineHeight: 1.5,
    marginTop: '2px',
    letterSpacing: '0',
    textTransform: 'none',
  }),
  rowStatus: (passed: boolean) =>
    css({
      fontFamily: 'mono',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color: passed ? 'fg.muted' : 'accent.solid',
      flexShrink: 0,
    }),
  rowText: css({
    flex: 1,
    minWidth: 0,
  }),
  // ── Standing-by empty state (dashed hairline) ──────────────────────
  standby: css({
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'border.default',
    padding: '40px 24px',
    textAlign: 'center',
  }),
  standbyEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    marginBottom: '10px',
  }),
  standbyLine: css({
    fontFamily: 'display',
    fontSize: 'clamp(16px, 1.6vw, 19px)',
    fontStyle: 'italic',
    color: 'fg.default',
    lineHeight: 1.45,
  }),
}

interface ScorecardProps {
  checks: AtsCheck[]
  passedCount: number
}

/**
 * The "scorecard" reframed as a Compliance · Filed Report sitting beside
 * the typeset preview. Soft Tooling promise: we never tell you a number,
 * never tell you you're failing — we list the boxes an ATS will check and
 * quietly mark which ones yours answer to.
 *
 * Visual treatment: hairline top + bottom frame, mono uppercase labels on
 * the left, fg.muted status on the right. Passed rows say "✓ Present";
 * failed rows invite with a soft "+ Improve" rather than a red mark.
 */
export function Scorecard({ checks, passedCount }: ScorecardProps) {
  if (checks.length === 0) {
    return (
      <div className={styles.standby}>
        <div className={styles.standbyEyebrow}>Standing by</div>
        <div className={styles.standbyLine}>
          Run Optimize to file this report.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.frame}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLabel}>Compliance · Filed Report</span>
        <span className={styles.eyebrowMark} aria-hidden>
          · {passedCount} of {checks.length}
        </span>
      </div>

      <div className={styles.list}>
        {checks.map((c, i) => {
          const isLast = i === checks.length - 1
          return (
            <div
              key={c.id}
              className={`${styles.row}${isLast ? ` ${styles.rowLast}` : ''}`}
            >
              <div className={styles.rowText}>
                <div className={styles.rowLabel}>{c.label}</div>
                <div className={styles.rowDetail}>{c.detail}</div>
              </div>
              <span className={styles.rowStatus(c.passed)} aria-hidden>
                {c.passed ? '✓ Present' : '+ Improve'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
