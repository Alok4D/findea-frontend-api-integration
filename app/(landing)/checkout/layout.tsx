import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout | Findea",
  description: "Complete your order — contact, delivery, and payment.",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
