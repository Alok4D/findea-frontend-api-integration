"use client";

import { ChevronRight, LayoutGrid, List } from "lucide-react";

interface SearchSortBarProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  itemsPerPage: number;
  setItemsPerPage: (num: number) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SearchSortBar = ({ viewMode, setViewMode, itemsPerPage, setItemsPerPage, sortOption, setSortOption }: SearchSortBarProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
      <div className="flex items-center gap-4">
        <div className="relative border border-gray-300 bg-white">
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none bg-transparent pl-4 pr-10 py-2.5 text-[12px] font-bold uppercase tracking-widest outline-none cursor-pointer"
          >
            <option value="">Default Sorting</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-gray-400" />
        </div>
        <div className="flex border border-gray-300 bg-white">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2.5 transition-colors ${viewMode === "grid" ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <LayoutGrid size={18} strokeWidth={1.5} />
          </button>
          <div className="w-[1px] h-full bg-gray-200"></div>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2.5 transition-colors ${viewMode === "list" ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <List size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Show</span>
        <div className="relative border border-gray-300 bg-white">
          <select 
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="appearance-none bg-transparent pl-4 pr-10 py-2.5 text-[12px] font-bold outline-none cursor-pointer"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
          <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;
