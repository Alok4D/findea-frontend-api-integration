import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact | Findea",
  description: "Contact Findéa — boutique marketplace Abidjan.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
