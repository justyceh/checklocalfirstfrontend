'use client'
import { useState, useEffect, useRef } from 'react';
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

function AccountIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLLIElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth();
    setIsLoggedIn(Boolean(auth));
    setAccountType(auth?.accountType ?? null);
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (
        !desktopDropdownRef.current?.contains(target) &&
        !mobileDropdownRef.current?.contains(target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  async function handleLogout() {
    try {
      await fetch(`${API_BASE_URL}auth/logout`, { method: 'POST', headers: getAuthHeaders() });
    } finally {
      clearAuth();
      setIsLoggedIn(false);
      setAccountType(null);
      setDropdownOpen(false);
      setOpen(false);
      router.push('/');
    }
  }

  const accountDropdown = (
    <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-black/10 bg-white shadow-lg py-1 z-50">
      <Link
        href="/dashboard"
        className="block px-4 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-black/5 transition-colors"
        onClick={() => setDropdownOpen(false)}
      >
        My Account
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-black/5 transition-colors cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between border-b border-black/10 bg-white px-5 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/imgs/clf.png"
            alt="Check Local First"
            height={44}
            width={150}
            className="h-11 w-auto"
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
            <li className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="Account menu"
                aria-expanded={dropdownOpen}
                className="flex items-center text-black hover:text-black/60 transition-colors cursor-pointer"
              >
                <AccountIcon />
              </button>
              {dropdownOpen && accountDropdown}
            </li>
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

        {/* Mobile right side: account icon + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          {isLoggedIn && (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="Account menu"
                aria-expanded={dropdownOpen}
                className="p-2 text-black hover:text-black/60 transition-colors cursor-pointer"
              >
                <AccountIcon />
              </button>
              {dropdownOpen && accountDropdown}
            </div>
          )}
          <button
            className="cursor-pointer p-2 text-black"
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
        </div>
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
            {!isLoggedIn && (
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
