'use client'

import { useState } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineHeroSceneProps {
  scenePath?: string
}

export function SplineHeroScene({
  scenePath = '/scene.splinecode'
}: SplineHeroSceneProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Premium micro-animated high-tech loader */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Pulsing Outer Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(79, 110, 247, 0.25)',
                borderRadius: '50%',
                animation: 'splineLoaderPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            {/* Spinning Inner Arc */}
            <div
              style={{
                position: 'absolute',
                width: '48px',
                height: '48px',
                border: '2px solid rgba(79, 110, 247, 0.1)',
                borderTopColor: '#4f6ef7',
                borderRadius: '50%',
                animation: 'splineLoaderSpin 1s linear infinite',
              }}
            />
            {/* Tech Center Core */}
            <span
              style={{
                fontFamily: 'var(--font-jetbrains, monospace)',
                fontSize: '9px',
                letterSpacing: '0.1em',
                color: '#4f6ef7',
                animation: 'splineLoaderPulse 1s infinite alternate',
              }}
            >
              LOAD
            </span>
          </div>
        </div>
      )}

      {/* Interactive Local Spline Canvas (Watermark-hidden, responsive, custom cursor compliant) */}
      <Spline
        scene={scenePath}
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          width: '130%',
          height: '100%',
          left: '-20%',
          top: 0,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Loader Keyframe Styles */}
      <style>{`
        @keyframes splineLoaderSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes splineLoaderPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}


