import Link from "next/link";
import { Info } from "lucide-react";

const stats = [
  {
    label: "Total Products",
    value: "125",
    tooltip: "Includes drafts and pending items",
  },
  {
    label: "Total Services",
    value: "8",
    tooltip: "All Services you offer in the platform",
  },
  {
    label: "Items in Registries",
    value: "156",
    tooltip: "Total number of your items added to registries",
  },
  {
    label: "Active Registries",
    value: "24",
    tooltip: "Registries that contain your products",
  },
];

const activities = [
  {
    id: 1,
    title: "Ceramic Dinnerware Set",
    description: "Added to Sarah & Michael's Wedding Registry",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Ceramic Dinnerware Set",
    description: "Added to Sarah & Michael's Wedding Registry",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Ceramic Dinnerware Set",
    description: "Added to Sarah & Michael's Wedding Registry",
    time: "2 hours ago",
  },
  {
    id: 4,
    title: "Ceramic Dinnerware Set",
    description: "Added to Sarah & Michael's Wedding Registry",
    time: "2 hours ago",
  },
];

export default function DashboardPage() {
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

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col bg-[#DEDAD2] p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between text-sm text-[#1A1A1A]">
              <span>{stat.label}</span>
              <div className="group relative cursor-help">
                <Info size={14} className="text-[#6E6A63]" />
                <div className="absolute bottom-full left-1/2 mb-2 hidden w-max -translate-x-1/2 rounded bg-[#1A1A1A] px-2 py-1 text-[10px] text-white group-hover:block z-10">
                  {stat.tooltip}
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

      <div className="mb-10 border border-[#DEDAD2]">
        <div className="bg-[#DEDAD2] px-6 py-4">
          <h2 className="font-playfair text-xl font-bold text-[#1A1A1A]">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-[#CFCAC1]">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 ${
                index % 2 !== 0 ? "bg-[#DEDAD2]/50" : "bg-transparent"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="h-10 w-10 shrink-0 rounded-full bg-[#8e8a86]"></div>
                <div>
                  <p className="font-playfair font-bold text-[#1A1A1A]">
                    {activity.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#1A1A1A] self-end sm:self-auto">{activity.time}</div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Activities button (shown only on mobile) */}
        <div className="p-4 lg:hidden">
          <button className="w-full border border-[#1A1A1A] py-3 text-sm font-playfair font-bold text-[#1A1A1A]">
            View All Activities
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#DEDAD2] sm:bg-[#6E6A63] px-8 py-3 font-playfair text-sm font-bold text-[#1A1A1A] sm:text-white transition-colors hover:bg-[#CFCAC1] sm:hover:bg-[#56534c]">
          <span>+</span> Add Product
        </button>
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#DEDAD2] sm:bg-[#6E6A63] px-8 py-3 font-playfair text-sm font-bold text-[#1A1A1A] sm:text-white transition-colors hover:bg-[#CFCAC1] sm:hover:bg-[#56534c]">
          <span>+</span> Add Service
        </button>
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#DEDAD2] sm:bg-[#6E6A63] px-8 py-3 font-playfair text-sm font-bold text-[#1A1A1A] sm:text-white transition-colors hover:bg-[#CFCAC1] sm:hover:bg-[#56534c]">
          <span>+</span> Manage Boutique
        </button>
      </div>
    </div>
  );
}
