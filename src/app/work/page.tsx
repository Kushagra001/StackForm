import { sanity } from "@/lib/sanity";
import { PROJECTS_QUERY } from "@/lib/queries";
import { Work } from "@/components/sections/Work";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import type { Project } from "@/types/project";

export const metadata = {
  title: "Work: Stackform",
  description: "Selected projects. Five systems built for growth.",
};

export default async function WorkPage() {
  let projects: Project[] = [];

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder") {
      projects = await sanity.fetch(PROJECTS_QUERY);
    }
  } catch {
    // Fallback to hardcoded data in Work component
  }

  return (
    <>
      <Nav />
      <main className="pt-16">
        <Work projects={projects} />
      </main>
      <Footer />
    </>
  );
}
