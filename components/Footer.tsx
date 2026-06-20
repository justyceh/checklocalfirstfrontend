import Link from 'next/link';

const INSTAGRAM_URL = '';
const TIKTOK_URL = '';

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
  { label: 'About', href: '/about' },
];

const BUSINESS_LINKS = [
  { label: 'Add Your Business', href: '/signup' },
  { label: 'Business Login', href: '/login' },
  { label: 'Dashboard', href: '/dashboard' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/70">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 — Brand */}
          <div>
            <p className="mb-2 text-xl font-bold tracking-tight text-white font-[family-name:var(--font-playfair)]">
              CheckLocalFirst
            </p>
            <p className="text-sm leading-relaxed">Supporting real Reno businesses</p>

            {(INSTAGRAM_URL || TIKTOK_URL) && (
              <div className="mt-4 flex items-center gap-3">
                {INSTAGRAM_URL && (
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                )}
                {TIKTOK_URL && (
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2 — Explore */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — For Businesses */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">For Businesses</p>
            <ul className="flex flex-col gap-2.5">
              {BUSINESS_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Other</p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          &copy; {year} Check Local First. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
