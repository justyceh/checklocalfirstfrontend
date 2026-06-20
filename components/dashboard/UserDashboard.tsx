'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/constants';
import { getAuthHeaders, clearAuth, type AuthState } from '@/lib/auth';

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-input outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary';
const LABEL = 'mb-1 block text-sm font-medium text-label';

type UserProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

type FavoriteItem = {
  id: string;
  business_id: string;
  businesses: {
    id: string;
    name: string;
    slug: string;
    city?: string | null;
    state?: string | null;
  };
};

export default function UserDashboard({ auth }: { auth: AuthState }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favLoading, setFavLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}users/me`, { headers: getAuthHeaders() })
      .then(r => r.json())
      .then(data => {
        const p: UserProfile = data.data;
        setProfile(p);
        setForm({ first_name: p.first_name, last_name: p.last_name, email: p.email, phone: p.phone ?? '' });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}favorites`, { headers: getAuthHeaders() })
      .then(r => r.ok ? r.json() : { data: [] })
      .then(body => setFavorites(body.data ?? []))
      .catch(() => {})
      .finally(() => setFavLoading(false));
  }, []);

  async function removeFavorite(businessId: string) {
    setFavorites(prev => prev.filter(f => String(f.business_id) !== String(businessId)));
    try {
      const res = await fetch(`${API_BASE_URL}favorites/${businessId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error();
    } catch {
      fetch(`${API_BASE_URL}favorites`, { headers: getAuthHeaders() })
        .then(r => r.ok ? r.json() : { data: [] })
        .then(body => setFavorites(body.data ?? []))
        .catch(() => {});
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE_URL}users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setProfile(p => p ? { ...p, ...form } : p);
        setEditing(false);
        setSuccess('Profile updated.');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const d = await res.json();
        setError(d.error ?? 'Failed to update profile.');
      }
    } catch {
      setError('Could not reach the server.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch(`${API_BASE_URL}auth/logout`, { method: 'POST', headers: getAuthHeaders() });
    } finally {
      clearAuth();
      window.location.href = '/';
    }
  }

  return (
    <div className="min-h-screen bg-surface pt-20 sm:pt-24 pb-16 px-5">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight text-dark mb-1">My Account</h1>
        <p className="text-sm text-muted mb-8">Manage your profile and account settings.</p>

        {/* Profile card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-dark">Profile</h2>
            {!editing && (
              <button
                onClick={() => { setEditing(true); setError(''); setSuccess(''); }}
                className="cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>

          {success && (
            <p className="mb-4 rounded-lg bg-primary/10 px-4 py-2.5 text-sm text-primary-dark">{success}</p>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL}>First name</label>
                  <input
                    className={INPUT}
                    value={form.first_name}
                    onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className={LABEL}>Last name</label>
                  <input
                    className={INPUT}
                    value={form.last_name}
                    onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={LABEL}>Email</label>
                <input
                  className={INPUT}
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className={LABEL}>Phone</label>
                <input
                  className={INPUT}
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="cursor-pointer flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 transition-colors"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setError(''); }}
                  className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2.5 text-sm font-medium text-body hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : profile ? (
            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="text-muted mb-0.5">Name</dt>
                <dd className="font-medium text-dark">{profile.first_name} {profile.last_name}</dd>
              </div>
              <div>
                <dt className="text-muted mb-0.5">Email</dt>
                <dd className="font-medium text-dark">{profile.email}</dd>
              </div>
              <div>
                <dt className="text-muted mb-0.5">Phone</dt>
                <dd className="font-medium text-dark">{profile.phone || '—'}</dd>
              </div>
            </dl>
          ) : (
            <div className="flex h-20 items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </section>

        {/* Saved Businesses card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <h2 className="font-semibold text-dark mb-4">Saved Businesses</h2>

          {favLoading ? (
            <div className="flex h-16 items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : favorites.length === 0 ? (
            <p className="text-sm text-muted">
              No saved businesses yet. Browse{' '}
              <Link href="/businesses" className="text-primary hover:underline">
                local businesses
              </Link>
              {' '}and tap the heart to save your favorites.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-black/8">
              {favorites.map(fav => (
                <li key={fav.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <Link
                      href={`/businesses/${fav.businesses.slug}`}
                      className="text-sm font-medium text-dark hover:text-primary transition-colors truncate block"
                    >
                      {fav.businesses.name}
                    </Link>
                    {(fav.businesses.city || fav.businesses.state) && (
                      <p className="text-xs text-muted mt-0.5">
                        {[fav.businesses.city, fav.businesses.state].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFavorite(String(fav.business_id))}
                    aria-label={`Remove ${fav.businesses.name} from favorites`}
                    className="cursor-pointer shrink-0 flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent/15 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#7ec9a4"
                      stroke="#7ec9a4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Account card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-dark mb-4">Account</h2>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="cursor-pointer w-full rounded-lg border border-black/15 py-2.5 text-sm font-medium text-body hover:bg-black/5 disabled:opacity-60 transition-colors"
          >
            {loggingOut ? 'Logging out…' : 'Log Out'}
          </button>
        </section>
      </div>
    </div>
  );
}
