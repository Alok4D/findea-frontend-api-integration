import LandingTopAnnouncementBar from "../../_components/LandingTopAnnouncementBar";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";
import { WishlistHero } from "../_components/WishlistHero";
import { WishlistTableClient } from "../_components/WishlistTableClient";

export default function WishlistItemsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F9F8F4]">
      <LandingTopAnnouncementBar />
      <Navbar />
      <WishlistHero />
      <WishlistTableClient />
      <Footer />
    </main>
  );
}
