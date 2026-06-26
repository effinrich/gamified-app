import { forwardRef, type HTMLAttributes } from "react"
import { cx } from "styled-system/css"
import { badge, type BadgeVariantProps } from "styled-system/recipes"

/**
 * Badge — small status / tag pill.
 *
 * Replaces: `.job-tag`, `.tracker-count`, `.nav-count`, `.skill-tag`,
 *           `.job-applied` — 5 ad-hoc tag classes.
 */
export type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariantProps

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(badge({ variant, size }), className)}
      {...rest}
    />
  )
})
