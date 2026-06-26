// All time-dependent behavior for the landing feature.
// The convention puts every useEffect here, named, so the page stays declarative.

import { useEffect, useState } from 'react'

/** True once the window has scrolled past `threshold` px. Drives the sticky-nav background. */
export function useNavScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}