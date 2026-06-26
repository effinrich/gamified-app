import { css } from 'styled-system/css'
import type { Problem } from '../types'
import { Section } from '~/components/ui/section'

export function ProblemSection({ problems }: { problems: Problem[] }) {
  return (
    <Section wide id="problem">
      <Section.Eyebrow>The Problem</Section.Eyebrow>
      <Section.Title>Job search broke your spirit.</Section.Title>
      <Section.Body>
        <p>
          You upload your resume. It scores 42 out of 100. The tool tells you to
          add more keywords. You tweak. You re-upload. 48 out of 100.{' '}
          <em>Try harder.</em>
        </p>
        <p>
          Meanwhile, auto-apply bots spam 200 jobs a day with generic cover
          letters. Recruiters can smell it. Your inbox fills with silence. And
          the bill comes every month whether you get an interview or not.
        </p>
      </Section.Body>

      <div className={styles.grid}>
        {problems.map((p) => (
          <div className={styles.card} key={p.title}>
            <div className={styles.icon} aria-hidden>
              {p.icon}
            </div>
            <div className={styles.cardTitle}>{p.title}</div>
            <div className={styles.cardDesc}>{p.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
    gap: '20px',
    marginTop: '56px',
  }),
  card: css({
    backgroundColor: 'bg.panel',
    borderWidth: '1px',
    borderColor: 'border.default',
    borderRadius: '16px',
    padding: '32px',
    transition: 'all 300ms ease',
    _hover: { borderColor: 'border.strong' },
  }),
  icon: css({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'accent.subtle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '18px',
  }),
  cardTitle: css({
    fontFamily: 'display',
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '10px',
    letterSpacing: '-0.01em',
  }),
  cardDesc: css({
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'fg.muted',
  }),
}