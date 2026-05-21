'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return
    if (window.matchMedia('(hover: none)').matches) return

    const xTo = gsap.quickTo(blob, 'x', { duration: 0.06, ease: 'power1.out' })
    const yTo = gsap.quickTo(blob, 'y', { duration: 0.06, ease: 'power1.out' })

    let hasMoved = false
    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true
        setVisible(true)
      }
      xTo(e.clientX - 18)
      yTo(e.clientY - 18)
    }

    const onEnterLink = () =>
      gsap.to(blob, { scale: 2.2, duration: 0.2 })
    const onLeaveLink = () =>
      gsap.to(blob, { scale: 1, duration: 0.2 })
    const onMouseDown = () =>
      gsap.to(blob, { scale: 0.85, duration: 0.1 })
    const onMouseUp = () =>
      gsap.to(blob, { scale: 1, duration: 0.15 })

    const interactive = document.querySelectorAll('a, button, [role="button"]')
    interactive.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        @media (hover: none) { * { cursor: auto !important; } }
      `}</style>
      <div
        ref={blobRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
          transform: 'translate(0px, 0px)',
        }}
      >
        {/* Glow Aura */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.95) 0%, rgba(99,102,241,0.25) 75%, transparent 100%)',
            filter: 'blur(4px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </>
  )
}

