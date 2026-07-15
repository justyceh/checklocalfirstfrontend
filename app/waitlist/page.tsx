import type { Metadata } from 'next';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';

export const metadata: Metadata = {
  title: 'Join the Waitlist – Check Local First',
  description: 'Sign up to be one of the first to know when Check Local First launches in Reno, Nevada.',
  alternates: { canonical: '/waitlist' },
};

export default function WaitlistPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/thenestvideo2.mp4"
      />
      <div className="absolute inset-0 bg-black/65" />

      <Link
        href="/"
        className="absolute top-6 left-6 z-20 cursor-pointer text-sm font-medium text-white/80 transition-colors hover:text-white"
      >
        ← Back
      </Link>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-24 md:flex-row md:items-stretch md:justify-center md:gap-8">
        <div className="w-full max-w-md">
          <WaitlistForm />
        </div>

        <div className="flex w-full max-w-sm items-center rounded-2xl border border-white/25 bg-white/10 p-6 text-center text-white backdrop-blur-md [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] md:text-left">
          <p className="text-base leading-relaxed sm:text-lg">
            The first 100 people to sign up get a free month of Premium access when we launch. This includes exclusive discounts to your favorite Reno businesses.
          </p>
        </div>
      </div>
    </div>
  );
}
