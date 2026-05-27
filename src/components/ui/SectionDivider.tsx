'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'

export function SectionDivider() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return
    let cleanup: (() => void) | undefined
    loadGsap().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
      cleanup = () => ctx.revert()
    })
    return () => cleanup?.()
  }, [])

  return (
    <div
      ref={lineRef}
      className="w-full h-px origin-left"
      style={{ backgroundColor: 'rgba(240,240,255,0.08)' }}
    />
  )
}
