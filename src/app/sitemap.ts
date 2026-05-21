import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://valoroxai.com'

/** Pages that should be indexed */
const PUBLIC_PAGES = [
  { path: '',          priority: 1.0, changeFreq: 'weekly'  as const },
  { path: '/metodo',   priority: 0.9, changeFreq: 'monthly' as const },
  { path: '/chi-siamo',priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/affiliati',priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/legal/privacy',      priority: 0.4, changeFreq: 'yearly' as const },
  { path: '/legal/terms',        priority: 0.3, changeFreq: 'yearly' as const },
  { path: '/legal/cookie-policy',priority: 0.3, changeFreq: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return PUBLIC_PAGES.map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }))
}
