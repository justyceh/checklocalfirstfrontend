'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, type AuthState } from '@/lib/auth';
import UserDashboard from './UserDashboard';
import BusinessDashboard from './BusinessDashboard';

export default function DashboardShell() {
  const [auth, setAuth] = useState<AuthState | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const a = getAuth();
    if (!a) {
      router.replace('/login');
      return;
    }
    setAuth(a);
  }, [router]);

  if (auth === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3a6e3f] border-t-transparent" />
      </div>
    );
  }

  if (!auth) return null;

  if (auth.accountType === 'business') {
    return <BusinessDashboard auth={auth} />;
  }
  return <UserDashboard auth={auth} />;
}
