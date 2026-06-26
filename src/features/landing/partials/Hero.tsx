import { css } from 'styled-system/css'

export function Hero() {
  return (
    <section className={styles.root} id="top">
      <div className={styles.eyebrow}>A Soft Tooling product</div>
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
        <a href="#waitlist" className={styles.ctaPrimary}>
          Get early access
        </a>
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
  eyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'accent.solid',
    marginBottom: '32px',
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
  ctaPrimary: css({
    padding: '16px 32px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'accent.solid',
    color: 'white',
    fontFamily: 'body',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 200ms',
    textDecoration: 'none',
    display: 'inline-block',
    _hover: {
      transform: 'translateY(-1px)',
      filter: 'brightness(1.08)',
    },
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