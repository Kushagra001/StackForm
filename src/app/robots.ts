import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://stack-form.dev'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/studio'], // Block indexing of admin portals
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
