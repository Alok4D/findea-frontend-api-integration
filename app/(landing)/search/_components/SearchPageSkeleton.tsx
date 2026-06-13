import React from 'react';
import Container from "@/components/shared/Container";
import FilterSidebarSkeleton from "../../products/_components/FilterSidebarSkeleton";
import SearchProductGridSkeleton from "./SearchProductGridSkeleton";

const SearchPageSkeleton = () => {
  return (
    <div className="animate-pulse bg-background min-h-screen">
      {/* Skeleton Header */}
      <div className="bg-background pb-8 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-center relative min-h-[180px]">
            <div
              className="bg-gray-200 px-12 md:px-32 py-10 md:py-14 relative z-0 w-[400px] md:w-[600px] h-[120px]"
              style={{ clipPath: 'polygon(12% 0, 88% 0, 100% 100%, 0 100%)' }}
            ></div>
          </div>
          <div className="mt-12 mb-8 flex justify-center">
             <div className="h-8 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-12 pb-20">
          {/* Sidebar */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
             <FilterSidebarSkeleton />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full max-w-[900px] mx-auto lg:mx-0">
            {/* Sort Bar Skeleton */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
               <div className="flex gap-2">
                 <div className="h-10 w-10 bg-gray-200 rounded"></div>
                 <div className="h-10 w-10 bg-gray-200 rounded"></div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="h-8 w-32 bg-gray-200 rounded"></div>
                 <div className="h-8 w-32 bg-gray-200 rounded"></div>
               </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-2 mb-12">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="h-10 w-24 bg-gray-200 rounded"></div>
               ))}
               <div className="h-10 w-32 bg-gray-200 rounded ml-auto"></div>
            </div>

            {/* Grid Skeleton */}
            <SearchProductGridSkeleton viewMode="grid" itemsPerPage={6} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPageSkeleton;
