import { css } from 'styled-system/css'
import { STAGE_NAMES, type Application, type Stage } from '~/shared/jobs'

interface TrackerCardProps {
  application: Application
  prevStage: Stage | null
  nextStage: Stage | null
  onMove: (id: number, stage: Stage) => void
}

const styles = {
  // Root — hairline-framed classified block. The top rule turns
  // `accent.solid` on hover so the card reads as the focused entry
  // without competing with the column chrome.
  root: css({
    backgroundColor: 'bg.canvas',
    borderWidth: '1px',
    borderColor: 'border.default',
    borderTopWidth: '1px',
    borderTopColor: 'border.default',
    padding: '14px 14px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transition:
      'background-color 200ms ease, border-top-color 200ms ease, border-color 200ms ease',
    _hover: {
      borderTopColor: 'accent.solid',
      backgroundColor: 'bg.surface',
    },
    _focusWithin: {
      borderTopColor: 'accent.solid',
    },
  }),
  // Eyebrow — mono uppercase `№ 007 · Stripe`. Numeral picks up the
  // accent color so the entry marker is unambiguous.
  eyebrowRow: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  eyebrowNum: css({
    color: 'accent.solid',
    fontWeight: 600,
  }),
  eyebrowId: css({
    color: 'fg.muted',
    fontWeight: 600,
  }),
  eyebrowDot: css({
    color: 'fg.subtle',
  }),
  eyebrowCompany: css({
    color: 'fg.muted',
  }),
  // Title — display serif, smaller than JobCard because cards live
  // inside a column. Ceiling 28px keeps the column rhythm gentle.
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(20px, 2vw, 28px)',
    fontWeight: 500,
    lineHeight: '1.05',
    letterSpacing: '-0.02em',
    color: 'fg.default',
    margin: 0,
    textWrap: 'balance',
  }),
  // Footer — single mono line `Stage · Interview` plus a right-aligned
  // hairline rule that ties to the move controls beneath it.
  footer: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '12px',
    borderTopWidth: '1px',
    borderColor: 'border.subtle',
    paddingTop: '10px',
  }),
  stage: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  stageName: css({
    color: 'fg.default',
    fontWeight: 600,
  }),
  // Move controls — `← Back` / `Next →` rendered as a mono uppercase
  // underline link + a quiet ghost button. Never filled, never rounded.
  controls: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    paddingTop: '4px',
  }),
  // Quiet ghost button — no fill, no border-radius, no shadow.
  ghostBtn: css({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: '2px 0',
    cursor: 'pointer',
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    transition: 'color 200ms ease',
    _hover: { color: 'accent.solid' },
    _focusVisible: {
      outline: '2px solid token(colors.accent.solid)',
      outlineOffset: '2px',
    },
  }),
  // Underline link — the forward move. Mono uppercase with a thin
  // baseline rule that flips to accent on hover.
  linkCta: css({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: '2px 0',
    cursor: 'pointer',
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.default',
    fontWeight: 600,
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    paddingBottom: '2px',
    transition: 'color 200ms ease, border-color 200ms ease',
    _hover: { color: 'accent.solid', borderColor: 'accent.solid' },
    _focusVisible: {
      outline: '2px solid token(colors.accent.solid)',
      outlineOffset: '2px',
    },
  }),
}

export function TrackerCard({
  application,
  prevStage,
  nextStage,
  onMove,
}: TrackerCardProps) {
  const stageName = STAGE_NAMES[application.stage]
  return (
    <article className={styles.root} aria-label={`${application.title} at ${application.company}`}>
      {/* Eyebrow — `№ 007 · Stripe`. Numeral picks up the accent. */}
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrowNum}>№</span>
        <span className={styles.eyebrowId}>
          {application.id.toString().padStart(3, '0')}
        </span>
        <span className={styles.eyebrowDot} aria-hidden>
          ·
        </span>
        <span className={styles.eyebrowCompany}>{application.company}</span>
      </div>

      {/* Title — display serif, clamp 20–28px. */}
      <h4 className={styles.title}>{application.title}</h4>

      {/* Footer — mono `Stage · {stageName}`, plus the move controls. */}
      <div className={styles.footer}>
        <span className={styles.stage}>
          Stage · <span className={styles.stageName}>{stageName}</span>
        </span>
      </div>

      {(prevStage || nextStage) && (
        <div className={styles.controls}>
          {prevStage && (
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => onMove(application.id, prevStage)}
              aria-label={`Move ${application.title} to ${STAGE_NAMES[prevStage]}`}
            >
              ← Back
            </button>
          )}
          {nextStage && (
            <button
              type="button"
              className={styles.linkCta}
              onClick={() => onMove(application.id, nextStage)}
              aria-label={`Move ${application.title} to ${STAGE_NAMES[nextStage]}`}
            >
              Next →
            </button>
          )}
        </div>
      )}
    </article>
  )
}
