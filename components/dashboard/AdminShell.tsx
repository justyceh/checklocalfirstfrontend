'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, type AuthState } from '@/lib/auth';
import AdminDashboard from './AdminDashboard';

export default function AdminShell() {
  const [auth, setAuth] = useState<AuthState | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const a = getAuth();
    if (!a) {
      router.replace('/login');
      return;
    }
    if (a.accountType !== 'admin') {
      router.replace('/dashboard');
      return;
    }
    setAuth(a);
  }, [router]);

  if (auth === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!auth) return null;

  return <AdminDashboard auth={auth} />;
}
