"use client";
import { Search, MoveRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "@/lib/redux/api/productApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

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

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <div className="relative w-full overflow-hidden bg-[#F7F5F2]">
      {/* Top Part: Images and Search Bar */}
      <div className="relative w-full h-[450px] md:h-[738px] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 flex w-full">
          <div className="w-1/2 relative h-full">
            <Image
              src="/banner-img/Gemini_Generated_Image_2tv8hi2tv8hi2tv8.png"
              alt="Product image"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="w-1/2 relative h-full">
            <Image
              src="/banner-img/Gemini_Generated_Image_1t57ux1t57ux1t57.png"
              alt="Service image"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Search Bar Overlay (Mobile & Desktop) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="hidden md:block text-7xl font-playfair font-medium tracking-wide mb-10 text-white">
            Findéa
          </h1>

          <div className="relative w-full max-w-[850px]">
            <form 
              onSubmit={handleSearch}
              className="w-full bg-white text-black py-5 px-8 flex items-center justify-between shadow-sm rounded-none relative z-20"
            >
              <input
                type="text"
                placeholder="Search a product, a boutique or a service...."
                className="w-full bg-transparent border-none outline-none text-[13px] md:text-[18px] font-normal text-gray-800 placeholder:text-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <button type="submit">
                <Search size={22} strokeWidth={1} className="text-gray-900 cursor-pointer" />
              </button>
            </form>

            {/* Dropdown Results */}
            {isSearchFocused && debouncedSearchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl z-50 max-h-[400px] overflow-y-auto border border-gray-100 text-left">
                {isSearching ? (
                  <div className="p-6 text-center text-sm text-gray-500 font-playfair italic">
                    Loading results...
                  </div>
                ) : searchResults?.data?.length ? (
                  <div className="py-2">
                    {searchResults.data.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
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
            )}
          </div>

          {/* Desktop Action Buttons (Hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center gap-5 mt-10 md:mt-12 w-full px-6">
            <Link
              href="/products"
              className="w-full sm:w-auto font-playfair font-medium flex items-center justify-center gap-3 text-[18px] md:text-[22px] text-brand-text bg-[#F1E1C2] py-4 md:py-4 px-10 md:px-10 transition-all hover:bg-[#e9d5ab] group"
            >
              Explore Products <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#"
              className="w-full sm:w-auto font-playfair font-medium flex items-center justify-center gap-3 text-[18px] md:text-[22px] text-[#F1E1C2] border-2 border-[#F1E1C2] py-4 md:py-4 px-10 md:px-10 transition-all hover:bg-[#F1E1C2] hover:text-brand-text group"
            >
              Explore Services <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Part: Mobile Action Buttons (Visible only on mobile) */}
      <div className="md:hidden w-full py-8 px-4 bg-[#F7F5F2] flex flex-row gap-3">
        <a
          href="#"
          className="flex-1 bg-[#f0e4cf] py-4 px-2 flex items-center justify-center gap-2 text-[#1A1A1A] font-playfair text-[18px] shadow-sm border border-black/5"
        >
          Explore Products <MoveRight size={18} strokeWidth={1.2} />
        </a>
        <a
          href="#"
          className="flex-1 bg-[#f0e4cf] py-4 px-2 flex items-center justify-center gap-2 text-[#1A1A1A] font-playfair text-[18px] shadow-sm border border-black/5"
        >
          Explore Services <MoveRight size={18} strokeWidth={1.2} />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
