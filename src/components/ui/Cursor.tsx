'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Touch device → no cursor
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Show after first move
    dot.style.opacity = '0'
    ring.style.opacity = '0'

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'none' })

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xDot(e.clientX)
      yDot(e.clientY)
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    // Hover expand on interactive elements
    const handleEnter = () => {
      gsap.to(ring, { scale: 2.5, borderColor: 'rgba(79,110,247,0.8)', duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const handleLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(79,110,247,0.5)', duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const targets = document.querySelectorAll('a,button,[role="button"]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#4f6ef7',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          transform: 'translate(0px, 0px)',
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(79,110,247,0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(0px, 0px)',
        }}
      />
    </>
  )
}
