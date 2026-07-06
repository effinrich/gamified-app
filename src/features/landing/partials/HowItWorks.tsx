import { css } from 'styled-system/css'
import type { Step } from '../types'

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <section className={styles.root} id="how">
      {/* Magazine masthead — same shape as the other sections so the issue
          spine stays intact. */}
      <div className={styles.masthead}>
        <span className={styles.method}>Method № 03</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>Four steps. No spreadsheet.</span>
      </div>

      {/* Asymmetric opener: oversized numeral + headline on the left,
          eyebrow + standfirst on the right. Mirrors PhilosophySection's
          spread so the issue reads as one document. */}
      <div className={styles.spread}>
        <div className={styles.numeralColumn}>
          <div className={styles.numeral} aria-hidden>
            03
          </div>
          <div className={styles.numeralCaption}>
            How a job search should actually feel.
          </div>
        </div>

        <div className={styles.bodyColumn}>
          <div className={styles.eyebrow}>How It Works</div>
          <h2 className={styles.title}>
            We do the work. You do the interview.
          </h2>
          <p className={styles.standfirst}>
            Tell us once where you want to go. Our AI handles the rest —
            finding roles, tailoring applications, and keeping you in the
            loop without drowning you in noise.
          </p>
        </div>
      </div>

      {/* Step list — 12-col asymmetric grid. Each row pins the numeral to
          the gutter on the left and lets the body breathe on the right.
          Vertical hairlines between steps; the final step gets a closing
          rule to seal the method. */}
      <div className={styles.steps}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <div
              className={styles.step}
              data-last={isLast ? 'true' : 'false'}
              key={step.num}
            >
              <div className={styles.stepHairline} aria-hidden />
              <div className={styles.stepGrid}>
                <div className={styles.stepNumeralCell}>
                  <div className={styles.stepNumeral}>{step.num}</div>
                  <div className={styles.stepNumeralRule} aria-hidden />
                </div>
                <div className={styles.stepBody}>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepDesc}>{step.desc}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const styles = {
  root: css({
    position: 'relative',
    padding: { base: '80px 28px', md: '120px 48px' },
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
    animation: 'fadeIn 600ms ease both',
  }),
  method: css({
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
    gap: { base: '32px', md: '80px' },
    alignItems: 'end',
    paddingBottom: '64px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
  }),
  numeralColumn: css({
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
  numeralCaption: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.muted',
    maxWidth: '24ch',
  }),
  bodyColumn: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingBottom: '12px',
  }),
  eyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(40px, 5.6vw, 88px)',
    fontWeight: 400,
    lineHeight: '0.98',
    letterSpacing: '-0.03em',
    margin: 0,
    color: 'fg.default',
    textWrap: 'balance',
  }),
  standfirst: css({
    fontFamily: 'display',
    fontSize: 'clamp(17px, 1.6vw, 20px)',
    lineHeight: '1.6',
    color: 'fg.muted',
    maxWidth: '52ch',
    margin: 0,
  }),
  steps: css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '64px',
  }),
  step: css({
    position: 'relative',
    padding: { base: '28px 0', md: '40px 0' },
    '&[data-last="true"]': {
      paddingBottom: '0',
      '& .stepHairline, & [class*="stepHairline"]': {
        backgroundColor: 'border.default',
      },
    },
  }),
  stepHairline: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: 'border.subtle',
  }),
  stepGrid: css({
    display: 'grid',
    gridTemplateColumns: { base: '56px 1fr', md: '112px 1fr' },
    gap: { base: '16px', md: '40px' },
    alignItems: 'start',
  }),
  stepNumeralCell: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  }),
  stepNumeral: css({
    fontFamily: 'display',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(56px, 6vw, 96px)',
    lineHeight: '0.9',
    letterSpacing: '-0.03em',
    color: 'accent.solid',
  }),
  stepNumeralRule: css({
    width: '40px',
    height: '2px',
    backgroundColor: 'fg.default',
  }),
  stepBody: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    paddingTop: { base: '8px', md: '16px' },
  }),
  stepTitle: css({
    fontFamily: 'display',
    fontSize: 'clamp(22px, 2.4vw, 30px)',
    fontWeight: 500,
    lineHeight: '1.2',
    letterSpacing: '-0.015em',
    color: 'fg.default',
    margin: 0,
  }),
  stepDesc: css({
    fontFamily: 'display',
    fontSize: 'clamp(16px, 1.4vw, 18px)',
    lineHeight: '1.6',
    color: 'fg.muted',
    maxWidth: '54ch',
    margin: 0,
  }),
}