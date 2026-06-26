import { forwardRef, type HTMLAttributes } from "react"
import { css, cx } from "styled-system/css"

/**
 * Heading — serif display headings (Newsreader).
 * Tones the soft editorial feel of the brand across the dashboard.
 * `as` lets callers override the tag while keeping the styling.
 */
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4"
  size?: "sm" | "md" | "lg" | "xl"
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    { as: Tag = "h2", size = "lg", className, children, ...rest },
    ref,
  ) {
    const sizeMap = {
      sm: { fontSize: "20px", lineHeight: "1.3" },
      md: { fontSize: "24px", lineHeight: "1.25" },
      lg: { fontSize: "32px", lineHeight: "1.15", letterSpacing: "-0.02em" },
      xl: { fontSize: "40px", lineHeight: "1.1", letterSpacing: "-0.02em" },
    } as const

    return (
      <Tag
        ref={ref as never}
        className={cx(
          css({
            fontFamily: "display",
            fontWeight: 600,
            color: "fg.default",
            textWrap: "pretty",
          }),
          className,
        )}
        style={sizeMap[size]}
        {...rest}
      >
        {children}
      </Tag>
    )
  },
)

/**
 * Eyebrow — small uppercase mono label that sits above section titles.
 * The "soft tooling" signpost, repeated throughout.
 */
export const Eyebrow = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function Eyebrow({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cx(
        css({
          fontFamily: "mono",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "accent.default",
          marginBottom: "20px",
        }),
        className,
      )}
      {...rest}
    />
  )
})

/**
 * Text — body copy with a muted variant for secondary info.
 */
export const Text = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement> & {
  muted?: boolean
}>(function Text({ muted, className, ...rest }, ref) {
  return (
    <p
      ref={ref}
      className={cx(
        css({
          fontSize: "15px",
          lineHeight: "1.65",
          color: muted ? "fg.muted" : "fg.default",
        }),
        className,
      )}
      {...rest}
    />
  )
})
