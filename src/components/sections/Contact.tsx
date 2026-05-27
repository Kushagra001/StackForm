'use client'

import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'

// LinkedIn SVG (not in lucide@latest)
function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', project: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', project: '' })
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success')
    return (
      <div className="rounded-xl border border-green-400/30 bg-green-400/5 px-8 py-6 text-center">
        <div className="text-green-400 text-sm font-medium mb-1">Message sent.</div>
        <div className="text-sf-white-dim text-xs">I&apos;ll be in touch within 24 hours.</div>
      </div>
    )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {[
        { name: 'name' as const, placeholder: 'Your name', type: 'text' },
        { name: 'email' as const, placeholder: 'your@email.com', type: 'email' },
        { name: 'project' as const, placeholder: 'What are you building?', type: 'text' },
      ].map(({ name, placeholder, type }) => (
        <input
          key={name}
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => setForm(prev => ({ ...prev, [name]: e.target.value }))}
          required
          className="w-full rounded-lg px-4 py-3 text-sm text-sf-white placeholder-sf-white-faint outline-none transition-colors"
          style={{
            backgroundColor: '#080810',
            border: '1px solid rgba(240,240,255,0.08)',
          }}
          onFocus={e => ((e.target as HTMLInputElement).style.borderColor = '#4f6ef7')}
          onBlur={e => ((e.target as HTMLInputElement).style.borderColor = 'rgba(240,240,255,0.08)')}
        />
      ))}
      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message →'}
      </Button>
      {status === 'error' && (
        <p className="text-red-400 text-xs text-center">
          Something went wrong. Email me directly.
        </p>
      )}
    </form>
  )
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    loadGsap().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.from('.contact-content', {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        })
      }, containerRef)
      cleanup = () => ctx.revert()
    })
    return () => cleanup?.()
  }, [])

  const channels = [
    {
      href: 'mailto:hello@stack-form.dev',
      label: 'Send an email',
      sub: 'hello@stack-form.dev',
      note: 'Response within 24 hours',
      Icon: Mail,
      iconColor: 'text-sf-blue',
      hoverBorder: 'hover:border-sf-blue/40',
      hoverBg: 'rgba(79,110,247,0.08)',
    },
    {
      href: 'https://wa.me/918949370535',
      label: 'WhatsApp',
      sub: 'Quick questions welcome',
      note: 'Usually replies same day',
      Icon: MessageCircle,
      iconColor: 'text-green-400',
      hoverBorder: 'hover:border-green-500/40',
      hoverBg: 'rgba(74,222,128,0.05)',
    },
    {
      href: 'https://www.linkedin.com/in/kushagra-singh-negi',
      label: 'LinkedIn',
      sub: 'View full profile',
      note: 'Connect or message',
      Icon: LinkedinIcon,
      iconColor: 'text-blue-400',
      hoverBorder: 'hover:border-blue-400/40',
      hoverBg: 'rgba(96,165,250,0.05)',
    },
  ]

  return (
    <section id="contact" ref={containerRef} className="pt-8 pb-32" style={{ backgroundColor: '#080810' }}>
      <div className="max-w-3xl mx-auto px-8 contact-content">
        <div>
          <p
            className="text-sf-blue mb-6 uppercase tracking-widest"
            style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
          >
            Get in touch
          </p>

          <h2
            className="text-sf-white leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
            }}
          >
            Have a project?
            <br />
            <span className="text-sf-white-dim">Let&apos;s talk.</span>
          </h2>

          <p className="text-sf-white-dim mb-12 max-w-lg" style={{ fontSize: '16px', lineHeight: '1.7' }}>
            Most projects start with a 20-minute call. No pitch deck,
            no discovery questionnaire, just a conversation about what
            you&apos;re trying to build and whether I&apos;m the right person to
            build it.
          </p>

          {/* 3 contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {channels.map(({ href, label, sub, note, Icon, iconColor, hoverBorder, hoverBg }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group border border-sf-border rounded-xl p-6 transition-all duration-300 ${hoverBorder}`}
                style={{ backgroundColor: '#0d0d18' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = hoverBg
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#0d0d18'
                }}
              >
                <Icon size={20} className={`${iconColor} mb-4`} />
                <div className="text-sm font-medium text-sf-white mb-1">{label}</div>
                <div className="text-xs text-sf-white-faint">{sub}</div>
                <div className="text-xs text-sf-white-faint mt-1">{note}</div>
              </a>
            ))}
          </div>

          {/* Quick form */}
          <div
            className="border border-sf-border rounded-2xl p-8"
            style={{ backgroundColor: '#0d0d18' }}
          >
            <p className="text-sm text-sf-white-dim mb-6">
              Or leave a message and I&apos;ll follow up:
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
