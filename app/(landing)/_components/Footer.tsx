import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

// Custom X (Twitter) icon component to match the branding better
const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const Footer: FC = () => {
  return (
    <footer className="w-full bg-[#F5F3EE] pt-20 font-playfair">
      <div className="max-w-[1239px] mx-auto px-4 sm:px-6 md:px-12 lg:px-5 xl:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-20 text-[#1A1A1A]">
        {/* Column 1: Logo & About */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Image
              src="/footer-logo/1000008546-removebg-preview 1.svg"
              alt="Findea Logo"
              width={180}
              height={60}
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-[15px] leading-relaxed max-w-xs text-[#4A4A4A] justify-evenly">
            Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus enim.
            Sed eget blandit lectus. Donec facilisis ornare turpis id pretium.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-6 mt-2">
            <Facebook
              size={22}
              strokeWidth={1.5}
              className="cursor-pointer hover:opacity-50 transition-all"
            />
            <Instagram
              size={22}
              strokeWidth={1.5}
              className="cursor-pointer hover:opacity-50 transition-all"
            />
            <span className="cursor-pointer hover:opacity-50 transition-all">
              <XIcon />
            </span>
            <Youtube
              size={22}
              strokeWidth={1.5}
              className="cursor-pointer hover:opacity-50 transition-all"
            />
          </div>
        </div>

        {/* Column 2: Company Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold uppercase tracking-[0.2em] mb-2 leading-none">
            Company
          </h3>
          <ul className="flex flex-col gap-4 text-[15px] text-[#4A4A4A]">
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              About
            </li>
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Return & Refund Policy
            </li>
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Terms & Conditions
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[15px] text-[#4A4A4A] transition-colors hover:text-[#1A1A1A]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold uppercase tracking-[0.2em] mb-2 leading-none">
            Services
          </h3>
          <ul className="flex flex-col gap-4 text-[15px] text-[#4A4A4A]">
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Baby Registry
            </li>
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Wedding List
            </li>
            <li className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Offer A Service
            </li>
          </ul>
        </div>

        {/* Column 4: Contacts */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold uppercase tracking-[0.2em] mb-2 leading-none">
            Contacts
          </h3>
          <div className="flex flex-col gap-8 text-[15px] text-[#4A4A4A]">
            <div>
              <p className="font-bold text-[#1A1A1A] mb-2">Email:</p>
              <p>test@test.com</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A] mb-2">Phone</p>
              <p>0 000 000 000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-brand-greige py-6 text-center border-t border-gray-200/50 font-playfair">
        <p className="text-[16px] text-brand-text-secondary font-medium">
          Copyright © 2026 Findea. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
