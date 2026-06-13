"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Gift,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetCartQuery } from "@/lib/redux/api/cartApi";
import { useGetWishlistQuery } from "@/lib/redux/api/wishlistApi";
import { useGetProductsQuery } from "@/lib/redux/api/productApi";

const Navbar = () => {
  
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults, isFetching: isSearching } = useGetProductsQuery(
    { search: debouncedSearchQuery, limit: 5 },
    { skip: !debouncedSearchQuery.trim() }
  );

  const { data: cartData } = useGetCartQuery(undefined, { skip: !isAuthenticated });
  const cartItemCount = cartData?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });
  const wishlistItemCount = wishlistData?.length || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery("");
      setIsSearchExpanded(false);
    }
  };

  const navLinks = [
    { name: "HOME", hasDropdown: false, href: "/" },
    { name: "ABOUT", hasDropdown: false, href: "/about" },
    {
      name: "PRODUCTS",
      hasDropdown: false,
      href: "/products",
    },
    {
      name: "REGISTRIES",
      hasDropdown: true,
      href: "#",
      items: ["Wedding Registry", "Baby Registry", "Find a Registry"],
    },
    {
      name: "SERVICES",
      hasDropdown: true,
      href: "#",
      items: [
        "Wedding Services",
        "Baby & Family",
        "Home & Lifestyle",
        "Wellness & Beauty",
        "Photography",
      ],
    },
    { name: "BOUTIQUES", hasDropdown: false, href: "#" },
  ];

  const toggleAccordion = (name: string) => {
    setActiveAccordion((prev) => (prev === name ? null : name));
  };

  const renderSearchDropdown = (onItemClick: () => void) => (
    <div className="absolute top-full left-0 w-full md:w-[350px] bg-white shadow-2xl mt-2 max-h-[60vh] md:max-h-[400px] overflow-y-auto z-[60] border border-gray-100 rounded-b-sm">
      {isSearching ? (
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-12 h-14 bg-gray-200 rounded-sm"></div>
              <div className="flex-1 space-y-2 py-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : searchResults?.data?.length ? (
        <div className="py-2">
          {searchResults.data.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={() => {
                onItemClick();
                setSearchQuery('');
              }}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 group transition-colors"
            >
              <div className="w-12 h-14 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-playfair font-medium text-gray-800 truncate">{product.name}</p>
                <p className="text-xs font-bold text-gray-500 mt-1">${product.price}</p>
              </div>
            </Link>
          ))}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full text-center py-4 text-xs text-brand-text font-bold uppercase tracking-widest hover:bg-brand-beige/20 transition-colors"
          >
            View all results
          </button>
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-gray-500 font-playfair italic">
          No products found matching &quot;{debouncedSearchQuery}&quot;
        </div>
      )}
    </div>
  );

  return (
    <div className="relative bg-white">
      {/* Mobile Header (Image 6 structure) */}
      <div className="md:hidden w-full bg-white border-b border-gray-200 py-3 px-4 grid grid-cols-3 items-center">
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-900 p-1 relative z-10"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/footer-logo/1000008546-removebg-preview 1.svg"
              alt="Findea Logo"
              width={90}
              height={30}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Gift size={22} className="text-gray-900" />
          <Link href="/cart/items" className="text-gray-900 relative" aria-label="Shopping cart">
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer (Image 7 structure) */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute inset-y-0 left-0 w-[280px] bg-[#D5D0C9] p-6 flex flex-col shadow-2xl overflow-y-auto transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col items-center mb-10">
              <div className="flex justify-between items-center w-full mb-8">
                <div className="w-6"></div>
                {/* Spacer to help center logo */}
                <Image
                  src="/footer-logo/1000008546-removebg-preview 1.svg"
                  alt="Findea Logo"
                  width={110}
                  height={38}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-900"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Type here..."
                  className="w-full bg-white text-gray-800 placeholder:text-gray-400 rounded-none px-4 py-3 text-sm outline-none font-playfair"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </button>
                {searchQuery.trim() && renderSearchDropdown(() => setIsMenuOpen(false))}
              </form>
            </div>

            {/* Accordion Links (Image Structure) */}
            <ul className="space-y-8 mt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex justify-between items-center cursor-pointer group"
                      onClick={() => {
                        if (link.hasDropdown) {
                          toggleAccordion(link.name);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <span className={`text-lg font-playfair tracking-widest uppercase transition-colors ${isActive ? 'text-brand-text font-bold' : 'text-[#1A1A1A]'}`}>
                        {link.name}
                      </span>
                      {link.hasDropdown && (
                        <ChevronDown
                          size={20}
                          strokeWidth={1}
                          className={`text-gray-600 transition-transform ${
                            activeAccordion === link.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>
                    {link.hasDropdown && activeAccordion === link.name && (
                      <ul className="pl-6 mt-5 space-y-4">
                        {link.items?.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="text-[15px] font-playfair text-[#333] hover:text-black transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li className="pt-4">
                <Link
                  href={isAuthenticated ? "/account" : "/login"}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-playfair tracking-widest text-[#1A1A1A]"
                >
                  {isAuthenticated ? "Mon compte" : "S'inscrire"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

      {/* Desktop Navbar (Original Structure) */}
      <div className="hidden md:flex w-full bg-white border-b border-gray-200 py-4 px-6 md:px-12 items-center justify-between max-w-[1239px] mx-auto">
        <div className="flex-1">
          <form 
            onSubmit={handleSearch} 
            className="relative flex items-center justify-start group"
          >
            <motion.div
              initial={false}
              animate={{ 
                width: isSearchExpanded ? "200px" : "0px",
                opacity: isSearchExpanded ? 1 : 0,
                marginRight: isSearchExpanded ? "10px" : "0px"
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-[200px] bg-transparent border-b border-gray-200 py-1 pl-1 pr-2 text-[13px] outline-none focus:border-black transition-colors placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchExpanded(false)}
              />
            </motion.div>
            <button 
              type="button"
              onClick={() => {
                if (!isSearchExpanded) {
                  setIsSearchExpanded(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                } else if (searchQuery.trim()) {
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                } else {
                  setIsSearchExpanded(false);
                }
              }}
              className="text-gray-900 hover:text-brand-text transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {searchQuery.trim() && isSearchExpanded && renderSearchDropdown(() => setIsSearchExpanded(false))}
          </form>
        </div>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="hover:opacity-90 transition-all">
            <Image
              src="/footer-logo/1000008546-removebg-preview 1.svg"
              alt="Findea Logo"
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>



          {/* ICONS - CART, WISHLIST ETC */}
        <div className="flex-1 flex justify-end items-center gap-5 md:gap-7">
          <Link href={isAuthenticated ? "/account" : "/login"} className="hover:opacity-60 transition-all" aria-label="Mon compte">
            <User size={22} className="text-gray-900" />
          </Link>
          <Link href="/wishlist" className="hover:opacity-60 transition-all relative" aria-label="Wishlist">
            <Heart size={22} className="text-gray-900" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlistItemCount}
              </span>
            )}
          </Link>
          <Link href="/cart/items" className="hover:opacity-60 transition-all relative" aria-label="Shopping cart">
            <ShoppingCart size={22} className="text-gray-900" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          <a href="#" className="hover:opacity-60 transition-all">
            <Gift size={22} className="text-gray-900" />
          </a>
        </div>
      </div>

      <nav className="hidden md:block w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <ul className="flex items-center space-x-12 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.name}
                  className="relative h-full flex items-center group"
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-[13px] font-medium tracking-widest uppercase transition-colors cursor-pointer ${isActive ? 'text-black font-bold' : 'text-gray-800 hover:text-gray-500'}`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        strokeWidth={1.5}
                        className="text-gray-400 group-hover:rotate-180 transition-transform"
                      />
                    )}
                  </Link>

                  {/* Active Indicator (Design Specs: W=45, Weight=1.5) */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[45px] h-[1.5px] bg-brand-text z-10" 
                      />
                    )}
                  </AnimatePresence>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 w-56 bg-brand-beige border border-gray-100 shadow-xl py-4 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="space-y-1">
                        {link.items?.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="block px-4 py-2 text-[13px] text-gray-600 hover:bg-[#F7F5F2] hover:text-black transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;