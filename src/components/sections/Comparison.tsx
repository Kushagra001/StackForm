'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'
import { Check, X } from 'lucide-react'

const comparisons = [
  { theirs: 'Project manager + junior devs', mine: 'You talk to me directly' },
  { theirs: '3–6 month timelines', mine: '4–8 weeks, defined scope' },
  { theirs: 'Website, then "API integration coming soon"', mine: 'Automation wired in from day one' },
  { theirs: '₹5L+ minimum engagement', mine: 'Starts at ₹15K' },
]

export function Comparison() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    loadGsap().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.from('.comp-row', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        })
        gsap.from('.comp-heading', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }, containerRef)
      cleanup = () => ctx.revert()
    })
    return () => cleanup?.()
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-32 bg-sf-black-2"
      id="comparison"
    >
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-20 comp-heading">
          <p
            className="text-sf-blue mb-4 uppercase tracking-widest"
            style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
          >
            WHY WORK WITH ME
          </p>
          <h2
            className="text-sf-white leading-tight"
            style={{
              fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
            }}
          >
            The agency alternative.
          </h2>
        </div>

        <div className="border border-sf-border rounded-2xl overflow-hidden bg-[#080810]">
          {/* Header row */}
          <div className="grid grid-cols-2 border-b border-sf-border bg-sf-black-2/50">
            <div className="p-6 md:p-8 text-sf-white-faint font-medium text-sm tracking-wide comp-heading">
              Traditional Agency
            </div>
            <div className="p-6 md:p-8 text-sf-blue font-medium text-sm tracking-wide border-l border-sf-border comp-heading">
              Stackform
            </div>
          </div>

          {/* Comparison rows */}
          <div className="divide-y divide-sf-border">
            {comparisons.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 comp-row">
                {/* Theirs */}
                <div className="p-6 md:p-8 flex items-start gap-4 text-sf-white-dim">
                  <X className="w-5 h-5 text-red-400/70 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.theirs}</span>
                </div>
                {/* Mine */}
                <div className="p-6 md:p-8 flex items-start gap-4 text-sf-white md:border-l border-sf-border bg-sf-blue/5">
                  <Check className="w-5 h-5 text-sf-blue shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{item.mine}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
