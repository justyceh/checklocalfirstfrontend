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
      <div className="flex items-center gap-[10px] rounded-xl bg-white border border-black/10 pb-[6px] pl-4 pr-[6px] pt-[6px] shadow-sm">
        <svg
          className="shrink-0"
          width="18"
          height="18"
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
          className="min-w-0 flex-1 border-0 bg-transparent py-[10px] text-base text-[#374151] outline-none placeholder:text-[#aaa]"
          placeholder="Search local businesses…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
        />
        <button
          onClick={handleSearch}
          className="shrink-0 cursor-pointer whitespace-nowrap rounded-lg bg-[#3a6e3f] px-[18px] py-[9px] text-[0.875rem] font-semibold text-white transition-colors duration-150 hover:bg-[#2a4d2f]"
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
                ? 'cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-[#3a6e3f] bg-[#3a6e3f] px-[14px] py-[5px] text-xs font-semibold text-white transition-colors duration-150'
                : 'cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-black/15 bg-transparent px-[14px] py-[5px] text-xs text-[#555] transition-colors duration-150 hover:border-[#3a6e3f]/50 hover:text-[#3a6e3f]'
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
