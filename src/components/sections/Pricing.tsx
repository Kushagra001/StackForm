'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'
import { Check } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: '₹15K–₹30K',
    duration: '2–3 weeks',
    for: 'Landing pages, single-service sites',
    includes: [
      'Next.js website (up to 5 sections)',
      'Lead capture form + email notification',
      'Mobile responsive',
      'Deployed to Vercel',
    ],
  },
  {
    name: 'System',
    price: '₹40K–₹1L',
    duration: '4–6 weeks',
    for: 'Full sites with automation',
    includes: [
      'Everything in Starter',
      'CRM integration (Airtable/Notion)',
      'Email automation sequence',
      'WhatsApp/SMS confirmation',
      'Sanity CMS for content',
    ],
  },
  {
    name: 'Full Build',
    price: '₹1L–₹1.5L',
    duration: '6–8 weeks',
    for: 'E-commerce, funnels, complex systems',
    includes: [
      'Everything in System',
      'Shopify or custom checkout',
      'Multi-step funnel',
      'Analytics + conversion tracking',
      '30-day post-launch support',
    ],
  },
]

export function Pricing() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    loadGsap().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.from('.pricing-card', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }, containerRef)
      cleanup = () => ctx.revert()
    })
    return () => cleanup?.()
  }, [])

  return (
    <section ref={containerRef} id="pricing" className="py-32" style={{ backgroundColor: '#080810' }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20 pricing-card">
          <p
            className="text-sf-blue mb-4 uppercase tracking-widest"
            style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
          >
            PRICING & PACKAGES
          </p>
          <h2
            className="text-sf-white leading-tight"
            style={{
              fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
            }}
          >
            Clear scope. Fixed price.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg) => {
            const isHighlighted = pkg.name === 'System'
            return (
              <div
                key={pkg.name}
                className={`pricing-card relative rounded-2xl p-8 border ${
                  isHighlighted 
                    ? 'border-sf-blue/50 bg-sf-blue/5' 
                    : 'border-sf-border bg-[#0d0d18]'
                }`}
                style={
                  isHighlighted 
                    ? { boxShadow: '0 0 40px -10px rgba(99, 102, 241, 0.15)' } 
                    : {}
                }
              >
                {isHighlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sf-blue text-[#080810] text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl text-sf-white font-medium mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl text-sf-white" style={{ fontFamily: 'var(--font-cal), sans-serif' }}>
                    {pkg.price}
                  </span>
                </div>
                
                <div className="text-sf-white-faint text-sm mb-8 pb-8 border-b border-sf-border/50 space-y-2">
                  <p><strong>Timeline:</strong> {pkg.duration}</p>
                  <p><strong>Best for:</strong> {pkg.for}</p>
                </div>

                <ul className="space-y-4">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sf-white-dim text-sm leading-relaxed">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlighted ? 'text-sf-blue' : 'text-sf-white-faint'}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-20 pricing-card">
          <p className="text-sf-white-dim">
            Not sure which fits?{' '}
            <a href="#contact" className="text-sf-white hover:text-sf-blue underline underline-offset-4 decoration-sf-border hover:decoration-sf-blue transition-colors">
              A 20-minute call will tell us both.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
