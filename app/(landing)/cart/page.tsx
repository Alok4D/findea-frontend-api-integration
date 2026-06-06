import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";

export default function CartEmptyPage() {
  return (
    <CheckoutFlowShell activeStep={1}>
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 md:py-28">
        <ShoppingCart
          className="mb-10 text-[#2C2724]"
          size={84}
          strokeWidth={1}
          aria-hidden
        />
        <h1 className="max-w-2xl text-center font-playfair text-2xl font-bold uppercase leading-snug tracking-[0.12em] text-[#1A1A1A] md:text-[2.35rem] md:leading-tight md:tracking-[0.14em]">
          Your shopping cart is empty
        </h1>
        <p className="mt-8 max-w-lg text-center font-playfair text-sm leading-relaxed text-[#4A4A4A] md:text-base">
          We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!
        </p>
        <Link
          href="/products"
          className="mt-12 inline-flex bg-[#F2E1C8] px-14 py-4 font-playfair text-base font-semibold tracking-wide text-[#1A1A1A] transition-colors hover:bg-[#e8d4b0] md:text-lg"
        >
          Return To Shop
        </Link>
      </section>
    </CheckoutFlowShell>
  );
}
