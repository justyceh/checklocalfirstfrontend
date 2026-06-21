'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HeroSection8() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSearch() {
    const q = query.trim();
    if (!q) { router.push('/search'); return; }
    const params = new URLSearchParams();
    params.set('q', q);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="flex min-h-dvh flex-col pt-17 md:flex-row">

      {/* ── IMAGE — top on mobile, right column on desktop ── */}
      <div className="relative h-[45vh] shrink-0 md:order-2 md:h-auto md:w-[45%]">
        <Image
          src="/imgs/farmers1.JPG"
          alt="Local Reno farmers market"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 45vw, 100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ── TEXT + SEARCH — below image on mobile, left column on desktop ── */}
      <div className="flex flex-col justify-center px-6 py-12 md:order-1 md:w-[55%] md:px-16 lg:px-24">

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.01em] text-dark">
          <span className="block whitespace-nowrap">Support Your</span>
          <span className="block whitespace-nowrap">Neighbors</span>
          <span className="block whitespace-nowrap text-primary">Check Local First</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-body">
          Vote with your dollars, support local businesses
        </p>

        {/* Search bar */}
        <div className="mt-10 flex max-w-md items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.09)]">
          <svg
            className="shrink-0 text-faint"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-base text-input outline-none placeholder:text-faint"
            placeholder="Find local..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
          />
          <button
            onClick={handleSearch}
            className="shrink-0 cursor-pointer whitespace-nowrap rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-dark"
          >
            Search
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-sm text-faint">
          Every dollar spent local stays local
        </p>

      </div>

    </section>
  );
}
