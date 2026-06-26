import { useNavScrolled } from './hooks'
import { PHILOSOPHY, PRICING, PROBLEMS, STEPS } from './utils'
import { LandingNav } from './partials/LandingNav'
import { Hero } from './partials/Hero'
import { ProblemSection } from './partials/ProblemSection'
import { HowItWorks } from './partials/HowItWorks'
import { PricingSection } from './partials/PricingSection'
import { PhilosophySection } from './partials/PhilosophySection'
import { WaitlistCta } from './partials/WaitlistCta'
import { SiteFooter } from './partials/SiteFooter'

export function LandingPage() {
  // Section entrances are driven by Panda's `fadeIn` keyframe in styled-system,
  // so the page itself doesn't need an IntersectionObserver hook anymore.
  const scrolled = useNavScrolled()

  return (
    <>
      <LandingNav scrolled={scrolled} />
      <Hero />
      <ProblemSection problems={PROBLEMS} />
      <HowItWorks steps={STEPS} />
      <PricingSection tiers={PRICING} />
      <PhilosophySection pairs={PHILOSOPHY} />
      <WaitlistCta />
      <SiteFooter />
    </>
  )
}