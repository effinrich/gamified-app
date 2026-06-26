// Domain shapes for the marketing landing feature.

export interface Problem {
  icon: string
  title: string
  desc: string
}

export interface Step {
  num: string
  title: string
  desc: string
}

export interface PricingTier {
  label: string
  price: { amount: string; unit?: string }
  name: string
  desc: string
  meta: string
  featured: boolean
}

export interface PhilosophyPair {
  q: string
  a: string
}
