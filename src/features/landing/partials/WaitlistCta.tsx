import { useState } from 'react'
import { css } from 'styled-system/css'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export function WaitlistCta() {
  const [joined, setJoined] = useState(false)

  return (
    <section className={styles.root} id="waitlist">
      {/* Magazine masthead — closes the issue. */}
      <div className={styles.masthead}>
        <span className={styles.final}>Final · 03</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>A standing invitation</span>
      </div>

      <div className={styles.inner}>
        {/* Asymmetric opener: oversized numeral on the left, headline +
            body on the right. Reads as the closing spread of the issue. */}
        <div className={styles.spread}>
          <div className={styles.numeralColumn}>
            <div className={styles.numeral} aria-hidden>
              04
            </div>
            <div className={styles.numeralCaption}>
              The door is open. Walk through it when you're ready.
            </div>
          </div>

          <div className={styles.bodyColumn}>
            <div className={styles.eyebrow}>Early access</div>
            <h2 className={styles.title}>
              Ready to stop job-searching alone?
            </h2>
            <p className={styles.standfirst}>
              We're building Fairshot for people who are tired of tools that
              make them feel inadequate. Get early access and help shape
              what comes next.
            </p>
          </div>
        </div>

        {/* Form — sits below the spread on its own hairline-bounded band,
            centered so it reads as the closing punctuation. */}
        <div className={styles.formBand}>
          <div className={styles.formRule} aria-hidden />
          <div className={styles.formInner}>
            {joined ? (
              <div className={styles.note}>
                <span className={styles.noteChip} aria-hidden>
                  Filed
                </span>
                <span className={styles.noteText}>
                  Thanks — you're on the list. We'll be in touch.
                </span>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  setJoined(true)
                }}
              >
                <Input
                  type="email"
                  size="lg"
                  placeholder="you@example.com"
                  required
                  className={styles.input}
                />
                <Button type="submit" variant="solid" size="lg">
                  Join waitlist
                </Button>
              </form>
            )}
          </div>
          <div className={styles.formRule} aria-hidden />
        </div>
      </div>
    </section>
  )
}

const styles = {
  root: css({
    position: 'relative',
    backgroundColor: 'bg.panel',
    borderTopWidth: '1px',
    borderColor: 'border.default',
    borderBottomWidth: '1px',
    padding: { base: '80px 28px', md: '120px 48px' },
    animation: 'fadeIn 700ms ease both',
  }),
  inner: css({
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  }),
  masthead: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '72px',
    animation: 'fadeIn 600ms ease both',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  }),
  final: css({
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
    display: 'block',
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(40px, 6.4vw, 104px)',
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
    maxWidth: '54ch',
    margin: 0,
  }),
  formBand: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginTop: '56px',
    alignItems: 'stretch',
  }),
  formRule: css({
    height: '1px',
    width: '100%',
    backgroundColor: 'border.subtle',
  }),
  formInner: css({
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
  }),
  form: css({
    display: 'flex',
    gap: '12px',
    width: '100%',
    maxWidth: '520px',
    alignItems: 'stretch',
  }),
  input: css({
    flex: 1,
    minWidth: 0,
  }),
  note: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    backgroundColor: 'accent.subtle',
  }),
  noteChip: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
    padding: '4px 8px',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    lineHeight: 1,
  }),
  noteText: css({
    fontFamily: 'display',
    fontSize: '16px',
    color: 'fg.default',
    fontStyle: 'italic',
  }),
}