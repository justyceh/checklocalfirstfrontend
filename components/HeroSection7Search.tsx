'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection7Search() {
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
    <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white px-5 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
      <svg
        className="shrink-0 text-muted"
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
        className="min-w-0 flex-1 border-0 bg-transparent py-2 text-base text-input outline-none placeholder:text-faint"
        placeholder="Search vintage, plants, food..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
      />
      <button
        onClick={handleSearch}
        className="shrink-0 cursor-pointer whitespace-nowrap rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-dark"
      >
        Search
      </button>
    </div>
  );
}
