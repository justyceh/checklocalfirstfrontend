'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_BASE_URL } from '@/lib/constants'
import { saveAuth } from '@/lib/auth'

const INPUT = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-input outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary'
const LABEL = 'mb-1 block text-sm font-medium text-label'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [justRegistered, setJustRegistered] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setJustRegistered(params.get('registered') === 'true')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Invalid email or password.'); return }
      saveAuth({
        access_token: data.access_token,
        user_id: data.user_id,
        email: data.email,
        accountType: data.accountType,
      })
      if (data.accountType !== 'business') {
        router.push('/')
      } else {
        const allBizRes = await fetch(`${API_BASE_URL}businesses`)
        const allBiz = allBizRes.ok ? await allBizRes.json() : []
        const biz = allBiz.find((b: { owner_user_id?: string }) => b.owner_user_id === data.user_id)
        if (biz) {
          const svcRes = await fetch(`${API_BASE_URL}businesses/${biz.slug}/services`)
          const svcBody = svcRes.ok ? await svcRes.json() : { data: [] }
          const hasServices = (svcBody.data ?? []).length > 0
          router.push(hasServices ? '/dashboard' : '/dashboard/setup')
        } else {
          router.push('/dashboard')
        }
      }
    } catch {
      setError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-surface px-5 pb-16 pt-24">
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 block text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>

        {justRegistered && (
          <div className="mb-5 rounded-lg border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-primary-dark">
            Account created! Please confirm your email then log in.
          </div>
        )}

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-dark">Welcome back</h1>
        <p className="mb-6 text-sm text-subtle">Log in to your Check Local First account.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className={LABEL}>Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="password" className={LABEL}>Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={INPUT}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full cursor-pointer rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-subtle">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">Sign up →</Link>
        </p>
      </div>
    </main>
  )
}
