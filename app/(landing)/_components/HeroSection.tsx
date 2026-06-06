"use client";
import { Search, MoveRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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

          <form 
            onSubmit={handleSearch}
            className="w-full max-w-[850px] bg-white text-black py-5 px-8 flex items-center justify-between shadow-sm rounded-none"
          >
            <input
              type="text"
              placeholder="Search a product, a boutique or a service...."
              className="w-full bg-transparent border-none outline-none text-[13px] md:text-[18px] font-normal text-gray-800 placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <Search size={22} strokeWidth={1} className="text-gray-900 cursor-pointer" />
            </button>
          </form>

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
