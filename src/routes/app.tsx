import { Suspense } from 'react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { css, cx } from 'styled-system/css'
import { ErrorPanel } from '~/components/ui/error-panel'

/**
 * `/app/*` route — dashboard shell.
 *
 * Editorial-bold chrome:
 *   - Top masthead: mono dateline + hairline + tracking-tight logotype.
 *   - Left column: table-of-contents sidebar with mono uppercase section
 *     labels, mono numerals, and hairline rules between rows. The active
 *     link picks up an italic accent + accent-colored numeral — set via
 *     `aria-current="page"` so TanStack Router drives the active state.
 *   - Right column: the routed screen, framed by the masthead rule above.
 *
 * Layered error handling:
 *   - `errorComponent` catches render errors in any descendant route. The
 *     shell (masthead + ToC) stays mounted so the user can navigate away.
 *   - `<Suspense>` wraps the Outlet so streamed routes don't tear the chrome.
 */
export const Route = createFileRoute('/app')({
  component: AppLayout,
  errorComponent: AppRouteError,
})

// Mono dateline — re-evaluated each render so the chrome feels like a
// magazine masthead. Kept inline (not a helper) so it's visible at the top
// of the file and obvious it could be wired to a real `Issue` later.
const dateline = formatDateline(new Date())

function AppRouteError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.'
  return (
    <DashboardShell>
      <div className={styles.errorWrap}>
        <ErrorPanel
          variant="inline"
          eyebrow="Screen error"
          title="This screen hit a wall."
          body="Something inside this view didn't load. The rest of the app is still here — try another route, or come back."
          detail={message}
          primaryAction={{ to: '/app/resume', label: 'Go to Resume' }}
          secondaryAction={{
            label: 'Reload',
            onClick: () => window.location.reload(),
          }}
        />
      </div>
    </DashboardShell>
  )
}

