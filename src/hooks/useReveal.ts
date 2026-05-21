"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  threshold?: number;
}

export function useReveal<T extends HTMLElement>(
  options: UseRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    threshold = 0.1,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children.length > 0 ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: `top ${(1 - threshold) * 100}%`,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [y, opacity, duration, stagger, delay, threshold]);

  return ref;
}
