"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Heart, Star, MapPin, Search } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  type: string;
  buttonText: string;
  badge?: string;
  rating?: string;
  location?: string;
  tags?: string[];
  isFeaturedCollection?: boolean;
}

interface SearchProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  query: string;
}

const SearchProductGrid = ({ products, viewMode, query }: SearchProductGridProps) => {
  const router = useRouter();
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg">
        <Search size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-xl font-playfair text-gray-500 italic">No results found for "{query}"</p>
        <Link 
          href="/products"
          className="mt-6 inline-block text-brand-text font-bold uppercase tracking-widest text-sm hover:underline"
        >
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <div className={`grid gap-x-8 gap-y-16 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {products.map((item) => (
        <div key={item.id} className="group flex flex-col">
          <Link href={`/products/${item.id}`} className="relative aspect-4/5 bg-[#F7F5F2] mb-6 overflow-hidden block">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            
            {item.badge && (
              <div className="absolute top-4 right-4 bg-[#F1EADA]/90 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#1C1C1C] italic shadow-sm">
                {item.badge}
              </div>
            )}

            {item.isFeaturedCollection && (
              <div className="absolute top-4 left-4 text-[14px] font-playfair italic text-gray-800 bg-white/20 backdrop-blur-sm px-2 py-1">
                Featured Collection
              </div>
            )}
          </Link>
          
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] uppercase tracking-widest text-gray-400 font-medium">{item.category}</span>
              <div className="flex gap-3 text-gray-400">
                <Eye size={18} strokeWidth={1.5} className="hover:text-black cursor-pointer transition-colors" />
                <Heart size={18} strokeWidth={1.5} className="hover:text-black cursor-pointer transition-colors" />
              </div>
            </div>
            <Link href={`/products/${item.id}`}>
              <h3 className="text-[20px] font-playfair font-bold text-[#1C1C1C] mb-1 group-hover:text-brand-text transition-colors">{item.name}</h3>
            </Link>
            <p className="text-[14px] text-gray-500 mb-2 font-playfair leading-relaxed italic">{item.description}</p>
            
            {item.price && (
              <div className="text-[16px] font-bold text-[#1C1C1C] mb-3">{item.price}</div>
            )}

            {item.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest bg-gray-100 px-2 py-1 text-gray-600 font-bold border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {item.rating && (
              <div className="flex items-center gap-1.5 mb-3 pt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < 5 ? "#D4C3A3" : "none"} stroke={i < 5 ? "#D4C3A3" : "#D1D5DB"} />
                  ))}
                </div>
                <span className="text-[12px] font-bold text-gray-800 ml-1">4.9 <span className="font-normal text-gray-400">({item.rating.split('(')[1]}</span></span>
              </div>
            )}

            {item.location && (
              <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500 mb-6 uppercase tracking-widest">
                <MapPin size={14} className="text-gray-400" />
                <span>{item.location}</span>
              </div>
            )}

            <button 
              onClick={(e) => {
                e.preventDefault();
                if (item.buttonText === "Add To Cart") {
                  // Add to cart logic can be added here
                  console.log("Added to cart:", item.name);
                } else {
                  router.push(`/products/${item.id}`);
                }
              }}
              className="mt-auto w-full bg-[#F1EADA] py-4 text-[12px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 shadow-sm border border-[#D4C3A3]/30"
            >
              {item.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchProductGrid;
