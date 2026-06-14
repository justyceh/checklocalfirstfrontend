import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/constants';
import type { Business, BusinessService } from '@/lib/types';
import { findPhoto } from '@/lib/server-utils';
import ServiceCard from '@/components/ServiceCard';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}businesses`);
    if (!res.ok) return [];
    const list: Business[] = await res.json();
    return list.map(b => ({ slug: b.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_BASE_URL}businesses/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const biz: Business = await res.json();
      const title = `${biz.name} | Check Local First`;
      const description = biz.description
        ? String(biz.description)
        : `Shop local at ${biz.name} in Reno, NV on Check Local First.`;
      return {
        title,
        description,
        alternates: { canonical: `/businesses/${slug}` },
        openGraph: { title, description, type: 'website', url: `/businesses/${slug}` },
      };
    }
  } catch {}
  return { title: 'Business | Check Local First' };
}

export default async function BusinessDetailPage({ params }: Props) {
  const { slug } = await params;

  const [bizRes, svcRes] = await Promise.all([
    fetch(`${API_BASE_URL}businesses/${slug}`, { cache: 'no-store' }),
    fetch(`${API_BASE_URL}businesses/${slug}/services`, { cache: 'no-store' }),
  ]);

  if (!bizRes.ok) notFound();

  const business: Business = await bizRes.json();
  const svcBody = svcRes.ok ? await svcRes.json() : { data: [] };
  const services: BusinessService[] = svcBody.data ?? [];

  const photoSrc = findPhoto(slug);
  const fullAddress = [business.address, business.city, business.state, business.zip]
    .filter(Boolean)
    .join(', ');
  const mapsUrl = fullAddress
    ? `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`
    : null;

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      {/* Hero */}
      <div className="pt-17.5">
        {photoSrc ? (
          <div className="relative w-full aspect-video max-h-130 overflow-hidden">
            <Image
              src={photoSrc}
              alt={`${business.name} – local business in Reno, NV`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-10 sm:pb-10">
              <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight drop-shadow">
                  {business.name}
                </h1>
                {(business.city || business.state) && (
                  <p className="mt-2 text-white/80 text-sm sm:text-base">
                    {[business.city, business.state].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1a3328] px-5 py-14 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                {business.name}
              </h1>
              {(business.city || business.state) && (
                <p className="mt-3 text-white/70 text-sm sm:text-base">
                  {[business.city, business.state].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-5 py-8 pb-16">
        {/* Back link */}
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1a1a1a] transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          All Businesses
        </Link>

        {/* CTAs */}
        {(business.phone || business.email) && (
          <div className="flex flex-col gap-3 sm:flex-row mb-10">
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3a6e3f] px-6 py-4 text-white font-semibold text-base hover:bg-[#2a4d2f] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                </svg>
                Call Now
              </a>
            )}
            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#3a6e3f] px-6 py-4 text-[#3a6e3f] font-semibold text-base hover:bg-[#3a6e3f]/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email Us
              </a>
            )}
          </div>
        )}

        {/* About */}
        <div className="mb-10">
          {business.description && (
            <>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-3">About</h2>
              <p className="text-[#444] leading-relaxed mb-5">{business.description}</p>
            </>
          )}

          {(mapsUrl || business.phone) && (
            <div className="flex flex-col gap-2 text-sm text-[#666]">
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#3a6e3f] hover:underline"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {fullAddress}
                </a>
              )}
              {business.phone && (
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                  </svg>
                  {business.phone}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Services */}
        <div>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#1a1a1a]">What We Offer</h2>
            <p className="mt-1 text-sm text-[#888]">
              {services.length === 0
                ? 'No services listed yet'
                : `${services.length} service${services.length === 1 ? '' : 's'} available`}
            </p>
          </div>

          {services.length === 0 ? (
            <div className="rounded-xl border border-black/10 bg-white p-10 text-center">
              <p className="text-[#555]">No services listed yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: business.name,
            ...(business.description ? { description: String(business.description) } : {}),
            ...(business.phone ? { telephone: String(business.phone) } : {}),
            ...(business.email ? { email: String(business.email) } : {}),
            ...(fullAddress ? {
              address: {
                '@type': 'PostalAddress',
                ...(business.address ? { streetAddress: String(business.address) } : {}),
                ...(business.city ? { addressLocality: String(business.city) } : {}),
                ...(business.state ? { addressRegion: String(business.state) } : {}),
                ...(business.zip ? { postalCode: String(business.zip) } : {}),
                addressCountry: 'US',
              },
            } : {}),
            url: `https://checklocalfirst.com/businesses/${business.slug}`,
          }),
        }}
      />
    </main>
  );
}
