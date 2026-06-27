import { forwardRef, type HTMLAttributes } from 'react'
import { css, cx } from 'styled-system/css'
import { Card } from './card'
import { Eyebrow, Text } from './text'
import { Heading } from './heading'

/**
 * Section — the marketing-page section shell.
 *
 * Built on Park UI's `Card` primitive (which renders a `<div>`) so the
 * underlying element is consistent with the rest of the design system while
 * preserving the editorial visual language (no border, no panel background,
 * just rhythm).
 *
 * Variants:
 *   - `default` (720px, single column)
 *   - `wide`     (1040px, used for the 3-card problem/pricing grids)
 *
 * Composition:
 *   <Section wide>
 *     <Section.Eyebrow>The Problem</Section.Eyebrow>
 *     <Section.Title>Job search broke your spirit.</Section.Title>
 *     <Section.Body><p>...</p></Section.Body>
 *   </Section>
 */
export type SectionProps = HTMLAttributes<HTMLDivElement> & {
  wide?: boolean
}

const sectionRootStyle = {
  padding: '100px 48px',
  maxWidth: '720px',
  margin: '0 auto',
  width: '100%',
}

const sectionWideStyle = {
  padding: '100px 48px',
  maxWidth: '1040px',
  margin: '0 auto',
  width: '100%',
}

const titleBase = css({
  fontFamily: 'display',
  fontSize: 'clamp(30px, 4vw, 44px)',
  fontWeight: '400',
  lineHeight: '1.1',
  letterSpacing: '-0.02em',
  marginBottom: '28px',
  textWrap: 'pretty',
  '& em': {
    fontStyle: 'italic',
    color: 'accent.solid',
  },
})

const bodyBase = css({
  fontFamily: 'display',
  fontSize: 'clamp(17px, 1.6vw, 19px)',
  lineHeight: '1.65',
  color: 'fg.muted',
  marginBottom: '8px',
  '& em': {
    fontStyle: 'italic',
    color: 'accent.solid',
  },
})

const SectionRoot = forwardRef<HTMLDivElement, SectionProps>(function Section(
  { wide, className, children, ...rest },
  ref,
) {
  return (
    <Card
      ref={ref}
      className={cx(css(wide ? sectionWideStyle : sectionRootStyle), className)}
      {...rest}
    >
      {children}
    </Card>
  )
})

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function SectionTitle({ className, ...rest }, ref) {
    return (
      <Heading
        ref={ref}
        as="h2"
        className={cx(titleBase, className)}
        {...rest}
      />
    )
  },
)

/**
 * Body renders a `<div>` (not a `<p>`) so consumers can legally nest their
 * own `<p>` — every landing partial does `<Section.Body><p>…</p></Section.Body>`,
 * and nesting a `<p>` inside another `<p>` is invalid HTML and triggers React
 * hydration warnings.
 */
const Body = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SectionBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx(bodyBase, className)}
        {...rest}
      />
    )
  },
)

export const Section = Object.assign(SectionRoot, {
  Eyebrow,
  Title,
  Body,
})