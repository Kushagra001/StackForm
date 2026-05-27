/**
 * Async GSAP loader
 *
 * Import this instead of importing gsap/ScrollTrigger at the top-level.
 * Dynamic imports keep GSAP out of the initial JS parse path, which is the
 * primary cause of the 20,000+ ms Total Blocking Time score.
 *
 * Usage (inside useEffect only):
 *   const { gsap, ScrollTrigger } = await loadGsap()
 */

let cached: Promise<{ gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }> | null = null

export function loadGsap() {
  if (cached) return cached
  cached = Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]).then(([gsapMod, stMod]) => {
    const { gsap } = gsapMod
    const { ScrollTrigger } = stMod
    gsap.registerPlugin(ScrollTrigger)
    return { gsap, ScrollTrigger }
  })
  return cached
}
