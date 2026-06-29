import type { Metadata } from 'next';
import AdminShell from '@/components/dashboard/AdminShell';

export const metadata: Metadata = {
  title: 'Admin | Check Local First',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminShell />;
}
