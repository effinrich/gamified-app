import { css } from 'styled-system/css'
import { Button } from '~/components/ui/button'
import { Eyebrow } from '~/components/ui/text'

export function Hero() {
  return (
    <section className={styles.root} id="top">
      <Eyebrow style={{ display: 'block', marginBottom: '32px' }}>
        A Soft Tooling product
      </Eyebrow>
      <h1 className={styles.title}>
        We run your job search. <em className={styles.titleEm}>You pay when it works.</em>
      </h1>
      <p className={styles.subtitle}>
        No resume scoring. No shame spirals. No 47-step templates.
      </p>
      <p className={styles.body}>
        You tell us where you want to go. We find worth-your-time roles, tailor
        your application for each one, and track what happens. You only pay when
        you get results.
      </p>
      <div className={styles.ctaRow}>
        <Button asChild variant="solid" size="lg">
          <a href="#waitlist">Get early access</a>
        </Button>
        <a href="#how" className={styles.ctaSecondary}>
          See how it works →
        </a>
      </div>
    </section>
  )
}

const styles = {
  root: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '140px 48px 100px',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    textAlign: 'center',
  }),
  title: css({
    fontFamily: 'display',
    // Slightly tighter clamp than the original — the line reads as one breath, not two.
    fontSize: 'clamp(40px, 5.5vw, 64px)',
    fontWeight: 400,
    lineHeight: '1.05',
    letterSpacing: '-0.02em',
    marginBottom: '28px',
    textWrap: 'pretty',
  }),
  titleEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  subtitle: css({
    fontFamily: 'display',
    fontSize: 'clamp(22px, 3vw, 32px)',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: '1.3',
    color: 'fg.muted',
    marginBottom: '40px',
    textWrap: 'pretty',
  }),
  body: css({
    fontSize: '17px',
    lineHeight: '1.7',
    color: 'fg.muted',
    maxWidth: '540px',
    margin: '0 auto 48px',
  }),
  ctaRow: css({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  ctaSecondary: css({
    fontSize: '15px',
    color: 'fg.muted',
    textDecoration: 'none',
    transition: 'color 200ms',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    _hover: { color: 'fg.default' },
  }),
}
