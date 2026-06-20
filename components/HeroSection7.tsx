import Link from 'next/link';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/constants';
import { findPhoto } from '@/lib/server-utils';
import type { Business } from '@/lib/types';
import HeroSection7Search from '@/components/HeroSection7Search';

export default async function HeroSection7() {
  let businesses: Business[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}businesses`, { next: { revalidate: 3600 } });
    if (res.ok) businesses = await res.json();
  } catch { /* render without businesses if API is unreachable */ }

  const photoMap: Record<string, string> = {};
  for (const biz of businesses) {
    const photo = findPhoto(biz.slug);
    if (photo) photoMap[biz.slug] = photo;
  }

  const withPhoto = businesses.filter(b => photoMap[b.slug]);
  const withoutPhoto = businesses.filter(b => !photoMap[b.slug]);
  const featured = [...withPhoto, ...withoutPhoto].slice(0, 3);

  return (
    <section className="flex h-screen flex-col overflow-hidden pt-17">

      {/* ── TOP 60% – image with title, search, description ── */}
      <div
        className="relative flex flex-[6] items-center justify-center bg-cover bg-center px-5"
        style={{ backgroundImage: "url('/imgs/nestbackground.jpg')" }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,10,5,0.3)_0%,rgba(15,10,5,0.65)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-2xl text-center">
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            Support your Neighbors
          </h1>

          <div className="mt-6">
            <HeroSection7Search />
          </div>

          <p className="mt-4 text-sm text-white/80">
            Every dollar spent local stays local — discover Reno&apos;s best.
          </p>
        </div>
      </div>

      {/* ── BOTTOM 40% – featured businesses ── */}
      <div className="flex flex-[4] flex-col overflow-hidden bg-white px-5 pb-4 pt-5">
        <h2 className="shrink-0 text-lg font-bold tracking-tight text-dark">
          Featured Businesses
        </h2>

        {featured.length > 0 ? (
          <div className="mt-3 grid flex-1 grid-cols-2 sm:grid-cols-3 gap-4 overflow-hidden">
            {featured.map(biz => (
              <Link key={biz.id} href={`/businesses/${biz.slug}`} className="group block min-h-0">
                <div className="relative h-[calc(100%-2rem)] w-full overflow-hidden rounded-xl bg-[#f0ede8]">
                  {photoMap[biz.slug] && (
                    <Image
                      src={photoMap[biz.slug]}
                      alt={biz.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="33vw"
                    />
                  )}
                </div>
                <p className="mt-1.5 truncate text-sm font-semibold text-dark">{biz.name}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">No businesses found.</p>
        )}
      </div>

    </section>
  );
}
