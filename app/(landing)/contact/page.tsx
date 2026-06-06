import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import NewsletterSection from "../_components/NewsletterSection";
import { ContactBreadcrumbHeader } from "./_components/ContactBreadcrumbHeader";
import { ContactFormPanel } from "./_components/ContactFormPanel";
import { ContactInfoAside } from "./_components/ContactInfoAside";

/**
 * Contact — desktop & mobile reference (Figma boutique file, node 703-1617).
 * @see https://www.figma.com/design/fEbkB84YhYw3MuYO1Xnovh/E-commerce-web-app-for-boutique-Abidjan?node-id=703-1617
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen ">
      <LandingTopAnnouncementBar />
      <Navbar />
      <ContactBreadcrumbHeader />
      <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-12 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <ContactFormPanel />
          <ContactInfoAside />
        </div>
      </section>
      <NewsletterSection />
      <Footer />
    </main>
  );
}
