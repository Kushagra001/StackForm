'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
// Dynamically import `urlFor` at runtime to avoid bundling Sanity client
// into the initial client bundle. This keeps heavy Sanity code out of
// the main parse/eval path until needed.

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

interface UnifiedProject {
  _id?: string;
  slug: string | { current: string };
  name?: string;
  title?: string;
  type: string;
  description?: string;
  tagline?: string;
  image?: string;
  coverImage?: unknown;
  accentColor: string;
  tags: string[];
  result?: string;
  liveUrl?: string | null;
  url?: string | null;
}

const fallbackProjects: UnifiedProject[] = [
  {
    slug: 'flow',
    name: 'Flōw',
    type: 'SaaS Landing Page',
    description: 'AI productivity tool. Warm editorial aesthetic.',
    image: '/work/flow-hero.png',
    accentColor: '#c0392b',
    tags: ['Next.js', 'GSAP', 'Make.com'],
    result: 'Lead capture → CRM + email automation wired via Make.com',
    url: null,
  },
  {
    slug: 'arca',
    name: 'Arca Studio',
    type: 'Agency Website',
    description: 'Creative agency. Horizontal scroll. Sanity CMS.',
    image: '/work/arca-hero.png',
    accentColor: '#f0f0ff',
    tags: ['Next.js', 'SplitText', 'Three.js'],
    result: 'Case study CMS: zero redeploy to add projects',
    url: null,
  },
  {
    slug: 'medica',
    name: 'Medica',
    type: 'Local Business Website',
    description: 'Medical clinic. Booking form with automation.',
    image: '/work/medica-hero.png',
    accentColor: '#2980b9',
    tags: ['Next.js', 'Airtable', 'Twilio'],
    result: 'Form → Airtable CRM + WhatsApp confirmation via Twilio',
    url: null,
  },
  {
    slug: 'kern',
    name: 'Kern',
    type: 'D2C E-commerce',
    description: 'Premium menswear. Scroll-driven product story.',
    image: '/work/kern-hero.png',
    accentColor: '#8B5E3C',
    tags: ['Next.js', 'Shopify API', 'ScrollTrigger'],
    result: 'Shopify Storefront API: live product data, no duplicate sync',
    url: null,
  },
  {
    slug: 'axiom',
    name: 'Axiom Strategy',
    type: 'High-Ticket Funnel',
    description: 'Marketing consultant. Lead magnet + nurture sequence.',
    image: '/work/axiom-hero.png',
    accentColor: '#b8922a',
    tags: ['Next.js', 'Resend', 'ConvertKit'],
    result: 'Download → 5-email nurture sequence via Resend + ConvertKit',
    url: null,
  },
]

const resultCopyBySlug: Record<string, string> = {
  flow: 'Lead capture → CRM + email automation wired via Make.com',
  arca: 'Case study CMS: zero redeploy to add projects',
  medica: 'Form → Airtable CRM + WhatsApp confirmation via Twilio',
  kern: 'Shopify Storefront API: live product data, no duplicate sync',
  axiom: 'Download → 5-email nurture sequence via Resend + ConvertKit',
}