function AppLayout() {
  return (
    <DashboardShell>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </DashboardShell>
  )
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.masthead}>
        <div className={styles.mastheadLeft}>
          <Link to="/app/resume" className={styles.logo} aria-label="Fairshot home">
            Fair<span className={styles.logoAccent}>shot</span>
            <span className={styles.logoDot} aria-hidden>
              .
            </span>
          </Link>
          <span className={styles.dateline}>{dateline}</span>
        </div>
        <div className={styles.mastheadRight}>
          <span className={styles.accountLabel}>Account</span>
          <span className={styles.accountChip}>You</span>
        </div>
      </header>
      <div className={styles.mastheadRule} aria-hidden />

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label="Dashboard sections">
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarEyebrow}>Contents</span>
            <span className={styles.sidebarVol}>Vol. II</span>
          </div>
          <div className={styles.sidebarRule} aria-hidden />

          <ul className={styles.tocList}>
            {TABLE_OF_CONTENTS.map((entry) => (
              <li key={entry.to} className={styles.tocItem}>
                <Link
                  to={entry.to}
                  className={styles.tocLink}
                  activeProps={{ className: styles.tocLinkActive }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cx(
                          styles.tocNum,
                          isActive && styles.tocNumActive,
                        )}
                        aria-hidden
                      >
                        {entry.num}
                      </span>
                      <span className={styles.tocLabel}>{entry.label}</span>
                      <span
                        className={cx(
                          styles.tocTail,
                          isActive && styles.tocTailActive,
                        )}
                        aria-hidden
                      />
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.sidebarFoot}>
            <span className={styles.sidebarFootNum}>N°</span>
            <span className={styles.sidebarFootText}>
              You haven't paid us in three months. That's fine.
            </span>
          </div>
        </nav>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}

// Editorial table-of-contents. Mirrors the marketing page's
// Issue / Volume / Method / Colophon numbering cadence — the dashboard
// gets its own dialed-in volume (Vol. II) but the same numeral shape.
const TABLE_OF_CONTENTS = [
  { to: '/app/resume', num: '01', label: 'Resume' },
  { to: '/app/discover', num: '02', label: 'Discover' },
  { to: '/app/tracker', num: '03', label: 'Tracker' },
] as const

// Lightweight dateline formatter — kept here so the masthead stays a
// single render path. Returns `Sun · 05 Jul 2026` style, matching the
// landing masthead's mono treatment.
function formatDateline(d: Date): string {
  const day = d.toLocaleDateString('en-US', { weekday: 'short' })
  const dd = String(d.getDate()).padStart(2, '0')
  const mon = d.toLocaleDateString('en-US', { month: 'short' })
  const yyyy = d.getFullYear()
  return `${day} · ${dd} ${mon} ${yyyy}`
}

const styles = {
  shell: css({
    minHeight: '100vh',
    backgroundColor: 'bg.canvas',
    backgroundImage:
      'radial-gradient(ellipse 1200px 480px at 18% -10%, token(colors.teal.9), transparent 62%)',
    backgroundAttachment: 'fixed',
    color: 'fg.default',
    display: 'flex',
    flexDirection: 'column',
  }),
  // Masthead — a single editorial row pinned to the top of the dashboard.
  // Sticky so it stays visible while the routed screen scrolls. The hairline
  // rule beneath it is a sibling (not a border) so the scroll-shadow trick
  // from LandingNav can slot in later without rewriting this layout.
  masthead: css({
    position: 'sticky',
    top: 0,
    zIndex: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px 18px',
    backgroundColor: 'bg.canvas/85',
    backdropFilter: 'blur(14px)',
  }),
  mastheadLeft: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '20px',
  }),
  mastheadRight: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '14px',
  }),
  mastheadRule: css({
    position: 'sticky',
    top: 0,
    zIndex: 19,
    height: '1px',
    backgroundColor: 'border.default',
  }),
  // Logotype — display serif with the italic accent word + period glyph,
  // matching LandingNav's `Fairshot` wordmark without copying it wholesale.
  logo: css({
    fontFamily: 'display',
    fontSize: '22px',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    textDecoration: 'none',
    color: 'fg.default',
    display: 'inline-flex',
    alignItems: 'baseline',
  }),
  logoAccent: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  logoDot: css({
    color: 'accent.solid',
    marginLeft: '1px',
  }),
  dateline: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  accountLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  accountChip: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    padding: '4px 10px',
    lineHeight: 1,
  }),
  // Body — two-column editorial grid. Sidebar pinned to a fixed reading
  // width on the left; main column takes the remaining canvas with a
  // generous gutter (mirrors the landing's 1fr / 1.18fr / 1fr language).
  body: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '232px 1fr' },
    gap: { base: '32px', md: '56px' },
    padding: { base: '24px 24px 64px', md: '40px 40px 96px' },
    flex: 1,
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
  }),
  sidebar: css({
    position: 'sticky',
    top: '76px',
    alignSelf: 'start',
    display: 'flex',
    flexDirection: 'column',
  }),
  sidebarHeader: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '0 0 10px',
  }),
  sidebarEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  sidebarVol: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  sidebarRule: css({
    height: '1px',
    backgroundColor: 'border.default',
    marginBottom: '8px',
  }),
  tocList: css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }),
  tocItem: css({
    borderBottomWidth: '1px',
    borderColor: 'border.subtle',
  }),
  // ToC link — editorial spread row. Numeral on the left, label in the
  // middle, hairline tail on the right that fills the row at low opacity.
  // No rounded chips, no fill — just typography and rules.
  tocLink: css({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'baseline',
    columnGap: '14px',
    padding: '18px 0 16px',
    textDecoration: 'none',
    color: 'fg.muted',
    transition: 'color 240ms ease',
    _hover: { color: 'fg.default' },
    _focusVisible: {
      outline: '2px solid token(colors.accent.solid)',
      outlineOffset: '4px',
    },
  }),
  // Active route — TanStack Router concatenates `activeProps.className`
  // onto the rendered <a>. Color flips to fg.default; the inner numeral
  // and tail pick up accent.solid via their own `isActive` checks below.
  tocLinkActive: css({
    color: 'fg.default',
  }),
  tocNum: css({
    fontFamily: 'mono',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.14em',
    color: 'fg.subtle',
    transition: 'color 240ms ease',
  }),
  tocLabel: css({
    fontFamily: 'mono',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
  }),
  tocTail: css({
    height: '1px',
    width: '24px',
    backgroundColor: 'border.default',
    alignSelf: 'center',
    transition: 'width 240ms ease, background-color 240ms ease',
  }),
  tocNumActive: css({
    color: 'accent.solid',
  }),
  tocTailActive: css({
    width: '48px',
    backgroundColor: 'accent.solid',
  }),
  sidebarFoot: css({
    marginTop: '20px',
    paddingTop: '16px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: '10px',
    alignItems: 'baseline',
  }),
  sidebarFootNum: css({
    fontFamily: 'mono',
    fontSize: '10px',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  sidebarFootText: css({
    fontSize: '12px',
    lineHeight: '1.5',
    color: 'fg.muted',
  }),
  main: css({
    minWidth: 0,
  }),
  errorWrap: css({
    paddingTop: '24px',
  }),
}