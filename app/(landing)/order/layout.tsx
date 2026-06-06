import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order Status | Findea",
  description: "Track your order and view confirmation details.",
};

export default function OrderLayout({ children }: { children: ReactNode }) {
  return children;
}
