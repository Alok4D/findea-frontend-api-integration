"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, Eye, Pencil, Ban, Trash2 } from "lucide-react";
import { ApiProduct } from "@/lib/redux/api/productApi";

interface ProductsTableProps {
  products: ApiProduct[];
  isLoading: boolean;
}

const SkeletonRow = () => (
  <tr className="bg-transparent border-b border-[#CFCAC1] animate-pulse">
    <td className="px-4 py-4 text-center">
      <div className="h-4 w-4 bg-[#DEDAD2] mx-auto rounded"></div>
    </td>
    <td className="px-4 py-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-[#DEDAD2] shrink-0 border border-[#CFCAC1]"></div>
        <div className="space-y-2 w-full max-w-[120px]">
          <div className="h-4 bg-[#DEDAD2] w-full rounded"></div>
          <div className="h-3 bg-[#DEDAD2] w-2/3 rounded"></div>
        </div>
      </div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-[#DEDAD2] w-16 rounded"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-[#DEDAD2] w-20 rounded"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-6 bg-[#DEDAD2] w-16 rounded"></div>
    </td>
    <td className="px-4 py-4 text-center">
      <div className="h-4 bg-[#DEDAD2] w-12 mx-auto rounded"></div>
    </td>
    <td className="px-4 py-4 text-center">
      <div className="h-8 w-8 bg-[#DEDAD2] mx-auto rounded"></div>
    </td>
  </tr>
);

export default function ProductsTable({ products, isLoading }: ProductsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(products.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

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
                <input 
                  type="checkbox" 
                  className="accent-[#1A1A1A] cursor-pointer" 
                  checked={selectedRows.length === products.length && products.length > 0}
                  onChange={toggleAll}
                />
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
            {isLoading ? (
              // Render skeleton rows while loading
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#4A4A4A] italic">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isSelected = selectedRows.includes(product.id);
                const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
                const status = product.isActive ? "Active" : "Draft";
                const registries = 0; // Field not in ApiProduct yet

                return (
                  <tr
                    key={product.id}
                    className={`transition-colors ${
                      isSelected ? "bg-[#DEDAD2]/50" : "bg-transparent hover:bg-[#DEDAD2]/10"
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input 
                        type="checkbox" 
                        className="accent-[#1A1A1A] cursor-pointer" 
                        checked={isSelected}
                        onChange={() => toggleRow(product.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 shrink-0 object-cover border border-[#CFCAC1]"
                          />
                        ) : (
                          <div className="h-16 w-16 shrink-0 bg-[#EAE7DF] border border-[#CFCAC1] flex items-center justify-center">
                            <span className="text-[10px] text-[#6E6A63]">No Img</span>
                          </div>
                        )}
                        <div>
                          <p className="font-playfair font-bold text-[#1A1A1A]">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#4A4A4A] mt-1">{product.category?.name || "Uncategorized"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-playfair font-bold text-[#1A1A1A]">
                      ${product.price}
                    </td>
                    <td className="px-4 py-4 text-[#1A1A1A]">{stockStatus}</td>
                    <td className="px-4 py-4">
                      <span className="inline-block border border-[#CFCAC1] bg-white/50 px-3 py-1 text-xs text-[#1A1A1A]">
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-playfair font-bold text-[#1A1A1A] text-center">
                      {registries}
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
                          <div className="absolute right-10 top-10 z-50 w-48 border border-[#CFCAC1] bg-[#F5F3EE] py-2 shadow-sm text-left">
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
