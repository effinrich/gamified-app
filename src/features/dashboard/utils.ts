// Pure config + derivation for the dashboard chrome. No React.

import type { Milestone, MilestoneStatus, NavItemConfig } from './types'

export const NAV_ITEMS: NavItemConfig[] = [
  { to: '/app/resume', label: 'Resume', icon: 'resume' },
  { to: '/app/discover', label: 'Discover', icon: 'search' },
  { to: '/app/tracker', label: 'Tracker', icon: 'check', showCount: true },
]

export const MILESTONES: Milestone[] = [
  { step: 1, name: 'Build', price: '$29' },
  { step: 2, name: 'Apply', price: '$49 / 50 apps' },
  { step: 3, name: 'Interview', price: '$99 · Unlocks' },
]

/** Derive a milestone badge's visual status + glyph from the current milestone. */
export function milestoneState(
  step: number,
  current: number,
): { status: MilestoneStatus; symbol: string } {
  if (step === 1) {
    return { status: current >= 1 ? 'done' : 'locked', symbol: '✓' }
  }
  if (step === 3) {
    return current >= 3
      ? { status: 'current', symbol: '★' }
      : { status: 'locked', symbol: '3' }
  }
  // step 2 — the "Apply" milestone in progress
  if (current > 2) return { status: 'done', symbol: '✓' }
  if (current === 2) return { status: 'current', symbol: '2' }
  return { status: 'locked', symbol: '2' }
}
