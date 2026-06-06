"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Loader2 } from "lucide-react";
import { useGetCartQuery, useRemoveFromCartMutation } from "@/lib/redux/api/cartApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { toast } from "react-hot-toast";
import { CartItemsSkeleton } from "./CartItemsSkeleton";

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`;
}

function QtyStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center border border-[#2C2724]/25 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-2.5 py-1.5 text-[#2C2724] hover:bg-[#F9F8F4]"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="min-w-8 text-center font-sans text-sm tabular-nums text-[#1A1A1A]">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="px-2.5 py-1.5 text-[#2C2724] hover:bg-[#F9F8F4]"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function CartItemsClient() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your cart", { id: "cart-auth-error" });
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const { data: cartData, isLoading } = useGetCartQuery(undefined, { skip: !isAuthenticated });
  const [localQty, setLocalQty] = useState<Record<string, number>>({});
  const [bulkAction, setBulkAction] = useState("add-to-cart");
  const [removeFromCart] = useRemoveFromCartMutation();

  const items = cartData?.items || [];

  const subtotal = items.reduce((sum: number, item: any) => {
    const q = localQty[item.id] ?? item.quantity;
    return sum + (parseFloat(item.product.price) * q);
  }, 0);
  
  /** Design: free shipping; flat rate shown as reference only. */
  const total = subtotal;

  const removeLine = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId).unwrap();
      setLocalQty((prev) => {
        const next = { ...prev };
        delete next[cartItemId];
        return next;
      });
      toast.success("Item removed from cart");
    } catch (err: any) {
      console.error("Failed to remove item", err);
      toast.error(err?.data?.message || err?.error || "Failed to remove item");
    }
  };

  const clearCart = () => {
    // API logic for clear cart would go here if available
    toast.error("Clear cart API not yet implemented");
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (isLoading) {
    return <CartItemsSkeleton />;
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20 text-center">
        <p className="font-playfair text-xl font-bold uppercase tracking-wide text-[#1A1A1A]">
          Your cart is empty
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex bg-[#F2E1C8] px-10 py-3 font-playfair text-sm font-semibold text-[#1A1A1A] hover:bg-[#e8d4b0]"
        >
          Return To Shop
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,380px)] lg:items-start lg:gap-12">
        <div>
          <h2 className="mb-6 font-playfair text-2xl font-bold uppercase tracking-[0.2em] text-[#1A1A1A] md:text-3xl">
            Findea
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#E3DDD3]">
                  {["Product", "Price", "SKU", "Quantity", "Subtotal"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A] first:pl-5 last:pr-5 last:text-right"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => {
                  const q = localQty[item.id] ?? item.quantity;
                  const unitPrice = parseFloat(item.product.price);
                  const lineSub = unitPrice * q;
                  return (
                    <tr key={item.id} className="border-b border-[#2C2724]/12">
                      <td className="py-8 pl-5 pr-4 align-top">
                        <div className="flex gap-4">
                          <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-[#E3DDD3]">
                            <Image src={item.product.imageUrl} alt="" fill className="object-cover" sizes="96px" />
                          </div>
                          <div>
                            <p className="font-playfair text-base font-semibold text-[#1A1A1A]">{item.product.name}</p>
                            <button
                              type="button"
                              onClick={() => removeLine(item.id)}
                              className="mt-2 font-sans text-xs text-[#6B6560] underline underline-offset-2 hover:text-[#1A1A1A]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-8 align-middle font-playfair text-sm font-semibold text-[#1A1A1A]">
                        {formatMoney(unitPrice)}
                      </td>
                      <td className="px-4 py-8 align-middle font-sans text-xs text-[#4A4A4A]">{item.product.id.substring(0,8).toUpperCase()}</td>
                      <td className="px-4 py-8 align-middle">
                        <QtyStepper
                          value={q}
                          onChange={(n) => setLocalQty((prev) => ({ ...prev, [item.id]: n }))}
                        />
                      </td>
                      <td className="py-8 pr-5 text-right align-middle font-playfair text-sm font-semibold text-[#1A1A1A]">
                        {formatMoney(lineSub)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-6 md:hidden">
            {items.map((item: any) => {
              const q = localQty[item.id] ?? item.quantity;
              const unitPrice = parseFloat(item.product.price);
              const lineSub = unitPrice * q;
              return (
                <article
                  key={item.id}
                  className="border border-[#2C2724]/15 bg-white/50 p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-28 w-24 shrink-0 bg-[#E3DDD3]">
                      <Image src={item.product.imageUrl} alt="" fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-playfair text-base font-semibold text-[#1A1A1A]">{item.product.name}</p>
                      <p className="mt-1 font-sans text-xs text-[#4A4A4A]">SKU: {item.product.id.substring(0,8).toUpperCase()}</p>
                      <p className="mt-2 font-playfair text-sm font-semibold">{formatMoney(unitPrice)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <QtyStepper
                      value={q}
                      onChange={(n) => setLocalQty((prev) => ({ ...prev, [item.id]: n }))}
                    />
                    <p className="font-playfair text-sm font-semibold">Subtotal: {formatMoney(lineSub)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(item.id)}
                    className="mt-3 font-sans text-xs text-[#6B6560] underline underline-offset-2"
                  >
                    Remove
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#2C2724]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="cart-bulk" className="sr-only">
                Cart action
              </label>
              <select
                id="cart-bulk"
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="min-w-[160px] border border-[#2C2724]/20 bg-white px-3 py-2.5 font-sans text-sm text-[#1A1A1A]"
              >
                <option value="add-to-cart">Add to Cart</option>
                <option value="wishlist">Move to Wishlist</option>
              </select>
              <button
                type="button"
                className="bg-[#F2E1C8] px-7 py-2.5 font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A] hover:bg-[#e8d4b0]"
              >
                Apply
              </button>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="bg-[#F2E1C8] px-8 py-2.5 font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A] hover:bg-[#e8d4b0] sm:self-end"
            >
              Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* Cart totals */}
        <aside className="border border-[#2C2724]/25 bg-[#dedad2] p-6 md:p-8">
          <h3 className="border-b border-[#2C2724]/20 pb-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#1A1A1A]">
            Cart Totals
          </h3>
          <dl className="mt-6 space-y-4 font-sans text-sm text-[#1A1A1A]">
            <div className="flex justify-between gap-4">
              <dt>Subtotal</dt>
              <dd className="font-medium tabular-nums">{formatMoney(subtotal)}</dd>
            </div>
            <div className="border-t border-[#2C2724]/10 pt-4">
              <div className="flex justify-between gap-4">
                <dt>Shipping</dt>
                <dd className="max-w-[12rem] text-right text-xs leading-relaxed text-[#4A4A4A]">
                  <span className="block font-medium text-[#1A1A1A]">Flat Rate: $5.00</span>
                  <span className="mt-1 block font-medium text-[#1A1A1A]">Free Shipping</span>
                  <span className="mt-2 block text-[11px] italic">
                    Shipping options will be updated during checkout.
                  </span>
                </dd>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="font-sans text-xs underline underline-offset-4 text-[#1A1A1A]">
                Calculate Shipping
              </button>
            </div>
            <div className="flex justify-between border-t border-[#2C2724]/20 pt-5 font-playfair text-lg font-bold text-[#1A1A1A]">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatMoney(total)}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center bg-[#F2E1C8] py-3.5 text-center font-playfair text-sm font-bold text-[#1A1A1A] hover:bg-[#e8d4b0] md:text-base"
            >
              Proceed To Checkout
            </Link>
            <Link
              href="/products"
              className="flex w-full items-center justify-center border border-[#2C2724] bg-transparent py-3.5 text-center font-playfair text-sm font-bold text-[#1A1A1A] hover:bg-white/60"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
