import Link from 'next/link';
import Image from 'next/image';
import type { Business } from '@/lib/types';

type Props = {
  business: Business;
  photoSrc?: string;
};

export default function BusinessCard({ business, photoSrc }: Props) {
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="flex flex-col rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden"
    >
      {photoSrc && (
        <div className="relative w-full aspect-4/3">
          <Image
            src={photoSrc}
            alt={business.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#1a1a1a] leading-snug">{business.name}</h2>
          {(business.city || business.state) && (
            <span className="shrink-0 rounded-full bg-[#3a6e3f]/10 px-3 py-1 text-xs font-medium text-[#3a6e3f]">
              {[business.city, business.state].filter(Boolean).join(', ')}
            </span>
          )}
        </div>

        {business.description && (
          <p className="text-sm text-[#555] leading-relaxed line-clamp-2">{business.description}</p>
        )}

        <div className="mt-auto flex flex-col gap-1 pt-1 text-sm text-[#666]">
          {business.address && (
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {[business.address, business.city, business.state, business.zip].filter(Boolean).join(', ')}
            </span>
          )}
          {business.phone && (
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
              </svg>
              {business.phone}
            </span>
          )}
          {business.email && (
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {business.email}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
