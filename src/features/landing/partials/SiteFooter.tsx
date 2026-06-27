import { Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { HStack } from '~/components/ui/layout'

export function SiteFooter() {
  return (
    <footer className={styles.root}>
      <div className={styles.left}>
        <div className={styles.logo}>
          Fair<span className={styles.logoAccent}>shot</span>
        </div>
        <div className={styles.tagline}>
          A Soft Tooling product. Built for humans, not robots.
        </div>
      </div>
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
    </footer>
  )
}

const styles = {
  root: css({
    padding: '60px 48px 40px',
    maxWidth: '1040px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  }),
  left: css({ maxWidth: '300px' }),
  logo: css({
    fontFamily: 'display',
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '8px',
  }),
  logoAccent: css({ color: 'accent.solid' }),
  tagline: css({
    fontSize: '14px',
    color: 'fg.muted',
    lineHeight: '1.6',
  }),
  links: css({
    // HStack handles the horizontal flex; keep default center alignment.
    display: 'inline-flex',
  }),
  link: css({
    fontSize: '13px',
    color: 'fg.muted',
    textDecoration: 'none',
    transition: 'color 200ms',
    _hover: { color: 'fg.default' },
  }),
}
