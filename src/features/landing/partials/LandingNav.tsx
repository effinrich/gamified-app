import { Link } from '@tanstack/react-router'
import { css, cx } from 'styled-system/css'
import { HStack } from '~/components/ui/layout'

export function LandingNav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={cx(styles.root, scrolled && styles.scrolled)}>
      <a href="#top" className={styles.logo}>
        Fair<span className={styles.logoAccent}>shot</span>
      </a>
      <HStack gap="8" className={styles.links}>
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
          Open App
        </Link>
      </HStack>
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
    padding: '24px 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background 300ms, backdrop-filter 300ms, box-shadow 300ms',
  }),
  scrolled: css({
    backgroundColor: 'bg.panel/90',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 1px 0 token(colors.border.default)',
  }),
  logo: css({
    fontFamily: 'display',
    fontSize: '22px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    textDecoration: 'none',
    color: 'fg.default',
  }),
  logoAccent: css({ color: 'accent.solid' }),
  links: css({
    // HStack controls gap; keep the inline-flex + center from the original.
    display: 'inline-flex',
    alignItems: 'center',
  }),
  link: css({
    fontSize: '14px',
    color: 'fg.muted',
    textDecoration: 'none',
    transition: 'color 200ms',
    _hover: { color: 'fg.default' },
  }),
  cta: css({
    padding: '9px 20px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: 'fg.default',
    backgroundColor: 'fg.default',
    color: 'bg.canvas',
    fontFamily: 'body',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 200ms',
    _hover: {
      backgroundColor: 'transparent',
      color: 'fg.default',
    },
  }),
}
