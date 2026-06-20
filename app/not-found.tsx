import type { Metadata } from 'next';
import Link from 'next/link';
import NotFoundSearch from '@/components/NotFoundSearch';

export const metadata: Metadata = {
  title: 'Page Not Found | Check Local First',
  description: 'The page you were looking for does not exist. Search for local businesses in Reno, NV or browse the full directory.',
  alternates: { canonical: '/404' },
  openGraph: {
    title: 'Page Not Found | Check Local First',
    description: 'The page you were looking for does not exist. Search for local businesses in Reno, NV or browse the full directory.',
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-5 pt-20 pb-16">
      <div className="mx-auto w-full max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-dark mb-3">
          Page not found
        </h1>
        <p className="text-subtle mb-8">
          This page doesn&apos;t exist or may have moved. Try searching for what you need.
        </p>

        <div className="mb-6">
          <NotFoundSearch />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/businesses"
            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Browse Businesses
          </Link>
          <Link
            href="/"
            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg border border-black/15 px-6 py-3 text-sm font-medium text-body hover:bg-black/5 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
