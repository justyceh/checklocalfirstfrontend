import Link from 'next/link';

// ─── Editable content ────────────────────────────────────────────────────────

const CONTENT = {
  heading: 'Your Business Belongs Here.',
  subtext: 'List your Reno business for free and get discovered by locals who are actively looking to support you.',
  buttonLabel: 'List Your Business',
  buttonHref: '/signup',
};

// ─────────────────────────────────────────────────────────────────────────────

export default function BusinessCta() {
  return (
    <section className="bg-[#1a1a1a] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {CONTENT.heading}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          {CONTENT.subtext}
        </p>
        <div className="mt-10">
          <Link
            href={CONTENT.buttonHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-white/90"
          >
            {CONTENT.buttonLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
