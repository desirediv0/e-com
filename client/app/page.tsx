"use client";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DealSection from "./DealSection";
import FeaturedProductsSection from "./FeaturedProductsSection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import NewsletterSection from "./NewsletterSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Deal For You Section */}
      <DealSection />

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
