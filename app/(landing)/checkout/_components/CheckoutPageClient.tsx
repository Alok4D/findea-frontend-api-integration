"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/lib/redux/api/orderApi";
import { useGetCartQuery } from "@/lib/redux/api/cartApi";
import { toast } from "react-hot-toast";
import { Store } from "lucide-react";

const pageBg = "bg-[#F7F4F0]";
const field =
  "w-full rounded-sm border-0 bg-[#E0DBD3] px-4 py-3.5 font-sans text-sm text-[#1A1A1A] placeholder:text-[#6B6560]/75 outline-none ring-0 transition-colors focus:bg-[#d8d4cc]";

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block font-sans text-xs font-normal text-[#1A1A1A]">{children}</span>;
}

const PAYMENT_OPTIONS = [
  { id: "wave" as const, title: "Wave", icon: "/checkout/wave.svg" },
  { id: "orange" as const, title: "Orange Money", icon: "/checkout/orange-money.svg" },
  { id: "mtn" as const, title: "MTN MoMo", icon: "/checkout/mtn-momo.svg" },
  { id: "pickup" as const, title: "Pay At Pickup", icon: null },
] as const;

export function CheckoutPageClient() {
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState<(typeof PAYMENT_OPTIONS)[number]["id"]>("wave");
  const router = useRouter();

  const { data: cartData } = useGetCartQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const subtotal = cartData?.items?.reduce((acc: number, item: any) => acc + (parseFloat(item.product.price) * item.quantity), 0) || 0;
  const shipping = 5;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // In a real app we would get this from cart, but using the requested payload for now
    // combined with real form data if available, or fallbacks.
    const orderPayload = {
      customerEmail: formData.get("email") || "sarah@example.com",
      customerName: `${formData.get("firstName") || "Sarah"} ${formData.get("lastName") || "Rahman"}`.trim(),
      customerPhone: formData.get("phone") || "+8801811111111",
      shippingLine1: formData.get("address") || "24 Gulshan Avenue",
      shippingLine2: "Apt 4B",
      shippingCity: "Dhaka",
      shippingState: "Dhaka",
      shippingCountry: "Bangladesh",
      deliveryMethod: delivery.toUpperCase(),
      deliveryNotes: formData.get("notes") || "Leave with the security guard if not home.",
      paymentMethod: payment.toUpperCase(),
      couponCode: "DEVTEST",
      items: cartData?.items?.length > 0 
        ? cartData.items.map((item: any) => ({ productId: item.productId, quantity: item.quantity }))
        : [
            {
              productId: "cmq0r8avo001fjpt4w6ssq1ca",
              quantity: 2
            }
          ]
    };

    try {
      const res = await createOrder(orderPayload).unwrap();
      toast.success("Order placed successfully!");
      // Redirect or clear cart if needed. But for now we just redirect to confirmation
      router.push("/order/confirmation");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className={`w-full flex-1 ${pageBg}`}>
      <div className="mx-auto w-full max-w-[1240px] px-5 py-10 sm:px-8 md:px-10 lg:px-12 lg:py-14">
        <div className="mb-8 flex flex-col gap-2 font-sans text-sm text-[#1A1A1A]">
          <button type="button" className="w-fit text-left decoration-1 underline-offset-[3px] hover:opacity-80">
            Returning Customer? Click Here To Login
          </button>
          <button type="button" className="w-fit text-left decoration-1 underline-offset-[3px] hover:opacity-80">
            Have A Gift Card Or Promo Code? Click Here To Enter Your Code
          </button>
        </div>

        <div className="mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch">
          <input type="text" placeholder="Enter Gift Card Code" className={`${field} sm:min-w-0 sm:flex-1`} />
          <button
            type="button"
            className="shrink-0 rounded-sm bg-[#F2E3C9] px-10 py-3.5 font-playfair text-xs font-bold uppercase tracking-[0.14em] text-[#1A1A1A] transition-colors hover:bg-[#e8d4b0]"
          >
            Apply
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(100%,420px)] lg:gap-16 xl:gap-20">
          {/* Left — contact & delivery */}
          <div className="order-2 min-w-0 space-y-10 lg:order-1">
            <section>
              <h2 className="font-playfair text-xl font-bold uppercase tracking-[0.14em] text-[#1A1A1A] md:text-2xl">
                Contact &amp; Delivery Information
              </h2>
              <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#4A4A4A]">
                Please Provide Your Details Below To Finalize Your Order.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
                <div>
                  <FieldLabel>First name *</FieldLabel>
                  <input name="firstName" className={field} type="text" autoComplete="given-name" />
                </div>
                <div>
                  <FieldLabel>Last name *</FieldLabel>
                  <input name="lastName" className={field} type="text" autoComplete="family-name" />
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel>Phone *</FieldLabel>
                <input name="phone" className={field} type="tel" autoComplete="tel" />
              </div>

              <div className="mt-5">
                <FieldLabel>Email (optional)</FieldLabel>
                <input name="email" className={field} type="email" autoComplete="email" />
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-playfair text-lg font-bold text-[#1A1A1A]">Delivery Method</h2>
              <div className="flex flex-col gap-3 font-sans text-sm text-[#1A1A1A] sm:flex-row sm:gap-10">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "delivery"}
                    onChange={() => setDelivery("delivery")}
                    className="h-4 w-4 accent-[#5c4d42]"
                  />
                  Delivery
                </label>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "pickup"}
                    onChange={() => setDelivery("pickup")}
                    className="h-4 w-4 accent-[#5c4d42]"
                  />
                  Pick-Up In Boutique
                </label>
              </div>
            </section>

            <section>
              <FieldLabel>Delivery Address*</FieldLabel>
              <input name="address" className={field} type="text" autoComplete="street-address" />
              <div className="mt-5">
                <FieldLabel>Delivery Notes / Landmark</FieldLabel>
                <textarea name="notes" className={`${field} min-h-[140px] resize-y`} rows={4} />
              </div>
            </section>

            <p className="max-w-xl font-sans text-[11px] leading-relaxed text-[#5c5346]">
              After Ordering, Please Send Your Payment To The Boutique&apos;s Phone Number Based On The Local Method
              You&apos;ve Selected.
            </p>
          </div>

          {/* Right — single bordered panel (reference) */}
          <aside className="order-1 min-w-0 border border-[#3d3835]/35 bg-[#dedad2] p-6 md:p-8 lg:sticky lg:order-2 lg:top-6 lg:self-start">
            <h3 className="font-playfair text-base font-bold uppercase tracking-[0.16em] text-[#1A1A1A] md:text-lg">
              Order Summary
            </h3>
            <p className="mt-2 font-playfair text-lg font-bold tracking-[0.2em] text-[#1A1A1A]">FINDEA</p>

            <div className="mt-5 space-y-4">
              {cartData?.items?.length > 0 ? (
                cartData.items.map((item: any) => (
                  <div key={item.id} className="border border-[#2C2724]/15 bg-white p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-21 shrink-0 overflow-hidden bg-[#E3DDD3]">
                        <Image
                          src={item.product.imageUrl || "https://images.unsplash.com/photo-1597354984706-fac992d9306f?q=80&w=688&auto=format&fit=crop"}
                          alt={item.product.name}
                          fill
                          className="object-cover object-top"
                          sizes="84px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="font-playfair text-[15px] font-semibold leading-snug text-[#1A1A1A]">
                          {item.product.name}
                        </p>
                        <p className="mt-1 font-sans text-xs text-[#5c5346]">Qty: {item.quantity}</p>
                        <p className="mt-2 font-playfair text-sm font-semibold text-[#1A1A1A]">${item.product.price}</p>
                        <p className="mt-auto pt-4 text-right font-sans text-xs font-medium text-[#1A1A1A]">
                          Subtotal: ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-[#2C2724]/15 bg-white p-4 text-center font-sans text-sm">
                  Your cart is empty.
                </div>
              )}
            </div>

            <dl className="mt-8 space-y-3 border-t border-[#2C2724]/18 pt-6 font-sans text-sm text-[#1A1A1A]">
              <div className="flex justify-between gap-4">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Shipping</dt>
                <dd className="text-right">
                  <span className="font-medium">Flat Rate: ${shipping.toFixed(2)}</span>
                </dd>
              </div>
              <div className="flex justify-between border-t border-[#2C2724]/18 pt-4 font-playfair text-lg font-bold text-[#1A1A1A]">
                <dt>Total</dt>
                <dd className="tabular-nums">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <h4 className="mb-4 mt-10 font-playfair text-base font-bold text-[#1A1A1A]">Pay With</h4>
            <div className="space-y-3">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-3.5 border border-[#2C2724]/12 bg-white p-3.5 md:p-4"
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === opt.id}
                    onChange={() => setPayment(opt.id)}
                    className="h-4 w-4 shrink-0 accent-[#5c4d42]"
                  />
                  {opt.icon ? (
                    <Image src={opt.icon} alt="" width={40} height={40} className="h-10 w-10 shrink-0 object-contain" />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#2C2724]/20 bg-[#F7F4F0]">
                      <Store className="h-5 w-5 text-[#4A4439]" strokeWidth={1.5} aria-hidden />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block font-playfair text-[15px] font-semibold text-[#1A1A1A]">{opt.title}</span>
                    <span className="mt-0.5 block font-sans text-[11px] leading-snug text-[#5c5346]">
                      Send Payment To The Boutique&apos;s Phone Number
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-8 space-y-2.5 font-sans text-[11px] leading-snug text-[#4A4A4A]">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#5c4d42]" defaultChecked />
                <span>Shipping Options Will Be Updated During Checkout</span>
              </label>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#5c4d42]" />
                <span>Change Shipping Method</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 flex w-full items-center justify-center rounded-sm bg-[#F2E3C9] py-4 font-playfair text-base font-bold text-[#1A1A1A] transition-colors hover:bg-[#e8d4b0] disabled:opacity-50"
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}
