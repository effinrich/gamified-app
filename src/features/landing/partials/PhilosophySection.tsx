import { css } from 'styled-system/css'
import type { PhilosophyPair } from '../types'

export function PhilosophySection({ pairs }: { pairs: PhilosophyPair[] }) {
  return (
    <section className={styles.root} id="philosophy">
      {/* Magazine masthead — keeps this section on the issue's spine. */}
      <div className={styles.masthead}>
        <span className={styles.volume}>Volume № 02</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>The case against resume scoring</span>
      </div>

      {/* Two-column asymmetric spread: oversized numeral on the left, body
          (eyebrow + standfirst) on the right. Reads like an editorial opener. */}
      <div className={styles.spread}>
        <div className={styles.numeralColumn}>
          <div className={styles.numeral} aria-hidden>
            02
          </div>
          <div className={styles.numeralCaption}>
            The other side says one thing. We say another.
          </div>
        </div>

        <div className={styles.bodyColumn}>
          <div className={styles.eyebrow}>Our Stance</div>
          <h2 className={styles.title}>
            We don't score your resume.
          </h2>
          <p className={styles.standfirst}>
            Other tools rate you. We don't. Your resume is a story, not a test.
            We make it better without making you feel worse.
          </p>
        </div>
      </div>

      {/* Pair spread — alternating column parity, hairline rules between
          rows, oversized mono numerals per pair. Three rows = three case
          studies, framed as a magazine comparison spread. */}
      <div className={styles.pairs}>
        {pairs.map((pair, i) => {
          const isOdd = i % 2 === 1
          const row = Math.floor(i / 2)
          return (
            <div
              className={styles.pairRow}
              data-row={row}
              data-parity={isOdd ? 'b' : 'a'}
              key={`${pair.q}-${i}`}
            >
              <div className={styles.pairRule} aria-hidden />
              <div className={styles.pairGrid}>
                <div className={styles.pairNumeral}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className={styles.pairSide}>
                  <div className={styles.pairLabel}>{pair.q}</div>
                  <div className={styles.pairQuote}>{pair.a}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer band — colophon-style byline for this spread. */}
      <div className={styles.footnote}>
        <span className={styles.footnoteRule} aria-hidden />
        <span className={styles.footnoteText}>
          Filed under Soft Tooling, Issue № 01.
        </span>
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
  volume: css({
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
  pairs: css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0',
  }),
  pairRow: css({
    position: 'relative',
    padding: { base: '32px 0', md: '44px 0' },
    '&[data-row="0"]': { paddingTop: '56px' },
    '&[data-row="2"]': {
      paddingBottom: '0',
    },
  }),
  pairRule: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: 'border.subtle',
  }),
  pairGrid: css({
    display: 'grid',
    gridTemplateColumns: { base: '64px 1fr', md: '96px 1fr' },
    gap: { base: '16px', md: '40px' },
    alignItems: 'start',
  }),
  pairNumeral: css({
    fontFamily: 'display',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(40px, 5vw, 64px)',
    lineHeight: '0.9',
    letterSpacing: '-0.03em',
    color: 'accent.solid',
  }),
  pairSide: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  }),
  pairLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.subtle',
    fontWeight: 500,
  }),
  pairQuote: css({
    fontFamily: 'display',
    fontSize: 'clamp(20px, 2.2vw, 28px)',
    fontWeight: 400,
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    color: 'fg.default',
    textWrap: 'pretty',
    margin: 0,
  }),
  footnote: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginTop: '64px',
  }),
  footnoteRule: css({
    flex: '0 0 48px',
    height: '1px',
    backgroundColor: 'border.default',
  }),
  footnoteText: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
  }),
}