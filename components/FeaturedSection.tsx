import Link from 'next/link';
import { API_BASE_URL } from '@/lib/constants';
import { findPhoto } from '@/lib/server-utils';
import type { Business } from '@/lib/types';
import BusinessCard from '@/components/BusinessCard';

export default async function FeaturedSection() {
  let businesses: Business[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}businesses`, { next: { revalidate: 3600 } });
    if (res.ok) businesses = await res.json();
  } catch { /* render nothing if API is unreachable */ }

  const photoMap: Record<string, string> = {};
  for (const biz of businesses) {
    const photo = findPhoto(biz.slug);
    if (photo) photoMap[biz.slug] = photo;
  }

  const withPhoto = businesses.filter(b => photoMap[b.slug]);
  const withoutPhoto = businesses.filter(b => !photoMap[b.slug]);
  const featured = [...withPhoto, ...withoutPhoto].slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="bg-surface px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Reno, NV
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-dark">
              Meet Your Neighbors
            </h2>
          </div>
          <Link
            href="/businesses"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(business => (
            <BusinessCard
              key={business.id}
              business={business}
              photoSrc={photoMap[business.slug]}
            />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-medium text-body transition-colors hover:bg-black/5"
          >
            View all businesses →
          </Link>
        </div>

      </div>
    </section>
  );
}
