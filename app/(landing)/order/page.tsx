
"use client";

import React, { useState } from 'react'; // Added useState
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '../_components/Newsletter';
import { Playfair_Display } from 'next/font/google';
import Navbar from '../_components/Navbar';
import LandingTopAnnouncementBar from '../_components/LandingTopAnnouncementBar';

import { 
  FiSearch, FiUser, FiHeart, FiShoppingCart, 
  FiChevronDown, FiChevronLeft, FiMenu, FiX, FiGift // Added FiX and FiGift
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
});

const MyOrdersPage = () => {
  // 1. State for Mobile Menu
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (name: string) => {
  setOpenDropdown(openDropdown === name ? "" : name);
};

  return (
    <div className={`w-full bg-[#fdfaf5] min-h-screen pb-0 ${playfair.className}`}>
      
      {/* --- MOBILE HAMBURGER MENU --- */}
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
              className="w-full bg-white py-2 px-4 pr-10 text-sm focus:outline-none rounded-none italic"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>

          <nav className="flex flex-col gap-5 text-gray-800 tracking-widest text-[14px]">
            <Link href="/" className="uppercase">HOME</Link>
            <Link href="/about" className="uppercase">ABOUT</Link>
            
            <div>
              <button onClick={() => toggleDropdown('products')} className="w-full flex justify-between items-center uppercase">
                PRODUCTS <FiChevronDown className={openDropdown === 'products' ? 'rotate-180' : ''} />
              </button>
              {openDropdown === 'products' && (
                <ul className="pl-5 mt-3 space-y-3 text-[13px] italic text-gray-700">
                  <li><Link href="#">Featured</Link></li>
                  <li><Link href="#">New Arrivals</Link></li>
                  <li><Link href="#">Best Sellers</Link></li>
                  <li><Link href="#">Collection</Link></li>
                </ul>
              )}
            </div>
            
            <div>
              <button onClick={() => toggleDropdown('registries')} className="w-full flex justify-between items-center uppercase">
                REGISTRIES <FiChevronDown className={openDropdown === 'registries' ? 'rotate-180' : ''} />
              </button>
              {openDropdown === 'registries' && (
                <ul className="pl-5 mt-3 space-y-3 text-[13px] italic text-gray-700">
                  <li><Link href="#">Wedding Registry</Link></li>
                  <li><Link href="#">Baby Registry</Link></li>
                  <li><Link href="#">Find a Registry</Link></li>
                </ul>
              )}
            </div>

            <div>
              <button onClick={() => toggleDropdown('services')} className="w-full flex justify-between items-center uppercase">
                SERVICES <FiChevronDown className={openDropdown === 'services' ? 'rotate-180' : ''} />
              </button>
              {openDropdown === 'services' && (
                <ul className="pl-5 mt-3 space-y-3 text-[13px] italic text-gray-700">
                  <li><Link href="#">Wedding Services</Link></li>
                  <li><Link href="#">Baby & Family</Link></li>
                  <li><Link href="#">Home & Lifestyle</Link></li>
                  <li><Link href="#">Wellness & Beauty</Link></li>
                  <li><Link href="#">Photography</Link></li>
                </ul>
              )}
            </div>

            <Link href="/boutiques" className="uppercase">BOUTIQUES</Link>
            <Link href="/signup" className="uppercase mt-2">Sign Up</Link>
          </nav>
        </div>
      </div>

      {/* ==========================================
                    WEB VIEW 
          ========================================== */}
      <div className="hidden md:block">
        {/* ... Rest of your web view code remains exactly the same ... */}
        {/* <div className="bg-white border-b border-gray-100 py-2 px-4 md:px-12 flex justify-between items-center text-[10px] tracking-[0.15em] uppercase text-gray-500">
          <div className="hidden md:block flex-1"></div>
          <div className="flex-2 text-center font-medium">Livraison gratuite pour toute commande de plus de 250 $</div>
          <div className="flex-1 flex justify-end gap-4">
            <FaFacebookF className="cursor-pointer hover:text-black transition-colors" />
            <FaInstagram className="cursor-pointer hover:text-black transition-colors" />
            <RiTwitterXFill className="cursor-pointer hover:text-black transition-colors" />
            <FaYoutube className="cursor-pointer hover:text-black transition-colors" />
          </div>
        </div>

        <div className="bg-white px-4 md:px-12 py-5 flex items-center justify-between">
          <div className="w-1/4">
            <FiSearch size={20} className="text-gray-600 cursor-pointer hover:text-black" />
          </div>
          <div className="w-2/4 flex justify-center">
            <div className="relative">
               <Image src="/findea1.png" alt="FINDEA Logo" width={140} height={40} className="object-contain" />
            </div>
          </div>
          <div className="w-1/4 flex justify-end gap-5 items-center">
            <FiUser size={20} className="text-gray-600 cursor-pointer hover:text-black" />
            <FiHeart size={20} className="text-gray-600 cursor-pointer hover:text-black" />
            <FiShoppingCart size={20} className="text-gray-600 cursor-pointer hover:text-black" />
          </div>
        </div>

        <nav className="bg-white border-t border-b border-gray-200 py-3">
          <ul className="flex justify-center gap-8 text-[11px] font-semibold tracking-[0.18em] text-gray-700 uppercase">
            <li className="hover:text-black cursor-pointer">Accueil</li>
            <li className="hover:text-black cursor-pointer">À propos</li>
            <li className="hover:text-black cursor-pointer">Produits</li>
            <li className="hover:text-black cursor-pointer flex items-center gap-1">Registres <FiChevronDown size={14} /></li>
            <li className="hover:text-black cursor-pointer flex items-center gap-1">Services <FiChevronDown size={14} /></li>
            <li className="hover:text-black cursor-pointer">Boutiques</li>
          </ul>
        </nav> */}


        <LandingTopAnnouncementBar />
        <Navbar />

      <section className="relative w-full flex justify-center mb-2">
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
          <div 
            className="bg-[#e2ddd3] w-[85%] md:w-[45%] h-20 md:h-28"
            style={{ 
              clipPath: 'polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)' 
            }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-20 md:h-28 text-[#1a1a1a] px-4">
          <h1 className="text-lg md:text-2xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-center leading-tight">
            Mon compte
          </h1>
        </div>
      </section>

        <main className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-10">
          <aside className="w-full md:w-1/4 space-y-3">
            <button className="w-full bg-[#e5e1da] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#cfcbc4]">Informations personnelles</button>
            <button className="w-full bg-[#f2e6cf] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#d3c7ad]">Mes commandes</button>
            <button className="w-full bg-[#e5e1da] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#cfcbc4]">Mes listes</button>
            <button className="w-full bg-[#e5e1da] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#cfcbc4]">Gérer les adresses</button>
            <button className="w-full bg-[#e5e1da] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#cfcbc4]">Modes de paiement</button>
            <button className="w-full bg-[#e5e1da] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#cfcbc4]">Déconnexion</button>
          </aside>

          <section className="w-full md:w-3/4 bg-[#f1eeea] border border-[#e2dfd9] p-8">
            <div className="grid grid-cols-3 gap-y-8 mb-12">
              <div>
                <p className="text-[11px] uppercase font-bold text-gray-700 mb-1">ID de la commande</p>
                <p className="text-[15px] font-bold text-black tracking-tight">786334390</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-gray-700 mb-1">Paiement total</p>
                <p className="text-[15px] font-bold text-black tracking-tight">$680.00</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-gray-700 mb-1">État du paiement</p>
                <p className="text-[15px] font-bold text-black tracking-tight">Paid</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-gray-700 mb-1">Mode de paiement</p>
                <p className="text-[15px] font-bold text-black tracking-tight">Wave</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-gray-700 mb-1">Mode de livraison</p>
                <p className="text-[15px] font-bold text-black tracking-tight">Delivery</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-gray-700 mb-1">Livraison estimée</p>
                <p className="text-[15px] font-bold text-black tracking-tight">786334590</p>
              </div>
            </div>

            <hr className="border-[#e2dfd9] mb-8" />

            {['ARTISAN & CO.', 'RAMORA'].map((brand, bIndex) => (
              <div key={brand} className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[16px] font-bold tracking-widest uppercase">{brand}</h3>
                  <span className="text-[12px] uppercase font-bold underline cursor-pointer">Voir les détails de la commande</span>
                </div>
                <div className="space-y-4">
                  {(bIndex === 0 ? [1, 2] : [1]).map((_, i) => (
                    <div key={i} className="flex gap-6 bg-[#e5e1da] border border-[#d8d5ce] p-4">
                      <div className="w-20 h-20 bg-white overflow-hidden flex-shrink-0">
                         <Image src="/lady.png" alt="product" width={80} height={80} className="object-cover h-full" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[14px] font-bold text-black mb-1">Ant Studded Collar Shirt</p>
                        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tighter">Couleur : Marron | Taille : XXL | Qté : 4</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#e2dfd9]">
              <button className="bg-[#f2e6cf] border border-[#d3c7ad] px-10 py-3 text-[13px] font-bold uppercase tracking-[0.15em]">Suivre la commande</button>
              <button className="bg-transparent border border-black px-10 py-3 text-[13px] font-bold uppercase tracking-[0.15em]">Demande d'annulation</button>
            </div>
          </section>
        </main>
      </div>

      {/* ==========================================
                          MOBILE VIEW 
          ========================================== */}
      <div className="md:hidden pb-0">
        {/* <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100"> */}
          {/* 2. Added onClick to trigger state */}
          {/* <FiMenu size={24} className="text-black cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          <div className="flex-1 flex justify-center translate-x-3">
            <Image src="/findea1.png" alt="Logo" width={100} height={35} className="object-contain" priority />
          </div>
          <div className="flex gap-4">
            <FiSearch size={22} className="text-black cursor-pointer" />
            <FiShoppingCart size={22} className="text-black cursor-pointer" />
          </div>
        </header> */}

        <Navbar />

        {/* ... Rest of your mobile content remains exactly the same ... */}
        <section className="relative w-full flex justify-center mb-2">
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
          <div 
            className="bg-[#e2ddd3] w-[85%] h-20"
            style={{ 
              clipPath: 'polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)' 
            }}
          ></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-20 text-[#1a1a1a] px-4">
          <h1 className="text-lg font-bold tracking-[0.1em] uppercase text-center leading-tight">
            Mon compte
          </h1>
        </div>
      </section>

        <div className="w-full overflow-x-auto flex gap-3 px-4 py-8 bg-transparent custom-scrollbar">
          <button className="flex-shrink-0 bg-[#d1cbc1] text-black px-6 py-4 text-[13px] uppercase font-bold tracking-tight whitespace-nowrap">
            Infos personnelles
          </button>
          <button className="flex-shrink-0 bg-[#f2e6cf] text-black px-8 py-4 text-[13px] uppercase font-bold tracking-tight whitespace-nowrap border border-[#d3c7ad]">
            Mes commandes
          </button>
          <button className="flex-shrink-0 bg-[#d1cbc1] text-black px-6 py-4 text-[13px] uppercase font-bold tracking-tight whitespace-nowrap">
            Mes listes
          </button>
          <button className="flex-shrink-0 bg-[#d1cbc1] text-black px-6 py-4 text-[13px] uppercase font-bold tracking-tight whitespace-nowrap">
            Gérer les adresses
          </button>
        </div>

        {/* ... (The rest of your code continues) ... */}
        <div className="px-4 mt-8">
          <div className="bg-[#fdfaf5] border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-[#d1cbc1] px-5 py-4">
              <h2 className="text-[17px] text-black tracking-wide">
                ID de la commande: 6478463990
              </h2>
            </div>

            <div className="px-5 py-2">
              {[
                { label: 'Total Payment', value: '$150' },
                { label: 'Payment Method', value: 'Wave' },
                { label: 'Payment Status', value: 'Paid' },
                { label: 'Delivery Method', value: 'Delivery' },
                { label: 'Estimated Delivery Date', value: '03/04/2026' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-5 border-b border-gray-200 last:border-0">
                  <span className="text-[16px] text-gray-800 font-medium">{item.label}</span>
                  <span className="text-[16px] text-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 mt-10">
          <div className="flex justify-between items-baseline border-b border-black pb-2 mb-6">
            <h3 className="text-[20px] font-bold tracking-widest uppercase text-black">
              ARTISAN & CO.
            </h3>
            <span className="text-[13px] uppercase font-bold underline cursor-pointer">
              Voir les détails
            </span>
            
          </div>

          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex gap-4 bg-[#e5e1da] border border-[#d8d5ce] p-4 items-center">
                <div className="w-24 h-24 bg-white overflow-hidden flex-shrink-0 relative">
                  <Image src="/lady.png" alt="product" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[17px] font-bold text-black mb-1 leading-tight">
                    Ant Studded Collar Shirt
                  </p>
                  <p className="text-[13px] font-medium text-gray-700 uppercase tracking-tighter">
                    Couleur : Marron | Qté : 4
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mt-10 space-y-8">   
          {['RAMORA'].map((brand) => (
            <div key={brand}>
              <div className="flex justify-between items-baseline border-b border-black pb-2 mb-6">
                <h3 className="text-[22px] font-bold tracking-widest uppercase text-black">
                  {brand}
                </h3>
                <span className="text-[14px] italic underline cursor-pointer">
                  Voir les détails
                </span>
              </div>
              <div className="space-y-4">
                {[1].map((_, i) => (
                  <div key={i} className="flex gap-4 bg-[#e5e1da] border border-[#d8d5ce] p-4 items-center">
                    <div className="w-28 h-28 bg-white overflow-hidden flex-shrink-0 relative">
                      <Image src="/lady.png" alt="product" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[18px] font-bold text-black mb-1 leading-tight">
                        Ant Studded Collar Shirt
                      </p>
                      <p className="text-[14px] font-medium text-gray-700 uppercase tracking-tighter">
                        Couleur : Marron | Qté : 4
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4 px-4 pb-10">
          <button className="w-full bg-[#f2e6cf] border border-[#d3c7ad] py-5 text-[15px] font-bold uppercase tracking-[0.15em] text-black shadow-sm">
            Suivre la commande
          </button>
          <button className="w-full bg-white border border-black py-5 text-[15px] font-bold uppercase tracking-[0.15em] text-black">
            Demande d'annulation
          </button>
        </div>

        <Newsletter />

        <footer className="bg-[#f3f0ea] px-6 py-12 text-black">
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <Image src="/findea1.png" alt="Footer Logo" width={110} height={30} className="object-contain" />
              <p className="text-[15px] leading-relaxed text-gray-800">
                Etiam nulla nunc, aliquet vel metus nec, scelerisque tempus enim. Sed eget blandit lectus.
              </p>
              <div className="flex gap-6 text-xl text-gray-900">
                <FaFacebookF className="cursor-pointer" />
                <FaInstagram className="cursor-pointer" />
                <RiTwitterXFill className="cursor-pointer" />
                <FaYoutube className="cursor-pointer" />
              </div>
            </div>

                {/* ==========================================
      MOBILE ONLY FOOTER SECTION (LEFT ALIGNED)
    ========================================== */}
<footer className="md:hidden  py-6"> 
  <div className="flex flex-col items-start text-left space-y-12">
    
    {/* COMPANY SECTION */}
    <div className="w-full space-y-5">
      <h3 className="text-[18px] font-bold tracking-widest uppercase text-black">
        Company
      </h3>
      <ul className="space-y-4 text-[16px] text-gray-800 font-medium list-none p-0 m-0">
        <li className="cursor-pointer hover:text-black">About</li>
        <li className="cursor-pointer hover:text-black">Privacy Policy</li>
        <li className="cursor-pointer hover:text-black">Return & Refund Policy</li>
        <li className="cursor-pointer hover:text-black">Terms & Conditions</li>
        <li className="cursor-pointer hover:text-black">Contact Us</li>
      </ul>
    </div>

    {/* SERVICES SECTION */}
    <div className="w-full space-y-5">
      <h3 className="text-[18px] font-bold tracking-widest uppercase text-black">
        Services
      </h3>
      <ul className="space-y-4 text-[16px] text-gray-800 font-medium list-none p-0 m-0">
        <li className="cursor-pointer hover:text-black">Baby Registry</li>
        <li className="cursor-pointer hover:text-black">Wedding List</li>
        <li className="cursor-pointer hover:text-black">Offer A Service</li>
      </ul>
    </div>

    {/* CONTACTS SECTION */}
    <div className="w-full space-y-6">
      <h3 className="text-[18px] font-bold tracking-widest uppercase text-black">
        Contacts
      </h3>
      
      <div className="space-y-1">
        <p className="text-[16px] font-bold text-black">Email:</p>
        <p className="text-[16px] text-gray-800">test@test.com</p>
      </div>

      <div className="space-y-1">
        <p className="text-[16px] font-bold text-black">Phone</p>
        <p className="text-[16px] text-gray-800">0 000 000 000</p>
      </div>
    </div>

  </div>
</footer>
          </div>   
        </footer>  

        <div className="md:hidden bg-[#ccc7bc] py-5 flex justify-center items-center border-t border-gray-300 px-2">
          <p className="text-[2.5vw] min-text-[9px] text-gray-700 tracking-wider uppercase whitespace-nowrap">
            Copyright © 2026 Findea. Tous droits réservés.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; display: block; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; margin: 0 16px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cfc7b9; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cfc7b9 #f1f1f1; }
        
        @keyframes slide-in-from-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-in { animation: slide-in-from-left 0.3s ease-out; }
      `}</style>
      
    </div>
  );
};

export default MyOrdersPage; 
