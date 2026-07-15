import Link from 'next/link';
import type { SearchResult } from '@/lib/types';

export default function ServiceResultCard({ result }: { result: SearchResult }) {
  const biz = result.business;
  const match = result.bestMatch;

  return (
    <Link
      href={`/businesses/${biz.slug}`}
      className="flex flex-col gap-2 rounded-xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 text-lg font-semibold text-dark leading-snug">{biz.name}</h2>
        <span className="max-w-[50%] shrink-0 truncate rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {match.name}
        </span>
      </div>

      {result.matchCount > 1 && (
        <span className="text-xs font-medium text-muted">+{result.matchCount - 1} more</span>
      )}

      {match.description && (
        <p className="text-sm text-body leading-relaxed line-clamp-2">{match.description}</p>
      )}

      <div className="mt-auto flex flex-col gap-1 pt-2 text-sm text-subtle">
        {biz.address && (
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {biz.address}
          </span>
        )}
        {biz.phone && (
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
            </svg>
            {biz.phone}
          </span>
        )}
      </div>
    </Link>
  );
}
