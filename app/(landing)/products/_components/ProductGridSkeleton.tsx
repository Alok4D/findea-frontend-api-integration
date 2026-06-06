import React from "react";

interface ProductGridSkeletonProps {
  viewMode: "grid" | "list";
}

const ProductGridSkeleton = ({ viewMode }: ProductGridSkeletonProps) => {
  // Array of 6 to show multiple skeleton cards
  const skeletons = Array.from({ length: 6 });

  return (
    <div
      className={`grid gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16 ${
        viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      }`}
    >
      {skeletons.map((_, i) => (
        <div key={i} className="group flex flex-col">
          {/* Image Skeleton */}
          <div className="relative aspect-[4/5] overflow-hidden mb-3 md:mb-6 bg-gray-200 animate-pulse w-full"></div>

          <div className="flex flex-col flex-1">
            {/* Category and Icons */}
            <div className="flex justify-between items-center mb-2">
              <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Title */}
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            
            {/* Description */}
            <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-3 md:mb-4 animate-pulse"></div>

            {/* Price */}
            <div className="h-5 bg-gray-200 rounded w-1/4 mt-auto mb-3 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
