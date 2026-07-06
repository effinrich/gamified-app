import { Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { HStack } from '~/components/ui/layout'

/**
 * SiteFooter — the magazine's colophon.
 *
 * Closes the editorial narrative started by the Hero's `Issue № 01` masthead
 * and capped by WaitlistCta's `Final · 03` spread. Reads as a small back-page
 * block: mono "Colophon" eyebrow with a hairline + dateline, an oversized
 * logotype on the left against a tight credits/links column on the right,
 * and a fineprint meta strip on a bottom hairline.
 */
export function SiteFooter() {
  return (
    <footer className={styles.root}>
      {/* Masthead: editorial chrome that frames the colophon as a back-page
          block — same family as the Hero and WaitlistCta. */}
      <div className={styles.masthead}>
        <span className={styles.issue}>Colophon · 04</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>End of issue</span>
      </div>

      {/* Top hairline — closes the chrome row and starts the spread. */}
      <div className={styles.topRule} aria-hidden />

      {/* Gutter-pinned spread: a 72px gutter column for the section label,
          a 1fr column carrying the logotype + credits + links. Mirrors
          WaitlistCta's compositional language so the closing section reads
          as part of the same magazine. */}
      <div className={styles.layout}>
        <div className={styles.gutter} aria-hidden>
          <span className={styles.gutterLabel}>Credits</span>
          <span className={styles.gutterLabel}>&amp; Index</span>
          <span className={styles.gutterMeta}>№ 04</span>
        </div>

        <div className={styles.spread}>
          {/* Oversized logotype — the typographic anchor of the colophon. */}
          <div className={styles.logo}>
            Fair<span className={styles.logoAccent}>shot.</span>
          </div>

          {/* Standfirst — the editorial subtitle that sets the colophon's tone. */}
          <p className={styles.standfirst}>
            <em className={styles.standfirstEm}>A Soft Tooling product.</em>{' '}
            Built for humans, not robots.
          </p>

          {/* Hairline rule — frames the credits below as their own block. */}
          <div className={styles.innerRule} aria-hidden />

          {/* Credits + links sit on a single editorial row. */}
          <div className={styles.metaRow}>
            <HStack gap="6" className={styles.links}>
              <Link to="/app" className={styles.link}>
                Open App
              </Link>
              <a href="#pricing" className={styles.link}>
                Pricing
              </a>
              <a href="#waitlist" className={styles.link}>
                Waitlist
              </a>
            </HStack>

            <div className={styles.colophonMeta}>
              <span className={styles.colophonLine}>
                Set in <em className={styles.colophonEm}>display</em> &amp;{' '}
                <em className={styles.colophonEm}>mono</em>.
              </span>
              <span className={styles.colophonLine}>
                Printed on the open web, 2026.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom hairline + fineprint — closes the spread as a self-contained
          colophon block. */}
      <div className={styles.bottomRule} aria-hidden />

      <div className={styles.fineprint}>
        <span className={styles.fineprintLeft}>
          © 2026 Soft Tooling. All rights reserved.
        </span>
        <span className={styles.fineprintRight}>
          Issue 01 · Issue 02 · Issue 03 · Colophon 04
        </span>
      </div>
    </footer>
  )
}

const styles = {
  root: css({
    position: 'relative',
    backgroundColor: 'bg.surface',
    padding: { base: '72px 48px 40px', md: '96px 48px 48px' },
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  masthead: css({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    animation: 'fadeIn 600ms ease both',
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
  topRule: css({
    maxWidth: '1200px',
    margin: '0 auto 56px',
    height: '1px',
    backgroundColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '80ms',
  }),
  layout: css({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '72px 1fr' },
    gap: { base: '32px', md: '56px' },
    alignItems: 'start',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '160ms',
  }),
  gutter: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingTop: '8px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  gutterLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  gutterMeta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    marginTop: '24px',
    fontWeight: 600,
  }),
  spread: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }),
  // Oversized logotype — anchors the colophon as a typographic moment, not a
  // small print block. Pairs with the WaitlistCta closing headline scale.
  logo: css({
    fontFamily: 'display',
    fontSize: 'clamp(48px, 7vw, 104px)',
    fontWeight: 500,
    lineHeight: '0.95',
    letterSpacing: '-0.04em',
    color: 'fg.default',
    textWrap: 'balance',
  }),
  logoAccent: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  standfirst: css({
    fontFamily: 'display',
    fontSize: 'clamp(17px, 1.6vw, 20px)',
    lineHeight: '1.6',
    color: 'fg.muted',
    maxWidth: '52ch',
    margin: 0,
  }),
  standfirstEm: css({
    fontStyle: 'italic',
    color: 'fg.default',
  }),
  innerRule: css({
    height: '1px',
    backgroundColor: 'border.default',
    marginTop: '8px',
  }),
  metaRow: css({
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    alignItems: { base: 'flex-start', md: 'flex-end' },
    justifyContent: 'space-between',
    gap: { base: '24px', md: '40px' },
  }),
  links: css({
    // HStack handles the horizontal flex; keep the inline-flex alignment.
    display: 'inline-flex',
    alignItems: 'center',
  }),
  link: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    textDecoration: 'none',
    transition: 'color 200ms, border-color 200ms',
    borderBottomWidth: '1px',
    borderColor: 'transparent',
    paddingBottom: '2px',
    _hover: {
      color: 'fg.default',
      borderColor: 'fg.default',
    },
  }),
  colophonMeta: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: { base: 'left', md: 'right' },
  }),
  colophonLine: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.subtle',
  }),
  colophonEm: css({
    fontStyle: 'italic',
    color: 'fg.muted',
  }),
  bottomRule: css({
    maxWidth: '1200px',
    margin: '64px auto 0',
    height: '1px',
    backgroundColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '240ms',
  }),
  fineprint: css({
    maxWidth: '1200px',
    margin: '24px auto 0',
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    justifyContent: 'space-between',
    alignItems: { base: 'flex-start', md: 'baseline' },
    gap: { base: '8px', md: '0' },
  }),
  fineprintLeft: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.subtle',
  }),
  fineprintRight: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.subtle',
  }),
}
