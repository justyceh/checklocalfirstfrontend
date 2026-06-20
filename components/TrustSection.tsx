import type { ReactNode } from 'react';

// ─── Editable content ────────────────────────────────────────────────────────

const CONTENT = {
  heading: 'Every Dollar Counts.',
  subtext: 'Shopping local keeps money, jobs, and character inside the community you call home.',
};

const CARDS = [
  {
    icon: 'home',
    title: 'Money Stays Here.',
    body: 'When you shop local, more of every dollar stays in Reno and recirculates through the community.',
  },
  {
    icon: 'person',
    title: 'Real People. Real Care.',
    body: 'Every local business is run by a Reno neighbor who genuinely cares about their craft and community.',
  },
  {
    icon: 'sparkle',
    title: "Find What Chains Can't Offer.",
    body: "Local businesses carry unique products and services you won't find on Amazon or at the mall.",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({ name }: { name: string }): ReactNode {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...props}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'person':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...props}>
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function TrustSection() {
  return (
    <section className="bg-[#f7f7f5] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
            {CONTENT.heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#666]">
            {CONTENT.subtext}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CARDS.map(card => (
            <div key={card.title} className="rounded-2xl border border-black/6 bg-white p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3a6e3f]/10 text-[#3a6e3f]">
                <Icon name={card.icon} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-[#1a1a1a]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#666]">{card.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
