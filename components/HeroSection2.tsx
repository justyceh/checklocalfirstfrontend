'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Courier_Prime } from 'next/font/google';

const courierPrime = Courier_Prime({ weight: '400', subsets: ['latin'] });

export default function HeroSection2() {
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
    <section className="relative">
      <div className="relative z-20 bg-[#1a2e1c] py-2.5 text-center">
        <span className={`${courierPrime.className} tracking-widest text-sm text-[#d4c9a8]`}>
          We are here for local, we are here for you
        </span>
      </div>

      <main
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center py-16 px-5"
        style={{ backgroundImage: "url('/imgs/businessowners.jpg')" }}
      >
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(15,10,5,0.32)_0%,rgba(15,10,5,0.7)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-160 text-center">
          <h1 className="mb-5 text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
            Support Your Neighbors. <br />Check Local First
          </h1>

          <p className="mb-9 text-[clamp(1rem,2.5vw,1.15rem)] leading-[1.65] text-white/82">
            Every dollar spent local, stays local, support genuine, unique businesses
          </p>

          <div className="flex items-center gap-2.5 rounded-xl bg-white pb-1.5 pl-4 pr-1.5 pt-1.5 shadow-[0_8px_48px_rgba(0,0,0,0.35)]">
            <svg
              className="shrink-0"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
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
              className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-base text-[#374151] outline-none placeholder:text-[#aaa]"
              placeholder="Search vintage, plants, food..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button
              onClick={handleSearch}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-lg bg-[#3a6e3f] px-5.5 py-2.75 text-[0.9rem] font-semibold text-white transition-colors duration-150 hover:bg-[#2a4d2f]"
            >
              Search
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
