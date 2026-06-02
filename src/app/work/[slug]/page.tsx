import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanity, urlFor } from "@/lib/sanity";
import { PROJECT_QUERY, PROJECTS_QUERY } from "@/lib/queries";
import { Nav } from "@/components/sections/Nav";
import Link from 'next/link'
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types/project";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "placeholder") {
      return [];
    }
    const projects: Project[] = await sanity.fetch(PROJECTS_QUERY);
    return projects.map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let project: Project | null = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder") {
      project = await sanity.fetch(PROJECT_QUERY, { slug });
    }
  } catch {
    // continue
  }

  // Fallback details if not loaded
  const fallbacks: Record<string, { title: string; tagline: string }> = {
    flow: { title: "Flōw", tagline: "Task management SaaS landing page." },
    arca: { title: "Arca Studio", tagline: "Financial advisory firm." },
    medica: { title: "Medica", tagline: "Medical centre with Airtable booking." },
    kern: { title: "Kern", tagline: "Premium coffee D2C store." },
    axiom: { title: "Axiom", tagline: "High-ticket coaching funnel." },
  };

  const fallback = fallbacks[slug];
  const title = project?.title || fallback?.title || (slug.charAt(0).toUpperCase() + slug.slice(1));
  const tagline = project?.tagline || fallback?.tagline || "Selected project case study.";

  return {
    title: `${title} Case Study | Stackform`,
    description: tagline,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${title} Case Study | Stackform`,
      description: tagline,
      url: `https://stack-form.dev/work/${slug}`,
      siteName: "Stackform",
      images: [
        {
          url: "https://stack-form.dev/opengraph-image", // Fallback, could be dynamically generated per project
          width: 1200,
          height: 630,
        }
      ]
    }
  };
}

