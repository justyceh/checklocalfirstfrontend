import type { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://checklocalfirst.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/businesses`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const res = await fetch(`${API_BASE_URL}businesses`, { next: { revalidate: 3600 } });
    if (!res.ok) return staticRoutes;

    const businesses: Array<{ slug: string; updated_at?: string }> = await res.json();

    const businessRoutes: MetadataRoute.Sitemap = businesses.map(biz => ({
      url: `${base}/businesses/${biz.slug}`,
      lastModified: biz.updated_at ? new Date(biz.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...businessRoutes];
  } catch {
    return staticRoutes;
  }
}
