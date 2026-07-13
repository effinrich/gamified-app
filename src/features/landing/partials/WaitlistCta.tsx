import { useState } from 'react'
import { css } from 'styled-system/css'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Heading } from '~/components/ui/heading'
import { Eyebrow, Text } from '~/components/ui/text'

/**
 * WaitlistCta — the closing editorial spread.
 *
 * Reads as the magazine's back cover: a `Final · 03` masthead anchors the top,
 * an oversized italic display line carries the closing argument, and the
 * form lives inside a hairline-framed column on the right. The whole
 * composition is a single 12-col gutter-pinned grid — eyebrow pinned to the
 * 72px gutter, the headline + form consuming the 1fr column.
 */
export function WaitlistCta() {
  const [joined, setJoined] = useState(false)

  return (
    <section className={styles.root} id="waitlist">
      {/* Masthead: Issue-style chip + hairline + dateline. Single editorial
          chrome row that frames this as the magazine's final spread. */}
      <div className={styles.masthead}>
        <span className={styles.issue}>Final · 03</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>Apply for early access</span>
      </div>

      {/* Hairline rule under the masthead — closes the chrome and starts the spread */}
      <div className={styles.topRule} aria-hidden />

      {/* Gutter-pinned grid: 72px gutter pins the section's "what is this" label,
          the rest of the row carries the editorial headline + form. */}
      <div className={styles.layout}>
        <div className={styles.gutter}>
          <span className={styles.gutterLabel}>Closing</span>
          <span className={styles.gutterLabel}>Argument</span>
          <span className={styles.gutterMeta}>Vol. 03</span>
        </div>

        <div className={styles.spread}>
          <Eyebrow className={styles.eyebrow}>Ready when you are</Eyebrow>
          <Heading as="h2" className={styles.title}>
            Stop job-searching <em className={styles.titleEm}>alone.</em>
          </Heading>

          <Text variant="muted" className={styles.body}>
            We're building Fairshot for people who are tired of tools that make
            them feel inadequate. Leave your email and you'll be among the first
            in line.
          </Text>

          {joined ? (
            <div className={styles.thanksRow} role="status" aria-live="polite">
              <span className={styles.thanksChip}>Received</span>
              <Text className={styles.thanksCopy}>
                Thanks — you're on the list. We'll be in touch.
              </Text>
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
                name="email"
                autoComplete="email"
                aria-label="Email address"
                size="lg"
                placeholder="you@example.com"
                required
                className={styles.input}
              />
              <Button type="submit" variant="solid" size="lg" className={styles.submit}>
                Join waitlist <span className={styles.submitArrow} aria-hidden>→</span>
              </Button>
            </form>
          )}

          <div className={styles.fineprint}>
            One email. No subscription. Unsubscribe by replying stop.
          </div>
        </div>
      </div>

      {/* Bottom hairline — frames the section as a self-contained spread */}
      <div className={styles.bottomRule} aria-hidden />
    </section>
  )
}

const styles = {
  root: css({
    position: 'relative',
    backgroundColor: 'bg.surface',
    padding: { base: '80px 48px', md: '120px 48px' },
  }),
  masthead: css({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
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
  topRule: css({
    maxWidth: '1200px',
    margin: '0 auto 64px',
    height: '1px',
    backgroundColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '80ms',
  }),
  layout: css({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '72px 1fr' },
    gap: { base: '32px', md: '56px' },
    alignItems: 'start',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '160ms',
  }),
  gutter: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingTop: '8px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  gutterLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  gutterMeta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    marginTop: '24px',
    fontWeight: 600,
  }),
  spread: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }),
  eyebrow: css({
    display: 'inline-block',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '200ms',
  }),
  title: css({
    fontFamily: 'display',
    // Editorial ceiling — big enough to feel like a closing headline, small
    // enough to keep "Ready to stop job-searching alone?" readable at the
    // wide breakpoint. Pulls into italic via the inner `<em>`.
    fontSize: 'clamp(40px, 5.4vw, 80px)',
    fontWeight: 400,
    lineHeight: '1.02',
    letterSpacing: '-0.03em',
    margin: 0,
    textWrap: 'balance',
    color: 'fg.default',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '280ms',
  }),
  titleEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  body: css({
    fontFamily: 'display',
    fontSize: 'clamp(17px, 1.6vw, 19px)',
    lineHeight: '1.7',
    maxWidth: '52ch',
    margin: 0,
    color: 'fg.muted',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '360ms',
  }),
  form: css({
    display: 'flex',
    gap: '12px',
    alignItems: 'stretch',
    maxWidth: '560px',
    marginTop: '8px',
    flexWrap: 'wrap',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '440ms',
  }),
  input: css({
    flex: { base: '1 0 100%', md: '1 1 280px' },
  }),
  submit: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  }),
  submitArrow: css({
    fontFamily: 'body',
    fontStyle: 'normal',
    display: 'inline-block',
    transition: 'transform 240ms ease',
  }),
  thanksRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginTop: '8px',
    animation: 'fadeIn 600ms ease both',
  }),
  thanksChip: css({
    fontFamily: 'mono',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'accent.solid',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    padding: '4px 10px',
    lineHeight: '1',
  }),
  thanksCopy: css({
    color: 'fg.muted',
    fontSize: '15px',
    margin: 0,
  }),
  fineprint: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.subtle',
    marginTop: '16px',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '520ms',
  }),
  bottomRule: css({
    maxWidth: '1200px',
    margin: '72px auto 0',
    height: '1px',
    backgroundColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '600ms',
  }),
}