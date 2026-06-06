import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { WishlistEmptyState } from "./_components/WishlistEmptyState";
import { WishlistHero } from "./_components/WishlistHero";
import { WishlistTableClient } from "./_components/WishlistTableClient";
import NewsletterSection from "../_components/NewsletterSection";

export default function WishlistPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <LandingTopAnnouncementBar />
      <Navbar />
      <WishlistHero />
      {/* <WishlistEmptyState /> */}
      <WishlistTableClient />
      <NewsletterSection />

      <Footer />
    </main>
  );
}
