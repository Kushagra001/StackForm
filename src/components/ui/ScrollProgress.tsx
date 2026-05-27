'use client'
import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    loadGsap().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.to(barRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
        })
      })
      cleanup = () => ctx.revert()
    })
    return () => cleanup?.()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-sf-border origin-left scale-x-0" ref={barRef}
      style={{ background: '#4f6ef7' }}
    />
  )
}
