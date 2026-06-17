import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import InstructionsSection from '@/components/InstructionsSection';
import FeaturedSection from '@/components/FeaturedSection';
import StatSection from '@/components/StatSection';
import FadeIn from '@/components/FadeIn';
import HeroSection2 from '@/components/HeroSection2';

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
  return (
    <>
      <HeroSection />
      <FadeIn>
      <TrustSection />
      </FadeIn>
      <FadeIn>
      <InstructionsSection />
      </FadeIn>
      <FadeIn>
      <FeaturedSection />
      </FadeIn>
      <FadeIn>
      <StatSection />
      </FadeIn>
    </>
  );
}
