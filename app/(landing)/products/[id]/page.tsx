"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import LandingTopAnnouncementBar from "../../_components/LandingTopAnnouncementBar";
import Navbar from "../../_components/Navbar";
import Container from "@/components/shared/Container";
import productData from "@/data/products.json";
import { Product } from "@/types/product";
import { ChevronRight, Star, Heart, Minus, Plus, Gift, Eye, MapPin, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RegistrySelectModal } from "../_components/RegistrySelectModal";
import { RegistrySuccessModal } from "../_components/RegistrySuccessModal";
import type { RegistryModalStep, RegistryOption } from "@/types/registry-modal";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [registryModalStep, setRegistryModalStep] = useState<RegistryModalStep>("closed");
    const [selectedRegistryId, setSelectedRegistryId] = useState<string | null>(null);
    const [activeRegistryName, setActiveRegistryName] = useState("Sarah & Johnson's Wedding");

    const registryOptions = useMemo<RegistryOption[]>(
        () => [
            { id: "sarah", name: "Sarah & Johnson's Wedding" },
            { id: "emma", name: "Emma's Baby Shower" },
            { id: "home", name: "Chen Family — Home Essentials" },
        ],
        []
    );

    const closeRegistryModals = useCallback(() => {
        setRegistryModalStep("closed");
        setSelectedRegistryId(null);
    }, []);

    const confirmAddToSelectedRegistry = () => {
        if (!selectedRegistryId) return;
        const opt = registryOptions.find((o) => o.id === selectedRegistryId);
        if (opt) setActiveRegistryName(opt.name);
        setRegistryModalStep("success");
        setSelectedRegistryId(null);
    };

    useEffect(() => {
        if (registryModalStep === "closed") return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeRegistryModals();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [registryModalStep, closeRegistryModals]);

    const product = useMemo(() => {
        return productData.products.find(p => p.id === Number(id));
    }, [id]);

    if (!product) {
        return (
            <main className="min-h-screen bg-white">
                <LandingTopAnnouncementBar />
                <Navbar />
                <div className="flex flex-col items-center justify-center py-40">
                    <h1 className="text-3xl font-playfair mb-4">Product Not Found</h1>
                    <Link href="/products" className="text-brand-text font-bold uppercase tracking-widest hover:underline">
                        Back to products
                    </Link>
                </div>
            </main>
        );
    }

    // Use product image as the first image in gallery
    const images = [
        product.image,
        "https://images.unsplash.com/photo-1594932224491-fa7133f73bba?q=80&w=1928&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539109132381-31a15b2974ea?q=80&w=1887&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1720&auto=format&fit=crop"
    ];

    const relatedProducts = [
        {
            id: 2,
            name: "Hope Power Dress",
            price: "$300.00",
            oldPrice: "$400.00",
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=708&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Hope Power Dress",
            price: "$300.00",
            oldPrice: "$400.00",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=687&auto=format&fit=crop"
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            <LandingTopAnnouncementBar />
            <Navbar />

            {/* Product Breadcrumb Header */}
            <div className="bg-background pb-12 text-center relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-center relative">
                        {/* The Trapezoid Shape */}
                        <div 
                            className="bg-[#EAE0CD] px-12 md:px-24 py-8 relative z-0"
                            style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}
                        >
                            <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                                <Link href="/" className="hover:text-black">Home</Link>
                                <span className="mx-1">&gt;</span>
                                <Link href="/products" className="hover:text-black">Woman</Link>
                                <span className="mx-1">&gt;</span>
                                <span className="text-black font-bold">Blouse</span>
                            </div>
                        </div>

                        {/* Return link positioned to the right */}
                        <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-8 md:mt-0">
                            <button 
                                onClick={() => router.back()}
                                className="text-[11px] uppercase tracking-[0.15em] text-gray-500 flex items-center gap-2 hover:text-black transition-colors font-medium"
                            >
                                <span className="text-[14px]">&lt;</span> Return to previous page
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" p-4 md:p-12 text-[#2a2a2a]">
      <div className="max-w-7xl mx-auto  p-6 md:p-10">
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-4 space-y-4">
            <div className="aspect-[3/4] overflow-hidden ">
              <img 
                src="/product-details-img/Rectangle 4480 (1).png" 
                alt="Main Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-[#DEDAD2] overflow-hidden cursor-pointer">
                  <img src="/product-details-img/Rectangle 4483.png" alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Center: Product Info */}
          <div className="lg:col-span-5 space-y-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-serif">Contemporary Surplice Top</h1>
              <p className="text-2xl font-medium">$500.00</p>
            </header>

            <div className="text-sm leading-relaxed text-gray-600 space-y-4 border-b pb-6">
              <p>Our mission is to make discovering premium products and reliable services simple and enjoyable...</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Our mission is to make discovering premium products</li>
                <li>Our mission is to make discovering premium</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <select className="w-full p-2 border border-gray-300 bg-transparent rounded-none focus:outline-none focus:ring-1 focus:ring-black">
                  <option>choose an option</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <select className="w-full p-2 border border-gray-300 bg-transparent rounded-none focus:outline-none focus:ring-1 focus:ring-black">
                  <option>choose an option</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 py-4">
                <div className="flex border border-gray-300">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-brand-beige"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-x border-gray-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-brand-beige"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#EFE3C9] text-black py-3 px-6 hover:bg-[#e5d4b0] transition-colors">
                  Add To Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                      setSelectedRegistryId(null);
                      setRegistryModalStep("select");
                  }}
                  className="border border-gray-300 py-3 px-6 hover:bg-gray-50 transition-colors"
                >
                  Add To Registry
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Gift size={16} /> {"Can't decide?"}{" "}
                <span className="underline cursor-pointer">Send a Gift Card Instead</span>
              </p>
              <button className="flex items-center gap-2 text-gray-700 hover:text-black">
                <Heart size={16} /> Add to wishlist
              </button>
              <div className="pt-4 border-t space-y-1 text-gray-500">
                <p>Category: <span className="text-black">Woman</span></p>
                <p>Tag: <span className="text-black">Look3</span></p>
                <p>SKU: <span className="text-black">2355678</span></p>
              </div>
            </div>
          </div>

          {/* Right: Sidebar / Recommendations */}
          <div className="lg:col-span-3 border-l border-gray-200 pl-8 hidden lg:block">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-gray-500">Cartier</p>
              <h2 className="text-xl font-serif mt-2">Cartier Logo</h2>
              <button className="text-[10px] underline mt-1">View All Products</button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs font-bold tracking-tighter">YOU MAY ALSO LIKE...</span>
                <div className="flex gap-2">
                  <ChevronLeft size={14} className="cursor-pointer" />
                  <ChevronRight size={14} className="cursor-pointer" />
                </div>
              </div>
              
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4 group cursor-pointer">
                  <div className="w-20 h-24 bg-[#DEDAD2] flex-shrink-0">
                    <img src="/product-details-img/Rectangle 4483.svg" alt="Rec" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium">Hope Power D...</h3>
                    <p className="text-gray-400 line-through text-xs">$500.00</p>
                    <p className="font-bold">$400.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t">
          <div>
            <h2 className="text-3xl font-serif mb-6 underline decoration-1 underline-offset-8">Reviews</h2>
            <p className="text-gray-500 italic">There are no reviews yet.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif mb-4">
              Be the first to review &ldquo;Crew Sweatshirt&rdquo;
            </h2>
            <p className="text-xs text-gray-500 mb-6 italic">Your email address will not be published. Required fields are marked</p>
            
            <form className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-2">Your rating *</p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(15).fill(0).map((_, i) => <span key={i} className="text-xs">★</span>)}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your review *</label>
                <textarea className="w-full h-32 bg-[#DEDAD2] border-none p-4 focus:ring-1 focus:ring-black outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input type="text" className="w-full bg-[#DEDAD2] border-none p-3 focus:ring-1 focus:ring-black outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" className="w-full bg-[#DEDAD2] border-none p-3 focus:ring-1 focus:ring-black outline-none" />
                </div>
              </div>

              <button className="bg-[#EFE3C9] text-black py-2 px-10 hover:bg-[#e5d4b0] font-medium transition-all">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

            <RegistrySelectModal
                open={registryModalStep === "select"}
                onClose={closeRegistryModals}
                options={registryOptions}
                selectedId={selectedRegistryId}
                onSelect={setSelectedRegistryId}
                productName={product.name}
                onConfirm={confirmAddToSelectedRegistry}
            />

            <RegistrySuccessModal
                open={registryModalStep === "success"}
                onClose={closeRegistryModals}
                productName={product.name}
                registryName={activeRegistryName}
            />
        </main>
    );
};

export default ProductDetailsPage;

