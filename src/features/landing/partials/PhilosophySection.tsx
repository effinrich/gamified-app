import { css } from 'styled-system/css'
import type { PhilosophyPair } from '../types'
import { Section } from '~/components/ui/section'

export function PhilosophySection({ pairs }: { pairs: PhilosophyPair[] }) {
  return (
    <Section id="philosophy">
      <Section.Eyebrow>Our Stance</Section.Eyebrow>
      <Section.Title>We don't score your resume.</Section.Title>
      <Section.Body>
        <p>
          Other tools rate you. We don't. Your resume is a story, not a test. We
          make it better without making you feel worse.
        </p>
      </Section.Body>

      <div className={styles.grid}>
        {pairs.map((pair, i) => (
          <div className={styles.item} key={`${pair.q}-${i}`}>
            <div className={styles.q}>{pair.q}</div>
            <div className={styles.a}>{pair.a}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
    gap: '32px',
    marginTop: '56px',
  }),
  item: css({
    padding: '28px 0',
    borderTopWidth: '1px',
    borderColor: 'border.default',
    '&:nth-child(1), &:nth-child(2)': { borderTopWidth: 0 },
  }),
  q: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'accent.solid',
    marginBottom: '10px',
  }),
  a: css({
    fontFamily: 'display',
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '1.35',
  }),
}