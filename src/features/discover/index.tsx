import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { MOCK_JOBS, type Job } from '~/shared/jobs'
import { useApplications } from '~/lib/applications'
import type { JobFilter } from './types'
import { filterJobs } from './utils'
import { DiscoverFilters } from './partials/DiscoverFilters'
import { JobCard } from './partials/JobCard'
import { Eyebrow, Text } from '~/components/ui/text'

/**
 * `DiscoverPage` — the front page of the in-app issue.
 *
 * Editorial-bold treatment:
 *   - Section masthead with mono `Discover · № 01` chip, 96px accent rule,
 *     and a dateline that names the dataset (mm jobs in the open web).
 *   - Asymmetric `232px 1fr` gutter-pinned grid: a magazine "Contents —
 *     Filter" rail on the left, results column on the right. This is the
 *     page-level rail — it sits *inside* the route shell's ToC sidebar,
 *     not on top of it.
 *   - Oversized display headline (clamp 40–80px) with italic-accent on a
 *     single key word (`live.`). Standfirst follows the Hero's
 *     italic-accent-lead pattern.
 *   - Results column framed by a hairline + mono `Live · Sorted by Fit`
 *     eyebrow — JobCards themselves stay untouched for this pass.
 *   - Empty / loading states render with editorial restraint (mono
 *     `Standing by…`) rather than a centered spinner.
 *
 * Single file scope: this pass does not touch `DiscoverFilters` or
 * `JobCard` — those will be reworked in subsequent rounds.
 */
