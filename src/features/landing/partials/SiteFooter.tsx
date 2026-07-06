import { Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'

export function SiteFooter() {
  return (
    <footer className={styles.root}>
      {/* Colophon masthead — sets the footer as the back-matter of the issue. */}
      <div className={styles.masthead}>
        <span className={styles.colophon}>Colophon · 04</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>
          Composition notes from the desk
        </span>
      </div>

      {/* Asymmetric colophon: oversized "04" + wordmark on the left, credit
          grid on the right. Reads as the back-of-the-magazine masthead. */}
      <div className={styles.spread}>
        <div className={styles.markColumn}>
          <div className={styles.numeral} aria-hidden>
            04
          </div>
          <div className={styles.wordmark}>
            Fair<span className={styles.wordmarkAccent}>shot</span>
          </div>
          <p className={styles.tagline}>
            A Soft Tooling product. Built for humans, not robots.
          </p>
        </div>

        <div className={styles.creditColumn}>
          {/* Each credit block sits inside a hairline-bounded cell so the
              colophon reads as a typographic table, not a link list. */}
          <div className={styles.creditBlock}>
            <div className={styles.creditLabel}>Navigate</div>
            <div className={styles.creditLinks}>
              <Link to="/app" className={styles.link}>
                Open App
              </Link>
              <a href="#pricing" className={styles.link}>
                Pricing
              </a>
              <a href="#waitlist" className={styles.link}>
                Waitlist
              </a>
            </div>
          </div>

          <div className={styles.creditBlock}>
            <div className={styles.creditLabel}>Set in</div>
            <div className={styles.creditBody}>
              Display &amp; body — a single editorial family. Mono —
              captions and mastheads.
            </div>
          </div>

          <div className={styles.creditBlock}>
            <div className={styles.creditLabel}>Voice</div>
            <div className={styles.creditBody}>
              Soft Tooling. Confident, never hype-y.
            </div>
          </div>
        </div>
      </div>

      {/* Issue plate — closes the colophon with the issue reference. */}
      <div className={styles.plate}>
        <span className={styles.plateLeft}>
          Fairshot · Issue № 01 · Volume 01
        </span>
        <span className={styles.plateRight}>
          Set with care, mid-2026.
        </span>
      </div>
    </footer>
  )
}

const styles = {
  root: css({
    position: 'relative',
    padding: { base: '80px 28px 40px', md: '120px 48px 56px' },
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    animation: 'fadeIn 700ms ease both',
  }),
  masthead: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '72px',
  }),
  colophon: css({
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
  spread: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '1fr 1.4fr' },
    gap: { base: '40px', md: '80px' },
    alignItems: 'start',
    paddingBottom: '64px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
  }),
  markColumn: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }),
  numeral: css({
    fontFamily: 'display',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(96px, 14vw, 168px)',
    lineHeight: '0.85',
    letterSpacing: '-0.04em',
    color: 'fg.default',
  }),
  wordmark: css({
    fontFamily: 'display',
    fontSize: 'clamp(32px, 4vw, 48px)',
    fontWeight: 500,
    letterSpacing: '-0.025em',
    color: 'fg.default',
  }),
  wordmarkAccent: css({ color: 'accent.solid' }),
  tagline: css({
    fontFamily: 'display',
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'fg.muted',
    maxWidth: '36ch',
    margin: 0,
  }),
  creditColumn: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  }),
  creditBlock: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '120px 1fr' },
    gap: { base: '8px', md: '32px' },
    padding: { base: '20px 0', md: '24px 0' },
    borderTopWidth: '1px',
    borderColor: 'border.subtle',
    alignItems: 'start',
    '&:nth-child(1)': { borderTopWidth: 0, paddingTop: 0 },
  }),
  creditLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.subtle',
    fontWeight: 500,
  }),
  creditLinks: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }),
  creditBody: css({
    fontFamily: 'display',
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'fg.default',
    maxWidth: '40ch',
  }),
  link: css({
    fontFamily: 'display',
    fontSize: 'clamp(18px, 1.8vw, 22px)',
    color: 'fg.default',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    transition: 'color 200ms',
    _hover: { color: 'accent.solid' },
  }),
  plate: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '16px',
    marginTop: '32px',
    flexWrap: 'wrap',
  }),
  plateLeft: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  plateRight: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    fontStyle: 'italic',
  }),
}