"use client";

import { useState } from "react";
import { MoreVertical, Eye, Pencil, Ban, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Artisan Ceramic Set",
    store: "Beauty",
    price: "$150",
    stockStatus: "In Stock",
    status: "Active",
    registries: 4,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Artisan Ceramic Set",
    store: "Ateliers Ifé",
    price: "$150",
    stockStatus: "Out of Stock",
    status: "Pending",
    registries: 4,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Artisan Ceramic Set",
    store: "Ateliers Ifé",
    price: "$150",
    stockStatus: "In Stock",
    status: "Approved",
    registries: 4,
    image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Artisan Ceramic Set",
    store: "Ateliers Ifé",
    price: "$150",
    stockStatus: "In Stock",
    status: "Draft",
    registries: 4,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=120&h=120&fit=crop&auto=format",
  },
];

export default function ProductsTable() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="border border-[#CFCAC1]">
      {/* Bulk Actions */}
      <div className="flex flex-wrap items-center gap-3 bg-[#DEDAD2]/40 px-4 py-3 border-b border-[#CFCAC1]">
        <select className="border border-[#CFCAC1] bg-transparent px-3 py-1.5 text-xs font-medium outline-none">
          <option>Bulk actions</option>
        </select>
        <button className="border border-[#CFCAC1] bg-transparent px-4 py-1.5 text-xs font-medium hover:bg-[#DEDAD2]">
          Activate
        </button>
        <button className="border border-[#CFCAC1] bg-transparent px-4 py-1.5 text-xs font-medium hover:bg-[#DEDAD2]">
          Deactivate
        </button>
        <select className="border border-[#CFCAC1] bg-transparent px-3 py-1.5 text-xs font-medium outline-none">
          <option>Change Status</option>
        </select>
        <button className="border border-[#CFCAC1] bg-transparent px-4 py-1.5 text-xs font-medium hover:bg-[#DEDAD2]">
          Delete
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto lg:overflow-visible">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="bg-[#DEDAD2]/70 font-playfair text-[#1A1A1A]">
              <th className="px-4 py-4 w-12 text-center">
                <input type="checkbox" className="accent-[#1A1A1A]" />
              </th>
              <th className="px-4 py-4 font-bold">Product</th>
              <th className="px-4 py-4 font-bold">Price</th>
              <th className="px-4 py-4 font-bold">Stock Status</th>
              <th className="px-4 py-4 font-bold">Status</th>
              <th className="px-4 py-4 font-bold">Added to Registries</th>
              <th className="px-4 py-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#CFCAC1]">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={index % 2 !== 0 ? "bg-[#DEDAD2]/30" : "bg-transparent"}
              >
                <td className="px-4 py-4 text-center">
                  <input type="checkbox" className="accent-[#1A1A1A]" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 object-cover border border-[#CFCAC1]"
                    />
                    <div>
                      <p className="font-playfair font-bold text-[#1A1A1A]">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#4A4A4A] mt-1">{product.store}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-playfair font-bold text-[#1A1A1A]">
                  {product.price}
                </td>
                <td className="px-4 py-4 text-[#1A1A1A]">{product.stockStatus}</td>
                <td className="px-4 py-4">
                  <span className="inline-block border border-[#CFCAC1] bg-white/50 px-3 py-1 text-xs text-[#1A1A1A]">
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-playfair font-bold text-[#1A1A1A] text-center">
                  {product.registries}
                </td>
                <td className="px-4 py-4 text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === product.id ? null : product.id)
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-[#DEDAD2]"
                  >
                    <MoreVertical size={18} className="text-[#1A1A1A]" />
                  </button>
                  {/* Dropdown Menu */}
                  {openMenuId === product.id && (
                    <>
                      {/* Overlay to close menu when clicking outside */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setOpenMenuId(null)}
                      ></div>
                      <div className="absolute right-10 top-10 z-50 w-48 border border-[#CFCAC1] bg-[#F5F3EE] py-2 shadow-sm">
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#DEDAD2] transition-colors">
                          <Eye size={14} strokeWidth={1.5} /> View Product Page
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#DEDAD2] transition-colors">
                          <Pencil size={14} strokeWidth={1.5} /> Edit
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#DEDAD2] transition-colors">
                          <Ban size={14} strokeWidth={1.5} /> Deactivate
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#DEDAD2] transition-colors">
                          <Trash2 size={14} strokeWidth={1.5} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
