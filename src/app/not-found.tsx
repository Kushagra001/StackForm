'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.not-found-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.to('.not-found-glow', {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{ backgroundColor: '#080810' }}
    >
      {/* Background Glow */}
      <div
        className="not-found-glow absolute w-96 h-96 rounded-full opacity-40 pointer-events-none filter blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(79,110,247,0.3) 0%, rgba(99,102,241,0.08) 60%, transparent 100%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'opacity',
        }}
      />

      <div className="not-found-content flex flex-col items-center text-center max-w-md z-10">
        <Logo size={40} className="mb-8" />

        <p
          className="text-sf-blue uppercase tracking-widest mb-4"
          style={{ fontSize: '12px', fontFamily: 'var(--font-jetbrains, monospace)' }}
        >
          {"// ERROR_CODE: 404_PAGE_NOT_FOUND"}
        </p>

        <h1
          className="text-sf-white leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
            fontSize: 'clamp(32px, 4vw, 54px)',
          }}
        >
          System section <span className="text-sf-white-dim">offline.</span>
        </h1>

        <p className="text-sf-white-faint mb-8 text-sm leading-relaxed">
          The requested system node does not exist or has been relocated to another stack area. Let&apos;s get you back to the main console.
        </p>

        <Link href="/" passHref legacyBehavior>
          <Button className="px-8 py-3.5">
            Return to main interface →
          </Button>
        </Link>
      </div>
    </div>
  )
}