export function DiscoverPage() {
  const [filter, setFilter] = useState<JobFilter>('all')
  const { apply, hasApplied } = useApplications()
  const navigate = useNavigate()

  const jobs = filterJobs(MOCK_JOBS, filter)
  const jobCount = MOCK_JOBS.length
  const dateline = formatDateline(new Date())

  const handleApply = (job: Job) => {
    apply(job)
    navigate({ to: '/app/tracker' })
  }

  return (
    <div className={styles.page}>
      {/* Section masthead — anchored to the page content area, sits below
          the dashboard shell's masthead. Issue chip + 96px accent rule +
          dateline establish this as the front page of the in-app issue. */}
      <header className={styles.masthead}>
        <div className={styles.mastheadRow}>
          <Eyebrow className={styles.issue}>Discover · № 01</Eyebrow>
          <span className={styles.rule} aria-hidden />
          <span className={styles.dateline}>{dateline}</span>
        </div>
      </header>

      {/* Headline + standfirst — the opening front-page spread. The italic
          accent on `live.` borrows the Hero's title-em gesture without
          copying it. */}
      <div className={styles.opener}>
        <h1 className={styles.headline}>
          Roles worth your <em className={styles.headlineEm}>time,</em>{' '}
          scored in the <em className={styles.headlineEm}>open.</em>
        </h1>
        <p className={styles.standfirst}>
          <span className={styles.standfirstLead}>No black-box rankings.</span>{' '}
          Every listing shows its transparency, response rate, and fit — so you
          can decide what 'worth it' means to you.
        </p>
      </div>

      {/* Body grid — gutter-pinned 232px filter rail + results column.
          Single orchestrated entrance stagger; only the opener + rail + grid
          head animate on mount. The page settles as one editorial block — no
          per-card stagger (kept consistent with the editorial rest rule). */}
      <div className={styles.body}>
        <aside className={styles.rail} aria-label="Discover filters">
          <div className={styles.railHead}>
            <span className={styles.railEyebrow}>Contents — Filter</span>
            <span className={styles.railVol}>Vol. II</span>
          </div>
          <div className={styles.railRule} aria-hidden />
          <div className={styles.railBody}>
            <Text variant="muted" className={styles.railIntro}>
              Slice the issue. Sorted by transparency unless noted.
            </Text>
            <DiscoverFilters value={filter} onChange={setFilter} />
          </div>
          <div className={styles.railRule} aria-hidden />
          <div className={styles.railFoot}>
            <span className={styles.railFootNum}>N°</span>
            <span className={styles.railFootText}>
              {jobCount} listings in this issue. Refreshed when the open web moves.
            </span>
          </div>
        </aside>

        <section className={styles.results} aria-label="Open roles">
          <div className={styles.resultsHead}>
            <span className={styles.resultsEyebrow}>
              Live · Sorted by Fit
            </span>
            <span className={styles.resultsCount}>
              Showing {jobs.length} {jobs.length === 1 ? 'role' : 'roles'}
            </span>
          </div>

          {jobs.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyEyebrow}>Standing by…</span>
              <span className={styles.emptyText}>
                Nothing in this slice yet. Try another filter.
              </span>
            </div>
          ) : (
            <div className={styles.grid}>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  applied={hasApplied(job)}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

// Mono dateline — mirrors the shell's format so the front page and the
// masthead read as one continuous publication.
function formatDateline(d: Date): string {
  const day = d.toLocaleDateString('en-US', { weekday: 'short' })
  const dd = String(d.getDate()).padStart(2, '0')
  const mon = d.toLocaleDateString('en-US', { month: 'short' })
  const yyyy = d.getFullYear()
  return `${day} · ${dd} ${mon} ${yyyy} · ${MOCK_JOBS.length} jobs in the open web`
}

const styles = {
  page: css({
    // Page lives inside the dashboard shell's <main>, which already pads
    // 40px on desktop. Reserve the page's vertical rhythm here.
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  }),
  // Section masthead — mono chip + 96px accent rule + dateline on a single
  // editorial row. Same vocabulary as the shell masthead + Hero masthead.
  masthead: css({
    paddingBottom: '14px',
    animation: 'fadeIn 540ms ease both',
  }),
  mastheadRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
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
  // Opener — display headline + standfirst. Same staggered entrance as the
  // masthead but offset by ~140ms so the eye reads top-down.
  opener: css({
    paddingBottom: '40px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    marginBottom: '40px',
    maxWidth: '56ch',
    animation: 'fadeIn 620ms ease both',
    animationDelay: '140ms',
  }),
  headline: css({
    fontFamily: 'display',
    fontSize: 'clamp(40px, 5.4vw, 80px)',
    fontWeight: 400,
    lineHeight: '0.98',
    letterSpacing: '-0.03em',
    margin: '0 0 22px',
    textWrap: 'balance',
    color: 'fg.default',
  }),
  // Italic-accent on a key word — borrows the Hero's `titleEm` gesture.
  headlineEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
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
  // Body — asymmetric gutter-pinned grid. Left rail is a page-level
  // filter block (separate from the route-level ToC sidebar in
  // src/routes/app.tsx). Right column is the results spread.
  body: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '232px 1fr' },
    gap: { base: '32px', md: '48px' },
    alignItems: 'start',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '240ms',
  }),
  // Filter rail — a magazine "Contents — Filter" block. Hairline frame
  // mirrors the shell's sidebar so the page feels like a self-contained
  // spread without competing with the route-level ToC.
  rail: css({
    position: 'sticky',
    top: '96px',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'start',
    borderWidth: '1px',
    borderColor: 'border.default',
    backgroundColor: 'bg.surface',
  }),
  railHead: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '14px 16px 10px',
  }),
  railEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  railVol: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  railRule: css({
    height: '1px',
    backgroundColor: 'border.default',
  }),
  railBody: css({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  }),
  railIntro: css({
    fontFamily: 'display',
    fontSize: '13px',
    lineHeight: '1.5',
    color: 'fg.muted',
    margin: 0,
  }),
  railFoot: css({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: '10px',
    alignItems: 'baseline',
    padding: '12px 16px 14px',
  }),
  railFootNum: css({
    fontFamily: 'mono',
    fontSize: '10px',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  railFootText: css({
    fontSize: '12px',
    lineHeight: '1.5',
    color: 'fg.muted',
  }),
  // Results column — hairline + mono uppercase eyebrow pinned at the top,
  // then the JobCard grid below. The grid sits as one editorial block; cards
  // do not stagger on mount (kept consistent with the editorial rest rule).
  results: css({
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  }),
  resultsHead: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '16px',
    paddingBottom: '12px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    marginBottom: '24px',
  }),
  resultsEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    fontWeight: 600,
  }),
  resultsCount: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', lg: 'repeat(2, 1fr)' },
    gap: '20px',
  }),
  // Empty / loading — editorial restraint. No centered spinner; a mono
  // `Standing by…` caption with a short sentence keeps the voice.
  empty: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    padding: '32px 0 8px',
    borderTopWidth: '1px',
    borderColor: 'border.subtle',
  }),
  emptyEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  emptyText: css({
    fontFamily: 'display',
    fontSize: '15px',
    lineHeight: '1.5',
    color: 'fg.muted',
  }),
}