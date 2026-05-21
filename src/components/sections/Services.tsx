'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe, Zap, ShoppingBag, BarChart } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

// ── CountUp ─────────────────────────────────────────────────
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = Math.ceil(to / 40)
        const id = setInterval(() => {
          start = Math.min(start + step, to)
          setVal(start)
          if (start >= to) clearInterval(id)
        }, 30)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

// ── LiveTimer ────────────────────────────────────────────────
function LiveTimer() {
  const [secs, setSecs] = useState(12)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSecs(Math.floor(Math.random() * 45) + 5)
    }, 0)
    const id = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => {
      clearTimeout(timer)
      clearInterval(id)
    }
  }, [])
  return <span className="text-sf-blue">{secs}s</span>
}

// ── Service data ─────────────────────────────────────────────
const services = [
  {
    number: '01',
    Icon: Globe,
    title: 'Conversion-Focused Websites',
    body: 'Next.js websites built around one goal: turning visitors into customers. Every layout decision is backed by conversion principles (not aesthetics alone).',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Framer Motion'],
  },
  {
    number: '02',
    Icon: Zap,
    title: 'Automation Systems',
    body: 'I connect your website to the tools you already use: CRMs, email platforms, WhatsApp, Slack. Leads captured automatically, no manual work.',
    tags: ['Make.com', 'Airtable', 'Twilio', 'Resend'],
  },
  {
    number: '03',
    Icon: ShoppingBag,
    title: 'E-commerce Builds',
    body: 'Shopify storefronts with custom Next.js frontends. Scroll-driven product storytelling, sticky cart, abandoned cart recovery, built to sell.',
    tags: ['Shopify API', 'Next.js', 'ScrollTrigger'],
  },
  {
    number: '04',
    Icon: BarChart,
    title: 'Lead Generation Funnels',
    body: 'VSL-style landing pages with lead magnets, email nurture sequences, and Calendly booking. The complete system from visit to booked call.',
    tags: ['React Hook Form', 'Zod', 'ConvertKit', 'Calendly'],
  },
]

type CardSize = 'large' | 'medium' | 'small'

interface ServiceCardProps {
  service: (typeof services)[0]
  size: CardSize
  showCounter?: boolean
  showTimer?: boolean
}

const sizeMap: Record<CardSize, { minH: string; numSize: string; titleSize: string }> = {
  large:  { minH: 'min-h-[360px]', numSize: '64px', titleSize: '28px' },
  medium: { minH: 'min-h-[280px]', numSize: '48px', titleSize: '22px' },
  small:  { minH: 'min-h-[240px]', numSize: '36px', titleSize: '18px' },
}

function ServiceCard({ service, size, showCounter, showTimer }: ServiceCardProps) {
  const { minH, numSize, titleSize } = sizeMap[size]
  const { number, Icon, title, body, tags } = service

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-xl border border-sf-border p-8 overflow-hidden',
        'transition-all duration-300 hover:border-sf-blue/30 group',
        minH
      )}
      style={{ backgroundColor: '#0d0d18' }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 0 40px rgba(79,110,247,0.08)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Number watermark */}
      <div
        className="absolute top-4 right-6 text-sf-blue pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
          fontSize: numSize,
          opacity: 0.06,
          lineHeight: 1,
        }}
      >
        {number}
      </div>

      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg mb-6"
        style={{ backgroundColor: 'rgba(79,110,247,0.15)' }}
      >
        <Icon size={18} className="text-sf-blue" />
      </div>

      {/* Title */}
      <h3
        className="text-sf-white mb-3"
        style={{
          fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
          fontSize: titleSize,
        }}
      >
        {title}
      </h3>

      {/* Body */}
      <p
        className="text-sf-white-dim leading-relaxed"
        style={{ fontSize: '14px', lineHeight: '1.7' }}
      >
        {body}
      </p>

      {/* Live timer — Automation card */}
      {showTimer && (
        <div
          className="mt-4 flex items-center gap-2 text-xs"
          style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sf-white-faint">
            Last automation ran <LiveTimer /> ago
          </span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Live counter — Conversion card */}
      {showCounter && (
        <div className="absolute bottom-6 right-6 text-right">
          <div
            className="text-sf-blue font-bold"
            style={{
              fontFamily: 'var(--font-jetbrains, monospace)',
              fontSize: '30px',
            }}
          >
            <CountUp to={40} suffix="%" />
          </div>
          <div
            className="text-sf-white-faint"
            style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
          >
            avg. conversion lift
          </div>
        </div>
      )}
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────
export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-content', {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-32 bg-sf-black-2"
    >
      <div className="max-w-6xl mx-auto px-8 services-content">
        <p
          className="text-sf-blue mb-4 uppercase tracking-widest"
          style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
        >
          WHAT I BUILD
        </p>

        <h2
          className="text-sf-white leading-tight"
          style={{
            fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
          }}
        >
          What you&rsquo;re actually paying for.
        </h2>

        {/* Bento grid: 7-5 / 4-8 */}
        <div className="grid grid-cols-12 gap-4 mt-16">
          <div className="col-span-12 md:col-span-7">
            <ServiceCard service={services[0]} size="large" showCounter />
          </div>
          <div className="col-span-12 md:col-span-5">
            <ServiceCard service={services[1]} size="medium" showTimer />
          </div>
          <div className="col-span-12 md:col-span-4">
            <ServiceCard service={services[2]} size="small" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <ServiceCard service={services[3]} size="medium" />
          </div>
        </div>
      </div>
    </section>
  )
}
