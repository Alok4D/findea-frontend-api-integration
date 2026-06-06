"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../_components/Footer';
import Newsletter from '../_components/Newsletter';
import Navbar from '../_components/Navbar';
import LandingTopAnnouncementBar from '../_components/LandingTopAnnouncementBar';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
// Playfair Display ফন্ট ইম্পোর্ট
import { Playfair_Display } from 'next/font/google'; 
import { 
  FiSearch, 
  FiUser, 
  FiHeart, 
  FiShoppingCart, 
  FiChevronDown, 
  FiMenu,
  FiX 
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

// ফন্ট কনফিগারেশন
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
});

const TrackOrderPage = () => {
  // মেনু এবং ড্রপডাউন স্টেট
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (name: string) => {
  setOpenDropdown(openDropdown === name ? "" : name);
};

  return (
    <div className={`${playfair.className} w-full bg-[#fdfaf5] min-h-screen relative overflow-x-hidden`}>
      
      {/* --- MOBILE HAMBURGER MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)}></div>
        
        <div className={`relative w-[280px] h-full bg-[#d3cec4] shadow-xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } p-6 overflow-y-auto`}>
          
          <div className="flex justify-between items-center mb-6">
            <Image src="/findea1.png" alt="Logo" width={90} height={30} className="object-contain" />
            <FiX size={24} className="text-gray-700 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>

          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Type here..." 
              className="w-full bg-white py-2 px-4 pr-10 text-sm focus:outline-none rounded-none italic border-none"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>

          <nav className="flex flex-col gap-5 text-gray-800 tracking-widest text-[14px] uppercase">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
            
            {/* PRODUCTS */}
            <div>
              <button onClick={() => toggleDropdown('products')} className="w-full flex justify-between items-center uppercase">
                PRODUCTS <FiChevronDown className={openDropdown === 'products' ? 'rotate-180' : ''} />
              </button>
              {openDropdown === 'products' && (
                <ul className="pl-5 mt-3 space-y-3 text-[13px] italic text-gray-700 normal-case">
                  <li><Link href="#">Featured</Link></li>
                  <li><Link href="#">New Arrivals</Link></li>
                  <li><Link href="#">Best Sellers</Link></li>
                  <li><Link href="#">Collection</Link></li>
                </ul>
              )}
            </div>
            
            {/* REGISTRIES */}
            <div>
              <button onClick={() => toggleDropdown('registries')} className="w-full flex justify-between items-center uppercase">
                REGISTRIES <FiChevronDown className={openDropdown === 'registries' ? 'rotate-180' : ''} />
              </button>
              {openDropdown === 'registries' && (
                <ul className="pl-5 mt-3 space-y-3 text-[13px] italic text-gray-700 normal-case">
                  <li><Link href="#">Wedding Registry</Link></li>
                  <li><Link href="#">Baby Registry</Link></li>
                  <li><Link href="#">Find a Registry</Link></li>
                </ul>
              )}
            </div>

            {/* SERVICES */}
            <div>
              <button onClick={() => toggleDropdown('services')} className="w-full flex justify-between items-center uppercase">
                SERVICES <FiChevronDown className={openDropdown === 'services' ? 'rotate-180' : ''} />
              </button>
              {openDropdown === 'services' && (
                <ul className="pl-5 mt-3 space-y-3 text-[13px] italic text-gray-700 normal-case">
                  <li><Link href="#">Wedding Services</Link></li>
                  <li><Link href="#">Baby & Family</Link></li>
                  <li><Link href="#">Home & Lifestyle</Link></li>
                  <li><Link href="#">Wellness & Beauty</Link></li>
                  <li><Link href="#">Photography</Link></li>
                </ul>
              )}
            </div>

            <Link href="/boutiques" onClick={() => setIsMenuOpen(false)}>BOUTIQUES</Link>
            <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="mt-2">Sign Up</Link>
          </nav>
        </div>
      </div>

      {/* --- 1. TOP BAR (Web Only) --- */}
      {/* <div className="hidden md:flex bg-white border-b border-gray-100 py-2 px-12 justify-between items-center text-[10px] tracking-[0.15em] uppercase text-gray-500">
        <div className="flex-1"></div>
        <div className="flex-2 text-center font-medium">Livraison gratuite pour toute commande de plus de 250 $</div>
        <div className="flex-1 flex justify-end gap-4">
          <FaFacebookF className="cursor-pointer hover:text-black transition-colors" />
          <FaInstagram className="cursor-pointer hover:text-black transition-colors" />
          <RiTwitterXFill className="cursor-pointer hover:text-black transition-colors" />
          <FaYoutube className="cursor-pointer hover:text-black transition-colors" />
        </div>
      </div> */}

      {/* --- 2. MAIN LOGO SECTION --- */}
      {/* <div className="bg-white px-4 md:px-12 py-4 md:py-5 flex items-center justify-between sticky top-0 z-50 shadow-sm md:shadow-none">
        <div className="w-1/4">
          <FiMenu size={24} className="md:hidden text-gray-700 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          <FiSearch size={20} className="hidden md:block text-gray-600 cursor-pointer hover:text-black" />
        </div>

        <div className="w-2/4 flex justify-center">
          <Image src="/findea1.png" alt="FINDEA Logo" width={110} height={35} className="object-contain md:w-[140px]" priority />
        </div>

        <div className="w-1/4 flex justify-end gap-4 items-center">
          <FiSearch size={22} className="md:hidden text-gray-700 cursor-pointer" />
          <FiUser size={20} className="hidden md:block text-gray-600 cursor-pointer hover:text-black" />
          <FiHeart size={20} className="hidden md:block text-gray-600 cursor-pointer hover:text-black" />
          <FiShoppingCart size={22} className="text-gray-700 md:text-gray-600 cursor-pointer hover:text-black" />
        </div>
      </div> */}

    <LandingTopAnnouncementBar />
     <Navbar />

      {/* --- 4. TRAPEZOID SECTION --- */}
      <section className="relative w-full flex justify-center mb-6 md:mb-10 px-4">
      {/* --- Inverted Trapezoid Background --- */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
        <div 
          className="bg-[#e2ddd3] w-full sm:w-[85%] md:w-[50%] lg:w-[40%] h-24 md:h-32"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)' }}
        ></div>
      </div>

      {/* --- Content Container --- */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-center min-h-[6rem] md:min-h-[8rem]">
        
        {/* Center Content: Home Link + Title */}
        <div className="flex flex-col items-center text-center px-2">
          <Link 
            href="/fr" 
            className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-600 hover:text-black transition-colors mb-1"
          >
            <span>Accueil</span> 
            <IoIosArrowForward className="text-[8px]" />
          </Link>
          
          <h1 className="text-lg sm:text-xl md:text-3xl font-serif text-[#1a1a1a] tracking-tight md:tracking-wider uppercase break-words">
            Suivre ma commande
          </h1>
        </div>

        {/* Right Side: Back Button (Responsive visibility) */}
        <div className="absolute right-0 hidden lg:block">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-[#1a1a1a] hover:opacity-60 transition-all"
          >
            <IoIosArrowBack className="text-[10px]" /> 
            <span>Retour à la page précédente</span>
          </button>
        </div>
      </div>
    </section>

    {/* --- TRACK ORDER FORM SECTION --- */}
<section className="w-full py-8 md:py-12 px-4 sm:px-6 md:px-12 lg:px-24">
  <div className="max-w-7xl mx-auto flex justify-start">
    {/* Main Content Wrapper - Aligned to Left */}
    <div className="w-full max-w-xl text-left">
      
      <h2 className="text-xl md:text-2xl font-serif text-[#1a1a1a] mb-4 leading-tight">
        Restez toujours informé de l'état de votre commande
      </h2>
      
      {/* Decorative Line */}
      <div className="w-full h-[1px] bg-neutral-600 mb-6"></div>

      <p className="text-xs md:text-sm text-neutral-500 leading-relaxed mb-8 font-light">
        Pour suivre votre commande, veuillez saisir votre numéro de commande dans la case ci-dessous et appuyer sur le bouton « Suivre ». Celui-ci vous a été communiqué sur votre reçu et dans l'e-mail de confirmation que vous avez dû recevoir.
      </p>

      <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Order ID Input */}
        <div>
          <label className="block text-sm font-serif text-[#1a1a1a] mb-2">
            Numéro de commande
          </label>
          <input 
            type="text" 
            placeholder="Found in your confirmation email."
            className="w-full bg-[#e2ddd3] border-none py-3 px-4 focus:ring-1 focus:ring-neutral-400 outline-none transition-all placeholder:text-neutral-400/60 text-sm"
          />
        </div>

        {/* Billing Email Input */}
        <div>
          <label className="block text-sm font-serif text-[#1a1a1a] mb-2">
            E-mail de facturation
          </label>
          <input 
            type="email" 
            placeholder="Email you used during checkout."
            className="w-full bg-[#e2ddd3] border-none py-3 px-4 focus:ring-1 focus:ring-neutral-400 outline-none transition-all placeholder:text-neutral-400/60 text-sm"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full sm:w-auto bg-[#efe1cc] text-[#1a1a1a] px-10 py-3 font-serif text-lg hover:bg-[#e2ddd3] transition-colors duration-300"
        >
          Suivre
        </button>
      </form>

    </div>
  </div>
</section>

      
             <Newsletter />
      <Footer /> 
    </div> 
  );
};
      
export default TrackOrderPage;