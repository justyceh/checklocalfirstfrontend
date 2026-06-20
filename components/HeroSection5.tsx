import { API_BASE_URL } from '@/lib/constants';
import { findPhoto } from '@/lib/server-utils';
import type { Business } from '@/lib/types';
import BusinessCard from '@/components/BusinessCard';
import HeroSection5Search from '@/components/HeroSection5Search';

export default async function HeroSection5() {
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
  const featured = [...withPhoto, ...withoutPhoto].slice(0, 2);

  return (
    <section className="bg-white pt-17 pb-6 px-5">
      <div className="mx-auto max-w-3xl">

        <div className="pt-4">
          <HeroSection5Search />
        </div>

        {featured.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-[#1a1a1a]">
              Check Local First
            </h2>

            <div className="mt-3 grid grid-cols-2 gap-6">
              {featured.map(business => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  photoSrc={photoMap[business.slug]}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
