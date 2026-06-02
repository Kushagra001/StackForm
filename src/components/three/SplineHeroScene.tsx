'use client'

import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineHeroSceneProps {
  scenePath?: string
}

export function SplineHeroScene({
  scenePath = '/scene.splinecode'
}: SplineHeroSceneProps) {
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (loaded) return

    // Set a fallback timeout of 3.5 seconds.
    // If Spline fails to initialize WebGL or is extremely slow, 
    // we gracefully transition to the high-quality static image.
    const timer = setTimeout(() => {
      if (!loaded) {
        console.warn('Spline load timed out. Falling back to static image.');
        setTimedOut(true)
      }
    }, 3500)

    return () => clearTimeout(timer)
  }, [loaded])

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
      {!loaded && !timedOut && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            zIndex: 2,
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

      {/* High-quality matching fallback image */}
      <img
        src="/sphere-fallback.png"
        alt="Interactive 3D Sphere Fallback"
        style={{
          position: 'absolute',
          width: '130%',
          height: '100%',
          left: '-20%',
          top: 0,
          objectFit: 'cover',
          mixBlendMode: 'screen',
          opacity: loaded ? 0 : 1, // Smoothly cross-fade to interactive scene once fully loaded
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      />

      {/* Interactive Local Spline Canvas (Watermark-hidden, responsive, custom cursor compliant) */}
      {!timedOut && (
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
            zIndex: 1,
          }}
        />
      )}

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



