import { css } from 'styled-system/css'
import { STAGES, STAGE_NAMES } from '~/shared/jobs'
import { useApplications } from '~/lib/applications'
import { applicationsInStage } from './utils'
import { TrackerColumn } from './partials/TrackerColumn'
import { Eyebrow } from '~/components/ui/text'

/**
 * `TrackerPage` — the second number of the in-app issue.
 *
 * Editorial-bold treatment:
 *   - Section masthead: mono `Tracker · № 02` chip, 96px accent rule, and
 *     a dateline that names the section (`Pipeline status`).
 *   - Standfirst — display-serif italic-accent lead + muted body — sets up
 *     the spread the way an editor's note would for a status section.
 *   - The kanban is the kanban: a 4-column grid that collapses to 2 then
 *     1 on small viewports, framed with editorial chrome (hairline top +
 *     bottom rules, mono uppercase `№ 01 APPLIED` column headers, mono
 *     `N roles` counts).
 *   - Single orchestrated entrance stagger: masthead → standfirst →
 *     board (140ms / 240ms / 340ms offsets). Cards themselves do not
 *     stagger; the board lands as one editorial block.
 */
export function TrackerPage() {
  const { applications, move } = useApplications()
  const totalCount = applications.length
  const dateline = formatDateline(new Date())

  return (
    <div className={styles.page}>
      {/* Section masthead — Issue chip + 96px accent rule + dateline,
          matching Discover's front-page vocabulary exactly so the two
          pages read as consecutive numbers in the same issue. */}
      <header className={styles.masthead}>
        <div className={styles.mastheadRow}>
          <Eyebrow className={styles.issue}>Tracker · № 02</Eyebrow>
          <span className={styles.rule} aria-hidden />
          <span className={styles.dateline}>{dateline}</span>
        </div>
      </header>

      {/* Opener — italic-accent standfirst + muted body, the way an
          editor's note previews a status section. Capped to a reading
          width so the eye reads it as an introduction, not a body. */}
      <div className={styles.opener}>
        <p className={styles.standfirst}>
          <span className={styles.standfirstLead}>
            Every role, every reply, in one spread.
          </span>{' '}
          Quiet tracking for the part of the search where nothing is
          happening yet. Move things forward when you're ready.
        </p>
      </div>

      {/* Board — the four kanban columns. Horizontal scroll on phone so
          a single column can still be inspected; 2-up on tablet, 4-up on
          desktop. Single staggered entrance for the whole board; cards
          do not animate individually. */}
      <section className={styles.board} aria-label="Application pipeline">
        {STAGES.map((stage) => (
          <TrackerColumn
            key={stage}
            stage={stage}
            name={STAGE_NAMES[stage]}
            cards={applicationsInStage(applications, stage)}
            onMove={move}
          />
        ))}
      </section>

      {/* Footnote — mono dateline-style tally closes the spread. Editorial
          restraint: no chips, no buttons, just the summary line. */}
      <footer className={styles.foot}>
        <span className={styles.footRule} aria-hidden />
        <span className={styles.footText}>
          <span className={styles.footLead}>{totalCount}</span>{' '}
          {totalCount === 1 ? 'application' : 'applications'} in motion across
          the pipeline.
        </span>
      </footer>
    </div>
  )
}

// Mono dateline — mirrors Discover's `Sun · 05 Jul 2026 · …` format so
// the front page and the pipeline spread feel like consecutive numbers.
function formatDateline(d: Date): string {
  const day = d.toLocaleDateString('en-US', { weekday: 'short' })
  const dd = String(d.getDate()).padStart(2, '0')
  const mon = d.toLocaleDateString('en-US', { month: 'short' })
  const yyyy = d.getFullYear()
  return `${day} · ${dd} ${mon} ${yyyy} · Pipeline status`
}

const styles = {
  // Page — lives inside the dashboard shell's <main>, which already pads
  // 40px on desktop. Owns only vertical rhythm.
  page: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  }),
  // Section masthead — same vocabulary as Discover / Hero.
  masthead: css({
    paddingBottom: '14px',
    animation: 'fadeIn 540ms ease both',
  }),
  mastheadRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  }),
  issue: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  rule: css({
    flex: '0 0 96px',
    height: '2px',
    backgroundColor: 'accent.solid',
  }),
  dateline: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  // Opener — standfirst paragraph, capped to a reading width, separated
  // from the board by a hairline rule to signal the spread break.
  opener: css({
    paddingTop: '4px',
    paddingBottom: '40px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    marginBottom: '40px',
    maxWidth: '62ch',
    animation: 'fadeIn 620ms ease both',
    animationDelay: '140ms',
  }),
  standfirst: css({
    fontFamily: 'display',
    fontSize: 'clamp(18px, 1.8vw, 22px)',
    lineHeight: '1.45',
    fontWeight: 400,
    color: 'fg.default',
    textWrap: 'pretty',
    margin: 0,
  }),
  standfirstLead: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  // Board — the four-column grid. Horizontal scroll on phone so a single
  // column can still be inspected; 2-up on tablet, 4-up on desktop. The
  // staggered entrance covers the whole board — cards don't add their own.
  board: css({
    display: 'grid',
    gridTemplateColumns: {
      base: 'repeat(2, minmax(260px, 1fr))',
      md: 'repeat(2, minmax(0, 1fr))',
      lg: 'repeat(4, minmax(0, 1fr))',
    },
    gap: '20px',
    overflowX: { base: 'auto', lg: 'visible' },
    paddingBottom: '24px',
    scrollSnapType: { base: 'x mandatory', lg: 'none' },
    animation: 'fadeIn 700ms ease both',
    animationDelay: '340ms',
  }),
  // Foot — a single hairline + mono summary to close the spread.
  foot: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    paddingTop: '28px',
  }),
  footRule: css({
    flex: '1',
    height: '1px',
    backgroundColor: 'border.default',
  }),
  footText: css({
    fontFamily: 'display',
    fontSize: '14px',
    lineHeight: '1.4',
    color: 'fg.muted',
  }),
  footLead: css({
    fontFamily: 'mono',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.14em',
    color: 'accent.solid',
    textTransform: 'uppercase',
  }),
}
