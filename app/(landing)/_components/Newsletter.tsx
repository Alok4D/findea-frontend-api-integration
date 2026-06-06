// components/Newsletter.tsx
import React from 'react';
import Image from 'next/image';

const Newsletter = () => {
  return (
    <section className="md:hidden relative w-full h-[450px] flex items-center justify-center mt-10">
      <Image 
        src="/newsletter.png" 
        alt="Newsletter" 
        fill 
        className="object-cover brightness-75" 
        priority 
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center px-6 w-full max-w-lg">
        <h2 className="text-white text-3xl tracking-[0.1em] uppercase mb-4 leading-tight">
          ENTREZ DANS NOTRE UNIVERS
        </h2>
        <p className="text-white text-[15px] italic mb-10 leading-relaxed tracking-wide">
          Découvrez En Avant-Première Nos Nouvelles Collections Et Nos Trésors Exclusifs.
        </p>
        <div className="flex items-stretch justify-center gap-3 w-full h-[56px]">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="flex-grow min-w-0 bg-transparent border border-white px-5 text-white placeholder:text-white/60 focus:outline-none text-base" 
          />
          <button className="flex-shrink-0 px-6 h-full bg-[#f2e6cf] text-black font-bold uppercase tracking-widest text-[12px] transition-all hover:bg-[#e9dab9] whitespace-nowrap">
            S'abonner
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;