"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";
import BreadcrumbHero from "./_components/BreadcrumbHero";
import ProductGrid from "./_components/ProductGrid";
import FilterSidebar from "./_components/FilterSidebar";
import SortBar from "./_components/SortBar";
import Pagination from "./_components/Pagination";
import Container from "@/components/shared/Container";
import productData from "@/data/products.json";
import { Product, Category } from "@/types/product";
import { Filter, X } from "lucide-react";

const ProductsPage = () => {
  const [activeSort, setActiveSort] = useState("Default Sorting");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedFilters, setExpandedFilters] = useState<string[]>(["FINDÉA COLLECTION", "Woman"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = productData.products as Product[];
  const categories = productData.categories as Category[];

  const toggleFilter = (filter: string) => {
    setExpandedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <main className="min-h-screen bg-white relative">
      <LandingTopAnnouncementBar />
      <Navbar />
      <BreadcrumbHero />

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="bg-[#999999] p-3 text-white shadow-lg flex items-center justify-center hover:bg-black transition-colors"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Mobile Filter Overlay/Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => setIsFilterOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[300px] bg-[#DEDAD2] transform transition-transform duration-300 overflow-y-auto ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>
            <FilterSidebar 
              categories={categories}
              expandedFilters={expandedFilters}
              toggleFilter={toggleFilter}
            />
          </div>
        </div>
      </div>

      <div className="bg-background pt-16 pb-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar 
                categories={categories}
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              />
            </div>

            <main className="flex-grow">
              <SortBar 
                activeSort={activeSort}
                setActiveSort={setActiveSort}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />

              <ProductGrid 
                products={products}
                viewMode={viewMode}
              />

              <Pagination currentPage={1} totalPages={10} />
            </main>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default ProductsPage;
