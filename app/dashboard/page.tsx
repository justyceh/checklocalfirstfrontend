import type { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/DashboardShell';

export const metadata: Metadata = {
  title: 'Dashboard | Check Local First',
  description: 'Manage your Check Local First account, business listing, and services.',
  alternates: { canonical: '/dashboard' },
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardShell />;
}
