import { defineRecipe } from '@pandacss/dev'

export const text = defineRecipe({
  className: 'text',
  variants: {
    variant: {
      muted: {
        color: 'fg.muted',
      },
    },
  },
})
