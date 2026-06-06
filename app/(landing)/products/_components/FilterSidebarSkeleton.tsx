import React from "react";

const FilterSidebarSkeleton = () => {
  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0 animate-pulse">
      {/* Category Section Skeleton */}
      <div className="border-b border-gray-200 pb-2 mb-6 flex justify-between items-center">
        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
      </div>

      <div className="space-y-4 mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>

      {/* Filter Sections Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            </div>
            
            {i === 1 && (
              <div className="mt-6 space-y-4">
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-full mb-10 mx-3"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebarSkeleton;
