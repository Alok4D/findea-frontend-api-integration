import { useState } from "react";
import Image from "next/image";
import { Eye, Heart, ArrowRight, Loader2 } from "lucide-react";
import { ApiProduct } from "@/lib/redux/api/productApi";
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/lib/redux/api/wishlistApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { toast } from "react-hot-toast";
import Link from "next/link";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: ApiProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] = useRemoveFromWishlistMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });

  const wishlistedItem = wishlistData?.find((item: any) => item.productId === product.id);
  const isWishlisted = !!wishlistedItem;
  const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to wishlist", { id: "wishlist-auth-error" });
      return;
    }
    
    if (isWishlisted && wishlistedItem) {
      try {
        await removeFromWishlist(wishlistedItem.productId).unwrap();
        toast.success("Removed from wishlist");
      } catch (err: any) {
        if (err?.status !== 401 && err?.data?.message !== "Unauthorized") {
            console.error("Failed to remove from wishlist", err);
        }
      }
    } else {
      try {
        await addToWishlist(product.id).unwrap();
        toast.success("Added to wishlist successfully!");
      } catch (err: any) {
        if (err?.status !== 401 && err?.data?.message !== "Unauthorized" && err?.data?.message !== "Product already in wishlist") {
            console.error("Failed to add to wishlist", err);
        } else if (err?.data?.message === "Product already in wishlist") {
            toast.error("Product already in wishlist");
        }
      }
    }
  };
  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden mb-3 md:mb-6 bg-white">
        <Image
          src={product.imageUrl || "https://images.unsplash.com/photo-1680039211156-66c721b87625?q=80&w=690&auto=format&fit=crop"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </Link>
      
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[13px] text-gray-500 font-playfair uppercase tracking-wider">{product.category?.name}</span>
          <div className="flex gap-3 text-gray-400">
             <button 
               onClick={() => setIsQuickViewOpen(true)}
               className="hover:text-black transition-colors"
             >
               <Eye size={18} strokeWidth={1.5} />
             </button>
             <button 
               onClick={handleToggleWishlist}
               disabled={isWishlistLoading}
               className={`hover:text-black transition-colors disabled:opacity-50 ${isWishlisted ? "text-red-500 hover:text-red-600" : ""}`}
             >
               {isWishlistLoading ? <Loader2 size={18} strokeWidth={1.5} className="animate-spin" /> : <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />}
             </button>
          </div>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[17px] md:text-[20px] font-playfair font-bold text-[#1C1C1C] mb-0.5 md:mb-1 hover:text-brand-text transition-colors">{product.name}</h3>
        </Link>
        <p className="text-[12px] md:text-[14px] text-gray-500 font-playfair mb-2 md:mb-3">{product.description}</p>
        <div className="text-[14px] md:text-[16px] font-bold text-[#1C1C1C] mb-3 md:mb-4">${product.price}</div>
      </div>
      
      <QuickViewModal 
        slug={product.slug} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </div>
  );
};

export default ProductCard;
