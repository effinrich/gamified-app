import { css, cx } from 'styled-system/css'
import type { Job } from '~/shared/jobs'
import { scoreClass } from '../utils'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { HStack, Stack } from '~/components/ui/layout'
import { Text } from '~/components/ui/text'

interface JobCardProps {
  job: Job
  applied: boolean
  onApply: (job: Job) => void
}

const cardStyles = {
  root: css({
    transition: 'all 200ms ease',
    animation: 'fadeIn 450ms ease both',
    // Stagger: each card enters 60ms after the previous one.
    '&:nth-child(1)': { animationDelay: '0ms' },
    '&:nth-child(2)': { animationDelay: '60ms' },
    '&:nth-child(3)': { animationDelay: '120ms' },
    '&:nth-child(4)': { animationDelay: '180ms' },
    '&:nth-child(5)': { animationDelay: '240ms' },
    '&:nth-child(6)': { animationDelay: '300ms' },
    _hover: {
      borderColor: 'border.strong',
      boxShadow: '0 4px 16px token(colors.border.default)',
      transform: 'translateY(-1px)',
    },
  }),
  headerRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '12px',
  }),
  title: css({
    fontSize: '15px',
    fontWeight: 600,
    color: 'fg.default',
    lineHeight: '1.3',
  }),
  company: css({
    fontSize: '13px',
    color: 'fg.muted',
    marginTop: '2px',
  }),
  scoreBlock: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  }),
  scoreNum: (kind: 'good' | 'warning') =>
    css({
      fontFamily: 'mono',
      fontSize: '18px',
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      color: kind === 'good' ? 'green.fg' : 'amber.fg',
    }),
  scoreLabel: css({
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'fg.muted',
    fontFamily: 'mono',
  }),
  applied: css({
    fontFamily: 'mono',
    fontSize: '12px',
    color: 'accent.fg',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  }),
}

function Score({ value, label, goodAt }: { value: number; label: string; goodAt: number }) {
  const display = label === 'Response' ? `${value}%` : value.toString()
  return (
    <div className={cardStyles.scoreBlock}>
      <div className={cardStyles.scoreNum(scoreClass(value, goodAt))}>{display}</div>
      <div className={cardStyles.scoreLabel}>{label}</div>
    </div>
  )
}

export function JobCard({ job, applied, onApply }: JobCardProps) {
  return (
    <Card className={cardStyles.root}>
      <div className={cardStyles.headerRow}>
        <div>
          <div className={cardStyles.title}>{job.title}</div>
          <div className={cardStyles.company}>
            {job.company} · {job.location}
          </div>
        </div>
        <Badge variant="subtle" size="sm">
          {job.salary}
        </Badge>
      </div>

      <HStack gap="2" style={{ marginBottom: '14px', flexWrap: 'wrap' }}>
        {job.tags.map((t) => (
          <Badge key={t} variant="outline" size="sm">
            {t}
          </Badge>
        ))}
      </HStack>

      <HStack gap="6" style={{ marginBottom: '16px' }}>
        <Score value={job.transparency} label="Transparency" goodAt={80} />
        <Score value={job.response} label="Response" goodAt={60} />
        <Score value={job.fit} label="Fit" goodAt={80} />
      </HStack>

      {applied ? (
        <div className={cardStyles.applied}>✓ Applied</div>
      ) : (
        <HStack gap="2">
          <Button variant="solid" size="sm" onClick={() => onApply(job)}>
            Apply
          </Button>
          <Button variant="outline" size="sm">
            Save
          </Button>
        </HStack>
      )}
    </Card>
  )
}
