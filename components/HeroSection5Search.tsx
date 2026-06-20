'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FEATURED_CATEGORIES = [
  {
    name: 'Plants & Garden',
    slug: 'plants-and-garden',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12" />
        <path d="M12 12C12 12 7 10 5 6c3 0 6 2 7 6z" />
        <path d="M12 12C12 12 17 10 19 6c-3 0-6 2-7 6z" />
        <path d="M12 17C12 17 8 15.5 7 12c2.5 0 4.5 2 5 5z" />
        <path d="M12 17C12 17 16 15.5 17 12c-2.5 0-4.5 2-5 5z" />
      </svg>
    ),
  },
  {
    name: 'Clothing & Apparel',
    slug: 'clothing-and-apparel',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.38 3.46L16 2l-4 4-4-4-4.38 1.46A2 2 0 0 0 2 5.35V7a1 1 0 0 0 1 1h1v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8h1a1 1 0 0 0 1-1V5.35a2 2 0 0 0-1.62-1.89z" />
      </svg>
    ),
  },
  {
    name: 'Gifts & Specialty',
    slug: 'gifts-and-specialty',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
];

export default function HeroSection5Search() {
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
    <div>
      <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-5 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
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

      <div className="mt-4 grid grid-cols-3 gap-3">
        {FEATURED_CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            onClick={() => router.push(`/search?category=${cat.slug}`)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-primary">{cat.icon}</span>
            <span className="text-sm font-medium text-label">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
