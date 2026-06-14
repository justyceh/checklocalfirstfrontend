import Image from 'next/image';

// ─── Editable content ────────────────────────────────────────────────────────

const CONTENT = {
  heading: 'Check local first is growing',
  image: {
    src: '/imgs/farmers1.jpg',
    alt: 'Local Reno community',
  },
};

const STATS = [
  { value: '3+',  label: 'Local businesses listed' },
  { value: '100%', label: 'Reno-born and owned' },
  { value: '1',    label: 'Community, supporting each other' },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function StatSection() {
  return (
    <section className="bg-white px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left — heading + stats */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
              {CONTENT.heading}
            </h2>
            <div className="mt-10 flex flex-col divide-y divide-black/8">
              {STATS.map(stat => (
                <div key={stat.label} className="flex items-baseline gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="text-4xl font-bold tracking-tight text-[#3a6e3f]">{stat.value}</span>
                  <span className="text-base text-[#555]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src={CONTENT.image.src}
              alt={CONTENT.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
