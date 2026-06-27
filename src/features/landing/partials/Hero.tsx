import { css } from 'styled-system/css'
import { Button } from '~/components/ui/button'
import { Eyebrow } from '~/components/ui/text'

export function Hero() {
  return (
    <section className={styles.root} id="top">
      {/* The glow layer is purely decorative — sits behind the content. */}
      <div className={styles.glowLayer} aria-hidden />
      <div className={styles.glowLayerSecondary} aria-hidden />

      {/* Editorial chrome — issue number + hairline rule. Anchors the
          magazine framing without competing with the headline. */}
      <div className={styles.masthead}>
        <span className={styles.issue}>Issue № 01</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>Job search, with the shame removed</span>
      </div>

      {/* Two-column asymmetric grid: eyebrow + standfirst column on the left,
          oversized headline + body + cta on the right. Breaks the
          centered-SaaS-default and reads as a magazine spread. */}
      <div className={styles.layout}>
        <div className={styles.left}>
          <Eyebrow className={styles.eyebrow}>A Soft Tooling product</Eyebrow>
          <p className={styles.standfirst}>
            <span className={styles.standfirstLead}>No resume scoring.</span>{' '}
            No shame spirals. No 47-step templates.
          </p>
        </div>

        <div className={styles.right}>
          <h1 className={styles.title}>
            We run your job search.{' '}
            <em className={styles.titleEm}>You pay when it works.</em>
          </h1>

          <p className={styles.body}>
            You tell us where you want to go. We find worth-your-time roles,
            tailor your application for each one, and track what happens.
            <span className={styles.bodyAccent}> You only pay when you get results.</span>
          </p>

          <div className={styles.ctaRow}>
            <Button asChild variant="solid" size="lg">
              <a href="#waitlist">Get early access</a>
            </Button>
            <a href="#how" className={styles.ctaSecondary}>
              How this works <span className={styles.ctaArrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  root: css({
    position: 'relative',
    minHeight: '100vh',
    padding: '160px 48px 120px',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  glowLayer: css({
    // The headline's halo — saturated teal, blurred, sits behind content.
    position: 'absolute',
    inset: '0',
    pointerEvents: 'none',
    zIndex: 0,
    backgroundImage:
      'radial-gradient(circle 420px at 72% 38%, token(colors.teal.9, #12a594) 0%, token(colors.teal.7, #0f8a7d) 30%, transparent 70%)',
    opacity: '0.32',
    filter: 'blur(10px)',
  }),
  glowLayerSecondary: css({
    // Secondary softer glow anchors the bottom-left to balance composition.
    position: 'absolute',
    inset: '0',
    pointerEvents: 'none',
    zIndex: 0,
    backgroundImage:
      'radial-gradient(circle 320px at 8% 78%, token(colors.teal.8, #12a594) 0%, transparent 70%)',
    opacity: '0.18',
    filter: 'blur(14px)',
  }),
  masthead: css({
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '72px',
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
  layout: css({
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '1fr 1.6fr' },
    gap: { base: '40px', md: '64px' },
    alignItems: 'start',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '120ms',
    animationFillMode: 'both',
  }),
  left: css({
    position: 'relative',
    paddingTop: '14px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  eyebrow: css({
    display: 'inline-block',
    marginBottom: '20px',
  }),
  standfirst: css({
    fontFamily: 'display',
    fontSize: 'clamp(20px, 2.2vw, 26px)',
    lineHeight: '1.35',
    fontWeight: 400,
    color: 'fg.default',
    textWrap: 'pretty',
    margin: 0,
  }),
  standfirstLead: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  right: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  }),
  title: css({
    fontFamily: 'display',
    // Pushed harder than the previous clamp — the editorial ceiling is the headline.
    fontSize: 'clamp(48px, 7.2vw, 104px)',
    fontWeight: 400,
    lineHeight: '0.98',
    letterSpacing: '-0.03em',
    margin: 0,
    textWrap: 'balance',
  }),
  titleEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  body: css({
    fontSize: '17px',
    lineHeight: '1.7',
    color: 'fg.muted',
    maxWidth: '52ch',
    margin: 0,
  }),
  bodyAccent: css({
    color: 'fg.default',
  }),
  ctaRow: css({
    display: 'flex',
    gap: '28px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '8px',
  }),
  ctaSecondary: css({
    fontFamily: 'display',
    fontSize: '17px',
    fontStyle: 'italic',
    color: 'fg.default',
    textDecoration: 'none',
    transition: 'color 200ms, border-color 200ms',
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '6px',
    borderBottomWidth: '1px',
    borderColor: 'fg.default',
    paddingBottom: '2px',
    _hover: { color: 'accent.solid', borderColor: 'accent.solid' },
  }),
  ctaArrow: css({
    fontStyle: 'normal',
    fontFamily: 'body',
    display: 'inline-block',
    transition: 'transform 240ms ease',
  }),
}