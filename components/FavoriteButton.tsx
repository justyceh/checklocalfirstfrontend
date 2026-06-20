'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, getAuthHeaders } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

type Props = {
  businessId: string;
  className?: string;
};

export default function FavoriteButton({ businessId, className = '' }: Props) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (auth?.accountType === 'business') {
      setHidden(true);
      setLoading(false);
      return;
    }
    if (!auth) {
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);

    fetch(`${API_BASE_URL}favorites`, { headers: getAuthHeaders() })
      .then(r => r.ok ? r.json() : { data: [] })
      .then(body => {
        const favs: Array<{ business_id: string | number; businesses?: { id: string } }> = body.data ?? [];
        const favorited = favs.some(
          f => String(f.business_id) === String(businessId) || String(f.businesses?.id) === String(businessId)
        );
        setIsFavorited(favorited);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [businessId]);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const prev = isFavorited;
    setIsFavorited(!prev);

    try {
      if (prev) {
        const res = await fetch(`${API_BASE_URL}favorites/${businessId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch(`${API_BASE_URL}favorites`, {
          method: 'POST',
          headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ business_id: businessId }),
        });
        if (!res.ok) throw new Error();
      }
    } catch {
      setIsFavorited(prev);
    }
  }

  if (loading || hidden) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
      className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorited ? '#7ec9a4' : 'none'}
        stroke={isFavorited ? '#7ec9a4' : '#888'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
