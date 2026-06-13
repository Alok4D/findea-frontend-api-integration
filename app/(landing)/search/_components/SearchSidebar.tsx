"use client";

import React from "react";
import { ChevronRight, Star } from "lucide-react";
import { useGetCategoriesQuery } from "@/lib/redux/api/productApi";

interface SearchSidebarProps {
  activeType: string;
  setActiveType: (type: string) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  availability: string[];
  setAvailability: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchSidebar = ({ 
  activeType, 
  setActiveType,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  availability,
  setAvailability,
  selectedRating,
  setSelectedRating,
  selectedLocations,
  setSelectedLocations
}: SearchSidebarProps) => {
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleAvailability = (item: string) => {
    setAvailability(prev => 
      prev.includes(item) 
        ? prev.filter(a => a !== item) 
        : [...prev, item]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) 
        ? prev.filter(l => l !== loc) 
        : [...prev, loc]
    );
  };

  const { data: categoriesData } = useGetCategoriesQuery();

  const [openSections, setOpenSections] = React.useState({
    type: true,
    category: true,
    price: true,
    availability: true,
    rating: true,
    location: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
  <>
    <h3 className="hidden lg:block text-lg font-bold tracking-widest uppercase mb-8 border-b border-black pb-2">Filters</h3>
    


    {/* CATEGORY Filter */}
    <div className="mb-8  pt-6">
      <h4 
        className="text-[14px] font-bold tracking-widest uppercase mb-4 flex justify-between items-center group cursor-pointer"
        onClick={() => toggleSection('category')}
      >
        Category <ChevronRight size={16} className={`transition-transform duration-300 ${openSections.category ? 'rotate-90' : ''} text-gray-400 group-hover:text-black`} />
      </h4>
      {openSections.category && (
        <div className="space-y-4">
          {categoriesData?.map((cat) => (
            <label 
              key={cat.id} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleCategory(cat.slug)}
            >
              <div className={`w-[18px] h-[18px] border transition-all flex items-center justify-center ${
                selectedCategories.includes(cat.slug) 
                  ? 'bg-[#1C1C1C] border-[#1C1C1C]' 
                  : 'border-gray-300 group-hover:border-black'
              }`}>
                {selectedCategories.includes(cat.slug) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-[14px] transition-colors ${
                selectedCategories.includes(cat.slug) ? 'text-black font-medium' : 'text-gray-500 group-hover:text-black'
              }`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>

    {/* PRICE Filter */}
    <div className="mb-8 border-t border-gray-200 pt-8">
      <h4 
        className="text-[14px] font-bold tracking-widest uppercase mb-4 flex justify-between items-center group cursor-pointer"
        onClick={() => toggleSection('price')}
      >
        Price <ChevronRight size={16} className={`transition-transform duration-300 ${openSections.price ? 'rotate-90' : ''} text-gray-400 group-hover:text-black`} />
      </h4>
      {openSections.price && (
        <div className="mt-4">
           <div className="text-[14px] mb-6 font-bold text-[#1C1C1C]">Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</div>
           <div className="relative w-full h-1.5 bg-gray-200 rounded-lg mb-8">
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
           <div className="flex flex-wrap gap-2">
              {[
                { label: "10-25k", range: [10000, 25000] },
                { label: "25-50k", range: [25000, 50000] },
                { label: "50-100k", range: [50000, 100000] },
                { label: "100k+", range: [100000, 500000] }
              ].map(item => (
                <button 
                  key={item.label} 
                  onClick={() => setPriceRange([item.range[0], item.range[1]])}
                  className={`px-4 py-1.5 text-[11px] font-bold transition-colors uppercase tracking-widest border ${
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

    {/* AVAILABILITY Filter */}
    <div className="mb-8 border-t border-gray-200 pt-8">
      <h4 
        className="text-[14px] font-bold tracking-widest uppercase mb-4 flex justify-between items-center group cursor-pointer"
        onClick={() => toggleSection('availability')}
      >
        Availability <ChevronRight size={16} className={`transition-transform duration-300 ${openSections.availability ? 'rotate-90' : ''} text-gray-400 group-hover:text-black`} />
      </h4>
      {openSections.availability && (
        <div className="space-y-4">
          {["In Stock", "Booked"].map((item) => (
            <label 
              key={item} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleAvailability(item)}
            >
              <div className={`w-[18px] h-[18px] border transition-all flex items-center justify-center ${
                availability.includes(item) 
                  ? 'bg-[#D4C3A3] border-[#D4C3A3]' 
                  : 'border-gray-300 group-hover:border-black'
              }`}>
                {availability.includes(item) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
              </div>
              <span className={`text-[14px] transition-colors ${
                availability.includes(item) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'
              }`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>

    {/* RATING Filter */}
    <div className="mb-8 border-t border-gray-200 pt-8">
      <h4 
        className="text-[14px] font-bold tracking-widest uppercase mb-4 flex justify-between items-center group cursor-pointer"
        onClick={() => toggleSection('rating')}
      >
        Rating <ChevronRight size={16} className={`transition-transform duration-300 ${openSections.rating ? 'rotate-90' : ''} text-gray-400 group-hover:text-black`} />
      </h4>
      {openSections.rating && (
        <div className="space-y-4">
          {[4, 3, 2, 1].map((stars) => (
            <label 
              key={stars} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
            >
              <div className={`w-[18px] h-[18px] border transition-all flex items-center justify-center ${
                selectedRating === stars 
                  ? 'bg-[#D4C3A3] border-[#D4C3A3]' 
                  : 'border-gray-300 group-hover:border-black'
              }`}>
                {selectedRating === stars && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < stars ? "#EEA71D" : "none"} stroke={i < stars ? "#EEA71D" : "#D1D5DB"} />
                ))}
              </div>
              <span className={`text-[12px] font-medium transition-colors ${
                selectedRating === stars ? 'text-black' : 'text-gray-500'
              }`}>
                {stars} and up (39)
              </span>
            </label>
          ))}
        </div>
      )}
    </div>

    {/* LOCATION Filter */}
    <div className="mb-8 border-t border-gray-200 pt-8">
      <h4 
        className="text-[14px] font-bold tracking-widest uppercase mb-4 flex justify-between items-center group cursor-pointer"
        onClick={() => toggleSection('location')}
      >
        Location <ChevronRight size={16} className={`transition-transform duration-300 ${openSections.location ? 'rotate-90' : ''} text-gray-400 group-hover:text-black`} />
      </h4>
      {openSections.location && (
        <>
          <div className="text-[12px] text-gray-400 italic mb-4">[for services or boutiques]</div>
          <div className="space-y-4">
            {["London", "New York", "Los Angeles", "Paris"].map((loc) => (
              <label 
                key={loc} 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => toggleLocation(loc)}
              >
                <div className={`w-[18px] h-[18px] border transition-all flex items-center justify-center ${
                  selectedLocations.includes(loc) 
                    ? 'bg-[#1C1C1C] border-[#1C1C1C]' 
                    : 'border-gray-300 group-hover:border-black'
                }`}>
                  {selectedLocations.includes(loc) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[14px] transition-colors ${
                  selectedLocations.includes(loc) ? 'text-black font-medium' : 'text-gray-500 group-hover:text-black'
                }`}>
                  {loc}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  </>
  );
};

export default SearchSidebar;
