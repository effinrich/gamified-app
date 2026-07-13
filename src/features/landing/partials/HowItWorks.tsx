import { css } from 'styled-system/css'
import type { Step } from '../types'
import { Section } from '~/components/ui/section'
import { Eyebrow } from '~/components/ui/text'

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Section wide id="how">
      {/* Issue-row + dateline, mirroring the Hero masthead's editorial chrome. */}
      <div className={styles.masthead}>
        <span className={styles.issue}>Method № 03</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>Four passes, end to end</span>
      </div>

      <Section.Eyebrow className={styles.eyebrow}>How It Works</Section.Eyebrow>
      <Section.Title>We do the work. You do the interview.</Section.Title>
      <Section.Body>
        <p>
          Tell us once where you want to go. Our AI handles the rest — finding
          roles, tailoring applications, and keeping you in the loop without
          drowning you in noise.
        </p>
      </Section.Body>

      {/*
        Asymmetric 12-column editorial grid. Steps alternate column widths so
        the rhythm reads like a magazine spread rather than four equal tiles.
        Step 01 is wide (eyebrow + numeral hero), steps 02–04 narrow with
        their numerals oversized as the typographic anchor of each card.
      */}
      <div className={styles.grid}>
        {steps.map((step, idx) => {
          const colSpan = STEP_COL_SPAN[idx] ?? 3
          const isLead = idx === 0
          return (
            <article
              className={styles.step}
              data-lead={isLead ? 'true' : undefined}
              key={step.num}
              style={{
                gridColumn: `auto / span ${colSpan}`,
                // AnimationDelay is a runtime value — `style` is the right home.
                animationDelay: `${idx * 120}ms`,
              }}
            >
              <div className={styles.frameRule} aria-hidden />

              <div className={styles.stepHeader}>
                <Eyebrow className={styles.stepEyebrow}>Phase {step.num}</Eyebrow>
                <span className={styles.stepNum} aria-hidden data-lead={isLead ? 'true' : undefined}>
                  {step.num}
                </span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>

              {/* Mono caption — same role as PricingSection's meta line. */}
              <div className={styles.stepMeta}>{META[idx] ?? '—'}</div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

// Mono captions sit below the body copy. Voice: process, not promotion.
const META = ['Input', 'Discover', 'Tailor', 'Submit'] as const

// 12-col editorial spread. Step 01 owns the lead span (5 cols), 02–04 share
// the remaining 7 cols in a 3-2-2 cadence that breaks the equal-tile default.
// `grid-column: auto / span N` lets the browser place each step sequentially.
const STEP_COL_SPAN = [5, 3, 2, 2] as const

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
    display: 'grid',
    // 12-col editorial grid; falls back to single column on mobile.
    gridTemplateColumns: {
      base: '1fr',
      md: 'repeat(6, 1fr)',
      lg: 'repeat(12, 1fr)',
    },
    columnGap: { base: '0', md: '24px', lg: '32px' },
    rowGap: { base: '40px', md: '48px' },
    marginTop: '64px',
  }),
  step: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
    // Single orchestrated entrance — staggered via inline animation-delay.
    animation: 'fadeIn 600ms ease both',
    '&[data-lead="true"]': {
      // Lead step gets a hairline frame + slightly tinted surface to anchor
      // the spread without breaking the token palette.
      padding: { base: '24px 0', md: '32px 28px' },
      borderTopWidth: '1px',
      borderColor: 'border.strong',
      borderBottomWidth: '1px',
    },
  }),
  frameRule: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: 'border.default',
  }),
  stepHeader: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '24px',
  }),
  stepEyebrow: css({
    color: 'fg.muted',
  }),
  // Oversized numeral — the editorial anchor of each step. Mirrors the
  // PricingSection price block: italic + tracking-tight, italic reserved for
  // a featured/lead voice (here the lead step). Other steps use roman type
  // to keep them in the supporting cast.
  stepNum: css({
    fontFamily: 'display',
    fontSize: { base: '64px', md: '80px', lg: '96px' },
    fontWeight: 400,
    lineHeight: '0.9',
    letterSpacing: '-0.04em',
    color: 'fg.default',
    fontStyle: 'italic',
  }),
  body: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '24px',
  }),
  stepTitle: css({
    fontFamily: 'display',
    fontSize: { base: '22px', md: '26px' },
    fontWeight: 500,
    letterSpacing: '-0.01em',
    margin: 0,
    color: 'fg.default',
  }),
  stepDesc: css({
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'fg.muted',
    margin: 0,
    maxWidth: '36ch',
  }),
  // Mono caption — same role as PricingSection's `meta` strip.
  stepMeta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'fg.subtle',
    marginTop: 'auto',
  }),
}