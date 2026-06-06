import Link from "next/link";
import { Heart } from "lucide-react";

export function WishlistEmptyState() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-24">
      <Heart
        className="mb-8 text-[#5c5346]"
        size={72}
        strokeWidth={1}
        aria-hidden
      />
      <h2 className="font-playfair text-2xl font-bold uppercase tracking-[0.1em] text-[#1A1A1A] md:text-3xl md:tracking-[0.12em]">
        Your wishlist is empty
      </h2>
      <p className="mt-4 max-w-md font-playfair text-sm leading-relaxed text-[#4A4A4A] md:text-base">
        We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!
      </p>
      <Link
        href="/products"
        className="mt-10 inline-flex bg-[#F2E1C8] px-12 py-3.5 font-playfair text-base font-bold text-[#1A1A1A] transition-colors hover:bg-[#e8d4b0] md:text-lg"
      >
        Return To Shop
      </Link>
    </section>
  );
}
