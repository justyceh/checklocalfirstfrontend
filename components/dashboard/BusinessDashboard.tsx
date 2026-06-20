'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/constants';
import { getAuthHeaders, clearAuth, type AuthState } from '@/lib/auth';
import type { Business, BusinessService } from '@/lib/types';
import ServiceManager from './ServiceManager';

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-input outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary';
const LABEL = 'mb-1 block text-sm font-medium text-label';

export default function BusinessDashboard({ auth }: { auth: AuthState }) {
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<BusinessService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', address: '', city: '', state: '', zip: '', phone: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [bizError, setBizError] = useState('');
  const [bizSuccess, setBizSuccess] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const allBizRes = await fetch(`${API_BASE_URL}businesses`);
        const allBiz: Business[] = allBizRes.ok ? await allBizRes.json() : [];
        const biz = allBiz.find(b => b.owner_user_id === auth.user_id);
        if (!biz) { setLoading(false); return; }
        setBusiness(biz);
        setForm({
          name: biz.name ?? '',
          description: String(biz.description ?? ''),
          address: String(biz.address ?? ''),
          city: String(biz.city ?? ''),
          state: String(biz.state ?? ''),
          zip: String(biz.zip ?? ''),
          phone: String(biz.phone ?? ''),
          email: String(biz.email ?? ''),
        });
        const svcRes = await fetch(`${API_BASE_URL}businesses/${biz.slug}/services`);
        const svcBody = svcRes.ok ? await svcRes.json() : { data: [] };
        setServices(svcBody.data ?? []);
      } catch {}
      setLoading(false);
    }
    load();
  }, [auth.user_id]);

  async function handleSaveBiz(e: React.FormEvent) {
    e.preventDefault();
    if (!business) return;
    setSaving(true);
    setBizError('');
    setBizSuccess('');
    try {
      const res = await fetch(`${API_BASE_URL}businesses/${business.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setBusiness(b => b ? { ...b, ...form } : b);
        setEditing(false);
        setBizSuccess('Business updated.');
        setTimeout(() => setBizSuccess(''), 3000);
      } else {
        const d = await res.json();
        setBizError(d.error ?? 'Failed to update.');
      }
    } catch {
      setBizError('Could not reach the server.');
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

  async function handleDeleteBusiness() {
    if (!business || deleteConfirm !== business.name) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}businesses/${business.slug}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        clearAuth();
        router.push('/');
      }
    } catch {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-surface pt-20 sm:pt-24 pb-16 px-5">
        <div className="mx-auto max-w-lg text-center pt-8">
          <p className="text-body">No business listing found for this account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-20 sm:pt-24 pb-16 px-5">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-dark mb-1">Business Dashboard</h1>
        <p className="text-sm text-muted mb-8">Manage your listing, services, and account.</p>

        {/* Business info card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-dark">Business Info</h2>
            {!editing && (
              <button
                onClick={() => { setEditing(true); setBizError(''); setBizSuccess(''); }}
                className="cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>

          {bizSuccess && (
            <p className="mb-4 rounded-lg bg-primary/10 px-4 py-2.5 text-sm text-primary-dark">{bizSuccess}</p>
          )}

          {editing ? (
            <form onSubmit={handleSaveBiz} className="flex flex-col gap-4">
              <div>
                <label className={LABEL}>Business name</label>
                <input className={INPUT} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className={LABEL}>Description</label>
                <textarea className={INPUT + ' resize-none'} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Tell customers what makes your business special" />
              </div>
              <div>
                <label className={LABEL}>Address</label>
                <input className={INPUT} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className={LABEL}>City</label>
                  <input className={INPUT} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL}>State</label>
                  <input className={INPUT} value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} maxLength={2} placeholder="TX" />
                </div>
                <div>
                  <label className={LABEL}>ZIP</label>
                  <input className={INPUT} value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={LABEL}>Phone</label>
                  <input className={INPUT} type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL}>Email</label>
                  <input className={INPUT} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              {bizError && <p className="text-sm text-red-600">{bizError}</p>}
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={saving} className="cursor-pointer flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 transition-colors">
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => { setEditing(false); setBizError(''); }} className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2.5 text-sm font-medium text-body hover:bg-black/5 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="text-muted mb-0.5">Name</dt>
                <dd className="font-medium text-dark">{business.name}</dd>
              </div>
              {business.description && (
                <div>
                  <dt className="text-muted mb-0.5">Description</dt>
                  <dd className="text-label">{String(business.description)}</dd>
                </div>
              )}
              {business.address && (
                <div>
                  <dt className="text-muted mb-0.5">Address</dt>
                  <dd className="text-label">{[business.address, business.city, business.state, business.zip].filter(Boolean).join(', ')}</dd>
                </div>
              )}
              <div className="flex gap-6">
                {business.phone && (
                  <div>
                    <dt className="text-muted mb-0.5">Phone</dt>
                    <dd className="text-label">{String(business.phone)}</dd>
                  </div>
                )}
                {business.email && (
                  <div>
                    <dt className="text-muted mb-0.5">Email</dt>
                    <dd className="text-label">{String(business.email)}</dd>
                  </div>
                )}
              </div>
            </dl>
          )}
        </section>

        {/* Services card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <ServiceManager
            slug={business.slug}
            initialServices={services}
            authHeader={getAuthHeaders()}
          />
        </section>

        {/* Account card */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <h2 className="font-semibold text-dark mb-4">Account</h2>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="cursor-pointer w-full rounded-lg border border-black/15 py-2.5 text-sm font-medium text-body hover:bg-black/5 disabled:opacity-60 transition-colors"
          >
            {loggingOut ? 'Logging out…' : 'Log Out'}
          </button>
        </section>

        {/* Danger zone */}
        <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-red-700 mb-1">Danger Zone</h2>
          <p className="text-sm text-subtle mb-5">
            Permanently deletes your business listing and all associated services. This cannot be undone.
          </p>
          <label className={LABEL + ' text-body'}>
            Type <span className="font-semibold text-dark">{business.name}</span> to confirm
          </label>
          <input
            className={INPUT + ' mb-3 mt-1'}
            value={deleteConfirm}
            onChange={e => setDeleteConfirm(e.target.value)}
            placeholder={business.name}
          />
          <button
            onClick={handleDeleteBusiness}
            disabled={deleteConfirm !== business.name || deleting}
            className="cursor-pointer w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40 transition-colors"
          >
            {deleting ? 'Deleting…' : 'Delete Business'}
          </button>
        </section>
      </div>
    </div>
  );
}
