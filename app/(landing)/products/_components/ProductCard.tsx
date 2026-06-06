import Image from "next/image";
import { Eye, Heart, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group">
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden mb-3 md:mb-6 bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </Link>
      
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[13px] text-gray-500 font-playfair uppercase tracking-wider">{product.category}</span>
          <div className="flex gap-3 text-gray-400">
             <button className="hover:text-black transition-colors"><Eye size={18} strokeWidth={1.5} /></button>
             <button className="hover:text-black transition-colors"><Heart size={18} strokeWidth={1.5} /></button>
          </div>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-[17px] md:text-[20px] font-playfair font-bold text-[#1C1C1C] mb-0.5 md:mb-1 hover:text-brand-text transition-colors">{product.name}</h3>
        </Link>
        <p className="text-[12px] md:text-[14px] text-gray-500 font-playfair mb-2 md:mb-3">{product.description}</p>
        <div className="text-[14px] md:text-[16px] font-bold text-[#1C1C1C] mb-3 md:mb-4">{product.price}</div>
        
        {product.hasGiftCard && (
          <button className="hidden md:flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
            Gift Card Instead <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
