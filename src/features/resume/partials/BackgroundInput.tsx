import type { ChangeEvent } from 'react'
import { css } from 'styled-system/css'
import { Card } from '~/components/ui/card'
import { Heading } from '~/components/ui/heading'
import { Stack } from '~/components/ui/layout'
import { Text } from '~/components/ui/text'
import { Textarea } from '~/components/ui/textarea'

const inputStyles = {
  hint: css({
    marginTop: '12px',
    fontSize: '12px',
    color: 'fg.muted',
    fontStyle: 'italic',
    fontFamily: 'display',
  }),
}

interface BackgroundInputProps {
  value: string
  onChange: (value: string) => void
}

export function BackgroundInput({ value, onChange }: BackgroundInputProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Paste your background</Card.Title>
      </Card.Header>
      <Stack gap="3">
        <Text variant="muted">
          Drop a LinkedIn URL or paste your experience raw. We never score you down —
          we just find stronger framings.
        </Text>
        <Textarea
          placeholder="e.g. Senior Frontend Engineer at Acme Corp. Built design system used by 12 teams..."
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          rows={10}
          style={{ minHeight: '200px', resize: 'vertical', lineHeight: '1.6' }}
        />
        <div className={inputStyles.hint}>
          No AI shaming. No "weak action verbs." Just better framing.
        </div>
      </Stack>
    </Card>
  )
}
