import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wishlist | Findea",
  description: "Your saved products on Findéa.",
};

export default function WishlistLayout({ children }: { children: ReactNode }) {
  return children;
}
