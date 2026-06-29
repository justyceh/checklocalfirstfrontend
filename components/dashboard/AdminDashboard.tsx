'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuth, getAuthHeaders, type AuthState } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

type Stats = {
  totalBusinesses: number;
  totalUsers: number;
  newSignupsLast24Hours: number;
};

type Business = {
  id: string;
  owner_user_id: string | null;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  status: 'active' | 'suspended';
};

type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_type: 'user' | 'business' | 'admin';
};

type DeleteTarget =
  | { kind: 'business'; business: Business; ownerName: string | null }
  | { kind: 'user'; user: User };

const VALID_STATUSES = ['active', 'suspended'] as const;

export default function AdminDashboard({ auth }: { auth: AuthState }) {
  const router = useRouter();
  const [tab, setTab] = useState<'businesses' | 'users'>('businesses');
  const [stats, setStats] = useState<Stats | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bizLoading, setBizLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  function forceLogout(status: number) {
    if (status === 401 || status === 403) {
      clearAuth();
      router.replace('/login');
      return true;
    }
    return false;
  }

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}admin/stats`, { headers: getAuthHeaders() });
      if (forceLogout(res.status)) return;
      if (res.ok) setStats(await res.json());
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBusinesses = useCallback(async () => {
    setBizLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}admin/businesses`, { headers: getAuthHeaders() });
      if (forceLogout(res.status)) return;
      if (res.ok) {
        const data = await res.json();
        setBusinesses(Array.isArray(data) ? data : []);
      }
    } catch {}
    setBizLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}admin/users`, { headers: getAuthHeaders() });
      if (forceLogout(res.status)) return;
      if (res.ok) {
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch {}
    setUsersLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadStats();
    loadBusinesses();
    loadUsers();
  }, [loadStats, loadBusinesses, loadUsers]);

  async function toggleStatus(biz: Business) {
    const next = biz.status === 'active' ? 'suspended' : 'active';
    if (!VALID_STATUSES.includes(next)) return;
    setTogglingId(biz.id);
    try {
      const res = await fetch(`${API_BASE_URL}admin/businesses/${biz.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ status: next }),
      });
      if (forceLogout(res.status)) return;
      if (res.ok) {
        setBusinesses(prev => prev.map(b => b.id === biz.id ? { ...b, status: next } : b));
        loadStats();
      }
    } catch {}
    setTogglingId(null);
  }

  function openDeleteBusiness(biz: Business) {
    const owner = users.find(u => u.user_id === biz.owner_user_id);
    const ownerName = owner ? `${owner.first_name} ${owner.last_name}` : null;
    setDeleteTarget({ kind: 'business', business: biz, ownerName });
    setDeleteError('');
  }

  function openDeleteUser(user: User) {
    setDeleteTarget({ kind: 'user', user });
    setDeleteError('');
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');
    try {
      let res: Response;
      if (deleteTarget.kind === 'business') {
        res = await fetch(`${API_BASE_URL}admin/businesses/${deleteTarget.business.id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      } else {
        res = await fetch(`${API_BASE_URL}admin/users/${deleteTarget.user.user_id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      }
      if (forceLogout(res.status)) return;
      if (res.ok) {
        if (deleteTarget.kind === 'business') {
          setBusinesses(prev => prev.filter(b => b.id !== deleteTarget.business.id));
        } else {
          setUsers(prev => prev.filter(u => u.user_id !== deleteTarget.user.user_id));
        }
        loadStats();
        setDeleteTarget(null);
      } else {
        const body = await res.json().catch(() => ({}));
        setDeleteError(body.error ?? 'Failed to delete. Please try again.');
      }
    } catch {
      setDeleteError('Could not reach the server.');
    }
    setDeleting(false);
  }

  const TAB_BASE = 'px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer';
  const TAB_ACTIVE = `${TAB_BASE} bg-primary text-white`;
  const TAB_INACTIVE = `${TAB_BASE} text-body hover:bg-black/5`;

  const Spinner = () => (
    <div className="flex h-40 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface pt-20 sm:pt-24 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-dark">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Internal moderation — not visible to public users.</p>
        </div>

        {/* Stats — 1 col on mobile, 3 on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Businesses', value: stats?.totalBusinesses },
            { label: 'Total Users', value: stats?.totalUsers },
            { label: 'New Signups (24 h)', value: stats?.newSignupsLast24Hours },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-xs text-muted mb-1">{label}</p>
              {value === undefined ? (
                <div className="h-7 w-10 animate-pulse rounded bg-black/8" />
              ) : (
                <p className="text-2xl font-bold text-dark">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button className={tab === 'businesses' ? TAB_ACTIVE : TAB_INACTIVE} onClick={() => setTab('businesses')}>
            Businesses
          </button>
          <button className={tab === 'users' ? TAB_ACTIVE : TAB_INACTIVE} onClick={() => setTab('users')}>
            Users
          </button>
        </div>

        {/* ── BUSINESSES ── */}
        {tab === 'businesses' && (
          <section className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
            {bizLoading ? (
              <Spinner />
            ) : businesses.length === 0 ? (
              <p className="px-6 py-10 text-sm text-muted text-center">No businesses found.</p>
            ) : (
              <>
                {/* Mobile cards */}
                <ul className="md:hidden divide-y divide-black/8">
                  {businesses.map(biz => (
                    <li key={biz.id} className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p className="font-medium text-dark leading-snug">{biz.name}</p>
                        <StatusBadge status={biz.status} />
                      </div>
                      {biz.email && (
                        <p className="text-xs text-muted mb-0.5">{biz.email}</p>
                      )}
                      {(biz.city || biz.state) && (
                        <p className="text-xs text-muted">
                          {[biz.city, biz.state].filter(Boolean).join(', ')}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => toggleStatus(biz)}
                          disabled={togglingId === biz.id}
                          className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2 text-xs font-medium text-body hover:bg-black/5 disabled:opacity-50 transition-colors"
                        >
                          {togglingId === biz.id
                            ? '…'
                            : biz.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          onClick={() => openDeleteBusiness(biz)}
                          className="cursor-pointer flex-1 rounded-lg border border-red-200 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/8 bg-black/2">
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Business</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Location</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Status</th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-muted uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/8">
                      {businesses.map(biz => (
                        <tr key={biz.id} className="hover:bg-black/1 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-medium text-dark">{biz.name}</p>
                            <p className="text-xs text-muted mt-0.5">{biz.email || '—'}</p>
                          </td>
                          <td className="px-5 py-4 text-body">
                            {[biz.city, biz.state].filter(Boolean).join(', ') || '—'}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={biz.status} />
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => toggleStatus(biz)}
                                disabled={togglingId === biz.id}
                                className="cursor-pointer rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium text-body hover:bg-black/5 disabled:opacity-50 transition-colors"
                              >
                                {togglingId === biz.id
                                  ? '…'
                                  : biz.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                              <button
                                onClick={() => openDeleteBusiness(biz)}
                                className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        )}

        {/* ── USERS ── */}
        {tab === 'users' && (
          <section className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
            {usersLoading ? (
              <Spinner />
            ) : users.length === 0 ? (
              <p className="px-6 py-10 text-sm text-muted text-center">No users found.</p>
            ) : (
              <>
                {/* Mobile cards */}
                <ul className="md:hidden divide-y divide-black/8">
                  {users.map(user => (
                    <li key={user.user_id} className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p className="font-medium text-dark">{user.first_name} {user.last_name}</p>
                        <AccountTypeBadge type={user.account_type} />
                      </div>
                      <p className="text-xs text-muted">{user.email}</p>
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => openDeleteUser(user)}
                          disabled={user.user_id === auth.user_id}
                          className="cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-default transition-colors"
                          title={user.user_id === auth.user_id ? 'Cannot delete your own account' : undefined}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/8 bg-black/2">
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Name</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Email</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Type</th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-muted uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/8">
                      {users.map(user => (
                        <tr key={user.user_id} className="hover:bg-black/1 transition-colors">
                          <td className="px-5 py-4 font-medium text-dark">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="px-5 py-4 text-body">{user.email}</td>
                          <td className="px-5 py-4">
                            <AccountTypeBadge type={user.account_type} />
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => openDeleteUser(user)}
                              disabled={user.user_id === auth.user_id}
                              className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-default transition-colors"
                              title={user.user_id === auth.user_id ? 'Cannot delete your own account' : undefined}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={e => { if (e.target === e.currentTarget) setDeleteTarget(null); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-dark mb-3">Confirm permanent deletion</h2>

            {deleteTarget.kind === 'business' ? (
              <p className="text-sm text-body leading-relaxed">
                This will permanently delete{' '}
                <span className="font-semibold text-dark">{deleteTarget.business.name}</span>
                {deleteTarget.ownerName && (
                  <>
                    {' '}and{' '}
                    <span className="font-semibold text-dark">{deleteTarget.ownerName}</span>
                    &apos;s account
                  </>
                )}
                , along with all of its services. <strong>This cannot be undone.</strong>
              </p>
            ) : (
              <p className="text-sm text-body leading-relaxed">
                This will permanently delete{' '}
                <span className="font-semibold text-dark">
                  {deleteTarget.user.first_name} {deleteTarget.user.last_name}
                </span>
                &apos;s account. If they own a business, that listing will remain but lose its owner.{' '}
                <strong>This cannot be undone.</strong>
              </p>
            )}

            {deleteError && (
              <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{deleteError}</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setDeleteTarget(null); setDeleteError(''); }}
                disabled={deleting}
                className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2.5 text-sm font-medium text-body hover:bg-black/5 disabled:opacity-60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="cursor-pointer flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition-colors"
              >
                {deleting ? 'Deleting…' : 'Delete permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: 'active' | 'suspended' }) {
  return status === 'active' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Suspended
    </span>
  );
}

function AccountTypeBadge({ type }: { type: 'user' | 'business' | 'admin' }) {
  const styles: Record<string, string> = {
    admin: 'bg-purple-50 text-purple-700',
    business: 'bg-blue-50 text-blue-700',
    user: 'bg-black/5 text-body',
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize shrink-0 ${styles[type] ?? styles.user}`}>
      {type}
    </span>
  );
}
