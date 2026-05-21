'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CopyEmail } from '@/components/ui/CopyEmail'

import { Logo } from '@/components/ui/Logo'

const navLinks = [
  { label: 'Work', href: '#work', section: 'work' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    // Scroll → background
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // IntersectionObserver → active nav link
    const sections = navLinks.map(({ section }) =>
      document.getElementById(section)
    ).filter(Boolean) as HTMLElement[]

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(el => obs.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(240,240,255,0.08)'
          : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" className="group">
        <Logo size={28} />
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href, section }) => {
          const absoluteHref = isHome ? href : `/${href}`
          return (
            <Link
              key={label}
              href={absoluteHref}
              className={`transition-colors duration-200 tracking-wide hover:text-sf-white font-medium ${
                active === section ? 'text-sf-white' : 'text-sf-white-dim'
              }`}
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-inter)',
                color: active === section ? '#ffffff' : '#c5c5e0',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Right */}
      <div className="flex items-center">
        <div className="hidden md:block">
          <CopyEmail
            className="text-sm font-medium text-sf-white-dim hover:text-sf-white"
            style={{ color: '#c5c5e0' }}
          />
        </div>
        <Link
          href={isHome ? '#contact' : '/#contact'}
          className="md:hidden text-sf-white-dim hover:text-sf-white text-sm transition-colors font-medium"
          style={{ color: '#c5c5e0' }}
        >
          Get in touch
        </Link>
      </div>
    </nav>
  )
}
