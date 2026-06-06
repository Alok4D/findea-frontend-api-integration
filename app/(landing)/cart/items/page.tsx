import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import { CartItemsClient } from "../_components/CartItemsClient";
import NewsletterSection from "../../_components/NewsletterSection";

export default function CartItemsPage() {
  return (
    <CheckoutFlowShell activeStep={1}>
      <CartItemsClient />
      <NewsletterSection />
    </CheckoutFlowShell>
  );
}
