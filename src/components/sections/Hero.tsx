'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { Button } from '@/components/ui/Button'

// Lazy-load the heavy WebGL scene — no SSR
const SplineHeroScene = dynamic(
  () => import('@/components/three/SplineHeroScene').then(m => ({ default: m.SplineHeroScene })),
  { ssr: false, loading: () => null }
)

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    // Defer GSAP timeline until browser is idle to reduce main-thread contention
    let mounted = true
    const gsapCtxRef: { current: null | { revert: () => void } } = { current: null }

    const run = () => {
      if (!mounted) return
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from(badgeRef.current, { opacity: 0, y: 14, duration: 0.5, delay: 0.3 })
          .from(headRef.current, { opacity: 0, y: 50, duration: 1.0 }, '-=0.1')
          .from(subRef.current, { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
          .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
          .from(statsRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')
          .from(sceneRef.current, { opacity: 0, scale: 0.96, duration: 1.2, ease: 'power2.out' }, '<0.2')
      })
      gsapCtxRef.current = ctx as unknown as { revert: () => void }
    }

    const win = window as unknown as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(run, { timeout: 700 })
      return () => {
        mounted = false
        win.cancelIdleCallback && win.cancelIdleCallback(id)
        gsapCtxRef.current && gsapCtxRef.current.revert()
      }
    }

    const t = setTimeout(run, 700)
    return () => {
      mounted = false
      clearTimeout(t)
      gsapCtxRef.current && gsapCtxRef.current.revert()
    }
  }, [])

  useEffect(() => {
    // Delay loading heavy `HeroScene` chunk until idle to reduce bootup time
    if (showScene) return
    const win = window as unknown as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(() => setShowScene(true), { timeout: 1000 })
      return () => win.cancelIdleCallback && win.cancelIdleCallback(id)
    }
    const t = setTimeout(() => setShowScene(true), 1200)
    return () => clearTimeout(t)
  }, [showScene])

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#080810' }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,110,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,110,247,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          top: '-10%',
          right: '-5%',
          width: '55%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(79,110,247,0.14) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          bottom: '0',
          left: '-10%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(79,110,247,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Main layout */}
      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-screen max-w-350 mx-auto px-6 md:px-12"
      >
        {/* LEFT — content */}
        <div ref={contentRef} style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          {/* Availability badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8"
            style={{
              borderColor: 'rgba(79,110,247,0.3)',
              backgroundColor: 'rgba(79,110,247,0.06)',
              backdropFilter: 'blur(8px)',
              fontSize: '12px',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ color: '#c5c5e0' }}>Available for new projects</span>
            <a href="#services" style={{ color: '#4f6ef7', textDecoration: 'none' }}>View services →</a>
          </div>

          {/* Headline */}
          <h1
            ref={headRef}
            style={{
              fontFamily: 'var(--font-cal), var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(40px, 4.2vw, 78px)',
              lineHeight: '1.0',
              letterSpacing: '-0.025em',
              color: '#f0f0ff',
              marginBottom: '28px',
              fontWeight: 700,
            }}
          >
            Built as systems.<br />
            <span
              style={{
                color: '#4f6ef7',
                display: 'inline-block',
              }}
            >
              Not just
            </span>
            <br />
            websites.
          </h1>

          {/* Subtext */}
          <p
            ref={subRef}
            style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#9898b8',
              maxWidth: '420px',
              marginBottom: '40px',
            }}
          >
            I build conversion-focused websites with automation wired in.
            Lead capture, CRM integration, email sequences; systems that
            work while you sleep.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <Button variant="blue" size="lg" href="#work">
              See the work
            </Button>
            <Button variant="ghost" size="lg" href="#contact">
              Start a project →
            </Button>
          </div>

          {/* Stats row */}
          <div
            ref={statsRef}
            style={{
              paddingTop: '28px',
              borderTop: '1px solid rgba(240,240,255,0.07)',
            }}
          >
            {/* Status Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-jetbrains, monospace)',
                  fontSize: '11px',
                  color: '#686888',
                  letterSpacing: '0.05em',
                }}
              >
                <span style={{ color: '#4f6ef7' }}>●</span>
                <span>METRICS</span>
              </div>
            </div>

            {/* Dashboard Box */}
            <div
              style={{
                backgroundColor: '#0d0d18',
                border: '1px solid rgba(240, 240, 255, 0.05)',
                borderRadius: '8px',
                padding: '16px 20px',
                fontFamily: 'var(--font-jetbrains, monospace)',
                fontSize: '12px',
                color: '#c5c5e0',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ color: '#8c8ca8', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Projects</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#f0f0ff', fontFamily: 'var(--font-display, sans-serif)' }}>05</div>
                </div>
                <div>
                  <div style={{ color: '#8c8ca8', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Automations</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#f0f0ff', fontFamily: 'var(--font-display, sans-serif)' }}>03</div>
                </div>
                <div>
                  <div style={{ color: '#8c8ca8', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Uptime</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#f0f0ff', fontFamily: 'var(--font-display, sans-serif)' }}>100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — 3D scene */}
        <div
          ref={sceneRef}
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Scene container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '640px',
            }}
          >
            {showScene ? <SplineHeroScene /> : (
              <div aria-hidden="true" style={{width: '100%', height: '100%', background: 'radial-gradient(circle at 30% 30%, rgba(79,110,247,0.04), transparent 40%)'}} />
            )}

            {/* Floating label — top left of scene */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '20%',
                background: 'rgba(13,13,24,0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(79,110,247,0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                zIndex: 10,
                animation: 'heroFloat 4s ease-in-out infinite',
              }}
            >
              <div style={{ fontSize: '10px', color: '#686888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-jetbrains, monospace)' }}>
                Core Stack
              </div>
              <div style={{ fontSize: '13px', color: '#c5c5e0', fontWeight: 500 }}>Next.js · TypeScript</div>
            </div>

            {/* Floating label — bottom right of scene */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                right: '14%',
                background: 'rgba(13,13,24,0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(79,110,247,0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                zIndex: 10,
                animation: 'heroFloat 5s ease-in-out infinite 1.5s',
              }}
            >
              <div style={{ fontSize: '10px', color: '#686888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-jetbrains, monospace)' }}>
                Performance
              </div>
              <div style={{ fontSize: '13px', color: '#c5c5e0', fontWeight: 500 }}>100 Lighthouse Score</div>
            </div>

            {/* Floating label — top right */}
            <div
              style={{
                position: 'absolute',
                top: '35%',
                right: '0%',
                background: 'rgba(13,13,24,0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(79,110,247,0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                zIndex: 10,
                animation: 'heroFloat 4.5s ease-in-out infinite 0.8s',
              }}
            >
              <div style={{ fontSize: '10px', color: '#686888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-jetbrains, monospace)' }}>
                Integrations
              </div>
              <div style={{ fontSize: '13px', color: '#c5c5e0', fontWeight: 500 }}>CRM · Email · Sanity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 0.45 }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#686888', textTransform: 'uppercase', fontFamily: 'var(--font-jetbrains, monospace)' }}>
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(79,110,247,0.8), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #4ade80; }
          50% { opacity: 0.4; box-shadow: 0 0 10px #4ade80; }
        }
      `}</style>
    </section>
  )
}
