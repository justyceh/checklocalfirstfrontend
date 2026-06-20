import type { Metadata } from 'next';
import HeroSection8 from '@/components/HeroSection8';
import TrustSection from '@/components/TrustSection';
import FeaturedSection from '@/components/FeaturedSection';
import StatSection from '@/components/StatSection';
import FadeIn from '@/components/FadeIn';
import BusinessCta from '@/components/BusinessCta';

export const metadata: Metadata = {
  title: 'Check Local First – Shop Local in Reno, NV',
  description: 'Discover and support local businesses in Reno, Nevada. Check Local First connects you with unique local shops, services, and people who keep money in the community.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Check Local First – Shop Local in Reno, NV',
    description: 'Discover and support local businesses in Reno, Nevada. Check Local First connects you with unique local shops, services, and people who keep money in the community.',
    type: 'website',
    url: '/',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://checklocalfirst.com/#organization',
        name: 'Check Local First',
        url: 'https://checklocalfirst.com',
        logo: 'https://checklocalfirst.com/imgs/clf.png',
        description: 'A community-first local business directory for Reno, Nevada.',
        areaServed: { '@type': 'City', name: 'Reno', containedInPlace: { '@type': 'State', name: 'Nevada' } },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://checklocalfirst.com/#website',
        url: 'https://checklocalfirst.com',
        name: 'Check Local First',
        publisher: { '@id': 'https://checklocalfirst.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: 'https://checklocalfirst.com/search?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection8 />
      <FadeIn>
      <FeaturedSection/>
      </FadeIn>
      <FadeIn>
      <TrustSection/>
      </FadeIn>
      <FadeIn>
      <StatSection />
      </FadeIn>
      <BusinessCta />
    </>
  );
}
