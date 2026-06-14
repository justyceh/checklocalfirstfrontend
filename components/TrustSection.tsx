import Image from 'next/image';
import Link from 'next/link';

const CONTENT = {
  heading: 'Who are we?',
  description:
    'We are a group of local business owners who truly believe in community. We built check local first to encourage people from reno -- to check local first! Of course that means no big box brands, or amazon warehouses are allowed. From vintage finds, to eco friendly cleaning we have all of the reno born businesses apart of our community!',
  buttonLabel: 'Browse Local Businesses',
  buttonHref: '/businesses',
  image: {
    src: '/imgs/businessowners.jpg',
    alt: 'Local Reno business owner',
  },
};

export default function TrustSection() {
  return (
    <section className="bg-[#f7f7f5] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Image */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src={CONTENT.image.src}
              alt={CONTENT.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
              {CONTENT.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-[#555]">
              {CONTENT.description}
            </p>
            <Link
              href={CONTENT.buttonHref}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#3a6e3f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a4d2f]"
            >
              {CONTENT.buttonLabel}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