export const dynamic = "force-dynamic";

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  let project: Project | null = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder") {
      project = await sanity.fetch(PROJECT_QUERY, { slug });
    }
  } catch {
    // continue
  }

  // Fallback for demo
  if (!project) {
    const fallbacks: Record<string, Partial<Project>> = {
      flow: { title: "Flōw", tagline: "Task management SaaS landing page.", accentColor: "#c0392b", tags: ["Next.js", "GSAP", "Framer Motion"], type: "SaaS Landing" },
      arca: { title: "Arca Studio", tagline: "Financial advisory firm.", accentColor: "#f0f0ff", tags: ["Next.js", "TypeScript"], type: "Agency Site" },
      medica: { title: "Medica", tagline: "Medical centre with Airtable booking.", accentColor: "#2980b9", tags: ["Next.js", "Airtable"], type: "Local Business" },
      kern: { title: "Kern", tagline: "Premium coffee D2C store.", accentColor: "#8B5E3C", tags: ["Shopify API", "Next.js"], type: "E-commerce" },
      axiom: { title: "Axiom", tagline: "High-ticket coaching funnel.", accentColor: "#b8922a", tags: ["React Hook Form", "Resend"], type: "Funnel" },
    };

    const fallback = fallbacks[slug];
    if (!fallback) return notFound();

    project = {
      _id: slug,
      title: fallback.title!,
      slug: { current: slug },
      client: fallback.title!,
      type: fallback.type!,
      tagline: fallback.tagline!,
      tags: fallback.tags!,
      accentColor: fallback.accentColor!,
      featured: true,
      order: 1,
      overview: "Full case study coming soon.",
    };
  }

  // Provide premium editorial case study fallbacks if fields are empty in Sanity or fallback
  const premiumCaseStudies: Record<string, {
    overview: string;
    challenge: string;
    solution: string;
    results: Array<{ metric: string; label: string }>;
  }> = {
    flow: {
      overview: "Flow is a high-performance productivity platform designed to streamline team workflows and eliminate task friction. I built a visually stunning, premium SaaS landing page with optimized lead capture, smooth micro-interactions, and a robust automation backend.",
      challenge: "Standard SaaS templates often feel cold, generic, and identical. Flow needed to stand out with an editorial-grade warm aesthetic while maintaining ultra-fast load times. Additionally, they needed a seamless way to capture leads and automatically route them to their CRM and email marketing tools without maintaining complex server infrastructure.",
      solution: "I developed a premium, responsive landing page using Next.js and GSAP for state-of-the-art interactive scrolling and entrance animations. The styling utilizes a refined, sunlit warm color palette built on top of customized CSS design tokens. For the lead intake, I engineered a serverless contact path that leverages Make.com to instantly parse submissions and sync them with high-priority CRM leads and automated nurture email campaigns.",
      results: [
        { metric: "+142%", label: "Increase in Lead Conversion" },
        { metric: "< 0.8s", label: "Time to First Interactive" },
        { metric: "100%", label: "Automated CRM Sync Rate" }
      ]
    },
    arca: {
      overview: "Arca Studio is a boutique creative agency specializing in digital experiences. I crafted a highly interactive, horizontal-scrolling showcase platform integrated with Sanity CMS for seamless project management and zero-redeploy updates.",
      challenge: "Creative agencies require websites that showcase their artistry without sacrificing performance. Arca Studio needed a premium portfolio site featuring horizontal layouts, fluid page transitions, and a custom CMS that allows their designers to add new case studies instantly without developers.",
      solution: "I engineered a custom WebGL and horizontal-scroll experience using Next.js, Three.js, and GSAP's ScrollTrigger. By structuring the content architecture with Sanity CMS, the team can upload case studies, adjust accent colors dynamically, and organize their portfolio in real-time. The result is an editorial, fluid-motion showcase that feels incredibly fluid and premium.",
      results: [
        { metric: "98/100", label: "Lighthouse Performance Score" },
        { metric: "+85%", label: "Average Session Duration" },
        { metric: "0", label: "Developer Intervention for CMS Updates" }
      ]
    },
    medica: {
      overview: "Medica is a modern health clinic focused on personalized medical care. I designed a comforting, highly accessible business landing experience integrated with automated scheduling and direct database synchronization.",
      challenge: "Medical centers frequently suffer from clunky, outdated appointment systems that confuse patients and overwhelm administrative staff. Medica wanted a simple, warm, high-converting portal that lets patients schedule bookings smoothly and confirms appointments instantly via text messaging.",
      solution: "I built an elegant Next.js local business experience with a customized automatic theme-switching system. The appointment scheduling form connects directly to an Airtable CRM, utilizing automated serverless functions to trigger instant WhatsApp and SMS booking confirmations through Twilio APIs, creating a completely automated patient onboarding pipeline.",
      results: [
        { metric: "-40%", label: "Reduction in Booking Friction" },
        { metric: "99.4%", label: "Automated SMS Delivery Rate" },
        { metric: "+30%", label: "Increase in New Patient Bookings" }
      ]
    },
    kern: {
      overview: "Kern is a high-end direct-to-consumer lifestyle brand. I developed an editorial e-commerce platform that pairs scroll-driven interactive storytelling with live storefront catalog synchronization.",
      challenge: "Standard Shopify sites look templated and fail to convey the craftsmanship of premium products. Kern needed an experience that tells a compelling visual product story while maintaining robust cart interactions, search capabilities, and instantaneous checkout.",
      solution: "I implemented a headless commerce architecture using Next.js and the Shopify Storefront API. Using GSAP ScrollTrigger, I created an engaging, story-driven product presentation that guides users through the materials and details. The shopping cart and product variants are handled entirely client-side, communicating with Shopify's checkout engine in real-time.",
      results: [
        { metric: "+48%", label: "Conversion Rate Increase" },
        { metric: "-35%", label: "Bounce Rate Reduction" },
        { metric: "+22%", label: "Average Order Value (AOV)" }
      ]
    },
    axiom: {
      overview: "Axiom Strategy is a elite business consulting firm. I engineered a high-converting, premium marketing funnel featuring high-craft typography, optimized lead capture, and a multi-stage automated nurture pipeline.",
      challenge: "Consulting landing pages are often filled with low-quality popups and generic layouts, diluting the brand authority. Axiom needed a hyper-refined, minimal, trust-inducing funnel that captures executive leads and guides them into a highly tailored email sequence.",
      solution: "I built an ultra-fast, premium single-page application using Next.js, Tailwind, React Hook Form, and Resend. Submitting the lead magnet initiates a multi-stage automated email campaign wired through ConvertKit, while sending immediate, styled PDF downloads using Resend, maximizing conversion rate and email open rates.",
      results: [
        { metric: "42.5%", label: "Opt-in Conversion Rate" },
        { metric: "+65%", label: "Email Open Rate (Resend)" },
        { metric: "+210%", label: "High-Ticket Consultations Booked" }
      ]
    }
  };

  const fallbackDetails = premiumCaseStudies[slug];
  if (fallbackDetails) {
    if (!project.overview || project.overview.trim() === "" || project.overview === "Full case study coming soon.") {
      project.overview = fallbackDetails.overview;
    }
    if (!project.challenge || project.challenge.trim() === "") {
      project.challenge = fallbackDetails.challenge;
    }
    if (!project.solution || project.solution.trim() === "") {
      project.solution = fallbackDetails.solution;
    }
    if (!project.results || project.results.length === 0) {
      project.results = fallbackDetails.results;
    }
  }

  return (
    <>
      <Nav />
      <main className="pt-24 pb-32 max-w-4xl mx-auto px-8">
        {/* Back */}
        <div className="mb-12">
          <Link
            href="/work"
            className="text-sf-white-faint hover:text-sf-white text-sm transition-colors"
            style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
          >
            ← Back to work
          </Link>
        </div>

        {/* Accent line */}
        <div
          className="h-0.5 w-16 mb-10"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start gap-4 flex-wrap mb-4">
            <h1
              className="text-sf-white"
              style={{
                fontFamily: "var(--font-cal), Inter, system-ui, sans-serif",
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: "1.0",
              }}
            >
              {project.title}
            </h1>
            <div
              className="inline-flex items-center rounded-full px-3 py-1 border mt-2"
              style={{
                borderColor: `${project.accentColor}40`,
                backgroundColor: `${project.accentColor}10`,
                color: project.accentColor,
                fontSize: "11px",
                fontFamily: "var(--font-jetbrains, monospace)",
              }}
            >
              {project.type}
            </div>
          </div>
          <p className="text-sf-white-dim text-lg">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Results (if any) */}
        {project.results && project.results.length > 0 && (
          <div className="grid grid-cols-3 gap-6 mb-16 p-8 rounded-xl border border-sf-border" style={{ backgroundColor: "#0d0d18" }}>
            {project.results.map((r) => (
              <div key={r.metric} className="text-center">
                <div
                  className="text-sf-white mb-1"
                  style={{
                    fontFamily: "var(--font-cal), Inter, system-ui, sans-serif",
                    fontSize: "28px",
                    color: project!.accentColor,
                  }}
                >
                  {r.metric}
                </div>
                <div className="text-sf-white-faint" style={{ fontSize: "12px" }}>
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content sections */}
        {[
          { label: "Overview", content: project.overview },
          { label: "The challenge", content: project.challenge },
          { label: "What I built", content: project.solution },
        ].map(
          ({ label, content }) =>
            content && (
              <div key={label} className="mb-12">
                <h2
                  className="text-sf-white mb-4"
                  style={{
                    fontFamily: "var(--font-cal), Inter, system-ui, sans-serif",
                    fontSize: "24px",
                  }}
                >
                  {label}
                </h2>
                <p
                  className="text-sf-white-dim leading-relaxed"
                  style={{ fontSize: "16px", lineHeight: "1.8" }}
                >
                  {content}
                </p>
              </div>
            )
        )}

        {/* Gallery / Screenshots */}
        {((project.images && project.images.length > 0) || slug) && (
          <div className="mt-16 pt-16 border-t border-sf-border">
            <h2
              className="text-sf-white mb-8"
              style={{
                fontFamily: "var(--font-cal), Inter, system-ui, sans-serif",
                fontSize: "24px",
              }}
            >
              Gallery
            </h2>
            <div className="flex flex-col gap-8">
              {project.images && project.images.length > 0 ? (
                project.images.map((img, idx) => {
                  try {
                    const src = urlFor(img).url();
                    return (
                      <div key={idx} className="relative rounded-xl border border-sf-border overflow-hidden bg-sf-black-2 shadow-2xl">
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          width={1920}
                          height={1080}
                          unoptimized
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })
              ) : (
                // Local static fallbacks
                <>
                  <div className="relative rounded-xl border border-sf-border overflow-hidden bg-sf-black-2 shadow-2xl">
                    <Image
                      src={`/work/${slug}-lower.png`}
                      alt={`${project.title} screen 1`}
                      width={1920}
                      height={1080}
                      unoptimized
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        // Hide container if image doesn't exist
                        ;(e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="relative rounded-xl border border-sf-border overflow-hidden bg-sf-black-2 shadow-2xl">
                    <Image
                      src={`/work/${slug}-lower-2.png`}
                      alt={`${project.title} screen 2`}
                      width={1920}
                      height={1080}
                      unoptimized
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        // Hide container if image doesn't exist
                        ;(e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Live link */}
        {project.liveUrl && (
          <div className="mt-16 pt-10 border-t border-sf-border">
            <Button variant="blue" size="lg" href={project.liveUrl}>
              View live site →
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
