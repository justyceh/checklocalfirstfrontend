import Link from 'next/link';
import type { ReactNode } from 'react';

// ─── Editable content ────────────────────────────────────────────────────────

const USER_STEPS = [
  {
    label: 'Step 1',
    title: 'Visit CheckLocalFirst',
    description: 'Head to checklocalfirst.com on any device — phone, tablet, or desktop.',
    icon: 'globe',
  },
  {
    label: 'Step 2',
    title: 'Search for anything',
    description: 'Search for any service, item, or product you need from a local Reno business.',
    icon: 'search',
  },
  {
    label: 'Step 3',
    title: 'Find local businesses',
    description: "Browse real Reno businesses that have exactly what you're looking for.",
    icon: 'pin',
  },
];

const BUSINESS_STEPS = [
  {
    label: 'Step 1',
    title: 'Sign your business up',
    description: 'Create a free business account and get your listing live in minutes.',
    icon: 'user-plus',
  },
  {
    label: 'Step 2',
    title: 'Add your services & goods',
    description: 'List your services, items, and products so locals can discover you.',
    icon: 'list',
  },
  {
    label: 'Step 3',
    title: 'Get new customers',
    description: 'Show up when locals search — and bring new customers through your door.',
    icon: 'customers',
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({ name }: { name: string }): ReactNode {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...props}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'user-plus':
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      );
    case 'list':
      return (
        <svg {...props}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case 'customers':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Down arrow connector ─────────────────────────────────────────────────────

function DownArrow() {
  return (
    <div className="my-5 text-[#3a6e3f]/40">
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none" aria-hidden="true">
        <line x1="8" y1="0" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polyline
          points="3,15 8,22 13,15"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Step node ────────────────────────────────────────────────────────────────

type Step = { label: string; title: string; description: string; icon: string };

function StepNode({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3a6e3f] text-white shadow-sm">
        <Icon name={step.icon} />
      </div>
      <div className="mt-4 max-w-[200px] text-center">
        <p className="text-sm font-semibold text-[#1a1a1a]">{step.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-[#666]">{step.description}</p>
      </div>
      {!isLast && <DownArrow />}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function InstructionsSection() {
  return (
    <section className="bg-white px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-14 text-center lg:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a]">How It Works</h2>
          <p className="mt-3 text-[#666]">
            Whether you&apos;re a local shopper or a Reno business, we make it simple.
          </p>
        </div>

        {/* Two columns — stacked on mobile, side by side on sm+ */}
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-8">

          {/* For Local Shoppers */}
          <div className="flex flex-col items-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#3a6e3f]">For Local Shoppers</p>
            <h3 className="mb-10 text-base font-bold text-[#1a1a1a]">Find what you need, locally</h3>
            <div className="flex flex-col items-center">
              {USER_STEPS.map((step, i) => (
                <StepNode key={step.label} step={step} isLast={i === USER_STEPS.length - 1} />
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-medium text-[#555] transition-colors hover:bg-black/5"
              >
                Start searching →
              </Link>
            </div>
          </div>

          {/* For Businesses */}
          <div className="flex flex-col items-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#3a6e3f]">For Businesses</p>
            <h3 className="mb-10 text-base font-bold text-[#1a1a1a]">Get your business in front of locals</h3>
            <div className="flex flex-col items-center">
              {BUSINESS_STEPS.map((step, i) => (
                <StepNode key={step.label} step={step} isLast={i === BUSINESS_STEPS.length - 1} />
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-[#3a6e3f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a4d2f]"
              >
                List your business →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
