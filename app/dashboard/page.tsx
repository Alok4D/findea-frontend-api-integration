"use client";

import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import { useGetAdminStatsQuery } from "@/lib/redux/api/adminApi";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${mins} min${mins > 1 ? "s" : ""} ago`;
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetAdminStatsQuery();

  const stats = data
    ? [
        {
          label: "Total Products",
          value: data.overview.totalProducts.toString(),
          tooltip: "All products in the platform",
        },
        {
          label: "Total Orders",
          value: data.overview.totalOrders.toString(),
          tooltip: "Total orders placed",
        },
        {
          label: "Total Users",
          value: data.overview.totalUsers.toString(),
          tooltip: "Registered users on the platform",
        },
        {
          label: "Total Revenue",
          value: `$${data.overview.totalRevenue.toLocaleString()}`,
          tooltip: "Total revenue from fulfilled orders",
        },
      ]
    : [];

  return (
    <div className="mx-auto max-w-full">
      <div className="mb-8 hidden lg:flex items-center gap-4">
        <h1 className="font-playfair text-3xl font-bold tracking-wide text-[#1A1A1A]">
          Artisan & Co.
        </h1>
        <span className="rounded-full bg-[#DEDAD2] px-3 py-1 text-xs font-medium text-[#1A1A1A]">
          Active
        </span>
      </div>

      <hr className="mb-8 hidden lg:block border-[#CFCAC1]" />

      {/* Stats Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-[#DEDAD2] p-5 shadow-sm animate-pulse"
              >
                <div className="h-4 w-24 bg-[#CFCAC1] rounded mb-4" />
                <div className="h-10 w-16 bg-[#CFCAC1] rounded mb-6" />
                <hr className="mb-4 border-[#CFCAC1]" />
                <div className="h-3 w-20 bg-[#CFCAC1] rounded" />
              </div>
            ))
          : stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col bg-[#DEDAD2] p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between text-sm text-[#1A1A1A]">
                  <span>{stat.label}</span>
                  <div className="group relative cursor-help">
                    <Info size={14} className="text-[#6E6A63]" />
                    <div 
                      className={`absolute bottom-[calc(100%+8px)] hidden group-hover:block z-20 pointer-events-none ${
                        i === stats.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <div className="relative bg-[#1A1A1A] text-white text-[11px] rounded-md px-3 py-2 whitespace-nowrap shadow-lg">
                        {stat.tooltip}
                        {/* Arrow pointing down */}
                        <span 
                          className={`absolute top-full border-4 border-transparent border-t-[#1A1A1A] ${
                            i === stats.length - 1 ? 'right-1' : 'left-1/2 -translate-x-1/2'
                          }`} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6 text-4xl font-playfair text-[#1A1A1A] text-center sm:text-left">
                  {stat.value}
                </div>
                <hr className="mb-4 border-[#CFCAC1]" />
                <Link
                  href="#"
                  className="text-xs font-medium text-[#1A1A1A] hover:underline"
                >
                  View Details &gt;
                </Link>
              </div>
            ))}
      </div>

      <hr className="mb-8 border-[#CFCAC1]" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 border border-[#DEDAD2]">
          <div className="bg-[#DEDAD2] px-6 py-4">
            <h2 className="font-playfair text-xl font-bold text-[#1A1A1A]">
              Recent Orders
            </h2>
          </div>
          <div className="divide-y divide-[#CFCAC1]">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 animate-pulse">
                    <div className="space-y-2">
                      <div className="h-4 w-36 bg-[#DEDAD2] rounded" />
                      <div className="h-3 w-24 bg-[#DEDAD2] rounded" />
                    </div>
                    <div className="h-4 w-16 bg-[#DEDAD2] rounded" />
                  </div>
                ))
              : isError
              ? (
                <div className="px-6 py-8 text-center text-sm text-[#6E6A63]">Failed to load orders.</div>
              )
              : data?.recentOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 ${
                      index % 2 !== 0 ? "bg-[#DEDAD2]/50" : "bg-transparent"
                    }`}
                  >
                    <div>
                      <p className="font-playfair font-bold text-[#1A1A1A] text-sm">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-[#4A4A4A] mt-0.5">
                        {order.customerName} · ${order.total}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span
                        className={`inline-block border px-3 py-0.5 text-[11px] ${
                          order.status === "CANCELLED"
                            ? "border-red-300 text-red-600 bg-red-50"
                            : order.status === "FULFILLED"
                            ? "border-green-300 text-green-700 bg-green-50"
                            : "border-[#CFCAC1] text-[#1A1A1A]"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-[#6E6A63]">
                        {timeAgo(order.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Low Stock + Top Products */}
        <div className="space-y-6">
          {/* Low Stock */}
          <div className="border border-[#DEDAD2]">
            <div className="bg-[#DEDAD2] px-6 py-4">
              <h2 className="font-playfair text-lg font-bold text-[#1A1A1A]">
                Low Stock Alert
              </h2>
            </div>
            <div className="divide-y divide-[#CFCAC1]">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
                      <div className="h-10 w-10 shrink-0 bg-[#DEDAD2] rounded" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-28 bg-[#DEDAD2] rounded" />
                        <div className="h-3 w-16 bg-[#DEDAD2] rounded" />
                      </div>
                    </div>
                  ))
                : data?.lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 px-4 py-3">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 object-cover border border-[#CFCAC1]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-red-500 mt-0.5">
                          Only {product.stock} left
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="border border-[#DEDAD2]">
            <div className="bg-[#DEDAD2] px-6 py-4">
              <h2 className="font-playfair text-lg font-bold text-[#1A1A1A]">
                Top Products
              </h2>
            </div>
            <div className="divide-y divide-[#CFCAC1]">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 animate-pulse">
                      <div className="h-3 w-28 bg-[#DEDAD2] rounded" />
                      <div className="h-3 w-10 bg-[#DEDAD2] rounded" />
                    </div>
                  ))
                : data?.topProducts.map((product, i) => (
                    <div
                      key={product.productId}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#6E6A63] w-4">
                          {i + 1}.
                        </span>
                        <p className="text-sm text-[#1A1A1A]">{product.productName}</p>
                      </div>
                      <span className="text-xs font-bold text-[#1A1A1A]">
                        {product._sum.quantity} sold
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href="/dashboard/products/add-product"
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#DEDAD2] sm:bg-[#6E6A63] px-8 py-3 font-playfair text-sm font-bold text-[#1A1A1A] sm:text-white transition-colors hover:bg-[#CFCAC1] sm:hover:bg-[#56534c]"
        >
          <span>+</span> Add Product
        </Link>
        <Link
          href="/dashboard/services"
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#DEDAD2] sm:bg-[#6E6A63] px-8 py-3 font-playfair text-sm font-bold text-[#1A1A1A] sm:text-white transition-colors hover:bg-[#CFCAC1] sm:hover:bg-[#56534c]"
        >
          <span>+</span> Add Service
        </Link>
        <Link
          href="/dashboard/registries"
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#DEDAD2] sm:bg-[#6E6A63] px-8 py-3 font-playfair text-sm font-bold text-[#1A1A1A] sm:text-white transition-colors hover:bg-[#CFCAC1] sm:hover:bg-[#56534c]"
        >
          <span>+</span> Manage Boutique
        </Link>
      </div>
    </div>
  );
}
