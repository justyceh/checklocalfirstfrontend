'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_BASE_URL } from '@/lib/constants'
import { getAuth, getAuthHeaders } from '@/lib/auth'
import type { Business, BusinessService } from '@/lib/types'
import ServiceManager from './ServiceManager'

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-[#374151] outline-none transition-colors focus:border-[#3a6e3f] focus:ring-1 focus:ring-[#3a6e3f]'
const LABEL = 'mb-1 block text-sm font-medium text-[#333]'

export default function SetupShell() {
  const router = useRouter()
  const [business, setBusiness] = useState<Business | null>(null)
  const [services, setServices] = useState<BusinessService[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', address: '', city: '', state: '', zip: '', phone: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')

  useEffect(() => {
    const auth = getAuth()
    if (!auth) { router.push('/login'); return }
    if (auth.accountType !== 'business') { router.push('/'); return }

    async function load() {
      const auth = getAuth()!
      try {
        const allBizRes = await fetch(`${API_BASE_URL}businesses`)
        const allBiz: Business[] = allBizRes.ok ? await allBizRes.json() : []
        const biz = allBiz.find(b => b.owner_user_id === auth.user_id)
        if (!biz) { setLoading(false); return }
        setBusiness(biz)
        setForm({
          name: biz.name ?? '',
          description: String(biz.description ?? ''),
          address: String(biz.address ?? ''),
          city: String(biz.city ?? ''),
          state: String(biz.state ?? ''),
          zip: String(biz.zip ?? ''),
          phone: String(biz.phone ?? ''),
          email: String(biz.email ?? ''),
        })
        const svcRes = await fetch(`${API_BASE_URL}businesses/${biz.slug}/services`)
        const svcBody = svcRes.ok ? await svcRes.json() : { data: [] }
        setServices(svcBody.data ?? [])
      } catch {}
      setLoading(false)
    }
    load()
  }, [router])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!business) return
    setSaving(true)
    setSaveError('')
    setSaveSuccess('')
    try {
      const res = await fetch(`${API_BASE_URL}businesses/${business.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setBusiness(b => b ? { ...b, ...form } : b)
        setSaveSuccess('Business info saved!')
        setTimeout(() => setSaveSuccess(''), 3000)
      } else {
        const d = await res.json()
        setSaveError(d.error ?? 'Failed to save.')
      }
    } catch {
      setSaveError('Could not reach the server.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3a6e3f] border-t-transparent" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-16 px-5">
        <div className="mx-auto max-w-lg text-center pt-8">
          <p className="text-[#555]">No business listing found for this account.</p>
          <Link href="/dashboard" className="mt-4 inline-block text-sm font-medium text-[#3a6e3f] hover:underline">Go to Dashboard →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-16 px-5">
      <div className="mx-auto max-w-2xl">

        {/* Welcome banner */}
        <div className="mb-8 rounded-2xl bg-[#3a6e3f] px-6 py-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">Getting started</p>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome to Check Local First!</h1>
          <p className="text-sm text-white/80">Let&apos;s get your business set up so customers can find and contact you.</p>
        </div>

        {/* Step 1 — Business info */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3a6e3f] text-xs font-bold text-white">1</span>
            <div>
              <h2 className="font-semibold text-[#1a1a1a]">Business Details</h2>
              <p className="text-xs text-[#888]">Help customers know who you are and how to reach you.</p>
            </div>
          </div>

          {saveSuccess && (
            <p className="mb-4 rounded-lg bg-[#3a6e3f]/10 px-4 py-2.5 text-sm text-[#2a4d2f]">{saveSuccess}</p>
          )}

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className={LABEL}>Business name</label>
              <input className={INPUT} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label className={LABEL}>Description <span className="text-[#aaa] font-normal">(optional)</span></label>
              <textarea className={INPUT + ' resize-none'} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Tell customers what makes your business special" />
            </div>
            <div>
              <label className={LABEL}>Address <span className="text-[#aaa] font-normal">(optional)</span></label>
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
                <label className={LABEL}>Phone <span className="text-[#aaa] font-normal">(optional)</span></label>
                <input className={INPUT} type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL}>Email <span className="text-[#aaa] font-normal">(optional)</span></label>
                <input className={INPUT} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-lg bg-[#3a6e3f] py-2.5 text-sm font-semibold text-white hover:bg-[#2a4d2f] disabled:opacity-60 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Business Info'}
            </button>
          </form>
        </section>

        {/* Step 2 — Services */}
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3a6e3f] text-xs font-bold text-white">2</span>
            <div>
              <h2 className="font-semibold text-[#1a1a1a]">Your Services</h2>
              <p className="text-xs text-[#888]">Add at least one service so customers know what you offer.</p>
            </div>
          </div>
          <ServiceManager
            slug={business.slug}
            initialServices={services}
            authHeader={getAuthHeaders()}
          />
        </section>

        {/* Go to Dashboard */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm flex flex-col items-center text-center gap-3">
          <p className="text-sm text-[#666]">All done? Head to your dashboard to manage your full listing.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition-colors"
          >
            Go to Dashboard →
          </Link>
        </div>

      </div>
    </div>
  )
}
