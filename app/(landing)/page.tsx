import Blog from "./_components/Blog";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import InstagramFeed from "./_components/InstagramFeed";
import ExploreProduct from "./_components/ExploreProduct";
import ServicesSection from "./_components/ServicesSection";
import RegistrySection from "./_components/RegistrySection";
import GiftCardSection from "./_components/GiftCardSection";
import NewsletterSection from "./_components/NewsletterSection";
import BlogFeaturedSection from "./_components/BlogFeaturedSection";
import ChristmasCollection from "./_components/ChristmasCollection";
import ProductGridLanding from "./_components/ProductGridLanding";
import TestimonialSection from "./_components/TestimonialSection";
import LandingTopAnnouncementBar from "./_components/LandingTopAnnouncementBar";

export default function page() {
  return (
    <main className="min-h-screen bg-background">
      <LandingTopAnnouncementBar />
      <Navbar />
      <HeroSection />
      <Blog />
      <ProductGridLanding />
      <ServicesSection />
      <GiftCardSection />
      {/* <AboutSection /> */}
      <RegistrySection />
      <InstagramFeed />
      <NewsletterSection />
      {/* <ExploreProduct />
      <ChristmasCollection />
      <TestimonialSection />
      <BlogFeaturedSection /> */}
      <Footer />
    </main>
  );
}