import { css } from 'styled-system/css'
import type { Step } from '../types'
import { Section } from '~/components/ui/section'

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Section wide id="how">
      <Section.Eyebrow>How It Works</Section.Eyebrow>
      <Section.Title>We do the work. You do the interview.</Section.Title>
      <Section.Body>
        <p>
          Tell us once where you want to go. Our AI handles the rest — finding
          roles, tailoring applications, and keeping you in the loop without
          drowning you in noise.
        </p>
      </Section.Body>

      <div className={styles.grid}>
        {steps.map((s) => (
          <div className={styles.step} key={s.num}>
            <div className={styles.stepNum}>{s.num}</div>
            <div className={styles.stepTitle}>{s.title}</div>
            <div className={styles.stepDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
    gap: '40px 16px',
    marginTop: '56px',
    position: 'relative',
  }),
  step: css({
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  }),
  stepNum: css({
    width: '56px',
    height: '56px',
    borderRadius: '9999px',
    backgroundColor: 'bg.panel',
    borderWidth: '1px',
    borderColor: 'border.default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontFamily: 'mono',
    fontSize: '14px',
    fontWeight: 500,
    color: 'accent.solid',
  }),
  stepTitle: css({
    fontFamily: 'display',
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '8px',
  }),
  stepDesc: css({
    fontSize: '14px',
    lineHeight: '1.55',
    color: 'fg.muted',
  }),
}