import React from 'react';
import Image from 'next/image';

const ChristmasCollection = () => {
  return (
    <section className="w-full flex flex-col md:relative md:h-[734px] overflow-hidden">
      {/* Top Part: Images (Mobile & Desktop) */}
      <div className="relative h-[450px] md:h-full w-full overflow-hidden flex md:block">
        {/* Mobile: 3-Image Display */}
        <div className="flex w-full h-full md:hidden">
          <div className="w-[100%] relative h-full border-x border-white/10">
            <Image src="/service-img/Gemini_Generated_Image_oi9zpaoi9zpaoi9z.png" alt="Main Image" fill className="object-cover" />
          </div>
        </div>

        {/* Desktop: Single Background Image */}
        <div className="hidden md:block absolute inset-0">
          <Image src="/service-img/Gemini_Generated_Image_oi9zpaoi9zpaoi9z.png" alt="Christmas Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* Desktop Central Box */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center z-10">
          <div className="w-[450px] py-16 px-10 bg-white/20 backdrop-blur-xs border border-white/30 text-center shadow-2xl">
            <h2 className="text-3xl font-playfair text-[#1A1A1A] mb-4 uppercase tracking-[0.2em]">CHRISTMAS COLLECTION</h2>
            <p className="text-lg font-playfair italic text-[#1A1A1A] mb-8">High Quality Gifts Just For You</p>
            <button className="bg-[#f0e4cf] text-black px-12 py-4 text-sm font-medium hover:bg-[#e5d8bc] transition-all tracking-[0.1em] shadow-sm uppercase">Discover Now</button>
          </div>
        </div>
      </div>

      {/* Bottom Part: Content (Visible only on Mobile) */}
      <div className="md:hidden w-full py-12 px-6 bg-[#F7F5F2] text-center">
        <h2 className="text-2xl font-playfair text-[#1A1A1A] mb-3 uppercase tracking-[0.1em] leading-tight">
          CHRISTMAS COLLECTION
        </h2>
        <p className="text-sm font-playfair text-gray-700 mb-8 italic">
          High Quality Gifts Just For You
        </p>
        <button className="bg-[#f0e4cf] text-black px-14 py-4 text-sm font-playfair shadow-sm hover:brightness-95 transition-all">
          Discover Now
        </button>
      </div>
    </section>

  );
};

export default ChristmasCollection;