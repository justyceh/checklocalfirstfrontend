'use client'
import { useState } from 'react';
import { API_BASE_URL } from '@/lib/constants';
import type { BusinessService } from '@/lib/types';

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-[#374151] outline-none transition-colors focus:border-[#3a6e3f] focus:ring-1 focus:ring-[#3a6e3f]';
const LABEL = 'mb-1 block text-sm font-medium text-[#333]';

type Props = {
  slug: string;
  initialServices: BusinessService[];
  authHeader: Record<string, string>;
};

type ServiceFormState = { name: string; description: string; price: string };
const emptyForm: ServiceFormState = { name: '', description: '', price: '' };

function toPayload(f: ServiceFormState) {
  return {
    name: f.name,
    description: f.description,
    price: f.price !== '' ? parseFloat(f.price) : null,
    category_id: null,
  };
}

export default function ServiceManager({ slug, initialServices, authHeader }: Props) {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<ServiceFormState>(emptyForm);
  const [editForm, setEditForm] = useState<ServiceFormState>(emptyForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}businesses/${slug}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify(toPayload(addForm)),
      });
      if (res.ok) {
        const svcRes = await fetch(`${API_BASE_URL}businesses/${slug}/services`);
        const body = svcRes.ok ? await svcRes.json() : { data: [] };
        setServices(body.data ?? []);
        setAddForm(emptyForm);
        setShowAdd(false);
      } else {
        const d = await res.json();
        setError(d.error ?? 'Failed to add service.');
      }
    } catch {
      setError('Could not reach the server.');
    } finally {
      setSaving(false);
    }
  }

  function startEdit(service: BusinessService) {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      description: service.description ?? '',
      price: service.price != null ? String(service.price) : '',
    });
    setError('');
    setShowAdd(false);
  }

  async function handleEdit(e: React.FormEvent, id: string) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}businesses/${slug}/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify(toPayload(editForm)),
      });
      if (res.ok) {
        setServices(ss => ss.map(s => s.id === id
          ? { ...s, name: editForm.name, description: editForm.description, price: editForm.price !== '' ? parseFloat(editForm.price) : null }
          : s
        ));
        setEditingId(null);
      } else {
        const d = await res.json();
        setError(d.error ?? 'Failed to update service.');
      }
    } catch {
      setError('Could not reach the server.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}businesses/${slug}/services/${id}`, {
        method: 'DELETE',
        headers: authHeader,
      });
      if (res.ok) setServices(ss => ss.filter(s => s.id !== id));
    } catch {}
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-semibold text-[#1a1a1a]">Services</h2>
          <p className="text-xs text-[#888] mt-0.5">
            {services.length} service{services.length === 1 ? '' : 's'}
          </p>
        </div>
        {!showAdd && (
          <button
            onClick={() => { setShowAdd(true); setEditingId(null); setError(''); }}
            className="cursor-pointer rounded-lg bg-[#3a6e3f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2a4d2f] transition-colors"
          >
            + Add Service
          </button>
        )}
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 rounded-xl border border-[#3a6e3f]/30 bg-[#3a6e3f]/5 p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-[#1a1a1a]">New Service</p>
          <div>
            <label className={LABEL}>Name</label>
            <input className={INPUT} value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Haircut" />
          </div>
          <div>
            <label className={LABEL}>Description <span className="text-[#aaa] font-normal">(optional)</span></label>
            <textarea className={INPUT + ' resize-none'} rows={2} value={addForm.description} onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of the service" />
          </div>
          <div>
            <label className={LABEL}>Price <span className="text-[#aaa] font-normal">(optional)</span></label>
            <input className={INPUT} type="number" step="0.01" min="0" value={addForm.price} onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={saving} className="cursor-pointer flex-1 rounded-lg bg-[#3a6e3f] py-2.5 text-sm font-semibold text-white hover:bg-[#2a4d2f] disabled:opacity-60 transition-colors">
              {saving ? 'Adding…' : 'Add Service'}
            </button>
            <button type="button" onClick={() => { setShowAdd(false); setAddForm(emptyForm); setError(''); }} className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2.5 text-sm font-medium text-[#555] hover:bg-black/5 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Service list */}
      {services.length === 0 && !showAdd ? (
        <p className="py-6 text-center text-sm text-[#888]">No services yet. Add your first service above.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {services.map(service => (
            <li key={service.id} className="rounded-xl border border-black/10 bg-[#f7f7f5] p-4">
              {editingId === service.id ? (
                <form onSubmit={e => handleEdit(e, service.id)} className="flex flex-col gap-3">
                  <div>
                    <label className={LABEL}>Name</label>
                    <input className={INPUT} value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className={LABEL}>Description</label>
                    <textarea className={INPUT + ' resize-none'} rows={2} value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} />
                  </div>
                  <div>
                    <label className={LABEL}>Price</label>
                    <input className={INPUT} type="number" step="0.01" min="0" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} placeholder="Optional" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="cursor-pointer flex-1 rounded-lg bg-[#3a6e3f] py-2 text-sm font-semibold text-white hover:bg-[#2a4d2f] disabled:opacity-60 transition-colors">
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button type="button" onClick={() => { setEditingId(null); setError(''); }} className="cursor-pointer flex-1 rounded-lg border border-black/15 py-2 text-sm font-medium text-[#555] hover:bg-black/5 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1a1a1a] leading-snug">{service.name}</p>
                    {service.description && (
                      <p className="text-sm text-[#666] mt-0.5 line-clamp-2">{service.description}</p>
                    )}
                    {service.price != null && (
                      <p className="text-sm font-bold text-[#3a6e3f] mt-1">${service.price.toFixed(2)}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(service)}
                      className="cursor-pointer rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium text-[#555] hover:bg-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      disabled={deletingId === service.id}
                      className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 transition-colors"
                    >
                      {deletingId === service.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
