"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Minus, Plus, Trash2 } from "lucide-react";

type WishlistRow = {
  id: number;
  name: string;
  sku: string;
  image: string;
  price: string;
  stock: string;
  added: string;
};

const INITIAL_ROWS: WishlistRow[] = [
  {
    id: 1,
    name: "Ant Studded Collar Shirt",
    sku: "2355678",
    image: "https://images.unsplash.com/photo-1597354984706-fac992d9306f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$864.00",
    stock: "In Stock",
    added: "February 2, 2026",
  },
  {
    id: 2,
    name: "Silk Evening Blouse",
    sku: "4412091",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80",
    price: "$412.00",
    stock: "In Stock",
    added: "January 18, 2026",
  },
];

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-gray-300 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus size={14} />
      </button>
      <span className="min-w-8 text-center font-sans text-sm">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export function WishlistTableClient() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [qty, setQty] = useState<Record<number, number>>(() =>
    Object.fromEntries(INITIAL_ROWS.map((r) => [r.id, 1]))
  );
  const [bulkAction, setBulkAction] = useState("add-to-cart");

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setQty((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  if (rows.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
        <p className="font-playfair text-xl text-[#1A1A1A]">Your wishlist has no items.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex bg-[#F2E1C8] px-10 py-3 font-playfair text-sm font-bold text-[#1A1A1A] hover:bg-[#e8d4b0]"
        >
          Return To Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 md:px-8 md:py-12">
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-black/15">
              <th className="pb-4 font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                Product
              </th>
              <th className="pb-4 text-center font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                Quantity
              </th>
              <th className="pb-4 text-center font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                Price
              </th>
              <th className="pb-4 text-center font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                Stock status
              </th>
              <th className="pb-4 text-right font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-black/10 align-top">
                <td className="py-8 pr-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-gray-100">
                      <Image src={row.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <div>
                      <p className="font-playfair text-base font-bold text-[#1A1A1A]">{row.name}</p>
                      <p className="mt-1 font-sans text-xs text-gray-600">SKU: {row.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="py-8 text-center align-middle">
                  <QtyStepper
                    value={qty[row.id] ?? 1}
                    onChange={(n) => setQty((prev) => ({ ...prev, [row.id]: n }))}
                  />
                </td>
                <td className="py-8 text-center align-middle font-playfair text-base font-semibold text-[#1A1A1A]">
                  {row.price}
                </td>
                <td className="py-8 text-center align-middle font-sans text-sm text-[#1A1A1A]">{row.stock}</td>
                <td className="py-8 text-right align-middle">
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Link
                        href={`/products/${row.id}`}
                        className="inline-flex h-10 w-10 items-center justify-center border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                        aria-label="View product"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        type="button"
                        className="bg-[#F2E1C8] px-4 py-2 font-playfair text-xs font-bold uppercase tracking-wide text-[#1A1A1A] hover:bg-[#e8d4b0]"
                      >
                        Add To Cart
                      </button>
                      <button
                        type="button"
                        aria-label="Remove from wishlist"
                        className="inline-flex h-10 w-10 items-center justify-center border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                        onClick={() => removeRow(row.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="font-sans text-xs text-gray-500">Added on: {row.added}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-6 md:hidden">
        {rows.map((row) => (
          <article
            key={row.id}
            className="border border-black/10 bg-white/40 p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-gray-100">
                <Image src={row.image} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-playfair text-base font-bold text-[#1A1A1A]">{row.name}</p>
                <p className="mt-1 font-sans text-xs text-gray-600">SKU: {row.sku}</p>
                <p className="mt-2 font-playfair text-sm font-semibold">{row.price}</p>
                <p className="mt-1 font-sans text-xs text-[#1A1A1A]">{row.stock}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <QtyStepper
                value={qty[row.id] ?? 1}
                onChange={(n) => setQty((prev) => ({ ...prev, [row.id]: n }))}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/products/${row.id}`}
                className="inline-flex h-10 w-10 items-center justify-center border border-gray-300 bg-white"
                aria-label="View product"
              >
                <Eye size={18} />
              </Link>
              <button
                type="button"
                className="flex-1 min-w-[140px] bg-[#F2E1C8] px-4 py-2.5 font-playfair text-xs font-bold uppercase text-[#1A1A1A]"
              >
                Add To Cart
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center border border-gray-300 bg-white"
                aria-label="Remove"
                onClick={() => removeRow(row.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="mt-3 font-sans text-xs text-gray-500">Added on: {row.added}</p>
          </article>
        ))}
      </div>

      {/* Bulk bar */}
      <div className="mt-10 border-t border-black/15 pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="wishlist-bulk" className="sr-only">
              Bulk action
            </label>
            <select
              id="wishlist-bulk"
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="min-w-[160px] border border-gray-300 bg-white px-3 py-2 font-sans text-sm text-[#1A1A1A]"
            >
              <option value="add-to-cart">Add to Cart</option>
              <option value="remove">Remove</option>
            </select>
            <button
              type="button"
              className="bg-[#F2E1C8] px-6 py-2 font-playfair text-xs font-bold uppercase text-[#1A1A1A] hover:bg-[#e8d4b0]"
            >
              Apply
            </button>
          </div>
          <button
            type="button"
            className="w-full bg-[#F2E1C8] px-8 py-3.5 font-playfair text-sm font-bold uppercase tracking-wide text-[#1A1A1A] hover:bg-[#e8d4b0] md:w-auto md:px-12 md:text-base"
          >
            Add All To Cart
          </button>
        </div>
      </div>
    </section>
  );
}
