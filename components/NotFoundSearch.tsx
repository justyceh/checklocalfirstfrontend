'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a local business…"
        className="flex-1 rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-input outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
      >
        Search
      </button>
    </form>
  );
}
