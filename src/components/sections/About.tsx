'use client'

import { AbstractAvatar } from '@/components/ui/AbstractAvatar'
import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'

const metrics = [
  { value: '5+',    label: 'Projects shipped',    sub: 'All live in 2024–25' },
  { value: '$250',  label: 'Starting budget',     sub: 'Scales with scope' },
  { value: '4–8',   label: 'Weeks per project',   sub: 'Defined, not open-ended' },
  { value: '100%',  label: 'Direct communication', sub: 'You talk to me, always' },
]

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Framer Motion',
  'Three.js',
  'Node.js',
  'Sanity CMS',
  'Make.com',
  'Airtable'
]

function TerminalBlock() {
  return (
    <div
      className="rounded-xl border border-sf-border p-6"
      style={{
        backgroundColor: '#0d0d18',
        fontFamily: 'var(--font-jetbrains, monospace)',
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 mb-5">
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
        <span className="text-sf-white-faint ml-2" style={{ fontSize: '11px' }}>
          kushagra.json
        </span>
      </div>
      {/* JSON */}
      <div className="leading-6" style={{ fontSize: '12px' }}>
        <span className="text-sf-white-faint">{'{'}</span>
        <br />
        <span className="pl-4 text-sf-blue">&quot;name&quot;</span>
        <span className="text-sf-white-faint">: </span>
        <span className="text-green-400">&quot;Kushagra Singh Negi&quot;</span>,
        <br />
        <span className="pl-4 text-sf-blue">&quot;location&quot;</span>
        <span className="text-sf-white-faint">: </span>
        <span className="text-green-400">&quot;Jaipur, India 🇮🇳&quot;</span>,
        <br />
        <span className="pl-4 text-sf-blue">&quot;role&quot;</span>
        <span className="text-sf-white-faint">: </span>
        <span className="text-green-400">&quot;Full-stack + Automation&quot;</span>,
        <br />
        <span className="pl-4 text-sf-blue">&quot;stack&quot;</span>
        <span className="text-sf-white-faint">: [</span>
        <br />
        {stack.map((s, idx) => (
          <span key={s} className="pl-8 text-yellow-300 block">
            &quot;{s}&quot;{idx < stack.length - 1 ? ',' : ''}
          </span>
        ))}
        <span className="pl-4 text-sf-white-faint">],</span>
        <br />
        <span className="pl-4 text-sf-blue">&quot;available&quot;</span>
        <span className="text-sf-white-faint">: </span>
        <span className="text-green-400">true</span>
        <br />
        <span className="text-sf-white-faint">{'}'}</span>
      </div>
    </div>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    loadGsap().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.from('.about-left', {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        })
        gsap.from('.about-right', {
          x: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        })
        gsap.from('.about-metrics > div', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-metrics',
            start: 'top 85%',
          }
        })
      }, containerRef)
      cleanup = () => ctx.revert()
    })
    return () => cleanup?.()
  }, [])

  return (
    <section id="about" ref={containerRef} className="pt-16 pb-8" style={{ backgroundColor: '#080810' }}>
      <div className="max-w-5xl mx-auto px-8">

        {/* ROW 1 — Hook */}
        <div className="mb-16 about-left">
          <p
            className="text-sf-blue mb-4 uppercase tracking-widest"
            style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
          >
            About
          </p>
          <h2
            className="text-sf-white leading-[1.0] tracking-tight"
            style={{
              fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
            }}
          >
            Why clients come back.
          </h2>
        </div>

        {/* ROW 2 — Avatar / Copy / Terminal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Col 1: Avatar */}
          <div className="flex flex-col items-center md:items-start gap-4 about-left self-start">
            <AbstractAvatar />
            <div>
              <div
                className="text-sf-white"
                style={{
                  fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
                  fontSize: '20px',
                }}
              >
                Kushagra Singh Negi
              </div>
              <div className="text-sm text-sf-white-dim mt-1">
                Developer · Jaipur, India
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-sf-white-faint">Available for projects</span>
              </div>
            </div>
          </div>

          {/* Col 2: Short copy */}
          <div
            className="space-y-4 text-sf-white-dim leading-relaxed about-left mt-0 pt-0 self-start"
            style={{ fontSize: '14px' }}
          >
            <p>
              I&apos;m Kushagra, a full-stack developer based in Jaipur, India.
              I build conversion-focused websites with automation wired in from
              day one. Not just a site, but a system that captures leads, sends
              confirmations, and connects to your existing tools automatically.
            </p>
            <p>
              I take on a small number of projects at a time. You work directly
              with me: no middlemen, no offshore handoffs, no surprises.
            </p>
            <p>
              Currently taking on new projects. Engagements start at $250
              for smaller scopes, $600–$2,500 for full systems. If you&apos;re
              not sure where your project falls, a 20-minute call will clarify
              everything.
            </p>
          </div>

          {/* Col 3: Terminal */}
          <div className="about-right self-start">
            <TerminalBlock />
          </div>
        </div>

        {/* ROW 3 — Metrics */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-16 border-t border-sf-border about-metrics"
        >
          {metrics.map(({ value, label, sub }) => (
            <div
              key={label}
              className="rounded-xl border border-sf-border p-5"
              style={{ backgroundColor: '#0d0d18' }}
            >
              <div
                className="text-sf-white mb-1"
                style={{
                  fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
                  fontSize: '30px',
                }}
              >
                {value}
              </div>
              <div className="text-sm text-sf-white-dim">{label}</div>
              <div
                className="text-sf-white-faint mt-1"
                style={{ fontSize: '11px', fontFamily: 'var(--font-jetbrains, monospace)' }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
