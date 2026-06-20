'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

export default function SearchBar({
  defaultQuery,
  defaultCategory,
}: {
  defaultQuery: string;
  defaultCategory: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  function handleSearch() {
    const q = query.trim();
    if (!q && !selectedCategory) { router.push('/search'); return; }
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`/search?${params.toString()}`);
  }

  function handleCategoryClick(slug: string) {
    const next = selectedCategory === slug ? '' : slug;
    setSelectedCategory(next);
    const params = new URLSearchParams();
    if (next) {
      setQuery('');
      params.set('category', next);
    } else {
      const q = query.trim();
      if (q) params.set('q', q);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5 rounded-xl bg-white border border-black/10 px-5 py-2 shadow-sm">
        <svg
          className="shrink-0 text-muted"
          width="18"
          height="18"
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
          className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-base text-input outline-none placeholder:text-faint"
          placeholder="Search local businesses…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
        />
        <button
          onClick={handleSearch}
          className="shrink-0 cursor-pointer whitespace-nowrap rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-dark"
        >
          Search
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className={
              selectedCategory === cat.slug
                ? 'cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-primary bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-150'
                : 'cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-black/15 bg-transparent px-4 py-1.5 text-xs text-body transition-colors duration-150 hover:border-primary/50 hover:text-primary'
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
