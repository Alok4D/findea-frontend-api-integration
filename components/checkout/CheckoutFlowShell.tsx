import type { ReactNode } from "react";
import LandingTopAnnouncementBar from "@/app/(landing)/_components/LandingTopAnnouncementBar";
import Navbar from "@/app/(landing)/_components/Navbar";
import Footer from "@/app/(landing)/_components/Footer";
import { CheckoutProgressBar } from "./CheckoutProgressBar";

export function CheckoutFlowShell({
  activeStep,
  children,
}: {
  activeStep: 1 | 2 | 3;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <LandingTopAnnouncementBar />
      <Navbar />
      <CheckoutProgressBar activeStep={activeStep} />
      {children}
      <Footer />
    </main>
  );
}
