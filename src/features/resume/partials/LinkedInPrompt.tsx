import { css } from 'styled-system/css'

const styles = {
  // Hairline-framed "Filed Note" (top + bottom rules, soft surface)
  note: css({
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderColor: 'border.subtle',
    backgroundColor: 'bg.surface',
    padding: '20px 24px',
  }),
  // Mono eyebrow row
  eyebrow: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '12px',
  }),
  eyebrowNumeral: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  eyebrowLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    fontWeight: 600,
  }),
  // Italic-accent lead sentence
  lead: css({
    fontFamily: 'display',
    fontSize: 'clamp(15px, 1.6vw, 18px)',
    lineHeight: 1.5,
    color: 'fg.default',
    margin: 0,
    textWrap: 'pretty',
  }),
  leadEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  // Numbered steps
  steps: css({
    margin: '16px 0',
    paddingLeft: '20px',
    fontSize: '13px',
    lineHeight: 1.6,
    color: 'fg.default',
  }),
  // Mono code display for the URL — `bg.canvas` background, hairline frame
  url: css({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'fg.subtle',
    backgroundColor: 'bg.canvas',
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    padding: '8px 12px',
    marginTop: '12px',
    marginBottom: '14px',
    wordBreak: 'break-all',
    letterSpacing: '0.04em',
  }),
  // Mono uppercase "Continue below" tag with arrow
  ctaTag: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  ctaArrow: css({
    display: 'inline-block',
    fontFamily: 'body',
  }),
}

interface LinkedInPromptProps {
  url: string
}

/**
 * Shown when the user pastes only a LinkedIn URL. Browsers can't scrape
 * LinkedIn (CORS, anti-bot) — we ask the user to copy their own public
 * profile text. Honest about the limitation, never fakes a fetch.
 *
 * Visual treatment: a quiet magazine-style "Filed Note" — hairline-framed
 * aside on a soft surface, mono eyebrow with the numeral in accent, an
 * italic-accent lead sentence, and a sharp mono CTA with a right arrow.
 */
export function LinkedInPrompt({ url }: LinkedInPromptProps) {
  return (
    <aside className={styles.note}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowNumeral}>Note</span>
        <span className={styles.eyebrowLabel}>A LinkedIn URL</span>
      </div>

      <p className={styles.lead}>
        <span className={styles.leadEm}>Browsers can't fetch LinkedIn</span> —
        they block it on purpose. Paste your profile text instead and we'll
        parse it the same way.
      </p>

      <ol className={styles.steps}>
        <li>
          Open your LinkedIn profile in another tab and click{' '}
          <strong>More → Save as PDF</strong> (or just select-all the About /
          Experience sections).
        </li>
        <li>Paste everything below this note — the parser handles the rest.</li>
      </ol>

      {url && <div className={styles.url}>{url}</div>}

      <span className={styles.ctaTag} aria-hidden>
        Continue below
        <span className={styles.ctaArrow}>→</span>
      </span>
    </aside>
  )
}