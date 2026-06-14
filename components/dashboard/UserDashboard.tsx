'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/constants';
import { getAuthHeaders, clearAuth, type AuthState } from '@/lib/auth';

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-[#374151] outline-none transition-colors focus:border-[#3a6e3f] focus:ring-1 focus:ring-[#3a6e3f]';
const LABEL = 'mb-1 block text-sm font-medium text-[#333]';

type UserProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export default function UserDashboard({ auth }: { auth: AuthState }) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

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
      router.push('/');
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-16 px-5">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] mb-1">My Account</h1>
        <p className="text-sm text-[#888] mb-8">Manage your profile and account settings.</p>

        {/* Profile card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[#1a1a1a]">Profile</h2>
            {!editing && (
              <button
                onClick={() => { setEditing(true); setError(''); setSuccess(''); }}
                className="cursor-pointer text-sm font-medium text-[#3a6e3f] hover:underline"
              >
                Edit
              </button>
            )}
          </div>

          {success && (
            <p className="mb-4 rounded-lg bg-[#3a6e3f]/10 px-4 py-2.5 text-sm text-[#2a4d2f]">{success}</p>
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
                  className="cursor-pointer flex-1 rounded-lg bg-[#3a6e3f] py-2.5 text-sm font-semibold text-white hover:bg-[#2a4d2f] disabled:opacity-60 transition-colors"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setError(''); }}
                  className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2.5 text-sm font-medium text-[#555] hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : profile ? (
            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="text-[#888] mb-0.5">Name</dt>
                <dd className="font-medium text-[#1a1a1a]">{profile.first_name} {profile.last_name}</dd>
              </div>
              <div>
                <dt className="text-[#888] mb-0.5">Email</dt>
                <dd className="font-medium text-[#1a1a1a]">{profile.email}</dd>
              </div>
              <div>
                <dt className="text-[#888] mb-0.5">Phone</dt>
                <dd className="font-medium text-[#1a1a1a]">{profile.phone || '—'}</dd>
              </div>
            </dl>
          ) : (
            <div className="flex h-20 items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#3a6e3f] border-t-transparent" />
            </div>
          )}
        </section>

        {/* Account card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#1a1a1a] mb-4">Account</h2>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="cursor-pointer w-full rounded-lg border border-black/15 py-2.5 text-sm font-medium text-[#555] hover:bg-black/5 disabled:opacity-60 transition-colors"
          >
            {loggingOut ? 'Logging out…' : 'Log Out'}
          </button>
        </section>
      </div>
    </div>
  );
}
