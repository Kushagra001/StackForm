'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const clients = [
  'SaaS startups',
  'D2C brands',
  'Medical clinics',
  'Premium apparel',
  'Marketing consultants',
  'E-commerce founders',
  'Service businesses',
  'Agency clients',
]

export function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const ctx = gsap.context(() => {
      gsap.to(track, { xPercent: -50, duration: 20, ease: 'none', repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  const items = [...clients, ...clients]

  return (
    <div
      className="py-8 overflow-hidden border-y border-sf-border"
      style={{ backgroundColor: '#0d0d18' }}
    >
      <div className="flex items-center gap-6 mb-4 px-8">
        <span
          className="text-sf-white-faint shrink-0"
          style={{ fontSize: '11px', fontFamily: 'var(--font-jetbrains, monospace)' }}
        >
          TRUSTED BY SYSTEMS I&apos;VE BUILT FOR:
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(240,240,255,0.06)' }} />
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24"
          style={{ background: 'linear-gradient(to right, #0d0d18, transparent)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24"
          style={{ background: 'linear-gradient(to left, #0d0d18, transparent)' }}
        />

        <div ref={trackRef} className="flex w-max">
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-6 px-6">
              <span
                className="whitespace-nowrap text-sf-white-dim font-medium tracking-wide"
                style={{ fontSize: '13px', fontFamily: 'var(--font-inter)' }}
              >
                {item}
              </span>
              <span className="text-sf-blue" style={{ fontSize: '10px' }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
