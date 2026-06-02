import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { LogoTicker } from '@/components/sections/LogoTicker'
import { Services } from '@/components/sections/Services'
import { Work } from '@/components/sections/Work'
import { Process } from '@/components/sections/Process'
import { Pricing } from '@/components/sections/Pricing'
import { About } from '@/components/sections/About'
import { Comparison } from '@/components/sections/Comparison'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { sanity } from "@/lib/sanity"
import { PROJECTS_QUERY } from "@/lib/queries"
import type { Project } from "@/types/project"

// ISR: rebuild at most once per hour; serves from Vercel edge cache between revalidations
export const revalidate = 3600;

export default async function HomePage() {
  let projects: Project[] = [];

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder") {
      projects = await sanity.fetch(PROJECTS_QUERY);
    }
  } catch (err) {
    console.error("Failed to fetch sanity projects:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Stackform",
    "url": "https://stack-form.dev",
    "logo": "https://stack-form.dev/icon.svg",
    "description": "Conversion-focused web development with automation expertise. D2C brands, SaaS startups, local service businesses.",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <LogoTicker />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Work projects={projects} />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Comparison />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
