"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronRight } from "lucide-react";
import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";
import Navbar from "../_components/Navbar";
import Container from "@/components/shared/Container";
import SearchHeader from "./_components/SearchHeader";
import SearchSidebar from "./_components/SearchSidebar";
import SearchSortBar from "./_components/SearchSortBar";
import SearchProductGrid from "./_components/SearchProductGrid";
import SearchProductGridSkeleton from "./_components/SearchProductGridSkeleton";
import SearchPageSkeleton from "./_components/SearchPageSkeleton";
import SearchPagination from "./_components/SearchPagination";
import { useGetProductsQuery } from "@/lib/redux/api/productApi";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [availability, setAvailability] = useState<string[]>(["In Stock"]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("");

  const tabs = ["All", "Products", "Services", "Boutiques", "Registries"];

  const tabToTypeMap: Record<string, string> = {
    "Products": "PRODUCT",
    "Services": "SERVICE",
    "Boutiques": "BOUTIQUE",
    "Registries": "REGISTRY"
  };

  const { data, isFetching, isLoading } = useGetProductsQuery({
    search: query,
    page: currentPage,
    limit: itemsPerPage,
    ...(activeTab !== "All" && { type: tabToTypeMap[activeTab] }),
    ...(selectedCategories.length > 0 && { category: selectedCategories.join(",") }),
    ...(selectedLocations.length > 0 && { location: selectedLocations.join(",") }),
    ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
    ...(priceRange[1] > 0 && { maxPrice: priceRange[1] }),
    ...(selectedRating !== null && { minRating: selectedRating }),
    ...(availability.includes("In Stock") && !availability.includes("Booked") && { inStock: true, booked: false }),
    ...(!availability.includes("In Stock") && availability.includes("Booked") && { inStock: false, booked: true }),
    ...(availability.includes("In Stock") && availability.includes("Booked") && { inStock: true, booked: true }),
    ...(sortOption && { sortBy: sortOption }),
  });

  const totalPages = data?.totalPages || 1;
  const productsCount = data?.total || 0;


  const displayProducts = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((product: any) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category?.name || "Uncategorized",
      description: product.description || "",
      price: `$${product.price}`,
      image: product.imageUrl || "https://images.unsplash.com/photo-1597354984706-fac992d9306f?q=80&w=688&auto=format&fit=crop",
      type: product.type || "Product",
      buttonText: "View Details",
    }));
  }, [data]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, activeTab, selectedCategories, selectedLocations, priceRange, availability, selectedRating, sortOption, itemsPerPage]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <LandingTopAnnouncementBar />
        <Navbar />
        <SearchPageSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <LandingTopAnnouncementBar />
      <Navbar />

      <SearchHeader 
        query={query} 
        resultsCount={productsCount} 
        onBack={() => router.back()} 
      />

      <div className="bg-background py-12 md:py-20 relative">
        {/* Floating Filter Tab Button for Mobile */}
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-[#A3A3A3] text-white pl-3 pr-5 py-4 rounded-r-full shadow-lg hover:bg-gray-500 transition-all active:scale-95 flex items-center justify-center"
          aria-label="Open Filters"
        >
          <Filter size={22} strokeWidth={1.5} />
        </button>

        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm"
                  />
                  <motion.aside
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[70] lg:hidden overflow-y-auto p-6 shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                      <h3 className="text-lg font-bold tracking-widest uppercase">Filters</h3>
                      <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-full"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <SearchSidebar 
                      activeType={activeTab} 
                      setActiveType={setActiveTab} 
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      availability={availability}
                      setAvailability={setAvailability}
                      selectedRating={selectedRating}
                      setSelectedRating={setSelectedRating}
                      selectedLocations={selectedLocations}
                      setSelectedLocations={setSelectedLocations}
                    />
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-[280px] flex-shrink-0">
               <SearchSidebar 
                activeType={activeTab} 
                setActiveType={setActiveTab} 
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                availability={availability}
                setAvailability={setAvailability}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
               />
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow">
               <SearchSortBar 
                 viewMode={viewMode} 
                 setViewMode={setViewMode} 
                 itemsPerPage={itemsPerPage}
                 setItemsPerPage={setItemsPerPage}
                 sortOption={sortOption}
                 setSortOption={setSortOption}
               />

               {/* Tabs */}
               <div className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-100">
                 {/* {tabs.map((tab) => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-3 px-6 py-3 border transition-all whitespace-nowrap uppercase tracking-widest text-[12px] ${
                      activeTab === tab 
                        ? 'bg-[#F1EADA] border-[#D4C3A3] font-bold text-black' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-black'
                    }`}
                   >
                     <span>{tab}</span>
                     <ChevronRight size={14} className={`rotate-90 transition-opacity ${activeTab === tab ? 'opacity-100' : 'opacity-30'}`} />
                   </button>
                 ))} */}
                 <button 
                   onClick={() => {
                     setActiveTab("All");
                     setSelectedCategories([]);
                     setPriceRange([0, 0]);
                     setAvailability(["In Stock"]);
                     setSelectedRating(null);
                     setSelectedLocations([]);
                     setSortOption("");
                     setCurrentPage(1);
                   }}
                   className="px-6 py-3 border border-gray-200 bg-[#F1EADA] text-[12px] font-bold uppercase tracking-widest ml-auto hover:bg-[#EAE0CD] transition-colors shadow-sm"
                 >
                   Clear Filter
                 </button>
               </div>

               {isFetching ? (
                 <SearchProductGridSkeleton viewMode={viewMode} itemsPerPage={itemsPerPage} />
               ) : (
                 <SearchProductGrid 
                   products={displayProducts} 
                   viewMode={viewMode} 
                   query={query} 
                 />
               )}

               <SearchPagination 
                 currentPage={currentPage} 
                 totalPages={totalPages} 
                 onPageChange={setCurrentPage} 
               />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex flex-col">
        <LandingTopAnnouncementBar />
        <Navbar />
        <SearchPageSkeleton />
      </main>
    }>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
