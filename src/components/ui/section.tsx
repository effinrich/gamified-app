import { forwardRef, type HTMLAttributes } from "react"
import { css, cx } from "styled-system/css"

/**
 * Section — the marketing-page section shell.
 *
 * Variants:
 *   - `default` (560px body, single column)
 *   - `wide` (1040px, used for the 3-card problem/pricing grids)
 *
 * Composition:
 *   <Section wide>
 *     <Section.Eyebrow>The Problem</Section.Eyebrow>
 *     <Section.Title>Job search broke your spirit.</Section.Title>
 *     <Section.Body><p>...</p></Section.Body>
 *   </Section>
 *
 * Replaces: `.section`, `.section-wide`, `.section-eyebrow`,
 *           `.section-title`, `.section-body`.
 */
export type SectionProps = HTMLAttributes<HTMLElement> & {
  wide?: boolean
}

const SectionRoot = forwardRef<HTMLElement, SectionProps>(function Section(
  { wide, className, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cx(
        css({
          padding: '100px 48px',
          maxWidth: wide ? '1040px' : '720px',
          margin: '0 auto',
        }),
        className,
      )}
      {...rest}
    />
  )
})

const Eyebrow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SectionEyebrow({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          css({
            fontFamily: 'mono',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'accent.solid',
            marginBottom: '20px',
          }),
          className,
        )}
        {...rest}
      />
    )
  },
)

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function SectionTitle({ className, ...rest }, ref) {
    return (
      <h2
        ref={ref}
        className={cx(
          css({
            fontFamily: 'display',
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 400,
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            marginBottom: '28px',
            textWrap: 'pretty',
          }),
          className,
        )}
        {...rest}
      />
    )
  },
)

const Body = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SectionBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          css({
            fontSize: '17px',
            lineHeight: '1.75',
            color: 'fg.muted',
            maxWidth: '560px',
            '& p + p': { marginTop: '1.4em' },
            '& em': { fontStyle: 'italic', color: 'fg.default' },
          }),
          className,
        )}
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