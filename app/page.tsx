import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeInParagraphs from '@/components/FadeInParagraphs';

export const metadata: Metadata = {
  title: 'Check Local First – Coming Soon',
  description: 'Check Local First is a community-first local business directory for Reno, Nevada — launching soon.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/thenestvideo2.mp4"
      />
      <div className="absolute inset-0 bg-black/65" />

      <a
        href="https://www.instagram.com/checklocalfirstreno/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="absolute bottom-6 right-6 z-10 cursor-pointer text-white transition-colors hover:text-white/70"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      </a>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
        <Image
          src="/icons/nestlogo2.svg"
          alt="Check Local First"
          width={240}
          height={240}
          priority
          className="mx-auto mb-6 h-auto w-28 sm:w-36"
        />
        <FadeInParagraphs />

        <Link
          href="/waitlist"
          className="group relative mt-6 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/80 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <span className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <span className="relative z-10">Learn More</span>
        </Link>
      </div>
    </div>
  );
}
