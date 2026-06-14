const AUTH_KEY = 'clf_auth'

export type AuthState = {
  access_token: string
  user_id: string
  email: string
  accountType: string
}

export function saveAuth(auth: AuthState): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

export function getAuth(): AuthState | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(AUTH_KEY)
  return raw ? (JSON.parse(raw) as AuthState) : null
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY)
}

export function getAuthHeaders(): Record<string, string> {
  const auth = getAuth()
  return auth ? { Authorization: `Bearer ${auth.access_token}` } : {}
}
