import { useState } from 'react'
import { css } from 'styled-system/css'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export function WaitlistCta() {
  const [joined, setJoined] = useState(false)

  return (
    <section className={styles.root} id="waitlist">
      <div className={styles.inner}>
        <h2 className={styles.title}>Ready to stop job-searching alone?</h2>
        <p className={styles.body}>
          We're building Fairshot for people who are tired of tools that make them
          feel inadequate. Get early access and help shape what comes next.
        </p>
        {joined ? (
          <p className={styles.note}>
            Thanks — you're on the list. We'll be in touch.
          </p>
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
              style={{ flex: 1 }}
            />
            <Button type="submit" variant="solid" size="lg">
              Join waitlist
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

const styles = {
  root: css({
    backgroundColor: 'bg.panel',
    borderTopWidth: '1px',
    borderColor: 'border.default',
    borderBottomWidth: '1px',
    padding: '100px 48px',
    textAlign: 'center',
  }),
  inner: css({
    maxWidth: '560px',
    margin: '0 auto',
  }),
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(28px, 3.5vw, 40px)',
    fontWeight: 400,
    lineHeight: '1.15',
    marginBottom: '20px',
    textWrap: 'pretty',
  }),
  body: css({
    fontSize: '17px',
    lineHeight: '1.7',
    color: 'fg.muted',
    marginBottom: '36px',
  }),
  form: css({
    display: 'flex',
    gap: '10px',
    maxWidth: '420px',
    margin: '0 auto',
  }),
  note: css({
    marginTop: '16px',
    fontSize: '13px',
    color: 'accent.solid',
    fontFamily: 'mono',
    letterSpacing: '0.04em',
  }),
}