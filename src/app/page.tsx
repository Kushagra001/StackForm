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

export default async function HomePage() {
  let projects: Project[] = [];

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder") {
      projects = await sanity.fetch(PROJECTS_QUERY);
    }
  } catch (err) {
    console.error("Failed to fetch sanity projects:", err);
  }

  return (
    <>
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
