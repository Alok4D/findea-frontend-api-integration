import React from "react";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { useGetProductBySlugQuery } from "@/lib/redux/api/productApi";

interface QuickViewModalProps {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ slug, isOpen, onClose }: QuickViewModalProps) => {
  const { data: product, isLoading } = useGetProductBySlugQuery(slug, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {isLoading || !product ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : (
          <>
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto">
              <Image
                src={product.imageUrl || "https://images.unsplash.com/photo-1680039211156-66c721b87625?q=80&w=690&auto=format&fit=crop"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <span className="text-[13px] text-gray-500 font-playfair uppercase tracking-wider mb-2">
                {product.category?.name}
              </span>
              <h2 className="text-[24px] md:text-[32px] font-playfair font-bold text-[#1C1C1C] mb-4">
                {product.name}
              </h2>
              <div className="text-[20px] font-bold text-[#1C1C1C] mb-6">
                ${product.price}
              </div>
              <p className="text-[14px] md:text-[15px] text-gray-600 font-playfair mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="space-y-4 mt-auto">
                <button className="w-full bg-black text-white py-4 font-bold tracking-widest text-[13px] uppercase hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
                <div className="text-center text-[13px] text-gray-500">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuickViewModal;
