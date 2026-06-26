import type { JobFilter } from '../types'
import { Button } from '~/components/ui/button'
import { HStack } from '~/components/ui/layout'

interface DiscoverFiltersProps {
  value: JobFilter
  onChange: (filter: JobFilter) => void
}

export function DiscoverFilters({ value, onChange }: DiscoverFiltersProps) {
  return (
    <HStack gap="2">
      <Button
        variant={value === 'all' ? 'solid' : 'outline'}
        size="sm"
        onClick={() => onChange('all')}
      >
        All
      </Button>
      <Button
        variant={value === 'quality' ? 'solid' : 'outline'}
        size="sm"
        onClick={() => onChange('quality')}
      >
        High Quality
      </Button>
    </HStack>
  )
}
