import { Link } from '@tanstack/react-router'
import { css, cx } from 'styled-system/css'
import { Button } from '~/components/ui/button'

/**
 * ErrorPanel — branded error and empty-state surface.
 *
 * Three variants:
 *   - `full`     — full-viewport, used at the marketing root and 404s
 *   - `inline`   — fits within the dashboard shell (sidebar/milestone stay)
 *   - `notFound` — same as `full` but with "404" eyebrow + go-home CTA
 *
 * Brand voice: no apologies, no shame. Soft Tooling copy.
 */
export type ErrorPanelProps = {
  variant?: 'full' | 'inline' | 'notFound'
  /** Small mono label shown above the title. */
  eyebrow?: string
  /** Editorial display title (Newsreader). */
  title: string
  /** Optional secondary line, muted. */
  body?: string
  /** Optional technical detail. Hidden by default in `full` and `notFound`. */
  detail?: string
  /** Primary CTA — a router Link to an internal route. */
  primaryAction?: { to: string; label: string }
  /** Secondary CTA — triggers an arbitrary callback (e.g., reload). */
  secondaryAction?: { label: string; onClick: () => void }
}

export function ErrorPanel({
  variant = 'full',
  eyebrow,
  title,
  body,
  detail,
  primaryAction,
  secondaryAction,
}: ErrorPanelProps) {
  return (
    <div className={cx(styles[variant].root)}>
      <div className={styles[variant].inner}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {body && <p className={styles.body}>{body}</p>}
        {detail && variant === 'inline' && (
          <pre className={styles.detail}>{detail}</pre>
        )}
        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction && (
              <Link to={primaryAction.to} className={styles.actionSlot}>
                <Button variant="solid" size="md">
                  {primaryAction.label}
                </Button>
              </Link>
            )}
            {secondaryAction && (
              <Button
                variant="outline"
                size="md"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  full: {
    root: css({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 48px',
      backgroundColor: 'bg.canvas',
    }),
    inner: css({
      maxWidth: '560px',
      textAlign: 'center',
    }),
  },
  inline: {
    root: css({
      padding: '60px 0',
    }),
    inner: css({
      maxWidth: '480px',
      margin: '0 auto',
      textAlign: 'center',
      backgroundColor: 'bg.panel',
      borderWidth: '1px',
      borderColor: 'border.default',
      borderRadius: '16px',
      padding: '48px 32px',
    }),
  },
  notFound: {
    root: css({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 48px',
      backgroundColor: 'bg.canvas',
    }),
    inner: css({
      maxWidth: '560px',
      textAlign: 'center',
    }),
  },
  eyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'accent.solid',
    marginBottom: '24px',
  }),
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(32px, 4.5vw, 48px)',
    fontWeight: 400,
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    color: 'fg.default',
    marginBottom: '20px',
    textWrap: 'pretty',
  }),
  body: css({
    fontSize: '17px',
    lineHeight: '1.7',
    color: 'fg.muted',
    marginBottom: '32px',
  }),
  detail: css({
    fontFamily: 'mono',
    fontSize: '12px',
    color: 'fg.muted',
    backgroundColor: 'bg.surface',
    borderWidth: '1px',
    borderColor: 'border.default',
    borderRadius: '8px',
    padding: '12px 16px',
    textAlign: 'left',
    overflow: 'auto',
    maxHeight: '160px',
    marginBottom: '24px',
  }),
  actions: css({
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  }),
  actionSlot: css({
    display: 'inline-block',
  }),
}