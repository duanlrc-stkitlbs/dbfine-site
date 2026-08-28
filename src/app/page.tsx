import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { QuickComplianceSearch } from '@/components/home/QuickComplianceSearch';
import { SaAdvantageGrid } from '@/components/home/SaAdvantageGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AeoFaqAccordion } from '@/components/home/AeoFaqAccordion';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <QuickComplianceSearch />
      <SaAdvantageGrid />
      <FeaturedProducts />
      <AeoFaqAccordion />
    </div>
  );
}
