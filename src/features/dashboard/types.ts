// Shapes for the dashboard chrome (sidebar + milestone bar).

export type IconName = 'resume' | 'search' | 'check'

export interface NavItemConfig {
  to: '/app/resume' | '/app/discover' | '/app/tracker'
  label: string
  icon: IconName
  showCount?: boolean
}

export type MilestoneStatus = 'done' | 'current' | 'locked'

export interface Milestone {
  step: number
  name: string
  price: string
}

export interface MilestoneView extends Milestone {
  status: MilestoneStatus
  symbol: string
}
