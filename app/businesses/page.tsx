import { API_BASE_URL } from '@/lib/constants';
import type { Business } from '@/lib/types';
import { findPhoto } from '@/lib/server-utils';
import BusinessCard from '@/components/BusinessCard';

export const metadata = {
  title: 'Local Businesses | Check Local First',
  description: 'Browse all local businesses registered on Check Local First. Discover unique shops and services in Reno, Nevada.',
  alternates: { canonical: '/businesses' },
  openGraph: {
    title: 'Local Businesses | Check Local First',
    description: 'Browse all local businesses registered on Check Local First. Discover unique shops and services in Reno, Nevada.',
    type: 'website',
    url: '/businesses',
  },
};

export default async function BusinessesPage() {
  let businesses: Business[] = [];
  let errorMessage = '';

  try {
    const res = await fetch(`${API_BASE_URL}businesses`, { cache: 'no-store' });
    if (res.ok) {
      businesses = await res.json();
    } else {
      errorMessage = 'Something went wrong. Please try again.';
    }
  } catch {
    errorMessage = 'Could not reach the server. Please check your connection.';
  }

  const photoMap: Record<string, string> = {};
  for (const biz of businesses) {
    const photo = findPhoto(biz.slug);
    if (photo) photoMap[biz.slug] = photo;
  }

  const sorted = [...businesses].sort((a, b) => {
    const aHas = Boolean(photoMap[a.slug]);
    const bHas = Boolean(photoMap[b.slug]);
    if (aHas === bHas) return 0;
    return aHas ? -1 : 1;
  });

  return (
    <main className="min-h-screen bg-surface pt-20 pb-16 px-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 pt-8">
          <h1 className="text-3xl font-bold tracking-tight text-dark">Local Businesses</h1>
          {!errorMessage && (
            <p className="mt-1 text-sm text-muted">
              {businesses.length === 0
                ? 'No businesses listed yet'
                : `${businesses.length} business${businesses.length === 1 ? '' : 'es'} registered`}
            </p>
          )}
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {errorMessage}
          </div>
        ) : businesses.length === 0 ? (
          <div className="rounded-xl border border-black/10 bg-white p-12 text-center">
            <p className="text-lg font-medium text-label">No businesses yet</p>
            <p className="mt-2 text-sm text-muted">
              Be the first to register your local business.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map(business => (
              <BusinessCard
                key={business.id}
                business={business}
                photoSrc={photoMap[business.slug]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
