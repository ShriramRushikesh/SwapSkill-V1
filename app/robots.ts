import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/dashboard', '/onboarding'],
    },
    sitemap: 'https://swapskill.com/sitemap.xml',
  }
}
