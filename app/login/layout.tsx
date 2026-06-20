import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In | Check Local First',
  description: 'Log in to your Check Local First account to manage your Reno local business listing or discover and support local shops.',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
