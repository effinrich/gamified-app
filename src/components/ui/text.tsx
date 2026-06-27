import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { type TextVariantProps, text } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

type Props = TextVariantProps & { as?: React.ElementType }

export type TextProps = ComponentProps<typeof Text>
export const Text = styled('p', text) as StyledComponent<'p', Props>

/**
 * Eyebrow — a small mono uppercase label used above section headings.
 *
 * Re-added (refactor previously removed it). Styling matches the existing
 * `Section.Eyebrow` so visual language stays consistent across the app.
 */
export const Eyebrow = styled('span', {
  base: {
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'accent.solid',
  },
})
