'use client'

import React from 'react'

interface LogoProps {
  className?: string
  size?: number
  showText?: boolean
}

export function Logo({ className = '', size = 32, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dynamic SVG Icon representing the floating isometric 'Stack' and 'Form' */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="sf-logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f6ef7" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="sf-logo-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
          <filter id="sf-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Bottom Layer - translucent background plate */}
        <path
          d="M16 26.5L6 21.5L16 16.5L26 21.5L16 26.5Z"
          fill="url(#sf-logo-grad-1)"
          fillOpacity="0.12"
          stroke="url(#sf-logo-grad-1)"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        
        {/* Middle Layer - mid-level glowing plate */}
        <path
          d="M16 20.5L6 15.5L16 10.5L26 15.5L16 20.5Z"
          fill="url(#sf-logo-grad-1)"
          fillOpacity="0.3"
          stroke="url(#sf-logo-grad-1)"
          strokeWidth="1.2"
          strokeOpacity="0.65"
        />
        
        {/* Top Layer - solid premium plate */}
        <path
          d="M16 14.5L6 9.5L16 4.5L26 9.5L16 14.5Z"
          fill="url(#sf-logo-grad-2)"
          stroke="#f0f0ff"
          strokeWidth="1.5"
        />
        
        {/* Glowing Center Core */}
        <circle
          cx="16"
          cy="9.5"
          r="2.5"
          fill="#ffffff"
          filter="url(#sf-glow)"
        />
      </svg>

      {showText && (
        <span
          className="text-sf-white tracking-tight font-bold transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-cal), var(--font-inter), sans-serif',
            fontSize: `${Math.round(size * 0.56)}px`,
            color: '#f0f0ff',
          }}
        >
          Stackform
        </span>
      )}
    </div>
  )
}
