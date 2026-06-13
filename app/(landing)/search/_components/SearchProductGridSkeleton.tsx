import React from 'react';

const SearchProductGridSkeleton = ({ viewMode, itemsPerPage = 6 }: { viewMode: "grid" | "list", itemsPerPage?: number }) => {
  return (
    <div className={`grid gap-x-8 gap-y-16 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {[...Array(itemsPerPage)].map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse">
          <div className="relative aspect-4/5 bg-gray-200 mb-6"></div>
          
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="flex gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
            
            <div className="mt-auto h-12 bg-gray-200 w-full shadow-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchProductGridSkeleton;
