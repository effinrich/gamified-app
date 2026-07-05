import { css, cx } from 'styled-system/css'
import type { PricingTier } from '../types'
import { Section } from '~/components/ui/section'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Eyebrow } from '~/components/ui/text'

type CtaCopy = { label: string; href: string }

// Editorial rate-card copy. Voice: pay-when-it-works, no pressure.
const CTAS: Record<string, CtaCopy> = {
  build: { label: 'Start building', href: '#waitlist' },
  apply: { label: 'Apply at scale', href: '#waitlist' },
  interview: { label: 'Unlock prep', href: '#waitlist' },
}

export function PricingSection({ tiers }: { tiers: PricingTier[] }) {
  return (
    <Section wide id="pricing">
      <Section.Eyebrow>Pricing</Section.Eyebrow>
      <Section.Title>Pay for progress, not promises.</Section.Title>
      <Section.Body>
        <p>
          Most tools charge you to <em>try.</em> We charge you when something
          actually happens. Each milestone unlocks the next. No subscriptions.
          No cancellation anxiety.
        </p>
      </Section.Body>

      <div className={styles.grid}>
        {tiers.map((tier, idx) => {
          const slug = tier.label.toLowerCase().includes('build')
            ? 'build'
            : tier.label.toLowerCase().includes('apply')
              ? 'apply'
              : 'interview'
          const cta = CTAS[slug]!
          const num = idx === 0 ? '01' : idx === 1 ? '02' : '03'
          return (
            <Card
              className={cx(
                styles.card,
                tier.featured && styles.featured,
              )}
              key={tier.label}
            >
              {/* Eyebrow + milestone chip on a single editorial row */}
              <div className={styles.eyebrowRow}>
                <Eyebrow className={styles.eyebrow}>
                  Milestone {num} / {shortMilestone(tier.name)}
                </Eyebrow>
                {tier.featured && (
                  <span className={styles.chip} aria-hidden>
                    M02
                  </span>
                )}
              </div>

              {/* Hairline under the eyebrow — sets the editorial frame */}
              <div className={styles.eyebrowRule} aria-hidden />

              {/* Price is the typographic hero of the card */}
              <div className={styles.priceBlock}>
                <div
                  className={cx(
                    styles.price,
                    tier.featured && styles.priceFeatured,
                  )}
                >
                  {tier.price.amount}
                </div>
                {tier.price.unit && (
                  <div className={styles.priceUnit}>{tier.price.unit}</div>
                )}
              </div>

              {/* Hairline under the price */}
              <div className={styles.priceRule} aria-hidden />

              {/* Name + description sit above the footer CTA */}
              <div className={styles.body}>
                <div className={styles.name}>{tier.name}</div>
                <div className={styles.desc}>{tier.desc}</div>
              </div>

              {/* Meta line — mono caption, accent for featured, muted otherwise */}
              <div
                className={cx(
                  styles.meta,
                  tier.featured && styles.metaFeatured,
                )}
              >
                {tier.meta}
              </div>

              <div className={styles.cta}>
                <Button
                  asChild
                  variant={tier.featured ? 'solid' : 'outline'}
                  size="md"
                >
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

// Pulls the verb out of the milestone name for the eyebrow strip.
// "Build & Optimize" → "Build"; "Apply at Scale" → "Apply"; etc.
function shortMilestone(name: string): string {
  const first = name.split(/\s|&/)[0] ?? name
  return first.trim()
}

const styles = {
  grid: css({
    display: 'grid',
    // Featured middle tier gets more breathing room than its siblings.
    gridTemplateColumns: {
      base: '1fr',
      md: '1fr 1.18fr 1fr',
    },
    gap: { base: '16px', md: '20px' },
    marginTop: '64px',
    alignItems: 'stretch',
  }),
  card: css({
    padding: { base: '32px 28px', md: '40px 32px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    position: 'relative',
    transition: 'all 300ms ease',
    _hover: { borderColor: 'border.strong' },
  }),
  // Featured tier — thicker frame, slightly raised, wider column already
  // accounted for in `grid`. Surface tint leans into the warm canvas without
  // introducing a new token.
  featured: css({
    borderColor: 'border.strong',
    boxShadow: '0 0 0 1px token(colors.border.strong)',
    paddingTop: { base: '40px', md: '56px' },
    paddingBottom: { base: '40px', md: '56px' },
  }),
  eyebrowRow: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '14px',
  }),
  eyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    fontWeight: 500,
  }),
  // Sharp teal numeric chip — only on the featured card.
  chip: css({
    fontFamily: 'mono',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.14em',
    color: 'accent.solid',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    padding: '3px 8px',
    lineHeight: '1',
  }),
  eyebrowRule: css({
    height: '1px',
    backgroundColor: 'border.default',
    marginBottom: '28px',
  }),
  priceBlock: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '24px',
  }),
  // Price is the typographic hero. Slightly smaller on siblings so the
  // featured tier's $49 still feels like the editorial centerpiece.
  price: css({
    fontFamily: 'display',
    fontSize: { base: '56px', md: '72px' },
    fontWeight: 400,
    lineHeight: '0.95',
    letterSpacing: '-0.04em',
    color: 'fg.default',
  }),
  priceFeatured: css({
    fontSize: { base: '80px', md: '112px' },
    color: 'accent.solid',
    fontWeight: 500,
    // Pull the numeral into the canvas with a subtle italic — borrows the
    // Hero's italic-accent gesture without copying it wholesale.
    fontStyle: 'italic',
  }),
  priceUnit: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.muted',
  }),
  priceRule: css({
    height: '1px',
    backgroundColor: 'border.default',
    marginBottom: '24px',
  }),
  body: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '24px',
  }),
  name: css({
    fontFamily: 'display',
    fontSize: '20px',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    color: 'fg.default',
  }),
  desc: css({
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'fg.muted',
    maxWidth: '36ch',
  }),
  meta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.subtle',
    marginBottom: '28px',
  }),
  metaFeatured: css({
    color: 'accent.solid',
  }),
  cta: css({
    marginTop: 'auto',
  }),
}