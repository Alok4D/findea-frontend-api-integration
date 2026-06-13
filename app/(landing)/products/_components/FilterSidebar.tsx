import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { ApiCategory } from "@/lib/redux/api/productApi";

interface FilterSidebarProps {
  categories: ApiCategory[];
  expandedFilters: string[];
  toggleFilter: (filter: string) => void;
  activeCategory: string;
  setCategory: (slug: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const FilterSidebar = ({ categories, expandedFilters, toggleFilter, activeCategory, setCategory, priceRange, setPriceRange }: FilterSidebarProps) => {

  const filterSections = [
    "PRICE",
    // "DISPONIBILITÉ",
    // "OCCASION",
    // "MATIÈRE",
    // "COULEUR",
    // "STYLE",
    // "ÂGE",
    // "ORIGINE",
  ];

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0">
      <div className="border-b border-black pb-2 mb-6 flex justify-between items-center group cursor-pointer" 
           onClick={() => toggleFilter("FINDÉA COLLECTION")}>
        <h2 className="text-[16px] font-bold tracking-widest uppercase">FINDÉA COLLECTION</h2>
        {expandedFilters.includes("FINDÉA COLLECTION") ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
      </div>

      {expandedFilters.includes("FINDÉA COLLECTION") && (
        <ul className="space-y-4 mb-10">
          <li className="font-playfair">
            <div className="flex items-center group cursor-pointer"
                 onClick={() => setCategory("")}>
              <span className={`text-[15px] flex-1 ${!activeCategory ? 'font-bold' : 'text-gray-800'}`}>
                All Products
              </span>
              {!activeCategory && <Check size={16} />}
            </div>
          </li>
          {categories.map((cat) => (
            <li key={cat.id} className="font-playfair">
              <div className="flex items-center group cursor-pointer"
                   onClick={() => setCategory(cat.slug)}>
                <span className={`text-[15px] flex-1 ${activeCategory === cat.slug ? 'font-bold' : 'text-gray-800'}`}>
                  {cat.name}
                </span>
                {activeCategory === cat.slug && <Check size={16} />}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Filter Sections */}
      <div className="space-y-6">
        {filterSections.map(section => (
          <div key={section} className="border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center cursor-pointer group"
                 onClick={() => toggleFilter(section)}>
              <h3 className="text-[14px] font-bold tracking-widest uppercase">{section}</h3>
              {expandedFilters.includes(section) ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </div>
            {section === "PRICE" && expandedFilters.includes(section) && (
              <div className="mt-6">
                <div className="text-[14px] mb-6 font-bold text-[#1C1C1C]">Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</div>
                
                <div className="relative w-full h-1.5 bg-gray-200 rounded-lg mb-10 mx-3">
                  {/* The track active region */}
                  <div 
                    className="absolute h-full bg-[#D4C3A3] rounded-lg"
                    style={{
                      left: `${(priceRange[0] / 500000) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 500000) * 100}%`
                    }}
                  />
                  {/* Min Input */}
                  <input 
                    type="range" 
                    min="0" 
                    max="500000" 
                    value={priceRange[0]} 
                    onChange={(e) => {
                      const val = Math.min(parseInt(e.target.value), priceRange[1] - 1);
                      setPriceRange([val, priceRange[1]]);
                    }}
                    className="absolute -top-1 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#D4C3A3] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
                  />
                  {/* Max Input */}
                  <input 
                    type="range" 
                    min="0" 
                    max="500000" 
                    value={priceRange[1]} 
                    onChange={(e) => {
                      const val = Math.max(parseInt(e.target.value), priceRange[0] + 1);
                      setPriceRange([priceRange[0], val]);
                    }}
                    className="absolute -top-1 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#D4C3A3] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    { label: "10-25k", range: [10000, 25000] },
                    { label: "25-50k", range: [25000, 50000] },
                    { label: "50-100k", range: [50000, 100000] },
                    { label: "100k+", range: [100000, 500000] }
                  ].map(item => (
                    <button 
                      key={item.label} 
                      onClick={() => setPriceRange([item.range[0], item.range[1]])}
                      className={`px-3 py-1.5 text-[11px] font-bold transition-colors uppercase tracking-widest border ${
                        priceRange[0] === item.range[0] && priceRange[1] === item.range[1]
                          ? 'bg-black text-white border-black'
                          : 'bg-[#F1EADA] text-[#1C1C1C] border-[#D4C3A3] hover:bg-[#EAE0CD]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
