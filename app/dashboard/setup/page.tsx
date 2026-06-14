import type { Metadata } from 'next';
import SetupShell from '@/components/dashboard/SetupShell'

export const metadata: Metadata = {
  title: 'Business Setup | Check Local First',
  description: 'Set up your business listing on Check Local First to get discovered by local customers in Reno, NV.',
  alternates: { canonical: '/dashboard/setup' },
  robots: { index: false, follow: false },
};

export default function SetupPage() {
  return <SetupShell />
}
