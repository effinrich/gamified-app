import { css, cx } from 'styled-system/css'
import type { MilestoneStatus, MilestoneView } from '../types'
import { Card } from '~/components/ui/card'
import { HStack } from '~/components/ui/layout'

const styles = {
  root: css({
    padding: '16px 8px',
    marginBottom: '28px',
  }),
  step: css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 16px',
    position: 'relative',
  }),
  stepDivider: css({
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1px',
    height: '32px',
    backgroundColor: 'border.default',
  }),
  badge: (status: MilestoneStatus) =>
    css({
      width: '36px',
      height: '36px',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'mono',
      fontSize: '12px',
      fontWeight: 600,
      flexShrink: 0,
      backgroundColor:
        status === 'done' || status === 'current'
          ? status === 'done'
            ? 'green.solid'
            : 'accent.solid'
          : 'border.subtle',
      color:
        status === 'locked' ? 'fg.muted' : 'white',
      boxShadow: status === 'current' ? '0 0 0 4px token(colors.accent.subtle)' : 'none',
    }),
  info: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  }),
  name: css({
    fontSize: '14px',
    fontWeight: 600,
    color: 'fg.default',
  }),
  price: css({
    fontFamily: 'mono',
    fontSize: '12px',
    color: 'fg.muted',
  }),
}

export function MilestoneBar({ steps }: { steps: MilestoneView[] }) {
  return (
    <Card className={styles.root}>
      <HStack gap="1" align="stretch">
        {steps.map((s, i) => (
          <div className={styles.step} key={s.step}>
            {i < steps.length - 1 && <div className={styles.stepDivider} aria-hidden />}
            <div className={cx(styles.badge(s.status))}>{s.symbol}</div>
            <div className={styles.info}>
              <div className={styles.name}>{s.name}</div>
              <div className={styles.price}>{s.price}</div>
            </div>
          </div>
        ))}
      </HStack>
    </Card>
  )
}
