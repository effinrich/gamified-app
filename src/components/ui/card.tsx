import { forwardRef, type HTMLAttributes } from "react"
import { css, cx } from "styled-system/css"
import { card, type CardVariantProps } from "styled-system/recipes"

/**
 * Card — the primary content surface across the app.
 *
 * Slot-based composition (matches Park UI's card recipe):
 *   <Card>
 *     <Card.Header>
 *       <Card.Title>Title</Card.Title>
 *       <Card.Description>Subtitle</Card.Description>
 *     </Card.Header>
 *     <Card.Body>Main content</Card.Body>
 *     <Card.Footer>Actions</Card.Footer>
 *   </Card>
 *
 * Replaces: `.card`, `.problem-card`, `.pricing-card`, `.job-card`,
 *           `.tracker-card`, `.milestone-step` (outer) — 6+ card variants
 *           with a single component.
 */
export type CardProps = HTMLAttributes<HTMLDivElement> & CardVariantProps

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { className, ...rest },
  ref,
) {
  const slots = card()
  return (
    <div ref={ref} className={cx(slots.root, className)} {...rest} />
  )
})

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    const slots = card()
    return (
      <div ref={ref} className={cx(slots.header, className)} {...rest} />
    )
  },
)

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, style, ...rest }, ref) {
    const slots = card()
    return (
      <h3
        ref={ref}
        className={cx(
          css({
            fontFamily: 'display',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }),
          slots.title,
          className,
        )}
        style={style}
        {...rest}
      />
    )
  },
)

const Description = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...rest }, ref) {
  const slots = card()
  return (
    <p ref={ref} className={cx(slots.description, className)} {...rest} />
  )
})

const Body = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...rest }, ref) {
    const slots = card()
    return (
      <div ref={ref} className={cx(slots.body, className)} {...rest} />
    )
  },
)

const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    const slots = card()
    return (
      <div ref={ref} className={cx(slots.footer, className)} {...rest} />
    )
  },
)

// Attach slot components as static properties of the public Card export.
export const Card = Object.assign(CardRoot, {
  Header,
  Title,
  Description,
  Body,
  Footer,
})
