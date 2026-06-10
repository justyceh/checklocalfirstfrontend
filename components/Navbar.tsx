'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-medium text-black transition-colors hover:text-black/60"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

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
          </ul>
        </div>
      )}
    </header>
  );
}
