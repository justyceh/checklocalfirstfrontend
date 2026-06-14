'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, clearAuth, getAuthHeaders } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Businesses', href: '/businesses' },
  { label: 'Search', href: '/search' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(Boolean(getAuth()));
  }, [pathname]);

  async function handleLogout() {
    try {
      await fetch(`${API_BASE_URL}auth/logout`, { method: 'POST', headers: getAuthHeaders() });
    } finally {
      clearAuth();
      setIsLoggedIn(false);
      setOpen(false);
      router.push('/');
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between border-b border-black/10 bg-white px-5 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/imgs/clf.png"
            alt="Check Local First"
            height={44}
            width={150}
            style={{ width: 'auto', height: '44px' }}
            priority
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="relative font-medium text-black transition-colors hover:text-black/60 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#3a6e3f] after:content-[''] after:transition-[width] after:duration-300 after:ease-out hover:after:w-full">
                {label}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/dashboard" className="relative font-medium text-black transition-colors hover:text-black/60 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#3a6e3f] after:content-[''] after:transition-[width] after:duration-300 after:ease-out hover:after:w-full">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium text-[#555] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="rounded-lg bg-[#3a6e3f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2a4d2f] transition-colors"
              >
                Log In
              </Link>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button
          className="cursor-pointer p-2 text-black md:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-black/10 bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-2 text-lg font-medium text-black transition-colors hover:text-black/60"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="block py-2 text-lg font-medium text-black hover:text-black/60"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full py-2 text-left text-lg font-medium text-black hover:text-black/60"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block py-2 text-lg font-medium text-black hover:text-black/60"
                  onClick={() => setOpen(false)}
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
