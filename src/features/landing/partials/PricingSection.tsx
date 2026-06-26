import { css, cx } from 'styled-system/css'
import type { PricingTier } from '../types'
import { Section } from '~/components/ui/section'

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
        {tiers.map((tier) => (
          <div
            className={cx(styles.card, tier.featured && styles.featured)}
            key={tier.label}
          >
            {tier.featured && <div className={styles.accentBar} aria-hidden />}
            <div className={styles.label}>{tier.label}</div>
            <div className={styles.price}>
              {tier.price.amount}
              {tier.price.unit && (
                <span className={styles.priceUnit}>{tier.price.unit}</span>
              )}
            </div>
            <div className={styles.name}>{tier.name}</div>
            <div className={styles.desc}>{tier.desc}</div>
            <div className={styles.meta}>{tier.meta}</div>
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
    padding: '36px 32px',
    transition: 'all 300ms ease',
    position: 'relative',
    overflow: 'hidden',
  }),
  featured: css({
    borderColor: 'accent.solid',
    boxShadow: '0 0 0 1px token(colors.accent.solid)',
  }),
  accentBar: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: 'accent.solid',
  }),
  label: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'fg.muted',
    marginBottom: '16px',
  }),
  price: css({
    fontFamily: 'display',
    fontSize: '40px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: '8px',
  }),
  priceUnit: css({
    fontSize: '16px',
    fontWeight: 400,
    color: 'fg.muted',
  }),
  name: css({
    fontSize: '17px',
    fontWeight: 600,
    marginBottom: '16px',
  }),
  desc: css({
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'fg.muted',
    marginBottom: '24px',
  }),
  meta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'accent.solid',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  }),
}