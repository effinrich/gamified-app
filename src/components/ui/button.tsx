import { forwardRef, type ButtonHTMLAttributes } from "react"
import { css, cx } from "styled-system/css"
import { button, type ButtonVariantProps } from "styled-system/recipes"

/**
 * Button — Fairshot's primary action primitive.
 *
 * Styled with the Park UI Panda recipe (variants: solid | outline | ghost | link | subtle;
 * sizes: xs | sm | md | lg | xl | 2xl). Defaults to `type="button"` so it never accidentally
 * submits a surrounding form. Pass `type="submit"` explicitly when wrapping in a `<form>`.
 *
 * The legacy `styles.css` button pile (btn-primary, hero-cta-primary, nav-cta, email-submit,
 * tracker-btn) is replaced by this single component with size/variant props.
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, type = "button", variant, size, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(button({ variant, size }), css({ cursor: "pointer" }), className)}
        {...rest}
      />
    )
  },
)
