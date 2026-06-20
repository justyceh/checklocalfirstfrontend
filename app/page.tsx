import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import InstructionsSection from '@/components/InstructionsSection';
import FeaturedSection from '@/components/FeaturedSection';
import StatSection from '@/components/StatSection';
import FadeIn from '@/components/FadeIn';
import HeroSection7 from '@/components/HeroSection7';
import HeroSection8 from '@/components/HeroSection8';
import HeroSection2 from '@/components/HeroSection2';
import HeroSection3 from '@/components/HeroSection3';
import HeroSection4 from '@/components/HeroSection4';
import HeroSection5 from '@/components/HeroSection5';
import HeroSection6 from '@/components/HeroSection6';

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
      <HeroSection8 />
      <FadeIn>
      <TrustSection />
      </FadeIn>
      <FadeIn>
      <FeaturedSection/>
      </FadeIn>
      <FadeIn>
      <InstructionsSection />
      </FadeIn>
      <FadeIn>
      <StatSection />
      </FadeIn>
    </>
  );
}