function ProjectCard({
  project,
  fullWidth = false,
}: {
  project: UnifiedProject
  fullWidth?: boolean
}) {
  // Hooks must be called unconditionally — declare them before early returns
  const [displayImage, setDisplayImage] = useState<string>('/work/flow-hero.png')

  // Call hooks unconditionally. Guard inside effect for `project` presence.
  useEffect(() => {
    if (!project) return
    let mounted = true

    async function resolveImage() {
      if (project.coverImage) {
        try {
          const mod = await import('@/lib/sanity')
          const url = mod.urlFor(project.coverImage).url()
          if (mounted && url) setDisplayImage(url)
          return
        } catch {
          /* fallthrough to other fallbacks */
        }
      }

      if (project.image) {
        if (mounted) setDisplayImage(project.image as string)
      }
    }

    resolveImage()
    return () => {
      mounted = false
    }
  }, [project])

  if (!project) return null;

  const slugStr = typeof project.slug === 'string' ? project.slug : project.slug?.current;
  const nameStr = project.name || project.title || 'Untitled';
  const descStr = project.description || project.tagline || '';
  const resultStr = project.result || (slugStr ? resultCopyBySlug[slugStr] : '') || descStr;
  const linkUrl = project.url || project.liveUrl || null;

  return (
    <div
      className={`group block relative ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-sf-black-2 border border-sf-border transition-all duration-300 group-hover:border-sf-border-strong">
        {/* Screenshot / image area */}
        <div
          className="relative overflow-hidden"
          style={{ paddingBottom: fullWidth ? '52%' : '60%' }}
        >
          {/* Real screenshot — falls back to accent placeholder if missing */}
          <div className="absolute inset-0">
            <Image
              src={displayImage}
              alt={`${nameStr} screenshot`}
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                // Hide broken image; placeholder below shows through
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            {/* Accent-colored placeholder (visible if image fails) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: `${project.accentColor}18` }}
            >
              <div
                className="font-bold opacity-10"
                style={{
                  fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
                  fontSize: '72px',
                  color: project.accentColor,
                }}
              >
                {nameStr.charAt(0)}
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
            style={{ backgroundColor: 'rgba(8, 8, 16, 0.92)' }}
          >
            <span
              className="text-sf-white uppercase tracking-widest font-semibold"
              style={{
                fontSize: '13px',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-jetbrains, monospace)',
              }}
            >
              View case study &rarr;
            </span>
          </div>
        </div>

        {/* Accent line */}
        <div className="h-0.5 w-full" style={{ backgroundColor: project.accentColor }} />

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3
                className="text-sf-white"
                style={{
                  fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
                  fontSize: '22px',
                }}
              >
                {nameStr}
              </h3>
              <p className="text-sf-white-dim mt-0.5" style={{ fontSize: '13px' }}>
                {descStr}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-end shrink-0 max-w-50">
              {project.tags.slice(0, 3).map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          {/* Result line */}
          <div className="flex items-start gap-2 pt-3 border-t border-sf-border">
            <span
              className="text-sf-blue shrink-0 mt-0.5"
              style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
            >
              →
            </span>
            <span className="text-sf-white-dim leading-relaxed" style={{ fontSize: '12px' }}>
              {resultStr}
            </span>
          </div>
        </div>
      </div>

      {/* Main card Link - absolutely positioned covering the entire card, z-10 */}
      <Link
        href={`/work/${slugStr}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${nameStr} case study`}
      >
        <span className="sr-only">View case study</span>
      </Link>

      {/* View live badge on hover - absolutely positioned above the main link, z-20 */}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 rounded-full px-3 py-1 z-20 hover:scale-105"
          style={{
            backgroundColor: 'rgba(13,13,24,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(240,240,255,0.08)',
            fontSize: '10px',
            color: '#f0f0ff',
          }}
        >
          <ExternalLink size={10} />
          View live
        </a>
      )}
    </div>
  )
}

export function Work({ projects: dynamicProjects }: { projects?: UnifiedProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use Sanity projects if available, otherwise use hardcoded fallbacks
  const displayProjects = dynamicProjects && dynamicProjects.length > 0 
    ? dynamicProjects 
    : fallbackProjects

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-cards > *', {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [displayProjects])

  return (
    <section id="work" ref={containerRef} className="py-32" style={{ backgroundColor: '#080810' }}>
      <div className="max-w-6xl mx-auto px-8">
        <p
          className="text-sf-blue mb-4 uppercase tracking-widest"
          style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
        >
          SELECTED WORK
        </p>

        <h2
          className="text-sf-white leading-tight mb-16"
          style={{
            fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
          }}
        >
          Real work. Real businesses.
          <br />
          Real results.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 work-cards">
          {displayProjects.map((project, index) => {
            if (!project) return null
            const isFullWidth = index % 5 === 0 || index % 5 === 3 || index % 5 === 4
            const key = project._id || (typeof project.slug === 'string' ? project.slug : project.slug?.current) || `fallback-${index}`
            return (
              <ProjectCard
                key={key}
                project={project}
                fullWidth={isFullWidth}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
