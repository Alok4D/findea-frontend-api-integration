"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Heart,
  Gift,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/authSlice";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/products", icon: LayoutGrid },
  { name: "Services", href: "/dashboard/services", icon: Heart },
  { name: "Registries", href: "/dashboard/registries", icon: Gift },
  { name: "Subscription & Activity", href: "/dashboard/subscription", icon: BarChart2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin-login");
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between border-b border-[#CFCAC1] bg-[#F5F3EE] px-4 py-4 lg:hidden">
        <button onClick={() => setIsOpen(true)} className="text-[#1A1A1A]">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="font-playfair text-xl font-bold tracking-wide text-[#1A1A1A]">
            Artisan & Co.
          </h1>
          <span className="rounded-full bg-[#DEDAD2] px-2 py-0.5 text-[10px] font-medium text-[#1A1A1A]">
            Active
          </span>
        </div>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#DEDAD2] py-8 transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-10 px-8 flex justify-between items-center">
         <Link href={"/"}>
          <h1 className="font-playfair text-2xl font-bold tracking-wide text-[#1A1A1A]">
            Artisan & Co.
          </h1>
         </Link>
          {/* Close button on mobile inside the drawer */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden ml-auto text-[#1A1A1A]">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-8 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#1C1C1C] text-[#F5F3EE]"
                    : "text-[#1C1C1C] hover:bg-[#1C1C1C]/10"
                )}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-8 pt-8">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center  gap-4 py-3 text-sm font-medium text-[#1C1C1C] transition-colors hover:text-black"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
