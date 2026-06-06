import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import { CheckoutPageClient } from "./_components/CheckoutPageClient";
import NewsletterSection from "../_components/NewsletterSection";

export default function CheckoutPage() {
  return (
    <CheckoutFlowShell activeStep={2}>
      <CheckoutPageClient />
      <NewsletterSection />
    </CheckoutFlowShell>
  );
}
