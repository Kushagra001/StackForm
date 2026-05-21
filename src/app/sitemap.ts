import { MetadataRoute } from 'next'
import { sanity } from '@/lib/sanity'
import { PROJECTS_QUERY } from '@/lib/queries'
import type { Project } from '@/types/project'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stack-form.dev'
  
  // Default static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ]

  // Dynamic project pages
  const defaultSlugs = ['flow', 'arca', 'medica', 'kern', 'axiom']
  let slugs = defaultSlugs

  try {
    if (
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'
    ) {
      const projects: Project[] = await sanity.fetch(PROJECTS_QUERY)
      if (projects && projects.length > 0) {
        slugs = projects.map(p => p.slug.current)
      }
    }
  } catch {
    // Fall back to default hardcoded slugs on compile/error
  }

  const dynamicPages = slugs.map(slug => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...dynamicPages]
}
