import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/Kushagra001',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kushagra-singh-negi',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://x.com/StackForm_dev',
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ]

  const navLinks = [
    { label: 'Selected Work', href: '#work' },
    { label: 'What We Do', href: '#services' },
    { label: 'Pricing Models', href: '#pricing' },
    { label: 'Our Process', href: '#process' },
    { label: 'About Us', href: '#about' },
  ]

  return (
    <footer
      className="relative pt-24 pb-12 border-t border-sf-border overflow-hidden"
      style={{ backgroundColor: '#05050b' }}
    >
      {/* Absolute Radial Gradient Glow */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[450px] h-[450px] bg-sf-blue/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute left-[-10%] top-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Logo & Headline Column */}
          <div className="md:col-span-6 flex flex-col items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo size={28} />
                <span className="text-sf-white text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-cal), var(--font-inter), sans-serif' }}>
                  Stackform
                </span>
              </div>
              <h3 
                className="text-sf-white leading-tight font-bold tracking-tight max-w-sm"
                style={{ 
                  fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
                  fontSize: 'clamp(22px, 3vw, 30px)' 
                }}
              >
                Let&apos;s build what others can&apos;t.
              </h3>
            </div>
            
            {/* Glowing Active Status Badge */}
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-medium select-none shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
              style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains, monospace)' }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Available for new projects
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 
              className="text-sf-white-faint font-semibold tracking-widest text-[10px]"
              style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}
            >
              NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sf-white-dim hover:text-sf-white transition-colors text-sm hover:translate-x-0.5 inline-block duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Contact Column */}
          <div className="md:col-span-3 space-y-5">
            <div className="space-y-4">
              <h4 
                className="text-sf-white-faint font-semibold tracking-widest text-[10px]"
                style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}
              >
                GET IN TOUCH
              </h4>
              <div className="space-y-2">
                <a 
                  href="mailto:hello@stack-form.dev" 
                  className="block text-sf-white hover:text-sf-blue transition-colors text-sm font-medium border-b border-sf-border hover:border-sf-blue w-fit pb-0.5 duration-200"
                >
                  hello@stack-form.dev
                </a>
                <a 
                  href="https://wa.me/918949370535" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sf-white-dim hover:text-green-400 transition-colors text-xs font-mono"
                >
                  WhatsApp Chat &rarr;
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 pt-2">
              {socials.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-sf-white-faint hover:text-sf-white hover:-translate-y-0.5 transition-all duration-300 p-2 rounded-lg bg-sf-black-2/30 border border-sf-border hover:border-sf-white/20 hover:bg-sf-black-2/80"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Status Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-sf-border gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sf-white-faint" style={{ fontSize: '11px' }} suppressHydrationWarning>
              © {new Date().getFullYear()} Stackform. All rights reserved.
            </p>
            <p className="text-sf-white-faint/60" style={{ fontSize: '10px' }}>
              by Kushagra Singh Negi · currently building: stack-form.dev
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sf-white-faint" style={{ fontSize: '11px' }}>
            <span className="text-[9px]">📍</span>
            <span>Jaipur, India · Available worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
