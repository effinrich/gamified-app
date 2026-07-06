import { Link } from '@tanstack/react-router'
import { css, cx } from 'styled-system/css'
import { HStack } from '~/components/ui/layout'

/**
 * LandingNav — the magazine's running header.
 *
 * Mirrors the chrome language of Hero / WaitlistCta / SiteFooter: mono eyebrow
 * on the left ("Issue № 01 · Masthead"), a tight tracking-tight display logotype
 * in the center ("Fairshot."), and mono uppercase anchor links on the right.
 * Restrained scale — this is a utility bar, not a hero.
 *
 * Scroll state — when `scrolled` is true the bar gains a 1px bottom hairline
 * rule (`border.subtle`) and a translucent surface tint so it reads as
 * a proper masthead after the user scrolls. That hairline is the only
 * animation; no entrance stagger on a sticky nav.
 */
export function LandingNav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      aria-label="Primary"
      className={cx(styles.root, scrolled && styles.rootScrolled)}
    >
      <div className={styles.inner}>
        {/* Left: mono eyebrow + hairline + dateline — same chrome as Hero. */}
        <div className={styles.dateline}>
          <span className={styles.issue}>Issue № 01</span>
          <span className={styles.rule} aria-hidden />
          <span className={styles.datelineText}>Masthead</span>
        </div>

        {/* Center: tracking-tight display logotype. Anchors the brand without
            competing with the Hero's headline scale. */}
        <a href="#top" className={styles.logo}>
          Fair<span className={styles.logoAccent}>shot.</span>
        </a>

        {/* Right: mono uppercase anchor links + an accent CTA. HStack controls
            the inline gap; the editorial scale is set on each link. */}
        <HStack gap="6" className={styles.links}>
          <a href="#problem" className={styles.link}>
            The Problem
          </a>
          <a href="#how" className={styles.link}>
            How It Works
          </a>
          <a href="#pricing" className={styles.link}>
            Pricing
          </a>
          <Link to="/app" className={styles.cta}>
            Open App <span className={styles.ctaArrow} aria-hidden>→</span>
          </Link>
        </HStack>
      </div>
    </nav>
  )
}

const styles = {
  root: css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
    // The hairline and surface tint only appear on scroll; transition both so
    // the change reads as a single orchestrated state shift.
    transition:
      'background-color 280ms ease, backdrop-filter 280ms ease, box-shadow 280ms ease, border-color 280ms ease',
  }),
  // Scroll state — surface tint + 1px bottom hairline. The hairline is the
  // nav's only animation.
  rootScrolled: css({
    backgroundColor: 'bg.surface/80',
    backdropFilter: 'blur(14px)',
    borderBottomWidth: '1px',
    borderColor: 'border.subtle',
  }),
  inner: css({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { base: '18px 24px', md: '22px 48px' },
    display: 'grid',
    gridTemplateColumns: { base: '1fr auto', md: '1fr auto 1fr' },
    alignItems: 'center',
    gap: { base: '12px', md: '32px' },
  }),
  // Left chrome — mono eyebrow chip + short rule + dateline.
  dateline: css({
    display: { base: 'none', md: 'inline-flex' },
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  issue: css({
    color: 'accent.solid',
    fontWeight: 600,
  }),
  rule: css({
    display: 'inline-block',
    flex: '0 0 32px',
    height: '1px',
    backgroundColor: 'border.default',
  }),
  datelineText: css({
    color: 'fg.muted',
  }),
  // Center logotype — smaller than the Hero's display scale, but same family.
  // tracking-tight + italic accent word keeps the magazine voice.
  logo: css({
    fontFamily: 'display',
    fontSize: { base: '20px', md: '22px' },
    fontWeight: 600,
    letterSpacing: '-0.03em',
    textDecoration: 'none',
    color: 'fg.default',
    textWrap: 'nowrap',
    justifySelf: { base: 'start', md: 'center' },
  }),
  logoAccent: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  // Right rail — mono uppercase links + accent CTA. Hidden CTA cluster on
  // the small breakpoint feels right for a magazine masthead, but we keep
  // the nav links visible at every size to preserve anchor scroll behavior.
  links: css({
    justifySelf: { base: 'end', md: 'end' },
    display: 'inline-flex',
    alignItems: 'center',
  }),
  link: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    textDecoration: 'none',
    borderBottomWidth: '1px',
    borderColor: 'transparent',
    paddingBottom: '2px',
    transition: 'color 220ms ease, border-color 220ms ease',
    _hover: {
      color: 'fg.default',
      borderColor: 'fg.default',
    },
    _focusVisible: {
      outline: '2px solid token(colors.accent.solid)',
      outlineOffset: '3px',
    },
  }),
  // CTA — sharp accent outline that fills on hover. Mirrors the chrome-chip
  // treatment used in PricingSection's "M02" and the WaitlistCta "Received"
  // badge, scaled up for an interactive button.
  cta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    padding: '8px 14px',
    lineHeight: 1,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition:
      'background-color 220ms ease, color 220ms ease, transform 220ms ease',
    _hover: {
      backgroundColor: 'accent.solid',
      color: 'bg.canvas',
    },
    _focusVisible: {
      outline: '2px solid token(colors.accent.solid)',
      outlineOffset: '3px',
    },
  }),
  ctaArrow: css({
    fontFamily: 'body',
    fontStyle: 'normal',
    transition: 'transform 240ms ease',
  }),
}
