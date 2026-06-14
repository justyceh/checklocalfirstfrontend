import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Check Local First',
  description: 'Create your Check Local First account. Join the Reno community as a local shopper or register your business to get discovered.',
  alternates: { canonical: '/signup' },
  openGraph: {
    title: 'Sign Up | Check Local First',
    description: 'Create your Check Local First account. Join the Reno community as a local shopper or register your business to get discovered.',
    type: 'website',
    url: '/signup',
  },
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
