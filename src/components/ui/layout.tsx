import { forwardRef, type HTMLAttributes } from "react"
import { css, cx } from "styled-system/css"

/**
 * Stack — vertical rhythm. Renders a `<div>` with `display: flex; flex-direction: column`.
 * The `gap` prop maps to Panda's spacing tokens (e.g. `gap="3"` → 12px).
 */
export type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16"
  align?: "stretch" | "start" | "center" | "end"
}

const gapMap: Record<NonNullable<StackProps["gap"]>, string> = {
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "8": "32px",
  "10": "40px",
  "12": "48px",
  "16": "64px",
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = "4", align = "stretch", className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        css({
          display: "flex",
          flexDirection: "column",
          alignItems: align,
        }),
        className,
      )}
      style={{ gap: gapMap[gap], ...style }}
      {...rest}
    />
  )
})

/**
 * HStack — horizontal rhythm. Same `gap` axis as Stack.
 */
export const HStack = forwardRef<HTMLDivElement, StackProps>(function HStack(
  { gap = "3", align = "center", className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        css({
          display: "flex",
          flexDirection: "row",
          alignItems: align,
        }),
        className,
      )}
      style={{ gap: gapMap[gap], ...style }}
      {...rest}
    />
  )
})
