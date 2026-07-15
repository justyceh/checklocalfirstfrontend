'use client';
import { useState } from 'react';
import { API_BASE_URL } from '@/lib/constants';

const SOURCES = ['Instagram', 'TikTok', 'Google', 'Facebook', "Good ol' fashioned word of mouth"];

const FIELD = 'w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-md transition-colors focus:border-white/80';
const LABEL = 'mb-1.5 block text-sm font-medium text-white/90';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}landing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const body = await res.json();
        setError(body.message ?? body.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not reach the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/25 bg-white/10 p-8 text-center text-white backdrop-blur-md">
        <p className="text-lg font-semibold">You&apos;re on the list!</p>
        <p className="mt-2 text-sm text-white/80">Thanks, {name || 'friend'} — we&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/25 bg-white/10 p-8 backdrop-blur-md">
      <div>
        <label className={LABEL} htmlFor="waitlist-name">Name</label>
        <input
          id="waitlist-name"
          className={FIELD}
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={LABEL} htmlFor="waitlist-email">Email</label>
        <input
          id="waitlist-email"
          type="email"
          className={FIELD}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={LABEL} htmlFor="waitlist-source">How did you find us?</label>
        <div className="relative">
          <select
            id="waitlist-source"
            className={`${FIELD} appearance-none pr-10`}
            value={source}
            onChange={e => setSource(e.target.value)}
            required
          >
            <option value="" disabled style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Select one</option>
            {SOURCES.map(s => (
              <option key={s} value={s} style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>{s}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="group relative mt-2 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/80 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <span className="relative z-10">{loading ? 'Joining…' : 'Join the Waitlist'}</span>
      </button>
    </form>
  );
}
