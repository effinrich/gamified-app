import { css, cx } from 'styled-system/css'
import type { PhilosophyPair } from '../types'
import { Section } from '~/components/ui/section'

export function PhilosophySection({ pairs }: { pairs: PhilosophyPair[] }) {
  // The flat PHILOSOPHY list pairs an indictment (even index) with its
  // Fairshot reply (odd index). We re-pair them here so each rendered row
  // reads as a single comparison: they-say vs we-say.
  const rounds: { indictment: PhilosophyPair; reply: PhilosophyPair }[] = []
  for (let i = 0; i < pairs.length; i += 2) {
    const indictment = pairs[i]
    const reply = pairs[i + 1]
    if (indictment && reply) rounds.push({ indictment, reply })
  }

  return (
    <Section id="philosophy">
      {/* Issue-row + dateline, mirroring the Hero/HowItWorks masthead. */}
      <div className={styles.masthead}>
        <span className={styles.issue}>Volume № 02</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>
          They say / We say — {rounds.length} rounds
        </span>
      </div>

      <Section.Eyebrow className={styles.eyebrow}>Our Stance</Section.Eyebrow>
      <Section.Title>
        We don't score your resume. <em>We rewrite the script.</em>
      </Section.Title>
      <Section.Body>
        <p>
          Other tools rate you. We don't. Your resume is a story, not a test. We
          make it better without making you feel worse.
        </p>
      </Section.Body>

      {/*
        Comparison spread. Each round pairs the industry indictment (left)
        with the Fairshot reply (right). One column gets the italic muted
        voice; the other gets the roman accent voice. Hairline divider
        and oversized italic round numeral frame each row.
      */}
      <div className={styles.grid}>
        {rounds.map(({ indictment, reply }, idx) => (
          <article
            className={styles.row}
            key={`${indictment.q}-${idx}`}
            style={{
              // Single orchestrated entrance — staggered via inline animation-delay.
              animationDelay: `${idx * 120}ms`,
            }}
          >
            {/* Round column — mono label + oversized italic numeral. */}
            <div className={styles.round}>
              <span className={styles.roundNum}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className={styles.roundLabel}>Round</span>
            </div>

            {/* Comparison pair: indictment on the left, reply on the right. */}
            <div className={styles.cols}>
              <div className={styles.col}>
                <div className={styles.colEyebrow}>{indictment.q}</div>
                <div className={cx(styles.voice, styles.voiceIndictment)}>
                  &ldquo;{indictment.a}&rdquo;
                </div>
              </div>

              <div className={styles.divider} aria-hidden />

              <div className={styles.col}>
                <div className={cx(styles.colEyebrow, styles.colEyebrowAlt)}>
                  {reply.q}
                </div>
                <div className={cx(styles.voice, styles.voiceReply)}>
                  &ldquo;{reply.a}&rdquo;
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

const styles = {
  masthead: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '56px',
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
  eyebrow: css({
    display: 'inline-block',
    marginBottom: '20px',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '120ms',
    animationFillMode: 'both',
  }),
  grid: css({
    display: 'flex',
    flexDirection: 'column',
    gap: { base: '40px', md: '56px' },
    marginTop: '72px',
  }),
  row: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '72px 1fr' },
    columnGap: { base: '0', md: '32px' },
    rowGap: { base: '20px', md: '0' },
    paddingTop: { base: '20px', md: '32px' },
    borderTopWidth: '1px',
    borderColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
  }),
  round: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: { base: 'flex-start', md: 'flex-end' },
    gap: '4px',
  }),
  // Oversized italic numeral — mirrors PricingSection's priceFeatured and
  // HowItWorks's stepNum. Acts as the typographic anchor of each round.
  roundNum: css({
    fontFamily: 'display',
    fontSize: { base: '40px', md: '48px' },
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: '1',
    letterSpacing: '-0.04em',
    color: 'accent.solid',
  }),
  roundLabel: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
  }),
  cols: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '1fr 1px 1fr' },
    columnGap: { base: '0', md: '40px' },
    rowGap: { base: '16px', md: '0' },
    alignItems: 'start',
  }),
  divider: css({
    display: { base: 'none', md: 'block' },
    width: '1px',
    alignSelf: 'stretch',
    backgroundColor: 'border.default',
  }),
  col: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  }),
  colEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
  }),
  // Reply column's eyebrow sits in teal — names the column voice in the masthead.
  colEyebrowAlt: css({
    color: 'accent.solid',
  }),
  voice: css({
    fontFamily: 'display',
    lineHeight: '1.4',
    margin: 0,
    maxWidth: '42ch',
    textWrap: 'pretty',
  }),
  // Indictment — italic, muted. Sits in the supporting voice.
  voiceIndictment: css({
    fontStyle: 'italic',
    fontSize: { base: '18px', md: '22px' },
    color: 'fg.subtle',
  }),
  // Reply — roman, large, default fg. Carries the editorial weight.
  voiceReply: css({
    fontStyle: 'normal',
    fontSize: { base: '22px', md: '28px' },
    fontWeight: 400,
    letterSpacing: '-0.02em',
    color: 'fg.default',
  }),
}
