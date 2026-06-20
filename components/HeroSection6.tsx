'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HeroSection6() {
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
    <section className="pt-17">

      {/* ── TOP HALF – image background ── */}
      <div
        className="relative flex min-h-[50vh] flex-col items-center justify-center bg-cover bg-center px-5 pb-14 pt-12"
        style={{ backgroundImage: "url('/imgs/nestbackground.jpg')" }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,10,5,0.25)_0%,rgba(15,10,5,0.65)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-2xl text-center">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.2] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
            <span className="block whitespace-nowrap">Support Your Neighbors.</span>
            <span className="block whitespace-nowrap">Check Local First.</span>
          </h1>

          <div className="mt-8 flex items-center gap-2.5 rounded-full border border-white/20 bg-white px-5 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <svg
              className="shrink-0 text-[#888]"
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
              className="min-w-0 flex-1 border-0 bg-transparent py-2 text-base text-[#374151] outline-none placeholder:text-[#aaa]"
              placeholder="Looking for local..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button
              onClick={handleSearch}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-full bg-[#3a6e3f] px-5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#2a4d2f]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM HALF – who are we ── */}
      <div className="bg-white px-5 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a]">
            Who are we?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#555]">
            We are local business owners who believe in community — Check Local First connects Reno residents with genuine local shops and services that keep money in the community.
          </p>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src="/imgs/swg.jpg"
              alt="Local Reno business"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 672px, 100vw"
            />
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-xl bg-[#3a6e3f] px-4 py-2.5 text-sm font-semibold text-white shadow-lg">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Reno, NV
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
