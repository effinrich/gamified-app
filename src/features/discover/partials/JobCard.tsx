import { css } from 'styled-system/css'
import type { Job } from '~/shared/jobs'
import { scoreClass } from '../utils'
import { Button } from '~/components/ui/button'

/**
 * `JobCard` — a single classified ad in the discover spread.
 *
 * Editorial-bold treatment:
 *   - No rounded card chrome. The card is a hairline-framed block: a
 *     `border.default` top rule, a `border.subtle` bottom rule. The top
 *     rule turns `accent.solid` on hover to signal the card is the
 *     focused entry in the column.
 *   - Mono uppercase eyebrow `N° 001 · $180–240k` on the first line —
 *     the `N°` numeral is the issue front-page's way to mark an entry.
 *   - Role title becomes a display-serif, tracking-tight headline
 *     (clamp 24–36px). Tracking-tight + balance so titles wrap to a
 *     typographically even second line.
 *   - `Company · Location` collapses to a single mono line beneath the
 *     title — classic classifieds formatting.
 *   - Tags render as mono uppercase hairline-pill labels, not filled
 *     chips. Pill here means a 1px outline + small padding, never a
 *     rounded badge fill.
 *   - `Apply` is a sharp `accent.solid`-tinted CTA in mono uppercase;
 *     `Save` is a quiet mono underline link that fills on hover.
 *   - Scores (`Transparency`, `Response`, `Fit`) keep their mono tabular
 *     numerals but move to a hairline-framed meta strip at the foot of
 *     the card — the way a classified footer might read.
 *   - A single 200ms background / border transition on hover. No
 *     entrance stagger — the issue front-page settles as a single
 *     editorial block, not a deck of separate cards.
 */
interface JobCardProps {
  job: Job
  applied: boolean
  onApply: (job: Job) => void
}

function Score({
  value,
  label,
  goodAt,
}: {
  value: number
  label: string
  goodAt: number
}) {
  const display = label === 'Response' ? `${value}%` : value.toString()
  return (
    <div className={styles.scoreBlock}>
      <div className={styles.scoreNum(scoreClass(value, goodAt))}>
        {display}
      </div>
      <div className={styles.scoreLabel}>{label}</div>
    </div>
  )
}

export function JobCard({ job, applied, onApply }: JobCardProps) {
  return (
    <article className={styles.root}>
      {/* Eyebrow row — `N°` numeral + salary as the magazine-style entry
          marker. The salary is the most legible commercial fact and earns
          the same line. */}
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrowNum}>N°</span>
        <span className={styles.eyebrowId}>{job.id.toString().padStart(3, '0')}</span>
        <span className={styles.eyebrowDot} aria-hidden>
          ·
        </span>
        <span className={styles.eyebrowSalary}>{job.salary}</span>
      </div>

      {/* Title + company + location — the classified copy. */}
      <div className={styles.titleBlock}>
        <h3 className={styles.title}>{job.title}</h3>
        <div className={styles.company}>
          {job.company} · {job.location}
        </div>
      </div>

      {/* Tag list — mono uppercase hairline pills. */}
      {job.tags.length > 0 && (
        <ul className={styles.tagList} aria-label="Role stack">
          {job.tags.map((t) => (
            <li key={t} className={styles.tag}>
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* Score strip — mono tabular numerals in a hairline-framed footer. */}
      <div className={styles.scoreStrip}>
        <Score value={job.transparency} label="Transparency" goodAt={80} />
        <span className={styles.scoreDivider} aria-hidden />
        <Score value={job.response} label="Response" goodAt={60} />
        <span className={styles.scoreDivider} aria-hidden />
        <Score value={job.fit} label="Fit" goodAt={80} />
      </div>

      {/* Action row — Apply is the primary mono CTA, Save is a mono
          underline link. No rounded buttons, no fill. */}
      <div className={styles.actions}>
        {applied ? (
          <span className={styles.applied}>✓ Applied</span>
        ) : (
          <>
            <Button
              variant="solid"
              size="sm"
              onClick={() => onApply(job)}
              className={styles.applyCta}
            >
              Apply
            </Button>
            <button
              type="button"
              className={styles.saveCta}
              aria-label={`Save ${job.title} at ${job.company}`}
            >
              Save
            </button>
          </>
        )}
      </div>
    </article>
  )
}

const styles = {
  // Root — hairline-framed classified block. Top rule is the structural
  // anchor; bottom rule is lighter so the card's foot is the score strip,
  // not the chrome.
  root: css({
    backgroundColor: 'bg.canvas',
    borderTopWidth: '1px',
    borderTopColor: 'border.default',
    borderBottomWidth: '1px',
    borderBottomColor: 'border.subtle',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '24px 4px 22px',
    transition: 'background-color 200ms ease, border-top-color 200ms ease',
    _hover: {
      borderTopColor: 'accent.solid',
      backgroundColor: 'bg.surface',
    },
  }),
  // Eyebrow — mono uppercase `N° 001 · $180–240k` style. The `N°` is the
  // fixed glyph; the ID is zero-padded so IDs sort visually.
  eyebrowRow: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    fontFamily: 'mono',
    fontSize: '11px',
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
  eyebrowSalary: css({
    color: 'fg.muted',
  }),
  // Title block — the magazine's display serif headline. Clamp ceiling
  // keeps the card readable on a wide grid without overwhelming the
  // column; the bottom is small enough that two cards in a row both feel
  // generous.
  titleBlock: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }),
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(24px, 2.4vw, 36px)',
    fontWeight: 500,
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color: 'fg.default',
    margin: 0,
    textWrap: 'balance',
  }),
  company: css({
    fontFamily: 'mono',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  // Tag list — flat horizontal stack of mono uppercase hairline pills.
  // No fill, no border-radius rounding — just type and a 1px outline.
  tagList: css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  }),
  tag: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    borderWidth: '1px',
    borderColor: 'border.default',
    padding: '4px 8px',
    lineHeight: 1,
  }),
  // Score strip — the classified footer. Three mono-numeric blocks with
  // hairline dividers between them, in a single hairline-framed row.
  scoreStrip: css({
    display: 'flex',
    alignItems: 'stretch',
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderColor: 'border.subtle',
    padding: '12px 0',
  }),
  scoreBlock: css({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
  }),
  scoreNum: (kind: 'good' | 'warning') =>
    css({
      fontFamily: 'mono',
      fontSize: '18px',
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1,
      color: kind === 'good' ? 'green.fg' : 'amber.fg',
    }),
  scoreLabel: css({
    fontFamily: 'mono',
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  scoreDivider: css({
    width: '1px',
    backgroundColor: 'border.subtle',
    margin: '0 16px',
  }),
  // Action row — a single horizontal line at the foot. Apply is the
  // primary CTA (sharp accent-tinted); Save is a quiet mono underline
  // link that fills on hover.
  actions: css({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  }),
  applyCta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    fontWeight: 600,
  }),
  saveCta: css({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    paddingBottom: '2px',
    transition: 'color 200ms ease, border-color 200ms ease',
    _hover: { color: 'accent.solid', borderColor: 'accent.solid' },
  }),
  applied: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
}
