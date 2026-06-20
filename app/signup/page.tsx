'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_BASE_URL } from '@/lib/constants'

type Tab = 'user' | 'business'

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-input outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary'
const LABEL = 'mb-1 block text-sm font-medium text-label'
const SECTION = 'mb-1 mt-6 text-xs font-semibold uppercase tracking-wider text-muted'

function Field({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      <input id={id} className={INPUT} {...props} />
    </div>
  )
}

function UserForm({ onSuccess, onError, loading, setLoading }: {
  onSuccess: () => void
  onError: (msg: string) => void
  loading: boolean
  setLoading: (v: boolean) => void
}) {
  const [fields, setFields] = useState({ firstname: '', lastname: '', email: '', phone: '', password: '', confirm: '' })

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setFields(f => ({ ...f, [k]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (fields.password !== fields.confirm) { onError('Passwords do not match.'); return }
    setLoading(true)
    onError('')
    try {
      const res = await fetch(`${API_BASE_URL}auth/signup/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: fields.firstname, lastname: fields.lastname, email: fields.email, phone: fields.phone, password: fields.password }),
      })
      const data = await res.json()
      if (!res.ok) { onError(data.error ?? 'Something went wrong.'); return }
      onSuccess()
    } catch {
      onError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First Name" id="u-firstname" required value={fields.firstname} onChange={set('firstname')} autoComplete="given-name" />
        <Field label="Last Name" id="u-lastname" required value={fields.lastname} onChange={set('lastname')} autoComplete="family-name" />
      </div>
      <Field label="Email" id="u-email" type="email" required value={fields.email} onChange={set('email')} autoComplete="email" />
      <Field label="Phone" id="u-phone" type="tel" required value={fields.phone} onChange={set('phone')} autoComplete="tel" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Password" id="u-password" type="password" required minLength={6} value={fields.password} onChange={set('password')} autoComplete="new-password" />
        <Field label="Confirm Password" id="u-confirm" type="password" required value={fields.confirm} onChange={set('confirm')} autoComplete="new-password" />
      </div>
      <button type="submit" disabled={loading} className="mt-2 w-full cursor-pointer rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60">
        {loading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  )
}

function BusinessForm({ onSuccess, onError, loading, setLoading }: {
  onSuccess: () => void
  onError: (msg: string) => void
  loading: boolean
  setLoading: (v: boolean) => void
}) {
  const [fields, setFields] = useState({
    firstname: '', lastname: '', password: '', confirm: '',
    name: '', email: '', phone: '', description: '', address: '', city: '', state: '', zip: '',
  })

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFields(f => ({ ...f, [k]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (fields.password !== fields.confirm) { onError('Passwords do not match.'); return }
    setLoading(true)
    onError('')
    try {
      const res = await fetch(`${API_BASE_URL}auth/signup/business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: fields.firstname, lastname: fields.lastname, password: fields.password,
          name: fields.name, email: fields.email, phone: fields.phone,
          description: fields.description, address: fields.address,
          city: fields.city, state: fields.state, zip: fields.zip,
        }),
      })
      const data = await res.json()
      if (!res.ok) { onError(data.error ?? 'Something went wrong.'); return }
      onSuccess()
    } catch {
      onError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className={SECTION}>Account Owner</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First Name" id="b-firstname" required value={fields.firstname} onChange={set('firstname')} autoComplete="given-name" />
        <Field label="Last Name" id="b-lastname" required value={fields.lastname} onChange={set('lastname')} autoComplete="family-name" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Password" id="b-password" type="password" required minLength={6} value={fields.password} onChange={set('password')} autoComplete="new-password" />
        <Field label="Confirm Password" id="b-confirm" type="password" required value={fields.confirm} onChange={set('confirm')} autoComplete="new-password" />
      </div>

      <p className={SECTION}>Business Info</p>
      <Field label="Business Name" id="b-name" required value={fields.name} onChange={set('name')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Business Email" id="b-email" type="email" required value={fields.email} onChange={set('email')} autoComplete="email" />
        <Field label="Business Phone" id="b-phone" type="tel" required value={fields.phone} onChange={set('phone')} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="b-desc" className={LABEL}>Description</label>
        <textarea
          id="b-desc"
          rows={3}
          required
          value={fields.description}
          onChange={set('description')}
          className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-input outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary resize-none"
        />
      </div>
      <Field label="Street Address" id="b-address" required value={fields.address} onChange={set('address')} autoComplete="street-address" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="col-span-2 sm:col-span-1">
          <Field label="City" id="b-city" required value={fields.city} onChange={set('city')} autoComplete="address-level2" />
        </div>
        <Field label="State" id="b-state" required value={fields.state} onChange={set('state')} autoComplete="address-level1" />
        <Field label="Zip" id="b-zip" required value={fields.zip} onChange={set('zip')} autoComplete="postal-code" />
      </div>

      <button type="submit" disabled={loading} className="mt-2 w-full cursor-pointer rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60">
        {loading ? 'Creating account…' : 'Create Business Account'}
      </button>
    </form>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('user')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSuccess() {
    router.push('/login?registered=true')
  }

  return (
    <main className="min-h-screen bg-surface px-5 pb-16 pt-24">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 block text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-dark">Create your account</h1>
        <p className="mb-6 text-sm text-subtle">Join the Check Local First community.</p>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => { setTab('user'); setError('') }}
            className={tab === 'user'
              ? 'cursor-pointer rounded-full border-[1.5px] border-primary bg-primary px-4 py-1.75 text-sm font-semibold text-white transition-colors'
              : 'cursor-pointer rounded-full border-[1.5px] border-black/20 bg-transparent px-4 py-1.75 text-sm text-body transition-colors hover:border-primary/60 hover:text-primary'
            }
          >
            Personal Account
          </button>
          <button
            onClick={() => { setTab('business'); setError('') }}
            className={tab === 'business'
              ? 'cursor-pointer rounded-full border-[1.5px] border-primary bg-primary px-4 py-1.75 text-sm font-semibold text-white transition-colors'
              : 'cursor-pointer rounded-full border-[1.5px] border-black/20 bg-transparent px-4 py-1.75 text-sm text-body transition-colors hover:border-primary/60 hover:text-primary'
            }
          >
            Business Account
          </button>
        </div>

        {tab === 'user'
          ? <UserForm onSuccess={handleSuccess} onError={setError} loading={loading} setLoading={setLoading} />
          : <BusinessForm onSuccess={handleSuccess} onError={setError} loading={loading} setLoading={setLoading} />
        }

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <p className="mt-6 text-center text-sm text-subtle">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">Log in →</Link>
        </p>
      </div>
    </main>
  )
}
