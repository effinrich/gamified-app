import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { cx } from "styled-system/css"
import { input, type InputVariantProps } from "styled-system/recipes"

/**
 * Input — single-line text field. Sizes: 2xs | xs | sm | md | lg | xl | 2xl.
 * Replaces: `.input` and the single-line half of `.email-input`.
 *
 * Note: `size` is overridden by the variant prop, so we omit the HTML
 * `size` attribute (which is a numeric column count) before intersecting.
 */
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  InputVariantProps

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, type = "text", ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cx(input({ size }), className)}
      {...rest}
    />
  )
})

/**
 * Textarea — multi-line. Same `size` axis as Input, but height grows with rows.
 * Replaces: `.textarea` (the resume background input).
 */
type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> &
  InputVariantProps

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, size, rows = 8, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cx(input({ size }), className)}
        {...rest}
      />
    )
  },
)