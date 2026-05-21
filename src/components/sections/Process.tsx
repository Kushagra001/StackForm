"use client";

import { useReveal } from "@/hooks/useReveal";
import { Tag } from "@/components/ui/Tag";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "1 week",
    body: "I learn your business, your users, and your goal. No assumptions. Every project starts with a deep-dive call and a written brief you approve before I write a single line of code.",
  },
  {
    number: "02",
    title: "Design in code",
    duration: "1–2 weeks",
    body: "I prototype directly in the browser using real Next.js and real interactions. Faster feedback loops, fewer surprises at handover.",
  },
  {
    number: "03",
    title: "Build & integrate",
    duration: "2–4 weeks",
    body: "Full development, CMS setup, automation wiring, and QA. You see progress every 3 days. Nothing ships without your sign-off.",
  },
  {
    number: "04",
    title: "Launch & support",
    duration: "Ongoing",
    body: "I handle deployment, DNS, and the first 30 days of live monitoring. After that, retainer or per-request: your choice.",
  },
];

export function Process() {
  const revealRef = useReveal<HTMLDivElement>({ y: 30, stagger: 0.12 });

  return (
    <section
      id="process"
      className="pt-32 pb-12"
      style={{ backgroundColor: "#0d0d18" }}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Label */}
        <p
          className="text-sf-blue mb-4 uppercase tracking-widest"
          style={{
            fontSize: "10px",
            fontFamily: "var(--font-jetbrains, monospace)",
          }}
        >
          HOW I WORK
        </p>

        {/* Heading */}
        <h2
          className="text-sf-white leading-tight mb-20"
          style={{
            fontFamily: "var(--font-cal), var(--font-inter), sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
          }}
        >
          How a project
          <br />
          with me works.
        </h2>

        {/* Steps */}
        <div ref={revealRef} className="relative">
          {/* Horizontal connector line (desktop xl only) */}
          <div
            className="hidden xl:block absolute top-6 left-0 right-0 h-px"
            style={{
              background:
                "repeating-linear-gradient(to right, rgba(240,240,255,0.12) 0, rgba(240,240,255,0.12) 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-8 xl:gap-6">
            {steps.map(({ number, title, duration, body }) => (
              <div key={number} className="relative">
                {/* Number with bg circle to break dashed line */}
                <div className="relative z-10 inline-flex mb-6">
                  <div
                    className="w-12 h-12 rounded-full border border-sf-border flex items-center justify-center"
                    style={{ backgroundColor: "#0d0d18" }}
                  >
                    <span
                      className="text-sf-blue"
                      style={{
                        fontSize: "12px",
                        fontFamily: "var(--font-jetbrains, monospace)",
                      }}
                    >
                      {number}
                    </span>
                  </div>
                </div>

                {/* Title + duration */}
                <div className="flex items-start gap-2 mb-3 flex-wrap">
                  <h3
                    className="text-sf-white"
                    style={{
                      fontFamily:
                        "var(--font-cal), var(--font-inter), sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    {title}
                  </h3>
                  <Tag variant="blue">{duration}</Tag>
                </div>

                {/* Body */}
                <p
                  className="text-sf-white-dim leading-relaxed"
                  style={{ fontSize: "14px", lineHeight: "1.7" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
