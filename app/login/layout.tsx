import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In | Check Local First',
  description: 'Log in to your Check Local First account to manage your Reno local business listing or discover and support local shops.',
  alternates: { canonical: '/login' },
  openGraph: {
    title: 'Log In | Check Local First',
    description: 'Log in to your Check Local First account to manage your Reno local business listing or discover and support local shops.',
    type: 'website',
    url: '/login',
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
