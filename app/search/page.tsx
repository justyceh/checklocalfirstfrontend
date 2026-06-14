import type { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/constants';
import type { ServiceResult } from '@/lib/types';
import ServiceResultCard from '@/components/ServiceResultCard';
import SearchBar from '@/components/SearchBar';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Search Local Reno Businesses | Check Local First',
  description: 'Search for local businesses and services in Reno, Nevada. Find exactly what you need from real local shops on Check Local First.',
  alternates: { canonical: '/search' },
  openGraph: {
    title: 'Search Local Reno Businesses | Check Local First',
    description: 'Search for local businesses and services in Reno, Nevada. Find exactly what you need from real local shops on Check Local First.',
    type: 'website',
    url: '/search',
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { q, category } = await searchParams;
  const query = typeof q === 'string' ? q.trim() : '';
  const cat = typeof category === 'string' ? category.trim() : '';

  if (!query && !cat) {
    return (
      <main className="min-h-screen bg-[#f7f7f5] pt-20 pb-16 px-5">
        <div className="mx-auto max-w-2xl pt-12">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-[#1a1a1a]">
            Find local businesses
          </h1>
          <SearchBar defaultQuery="" defaultCategory="" />
        </div>
      </main>
    );
  }

  const url = new URL(`${API_BASE_URL}search`);
  if (query) url.searchParams.set('q', query);
  if (cat) url.searchParams.set('category', cat);

  let results: ServiceResult[] = [];
  let errorMessage = '';

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (res.ok) {
      results = await res.json();
    } else if (res.status !== 400) {
      errorMessage = 'Something went wrong. Please try again.';
    }
  } catch {
    errorMessage = 'Could not reach the server. Please check your connection.';
  }

  const categoryLabel = CATEGORIES.find(c => c.slug === cat)?.name;

  return (
    <main className="min-h-screen bg-[#f7f7f5] pt-20 pb-16 px-5">
      <div className="mx-auto max-w-5xl">
        <SearchBar defaultQuery={query} defaultCategory={cat} />

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
            {query
              ? <>Results for <span className="text-[#3a6e3f]">&ldquo;{query}&rdquo;</span></>
              : <>Browsing <span className="text-[#3a6e3f]">{categoryLabel ?? cat}</span></>
            }
          </h1>
          {categoryLabel && query && (
            <p className="mt-1 text-sm text-[#666]">in {categoryLabel}</p>
          )}
          {!errorMessage && (
            <p className="mt-1 text-sm text-[#888]">
              {results.length === 0
                ? 'No results found'
                : `${results.length} result${results.length === 1 ? '' : 's'}`}
            </p>
          )}
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {errorMessage}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-black/10 bg-white p-12 text-center">
            <p className="text-lg font-medium text-[#333]">No local businesses found</p>
            <p className="mt-2 text-sm text-[#888]">
              Try a different search term or browse a category above.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(service => (
              <ServiceResultCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
