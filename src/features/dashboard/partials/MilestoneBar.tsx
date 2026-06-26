import { css, cx } from 'styled-system/css'
import type { MilestoneStatus, MilestoneView } from '../types'

const barStyles = {
  root: css({
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: 'bg.panel',
    borderWidth: '1px',
    borderColor: 'border.default',
    borderRadius: '12px',
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
    <div className={barStyles.root}>
      {steps.map((s, i) => (
        <div className={barStyles.step} key={s.step}>
          {i < steps.length - 1 && <div className={barStyles.stepDivider} aria-hidden />}
          <div className={barStyles.badge(s.status)}>{s.symbol}</div>
          <div className={barStyles.info}>
            <div className={barStyles.name}>{s.name}</div>
            <div className={barStyles.price}>{s.price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
