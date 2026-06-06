import Image from "next/image";
import Link from "next/link";
import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import NewsletterSection from "../../_components/NewsletterSection";

const TRACK_STEPS = [
  { n: 1, title: "Order Confirmed", body: "Your order has been confirmed and we are preparing your items.", when: "Feb 1, 2024 · 9:12 AM" },
  { n: 2, title: "Processing", body: "Your order is being carefully packed at our boutique.", when: "Feb 1, 2024 · 2:40 PM" },
  { n: 3, title: "Shipped", body: "Your package has left our facility and is on the way.", when: "Feb 2, 2024 · 10:05 AM" },
  { n: 4, title: "Out For Delivery", body: "The carrier expects delivery today.", when: "Feb 5, 2024 · 8:00 AM" },
];

export default function OrderConfirmationPage() {
  return (
    <CheckoutFlowShell activeStep={3}>
      <div className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-10">
          {/* Main column */}
          <div className="order-2 space-y-6 lg:order-1">
            <section className="border border-[#4A3F36]/35 bg-[#dedad2] p-6 md:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                <div>
                  <h1 className="font-playfair text-3xl font-bold text-[#1A1A1A] md:text-4xl">Thank you!</h1>
                  <p className="mt-3 max-w-md font-playfair text-sm leading-relaxed text-[#4A4A4A] md:text-base">
                    Your order has been received and is being processed.
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Order Number</p>
                  <p className="mt-1 font-playfair text-lg font-bold tracking-wide text-[#1A1A1A]">ORD-2024-001234</p>
                </div>
              </div>
              <div className="mt-8 grid gap-6 border-t border-[#4A3F36]/20 pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Order Date</p>
                  <p className="mt-1 font-playfair text-sm font-semibold text-[#1A1A1A]">February 1, 2024</p>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Status</p>
                  <p className="mt-1 font-playfair text-sm font-semibold text-[#1A1A1A]">In Transit</p>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Est. Delivery</p>
                  <p className="mt-1 font-playfair text-sm font-semibold text-[#1A1A1A]">February 5, 2024</p>
                </div>
              </div>
            </section>

              <section className="border border-[#4A3F36]/35 bg-[#dedad2] p-6 md:p-8">
              <h2 className="font-playfair text-xl font-bold text-[#1A1A1A]">Shipment Tracking</h2>
              <div className="mt-8">
                {TRACK_STEPS.map((step, i) => (
                  <div key={step.n} className="flex gap-5">
                    <div className="flex w-9 shrink-0 flex-col items-center">
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4A3F36] font-sans text-xs font-semibold text-white">
                        {step.n}
                      </div>
                      {i < TRACK_STEPS.length - 1 ? (
                        <div className="mt-0.5 min-h-13 w-px flex-1 bg-[#4A3F36]/40" aria-hidden />
                      ) : null}
                    </div>
                    <div className={`min-w-0 flex-1 ${i < TRACK_STEPS.length - 1 ? "pb-10" : "pb-1"}`}>
                      <h3 className="font-playfair text-base font-semibold text-[#1A1A1A]">{step.title}</h3>
                      <p className="mt-1 max-w-prose font-sans text-sm leading-relaxed text-[#4A4A4A]">{step.body}</p>
                      <p className="mt-2 font-sans text-xs text-[#6B6560]">{step.when}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-[#4A3F36]/35 bg-[#dedad2] p-6 md:p-8">
              <h2 className="font-playfair text-xl font-bold text-[#1A1A1A]">Shipping Information</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Carrier</dt>
                  <dd className="mt-1 font-playfair text-sm font-semibold text-[#1A1A1A]">FedEx</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Tracking Number</dt>
                  <dd className="mt-1 font-playfair text-sm font-semibold text-[#1A1A1A]">794617382947</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Method</dt>
                  <dd className="mt-1 font-playfair text-sm font-semibold text-[#1A1A1A]">Standard Shipping</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-sans text-[11px] font-medium uppercase tracking-wide text-[#6B6560]">Delivery Address</dt>
                  <dd className="mt-1 font-playfair text-sm font-semibold leading-relaxed text-[#1A1A1A]">
                    123 Main Street, New York, NY 10016
                  </dd>
                </div>
              </dl>
            </section>
          </div>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <section className="border border-[#4A3F36]/35 bg-[#dedad2] p-6 md:p-8">
              <h2 className="border-b border-[#4A3F36]/20 pb-4 font-playfair text-lg font-bold uppercase tracking-[0.12em] text-[#1A1A1A]">
                Your Order
              </h2>
              <div className="mt-5 flex gap-4 border-b border-[#4A3F36]/15 pb-5">
                <div className="relative h-20 w-20 shrink-0 bg-[#E3DDD3]">
                  <Image
                    src="https://images.unsplash.com/photo-1597354984706-fac992d9306f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-playfair text-sm font-semibold text-[#1A1A1A]">Ant Studded Collar Shirt</p>
                  <p className="mt-1 font-sans text-[11px] text-[#6B6560]">1 × $864.00</p>
                  <p className="mt-2 font-sans text-xs text-[#4A4A4A]">Subtotal: $864.00</p>
                </div>
              </div>
              <dl className="mt-5 space-y-2 font-sans text-sm">
                <div className="flex justify-between gap-4">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">$864.00</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Shipping</dt>
                  <dd>Free Shipping</dd>
                </div>
                <div className="flex justify-between border-t border-[#4A3F36]/20 pt-4 font-playfair text-lg font-bold text-[#1A1A1A]">
                  <dt>Total</dt>
                  <dd className="tabular-nums">$864.00</dd>
                </div>
              </dl>
            </section>

            <section className="border border-[#4A3F36]/35 bg-[#dedad2] p-6 md:p-8">
              <h2 className="font-playfair text-lg font-bold uppercase tracking-[0.12em] text-[#1A1A1A]">Need help?</h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#4A4A4A]">
                <span className="block">+1 (555) 000-4141</span>
                <span className="mt-1 block">support@findea.com</span>
              </p>
            </section>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full bg-[#F2E1C8] py-3.5 font-playfair text-sm font-bold text-[#1A1A1A] hover:bg-[#e8d4b0]"
              >
                Track Order
              </button>
              <button
                type="button"
                className="w-full border border-[#2C2724] bg-white py-3.5 font-playfair text-sm font-bold text-[#1A1A1A] hover:bg-[#F9F8F4]"
              >
                Cancel Order
              </button>
              <Link
                href="/products"
                className="flex w-full items-center justify-center border border-[#2C2724] bg-white py-3.5 font-playfair text-sm font-bold text-[#1A1A1A] hover:bg-[#F9F8F4]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <NewsletterSection />
    </CheckoutFlowShell>
  );
}
