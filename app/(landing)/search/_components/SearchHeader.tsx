"use client";

import Link from "next/link";

interface SearchHeaderProps {
  query: string;
  resultsCount: number;
  onBack: () => void;
}

const SearchHeader = ({ query, resultsCount, onBack }: SearchHeaderProps) => {
  return (
    <div className="bg-background pb-8 text-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center relative min-h-[180px]">
          {/* The Trapezoid Shape */}
          <div
            className="bg-[#EAE0CD] px-12 md:px-32 py-10 md:py-14 relative z-0"
            style={{ clipPath: 'polygon(12% 0, 88% 0, 100% 100%, 0 100%)' }}
          >
            <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3 font-medium">
              <Link href="/" className="hover:text-black">Home</Link>
              <span className="mx-1">&gt;</span>
              <span className="text-black font-bold">Search</span>
              <span className="mx-1">&gt;</span>
            </div>
            <h1 className="text-2xl md:text-[36px] tracking-tight font-playfair font-medium text-[#1C1C1C] uppercase tracking-[0.1em] whitespace-nowrap px-8">
              SEARCH RESULTS FOR "{query}"
            </h1>
          </div>

          {/* Return link positioned to the right */}
          <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-8 md:mt-0">
            <button
              onClick={onBack}
              className="text-[11px] uppercase tracking-[0.15em] text-gray-500 flex md:hidden lg:flex items-center gap-2 hover:text-black transition-colors font-medium"
            >
              <span className="text-[14px]">&lt;</span> Return to previous page
            </button>
          </div>
        </div>

        <div className="mt-12 mb-8 text-center">
          <h2 className="text-[22px] md:text-[24px] font-playfair text-[#1C1C1C]">
            {resultsCount} Products found
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
