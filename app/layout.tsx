import type { Metadata } from "next";
import { Manrope, Playfair_Display, Dancing_Script } from "next/font/google";
import StoreProvider from "@/lib/redux/provider";
import AuthHydrator from "@/lib/redux/AuthHydrator";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Findea - E-commerce Web App",
  description: "A premium e-commerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable} ${dancingScript.variable} h-full antialiased`}>
      <body className={`${manrope.variable} min-h-full flex flex-col`}>
        <StoreProvider>
          <AuthHydrator />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}



